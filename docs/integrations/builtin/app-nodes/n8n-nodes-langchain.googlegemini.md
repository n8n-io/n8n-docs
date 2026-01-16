---
title: Google Gemini node documentation
description: Learn how to use the Google Gemini node in n8n. Follow technical documentation to integrate Google Gemini node into your workflows.
contentType: [integration, reference]
---

# Google Gemini node

Use the Google Gemini node to automate work in Google Gemini and integrate Google Gemini with other applications. n8n has built-in support for a wide range of Google Gemini features, including working with audio, videos, images, documents, and files to analyze, generate, and transcribe.

On this page, you'll find a list of operations the Google Gemini node supports, and links to more resources.

///  note  | Credentials
You can find authentication information for this node [here](/integrations/builtin/credentials/googleai.md).
///


## Operations

* Audio:
	* Analyze Audio: Take in audio and answer questions about it.
	* Transcribe a Recording: Transcribes audio into text.
* Document:
	* Analyze Document: Take in documents and answer questions about them.
* File Search:
	* Create File Search Store: Create a new File Search store for RAG (Retrieval Augmented Generation)
	* Delete File Search Store: Delete File Search Store
	* List File Search Stores: List all File Search stores owned by the user
	* Upload to File Search Store: Upload a file to a File Search store for RAG (Retrieval Augmented Generation)
* Image:
	* Analyze Image: Take in images and answer questions about them.
	* Generate an Image: Creates an image from a text prompt.
	* Edit Image: Upload one or more images and apply edits based on a prompt
* Media File:
	* Upload Media File: Upload a file to the Google Gemini API for later user.
* Text:
	* Message a Model: Create a completion with a Google Gemini model.
* Video:
	* Analyze Video: Take in videos and answer questions about them.
	* Generate a Video: Creates a video from a text prompt.
	* Download Video: Download a generated video from the Google Gemini API using a URL.

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'google-gemini') ]]

## Related resources

<!-- add a link to the service's documentation. This should usually go direct to the API docs -->
Refer to [Google Gemini's documentation](https://ai.google.dev/gemini-api/docs) for more information about the service.

--8<-- "_snippets/integrations/builtin/app-nodes/operation-not-supported.md"
