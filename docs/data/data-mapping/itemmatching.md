---
description: How to use `("<node-name>").itemMatching(currentNodeinputIndex)`
contentType: howto
---

# Retrieve linked items from earlier in the workflow

Every item in a node's input data links back to the items used in previous nodes to generate it. This is useful if you need to retrieve linked items from further back than the immediate previous node.

To access the linked items from earlier in the workflow, use `("<node-name>").itemMatching(currentNodeinputIndex)`.


For example, consider a workflow that does the following:

1. The Customer Datastore node generates example data:
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
2. The Edit Fields node simplifies this data:
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
3. The Code node restore the email address to the correct person:
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

The Code node does this using the following code:

=== "JavaScript"
	```js
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

You can view and download the example workflow from [n8n website | itemMatchin usage example ](https://n8n.io/workflows/1966-itemmatching-usage-example/).
