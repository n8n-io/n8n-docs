---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: howto
---

# Mapping in the expressions editor

These examples show how to access linked items in the expressions editor. Refer to [expressions](/code/expressions/) for more information on expressions, including built in variables and methods.

For information on errors with mapping and linking items, refer to [Item linking errors](/data/data-mapping/data-item-linking/item-linking-errors/).

## Access the linked item in a previous node's output

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
