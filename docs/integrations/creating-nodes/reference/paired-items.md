# Paired items

!!! note "Programmatic-style nodes only"
    The information in this document applies to programmatic-style nodes. If you're using declarative style, n8n handles paired items for you automatically.

An n8n node operation consumes input items and produces output items. n8n generates an output item from a single input item, except in the Merge node, or any other node that combines or sums items.

To ensure that n8n works, it needs to know which input item a given output item comes from. If this information is missing, expressions on other nodes may break.

You must provide item pairing information when returning the output of your operations. You can do this using the `pairedInput` [TODO: pairedInput or pairedItem?] key, at the same level as the `json` key in your output:

[TODO: clarify wtf is going on here]
```js
[{
	json: {
		...
	},
	pairedInput: 3 // The index of the corresponding input item
}]
```