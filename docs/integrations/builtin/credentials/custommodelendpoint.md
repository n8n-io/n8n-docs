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

- Bearer token
- API key in a header you name
- Basic auth
- OAuth2 client credentials
- None

## Related resources

Refer to the [OpenAI API reference](https://platform.openai.com/docs/api-reference/chat) for the request and response format these endpoints follow.

## Base URL

Every method needs a **Base URL**. Set it to the root your gateway serves the OpenAI API from, including any version segment:

```
https://gateway.example.com/v1
```

The node appends the route, so `/chat/completions` and `/models` hang off whatever you set here. If you leave the version off when your gateway expects it, requests fail with a 404 from the gateway rather than an n8n error.

n8n only lets a credential reach the host in its **Base URL**. If your gateway and your login server are on different hosts, see [Using OAuth2 client credentials](#using-oauth2-client-credentials) below.

## Using Bearer token

Set **API Key** to your key. n8n sends it as:

```
Authorization: Bearer <your-key>
```

Use this when your gateway accepts an OpenAI-style key.

## Using API key in a header

Use this when your gateway reads its key from a header of its own, which is common with API management products. Azure API Management subscription keys work this way and can't carry a `Bearer` prefix.

- **Header Name**: the header your gateway reads, for example `Ocp-Apim-Subscription-Key`.
- **Header Value Prefix**: leave empty for a bare key. Set it only when your gateway expects the value prefixed, for example `Token `.
- **API Key**: the key itself.

n8n sends no `Authorization` header when you use this method.

## Using Basic auth

Set **User Name** and **Password**. n8n sends them as a standard `Authorization: Basic` header.

## Using OAuth2 client credentials

Use this when your gateway doesn't take a static key and instead issues short-lived tokens.

- **Token URL**: the token endpoint of your login server.
- **Client ID** and **Client Secret**: the credentials of your service app.
- **Scope**: space-separated scopes to ask for. Leave it empty to ask for none.
- **Send Client Credentials In**: choose **Authorization Header** to send the client ID and secret as Basic auth, or **Request Body** to send them as body fields. Login servers differ on which they accept.

n8n fetches a token before the request, keeps it in memory for as long as the login server says it lasts, and fetches a new one when it expires. n8n never writes the token to the credential.

{% hint style="warning" %}
**Allow the login server's domain**

n8n restricts a credential to the host in its **Base URL**. When your login server runs on a different host from your gateway, add that host to the credential's allowed domains, or the token request fails before it leaves n8n.
{% endhint %}

## Using no authentication

Choose **None** for an endpoint that needs no login, such as a self-hosted model on your own network.

## Gateway headers

**Gateway Headers** are name and value pairs sent on every request this credential makes, including the model list and the OAuth2 token request. They're stored encrypted with the rest of the credential.

Use them for anything your gateway needs on every call, such as a tenant ID, a cost centre, or a routing hint:

| Name | Value |
| --- | --- |
| `x-portkey-provider` | `vertex-ai` |
| `x-cost-centre` | `research` |

Headers that change per request belong on the node instead, where they accept expressions. See the [Custom Model Endpoint node](../app-nodes/n8n-nodes-langchain.custommodelendpoint.md) documentation.

## Sending a project name

n8n sends three context headers on every request by default, so your gateway can attribute usage:

- `x-n8n-workflow-id`
- `x-n8n-workflow-name`
- `x-n8n-execution-id`

**The project ID isn't among them**, because a node can't read the project it belongs to. To send a project name, add it yourself: as a gateway header on this credential if every workflow using the credential belongs to one project, or as a per-request header on the node if it varies.

You can turn the three context headers off in the node's options.

## Moving from the OpenAI node with a custom Base URL

If you reach your gateway today with the OpenAI node and a Base URL override, you don't have to change anything. Both nodes accept an existing OpenAI credential, so you can swap the node first and the credential later.

Switch when you need something the OpenAI credential can't express:

| You need | Why the OpenAI credential can't do it |
| --- | --- |
| A key in a header you name | It always sends `Authorization: Bearer` |
| OAuth2 client credentials | It only holds a static key |
| More than one gateway header | It carries a single custom header |
| A model list from your gateway | It calls OpenAI's own `/v1/models` |
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

### The gateway returns 404 Not Found

Your **Base URL** is probably missing the version segment your gateway expects. The node appends `/chat/completions`, so a base of `https://gateway.example.com` sends requests to `https://gateway.example.com/chat/completions`, not `https://gateway.example.com/v1/chat/completions`.

### The gateway rejects the key

Check that you picked the right method. A gateway that reads its key from a named header rejects a Bearer token, and the reverse is also true. **API Key in Header** sends no `Authorization` header at all, which is what API management products expect.

### The token request fails before reaching the login server

n8n restricts a credential to the host in its **Base URL**. If your login server is on another host, add it to the credential's allowed domains.

### The model list is empty or errors

The gateway doesn't serve a compatible `GET /models`. This is normal and isn't a fault. Switch the node's **Model** field to **By ID** and type the model name your gateway uses.
