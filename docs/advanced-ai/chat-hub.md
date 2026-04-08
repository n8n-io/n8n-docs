---
title: Chat Hub
description: 
status: beta
---

# Chat Hub

## Overview

Chat Hub is a centralized AI chat interface where you can access multiple AI models, interact with n8n agents, and create your own agents. Chat Hub also introduces Chat user, a role that lets users interact with the chat interface without accessing n8n workflows.

## How to use

To use Chat Hub, find the **Chat** option in the navigation bar, select a model, and start a conversation.

### Creating simple personal agents

To make AI more reliable for simple, repetitive tasks, you can create Custom Agents with custom instructions. To create a simple personal agent:

1. Click on **Personal Agents** and then **+New Agent**.
2. Define the name, description, system prompt, preferred model, and access to tools.
3. Select **Save**.

Once created, you can select the personal agent from the model selector.

### Using n8n workflows agents

For more complex scenarios, use n8n workflow agents (built by you or your colleagues) to make your workflows available in Chat Hub. Right now, you can only use workflows that have a **Chat Trigger** with streaming enabled in the **Agent** node. To make your workflow available:

1. Open your selected workflow.
2. Open the **Chat Trigger**.
    
    /// note
    Only chat triggers of the newest version will work. To get the newest chat trigger version, delete your existing chat trigger and insert a new one.
    ///
    
3. Enable the **Make Available in n8n Chat** option and set the name and description of the personal agent.
4. Make sure that your AI Agent node has the **Enable Streaming** option enabled.
5. Activate your workflow.

Once defined, you can select your workflow from the model selector in Chat Hub. Your colleagues need access to the workflow by sharing it or having it in a project where they have at least viewer access.

## Managing permissions

You can define which users can perform which actions through n8n's role system. Chat Hub also gives you more ways to control who uses what.

### Chat user role

The Chat user is a role for people in your organization who want to use workflows without building them. Chat users only see the chat interface and can't add credentials or workflows by default.

Chat users are only available on Starter, Pro, Business and Enterprise plans.

### Provider settings

Admins can control which models and providers users can access in Chat Hub. This includes:

- Enabling or disabling specific models and providers
- Preventing users from adding their own models
- Setting default credentials for each provider
- Restricting users from adding their own credentials (through n8n's permission system)

To manage these settings, go to **Settings > Chat** and edit the providers.

## Considerations and limitations

1. You can't add file knowledge when creating simple personal agents.
2. Tool selection is limited to a few options.
2. Only workflows with [Chat Trigger node](/integrations/builtin/core-nodes/n8n-nodes-langchain.chattrigger/index.md) and streaming-enabled [AI Agent node](/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/index.md) work as workflow agents. Your workflows must meet specific requirements.