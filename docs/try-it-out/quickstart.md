# The very quick quickstart

This quickstart gives you a very quick taste of n8n. Its aim is to allow you to try out the UI, and introduce you to two key features: workflow templates and expressions. It doesn't include detailed explanations or explore concepts.

You will:

* Install the desktop app
* Load a workflow from the workflow templates library
* Add a node and configure it using expressions.
* Run your first workflow

## Step one: install and run n8n

n8n is available as a Cloud service, desktop app, npm module, and Docker image. For this quickstart, use the Desktop app.

!!! note "Linux users"
    This guide uses the n8n desktop app, which is available for Windows and Mac. If you're on Linux, sign up for a free [Cloud](/hosting/installation/cloud/) trial, or use [npm](/hosting/installation/npm/).


1. [Download for Windows](https://downloads.n8n.io/file/n8n-downloads/n8n-win.zip) or [Download for macOS](https://downloads.n8n.io/file/n8n-downloads/n8n-mac.zip).
2. Once the download is complete, extract the files.
3. Run the installer. There are no configuration steps.
4. Once installation is complete, n8n Desktop opens automatically in the **Workflow templates** view. There may be a small lag between installation completing and the app opening.

## Step two: open a workflow template

We've created a quickstart template using training nodes. This allows you to work with fake data, and avoids setting up credentials.

1. On the **Workflow templates** view, search for "Very quick quickstart".
2. Click the **Very quick quickstart** template to preview it.
3. Click **Use this workflow** to open the template in your own editor.

This is a simple workflow. It:

1. Gets example data from the **Customer Datastore** node.
2. Uses the **Set** node to extract just the data we want, and assign that data to variables. In this example, we use the customer name, ID, and description.

Double click a node to explore its settings and how it processes data.

## Step three: add a node

Let's add a third node to message each customer and tell them their description:

1. Click **Add node** <span class="inline-image">![Add node icon](/_images/try-it-out/quickstart/add-node.png)</span>.
2. Search for `Customer Messenger`. n8n shows a list of nodes that match the search.
3. Click **Customer Messenger (n8n training)** to add the node to the canvas.
4. Make sure the **Set** node connects to **Customer Messenger**: close the **Customer Messenger** node, then drag the connector from the right side of **Set** to the left connection point on **Customer Messenger**.
5. Double click the **Customer Messenger** node to open it.
6. We're going to use [expressions](/code-examples/expressions/) to create the **Customer ID** and **Message**:
    1. Next to **Customer ID**, click **Parameter options** <span class="inline-image">![Parameter options icon](/_images/try-it-out/quickstart/parameter-options.png)</span> > **Add Expression**. n8n opens the expressions editor for this field.
    2. Copy this expression into the editor:
        ```
        {{$json["customer_ID"]}}
        ```
    3. Close the expressions editor.
    4. Next to **Message**, click **Parameter options** <span class="inline-image">![Parameter options icon](/_images/try-it-out/quickstart/parameter-options.png)</span> > **Add Expression**. n8n opens the expressions editor for this field.
    5. Copy this expression into the editor:
        ```
        {{ "Hi " + $json.customer_name + ",  Your description is " + $json.customer_description }}
        ```
7. Close the expressions editor, then close the **Customer Messenger** node.
8. Click **Execute workflow**. n8n runs the workflow.


## What's next?

* Read our [longer try it out tutorial](/try-it-out/longer-introduction/) for a more complex workflow, and an introduction to more features and n8n concepts.
* Take our [courses](/courses/).
* Explore [hosting options](/hosting/options/).
* Check out example workflows: the [n8n blog](https://n8n.io/blog/tag/tutorial/) contains tutorials around popular examples, while the workflow templates gives you a community-sourced library of inspiration and starting points.

