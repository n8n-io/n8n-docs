---
contentType: howto
nodeTitle: Use the UI mapper
originalFilePath: data/data-mapping/data-mapping-ui.md
originalUrl: 'https://docs.n8n.io/data/data-mapping/data-mapping-ui'
url: 'https://docs.n8n.io/build/work-with-data/reference-data/use-the-ui-mapper'
layout:
  description:
    visible: false
---

# Referencing data in the UI <a href="#referencing-data-in-the-ui" id="referencing-data-in-the-ui"></a>

Data mapping means referencing data from previous nodes. It doesn't include changing (transforming) data, just referencing it.

When you need data from a particular node in your workflow, you can [reference nodes by name](reference-previous-nodes.md). This is useful when your workflow has multiple branches or when you need to access data from several steps back.

You can map data in the following ways:

* Using the expressions editor.
* By dragging and dropping data from the **INPUT** pane into node parameters. This generates the expression for you.

![Creating expressions in the UI](../../.gitbook/assets/expressionEditor.gif)

For information on errors with mapping and linking items, refer to [Item linking errors](link-data-items/item-linking-errors.md).

See [Common ways of referencing](reference-previous-nodes.md#common-ways-of-referencing).
