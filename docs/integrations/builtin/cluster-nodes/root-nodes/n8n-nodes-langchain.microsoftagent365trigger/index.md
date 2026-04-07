---
title: Microsoft Agent 365 Trigger node documentation
description: Learn how to use the Microsoft Agent 365 Trigger node in n8n. Follow technical documentation to integrate Microsoft Agent 365 Trigger node into your workflows.
contentType: [integration, reference]
priority: medium
---

# Microsoft Agent 365 Trigger node

/// warning | Early preview
This is an early preview for building agents with Microsoft Agent 365 and n8n. You need to be part of the [Frontier preview program](https://adoption.microsoft.com/copilot/frontier-program/) to get early access to Microsoft Agent 365.
///

Use the Microsoft Agent 365 Trigger node to receive messages from Microsoft Agent 365 and respond with AI-powered agent capabilities. This node allows n8n to act as the backend for your Agent 365 agents.

/// note | Credentials
You can find authentication information for this node [here](/integrations/builtin/credentials/microsoftagent365.md).
///

## Node connectors

The Microsoft Agent 365 Trigger node can connect to the following sub-nodes:

- **Model**: Connect a language model (Chat model sub-node) to process incoming messages
- **Memory**: Connect a memory sub-node to maintain conversation context
- **Tool**: Connect tool sub-nodes to give your agent additional capabilities

## Node options

### Enable Microsoft MCP Tools

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

## Getting started

We recommend following these resources to set up your Agent 365 integration:

1. [n8n Sample Agent Documentation](https://github.com/microsoft/Agent365-Samples/tree/main/nodejs/n8n/sample-agent): Example n8n agent implementation with Microsoft Agent 365
2. [Agent 365 CLI Documentation](https://learn.microsoft.com/en-us/microsoft-agent-365/developer/agent-365-cli): Cross-platform command-line tool for deploying and managing Agent 365 applications on Azure

## Known limitations

### No conversation context in metadata

Currently, incoming messages don't include metadata to link memory to a specific user or conversation context. This functionality is coming soon.

## Related resources

Refer to [Microsoft Agent 365 developer documentation](https://learn.microsoft.com/en-us/microsoft-agent-365/developer/) for more information about the service.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"
