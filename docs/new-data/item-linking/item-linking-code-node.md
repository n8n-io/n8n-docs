---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: howto
---

<!-- vale off -->

# Linking items in the Code node

When using the Code node, there are some scenarios where you need to manually supply item linking information if you want to use `$("<node-name>").item` later in the workflow. n8n automatically handles item linking for single items, so these scenarios only apply if you have more than one incoming item.

You need to manually link items when you:

* Add new items: the new items aren't linked to any input.
* Return new items.
* Want to manually control or change the default item linking.

[n8n's automatic item linking](/new-data/item-linking/concepts.md) handles the other scenarios.

## How to link items in the Code node

To control item linking, set a `pairedItem` key as a sibling of the `json` object when returning data. Set the value to the *index of the input item* that you want to tie it to.

For example, to link to the item at index 0, use the following structure:

```javascript
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


## Usage example

As an example, suppose you have the following input data:

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

If you wanted to create a set of new items containing the `name` from the input items along with a new field, you might use a loop like this:

```javascript
newItems = [];
for (let i=0; i<items.length; i++) {
  newItems.push({
    "json": {
      "name": items[i].json.name,
      "aBrandNewField": "New data for item " + i
    }
  })
}

return newItems;
```

The `newItems` array contains items with no `pairedItem` property. This means there's no way to trace back from these items to the items used to generate them. In this case, it would mean that you couldn't reliably recover the `id` field later if you needed to.

To fix this, add a `pairedItem` property:

```javascript
newItems = [];
for (let i=0; i<items.length; i++) {
  newItems.push({
    "json": {
      "name": items[i].json.name,
      "aBrandNewField": "New data for item " + i
    },
    "pairedItem": i
  })
}

return newItems;
```

With this change, each new item now links to the item used to create it.
