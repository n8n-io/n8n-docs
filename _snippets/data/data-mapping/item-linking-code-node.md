Use n8n's item linking to access data from items that precede the current item. It also has implications when using the Code node. Most nodes link every output item to an input item. This creates a chain of items that you can work back along to access previous items. For a deeper conceptual overview of this topic, refer to [Item linking concepts](/data/data-mapping/data-item-linking/item-linking-concepts.md). This document focuses on practical usage examples.

When using the Code node, there are some scenarios where you need to manually supply item linking information if you want to be able to use `$("<node-name>").item` later in the workflow. All these scenarios only apply if you have more than one incoming item. n8n automatically handles item linking for single items.

These scenarios are when you:

* Add new items: the new items aren't linked to any input.
* Return new items.
* Want to manually control the item linking.

[n8n's automatic item linking](/data/data-mapping/data-item-linking/item-linking-concepts.md) handles the other scenarios.

To control item linking, set `pairedItem` when returning data. For example, to link to the item at index 0:

```js
[
	{
		"json": {
			. . . 
		},
		// The index of the input item that generated this output item
		"pairedItem": 0
	}
]
```


### `pairedItem` usage example

Take this input data:

```json
[
  {
    "id": "23423532",
    "name": "Jay Gatsby"
  },
  {
    "id": "23423533",
    "name": "José Arcadio Buendía"
  },
  {
    "id": "23423534",
    "name": "Max Sendak"
  },
  {
    "id": "23423535",
    "name": "Zaphod Beeblebrox"
  },
  {
    "id": "23423536",
    "name": "Edmund Pevensie"
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
      "pairedItem": i
    }    
  )
}
return newItems;
```

Each new item now links to the item used to create it.
