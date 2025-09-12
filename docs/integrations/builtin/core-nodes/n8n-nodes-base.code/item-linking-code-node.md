---
contentType: howto
---

<!-- vale off -->

# Linking items in the Code node

When using the Code node, there are some scenarios where you need to manually supply item linking information if you want to use `$("<node-name>").item` later in the workflow. n8n automatically handles item linking for single items, so these scenarios only apply if you have more than one incoming item.

You need to manually link items when you:

* Add new items: the new items aren't linked to any input.
* Return new items.
* Want to manually control or change the default item linking.

[n8n's automatic item linking](/data/referencing-data/item-linking.md#automatic-item-linking) handles the other scenarios.

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

To understand how this works, we can examine a workflow that fails because it doesn't implement item linking, followed by the same workflow with proper item linking added.

### Workflow without Code node item linking

Consider the following workflow that doesn't configure item linking:

[[ workflowDemo("file:///data/item-linking/code-node-without-item-linking.json") ]]

After the Manual Trigger node, the workflow initializes the following data structure with a Code node labeled **Initial data**:

=== "Code"
	```javascript
	return [
		{
			"name": "Jay Gatsby",
			"personal_email": "gatsby@west-egg.com",
			"work_email": "jgatsby@company.com"
		},
		{
			"name": "José Arcadio Buendía",
			"personal_email": "jab@macondo.co",
			"work_email": "jbuendia@company.com"
		}
	]
	```
=== "Output"
	```json
	[
		{
			"name": "Jay Gatsby",
			"personal_email": "gatsby@west-egg.com",
			"work_email": "jgatsby@company.com"
		},
		{
			"name": "José Arcadio Buendía",
			"personal_email": "jab@macondo.co",
			"work_email": "jbuendia@company.com"
		}
	]
	```

The next node is another Code node labeled **Extract emails** that extracts the personal and work emails from each item and puts them into a generic `emails` object. It returns this new structure, creating four new items based on the two input items:

=== "Code"
	```javascript
	emails = [];

	for (let i=0; i<items.length; i++) {
		emails.push({
			"json": {
				"email": items[i].json.personal_email
			}
		},
		{
			"json": {
				"email": items[i].json.work_email
			}
		})
	}

	return emails
	```
=== "Output (displayed)"
	```json
	[
		{
			"email": "gatsby@west-egg.com"
		},
		{
			"email": "jgatsby@company.com"
		},
		{
			"email": "jab@macondo.co"
		},
		{
			"email": "jbuendia@company.com"
		}
	]
	```
=== "Output (actual)"
	```json
	[
		{
			"json": {
				"email": "gatsby@west-egg.com"
			}
		},
		{
			"json": {
				"email": "jgatsby@company.com"
			}
		},
		{
			"json": {
				"email": "jab@macondo.co"
			}
		},
		{
			"json": {
				"email": "jbuendia@company.com"
			}
		}
	]
	```

The final node is an Edit Fields (Set) node that attempts to enrich the input items by adding a `restoredName` field set to the following expression:

```javascript
{{ $('Initial data').item.json.name }}
```

Upon execution, however, this assignment fails with the following error:

> [ERROR: Can’t determine which item to use]
>
> Paired item data for item from node 'Extract emails' is unavailable. Ensure 'Extract emails' is providing the required output. [item 0]
> An expression here won't work because it uses .item and n8n can't figure out the matching item. You can either:
>
> * Add the missing information to the node 'Extract emails'
> * Or use .first(), .last() or .all()[index] instead of .item

You can fix this workflow by implementing item linking in the Extract emails node.

### Workflow with Code node item linking

The following workflow implements item linking:

[[ workflowDemo("file:///data/item-linking/code-node-with-item-linking.json") ]]

The workflow is exactly the same as the previous one, except that the **Extract emails** Code node adds a `pairedItem` key that matches each output item with the input item that produced it:

=== "Code"
	```javascript hl_lines="8 14"
	emails = [];

	for (let i=0; i<items.length; i++) {
		emails.push({
			"json": {
				"email": items[i].json.personal_email
			},
			"pairedItem": i
		},
		{
			"json": {
				"email": items[i].json.work_email
			},
			"pairedItem": i
		})
	}

	return emails
	```
=== "Output (displayed)"
	```json
	[
		{
			"email": "gatsby@west-egg.com"
		},
		{
			"email": "jgatsby@company.com"
		},
		{
			"email": "jab@macondo.co"
		},
		{
			"email": "jbuendia@company.com"
		}
	]
	```
=== "Output (actual)"
	```json
	[
		{
			"json": {
				"email": "gatsby@west-egg.com"
			},
			"pairedItem": 0
		},
		{
			"json": {
				"email": "jgatsby@company.com"
			},
			"pairedItem": 0
		},
		{
			"json": {
				"email": "jab@macondo.co"
			},
			"pairedItem": 1
		},
		{
			"json": {
				"email": "jbuendia@company.com"
			},
			"pairedItem": 1
		}
	]
	```

This item pairing allows the **Restore names** Edit Fields (Set) node to match items correctly. When executed, this modified workflow produces the desired output:

```json
[
	{
		"email": "gatsby@west-egg.com",
		"restoredName": "Jay Gatsby"
	},
	{
		"email": "jgatsby@company.com",
		"restoredName": "Jay Gatsby"
	},
	{
		"email": "jab@macondo.co",
		"restoredName": "José Arcadio Buendía"
	},
	{
		"email": "jbuendia@company.com",
		"restoredName": "José Arcadio Buendía"
	}
]
```

## Item linking errors

To learn more about how to troubleshoot problems with item linking, take a look at [item linking errors](/data/referencing-data/item-linking.md).
