---
title: Limit
description: >-
  Documentation for the Limit node in n8n, a workflow automation platform.
  Includes guidance on usage, and links to examples.
contentType:
  - integration
  - reference
priority: high
nodeTitle: Limit
originalFilePath: integrations/builtin/core-nodes/n8n-nodes-base.limit.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.limit'
url: 'https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.limit'
layout:
  description:
    visible: false
---

# Limit <a href="#limit" id="limit"></a>

Use the Limit node to remove items beyond a defined maximum number. You can choose whether n8n takes the items from the beginning or end of the input data.

## Node parameters <a href="#node-parameters" id="node-parameters"></a>

Configure this node using the following parameters.

### Max Items <a href="#max-items" id="max-items"></a>

Enter the maximum number of items that n8n should keep. If the input data contains more than this value, n8n removes the items.

### Keep <a href="#keep" id="keep"></a>

If the node has to remove items, select where it keeps the input items from:

* **First Items**: Keeps the **Max Items** number of items from the beginning of the input data.
* **Last Items**: Keeps the **Max Items** number of items from the end of the input data.

## Templates and examples <a href="#templates-and-examples" id="templates-and-examples"></a>


[Browse Limit integration templates](https://n8n.io/integrations/limit) or [search all templates](https://n8n.io/workflows/)

## Related resources <a href="#related-resources" id="related-resources"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/0nvcx1EqJQgGVzUXOOMN/" %}
