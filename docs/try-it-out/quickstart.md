---
description: A quick example to try out n8n.
contentType: tutorial
---

# The very quick quickstart

This quickstart gets you started using n8n as quickly as possible. Its allows you to try out the UI and introduces two key features: [workflow templates](/glossary.md#template-n8n) and [expressions](/glossary.md#expression-n8n). It doesn't include detailed explanations or explore concepts in-depth.

In this tutorial, you will:

* Load a [workflow](/glossary.md#workflow-n8n) from the workflow templates library
* Add a node and configure it using expressions
* Run your first workflow


## Step one: Open a workflow template and sign up for n8n Cloud

n8n provides a quickstart template using training nodes. You can use this to work with fake data and avoid setting up [credentials](/glossary.md#credential-n8n).

This quickstart uses [n8n Cloud](/manage-cloud/overview.md). A free trial is available for new users.

1. Go to [Templates | Very quick quickstart](https://n8n.io/workflows/1700-very-quick-quickstart/).
1. Select **Use for free** to view the options for using the template.
1. Select **Get started free with n8n cloud** to sign up for a new Cloud instance.

This workflow:

1. Gets example data from the [Customer Datastore](/integrations/builtin/app-nodes/n8n-nodes-base.n8ntrainingcustomerdatastore.md) node.
2. Uses the [Edit Fields](/integrations/builtin/core-nodes/n8n-nodes-base.set.md) node to extract only the desired data and assigns that data to variables. In this example, you map the customer name, ID, and description.

The individual pieces in an n8n workflow are called [nodes](/glossary.md#node-n8n). Double click a node to explore its settings and how it processes data.

## Step two: Run the workflow

Select **Execute Workflow**. This runs the workflow, loading the data from the Customer Datastore node, then transforming it with Edit Fields. You need this data available in the workflow so that you can work with it in the next step.

## Step three: Add a node

Add a third node to message each customer and tell them their description. Use the Customer Messenger node to send a message to fake recipients.

1. Select the **Add node** <span class="n8n-inline-image">![Add node icon](/_images/try-it-out/add-node-small.png){.off-glb}</span> connector on the Edit Fields node.
2. Search for **Customer Messenger**. n8n shows a list of nodes that match the search.
3. Select **Customer Messenger (n8n training)** to add the node to the [canvas](/glossary.md#canvas-n8n). n8n opens the node automatically.
4. Use [expressions](/code/expressions.md) to map in the **Customer ID** and create the **Message**:
	1. In the **INPUT** panel select the **Schema** tab.
	2. Drag **Edit Fields1** > **customer_id** into the **Customer ID** field in the node settings.
    2. Hover over **Message**. Select the **Expression** tab, then select the expand button <span class="n8n-inline-image">![Add node icon](/_images/common-icons/open-expression-editor.png){.off-glb}</span> to open the full expressions editor.
    3. Copy this expression into the editor:
        ```
        Hi {{ $json.customer_name }}. Your description is: {{ $json.customer_description }}
        ```
5. Close the expressions editor, then close the **Customer Messenger** node by clicking outside the node or selecting **Back to canvas**.
6. Select **Execute Workflow**. n8n runs the workflow.

The complete workflow should look like this:

[[ workflowDemo("file:///try-it-out/quickstart/very-quick-quickstart-workflow.json") ]]


## Next steps

* Read n8n's [longer try it out tutorial](/try-it-out/tutorial-first-workflow.md) for a more complex workflow, and an introduction to more features and n8n concepts.
* Take the [text courses](/courses/index.md) or [video courses](/video-courses.md).


