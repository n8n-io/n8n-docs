# A slightly longer introduction

This guide shows you how to automate a task using a workflow in n8n, explaining key concepts along the way. You will:

* Install n8n's desktop app.
* Create a workflow from scratch. You'll build a workflow that runs every week to get data from NASA, filters the data, and generates two reports.
* Understand key concepts and skills, including:
    * Starting workflows with trigger nodes
    * Configuring credentials
    * Manipulating data
    * Representing your automation's logic
    * Using expressions



## Step one: Install and run n8n

--8<-- "_snippets/try-it-out/install-run-n8n.md"

## Step two: Create a new workflow

Create a blank workflow:

1. On the **Workflow templates** screen, click **New blank workflow**. n8n opens the new workflow.
2. Rename the workflow to something meaningful (for example, `Quickstart`): click the current workflow name, and replace it.

## Step three: Add a trigger node

There are two ways to start a workflow in n8n:

* Manually, by clicking **Execute workflow**. In this type of workflow, you must use the **Start** node as the first node.
* Automatically, using a trigger node as the first node. The triger node runs the workflow in response to an external event, or based on your settings.

For this tutorial, use the Cron trigger. This allows you to run the workflow on a schedule:

1. Click **Add node** <span class="inline-image">![Add node icon](/_images/try-it-out/quickstart/add-node.png)</span>.
2. Search for `Cron`. n8n shows a list of nodes that match the search.
3. Click **Cron** to add the node to the canvas. n8n opens the node.
4. Select **Add Cron Time**.
5. For **Mode**, select **Custom**.
6. In **Cron Expression**, enter the following cron expression: `0 9 * * 1`. If you need to generate your own cron expressions, [crontab guru](https://crontab.guru/) can help. The expression in this example means the workflow runs at 09:00 every Monday.
7. Close the node view to return to the canvas.


## Step four: Add the NASA node and set up credentials

The NASA node allows you to interact with NASA's [public APIs](https://api.nasa.gov/). The API gives you data to work with in this tutorial.

1. Click **Add node** <span class="inline-image">![Add node icon](/_images/try-it-out/quickstart/add-node.png)</span>.
2. Search for `NASA`. n8n shows a list of nodes that match the search.
3. Click **NASA** to add the node to the canvas. n8n opens the node.
4. To access the NASA APIs, you need to set up credentials:
    1. Click the  **Credential for NASA API** dropdown.
    2. Click **- Create New -**. n8n opens the credentials view.
    3. Go to [NASA APIs](https://api.nasa.gov/) and fill out the form in **Generate API Key**. NASA generates the key and displays it.
    4. Copy the key, and paste it into **API Key**.
    5. Click **Save**.
    6. Close the credentials screen. n8n returns to the node. The new credentials should be automatically selected in **Credential for NASA API**.
5. In **Resource**, select **DONKI Solar Flare**. This resource returns a report about recent solar flares.
6. By default, DONKI Solar Flare provides data for the past 30 days. To limit it to just the last week, use **Additional Fields**:
    1. Click **Add field**.
    2. Click **Start date**.
    3. To get a report starting from a week ago, you can use an expression: next to **Start date**, click **Parameter options** <span class="inline-image">![Parameter options icon](/_images/try-it-out/quickstart/parameter-options.png)</span> > **Add Expression**. n8n opens the **Edit Expression** modal.
    4. In the **Expression** field, enter the following expression:
    ```js
    {{$today.plus({days: -7}).toFormat('yyyy-MM-dd')}}
    ```
    This generates a date in the correct format, seven days before the current date.

    !!! note "Date and time in n8n"
        n8n uses Luxon to work with date and time, and also provides two variables for convenience: `$now` and `$today`. For more information, refer to [Expressions > Luxon](/code-examples/expressions/luxon/). 
7. You can now check that the node is working and returning the expected date: click **Execute node** to run the node manually. n8n calls the NASA API and displays details of solar flares in the past seven days in the **OUTPUT** section.


## Next steps

* Take n8n's [courses](/courses/).
* Explore [hosting options](/hosting/options/).
* Check out example workflows: the [n8n blog](https://n8n.io/blog/tag/tutorial/) contains tutorials around popular examples, while the workflow templates gives you a community-sourced library of inspiration and starting points.