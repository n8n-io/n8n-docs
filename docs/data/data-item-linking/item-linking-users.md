# Working with the data path

n8n's item linking allows you to access data from items that precede the current item. It also has implications when using the Function node. Most nodes link every output item to an input item. This creates a chain of items that you can work back along to access previous items. For a deeper conceptual overview of this topic, refer to [Item linking scenarios](/data/data-item-linking/item-linking-scenarios). This document focuses on practical usage examples.

!!! note "Trying out the examples"
		All the examples on this page use data generated from the Customer Datastore node. This is an example node that's available in n8n.


## Get linked items in the expressions editor

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

## Manipulate item pairing in the Function node

When using the Function node, there are some scenarios where you need to manually supply item linking information if you want to be able to use `$("<node-name>").item` later in the workflow. These scenarios are when you:

* Add new items: the new items aren't linked to any input.
* Return completely new items.
* Want to manually control the item linking.

[n8n's automatic item linking](/data/data-item-linking/item-linking-scenarios/) handles the other scenarios.

To control item linking, set `pairedItem` when returning data. For example, to link to the item at index 0 from input 0:

```js
[
	{
		"json": {
			. . . 
		},
		"pairedItem": {
			"item": 0,
			// Optional: choose the input to use
			// Set this if your node combines multiple inputs
			"input": 0
		}
	}
]
```

### Example scenarios

As an example, consider this input data:

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

If you do the following, you don't need to set `pairedItem`:

* Sort the items into a new order.
* Remove two items and return the rest.

If you do the following, you must set `pairedItem`:

* Extract the names, and use them to create new items: add `pairedItem` to all items.
* Add more items: add `pairedItem` to the new items, if you want them to link back to an input item.

### pairedItem usage example

Take this input data:

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

And use it to generate new items, containing just the name, along with a new piece of data:

```js
newItems = [];
for(let i=0; i<items.length; i++){
  newItems.push(
    {
    "json":
      {
        "name": items[i].json.name,
				"aBrandNewField": "New data for item " + i
      }
    }
  )
}

return newItems;
```

`newItems` is an array of items with no `pairedItem`. This means there's no way to trace back from these items to the items used to generate them.

Add the `pairedItem` object:

```js
newItems = [];
for(let i=0; i<items.length; i++){
  newItems.push(
    {
      "json":
        {
          "name": items[i].json.name,
					"aBrandNewField": "New data for item " + i
        },
      "pairedItem": {
        "item": i
      }
    },    
  )
}
return newItems;
```

Each new item now links to the item used to create it.


