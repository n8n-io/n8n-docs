---
description: Create your first workflow in n8n and learn some key concepts.
contentType: tutorial
---

# Your first workflow

This guide will show you how to construct a [workflow](/glossary.md#workflow-n8n) in n8n, explaining key concepts along the way. You will:

* Create a workflow from scratch. 
* Understand key concepts and skills, including:
    * Starting workflows with trigger nodes
    * Configuring [credentials](/glossary.md#credential-n8n)
    * Processing data
    * Representing logic in an n8n workflow
    * Using [expressions](/glossary.md#expression-n8n)

!["Screenshot of the completed workflow"](/_images/try-it-out/tutorial-first.png)

This quickstart uses [n8n Cloud](/manage-cloud/overview.md), which is recommended for new users. A free trial is available - if you haven't already done so, [sign up](https://app.n8n.cloud/register) for an account now.

## Step one: Create a new workflow

When you open n8n, you'll see either:

* A window with a welcome message and two large buttons: Choose **Start from Scratch** to create a new workflow.
* The **Workflows** list on the **Overview** page. Select the **Create Workflow** to create a new workflow.

## Step two: Add a trigger node

n8n provides two ways to start a workflow:

* Manually, by selecting **Execute Workflow**.
* Automatically, using a trigger node as the first node. The trigger node runs the workflow in response to an external event, or based on your settings.

For this tutorial, we'll use the [Schedule trigger](/integrations/builtin/core-nodes/n8n-nodes-base.scheduletrigger/index.md). This allows you to run the workflow on a schedule:

1. Select **Add first step**.
1. Search for **Schedule**. n8n shows a list of nodes that match the search.
1. Select **Schedule Trigger** to add the node to the canvas. n8n opens the node.
1. For **Trigger Interval**, select **Weeks**.
1. For **Weeks Between Triggers**, enter `1`.
1. Enter a time and day. For this example, select **Monday** in **Trigger on Weekdays**, select **9am** in **Trigger at Hour**, and enter `0` in **Trigger at Minute**.
1. Close the node details view to return to the canvas.

## Step three: Add the NASA node and set up credentials

The [NASA node](/integrations/builtin/app-nodes/n8n-nodes-base.nasa.md) interacts with NASA's [public APIs](https://api.nasa.gov/) to fetch useful data. We will use the real-time data from the API to find solar events.

??? explanation "Credentials"
    Credentials are private pieces of information issued by apps and services to authenticate you as a user and allow you to connect and share information between the app or service and the n8n node. The type of information required varies depending on the app/service concerned. You should be careful about sharing or revealing the credentials outside of n8n.

1. Select the **Add node** <span class="n8n-inline-image">![Add node icon](/_images/try-it-out/add-node-small.png){.off-glb}</span> connector on the Schedule Trigger node.
1. Search for **NASA**. n8n shows a list of nodes that match the search.
1. Select **NASA** to view a list of operations.
1. Search for and select **Get a DONKI solar flare**. This operation returns a report about recent solar flares. When you select the operation, n8n adds the node to the canvas and opens it.
1. To access the NASA APIs, you need to set up credentials:
    1. Select the  **Credential for NASA API** dropdown.
    1. Select **Create new credential**. n8n opens the credentials view.
    1. Go to [NASA APIs](https://api.nasa.gov/) and fill out the form from the **Generate API Key** link. The NASA site generates the key and emails it to the address you entered.
    1. Check your email account for the API key. Copy the key, and paste it into **API Key** in n8n.
    1. Select **Save**.
    1. Close the credentials screen. n8n returns to the node. The new credentials should be automatically selected in **Credential for NASA API**.

1. By default, DONKI Solar Flare provides data for the past 30 days. To limit it to just the last week, use **Additional Fields**:
    1. Select **Add field**.
    1. Select **Start date**.
    1. To get a report starting from a week ago, you can use an expression: next to **Start date**, select the **Expression** tab, then select the expand button <span class="n8n-inline-image">![Add node icon](/_images/common-icons/open-expression-editor.png){.off-glb}</span> to open the full expressions editor.
    1. In the **Expression** field, enter the following expression:
    ```js
    {{ $today.minus(7, 'days') }}
    ```
    This generates a date in the correct format, seven days before the current date.

    ![image showing the expression above generating a date](/_images/try-it-out/tutorial-date.png)

    ??? explanation "Date and time formats in n8n..."
        n8n uses Luxon to work with date and time, and also provides two variables for convenience: `$now` and `$today`. For more information, refer to [Expressions > Luxon](/code/cookbook/luxon.md).

1. Close the **Edit Expression** modal to return to the NASA node.
1. You can now check that the node is working and returning the expected date: select **Execute step** to run the node manually. n8n calls the NASA API and displays details of solar flares in the past seven days in the **OUTPUT** section.
1. Close the NASA node to return to the workflow canvas.

## Step four: Add logic with the If node

n8n supports complex logic in workflows. In this tutorial we will use the [If node](/integrations/builtin/core-nodes/n8n-nodes-base.if.md) to create two branches that each generate a report from the NASA data. Solar flares have five possible classifications; we will add logic that sends a report with the lower classifications to one output, and the higher classifications to another.

Add the If node:

1. Select the **Add node** <span class="n8n-inline-image">![Add node icon](/_images/try-it-out/add-node-small.png){.off-glb}</span> connector on the NASA node.
1. Search for **If**. n8n shows a list of nodes that match the search.
1. Select **If** to add the node to the canvas. n8n opens the node.
1. You need to check the value of the `classType` property in the NASA data. To do this:
	1. Drag **classType** into **Value 1**.

		/// note | Make sure you ran the NASA node in the previous section
		If you didn't follow the step in the previous section to run the NASA node, you won't see any data to work with in this step.
		///

    1. Change the comparison operation to **String > Contains**.
    1. In **Value 2**, enter **X**. This is the highest classification of solar flare. In the next step, you will create two reports: one for X class solar flares, and one for all the smaller solar flares.
1. You can now check that the node is working and returning the expected date: select **Execute step** to run the node manually. n8n tests the data against the condition, and shows which results match true or false in the **OUTPUT** panel.

    /// note | Weeks without large solar flares
    In this tutorial, you are working with live data. If you find there aren't any X class solar flares when you run the workflow, try replacing **X** in **Value 2** with either **A**, **B**, **C**, or **M**.
    ///

1. Once you are happy the node will return some events, you can close the node to return to the canvas.

## Step five: Output data from your workflow

The last step of the workflow is to send the two reports about solar flares. For this example, you'll send data to [Postbin](https://www.toptal.com/developers/postbin/). Postbin is a service that receives data and displays it on a temporary web page.

1. On the If node, select the **Add node** <span class="n8n-inline-image">![Add node icon](/_images/try-it-out/add-node-small.png){.off-glb}</span> connector labeled **true**.
1. Search for **PostBin**. n8n shows a list of nodes that match the search.
1. Select **PostBin**.
1. Select **Send a request**. n8n adds the node to the canvas and opens it.
1. Go to [Postbin](https://www.toptal.com/developers/postbin/) and select **Create Bin**. Leave the tab open so you can come back to it when testing the workflow.
1. Copy the bin ID. It looks similar to `1651063625300-2016451240051`.
1. In n8n, paste your Postbin ID into **Bin ID**.
1. Now, configure the data to send to Postbin. Next to **Bin Content**, select the **Expression** tab (you will need to mouse-over the **Bin Content** for the tab to appear), then select the expand button <span class="n8n-inline-image">![Add node icon](/_images/common-icons/open-expression-editor.png){.off-glb}</span> to open the full expressions editor.
1. You can now click and drag the correct field from the If Node output into the expressions editor to automatically create a reference for this label. In this case the input we want is 'classType'.
1. Once dropped into the expressions editor it will transform into this reference: `{{$json["classType"]}}`. Add a message to it, so that the full expression is:

    ```js
    There was a solar flare of class {{$json["classType"]}}
    ```

    ![image showing the expression above generating output](/_images/try-it-out/tutorial-expression.png)

1. Close the expressions editor to return to the node.
1. Close the Postbin node to return to the canvas.
1. Add another Postbin node, to handle the **false** output path from the If node:
    1. Hover over the Postbin node, then select **Node context menu** <span class="n8n-inline-image">![Node context menu icon](/_images/common-icons/node-context-menu.png){.off-glb}</span> > **Duplicate node** to duplicate the first Postbin node.
    1. Drag the **false** connector from the If node to the left side of the new Postbin node.

## Step six: Test the workflow

1. You can now test the entire workflow. Select **Execute Workflow**. n8n runs the workflow, showing each stage in progress.
1. Go back to your Postbin bin. Refresh the page to see the output.
1. If you want to use this workflow (in other words, if you want it to run once a week automatically), you need to activate it by selecting the **Active** toggle.

/// note | Time limit
Postbin's bins exist for 30 minutes after creation. You may need to create a new bin and update the ID in the Postbin nodes, if you exceed this time limit.
///


## Congratulations

You now have a fully functioning workflow that does something useful! It should look something like this:

[[ workflowDemo("file:///try-it-out/quickstart/tutorial.json") ]]

Along the way you have discovered:

- How to find the nodes you want and join them together
- How to use expressions to manipulate data
- How to create credentials and attach them to nodes
- How to use logic in your workflows

There are plenty of things you could add to this (perhaps add some more credentials and a node to send you an email of the results), or maybe you have a specific project in mind. Whatever your next steps, the resources linked below should help.

## Next steps

- Interested in what you could do with AI? Find out [how to build an AI chat agent with n8n](/advanced-ai/intro-tutorial.md).
- Take n8n's [text courses](/courses/index.md) or [video courses](/video-courses.md).
- Explore more examples in [workflow templates](https://n8n.io/workflows/).
