---
title: Streaming responses
contentType: howto
nodeTitle: Stream real-time responses
originalFilePath: workflows/streaming.md
originalUrl: https://docs.n8n.io/workflows/streaming
url: >-
  https://docs.n8n.io/build/understand-workflows/understand-executions/stream-real-time-responses
description: Build a workflow with streaming responses
layout:
  width: default
  title:
    visible: true
  description:
    visible: false
  tableOfContents:
    visible: true
  outline:
    visible: true
  pagination:
    visible: true
  metadata:
    visible: true
  tags:
    visible: true
  actions:
    visible: true
---

# Stream real-time responses

{% hint style="info" %}
**Feature availability**

Available on all plans.
{% endhint %}

Streaming responses let you send data back to users as an AI Agent node generates it. This is useful for chatbots, where you want to show the user the answer as it's generated to provide a better user experience.

You can enable streaming using either:

* The [Chat Trigger](/broken/spaces/BKcbOzIWja8NfqKDcqHc/pages/ufgV9cVbZYhO7UuKUvU1)
* The [Webhook node](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes/n8n-nodes-base.webhook)

In both cases, set the node's **Response Mode** to **Streaming**.

## Configure nodes for streaming <a href="#configure-nodes-for-streaming" id="configure-nodes-for-streaming"></a>

To stream data, you need to add nodes to the workflow that support streaming output. Not all nodes support this feature.

1. Choose a node that supports streaming, such as:
   * [AI agent](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent)
   * [Respond to Webhook](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes/n8n-nodes-base.respondtowebhook)
2. You can disable streaming in the options of these nodes. By default, they stream data whenever the executed trigger has its `Response Mode` set to `Streaming response`.

## Important information <a href="#important-information" id="important-information"></a>

Keep in mind the following details when configuring streaming responses:

* **Trigger**: Your trigger node must support streaming and have streaming configured. Without this, the workflow behaves according to your response mode settings.
* **Node configuration**: Even with streaming enabled on the trigger, you need at least one node configured to stream data. Otherwise, your workflow will send no data.
