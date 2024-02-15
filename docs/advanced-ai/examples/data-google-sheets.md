---
contentType: howto
title: Chat with a Google Sheet using AI
description: Use the n8n workflow tool to load data from Google Sheets into your AI workflow.
workflowFile: chat_with_google_sheets_docs_version.json
---

# Chat with a Google Sheet using AI

Use n8n to bring your own data to AI. This workflow uses the [Chat Trigger](/integrations/builtin/core-nodes/n8n-nodes-langchain.chattrigger/) to provide the chat interface, and the [Custom n8n Workflow Tool](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolworkflow/) to call a second workflow that queries Google Sheets.

<figure markdown>
!["Screenshot of the two workflows in this example"](/_images/advanced-ai/examples/chat-with-google-sheets.png)
<figcaption markdown>[Download the example workflow](/_workflows/advanced-ai/examples/[[ page.meta.workflowFile ]])</figcaption>
</figure>

## Key features

This workflow uses:

* [Chat Trigger](/integrations/builtin/core-nodes/n8n-nodes-langchain.chattrigger/): start your workflow and respond to user chat interactions. The node provides a customizable chat interface.
* [Agent](/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/): the key piece of the AI workflow. The Agent interacts with other components of the workflow and makes decisions about what tools to use.
* [Custom n8n Workflow Tool](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolworkflow/): plug in n8n workflows as custom tools. In AI, a tool is an interface the AI can use to interact with the world (in this case, the data provided by your workflow). It allows the AI model to access information beyond its built-in dataset.

[[% include "_includes/advanced-ai/examples-color-key.html" %]]
