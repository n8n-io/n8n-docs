---
title: OpenAI Chat Model node common issues
description: >-
  Documentation for common issues and questions in the OpenAI Chat Model node in
  n8n, a workflow automation platform. Includes details of the issue and
  suggested solutions.
contentType:
  - integration
  - reference
priority: high
nodeTitle: OpenAI Chat Model node common issues
originalFilePath: >-
  integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatopenai/common-issues.md
originalUrl: >-
  https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatopenai/common-issues
url: >-
  https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatopenai/common-issues
layout:
  description:
    visible: false
---

# OpenAI Chat Model node common issues <a href="#openai-chat-model-node-common-issues" id="openai-chat-model-node-common-issues"></a>

Here are some common errors and issues with the [OpenAI Chat Model node](README.md) and steps to resolve or troubleshoot them.

## Processing parameters <a href="#processing-parameters" id="processing-parameters"></a>

The OpenAI Chat Model node is a sub-node[^1]. Sub-nodes behave differently than other nodes when processing multiple items using expressions.

Most nodes, including [root nodes](#user-content-fn-2)[^2], take any number of items as input, process these items, and output the results. You can use expressions to refer to input items, and the node resolves the expression for each item in turn. For example, given an input of five name values, the expression `{{ $json.name }}` resolves to each name in turn.

In sub-nodes, the expression always resolves to the first item. For example, given an input of five name values, the expression `{{ $json.name }}` always resolves to the first name.

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/wqdQXLzKrIsqxA7CuhxT/" %}

[^1]: n8n cluster nodes consist of one or more sub nodes connected to a root node. Sub nodes extend the functionality of the root node, providing access to specific services or resources or offering specific types of dedicated processing, like calculator functionality, for example.
[^2]: Each n8n cluster node contains a single root nodes that defines the main functionality of the cluster. One or more sub nodes attach to the root node to extend its functionality.
