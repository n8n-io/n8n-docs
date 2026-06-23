---
title: Structured Output Parser node common issues
description: >-
  Documentation for common issues and questions in the Structured Output Parser
  node in n8n, a workflow automation platform. Includes details of the issue and
  suggested solutions.
contentType:
  - integration
  - reference
priority: high
nodeTitle: Structured Output Parser node common issues
originalFilePath: >-
  integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.outputparserstructured/common-issues.md
originalUrl: >-
  https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.outputparserstructured/common-issues
url: >-
  https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.outputparserstructured/common-issues
layout:
  description:
    visible: false
---

# Structured Output Parser node common issues <a href="#structured-output-parser-node-common-issues" id="structured-output-parser-node-common-issues"></a>

Here are some common errors and issues with the [Structured Output Parser node](README.md) and steps to resolve or troubleshoot them.

## Processing parameters <a href="#processing-parameters" id="processing-parameters"></a>

The Structured Output Parser node is a [sub-node](https://app.gitbook.com/s/CxSeOtVxqqhfxMSac0AV/key-concept-glossary#sub-node-n8n). Sub-nodes behave differently than other nodes when processing multiple items using expressions.

Most nodes, including [root nodes](https://app.gitbook.com/s/CxSeOtVxqqhfxMSac0AV/key-concept-glossary#root-node-n8n), take any number of items as input, process these items, and output the results. You can use expressions to refer to input items, and the node resolves the expression for each item in turn. For example, given an input of five name values, the expression `{{ $json.name }}` resolves to each name in turn.

In sub-nodes, the expression always resolves to the first item. For example, given an input of five name values, the expression `{{ $json.name }}` always resolves to the first name.

## Adding the structured output parser node to AI nodes <a href="#adding-the-structured-output-parser-node-to-ai-nodes" id="adding-the-structured-output-parser-node-to-ai-nodes"></a>

You can attach output parser nodes to select [AI root nodes](../../root-nodes/README.md).

To add the Structured Output Parser to a node, enable the **Require Specific Output Format** option in the AI root node you wish to format. Once the option is enabled, a new **output parser** attachment point is displayed. Click the **output parser** attachment point to add the Structured Output Parser node to the node.

## Using the structured output parser to format intermediary steps <a href="#using-the-structured-output-parser-to-format-intermediary-steps" id="using-the-structured-output-parser-to-format-intermediary-steps"></a>

The Structured Output Parser node structures the final output from AI agents. It's not intended to structure intermediary output to pass to other AI tools or stages.

To request a specific format for intermediary output, include the response structure in the **System Message** for the **AI Agent**. The message can include either a schema or example response for the agent to use as a template for its results.

## Structuring output from agents <a href="#structuring-output-from-agents" id="structuring-output-from-agents"></a>

Structured output parsing is often not reliable when working with [agents](../../root-nodes/n8n-nodes-langchain.agent/README.md).

If your workflow uses agents, n8n recommends using a separate [LLM-chain](../../root-nodes/n8n-nodes-langchain.chainllm.md) to receive the data from the agent and parse it. This leads to better, more consistent results than parsing directly in the agent workflow.
