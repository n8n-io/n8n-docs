---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: OpenAI Chat Model node common issues
description: Documentation for common issues and questions in the OpenAI Chat Model node in n8n, a workflow automation platform. Includes details of the issue and suggested solutions.
contentType: integration
priority: high
---

# OpenAI Chat Model node common issues

Here are some common errors and issues with the [OpenAI Chat Model node](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatopenai/) and steps to resolve or troubleshoot them.

## Processing parameters

The OpenAI Chat Model node is a sub-node. Sub-nodes behave differently than other nodes when processing multiple items using expressions.

Most nodes, including root nodes, take any number of items as input, process these items, and output the results. You can use expressions to refer to input items, and the node resolves the expression for each item in turn. For example, given an input of five name values, the expression `{{ $json.name }}` resolves to each name in turn.

In sub-nodes, the expression always resolves to the first item. For example, given an input of five name values, the expression `{{ $json.name }}` always resolves to the first name.
