---
title: Custom Model Endpoint credentials
description: >-
  Documentation for Custom Model Endpoint credentials. Use these credentials to
  authenticate any OpenAI-compatible endpoint in n8n, a workflow automation
  platform.
layout:
  description:
    visible: false
---

# Custom Model Endpoint credentials

You can use these credentials to authenticate the following nodes:

- [Custom Model Endpoint](../app-nodes/n8n-nodes-langchain.custommodelendpoint.md)
- [Custom Endpoint Chat Model](../cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatcustomendpoint.md)

Use these credentials to reach any endpoint that speaks the OpenAI API, such as an AI gateway, an API management proxy, or a self-hosted model. Examples include LiteLLM, Portkey, Kong AI Gateway, Azure API Management, vLLM, and NVIDIA NIM.

Everything specific to your gateway lives on the credential, not on the node. When your company changes gateway, you edit one credential and every workflow keeps working.

{% hint style="info" %}
**Name each credential after its gateway**

The node shows the credential name, not the host it reaches. Naming a credential `Portkey production` or `LiteLLM staging` is what tells a reviewer where the prompts go.
{% endhint %}

## Prerequisites

- An endpoint that accepts OpenAI-format requests.
- Whatever that endpoint needs to authenticate you: a key, a user name and password, or an OAuth2 client.

## Supported authentication methods

Set the credential's **Authentication** field to one of:

- **Bearer Token**
- **API Key in Header**
- **Basic Auth**
- **OAuth2 Client Credentials**
- **None**

## Related resources

Refer to the [OpenAI API reference](https://platform.openai.com/docs/api-reference/chat) for the request and response format these endpoints follow.

## Base URL

Every method needs a **Base URL**. Set it to the root your gateway serves the OpenAI API from, including any version segment:

```text
https://gateway.example.com/v1
```

The node appends the route, so `/chat/completions` and `/models` hang off whatever you set here. If you leave the version off when your gateway expects it, requests fail with a 404 from the gateway rather than an n8n error.

## Using Bearer token

Set **Authentication** to **Bearer Token** and **API Key** to your key. n8n sends it as:

```text
Authorization: Bearer <your-key>
```

Use this when your gateway accepts an OpenAI-style key.

## Using API key in a header

Set **Authentication** to **API Key in Header**. Use this when your gateway reads its key from a header of its own, which is common with API management products. Azure API Management subscription keys work this way and can't carry a `Bearer` prefix.

- **Header Name**: the header your gateway reads, for example `Ocp-Apim-Subscription-Key`.
- **Header Value Prefix**: leave empty for a bare key. Set it only when your gateway expects the value prefixed, for example `Token `.
- **API Key**: the key itself.

n8n sends no `Authorization` header when you use this method.

## Using Basic auth

Set **Authentication** to **Basic Auth**, then fill in **User Name** and **Password**. n8n sends them as a standard `Authorization: Basic` header.

## Using OAuth2 client credentials

Set **Authentication** to **OAuth2 Client Credentials**. Use this when your gateway doesn't take a static key and instead issues short-lived tokens.

- **Token URL**: the token endpoint of your login server.
- **Client ID** and **Client Secret**: the credentials of your service app.
- **Scope**: space-separated scopes to ask for. Leave it empty to ask for none.
- **Send Client Credentials In**: choose **Authorization Header** to send the client ID and secret as Basic auth, or **Request Body** to send them as body fields. Login servers differ on which they accept.

n8n fetches a token before the request, keeps it in memory for as long as the login server says it lasts, and fetches a new one when it expires. When the nodes run, the token stays in memory and isn't written back to the credential.

{% hint style="info" %}
**If you restrict the credential's domains, allow the login server too**

A credential reaches any host by default, so this needs no action in most setups. If you set **Allowed HTTP Request Domains** to **Specific Domains**, n8n adds the host of your **Base URL** to the allowlist for you, but not your login server's. Add that host to **Allowed Domains** as well, or the token request stops with `Domain not allowed: This credential is restricted from accessing <host>.`
{% endhint %}

## Using no authentication

Set **Authentication** to **None** for an endpoint that needs no login, such as a self-hosted model on your own network.

## Gateway headers

**Gateway Headers** are name and value pairs sent on every request to your gateway, including the model list. n8n encrypts them with the rest of the credential.

They don't travel on the OAuth2 token request, which carries only the fields the login server needs. A login server that requires a header of its own isn't supported.

Use them for anything your gateway needs on every call, such as a tenant ID, a cost center, or a routing hint:

| Name | Value |
| --- | --- |
| `x-portkey-provider` | `vertex-ai` |
| `x-cost-center` | `research` |

Headers that change per request belong on the node instead, where they accept expressions. See the [Custom Model Endpoint node](../app-nodes/n8n-nodes-langchain.custommodelendpoint.md) documentation.

## Sending a project name

n8n sends three context headers on every request by default, so your gateway can attribute usage:

- `x-n8n-workflow-id`
- `x-n8n-workflow-name`
- `x-n8n-execution-id`

**The project ID isn't among them**, because a node can't read the project it belongs to. To send a project name, add it yourself: as a gateway header on this credential if every workflow using the credential belongs to one project, or as a per-request header on the node if it varies.

To stop sending them, turn off **Send n8n Context Headers** on the node.

## Moving from the OpenAI node with a custom Base URL

If you reach your gateway today with the OpenAI node and a Base URL override, you don't have to change anything. Both nodes accept an existing OpenAI credential, so you can swap the node first and the credential later.

Switch when you need something the OpenAI credential can't express:

| You need | Why the OpenAI credential can't do it |
| --- | --- |
| A key in a header you name | It always sends `Authorization: Bearer` |
| OAuth2 client credentials | It only holds a static key |
| More than one gateway header | It carries a single custom header |
| Basic auth, or no auth at all | Neither is available |

To move:

1. Create a **Custom Model Endpoint** credential. Set **Base URL** to the same URL you put in the OpenAI node's Base URL override.
2. Pick the authentication method your gateway actually wants, rather than the Bearer token the OpenAI node forced on you.
3. Move any custom header you set on the OpenAI node into **Gateway Headers**.
4. In your workflow, replace the OpenAI node with the **Custom Model Endpoint** node, or the OpenAI Chat Model sub-node with **Custom Endpoint Chat Model**.
5. Select the new credential and check the model name. See [Model names differ between gateways](#model-names-differ-between-gateways).

{% hint style="info" %}
**Check the model name after you switch**

Gateways name models differently, so the model ID that worked against one gateway may not exist on another.
{% endhint %}

## Model names differ between gateways

A gateway decides what to call the models behind it. The same underlying model might be `gpt-4o` on one gateway, `openai/gpt-4o` on another, and a deployment name you chose on a third.

This matters when you change gateway: the credential change is one edit, but the model ID on each node may need changing too. Where a gateway serves `GET /models`, use **From List** on the node's **Model** field to see what it actually offers. Not every gateway serves that route, so typing the ID stays the default.

## Common issues

Here are some common errors and issues with Custom Model Endpoint credentials and steps to resolve or troubleshoot them.

### `The credential has no usable Base URL`

**Base URL** is empty, or isn't an absolute `http` or `https` URL. Set it to the root of your gateway, such as `https://gateway.example.com/v1`.

### `This node has no credential`

The node has no credential selected. Choose a **Custom Model Endpoint** credential, or an OpenAI one.

### The gateway returns 404 Not Found

Your **Base URL** is probably missing the version segment your gateway expects. The node appends `/chat/completions`, so a base of `https://gateway.example.com` sends requests to `https://gateway.example.com/chat/completions`, not `https://gateway.example.com/v1/chat/completions`.

### The gateway rejects the key

Check that you picked the right **Authentication** option. A gateway that reads its key from a named header rejects a Bearer token, and the reverse is also true. **API Key in Header** sends no `Authorization` header at all, which is what API management products expect.

### `Could not sign in to the gateway`

The login server refused the OAuth2 token request. The message carries the login server's own reason. Check **Token URL**, **Client ID**, **Client Secret** and **Scope**, and try the other **Send Client Credentials In** option, since login servers differ on whether they accept the client ID and secret in the header or the body.

### `The login server did not answer with JSON`

**Token URL** probably points at something other than the token endpoint, such as the authorization endpoint or a login page.

### `Domain not allowed: This credential is restricted from accessing <host>.`

The credential has **Allowed HTTP Request Domains** set to **Specific Domains** and that host isn't on the list. n8n adds your **Base URL** host for you, so this usually means an OAuth2 login server on a different host. Add it to **Allowed Domains**.

### `The header "<name>" is not valid`

A gateway header name or value contains characters a header can't carry. Check the name and the value of the header.

### `This gateway does not publish a model list`

The gateway doesn't serve a compatible `GET /models`. This is normal and isn't a fault. Switch the node's **Model** field to **By ID** and type the model name your gateway uses.

### `The gateway could not list its models`

The gateway answered the model list request with an error. The message carries the gateway's own reason.
