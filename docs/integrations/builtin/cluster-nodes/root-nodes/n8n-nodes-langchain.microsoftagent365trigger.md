---
title: Microsoft Agent 365 Trigger node documentation
description: >-
  Learn how to use the Microsoft Agent 365 Trigger node in n8n. Follow technical
  documentation to integrate Microsoft Agent 365 Trigger node into your
  workflows.
contentType:
  - integration
  - reference
priority: medium
nodeTitle: Root nodes
originalFilePath: >-
  integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.microsoftagent365trigger/index.md
originalUrl: >-
  https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.microsoftagent365trigger
url: 'https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.microsoftagent365trigger'
layout:
  description:
    visible: false
---

# Microsoft Agent 365 Trigger node <a href="#microsoft-agent-365-trigger-node" id="microsoft-agent-365-trigger-node"></a>

{% hint style="warning" %}
**Early preview**

This is an early preview for building agents with Microsoft Agent 365 and n8n. You need to be part of the [Frontier preview program](https://adoption.microsoft.com/copilot/frontier-program/) to get early access to Microsoft Agent 365.
{% endhint %}

Use the Microsoft Agent 365 Trigger node to receive messages from Microsoft Agent 365 and respond with AI-powered agent capabilities. This node allows n8n to act as the backend for your Agent 365 agents.

{% hint style="info" %}
**Credentials**

You can find authentication information for this node [here](../../credentials/microsoftagent365.md).
{% endhint %}

## Node connectors <a href="#node-connectors" id="node-connectors"></a>

The Microsoft Agent 365 Trigger node can connect to the following sub-nodes:

- **Model**: Connect a language model (Chat model sub-node) to process incoming messages
- **Memory**: Connect a memory sub-node to maintain conversation context. A single n8n workflow powers multiple Agent instances on the Microsoft side, so multiple users will interact with the same workflow. Choose your session ID key carefully to scope conversations to individual Agent instances and prevent conversation history from bleeding between them.
- **Tool**: Connect tool sub-nodes to give your agent additional capabilities

## Node options <a href="#node-options" id="node-options"></a>

### Enable Microsoft Work IQ Tools for A365 <a href="#enable-microsoft-work-iq-tools-for-a365" id="enable-microsoft-work-iq-tools-for-a365"></a>

Toggle this option to give your agent access to Microsoft 365 tools through the Model Context Protocol (MCP). Default: Off.

When enabled, select one of:

- **All**: Enable all available Microsoft MCP tools
- **Selected**: Choose specific tools from the list:
	- Calendar
	- Mail
	- SharePoint
	- Teams
	- Word
	- and more

## Getting started <a href="#getting-started" id="getting-started"></a>

We recommend following these resources to set up your Agent 365 integration:

1. [Microsoft Agent 365 developer documentation](https://learn.microsoft.com/en-us/microsoft-agent-365/developer/): Official documentation for building agents with Microsoft Agent 365
2. [Agent 365 CLI Documentation](https://learn.microsoft.com/en-us/microsoft-agent-365/developer/agent-365-cli): Cross-platform command-line tool for deploying and managing Agent 365 applications on Azure

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [Microsoft Agent 365 developer documentation](https://learn.microsoft.com/en-us/microsoft-agent-365/developer/) for more information about the service.

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/TbnZmZEDZnkAWTXWp8th/" %}
