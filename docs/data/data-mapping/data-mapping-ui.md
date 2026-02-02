---
contentType: howto
---

# Referencing data in the UI

Data mapping means referencing data from previous nodes. It doesn't include changing (transforming) data, just referencing it.

You can map data in the following ways:

* Using the expressions editor.
* By dragging and dropping data from the **INPUT** pane into node parameters. This generates the expression for you.

![Creating expressions in the UI](/_images/data/data-mapping/expressionEditor.gif)

For information on errors with mapping and linking items, refer to [Item linking errors](/data/data-mapping/data-item-linking/item-linking-errors.md).

## Schema Preview

Schema Preview shows expected schema data from the previous node without requiring credentials or execution. This lets you build workflows using field structure even before connecting to real data sources.

To use Schema Preview:

1. Add a node with Schema Preview to your workflow.
1. Open the next node in the sequence. The Schema Preview data appears in the Node Editor.
1. Drag and drop fields from the preview into your node parameters, just like regular data.

## Understand what you're mapping with drag and drop

Data mapping maps the field path, and loads the field's value. For example, given the following data:

```js
[
	{
		"fruit": "apples",
		"color": "green"
	}
]
```

You can map `fruit` by dragging and dropping **fruit** from the **INPUT** into the field where you want to use its value. This creates an expression, `{{ $json.fruit }}`. When the node iterates over input items, the value of the field becomes the value of `fruit` for each item.

## Understand nested data

Given the following data:

```js
[
  {
    "name": "First item",
    "nested": {
      "example-number-field": 1,
      "example-string-field": "apples"
    }
  },
  {
    "name": "Second item",
    "nested": {
      "example-number-field": 2,
      "example-string-field": "oranges"
    }
  }
]
```

n8n displays it in table form like this:

!["Screenshot of a table in the INPUT panel. It includes a top level field named "nested." This field contains nested data, which is indicated in bold."](/_images/data/data-mapping/nested-data.png)

