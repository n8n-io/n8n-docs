---
title: Alibaba Cloud Model Studio node documentation
description: Interact with Alibaba Cloud Qwen models via Model Studio. This page explains how to use the node in n8n workflows to generate text completions, analyze or generate images, and create videos from text or images.
contentType: [integration, reference]
---

# Alibaba Cloud Model Studio node

The Alibaba Cloud Model Studio node lets you call Alibaba Cloud Qwen models (text, vision, and media models) from n8n. Use it to generate completions, analyze or create images, and produce short videos from text or images.

/// note | Credentials
You can find authentication information for this node [here](/integrations/builtin/credentials/alibaba.md).
///

## Resources and operations

- **Text**: Message a model to create text completions and agent-like responses.
- **Image**: Analyze images with vision-language models or generate images from prompts.
- **Video**: Generate short videos from text or from one or more images.

### Message a model

Create a completion with a Qwen model.

**Parameters**

- **Model** (type: options, field: `modelId`): The model to use for generation (for example, Qwen3.5 Flash, Qwen3 Max).
- **Messages** (type: fixedCollection, field: `messages`): One or more messages forming the conversation.
    - Message values:
        - **Content** (type: string, field: `content`): The content of the message.
        - **Role** (type: options, field: `role`): The role of the message sender (User or Assistant).
- **Simplify Output** (type: boolean, field: `simplify`): Return a simplified version of the response instead of the full raw API output.

**Options**

- **Enable Search** (type: boolean, field: `enableSearch`): Enable web search for up-to-date information.
- **Max Tokens** (type: number, field: `maxTokens`): Maximum number of tokens to generate.
- **Max Tools Iterations** (type: number, field: `maxToolsIterations`): Maximum number of tool-calling iterations before stopping. Set to zero for unlimited.
- **Repetition Penalty** (type: number, field: `repetitionPenalty`): Penalty for token repetition. Higher values reduce repetition.
- **Seed** (type: number, field: `seed`): Random seed for reproducible outputs.
- **Stop Sequences** (type: string, field: `stop`): Comma-separated list of sequences where the API will stop generating.
- **System Message** (type: string, field: `system`): System instruction for the model.
- **Temperature** (type: number, field: `temperature`): Controls randomness. Lower = more deterministic.
- **Top K** (type: number, field: `topK`): Limits sampling pool to top K tokens.
- **Top P** (type: number, field: `topP`): Nucleus sampling parameter.

### Analyze image

Take images as input and ask vision-language questions about them.

**Parameters**

- **Model** (type: options, field: `modelId`): Vision-language model to use (for example, Qwen-VL Flash).
- **Input Type** (type: options, field: `inputType`): How to provide the image (URL or binary data).
- **Image URL** (type: string, field: `imageUrl`): The URL of the image to analyze (required when using URL input).
- **Input Data Field Name** (type: string, field: `binaryPropertyName`): Binary field name to read the image from when using binary input.
- **Question** (type: string, field: `question`): The question or instruction about the image.
- **Simplify Output** (type: boolean, field: `simplify`): Return a simplified version of the response.

**Options**

- **Temperature** (type: number, field: `temperature`): Controls randomness for the vision model.
- **Max Tokens** (type: number, field: `maxTokens`): Maximum number of tokens for the vision model output.

### Generate an image

Create an image from a text prompt.

**Parameters**

- **Model** (type: options, field: `modelId`): Image-generation model to use (for example, Z-Image Turbo).
- **Prompt** (type: string, field: `prompt`): The text prompt describing the image to generate.
- **Download Image** (type: boolean, field: `downloadImage`): When true, download the generated image as binary data; otherwise only the URL is returned.

**Options**

- **Size** (type: options, field: `size`): The size of the generated image (for example, 1024*1024, 1664*928).
- **Prompt Extend** (type: boolean, field: `promptExtend`): Automatically extend and enhance the prompt.

### Generate video from text

Generate a short video from a text prompt.

**Parameters**

- **Model** (type: options, field: `modelId`): Text-to-video model to use (for example, Wan 2.6 Text-to-Video).
- **Prompt** (type: string, field: `prompt`): The text prompt to generate the video from.
- **Resolution** (type: options, field: `resolution`): Resolution tier (720P or 1080P).
- **Duration (Seconds)** (type: number, field: `duration`): Duration of the generated video in seconds (2–15).
- **Shot Type** (type: options, field: `shotType`): Single or Multi (multi-shot narrative).
- **Download Video** (type: boolean, field: `downloadVideo`): When true, download the generated video as binary data; otherwise only the URL is returned.
- **Simplify Output** (type: boolean, field: `simplify`): Return a simplified response.

**Options**

- **Prompt Extend** (type: boolean, field: `promptExtend`): Automatically extend and enhance the prompt.
- **Audio** (type: boolean, field: `audio`): Whether to generate audio for the video.
- **Audio Input Type** (type: options, field: `audioInputType`): Must be specified when the **Audio** option is activated. It defines how to provide audio, via an audio URL, or a binary file.
- **Audio URL** (type: string, field: `audioUrl`): Must be specified when **Audio Input Type** is set to URL. Defines the URL of the audio file to use.
- **Audio Data Field Name** (type: string, field: `audioBinaryPropertyName`): Must be specified when **Audio Input Type** is set to **Binary File**. Defines the binary field name for audio input.

### Generate video from image

Generate a video from one or more images using Wan models.

**Parameters**

- **Model** (type: options, field: `modelId`): Image-to-video model to use (for example, Wan 2.6 Image-to-Video Flash).
- **Input Type** (type: options, field: `inputType`):  Defines how to provide the image, via an image URL, or a binary file.
- **Image URL** (type: string, field: `imgUrl`): URL of the first-frame image to generate video from.
- **Input Data Field Name** (type: string, field: `binaryPropertyName`): Binary field name to read the image from when using binary input.
- **Prompt** (type: string, field: `prompt`): Optional text describing desired content and visual characteristics.
- **Resolution** (type: options, field: `resolution`): Resolution tier (720P or 1080P).
- **Duration (Seconds)** (type: number, field: `duration`): Duration in seconds (2–15).
- **Shot Type** (type: options, field: `shotType`): Single or multi-shot narrative.
- **Download Video** (type: boolean, field: `downloadVideo`): When true, download the generated video as binary data; otherwise only the URL is returned.
- **Simplify Output** (type: boolean, field: `simplify`): Return a simplified response.

**Options**

- **Prompt Extend** (type: boolean, field: `promptExtend`): Automatically extend and enhance the prompt.
- **Audio** (type: boolean, field: `audio`): Whether to generate audio for the video.
- **Audio Input Type** (type: options, field: `audioInputType`): Defines how to provide audio, via an audio URL, or a binary file.
- **Audio URL** (type: string, field: `audioUrl`): URL of the audio file to use, when **Audio Input Type** is set to URL.
- **Audio Data Field Name** (type: string, field: `audioBinaryPropertyName`): Binary field name for audio input, when **Audio Input Type** is set to binary data.

## Templates and examples

[[ templatesWidget(page.title, 'alibaba-cloud-model-studio') ]]

## Related resources

Refer to [Alibaba Cloud Model Studio documentation](https://www.alibabacloud.com/product/qwen){:target=\"_blank\" .external-link} for more information about available models and API behavior.