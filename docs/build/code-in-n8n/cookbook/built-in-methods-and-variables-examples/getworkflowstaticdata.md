---
tags:
  - static data
  - global variables
hide:
  - tags
contentType: reference
nodeTitle: getWorkflowStaticData
originalFilePath: code/cookbook/builtin/get-workflow-static-data.md
originalUrl: 'https://docs.n8n.io/code/cookbook/builtin/get-workflow-static-data'
url: >-
  https://docs.n8n.io/build/code-in-n8n/cookbook/built-in-methods-and-variables-examples/getworkflowstaticdata
layout:
  description:
    visible: false
---

# `getWorkflowStaticData(type)` <a href="#getworkflowstaticdatatype" id="getworkflowstaticdatatype"></a>

This gives access to the static workflow data.

{% hint style="info" %}
**Experimental feature**

- Static data isn't available when testing workflows. The workflow must be active and called by a [trigger](https://app.gitbook.com/s/CxSeOtVxqqhfxMSac0AV/key-concept-glossary#trigger-node-n8n) or webhook to save static data.
- This feature may behave unreliably under high-frequency workflow executions.
{% endhint %}
You can save data directly in the workflow. This data should be small.

As an example: you can save a timestamp of the last item processed from
an RSS feed or database. It will always return an object. Properties can then read, delete or
set on that object. When the workflow execution succeeds, n8n checks automatically if the data
has changed and saves it, if necessary.

There are two types of static data, global and node. Global static data is the
same in the whole workflow. Every node in the workflow can access it. The node static data is unique to the node. Only the node that set it can retrieve it again.

Example with global data:

{% tabs %}
{% tab title="JavaScript" %}
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
{% endtab %}

{% tab title="Python" %}
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
{% endtab %}
{% endtabs %}

Example with node data:

{% tabs %}
{% tab title="JavaScript" %}
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
{% endtab %}

{% tab title="Python" %}
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
{% endtab %}
{% endtabs %}

## Templates and examples <a href="#templates-and-examples" id="templates-and-examples"></a>


{% @n8n-blocks/n8n-workflow-demo content="" url="https://api.n8n.io/workflows/templates/2538" %}
