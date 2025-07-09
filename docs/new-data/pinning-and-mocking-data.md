# Pinning and mocking data

It's often useful to work with real or realistic data as you develop workflows. However, working with live data systems can be challenging:

* Interacting with external production systems can cause unwanted side effects during development.
* It may not be feasible to set up test instances for each service your workflow interacts with.
* API requests may count against account limits or cost money to execute.
* External systems may return different data across requests.

n8n has a number of related features designed to help you test effectively during development while limiting dependencies on external systems.

## Data pinning

/// note | For development only
Data pinning isn't available for production workflow executions. It's a feature to help test workflows during development.
///

When you execute workflows or nodes during development, the data that each node produces displays in its **Output** panel.

**Data pinning** allows you to optionally save the output of a node and use the saved data in future manual workflow executions instead of executing the node again.

You can use this when working with data from external sources to avoid having to repeat requests to the external system. This can save time and resources by limiting external queries and testing against a consistent dataset.

You can only pin data for nodes that have a single main output ("error" outputs don't count for this purpose).

??? info "How to pin data"
	/// note | Nodes that output binary data
	You can't pin data if the output data includes binary data.
	///

	To pin data in a node:

	1. Run the node to load data.
	2. In the **OUTPUT** view, select **Pin data** <span class="inline-image">![Pin data icon](/_images/data/data-pinning/data-pinning-button.png){.off-glb}</span>. When data pinning is active, the button is disabled and a "This data is pinned" banner is displayed in the **OUTPUT** view.


??? info "How to edit pinned data"
	n8n allows you to edit [pinned data](/data/data-pinning.md). You can use this to test different data without seeding and sending the data from an external system. This makes it easier to test edge cases.

	To edit output data:

	1. Run the node to load data.
	2. Select the **Edit icon** <span class="inline-image">![Edit data icon](/_images/data/data-pinning/edit-data.png){.off-glb}</span>.
	3. Edit your data.
	4. Select **Save**. n8n saves your data changes and pins your data.

??? info "How to use data from previous executions"
	/// note | Use execution debugging to fully replay past execution data
	This process describes copying the data from a single node. To copy all of the data from a previous execution into the current workflow, you can [debug and re-run past executions](/workflows/executions/debug.md).
	///
	You can copy data from nodes in previous workflow executions. 

	1. Select the **Executions** tab on the top of the canvas.
	2. Browse the workflow executions list to find the one with the data you want to copy.
	3. Double click the node whose data you want to copy.
	4. In the **Output** panel, select **JSON** to switch to JSON view.
	5. Hover over the JSON and select the **Copy** <span class="inline-image">![Copy data icon](/_images/data/data-pinning/copy-data.png){.off-glb}</span> icon.
	6. Select the **Editor** tab on the top of the canvas.
	7. Open the node where you want to use the copied data.
	8. If the node doesn't already have data, run the node to load data.
	9. In the **Output** panel, select the **Edit** <span class="inline-image">![Edit data icon](/_images/data/data-pinning/edit-data.png){.off-glb}</span> icon.
	10. Paste in the data from the previous execution.
	11. Select **Save**. n8n saves your data changes and pins your data.

??? info "How to unpin data"
	When data pinning is active, a banner appears at the top of the node's output panel indicating that n8n has pinned the data. To unpin data and fetch fresh data on the next execution, select the **Unpin** link in the banner.

## Generate custom data

If you don't have good pinned data, you can create a custom dataset in your workflow using either the [Code node](/integrations/builtin/core-nodes/n8n-nodes-base.code/index.md) or the [Edit Fields (Set) node](/integrations/builtin/core-nodes/n8n-nodes-base.set.md).

### Edit Fields node

In the Edit Fields (Set) node, you can create simple custom data by either:

* Selecting **Manual Mapping** mode and selecting **Add Field**. From there you can add the field name, type, and value.
* Selecting **JSON** mode and defining the JSON data you want to add to each item directly.

In both cases, you can switch the field to **Expression** mode to add dynamic values to each item. Enable **Include Other Input Fields** if you want to add data to existing items instead of throwing away the existing fields.

### Code node

In the Code node, you can create any dataset you want. Just format it according to [n8n's data structure](/new-data/how-n8n-structures-data.md) and return it to set the node's output.

## Work with sample datasets

The [Customer Datastore](/integrations/builtin/app-nodes/n8n-nodes-base.n8ntrainingcustomerdatastore.md) and [Debug Helper](/integrations/builtin/core-nodes/n8n-nodes-base.debughelper.md) nodes can both generate example data to work with. Add these nodes to a workflow and execute them to explore their data.

These nodes are helpful if you need data for testing but don't yet have a real dataset or use-case to work with. The Debug Helper node in particular can output various types of data like user data, emails, credit card numbers, IP addresses, and URLs.

## Use schema previews

Another feature that helps integrate with external services without pulling data from production systems is schema preview.

Schema preview exposes expected schema data from the previous node in the Node Editor without the user having to provide credentials or execute the node. This makes it possible to construct workflows without having to provide credentials in advance. The preview doesn't include mock data, but it does expose the expected fields, making it possible to select and incorporate them into the input of subsequent nodes.

### How to use schema preview

1. There must be a node with schema preview available in your workflow.
1. When clicking on the details of the next node in the sequence, the schema preview data will show up in the Node Editor where schema data would typically be exposed.
1. Use data from the schema preview just as you would other schemas - drag and drop fields as input into your node parameters and settings.
