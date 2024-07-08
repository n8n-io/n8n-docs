---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Limit
description: Documentation for the Limit node in n8n, a workflow automation platform. Includes guidance on usage, and links to examples.
---

# Limit

Use the Limit node to remove items beyond a defined maximum number. You can choose whether n8n takes the items from the beginning or end of the input data.

## Node parameters

* **Max Items**: enter the maximum number of items that n8n should keep. If the input data contains more than this value, n8n removes the items.
* **Keep**: when items must be removed, select if n8n keeps the input items at the beginning or end.

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(title, 'limit') ]]

## Related resources

--8<-- "_snippets/integrations/builtin/core-nodes/data-transformation-actions/data-section-link.md"
