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

Use the Custom Endpoint Chat Model node to give an AI Agent a model on any endpoint that speaks the OpenAI API, such as an AI gateway, an API management proxy, or a self-hosted model. Examples include LiteLLM, Portkey, Kong AI Gateway, Azure API Management, vLLM, and NVIDIA NIM.

On this page, you'll find the node parameters for the Custom Endpoint Chat Model node and links to more resources.

{% hint style="info" %}
**Credentials**

Refer to the [Custom Model Endpoint credentials documentation](../../credentials/custommodelendpoint.md) for authentication information for this node.
{% endhint %}

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/X6JM1Mgg5iwvZLDpGEB0/" %}

To send a single prompt in a workflow rather than attach a model to an agent, use the [Custom Model Endpoint](../../app-nodes/n8n-nodes-langchain.custommodelendpoint.md) node instead.

## Node parameters

### Authentication

Choose whether the node uses a **Custom Model Endpoint** credential or an existing **OpenAI** credential. An OpenAI credential works so you can move an existing workflow without rebuilding its credential first, but it can only send a Bearer token and one custom header.

### Model

The model to send the prompt to, as your gateway names it.

**By ID** is the default: type the model name. Use **From List** to pick from the models your gateway reports, which only works when the gateway serves a compatible `GET /models`. Not every gateway serves that route, which is why typing the ID stays the default.

Model names differ between gateways. The same underlying model might be `gpt-4o` on one gateway and `openai/gpt-4o` on another, so changing gateway can mean changing this field too.

### Headers

Headers for this request only. Values accept expressions.

Headers your gateway needs on every call belong on the credential instead, as **Gateway Headers**. n8n encrypts those and sends them on the model list as well. They don't travel on the OAuth2 token request.

### Extra Body

JSON merged into the request body, for fields your gateway or provider accepts that this node has no field for.

### Send n8n Context Headers

On by default. Sends three headers so your gateway can attribute usage and cost:

- `x-n8n-workflow-id`
- `x-n8n-workflow-name`
- `x-n8n-execution-id`

A header is only sent when it has a value. n8n URL-encodes a workflow name that contains non-English characters, so it won't break the request.

The project ID isn't sent, because a node can't read the project it belongs to. To send a project name, add it as a gateway header on the credential or as a per-request header above.

## Node options

Use these options to further refine the node's behavior.

### Frequency Penalty

Use this option to control the chance of the model repeating itself. Higher values reduce the chance of the model repeating itself.

### Maximum Number of Tokens

Enter the maximum number of tokens used, which sets the completion length. n8n sends this as `max_completion_tokens` for a reasoning model and as `max_tokens` otherwise. Use **Extra Body** to force a different field.

### Max Retries

Enter the maximum number of times to retry a request.

### Presence Penalty

Use this option to control the chance of the model talking about new topics. Higher values increase the chance of the model talking about new topics.

### Sampling Temperature

Use this option to control the randomness of the sampling process. A higher temperature creates more diverse sampling, but increases the risk of hallucinations.

### Seed

Ask the provider to sample deterministically. Not every provider honors it.

### Stop Sequences

Comma-separated strings that end the answer when the model produces one.

### Timeout

Enter the maximum request time in milliseconds.

### Top P

Use this option to set the probability the completion should use. Use a lower value to ignore less probable options. Change this or the temperature, not both.

## Templates and examples

[Search all templates](https://n8n.io/workflows/) for workflows you can adapt.

## Related resources

Refer to the [OpenAI API reference](https://platform.openai.com/docs/api-reference/chat) for the request and response format these endpoints follow.

To move an existing workflow from the OpenAI Chat Model sub-node with a Base URL override, see [Moving from the OpenAI node with a custom Base URL](../../credentials/custommodelendpoint.md#moving-from-the-openai-node-with-a-custom-base-url).

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/mjXhKRIw98UJ5hk9LWBl/" %}

## Common issues

Here are some common errors and issues with the Custom Endpoint Chat Model node and steps to resolve or troubleshoot them.

### `This gateway does not publish a model list`

The gateway doesn't serve a compatible `GET /models`. Switch **Model** to **By ID** and type the name your gateway uses.

### `The credential has no usable Base URL`

**Base URL** on the credential is empty, or isn't an absolute `http` or `https` URL.

### The agent gets an empty answer

Check the gateway's own response first. The node surfaces the gateway's error text rather than replacing it with a generic message, so a rejected key, a disabled deployment and an exhausted quota each read differently.

### Tool calling does nothing

Not every provider behind a gateway supports tool calling. When the provider doesn't, you get the provider's own error rather than a silent failure.
