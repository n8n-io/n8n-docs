---
title: Basic LLM Chain node documentation
description: >-
  Learn how to use the Basic LLM Chain node in n8n. Follow technical
  documentation to integrate Basic LLM Chain node into your workflows.
contentType:
  - integration
  - reference
priority: critical
nodeTitle: Basic LLM Chain node documentation
originalFilePath: integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.chainllm.md
originalUrl: >-
  https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.chainllm
url: >-
  https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.chainllm
layout:
  description:
    visible: false
---

# Basic LLM Chain node <a href="#basic-llm-chain-node" id="basic-llm-chain-node"></a>

Use the Basic LLM Chain node to set the prompt that the model will use along with setting an optional parser for the response.

On this page, you'll find the node parameters for the Basic LLM Chain node and links to more resources.

{% hint style="info" %}
**Examples and templates**

For usage examples and templates to help you get started, refer to n8n's [Basic LLM Chain integrations](https://n8n.io/integrations/basic-llm-chain/) page.
{% endhint %}

## Node parameters <a href="#node-parameters" id="node-parameters"></a>

### Prompt <a href="#prompt" id="prompt"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/tALAgzlpmog5eZk893Ez/" %}

### Require Specific Output Format <a href="#require-specific-output-format" id="require-specific-output-format"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/FWz2tiBEchkNj9yOVoti/" %}

## Chat Messages <a href="#chat-messages" id="chat-messages"></a>

Use **Chat Messages** when you're using a chat model to set a message.

n8n ignores these options if you don't connect a chat model. Select the **Type Name or ID** you want the node to use:

#### AI <a href="#ai" id="ai"></a>

Enter a sample expected response in the **Message** field. The model will try to respond in the same way in its messages.

#### System <a href="#system" id="system"></a>

Enter a system **Message** to include with the user input to help guide the model in what it should do.

Use this option for things like defining tone, for example: `Always respond talking like a pirate`.

#### User <a href="#user" id="user"></a>

Enter a sample user input. Using this with the AI option can help improve the output of the agent. Using both together provides a sample of an input and expected response (the **AI Message**) for the model to follow.

Select one of these input types:

* **Text**: Enter a sample user input as a text **Message**.
* **Image (Binary)**: Select a binary input from a previous node. Enter the **Image Data Field Name** to identify which binary field from the previous node contains the image data.
* **Image (URL)**: Use this option to feed an image in from a URL. Enter the **Image URL**.

For both the **Image** types, select the **Image Details** to control how the model processes the image and generates its textual understanding. Choose from:

* **Auto**: The model uses the auto setting, which looks at the image input size and decide if it should use the Low or High setting.
* **Low**: The model receives a low-resolution 512px x 512px version of the image and represents the image with a budget of 65 tokens. This allows the API to return faster responses and consume fewer input tokens. Use this option for use cases that don't require high detail.
* **High**: The model can access the low-resolution image and then creates detailed crops of input images as 512px squares based on the input image size. Each of the detailed crops uses twice the token budget (65 tokens) for a total of 129 tokens. Use this option for use cases that require high detail.

## Templates and examples <a href="#templates-and-examples" id="templates-and-examples"></a>


[Browse Basic LLM Chain node documentation integration templates](https://n8n.io/integrations/basic-llm-chain) or [search all templates](https://n8n.io/workflows/)

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [LangChain's documentation on Basic LLM Chains](https://js.langchain.com/docs/tutorials/llm_chain/) for more information about the service.

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/TbnZmZEDZnkAWTXWp8th/" %}


## Common issues <a href="#common-issues" id="common-issues"></a>

Here are some common errors and issues with the Basic LLM Chain node and steps to resolve or troubleshoot them.

### No prompt specified error <a href="#no-prompt-specified-error" id="no-prompt-specified-error"></a>

This error displays when the **Prompt** is empty or invalid.

You might see this error in one of two scenarios:

1. When you've set the **Prompt** to **Define below** and haven't entered anything in the **Text** field.
    * To resolve, enter a valid prompt in the **Text** field.
2. When you've set the **Prompt** to **Connected Chat Trigger Node** and the incoming data has no field called `chatInput`. 
    * The node expects the `chatInput` field. If your previous node doesn't have this field, add an [Edit Fields (Set)](../../core-nodes/n8n-nodes-base.set.md) node to edit an incoming field name to `chatInput`.
