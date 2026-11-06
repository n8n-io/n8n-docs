---
title: Custom Model Endpoint node documentation
description: >-
  Learn how to use the Custom Model Endpoint node in n8n. Follow technical
  documentation to integrate the Custom Model Endpoint node into your workflows.
layout:
  description:
    visible: false
---

# Custom Model Endpoint node

Use the Custom Model Endpoint node to send a prompt to any endpoint that speaks the OpenAI API, such as an AI gateway, an API management proxy, or a self-hosted model. Examples include LiteLLM, Portkey, Kong AI Gateway, Azure API Management, vLLM, and NVIDIA NIM.

The node has one job, messaging a model, so there's no operation to choose.

On this page, you'll find the node parameters for the Custom Model Endpoint node and links to more resources.

{% hint style="info" %}
**Credentials**

Refer to the [Custom Model Endpoint credentials documentation](../credentials/custommodelendpoint.md) for authentication information for this node.
{% endhint %}

Use this node when you want a single call in a workflow. To give an AI Agent a model on the same endpoint, use the [Custom Endpoint Chat Model](../cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatcustomendpoint.md) sub-node instead.

## Node parameters

### Authentication

Choose whether the node uses a **Custom Model Endpoint** credential or an existing **OpenAI** credential. An OpenAI credential works so you can move an existing workflow without rebuilding its credential first, but it can only send a Bearer token and one custom header.

### Model

The model to send the prompt to, as your gateway names it.

**By ID** is the default: type the model name. Use **From List** to pick from the models your gateway reports, which only works when the gateway serves a compatible `GET /models`. Not every gateway serves that route, which is why typing the ID stays the default.

Model names differ between gateways. The same underlying model might be `gpt-4o` on one gateway and `openai/gpt-4o` on another, so changing gateway can mean changing this field too.

### Messages

The conversation to send, in order. Each message has a **Role** of **System**, **User**, or **Assistant**, and its **Content**.

The node drops messages with empty content, and won't call the gateway with nothing to send.

### Headers

Headers for this request only. Values accept expressions, so they can differ per item:

```text
Name:  x-request-source
Value: {{ $json.department }}
```

Headers your gateway needs on every call belong on the credential instead, as **Gateway Headers**. n8n encrypts those and sends them on the model list as well. They don't travel on the OAuth2 token request.

### Extra Body

JSON merged into the request body, for fields your gateway or provider accepts that this node has no field for. Tool definitions go here:

```json
{
	"tools": [
		{
			"type": "function",
			"function": { "name": "get_weather", "parameters": {} }
		}
	]
}
```

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

### Max Completion Tokens

The cap on the tokens generated, sent as `max_completion_tokens`.

### Maximum Number of Tokens

The cap on the tokens generated, sent as `max_tokens`.

Both token caps exist because a gateway in front of several providers may accept only one of the two, whatever the model name suggests. Set whichever your gateway expects, or use **Extra Body** for a field neither covers.

### Presence Penalty

Use this option to control the chance of the model talking about new topics. Higher values increase the chance of the model talking about new topics.

### Sampling Temperature

Use this option to control the randomness of the sampling process. A higher temperature creates more diverse sampling, but increases the risk of hallucinations.

### Seed

Ask the provider to sample deterministically. Not every provider honors it.

### Stop Sequences

Comma-separated strings that end the answer when the model produces one.

### Timeout

How long one request may take, in milliseconds.

### Top P

Use this option to set the probability the completion should use. Use a lower value to ignore less probable options. Change this or the temperature, not both.

## Output

The node outputs one item per input item:

| Field | Description |
| --- | --- |
| `text` | The answer, or an empty string when the model returned none |
| `finishReason` | Why the model stopped, as the gateway reported it |
| `toolCalls` | The tool calls the model made. Only present when it made one |
| `response` | The gateway's full response, unchanged |

The node reports token usage into the execution metadata, the same as the other AI nodes.

## Templates and examples

[Search all templates](https://n8n.io/workflows/) for workflows you can adapt.

## Related resources

Refer to the [OpenAI API reference](https://platform.openai.com/docs/api-reference/chat) for the request and response format these endpoints follow.

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/96ifDzfcUuwOyYrubZUt/" %}

To move an existing workflow from the OpenAI node with a Base URL override, see [Moving from the OpenAI node with a custom Base URL](../credentials/custommodelendpoint.md#moving-from-the-openai-node-with-a-custom-base-url).

## Common issues

Here are some common errors and issues with the Custom Model Endpoint node and steps to resolve or troubleshoot them.

### `This gateway does not publish a model list`

The gateway doesn't serve a compatible `GET /models`. Switch **Model** to **By ID** and type the name your gateway uses.

### `This node has no message to send`

Every **Messages** row has empty **Content**. The node drops empty rows and won't call the gateway with nothing to send.

### `The credential has no usable Base URL`

**Base URL** on the credential is empty, or isn't an absolute `http` or `https` URL.

### The gateway doesn't recognise the model name

Gateways name models differently. Check the name against your gateway's own catalog rather than the provider's.

### Tool calling does nothing

Put the tool definitions in **Extra Body** in the shape your provider expects. When the provider behind your gateway doesn't support tool calling, you get the provider's own error rather than a silent failure.

### The request fails with a 404

Check the credential's **Base URL** includes the version segment your gateway expects. The node appends `/chat/completions` to whatever you set.
