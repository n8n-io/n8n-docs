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

## Map data in the expressions editor

These examples show how to access linked items in the expressions editor.


### Access the linked item in a previous node's output


When you use this, n8n works back up the item linking chain, to find the parent item in the given node.

```js
// Returns the linked item
{{$("<node-name>").item}}
```

As a longer example, consider a scenario where a node earlier in the workflow has the following output data:

```json
[
  {
    "id": "23423532",
    "name": "Jay Gatsby",
  },
  {
    "id": "23423533",
    "name": "José Arcadio Buendía",
  },
  {
    "id": "23423534",
    "name": "Max Sendak",
  },
  {
    "id": "23423535",
    "name": "Zaphod Beeblebrox",
  },
  {
    "id": "23423536",
    "name": "Edmund Pevensie",
  }
]
```

To extract the name, use the following expression:

```js
{{$("<node-name>").item.json.name}}
```


### Access the linked item in the current node's input

In this case, the item linking is within the node: find the input item that the node links to an output item.

```js
// Returns the linked item
{{$input.item}}
```

As a longer example, consider a scenario where the current node has the following input data:

```json
[
  {
    "id": "23423532",
    "name": "Jay Gatsby",
  },
  {
    "id": "23423533",
    "name": "José Arcadio Buendía",
  },
  {
    "id": "23423534",
    "name": "Max Sendak",
  },
  {
    "id": "23423535",
    "name": "Zaphod Beeblebrox",
  },
  {
    "id": "23423536",
    "name": "Edmund Pevensie",
  }
]
```

To extract the name, you'd normally use drag-and-drop [Data mapping](/data/data-mapping/), but you could also write the following expression:

```js
{{$input.item.json.name}}
```
