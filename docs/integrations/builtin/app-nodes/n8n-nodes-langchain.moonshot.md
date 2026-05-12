---
title: Moonshot Kimi node documentation
description: The Moonshot Kimi node lets you interact with Moonshot Kimi AI models from n8n. This documentation explains how to send messages to models, attach images, and analyze images using the node's operations.
contentType: [integration, reference]
---

# Moonshot Kimi node

The Moonshot Kimi node connects n8n workflows to Moonshot Kimi AI models. Use it to send prompts and receive model responses, attach images to messages, or analyze images with an image-analysis model.

/// note | Credentials
You can find authentication information for this node [here](/integrations/builtin/credentials/moonshot.md).
///

## Resources and operations

- **Analyze image**: Analyze images and answer questions about them.
- **Message a model**: Send text-based messages to a Moonshot Kimi model and receive responses (supports attachments, system messages, and advanced options like thinking mode and web search).

### Analyze image

Analyze an image and answer questions about it.

**Parameters**

- **Model** (type: resourceLocator, field: `modelId`): Select the Moonshot Kimi model to use for analysis.
- **Text Input** (type: string, field: `text`): A prompt or question to send along with the image. Default: `What's in this image?`
- **Input Data Field Name(s)** (type: string, field: `binaryPropertyName`): Name of the binary field(s) that contain the image(s). When you provide multiple fields, separate them with commas. Default: `data`
- **Simplify Output** (type: boolean, field: `simplify`): When enabled, the node returns a simplified version of the response rather than the full raw API response. Default: `true`

**Options**

- **Maximum Number of Tokens** (type: number, field: `maxTokens`): Fewer tokens produce shorter, less detailed image descriptions. Default: `1024`

### Message a model

Send one or more messages to a Moonshot Kimi model and receive its response. Support role-based messages (user/assistant), attachments, system messages, and advanced generation options.

**Parameters**

- **Model** (type: resourceLocator, field: `modelId`): Select the Moonshot Kimi model to message.
- **Messages** (type: fixedCollection, field: `messages`): one or more messages forming the conversation prompt.
    - content (type: string): The text content of the message. (Display name: Prompt)
    - role (type: options): Role of the message, for example, `user` or `assistant`, that guides how the model should respond.
- **Add Attachments** (type: boolean, field: `addAttachments`): Whether to attach images to the message. Default: `false`
- **Attachment Input Data Field Name(s)** (type: string, field: `binaryPropertyName`): Name of the binary field(s) containing images to attach. Separate multiple fields with commas. Default: `data`
- **Simplify Output** (type: boolean, field: `simplify`): When you enable it, the node returns a simplified version of the response instead of the raw API output. Default: `true`

**Options**

- **Frequency Penalty** (type: number, field: `frequencyPenalty`): Positive values penalize tokens already present in the text, reducing repetition. Default: `0`
- **Include Merged Response** (type: boolean, field: `includeMergedResponse`): Include a single output string that merges all text parts of the model's response. Default: `false`
- **Maximum Number of Tokens** (type: number, field: `maxTokens`): Maximum tokens to generate for the completion. Default: `1024`
- **Max Tool Calls Iterations** (type: number, field: `maxToolsIterations`): Maximum number of tool-iteration cycles the LLM will run before stopping. One iteration may include multiple tool calls. Set to `0` for no limit. Default: `15`
- **Output Randomness (Temperature)** (type: number, field: `temperature`): Controls randomness of the output. Lower values make output more deterministic. Default: `0.7`
- **Output Randomness (Top P)** (type: number, field: `topP`): Maximum cumulative probability of tokens to consider when sampling. Default: `1`
- **Presence Penalty** (type: number, field: `presencePenalty`): Positive values penalize tokens based on whether they already appear in the text so far, encouraging new topics. Default: `0`
- **Response Format** (type: options, field: `responseFormat`): Format of the returned response, for example, `text`.
- **System Message** (type: string, field: `system`): A system-level instruction that guides the model's overall behavior and tone.
- **Thinking Mode** (type: boolean, field: `thinkingMode`): When you enable it, the model includes reasoning steps in a chain-of-thought style. You can't use it together with **Web Search**. Default: `false`
- **Web Search** (type: boolean, field: `webSearch`): When you enable it, the model performs built-in web searches for up-to-date information. You can't use it together with **Thinking Mode**. Default: `false`

## Templates and examples

[[ templatesWidget(page.title, 'moonshot-kimi') ]]

## Related resources

Refer to the [Moonshot Kimi documentation](https://platform.kimi.ai/docs/overview){:target="_blank" .external-link} for more information about the service.