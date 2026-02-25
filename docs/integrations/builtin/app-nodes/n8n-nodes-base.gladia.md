---
title: Gladia node documentation
description: Learn how to use the Gladia node in n8n. Follow technical documentation to integrate Gladia node into your workflows.
contentType: [integration, reference]
---

# Gladia node

Use the Gladia node to automate work in Gladia, and integrate Gladia with other applications. n8n has built-in support for Gladia's async speech-to-text transcription API, enabling you to transcribe audio files from URLs or binary data.

On this page, you'll find a list of operations the Gladia node supports, and links to more resources.

///  note  | Credentials
Refer to [Gladia credentials](/integrations/builtin/credentials/gladia.md) for guidance on setting up authentication.
///

## Operations

* **Transcription**
    * Transcribe an audio file

## Node parameters

### Audio Source

Choose how to provide the audio file:

- **URL**: Provide a direct URL to the audio file.
- **Binary Data**: Use binary data from a previous node. Specify the **Input Binary Field** name (defaults to `data`).

### Wait for Completion

When enabled (default), the node polls the Gladia API until the transcription is complete and returns the full result. When disabled, the node returns the transcription ID immediately for later retrieval.

### Options

- **Context Prompt**: Provide context to improve transcription accuracy.
- **Custom Vocabulary**: Comma-separated list of custom vocabulary terms.
- **Detect Language**: Automatically detect the spoken language.
- **Diarization**: Enable speaker diarization with optional min/max speaker settings.
- **Enable Code Switching**: Support multi-language conversations.
- **Language**: Specify a language code (e.g., `en`, `fr`, `de`).
- **Named Entity Recognition**: Identify named entities in the transcription.
- **Polling Interval (Seconds)**: How often to check for completion (default: 5).
- **Polling Timeout (Seconds)**: Maximum wait time for completion (default: 600).
- **Sentiment Analysis**: Enable sentiment analysis on the transcription.
- **Subtitles**: Generate subtitles in SRT and/or VTT formats.
- **Summarization**: Generate a summary of the transcription.
- **Translation**: Translate the transcription to target languages.

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'gladia') ]]

## Related resources

Refer to [Gladia's API documentation](https://docs.gladia.io/) for more information about the service.

--8<-- "_snippets/integrations/builtin/app-nodes/operation-not-supported.md"
