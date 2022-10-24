# `$getWorkflowStaticData(type)`

This gives access to the static workflow data.

!!! note "Experimental feature"
	Static data isn't available when testing workflows. The workflow must be active and called by a trigger or webhook to save static data.

You can save data directly in the workflow. This data should be small.

As an example: you can save a timestamp of the last item processed from
an RSS feed or database. It will always return an object. Properties can then read, delete or
set on that object. When the workflow execution succeeds, n8n checks automatically if the data
has changed and saves it, if necessary.

There are two types of static data, "global" and "node". Global static data is the
same in the whole workflow. Every node in the workflow can access it. The node static data is unique to the node. Only the node that set it can retrieve it again.

Example:

```javascript
// Get the global workflow static data
const staticData = getWorkflowStaticData('global');
// Get the static data of the node
const staticData = getWorkflowStaticData('node');

// Access its data
const lastExecution = staticData.lastExecution;

// Update its data
staticData.lastExecution = new Date().getTime();

// Delete data
delete staticData.lastExecution;
```


