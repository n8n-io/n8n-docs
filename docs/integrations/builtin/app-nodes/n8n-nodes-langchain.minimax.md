---
title: MiniMax node documentation
description: The MiniMax node lets you interact with MiniMax AI models from n8n. This documentation explains how to integrate MiniMax into your n8n workflows to generate images, produce speech from text, generate videos, and send messages to language models.
contentType: [integration, reference]
---

# MiniMax node

The MiniMax node connects n8n workflows to MiniMax AI models. Use it to generate images from text prompts, synthesize speech, create videos from text or images, and send messages to MiniMax language models.

/// note | Credentials
You can find authentication information for this node [here](/integrations/builtin/credentials/minimax.md).
///

## Resources and operations

- **Audio**: Convert text to speech using MiniMax speech synthesis models.
- **Image**: Generate images from a text prompt.
- **Text**: Send messages to a MiniMax language model and receive responses.
- **Video**: Generate videos from a text prompt or a first-frame image.

### Text to speech

Convert text to speech using a MiniMax speech synthesis model.

**Parameters**

- **Model** (type: options, field: `modelId`): The speech synthesis model to use. Default: `speech-2.8-hd`
- **Text** (type: string, field: `text`): The text to convert to speech. Maximum 10,000 characters. Required.
- **Voice ID** (type: string, field: `voiceId`): The voice to use for synthesis. Browse available voices in the [MiniMax documentation](https://platform.minimax.io/docs/faq/system-voice-id){:target="_blank" .external-link}. Default: `English_Graceful_Lady`. Required.
- **Download Audio** (type: boolean, field: `downloadAudio`): Whether to download the generated audio as binary data. When disabled, the node returns only the audio URL. Default: `true`

**Options**

- **Audio Format** (type: options, field: `audioFormat`): Output audio format. Options: MP3, PCM, FLAC, WAV. The node supports WAV in non-streaming mode only. Default: `mp3`
- **Emotion** (type: options, field: `emotion`): Emotion to apply to the synthesized speech. The model automatically selects the most natural emotion. Default: `calm`
- **Language Boost** (type: options, field: `languageBoost`): Enhance recognition accuracy for a specific language. Default: `auto`
- **Pitch** (type: number, field: `pitch`): Pitch adjustment for the speech, from –12 to 12. `0` keeps the original pitch. Default: `0`
- **Speed** (type: number, field: `speed`): Speech speed from 0.5 to 2. Higher values produce faster speech. Default: `1`
- **Volume** (type: number, field: `volume`): Speech volume from 0.1 to 10. Higher values produce louder speech. Default: `1`

### Generate an image

Create an image from a text prompt using a MiniMax image generation model.

**Parameters**

- **Model** (type: options, field: `modelId`): The image generation model to use. Default: `image-01`
- **Prompt** (type: string, field: `prompt`): Text description of the image to generate. Maximum 1500 characters. Required.
- **Aspect Ratio** (type: options, field: `aspectRatio`): The aspect ratio of the generated image. Options include 1:1, 16:9, 9:16, 4:3, 3:4, 3:2, 2:3, and 21:9. Default: `1:1`
- **Number of Images** (type: number, field: `numberOfImages`): Number of images to generate per request, from one to nine. Default: `1`
- **Download Image** (type: boolean, field: `downloadImage`): Whether to download the generated image as binary data. When disabled, the node returns only the image URL. Default: `true`

**Options**

- **Prompt Optimizer** (type: boolean, field: `promptOptimizer`): Whether to automatically optimize the prompt for better results. Default: `false`
- **Seed** (type: number, field: `seed`): Random seed for reproducible outputs. Using the same seed with the same parameters produces the same image. Default: `0`

### Message a model

Send one or more messages to a MiniMax language model and receive its response.

**Parameters**

- **Model** (type: options, field: `modelId`): The language model to use. Default: `MiniMax-M2.7`
- **Messages** (type: fixedCollection, field: `messages`): One or more messages forming the conversation. Each message has:
    - **Prompt** (type: string, field: `content`): The text content of the message.
    - **Role** (type: options, field: `role`): The role of the message sender. Use `user` to send a message and receive a response, or `assistant` to set the model's tone or persona.
- **Simplify Output** (type: boolean, field: `simplify`): When enabled, the node returns a simplified response rather than the full raw API output. Default: `true`

**Options**

- **Hide Thinking** (type: boolean, field: `hideThinking`): Strip chain-of-thought reasoning from the response, returning only the final answer. Default: `true`
- **Maximum Number of Tokens** (type: number, field: `maxTokens`): Maximum number of tokens to generate. Default: `1024`
- **Max Tool Calls Iterations** (type: number, field: `maxToolsIterations`): Maximum number of tool-iteration cycles the model runs before stopping. One iteration can include multiple tool calls. Set to `0` for no limit. Default: `15`
- **Output Randomness (Temperature)** (type: number, field: `temperature`): Controls the randomness of the output. Lower values make the output more deterministic and repetitive. Range: 0–1. Default: `0.7`
- **Output Randomness (Top P)** (type: number, field: `topP`): Maximum cumulative probability of tokens to consider when sampling. Range: 0–1. Default: `0.95`
- **System Message** (type: string, field: `system`): A system-level instruction that guides the model's behavior and tone.

### Generate video from text

Generate a video from a text prompt using a MiniMax video generation model.

**Parameters**

- **Model** (type: options, field: `modelId`): The video generation model to use. Default: `MiniMax-Hailuo-2.3`
- **Prompt** (type: string, field: `prompt`): Text description of the video. Maximum 2000 characters. You can control camera movements using `[command]` syntax, for example `[Push in]` or `[Pan left]`. Required.
- **Duration (Seconds)** (type: options, field: `duration`): Duration of the generated video. Options: 6 seconds or 10 seconds. Default: `6`
- **Resolution** (type: options, field: `resolution`): Resolution of the generated video. Available options depend on the model. Options: 720P, 768P, 1080P. Default: `768P`
- **Download Video** (type: boolean, field: `downloadVideo`): Whether to download the generated video as binary data. When disabled, the node returns only the video URL. Default: `true`

**Options**

- **Prompt Optimizer** (type: boolean, field: `promptOptimizer`): Whether to automatically optimize the prompt for better results. Default: `true`

### Generate video from image

Generate a video using an image as the first frame.

**Parameters**

- **Model** (type: options, field: `modelId`): The video generation model to use. Default: `MiniMax-Hailuo-2.3`
- **Image Input Type** (type: options, field: `imageInputType`): How to provide the first frame image. Options: URL or Binary File. Default: `url`
- **Image URL** (type: string, field: `imageUrl`): Public URL of the first frame image. Supports JPG, JPEG, PNG, and WebP files up to 20MB. Displayed when **Image Input Type** is `URL`. Required.
- **Input Data Field Name** (type: string, field: `binaryPropertyName`): The name of the input field containing the binary image data. Displayed when **Image Input Type** is `Binary File`. Default: `data`. Required.
- **Prompt** (type: string, field: `prompt`): Optional text description of the video. Maximum 2000 characters. You can control camera movements using `[command]` syntax, for example `[Zoom in]`.
- **Duration (Seconds)** (type: options, field: `duration`): Duration of the generated video. Options: 6 seconds or 10 seconds. Default: `6`
- **Resolution** (type: options, field: `resolution`): Resolution of the generated video. Available options depend on the model. Options: 512P, 720P, 768P, 1080P. Default: `768P`
- **Download Video** (type: boolean, field: `downloadVideo`): Whether to download the generated video as binary data. When disabled, the node returns only the video URL. Default: `true`

**Options**

- **Prompt Optimizer** (type: boolean, field: `promptOptimizer`): Whether to automatically optimize the prompt. Default: `true`
- **Last Frame Image Input Type** (type: options, field: `lastFrameInputType`): Provide a last frame image to generate a first-and-last-frame video. MiniMax-Hailuo-2.3 and MiniMax-Hailuo-02 support this option only. Default: `none`
    - **Last Frame Image URL** (type: string, field: `lastFrameImageUrl`): Public URL of the last frame image. Displayed when **Last Frame Image Input Type** is `URL`.
    - **Last Frame Data Field Name** (type: string, field: `lastFrameBinaryPropertyName`): The binary field name containing the last frame image. Displayed when **Last Frame Image Input Type** is `Binary File`. Default: `lastFrame`
- **Subject Reference Input Type** (type: options, field: `subjectReferenceInputType`): Provide a face photo to maintain facial consistency in the generated video. MiniMax-Hailuo-2.3 supports this option only. Default: `none`
    - **Subject Reference Image URL** (type: string, field: `subjectReferenceImageUrl`): Public URL of the reference face image. Displayed when **Subject Reference Input Type** is `URL`.
    - **Subject Reference Data Field Name** (type: string, field: `subjectReferenceBinaryPropertyName`): The binary field name containing the reference face image. Displayed when **Subject Reference Input Type** is `Binary File`. Default: `subjectReference`

## Templates and examples

[[ templatesWidget(page.title, 'minimax') ]]

## Related resources

Refer to the [MiniMax documentation](https://platform.minimax.io/docs){:target="_blank" .external-link} for more information about the service.