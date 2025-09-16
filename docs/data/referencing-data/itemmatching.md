---
description: How to reference previous node items using `.item` and `.itemMatching()`.
contentType: howto
---

<!-- vale off -->

# Reference linked items in previous nodes

Every item in a node's input data links back to the items used in previous nodes to generate it. This is useful if you need to reference linked items from further back than the immediate previous node.

## In expressions

To access linked items from earlier in the workflow with [expressions](/glossary.md#expression-n8n), you can use `$("<node-name>").item`.

For example, to view the linked item from a node called "Customer data", you would use:

```javascript
{{ $("Customer data").item }}
```

You'll usually want to drill down to reference specific properties within the `json` object:

```javascript
{{ $("Customer data").item.json.id }}
```

To access the linked items from the node immediately before the current node, you can use the `$input` shorthand instead:

```javascript
{{ $input.item }}
```

## In the Code node

To access the linked items from earlier in the workflow in the [Code](/integrations/builtin/core-nodes/n8n-nodes-base.code/index.md) node, use the `itemMatching()` function, which has the following syntax:

```javascript
("<node-name>").itemMatching(currentNodeInputIndex)
```

Consider the following [`itemMatching()` usage example](https://n8n.io/workflows/1966-itemmatching-usage-example/):

[[ workflowDemo("https://api.n8n.io/workflows/templates/1966") ]]

The example works like this:

1. It starts by using the [Customer Datastore](/integrations/builtin/app-nodes/n8n-nodes-base.n8ntrainingcustomerdatastore.md) node to generate example data:
	```json
	[
		{
			"id": "23423532",
			"name": "Jay Gatsby",
			"email": "gatsby@west-egg.com",
			"notes": "Keeps asking about a green light??",
			"country": "US",
			"created": "1925-04-10"
		},
		{
			"id": "23423533",
			"name": "José Arcadio Buendía",
			"email": "jab@macondo.co",
			"notes": "Lots of people named after him. Very confusing",
			"country": "CO",
			"created": "1967-05-05"
		},
		...
    ]
	```
2. It contains an [Edit Fields (Set](/integrations/builtin/core-nodes/n8n-nodes-base.set.md) node that simplifies the data:
	```json
	[
		{
			"name": "Jay Gatsby"
		},
		{
			"name": "José Arcadio Buendía"
		},
        ...
	]
	```
3. It then restores the email address to the correct person using the [Code](/integrations/builtin/core-nodes/n8n-nodes-base.code/index.md) node:
	```json
	[
		{
			"name": "Jay Gatsby",
			"restoreEmail": "gatsby@west-egg.com"
		},
		{
			"name": "José Arcadio Buendía",
			"restoreEmail": "jab@macondo.co"
		},
		...
	]
	```

The code node restores the email using the `itemMatching()` function like this:

=== "JavaScript"
	```javascript
	for(let i=0; i<$input.all().length; i++) {
  		$input.all()[i].json.restoreEmail = $('Customer Datastore (n8n training)').itemMatching(i).json.email;
	}
	return $input.all();
	```
=== "Python"
	```python
	for i,item in enumerate(_input.all()):
  		_input.all()[i].json.restoreEmail = _('Customer Datastore (n8n training)').itemMatching(i).json.email

	return _input.all();
	```
