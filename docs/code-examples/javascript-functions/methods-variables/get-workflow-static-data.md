# $getWorkflowStaticData(type)

This gives access to the static workflow data.
It is possible to save data directly with the workflow. This data should, however, be very small.
A common use case is to for example to save a timestamp of the last item that got processed from
an RSS-Feed or database. It will always return an object. Properties can then read, delete or
set on that object. When the workflow execution succeeds, n8n will check automatically if the data
has changed and will save it, if necessary.

There are two types of static data. The "global" and the "node" one. Global static data is the
same in the whole workflow. And every node in the workflow can access it. The node static data
, however, is different for every node and only the node which set it can retrieve it again.

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

It's important to know that the static data can't be read and written when testing using the UI.
The data there will always be empty and the changes will not persist. Only when a workflow
is active and it gets called by a Trigger or Webhook, the static data will be saved.
