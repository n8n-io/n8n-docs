# The very quick quickstart

This quickstart gives you a very quick taste of n8n. Its aim is to allow you to try out the UI, and introduce you to two key features: workflow templates and expressions. It doesn't include detailed explanations or explore concepts.

You will:

* Install the desktop app
* Load a workflow from the workflow templates library
* Add a node and configure it using expressions.
* Run your first workflow

## Step one: Install and run n8n

--8<-- "_snippets/try-it-out/install-run-n8n.md"

## Step two: Open a workflow template

n8n provides a quickstart template using training nodes. This allows you to work with fake data, and avoids setting up credentials.

1. On the **Workflow templates** view, search for `Very quick quickstart`.
2. Click the **Very quick quickstart** template to preview it.
3. Click **Use this workflow** to open the template in your own editor.

This is a basic workflow. It:

1. Gets example data from the **Customer Datastore** node.
2. Uses the **Set** node to extract just the data you want, and assign that data to variables. In this example, you use the customer name, ID, and description.

Double click a node to explore its settings and how it processes data.

## Step three: Add a node

Add a third node to message each customer and tell them their description:

1. Click **Add node** <span class="inline-image">![Add node icon](/_images/try-it-out/quickstart/add-node.png)</span>.
2. Search for `Customer Messenger`. n8n shows a list of nodes that match the search.
3. Click **Customer Messenger (n8n training)** to add the node to the canvas.
4. Make sure the **Set** node connects to **Customer Messenger**: close the **Customer Messenger** node, then drag the connector from the right side of **Set** to the left connection point on **Customer Messenger**.
5. Double click the **Customer Messenger** node to open it.
6. You're going to use [expressions](/code-examples/expressions/) to create the **Customer ID** and **Message**:
    1. Next to **Customer ID**, click **Parameter options** <span class="inline-image">![Parameter options icon](/_images/try-it-out/quickstart/parameter-options.png)</span> > **Add Expression**. n8n opens the expressions editor for this field.
    2. Select **Current Node** > **Input Data** > **JSON** > **customer_ID**. n8n adds the expression to the **Expression** editor, and displays a sample output.
    3. Close the expressions editor.
    4. Next to **Message**, click **Parameter options** <span class="inline-image">![Parameter options icon](/_images/try-it-out/quickstart/parameter-options.png)</span> > **Add Expression**. n8n opens the expressions editor for this field.
    5. Copy this expression into the editor:
        ```
        {{ "Hi " + $json.customer_name + ",  Your description is " + $json.customer_description }}
        ```
7. Close the expressions editor, then close the **Customer Messenger** node.
8. Click **Execute workflow**. n8n runs the workflow.


## Next steps

* Read n8n's [longer try it out tutorial](/try-it-out/longer-introduction/) for a more complex workflow, and an introduction to more features and n8n concepts.
* Take the [courses](/courses/).
* Explore [hosting options](/hosting/options/).
* Check out example workflows: the [n8n blog](https://n8n.io/blog/tag/tutorial/) contains tutorials around popular examples, while the workflow templates gives you a community-sourced library of inspiration and starting points.

