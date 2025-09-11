---
tags:
  - "static data"
  - "global variables"
hide:
  - tags
contentType: reference
---

# `getWorkflowStaticData(type)`

This gives access to the static workflow data.

/// note | Experimental feature
- Static data isn't available when testing workflows. The workflow must be active and called by a [trigger](/glossary.md#trigger-node-n8n) or webhook to save static data.
- This feature may behave unreliably under high-frequency workflow executions.
///
You can save data directly in the workflow. This data should be small.

As an example: you can save a timestamp of the last item processed from
an RSS feed or database. It will always return an object. Properties can then read, delete or
set on that object. When the workflow execution succeeds, n8n checks automatically if the data
has changed and saves it, if necessary.

There are two types of static data, global and node. Global static data is the
same in the whole workflow. Every node in the workflow can access it. The node static data is unique to the node. Only the node that set it can retrieve it again.

Example with global data:

=== "JavaScript"
	```javascript
	// Get the global workflow static data
	const workflowStaticData = $getWorkflowStaticData('global');

	// Access its data
	const lastExecution = workflowStaticData.lastExecution;

	// Update its data
	workflowStaticData.lastExecution = new Date().getTime();

	// Delete data
	delete workflowStaticData.lastExecution;
	```
=== "Python"
	```python
	# Get the global workflow static data
	workflowStaticData = _getWorkflowStaticData('global')

	# Access its data
	lastExecution = workflowStaticData.lastExecution

	# Update its data
	workflowStaticData.lastExecution = new Date().getTime()

	# Delete data
	delete workflowStaticData.lastExecution
	```

Example with node data:

=== "JavaScript"
	```js
	// Get the static data of the node
	const nodeStaticData = $getWorkflowStaticData('node');

	// Access its data
	const lastExecution = nodeStaticData.lastExecution;

	// Update its data
	nodeStaticData.lastExecution = new Date().getTime();

	// Delete data
	delete nodeStaticData.lastExecution;
	```
=== "Python"
	```python
	# Get the static data of the node
	nodeStaticData = _getWorkflowStaticData('node')

	# Access its data
	lastExecution = nodeStaticData.lastExecution

	# Update its data
	nodeStaticData.lastExecution = new Date().getTime()

	# Delete data
	delete nodeStaticData.lastExecution
	```

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ workflowDemo("https://api.n8n.io/workflows/templates/2538") ]]
