---
title: Model Selector
description: >-
  Learn how to use the Model Selector node in n8n. Follow technical
  documentation to integrate Model Selector node into your workflows.
contentType:
  - integration
  - reference
priority: high
nodeTitle: Model Selector
originalFilePath: >-
  integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.modelselector.md
originalUrl: >-
  https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.modelselector
url: >-
  https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.modelselector
layout:
  description:
    visible: false
---

# Model Selector <a href="#model-selector" id="model-selector"></a>

The Model Selector node dynamically selects one of the connected language models during workflow execution based on a set of defined conditions. This enables implementing fallback mechanisms for error handling or choosing the optimal model for specific tasks.

This page covers node parameters for the Model Selector node and includes links to related resources.

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/L75pqqTYRK2D04H3RzmB/" %}

## Node parameters <a href="#node-parameters" id="node-parameters"></a>

### Number of Inputs <a href="#number-of-inputs" id="number-of-inputs"></a>

Specifies the number of input connections available for attaching language models.

### Rules <a href="#rules" id="rules"></a>

Each rule defines the model to use when specific conditions match.

The Model Selector node evaluates rules sequentially, starting from the first input, and stops evaluation as soon as it finds a match. This means that if multiple rules would match, n8n will only use the model defined by the first matching rule.

## Templates and examples <a href="#templates-and-examples" id="templates-and-examples"></a>


[Browse Model Selector integration templates](https://n8n.io/integrations/model-selector) or [search all templates](https://n8n.io/workflows/)

## Related resources <a href="#related-resources" id="related-resources"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/TbnZmZEDZnkAWTXWp8th/" %}
