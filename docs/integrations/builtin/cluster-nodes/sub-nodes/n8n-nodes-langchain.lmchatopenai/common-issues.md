---
title: OpenAI Chat Model node common issues
description: Documentation for common issues and questions in the OpenAI Chat Model node in n8n, a workflow automation platform. Includes details of the issue and suggested solutions.
contentType: [integration, reference]
priority: high
---

# OpenAI Chat Model node common issues

Here are some common errors and issues with the [OpenAI Chat Model node](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatopenai/index.md) and steps to resolve or troubleshoot them.

## Processing parameters

The OpenAI Chat Model node is a [sub-node](/glossary.md#sub-node-n8n). Sub-nodes behave differently than other nodes when processing multiple items using expressions.

Most nodes, including [root nodes](/glossary.md#root-node-n8n), take any number of items as input, process these items, and output the results. You can use expressions to refer to input items, and the node resolves the expression for each item in turn. For example, given an input of five name values, the expression `{{ $json.name }}` resolves to each name in turn.

In sub-nodes, the expression always resolves to the first item. For example, given an input of five name values, the expression `{{ $json.name }}` always resolves to the first name.

--8<-- "_snippets/integrations/openai-api-issues.md"
