# A slightly longer introduction

This guide shows you how to automate a task using a workflow in n8n, explaining key concepts along the way. You will:

* Create a workflow from scratch. You'll build a workflow that runs every week to get data from NASA, filters the data, and generates two reports.
* Understand key concepts and skills, including:
    * Starting workflows with trigger nodes
    * Configuring credentials
    * Manipulating data
    * Representing logic in an n8n workflow
    * Using expressions


## Step one: Install and run n8n

--8<-- "_snippets/try-it-out/install-run-n8n.md"

## Step two: Create a new workflow

Create a blank workflow:

1. Select **Workflows** <span class="inline-image">![Add node icon](/_images/try-it-out/workflows-menu-button.png)</span>, then select **New**. n8n opens the new workflow.
2. Rename the workflow to something meaningful, such as **Quickstart**: select the current workflow name, and replace it.

## Step three: Add a trigger node

n8n provides two ways to start a workflow:

* Manually, by selecting **Execute workflow**, or from the CLI if you installed n8n with npm or Docker.
* Automatically, using a trigger node as the first node. The trigger node runs the workflow in response to an external event, or based on your settings.

For this tutorial, use the [Cron trigger](/integrations/core-nodes/n8n-nodes-base.cron/). This allows you to run the workflow on a schedule:

1. Select **Add node** <span class="inline-image">![Add node icon](/_images/try-it-out/add-node.png)</span>.
2. Search for **Cron**. n8n shows a list of nodes that match the search.
3. Select **Cron** to add the node to the canvas. n8n opens the node.
4. Select **Add Cron Time**.
5. For **Mode**, select **Every Week**.
6. Enter a time and day. For this example, enter `09` in **Hour**, `0` in **Minute**, and `Monday` in **Weekday**.
7. Close the node details view to return to the canvas.


## Step four: Add the NASA node and set up credentials

The [NASA node](/integrations/nodes/n8n-nodes-base.nasa/) allows you to interact with NASA's [public APIs](https://api.nasa.gov/). The API gives you data to work with in this tutorial.

1. Select the **Add node** <span class="inline-image">![Add node icon](/_images/try-it-out/add-node-small.png)</span> connector on the Cron node.
2. Search for **NASA**. n8n shows a list of nodes that match the search.
3. Select **NASA** to add the node to the canvas. n8n opens the node.
4. To access the NASA APIs, you need to set up credentials:
    1. Select the  **Credential for NASA API** dropdown.
    2. Select **- Create New -**. n8n opens the credentials view.
    3. Go to [NASA APIs](https://api.nasa.gov/) and fill out the form in **Generate API Key**. NASA generates the key and displays it.
    4. Copy the key, and paste it into **API Key** in n8n.
    5. Select **Save**.
    6. Close the credentials screen. n8n returns to the node. The new credentials should be automatically selected in **Credential for NASA API**.
5. In **Resource**, select **DONKI Solar Flare**. This resource returns a report about recent solar flares.
6. By default, DONKI Solar Flare provides data for the past 30 days. To limit it to just the last week, use **Additional Fields**:
    1. Select **Add field**.
    2. Select **Start date**.
    3. To get a report starting from a week ago, you can use an expression: next to **Start date**, select **Parameter options** <span class="inline-image">![Parameter options icon](/_images/try-it-out/parameter-options.png)</span> > **Add Expression**. n8n opens the **Edit Expression** modal.
    4. In the **Expression** field, enter the following expression:
    ```js
    {{$today.minus({days: 7}).toFormat('yyyy-MM-dd')}}
    ```
    This generates a date in the correct format, seven days before the current date.

    !!! note "Date and time in n8n"
        n8n uses Luxon to work with date and time, and also provides two variables for convenience: `$now` and `$today`. For more information, refer to [Expressions > Luxon](/code-examples/expressions/luxon/). 

7. Close the **Edit Expression** modal to return to the NASA node.
8. You can now check that the node is working and returning the expected date: select **Execute node** to run the node manually. n8n calls the NASA API and displays details of solar flares in the past seven days in the **OUTPUT** section.
9. Close the NASA node to return to the workflow canvas.

## Step five: Add logic with the If node

n8n supports complex logic in workflows. In this tutorial, use the [If node](/integrations/core-nodes/n8n-nodes-base.if) to create two branches that each generate a report from the NASA data. Solar flares have five possible classifications. You'll create logic that sends a report with the lower classifications to one output, and the higher classifications to another. 

Add the If node:

1. Select the **Add node** <span class="inline-image">![Add node icon](/_images/try-it-out/add-node-small.png)</span> connector on the NASA node.
2. Search for **If**. n8n shows a list of nodes that match the search.
3. Select **If** to add the node to the canvas. n8n opens the node.
4. Select **Add condition** > **String**.
5. You need to check the value of the `classType` property in the NASA data. To do this:
    1. Next to **Value 1**, select **Parameter options** <span class="inline-image">![Parameter options icon](/_images/try-it-out/parameter-options.png)</span> > **Add Expression**. n8n opens the expressions editor for this field.
    2. Select **Current Node** > **Input Data** > **JSON** > **classType**. n8n adds the expression to the **Expression** editor, and displays a sample output.

    !!! note "Make sure you ran the NASA node in the previous section"
        If you didn't follow the step in the previous section to run the NASA node, you won't see any data to work with in this step.

    3. Close the expressions editor to return to the node.
    4. In **Operation**, select **Contains**.
    5. In **Value 2**, enter **X**. This is the highest classification of solar flare. In the next step, you will create two reports: one for X class solar flares, and one for all the smaller solar flares.
6. You can now check that the node is working and returning the expected date: select **Execute node** to run the node manually. n8n tests the data against the condition, and shows which results match true or false in the **OUTPUT** panel.

!!! note "Weeks without large solar flares"
    In this tutorial, you are working with live date. If you find there are no X class solar flares when you run the workflow, try replacing **X** in **Value 2** with either **A**, **B**, **C**, or **M**. 

## Step six: Output data from your workflow

The last step of the workflow is to send the two reports about solar flares. For this example, you'll send data to [Postbin](https://www.toptal.com/developers/postbin/). Postbin is a service that receives data and displays it on a temporary web page. 

1. On the If node, select the **Add node** <span class="inline-image">![Add node icon](/_images/try-it-out/add-node.png)</span> connector labeled **true**.
2. Search for **Postbin**. n8n shows a list of nodes that match the search.
3. Select **Postbin** to add the node to the canvas.
4. Change **Resource** to **Request**.
5. In **Operation**, select **Send**.
6. Go to [Postbin](https://www.toptal.com/developers/postbin/) and select **Create Bin**.
7. Copy the bin ID. It looks similar to `1651063625300-2016451240051`.
8. In n8n, paste your Postbin ID into **Bin ID**.
9. Now, configure the data to send to Postbin. Next to **Bin Content**, select **Parameter options** <span class="inline-image">![Parameter options icon](/_images/try-it-out/parameter-options.png)</span> > **Add Expression**.
10. Select **Current Node** > **Input Data** > **JSON** > **classType**. n8n adds the expression to the **Expression** editor, and displays a sample output.
11. The expression is: `{{$json["classType"]}}`. Add a message to it, so that the full expression is:
    ```js
    There was a solar flare of class {{$json["classType"]}}
    ```
13. Close the expressions editor to return to the node.
14. Close the Postbin node to return to the canvas.
15. Add another Postbin node, to handle the **false** output path from the If node:
    1. Hover over the Postbin node, then select **Duplicate node** <span class="inline-image">![Duplicate node icon](/_images/try-it-out/duplicate-node.png)</span> to duplicate the first Postbin node.
    2. Drag the **false** connector from the If node to the left side of the new Postbin node.
14. You can now test the entire workflow. Select **Execute Workflow**. n8n runs the workflow, showing each stage in progress.
15. Go back to your Postbin bin. Refresh the page to see the output.
16. If you want to use this workflow (in other words, if you want it to run once a week automatically), you need to activate it by selecting the **Active** toggle.

!!! note "Time limit"
    Postbin's bins exist for 30 minutes after creation. You may need to create a new bin and update the ID in the Postbin nodes, if you exceed this time limit.


## Next steps

* Take n8n's [courses](/courses/).
* Explore more examples in workflow templates.