---
title: Chat Hub
description: null
status: beta
nodeTitle: Chat Hub
originalFilePath: advanced-ai/chat-hub.md
originalUrl: 'https://docs.n8n.io/advanced-ai/chat-hub'
url: 'https://docs.n8n.io/build/ways-of-building-workflows/chat-hub'
layout:
  description:
    visible: false
---

# Chat Hub <a href="#chat-hub" id="chat-hub"></a>

## Overview <a href="#overview" id="overview"></a>

Chat Hub is a centralized AI chat interface where you can access multiple AI models, interact with n8n agents, and create your own agents. Chat Hub also introduces Chat user, a role that lets users interact with the chat interface without accessing n8n workflows.

## How to use <a href="#how-to-use" id="how-to-use"></a>

To use Chat Hub, find the **Chat** option in the navigation bar, select a model, and start a conversation.

### Creating simple personal agents <a href="#creating-simple-personal-agents" id="creating-simple-personal-agents"></a>

To make AI more reliable for simple, repetitive tasks, you can create Custom Agents with custom instructions. To create a simple personal agent:

1. Click on **Personal Agents** and then **+New Agent**.
2. Define the name, description, system prompt, preferred model, and access to tools.
3. Select **Save**.

Once created, you can select the personal agent from the model selector.

### Using n8n workflows agents <a href="#using-n8n-workflows-agents" id="using-n8n-workflows-agents"></a>

For more complex scenarios, use n8n workflow agents (built by you or your colleagues) to make your workflows available in Chat Hub. Right now, you can only use workflows that have a **Chat Trigger** with streaming enabled in the **Agent** node. To make your workflow available:

1. Open your selected workflow.
2. Open the **Chat Trigger**.<br>
    
    <div data-gb-custom-block data-tag="hint" data-style="info" class="hint hint-info"><p>Only chat triggers of the newest version will work. To get the newest chat trigger version, delete your existing chat trigger and insert a new one.</p></div>
    
3. Enable the **Make Available in n8n Chat** option and set the name and description of the personal agent.
4. Make sure that your AI Agent node has the **Enable Streaming** option enabled.
5. Activate your workflow.

Once defined, you can select your workflow from the model selector in Chat Hub. Your colleagues need access to the workflow by sharing it or having it in a project where they have at least viewer access.

## Managing permissions <a href="#managing-permissions" id="managing-permissions"></a>

You can define which users can perform which actions through n8n's role system. Chat Hub also gives you more ways to control who uses what.

### Chat user role <a href="#chat-user-role" id="chat-user-role"></a>

The Chat user is a role for people in your organization who want to use workflows without building them. Chat users only see the chat interface and can't add credentials or workflows by default.

Chat users are only available on Starter, Pro, Business and Enterprise plans.

### Provider settings <a href="#provider-settings" id="provider-settings"></a>

Admins can control which models and providers users can access in Chat Hub. This includes:

- Enabling or disabling specific models and providers
- Preventing users from adding their own models
- Setting default credentials for each provider
- Restricting users from adding their own credentials (through n8n's permission system)

To manage these settings, go to **Settings > Chat** and edit the providers.

## Considerations and limitations <a href="#considerations-and-limitations" id="considerations-and-limitations"></a>

1. You can't add file knowledge when creating simple personal agents.
2. Tool selection is limited to a few options.
2. Only workflows with [Chat Trigger node](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes/n8n-nodes-base.compression/n8n-nodes-base.compression) and streaming-enabled [AI Agent node](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent) work as workflow agents. Your workflows must meet specific requirements.
