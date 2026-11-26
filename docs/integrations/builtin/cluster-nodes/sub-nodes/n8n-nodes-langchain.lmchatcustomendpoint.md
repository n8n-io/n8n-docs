---
title: Custom Endpoint Chat Model node documentation
description: >-
  Learn how to use the Custom Endpoint Chat Model node in n8n. Follow technical
  documentation to integrate the Custom Endpoint Chat Model node into your
  workflows.
layout:
  description:
    visible: false
---

# Custom Endpoint Chat Model node

Use the **Custom Endpoint Chat Model** node to give an **AI Agent** a model on any endpoint that speaks the OpenAI API, such as an AI gateway, an API management proxy, or a self-hosted model. Examples include LiteLLM, Portkey, Kong AI Gateway, Azure API Management, vLLM, and NVIDIA NIM.

The model streams, so an agent built on it can stream its answer the same way it does on the other chat model sub-nodes.

{% hint style="info" %}
**Feature availability**

The Custom Endpoint Chat Model node is available from n8n 2.50.0.
{% endhint %}

On this page, you'll find the node parameters for the Custom Endpoint Chat Model node and links to more resources.

{% hint style="info" %}
**Credentials**

Refer to the [Custom Model Endpoint credentials documentation](../../credentials/custommodelendpoint.md) for authentication information for this node.
{% endhint %}

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/X6JM1Mgg5iwvZLDpGEB0/" %}

To send a single prompt in a workflow rather than attach a model to an agent, use the [**Custom Model Endpoint**](../../app-nodes/n8n-nodes-langchain.custommodelendpoint.md) node instead.

## Node parameters

### Authentication

Choose whether the node uses a **Custom Model Endpoint** credential or an existing **OpenAI** credential. An OpenAI credential works so you can move an existing workflow without rebuilding its credential first, but it can only send a Bearer token and one custom header.

### Model

The model to send the prompt to, as your gateway names it.

**By ID** is the default: type the model name. Use **From List** to pick from the models your gateway reports, which only works when the gateway serves a compatible `GET /models`. Not every gateway serves that route, which is why typing the ID stays the default.

Model names differ between gateways. The same underlying model might be `gpt-4o` on one gateway and `openai/gpt-4o` on another, so changing gateway can mean changing this field too.

### API Format

Which API of your gateway to call. **Chat Completions** is the default. **Responses** calls your gateway's Responses API instead, which not every gateway serves.

The choice changes which node options apply, and it changes the shape of a tool definition in **Extra Body** to the flat Responses shape. The OpenAI built-in tools aren't available on either format.

### Headers

Headers for this request only. Values accept expressions.

An expression here resolves against the first input item of the agent, so one value goes out on every call of a run. To give each item its own header value, use the [**Custom Model Endpoint**](../../app-nodes/n8n-nodes-langchain.custommodelendpoint.md) node, which resolves its headers for each item.

Headers your gateway needs on every call belong on the credential instead, as **Gateway Headers**. n8n encrypts those and sends them on the model list as well. They don't travel on the OAuth2 token request.

### Extra Body

JSON merged into the request body, for fields your gateway or provider accepts that this node has no field for.

### Send n8n Context Headers

On by default. Sends three headers so your gateway can attribute usage and cost:

- `x-n8n-workflow-id`
- `x-n8n-workflow-name`
- `x-n8n-execution-id`

A header is only sent when it has a value. n8n URL-encodes a workflow name that contains non-English characters, so it won't break the request.

The project ID isn't sent, because a node can't read the project it belongs to. To send a project name, add it as a gateway header on the credential or as a per-request header in **Headers**.

## Node options

Use these options to further refine the node's behavior. Some of them only apply to one **API Format**, and n8n hides the ones that don't apply to your choice.

### Frequency Penalty

Use this option to control the chance of the model repeating itself. Higher values reduce the chance of the model repeating itself.

Only on **Chat Completions**.

### Max Output Tokens

Enter the cap on the tokens generated. n8n sends this as `max_output_tokens`.

Only on **Responses**.

### Maximum Number of Tokens

Enter the maximum number of tokens used, which sets the completion length. n8n sends this as `max_completion_tokens` for a reasoning model and as `max_tokens` otherwise. Use **Extra Body** to force a different field.

Only on **Chat Completions**. On **Responses**, use **Max Output Tokens** instead.

### Max Retries

Enter the maximum number of times to retry a request that times out, hits a rate limit, or fails on the gateway (status 408, 429, or 5xx).

### Presence Penalty

Use this option to control the chance of the model talking about new topics. Higher values increase the chance of the model talking about new topics.

Only on **Chat Completions**.

### Reasoning Summary

Ask a reasoning model to summarize its reasoning. Choose **Auto**, **Concise**, or **Detailed**. Not every model or gateway serves one.

Only on **Responses**.

### Sampling Temperature

Use this option to control the randomness of the sampling process. A higher temperature creates more diverse sampling, but increases the risk of hallucinations.

### Seed

Ask the provider to sample deterministically. Not every provider honors it.

Only on **Chat Completions**.

### Stop Sequences

Comma-separated strings that end the answer when the model produces one.

Only on **Chat Completions**.

### Store Response

Turn this on to let the gateway keep the response, so a later call can refer to it. Off by default.

Only on **Responses**.

### Timeout

Enter the maximum request time in milliseconds.

### Top P

Use this option to set the probability the completion should use. Use a lower value to ignore less probable options. Change this or the temperature, not both.

### Truncation

What to do when the conversation outgrows the context window. **Auto** drops items from the middle. **Disabled** fails the request.

Only on **Responses**.

## Templates and examples

[Search all templates](https://n8n.io/workflows/) for workflows you can adapt.

## Related resources

Refer to the [OpenAI API reference](https://platform.openai.com/docs/api-reference/chat) for the request and response format these endpoints follow.

To move an existing workflow from the OpenAI Chat Model sub-node with a Base URL override, see [Moving from the OpenAI node with a custom Base URL](../../credentials/custommodelendpoint.md#moving-from-the-openai-node-with-a-custom-base-url).

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/mjXhKRIw98UJ5hk9LWBl/" %}

## Common issues

Here are some common errors and issues with the Custom Endpoint Chat Model node and steps to resolve or troubleshoot them.

### `This gateway does not publish a model list`

The gateway doesn't serve a compatible `GET /models`. Not every gateway does, so this isn't always a fault. If your gateway does serve a model list, check that **Base URL** matches the API path, including a version segment such as `/v1` when the gateway requires one. Otherwise switch **Model** to **By ID** and type the name your gateway uses.

### `The credential has no usable Base URL`

**Base URL** on the credential is empty, or isn't an absolute `http` or `https` URL.

### The agent fails with the gateway's error

Check the gateway's own response first. The node surfaces the gateway's error text rather than replacing it with a generic message, so a rejected key, a disabled deployment, and an exhausted quota each read differently.

### Tool calling returns an error from the provider

Not every provider behind a gateway supports tool calling. When the provider doesn't, you get the provider's own error rather than a silent failure.
