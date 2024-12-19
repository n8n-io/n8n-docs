---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
description: Quickstart covering key concepts in n8n.
contentType: tutorial
---

# A slightly longer introduction

This guide shows you how to automate a task using a workflow in n8n, explaining key concepts along the way. You will:

* Create a workflow from scratch. You'll build a workflow that runs every week to get data from NASA, filters the data, and generates two reports.
* Understand key concepts and skills, including:
    * Starting workflows with trigger nodes
    * Configuring credentials
    * Manipulating data
    * Representing logic in an n8n workflow
    * Using expressions


## Step one: Sign up for n8n

--8<-- "_snippets/try-it-out/install-run-n8n.md"

## Step two: New workflow

--8<-- "_snippets/try-it-out/new-workflow.md"


## Step three: Add a trigger node

n8n provides two ways to start a workflow:

* Manually, by selecting **Test Workflow**, or from the CLI if you installed n8n with npm or Docker.
* Automatically, using a trigger node as the first node. The trigger node runs the workflow in response to an external event, or based on your settings.

For this tutorial, use the [Schedule trigger](/integrations/builtin/core-nodes/n8n-nodes-base.scheduletrigger/). This allows you to run the workflow on a schedule:

1. Select **Add first step**.
2. Search for **Schedule**. n8n shows a list of nodes that match the search.
3. Select **Schedule Trigger** to add the node to the canvas. n8n opens the node.
4. For **Trigger Interval**, select **Weeks**.
5. For **Weeks Between Triggers**, enter `1`.
6. Enter a time and day. For this example, select **Monday** in **Trigger on Weekdays**, select **9am** in **Trigger at Hour**, and enter `0` in **Trigger at Minute**.
7. Close the node details view to return to the canvas.


## Step four: Add the NASA node and set up credentials

The [NASA node](/integrations/builtin/app-nodes/n8n-nodes-base.nasa/) allows you to interact with NASA's [public APIs](https://api.nasa.gov/){:target=_blank .external-link}. The API gives you data to work with in this tutorial.

1. Select the **Add node** <span class="inline-image">![Add node icon](/_images/try-it-out/add-node-small.png){.off-glb}</span> connector on the Schedule Trigger node.
2. Search for **NASA**. n8n shows a list of nodes that match the search.
3. Select **NASA** to view a list of operations.
4. Search for and select **Get a DONKI solar flare**. This operation returns a report about recent solar flares. When you select the operation, n8n adds the node to the canvas and opens it.
5. To access the NASA APIs, you need to set up credentials:
    1. Select the  **Credential for NASA API** dropdown.
    2. Select **- Create New -**. n8n opens the credentials view.
    3. Go to [NASA APIs](https://api.nasa.gov/){:target=_blank .external-link} and fill out the form in **Generate API Key**. NASA generates the key and displays it.
    4. Copy the key, and paste it into **API Key** in n8n.
    5. Select **Save**.
    6. Close the credentials screen. n8n returns to the node. The new credentials should be automatically selected in **Credential for NASA API**.
6. By default, DONKI Solar Flare provides data for the past 30 days. To limit it to just the last week, use **Additional Fields**:
    1. Select **Add field**.
    2. Select **Start date**.
    3. To get a report starting from a week ago, you can use an expression: next to **Start date**, select the **Expression** tab, then select the expand button <span class="inline-image">![Add node icon](/_images/common-icons/open-expression-editor.png){.off-glb}</span> to open the full expressions editor.
    4. In the **Expression** field, enter the following expression:
    ```js
    {{$today.minus({days: 7}).toFormat('yyyy-MM-dd')}}
    ```
    This generates a date in the correct format, seven days before the current date.

    /// note | Date and time in n8n
    n8n uses Luxon to work with date and time, and also provides two variables for convenience: `$now` and `$today`. For more information, refer to [Expressions > Luxon](/code/cookbook/luxon/). 
    ///

7. Close the **Edit Expression** modal to return to the NASA node.
8. You can now check that the node is working and returning the expected date: select **Test step** to run the node manually. n8n calls the NASA API and displays details of solar flares in the past seven days in the **OUTPUT** section.
9. Close the NASA node to return to the workflow canvas.

## Step five: Add logic with the If node

n8n supports complex logic in workflows. In this tutorial, use the [If node](/integrations/builtin/core-nodes/n8n-nodes-base.if) to create two branches that each generate a report from the NASA data. Solar flares have five possible classifications. You'll create logic that sends a report with the lower classifications to one output, and the higher classifications to another. 

Add the If node:

1. Select the **Add node** <span class="inline-image">![Add node icon](/_images/try-it-out/add-node-small.png){.off-glb}</span> connector on the NASA node.
1. Search for **If**. n8n shows a list of nodes that match the search.
1. Select **If** to add the node to the canvas. n8n opens the node.
1. You need to check the value of the `classType` property in the NASA data. To do this:
	1. Drag **classType** into **Value 1**.

		/// note | Make sure you ran the NASA node in the previous section
		If you didn't follow the step in the previous section to run the NASA node, you won't see any data to work with in this step.
		///

    2. Change the comparison operation to **String > Contains**.
    3. In **Value 2**, enter **X**. This is the highest classification of solar flare. In the next step, you will create two reports: one for X class solar flares, and one for all the smaller solar flares.
1. You can now check that the node is working and returning the expected date: select **Test step** to run the node manually. n8n tests the data against the condition, and shows which results match true or false in the **OUTPUT** panel.

/// note | Weeks without large solar flares
In this tutorial, you are working with live date. If you find there aren't any X class solar flares when you run the workflow, try replacing **X** in **Value 2** with either **A**, **B**, **C**, or **M**. 
///

5. Once you are happy the node will return some events, you can close the node to return to the canvas.

## Step six: Output data from your workflow

The last step of the workflow is to send the two reports about solar flares. For this example, you'll send data to [Postbin](https://www.toptal.com/developers/postbin/){:target=_blank .external-link}. Postbin is a service that receives data and displays it on a temporary web page. 

1. On the If node, select the **Add node** <span class="inline-image">![Add node icon](/_images/try-it-out/add-node.png){.off-glb}</span> connector labeled **true**.
1. Search for **PostBin**. n8n shows a list of nodes that match the search.
1. Select **PostBin**.
1. Select **Send a request**. n8n adds the node to the canvas and opens it.
1. Go to [Postbin](https://www.toptal.com/developers/postbin/){:target=_blank .external-link} and select **Create Bin**. Leave the tab open so you can come back to it when testing the workflow.
1. Copy the bin ID. It looks similar to `1651063625300-2016451240051`.
1. In n8n, paste your Postbin ID into **Bin ID**.
1. Now, configure the data to send to Postbin. Next to **Bin Content**, select the **Expression** tab (you will need to mouse-over the **Bin Content** for the tab to appear), then select the expand button <span class="inline-image">![Add node icon](/_images/common-icons/open-expression-editor.png){.off-glb}</span> to open the full expressions editor.
1. Select **Current Node** > **Input Data** > **JSON** > **classType**. n8n adds the expression to the **Expression** editor, and displays a sample output.
1. The expression is: `{{$json["classType"]}}`. Add a message to it, so that the full expression is:
    ```js
    There was a solar flare of class {{$json["classType"]}}
    ```
1. Close the expressions editor to return to the node.
1. Close the Postbin node to return to the canvas.
1. Add another Postbin node, to handle the **false** output path from the If node:
    1. Hover over the Postbin node, then select **Node context menu** <span class="inline-image">![Node context menu icon](/_images/common-icons/node-context-menu.png){.off-glb}</span> > **Duplicate node** to duplicate the first Postbin node.
    2. Drag the **false** connector from the If node to the left side of the new Postbin node.

## Step seven: Test the workflow

1. You can now test the entire workflow. Select **Test Workflow**. n8n runs the workflow, showing each stage in progress.
2. Go back to your Postbin bin. Refresh the page to see the output.
3. If you want to use this workflow (in other words, if you want it to run once a week automatically), you need to activate it by selecting the **Active** toggle.

/// note | Time limit
Postbin's bins exist for 30 minutes after creation. You may need to create a new bin and update the ID in the Postbin nodes, if you exceed this time limit.
///

## Next steps

* Take n8n's [text courses](/courses/) or [video courses](/video-courses/).
* Explore more examples in [workflow templates](https://n8n.io/workflows/){:target=_blank .external-link}.
