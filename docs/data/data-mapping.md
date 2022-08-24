# Data mapping

Data mapping means referencing data from previous nodes. It doesn't include changing (transforming) data, just referencing it.

You can map data in the following ways:

* Using the expressions editor. Refer to [expressions](/code-examples/expressions/) for more information.
* By dragging and dropping data from the **INPUT** table into parameters. This generates the expression for you.

## How to drag and drop data

1. Run your workflow to load data.
2. Open the node where you need to map data.
3. Make sure the **INPUT** view is in **Table** layout.
4. Click and hold a table heading to map top level data, or a field in the table to map nested data.	
5. Drag the item into the parameter field where you want to use the data.

### Understand nested data

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

!["Screenshot of a table in the INPUT panel. It includes a top level field named "nested". This field contains nested data, which is indicated in bold."](/_images/data/data-mapping/nested-data.png)
