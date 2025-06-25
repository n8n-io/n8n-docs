

# courses/index.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Text courses
description: Access n8n text courses. Find beginner and intermediate courses to learn how to build automation workflows using n8n. 
contentType: overview
---

# Text courses

If you've found your way here, it means you're serious about your interest in automation. Maybe you're tired of manually entering data into the same spreadsheet every day, of clicking through a series of tabs and buttons for that one piece of information you need, of managing tens of different tools and systems.

Whatever the reason, one thing is clear: you shouldn't spend precious time doing things that don't spark joy or contribute to your personal and professional growth.

These tasks can and should be automated! And you don't need advanced technical knowledge or excellent coding skills to do this–with no-code tools like n8n, automation is for everyone.

## Available courses

- [Level 1: Beginner course](/courses/level-one/index.md)
- [Level 2: Intermediate course](/courses/level-two/index.md)


# courses/level-one/chapter-1.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: tutorial
---

<!-- vale from-microsoft.We = NO -->
<!-- vale from-microsoft.FirstPerson = NO -->
# Navigating the Editor UI

In this lesson you will learn how to navigate the [Editor UI](/glossary.md#editor-n8n). We will walk through the [canvas](/glossary.md#canvas-n8n) and show you what each icon means and where to find things you will need while building workflows in n8n.

/// warning | n8n version
This course is based on n8n version 1.82.1. In other versions, some user interfaces might look different, but this shouldn't impact the core functionality.
///

## Getting started

Begin by setting up n8n.

We recommend starting with [n8n Cloud](https://app.n8n.cloud/register), a hosted solution that doesn't require installation and includes a free trial.

/// note | Alternative set up
If n8n Cloud isn't a good option for you, you can [self-host with Docker](/hosting/installation/docker.md). This is an advanced option recommended only for technical users familiar with hosting services, Docker, and the command line.
///

For more details on the different ways to set up n8n, see our [platforms documentation](/choose-n8n.md#platforms).

Once you have n8n running, open the Editor UI in a browser window. Log in to your n8n instance. Select **Overview** and then **Create Workflow** to view the main canvas.

It should look like this:

<figure><img src="/_images/courses/level-one/chapter-one/l1-c1-editor-ui.png" alt="Editor UI" style="width:100%"><figcaption align = "center"><i>Editor UI</i></figcaption></figure>

## Editor UI settings

The editor UI is the web interface where you build [workflows](/workflows/index.md). You can access all your workflows and [credentials](/glossary.md#credential-n8n), as well as support pages, from the Editor UI.

### Left-side panel

On the left side of the **Editor UI**, there is a panel which contains the core functionalities and settings for managing your workflows. Expand and collapse it by selecting the small arrow icon.

The panel contains the following sections:

- **Overview**: Contains all the workflows and credentials you have access to. During this course, create new workflows here.
- **Projects**: (Not available on Community edition) Projects group workflows and credentials. You can assign [roles](/user-management/rbac/role-types.md) to users in a project to control what they can do in a project. A **Personal** project is available by default.
- **Admin Panel**: n8n Cloud only. Access your n8n instance usage, billing, and version settings.
- **Templates**: A collection of pre-made workflows. Great place to get started with common use cases.
- **Variables**: Used to store and access fixed data across your workflows. This feature is available on the Pro and Enterprise Plans.
- **All executions**: Contains information about your workflow executions.
- **Help**: Contains resources around n8n product and community.
- **Update**: (When updates are available) Indicator for any recent product updates.
- **Settings**: Under the ellipsis (`...`) menu by your username. Manage users and access settings for a variety of features.

<figure style="text-align: center;"><img src="/_images/courses/level-one/chapter-one/l1-c1-side-panel.png" alt="Editor UI left-side menu" style="height: 600px;"><figcaption align = "center"><i>Editor UI left-side menu</i></figcaption></figure>

### Top bar

The top bar of the **Editor UI** contains the following information:

- **Workflow Name**: By default, n8n names a new workflow as "My workflow", but you can edit the name at any time.
- **+ Add Tag**: Tags help you organise your workflows by category, use case, or whatever is relevant for you. Tags are optional.
- **Inactive/active toggle**: This button activates or deactivates the current workflow. By default, workflows are deactivated.
- **Share**: You can share and collaborate with others on workflows on the Starter, Pro, and Enterprise plans.
- **Save**: This button saves the current workflow.
- **History**: Once you save your workflow, you can view previous versions here.

<figure><img src="/_images/courses/level-one/chapter-one/l1-c1-top-bar.png" alt="Editor UI top bar" style="width:100%"><figcaption align = "center"><i>Editor UI top bar</i></figcaption></figure>

### Canvas

The **canvas** is the gray dotted grid background in the Editor UI. It displays several icons and a node with different functionalities:

- Buttons to zoom the canvas to fit the screen, zoom in or out of the canvas, and tidy up the nodes on screen.
- A button to **Execute workflow** once you add your first node. When you click on it, n8n executes all nodes on the canvas in sequence.
- A button with a **+** sign inside. This button opens the nodes panel.
- A button with a note icon inside. This button adds a [sticky note](/workflows/components/sticky-notes.md) to the canvas (visible when hovering on the top right + icon).
- A dotted square with the text "Add first step." This is where you add your first node.

<figure><img src="/_images/courses/level-one/chapter-one/l1-c1-canvas.png" alt="Workflow canvas" style="width:100%"><figcaption align = "center"><i>Workflow canvas</i></figcaption></figure>

/// note | Moving the canvas
You can move the workflow canvas around in three ways:

- Select ++ctrl+left-button++ on the canvas and move it around.
- Select ++middle-button++ on the canvas and move it around.
- Place two fingers on your touchpad and slide.
///


Don't worry about workflow execution and activation for now; we'll explain these concepts later on in the course.

## Nodes

You can think of nodes as building blocks that serve different functions that, when put together, make up a functioning machine: an automated workflow.

/// note | Node
A node is an individual step in your workflow: one that either (a) loads, (b) processes, or (c) sends data.
///

Based on their function, n8n classifies nodes into four types:

- **App** or **Action Nodes** add, remove, and edit data; request and send external data; and trigger events in other systems. Refer to the [Action nodes library](/integrations/builtin/app-nodes/index.md) for a full list of these nodes.
- **Trigger Nodes** start a workflow and supply the initial data. Refer to the [Trigger nodes library](/integrations/builtin/trigger-nodes/index.md) for a list of trigger nodes.
- **Core Nodes** can be trigger or app nodes. Whereas most nodes connect to a specific external service, core nodes provide functionality such as logic, scheduling, or generic API calls. Refer to the [Core Nodes library](/integrations/builtin/core-nodes/index.md) for a full list of core nodes.
- **Cluster Nodes** are node groups that work together to provide functionality in a workflow, primarily for AI workflows. Refer to [Cluster nodes](/integrations/builtin/cluster-nodes/index.md) for more information.

/// note | Learn more
Refer to [Node types](/integrations/builtin/node-types.md) for a more detailed explanation of all node types.
///

### Finding nodes

You can find all available nodes in the **nodes panel** on the right side of the Editor UI. There are three ways in which you can open the nodes panel:

- Click the **+** icon in the top right corner of the canvas.
- Click the **+** icon on the right side of an existing node on the canvas (the node to which you want to add another one).
- Click the ++tab++ key on your keyboard.

<figure style="text-align: center; width:50%; margin:auto;"><img src="/_images/courses/level-one/chapter-one/l1-c1-node-menu-drilldown.gif" alt="Nodes panel"><figcaption align = "center"><i>Nodes panel</i></figcaption></figure>

In the nodes panel, notice that when adding your first node, you will see the different trigger node categories. After you have added your trigger node, you'll see that the nodes panel changes to show Advanced AI, Actions in an App, Data transformation, Flow, Core, and Human in the loop nodes.

If you want to find a specific node, use the search input at the top of the nodes panel.


### Adding nodes

There are two ways to add nodes to your canvas:

- Select the node you want in the nodes panel. The new node will automatically connect to the selected node on the canvas.
- Drag and drop the node from the nodes panel to the canvas.

### Node buttons

If you hover on a node, you'll notice that three icons appear on top:

- Execute the node (Play icon)
- Deactivate/Activate the node (Power icon)
- Delete the node (Trash icon)

There will also be an ellipsis icon, which opens a context menu containing other [node options](/workflows/components/nodes.md#node-controls).

/// note | Moving a workflow
To move a workflow around the canvas, select all nodes with your mouse or ++ctrl+a++, select and hold on a node, then drag it to any point you want on the canvas.
///

## Summary

In this lesson you learned how to navigate the Editor UI, what the icons mean, how to access the left-side and node panels, and how to add nodes to the canvas.

In the next lesson, you will build a mini-workflow to put into practice what you've learned so far.


# courses/level-one/chapter-2.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: tutorial
---

<!-- vale from-microsoft.We = NO -->
<!-- vale from-microsoft.FirstPerson = NO -->
# Building a Mini-workflow

In this lesson, you will build a small [workflow](/glossary.md#workflow-n8n) that gets 10 articles about automation from Hacker News. The process consists of five steps:

1. [Add a Manual Trigger node](#1-add-a-manual-trigger-node)
2. [Add the Hacker News node](#2-add-the-hacker-news-node)
3. [Configure the Hacker News node](#3-configure-the-hacker-news-node)
4. [Execute the node](#4-execute-the-node)
5. [Save the workflow](#5-save-the-workflow)

The finished workflow will look like this:

[[ workflowDemo("file:////courses/level-one/chapter-2.json") ]]

## 1. Add a Manual Trigger node

Open the nodes panel (reminder: you can open this by selecting the **+** icon in the top right corner of the [canvas](/glossary.md#canvas-n8n) or selecting ++tab++ on your keyboard).

Then:

1. Search for the **Manual Trigger** node.
2. Select it when it appears in the search.

This will add the [Manual Trigger](/integrations/builtin/core-nodes/n8n-nodes-base.manualworkflowtrigger.md) node to your canvas, which allows you to run the workflow at any time by selecting the **Execute workflow** button.

/// note | Manual triggers
For faster workflow creation, you can skip this step in the future. Adding any other node without a trigger will add the Manual Trigger node to the workflow.

In a real-world scenario, you would probably want to set up a schedule or some other [trigger](/glossary.md#trigger-node-n8n) to run the workflow.
///

## 2. Add the Hacker News node

Select the **+** icon to the right of the Manual Trigger node to open the nodes panel.

Then:

1. Search for the **Hacker News** node.
2. Select it when it appears in the search.
3. In the **Actions** section, select **Get many items**.

n8n adds the node to your canvas and the node window opens to display its configuration details.

## 3. Configure the Hacker News node

When you add a new node to the Editor UI, the node is automatically activated. The node details will open in a window with several options:

- **Parameters**: Adjust parameters to refine and control the node's functionality.
- **Settings**: Adjust settings to control the node's design and executions.
- **Docs**: Open the n8n documentation for this node in a new window.


/// note | Parameters vs. Settings
* **Parameters** are different for each node, depending on its functionality.
* **Settings** are the same for all nodes.
///


### Parameters

We need to configure several parameters for the Hacker News node to make it work:

- **Resource**: All <br/>
This resource selects all data records (articles).
- **Operation**: Get Many <br/>
This operation fetches all the selected articles.
- **Limit**: 10 <br/>
This parameter sets a limit to the number of results the Get Many operation returns.
- **Additional Fields** > **Add Field** > **Keyword**: automation <br/>
**Additional fields** are options that you can add to certain nodes to make your request more specific or filter the results. For this example, we want to get only articles that include the keyword "automation." <br/>

The configuration of the parameters for the Hacker News node should now look like this:

<figure><img src="/_images/courses/level-one/chapter-two/l1-c-2-hacker-news-node-parameters.png" alt="Hacker News node parameters" style="width:100%"><figcaption align = "center"><i>Hacker News node parameters</i></figcaption></figure>

### Settings

The **Settings** section includes several options for node design and executions. In this case, we'll configure only the final two settings, which set the node's appearance in the Editor UI canvas.

In the Hacker News node Settings, edit:

- **Notes**: Get the 10 latest articles.

    /// note | Node notes
    It's often helpful to add a short description in the node about what it does. This is helpful for complex or shared workflows in particular!
    ///

- **Display note in flow?**: toggle to true<br/>
This option will display the Note under the node in the canvas.

The configuration of the settings for the Hacker News node should now look like this:

<figure><img src="/_images/courses/level-one/chapter-two/l1-c2-hacker-news-node-setting-configuration.png" alt="Hacker News node settings" style="width:100%"><figcaption align = "center"><i>Hacker News node settings</i></figcaption></figure>


/// note | Renaming a node
You can rename the node with a name that's more descriptive for your use case. There are three ways to do this:

- Select the node you want to rename and at the same time press the F2 key on your keyboard.
- Double-click on the node to open the node window. Click on the name of the node in the top left corner of the window, rename it as you like, then click **Rename** to save the node under the new name.
- Right-click on the node and select the **Rename** option, or select the node and press F2 on your keyboard.

<figure><img src="/_images/courses/level-one/chapter-two/l1-c2-renaming-a-node-from-the-keyboard.png" alt="Renaming a node" style="width:100%"><figcaption align = "center"><i>Renaming a node from the keyboard</i></figcaption></figure>

To find the original node name (the type of node), open the node window and select **Settings**. The bottom of the page contains the node type and version.
///

## 4. Execute the node

Select the **Execute step** button in the node details window. You should see 10 results in the Output **Table** view.

<!--This screenshot needs updating now that the button says "Execute step" rather than "Test node"-->
<figure><img src="/_images/courses/level-one/chapter-two/l1-c2-results-in-table-view-for-the-hacker-news-node.png" alt="Results in Table view for the Hacker News node" style="width:100%"><figcaption align = "center"><i>Results in Table view for the Hacker News node</i></figcaption></figure>

### Node executions

/// note | Node execution
A node execution represents a run of that node to retrieve or process the specified data.
///

If a node executes successfully, a small green checkmark appears on top of the node in the canvas

<figure><img src="/_images/courses/level-one/chapter-two/l1-c2-successfully-executed-workflow.png" alt="Successfully executed workflow" style="width:100%"><figcaption align = "center"><i>Successfully executed workflow</i></figcaption></figure>

If there are no problems with the parameters and everything works fine, the requested data displays in the node window in **Table**, **JSON**, and **Schema** format. You can switch between these views by selecting the one you want from the **Table | JSON | Schema** button at the top of the node window.

/// note | Table vs JSON views
The **Table** view is the default. It displays the requested data in a table, where the rows are the records and the columns are the available attributes of those records.
///

Here's our Hacker News output in JSON view:

<figure><img src="/_images/courses/level-one/chapter-two/l1-c2-results-in-json-view-for-the-hacker-news-node.png" alt="Results in JSON view for the Hacker News node" style="width:100%"><figcaption align = "center"><i>Results in JSON view for the Hacker News node</i></figcaption></figure>

The node window displays more information about the node execution:

- Next to the **Output** title, notice a small icon (this will be a green checkmark if the node execution succeeded). Beside it, there is an info icon. If you hover on it, you'll get two more pieces of information that can provide insights into the performance of each individual node in a workflow:
    - **Start Time**: When the node execution started.
    - **Execution Time**: How long it took for the node to return the results from the moment it started executing.
- Just below the **Output** title, you'll notice another piece of information: **10 items**. This field displays the number of items (records) that the node request returned. In this example, it's expected to be 10, since this is the limit we set in step 2. But if you don't set a limit, it's useful to see how many records are actually returned.


/// warning | Error in nodes
A red warning icon on a node means that the node has errors. This might happen if the node credentials are missing or incorrect or the node parameters aren't configured correctly.
///
<figure style="text-align:center;"><img src="/_images/courses/level-one/chapter-one/error-node.png" alt="Error in nodes" style="width:30%" align="center"><figcaption align = "center"><i>Error in nodes</i></figcaption></figure>

## 5. Save the workflow

Once you're finished editing the node, select **Back to canvas** to return to the main canvas.

By default, your workflow is automatically saved as "My workflow."

For this lesson, rename the workflow to be "Hacker News workflow."

/// note | Reminder
You can rename a workflow by clicking on the workflow's name at the top of the Editor UI.
///

Once you've renamed the workflow, be sure to save it.

There are two ways in which you can save a workflow:

- From the Canvas in Editor UI, click **Ctrl + S** or **Cmd + S** on your keyboard.
- Select the **Save** button in the top right corner of the Editor UI. You may need to leave the node editor first by clicking outside the dialog.

If you see a grey **Saved** text instead of the **Save** button, your workflow was automatically saved.

## Summary

Congratulations, you just built your first workflow! In this lesson, you learned how to use actions in app nodes, configure their parameters and settings, and save and execute your workflow.

In the next lesson, you'll meet your new client, Nathan, who needs to automate his sales reporting work. You will build a more complex workflow for his use case, helping him become more productive at work.


# courses/level-one/chapter-3.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: tutorial
---

<!-- vale off -->
# Automating a (Real-world) Use Case

Meet Nathan 🙋. Nathan works as an Analytics Manager at ABCorp. His job is to support the ABCorp team with reporting and analytics. Being a true jack of all trades, he also handles several miscellaneous initiatives.

Some things that Nathan does are repetitive and mind-numbing. He wants to automate some of these tasks so that he doesn't burn out. As an **Automation Expert**, you are meeting with Nathan today to help him understand how he can offload some of his responsibilities to n8n.

## Understanding the scenario

**You 👩‍🔧:** Nice to meet you, Nathan. Glad to be doing this! What's a repetitive task that's error-prone and that you'd like to get off your plate first?

**Nathan 🙋:** Thanks for coming in! The most annoying one's gotta be the weekly sales reporting.

I have to collect sales data from our legacy data warehouse, which manages data from the main business processes of an organization, such as sales or production. Now, each sales order can have the status Processing or Booked. I have to calculate the sum of all the Booked orders and announce them in the company Discord every Monday. Then I have to create a spreadsheet of all the Processing sales so that the Sales Managers can review them and check if they need to follow up with customers.

This manual work is tough and requires high attention to detail to make sure that all the numbers are right. Inevitably, I lose my focus and mistype a number or I don't get it done on time. I've been criticized once by my manager for miscalculating the data.

**You 👩‍🔧:** Oh no! Doesn't the data warehouse have a way to export the data?

**Nathan 🙋:** The data warehouse was written in-house ages ago. It doesn't have a CSV export but they recently added a couple of API endpoints that expose this data, if that helps.

**You 👩‍🔧:** Perfect! That's a good start. If you have a generic API, we can add some custom code and a couple of services to make an automated workflow. This gig has n8n written all over it. Let's get started!


# courses/level-one/chapter-4.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: tutorial
---

<!-- vale from-microsoft.We = NO -->
<!-- vale from-microsoft.FirstPerson = NO -->
# Designing the Workflow

Now that we know what Nathan wants to automate, let's consider the steps he needs to take to achieve his goals:

1. Get the relevant data (order id, order status, order value, employee name) from the data warehouse
2. Filter the orders by their status (Processing or Booked)
3. Calculate the total value of all the Booked orders
4. Notify the team members about the Booked orders in the company's Discord channel
5. Insert the details about the Processing orders in Airtable for follow-up
6. Schedule this workflow to run every Monday morning

Nathan's workflow involves sending data from the company's data warehouse to two external services:

- Discord
- Airtable

Before that, the data has to be wrangled with general functions (conditional filtering, calculation, scheduling).

n8n provides integrations for all these steps, so Nathan's workflow in n8n would look like this:

[[ workflowDemo("file:////courses/level-one/finished.json") ]]

You will build this workflow in eight steps:

1. [Getting data from the data warehouse](/courses/level-one/chapter-5/chapter-5.1.md)
2. [Inserting data into Airtable](/courses/level-one/chapter-5/chapter-5.2.md)
3. [Filtering orders](/courses/level-one/chapter-5/chapter-5.3.md)
4. [Setting values for processing orders](/courses/level-one/chapter-5/chapter-5.4.md)
5. [Calculating booked orders](/courses/level-one/chapter-5/chapter-5.5.md)
6. [Notifying the team](/courses/level-one/chapter-5/chapter-5.6.md)
7. [Scheduling the workflow](/courses/level-one/chapter-5/chapter-5.7.md)
8. [Activating and examining the workflow](/courses/level-one/chapter-5/chapter-5.8.md)

To build this workflow, you will need the credentials found in the email you received from n8n when you signed up for this course. If you haven't signed up already, you can do it [here](https://n8n-community.typeform.com/to/PDEMrevI?typeform-source=127.0.0.1){:target="_blank" .external-link}. If you haven't received a confirmation email after signing up, [contact us](mailto:help@n8n.io).

[Start building!](/courses/level-one/chapter-5/chapter-5.1.md){ .md-button }


# courses/level-one/chapter-5/chapter-5.1.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: tutorial
---

<!-- vale from-microsoft.We = NO -->
<!-- vale from-microsoft.FirstPerson = NO -->
# 1. Getting data from the data warehouse

In this part of the workflow, you will learn how to get data by making HTTP requests with the [**HTTP Request**](/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/index.md) node.

After completing this section, your workflow will look like this:

[[ workflowDemo("file:////courses/level-one/chapter-5/chapter-5.1.json") ]]

First, let's set the scene for building Nathan's workflow.

## Create new workflow

Open your Editor UI and create a new workflow with one of the two possible commands:

- Select ++ctrl+alt+n++ or ++cmd+option+n++ on your keyboard.
- Open the left menu, navigate to **Workflows**, and select **Add workflow**.

Name this new workflow "Nathan's workflow."

The first thing you need to do is get data from ABCorp's old data warehouse.

In a previous chapter, you used an action node designed for a specific service (Hacker News). But not all apps or services have dedicated nodes, like the legacy data warehouse from Nathan's company.

Though we can't directly export the data, Nathan told us that the data warehouse has a couple of API endpoints. That's all we need to access the data using the [HTTP Request](/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/index.md) node in n8n.

/// note | No node for that service?
The HTTP Request node is one of the most versatile nodes, allowing you to make HTTP requests to query data from apps and services. You can use it to access data from apps or services that don't have a dedicated node in n8n.
///

## Add an HTTP Request node

Now, in your Editor UI, add an HTTP Request node like you learned in the lesson [Adding nodes](/courses/level-one/chapter-1.md#adding-nodes). The node window will open, where you need to configure some parameters.

<figure><img src="/_images/courses/level-one/chapter-five/l1-c5-5-1-http-request-node.png" alt="HTTP Request node" style="width:100%"><figcaption align = "center"><i>HTTP Request node</i></figcaption></figure>

This node will use credentials.

/// note | Credentials
[Credentials](/glossary.md#credential-n8n) are unique pieces of information that identify a user or a service and allow them to access apps or services (in our case, represented as n8n nodes). A common form of credentials is a username and a password, but they can take other forms depending on the service.
///

In this case, you'll need the credentials for the ABCorp data warehouse API included in the email from n8n you received when you signed up for this course. If you haven't signed up yet, [sign up here](https://n8n-community.typeform.com/to/PDEMrevI){:target="_blank" .external-link}.

In the **Parameters** of the HTTP Request node, make the following adjustments:

- **Method**: This should default to GET. Make sure it's set to GET.
- **URL**: Add the **Dataset URL** you received in the email when you signed up for this course.
- **Send Headers**: Toggle this control to true. In **Specify Headers**, ensure **Using Fields Below** is selected.
    - **Header Parameters** > **Name**: Enter `unique_id`.
    - **Header Parameters** > **Value**: The Unique ID you received in the email when you signed up for this course.
- **Authentication**: Select **Generic Credential Type**. This option requires credentials before allowing you to access the data.
    - **Generic Auth Type**: Select **Header Auth**. (This field will appear after you select the Generic Credential Type for the Authentication.)
    - **Credential for Header Auth**: To add your credentials, select **+ Create new credential**. This will open the Credentials window.
    - In the Credentials window, set **Name** to be the **Header Auth name** you received in the email when you signed up for this course.
    - In the Credentials window, set **Value** to be the **Header Auth value** you received in the email when you signed up for this course.
    - Select the **Save** button in the Credentials window to save your credentials. Your **Credentials Connection** window should look like this:
    <figure><img src="/_images/courses/level-one/chapter-five/l1-c5-5-1-http-request-node-credentials.png" alt="HTTP Request node credentials" style="width:100%"><figcaption align = "center"><i>HTTP Request node credentials</i></figcaption></figure>

/// note | Credentials naming
New credential names follow the "<node name> account" format by default. You can rename the credentials by clicking on the name, similarly to renaming nodes. It's good practice to give them names that identify the app/service, type, and purpose of the credential. A naming convention makes it easier to keep track of and identify your credentials.
///

Once you save, exit out of the Credentials window to return to the HTTP Request node.

## Get the data

Select the **Execute step** button in the HTTP Request node window. The table view of the HTTP request results should look like this:

<figure><img src="/_images/courses/level-one/chapter-five/l1-c5-5-1-http-request-node-window.png" alt="HTTP Request node output" style="width:100%"><figcaption align = "center"><i>HTTP Request node output</i></figcaption></figure>

This view should be familiar to you from the [Building a mini-workflow](/courses/level-one/chapter-2.md) page.

This is the data from ABCorp's data warehouse that Nathan needs to work with. This data set includes sales information from 30 customers with five columns:

- `orderID`: The unique id of each order.
- `customerID`: The unique id of each customer.
- `employeeName`: The name of Nathan's colleague responsible for the customer.
- `orderPrice`: The total price of the customer's order.
- `orderStatus`: Whether the customer's order status is `booked` or still in `processing`.

## What's next?

**Nathan 🙋**: This is great! You already automated an important part of my job with only one node. Now instead of manually accessing the data every time I need it, I can use the HTTP Request Node to automatically get the information.

**You 👩‍🔧**: Exactly! In the next step, I'll help you one step further and insert the data you retrieved into Airtable.


# courses/level-one/chapter-5/chapter-5.2.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: tutorial
---

<!-- vale from-microsoft.We = NO -->
<!-- vale from-microsoft.FirstPerson = NO -->
# 2. Inserting data into Airtable

In this step of the workflow, you will learn how to insert the data received from the HTTP Request node into Airtable using the [Airtable node](/integrations/builtin/app-nodes/n8n-nodes-base.airtable/index.md).

/// note | Spreadsheet nodes
You can replace the Airtable node with another spreadsheet app/service. For example, n8n also has a node for [**Google Sheets**](/integrations/builtin/app-nodes/n8n-nodes-base.googlesheets/index.md).
///

After this step, your workflow should look like this:

[[ workflowDemo("file:////courses/level-one/chapter-5/chapter-5.2.json") ]]

## Configure your table

If we're going to insert data into Airtable, we first need to set up a table there. To do this:

1. [Create an Airtable account](https://airtable.com/signup){:target="_blank" .external}.
2. In your Airtable workspace add a new base from scratch and name it, for example, *beginner course*.

	<figure><img src="/_images/courses/level-one/chapter-five/l1-c5-2-create-airtable-base.png" alt="Create an Airtable base" style="width:100%"><figcaption align = "center"><i>Create an Airtable base</i></figcaption></figure>

3. In the beginner course base, by default, you have a table called **Table 1** with four fields: `Name`, `Notes`, `Assignee`, and `Status`.  These fields aren't relevant for us since they aren't in our "orders" data set. This brings us to the next point: the names of the fields in Airtable have to match the names of the columns in the node result. Prepare the table by doing the following:

	* Rename the table from **Table 1** to **orders** to make it easier to identify.
	* Delete the 3 blank records created by default.
	* Delete the `Notes`, `Assignee`, and `Status` fields.
	* Edit the `Name` field (the primary field) to read `orderID`, with the **Number** field type.
	* Add the rest of the fields, and their field types, using the table below as a reference:

	 | Field name     | Field type       |
	 |----------------|------------------|
	 | `orderID`      | Number           |
	 | `customerID`   | Number           |
	 | `employeeName` | Single line text |
	 | `orderPrice`   | Number           |
	 | `orderStatus`  | Single line text |


Now your table should look like this:

<figure><img src="/_images/courses/level-one/chapter-five/l1-c5-2-orders-table.png" alt="Orders table in Airtable" style="width:100%"><figcaption align = "center"><i>Orders table in Airtable</i></figcaption></figure>

Now that the table is ready, let's return to the workflow in the n8n Editor UI.

## Add an Airtable node to the HTTP Request node

Add an Airtable node connected to the HTTP Request node.

///note | Remember
You can add a node connected to an existing node by selecting the **+** icon next to the existing node.
///

In the node panel:

1. Search for Airtable.
2. Select **Create a record** from the **Record Actions** search results.

This will add the Airtable node to your canvas and open the node details window.

In the Airtable node window, configure the following parameters:

- **Credential to connect with**:
	- Select **Create new credential**.
	- Keep the default option **Connect using: Access Token** selected.
	- **Access token**: Follow the instructions from the [Airtable credential](/integrations/builtin/credentials/airtable.md) page to create your token. Use the recommended scopes and add access to your beginners course base. Save the credential and close the Credential window when you're finished.
- **Resource**: Record.
- **Operation**: Create. This operation will create new records in the table.
- **Base**: You can pick your base from a list (for example, beginner course).
- **Table**: orders.
- **Mapping Column Mode**: Map automatically. In this mode, the incoming data fields must have the same as the columns in Airtable.

## Test the Airtable node

Once you've finished configuring the Airtable node, execute it by selecting **Execute step**. This might take a moment to process, but you can follow the progress by viewing the base in Airtable.

Your results should look like this:

<figure><img src="/_images/courses/level-one/chapter-five/l1-c5-2-airtable-node.png" alt="Airtable node results" style="width:100%"><figcaption align = "center"><i>Airtable node results</i></figcaption></figure>

All 30 data records will now appear in the orders table in Airtable:

<figure><img src="/_images/courses/level-one/chapter-five/l1-c5-2-airtable-records.png" alt="Imported records in the orders table" style="width:100%"><figcaption align = "center"><i>Imported records in the orders table</i></figcaption></figure>

## What's next?

**Nathan 🙋**: Wow, this automation is already so useful! But this inserts all collected data from the HTTP Request node into Airtable. Remember that I actually need to insert only processing orders in the table and calculate the price of booked orders?

**You 👩‍🔧**: Sure, no problem. As a next step, I'll use a new node to filter the orders based on their status.


# courses/level-one/chapter-5/chapter-5.3.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: tutorial
---

<!-- vale from-microsoft.We = NO -->
<!-- vale from-microsoft.FirstPerson = NO -->
# 3. Filtering Orders

In this step of the workflow, you will learn how to filter data using conditional logic and how to use expressions in nodes using the [If node](/integrations/builtin/core-nodes/n8n-nodes-base.if.md).

After this step, your workflow should look like this:

[[ workflowDemo("file:////courses/level-one/chapter-5/chapter-5.3.json") ]]

To insert only processing orders into Airtable we need to filter our data by `orderStatus`. Basically, we want to tell the program that _if_ the `orderStatus` is processing, _then_ insert all records with this status into Airtable; _else_, for example, if the `orderStatus` isn't *processing*, calculate the sum of all orders with the other `orderStatus` (`booked`).

This if-then-else command is conditional logic. In n8n workflows, you can add conditional logic with the [If node](/integrations/builtin/core-nodes/n8n-nodes-base.if.md), which splits a workflow conditionally based on comparison operations.

/// note | If vs. Switch
If you need to filter data on more than boolean values (true and false), use the [Switch node](/integrations/builtin/core-nodes/n8n-nodes-base.switch.md). The Switch node is similar to the If node, but supports multiple output connectors.
///

## Add If node before the Airtable node

First, let's add an If node between the connection from the HTTP Request node to the Airtable node:

1. Hover over the arrow connection the **HTTP Request** node and the **Airtable** node.
2. Select the **+** sign between the HTTP Request node and the Airtable node.

## Configure the If node

Selecting the plus removes the connection to the Airtable node to the HTTP request. Now, let's add an If node connected to the HTTP Request node:

1. Search for the If node.
2. Select it when it appears in the search.

For the If node, we'll use an expression.

/// note | Expressions
An [expression](/glossary.md#expression-n8n) is a string of characters and symbols in a programming language that can be evaluated to get a value, often according to its input. In n8n workflows, you can use expressions in a node to refer to another node for input data. In our example, the If node references the data output by the HTTP Request node.
///

In the If node window, configure the parameters:

- Set the `value1` placeholder to `{{ $json.orderStatus }}` with the following steps:
    1. Hover over the value1 field.
    2. Select the **Expression** tab on the right side of the `value1` field.
    3. Next, open the expression editor by selecting the link icon: 
    <figure><img src="/_images/courses/level-one/chapter-five/l1-c5-5-3-if-node-open-editor.png" alt="Opening the Expression Editor" style="width:100%"><figcaption align = "center"><i>Opening the Expression Editor</i></figcaption></figure>
    4. Use the left-side panel to select **HTTP Request** >  **orderStatus** and drag it into the **Expression** field in the center of the window.
    <figure><img src="/_images/courses/level-one/chapter-five/l1-c5-5-3-if-node-expression-editor.png" alt="Expression Editor in the IF node" style="width:100%"><figcaption align = "center"><i>Expression Editor in the If node</i></figcaption></figure>
    6. Once you add the expression, close the **Edit Expression** dialog.

- **Operation**: Select **String** > **is equal to**
- Set the `value2` placeholder to `processing`.

/// warning | Data Type
Make sure to select the correct data type (boolean, date & time, number, or string) when you select the **Operation**.
///

Select **Execute step** to test the If node.

Your results should look like this:

<figure><img src="/_images/courses/level-one/chapter-five/l1-c5-5-3-if-node-output.png" alt="If node output" style="width:100%"><figcaption align = "center"><i>If node output</i></figcaption></figure>

Note that the orders with a `processing` order status should show for the **True Branch** output, while the orders with a `booked` order status should show in the **False Branch** output.

Close the If node detail view when you're finished.

## Insert data into Airtable

Next, we want to insert this data into Airtable. Remember what Nathan said at the end of the [Inserting data into Airtable](/courses/level-one/chapter-5/chapter-5.2.md) lesson?

> I actually need to insert only processing orders in the table...

Since Nathan only needs the `processing` orders in the table, we'll connect the Airtable node to the If node's `true` connector. 

In this case, since the Airtable node is already on our canvas, select the **If node** `true` connector and drag it to the Airtable node.

It's a good idea at this point to retest the Airtable node. Before you do, open your table in Airtable and delete all existing rows. Then open the Airtable node window in n8n and select **Execute step**.

Review your data in Airtable to be sure your workflow only added the correct orders (those with `orderStatus` of `processing`). There should be 14 records now instead of 30.

At this stage, your workflow should look like this:

[[ workflowDemo("file:////courses/level-one/chapter-5/chapter-5.3.json") ]]

## What's next?

**Nathan 🙋**: This If node is so useful for filtering data! Now I have all the information about processing orders. I actually only need the `employeeName` and `orderID`, but I guess I can keep all the other fields just in case.

**You 👩‍🔧**: Actually, I wouldn't recommend doing that. Inserting more data requires more computational power, the data transfer is slower and takes longer, and takes up more storage resources in your table. In this particular case, 14 records with 5 fields might not seem like it'd make a significant difference, but if your business grows to thousands of records and dozens of fields, things add up and even one extra column can affect performance.

**Nathan 🙋**: Oh, that's good to know. Can you select only two fields from the processing orders?

**You 👩‍🔧**: Sure, I'll do that in the next step.


# courses/level-one/chapter-5/chapter-5.4.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: tutorial
---

<!-- vale from-microsoft.We = NO -->
<!-- vale from-microsoft.FirstPerson = NO -->
# 4. Setting Values for Processing Orders

In this step of the workflow, you will learn how to select and set data before transferring it to Airtable using the Edit Fields (Set) node. After this step, your workflow should look like this:

[[ workflowDemo("file:////courses/level-one/chapter-5/chapter-5.4.json") ]]

The next step in Nathan's workflow is to filter the data to only insert the `employeeName` and `orderID` of all `processing` orders into Airtable.

For this, you need to use the [Edit Fields (Set) node](/integrations/builtin/core-nodes/n8n-nodes-base.set.md), which allows you to select and set the data you want to transfer from one node to another.

/// note | Edit Fields node
The Edit Fields node can set completely new data as well as overwrite data that already exists. This node is crucial in workflows which expect incoming data from previous nodes, such as when inserting values into spreadsheets or databases.
///

## Add another node before the Airtable node

In your workflow, add another node before the **Airtable node** from the **If node** in the same way we did it in the [Filtering Orders](/courses/level-one/chapter-5/chapter-5.3.md#add-if-node-before-the-airtable-node) lesson on the If node's `true` connector. Feel free to drag the Airtable node further away if your canvas feels crowded.

## Configure the Edit Fields node

Now search for the **Edit Fields (Set) node** after you've selected the **+** sign coming off the If node's `true` connector.

With the Edit Fields node window open, configure these parameters:

- Ensure **Mode** is set to **Manual Mapping**.
- While you can use the **Expression editor** we used in the [Filtering Orders](/courses/level-one/chapter-5/chapter-5.3.md) lesson, this time, let's drag the fields from the **Input** into the **Fields to Set**:
    - Drag **If** > **orderID** as the first field.
    - Drag **If** > **employeeName** as the second field.
- Ensure that **Include Other Input Fields** is set to false.

Select **Execute step**. You should see the following results:

<figure><img src="/_images/courses/level-one/chapter-five/l1-c5-4-set-node.png" alt="Edit Fields (Set) node" style="width:100%"><figcaption align = "center"><i>Edit Fields (Set) node</i></figcaption></figure>

## Add data to Airtable

Next, let's insert these values into Airtable:

1. Go to your Airtable base.
2. Add a new table called `processingOrders`.
3. Replace the existing columns with two new columns:
    - `orderID` (primary field): Number
    - `employeeName`: Single line text

    ///note | Reminder
    If you get stuck, refer to the [Inserting data into Airtable](/courses/level-one/chapter-5/chapter-5.2.md) lesson.
    ///

4. Delete the three empty rows in the new table.
5. In n8n, connect the Edit Fields node** connector to the **Airtable node**.
6. Update the Airtable node configuration to point to the new `processingOrders` table instead of the `orders` table.
7. Test your Airtable node to be sure it inserts records into the new `processingOrders` table.

At this stage, your workflow should now look like this:

[[ workflowDemo("file:////courses/level-one/chapter-5/chapter-5.4.json") ]]

## What's next?

**Nathan 🙋**: You've already automated half of my work! Now I still need to calculate the booked orders for my colleagues. Can we automate that as well?

**You 👩‍🔧**: Yes! In the next step, I'll use some JavaScript code in a node to calculate the booked orders.


# courses/level-one/chapter-5/chapter-5.5.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: tutorial
---

<!-- vale from-microsoft.We = NO -->
<!-- vale from-microsoft.FirstPerson = NO -->
# 5. Calculating Booked Orders

In this step of the workflow you will learn how n8n structures data and how to add custom JavaScript code to perform calculations using the Code node. After this step, your workflow should look like this:

[[ workflowDemo("file:////courses/level-one/chapter-5/chapter-5.5.json") ]]

The next step in Nathan's workflow is to calculate two values from the booked orders:

- The total number of booked orders
- The total value of all booked orders

To calculate data and add more functionality to your workflows you can use the Code node, which lets you write custom JavaScript code.

## About the Code node

/// warning | Code node modes
The Code node has two operational **modes**, depending on how you want to process items:

* **Run Once for All Items** allows you to write code to process all input items at once, as a group.
* **Run Once for Each Item** executes your code once for each input item.

Learn more about how to use the [Code node](/integrations/builtin/core-nodes/n8n-nodes-base.code/index.md).
///

In n8n, the data that's passed between nodes is an array of objects with the following JSON structure:

```json
[
    {
   	 "json": { // (1)!
   		 "apple": "beets",
   		 "carrot": {
   			 "dill": 1
   		 }
   	 },
   	 "binary": { // (2)!
   		 "apple-picture": { // (3)!
   			 "data": "....", // (4)!
   			 "mimeType": "image/png", // (5)!
   			 "fileExtension": "png", // (6)!
   			 "fileName": "example.png", // (7)!
   		 }
   	 }
    },
    ...
]
```

1. (required) n8n stores the actual data within a nested `json` key. This property is required, but can be set to anything from an empty object (like `{}`) to arrays and deeply nested data. The code node automatically wraps the data in a `json` object and parent array (`[]`) if it's missing.
2. (optional) Binary data of item. Most items in n8n don't contain binary data.
3. (required) Arbitrary key name for the binary data.
4. (required) Base64-encoded binary data.
5. (optional) Should set if possible.
6. (optional) Should set if possible.
7. (optional) Should set if possible.

You can learn more about the expected format on the [n8n data structure](/data/data-structure.md) page.

## Configure the Code node

Now let's see how to accomplish Nathan's task using the Code node.

In your workflow, add a **Code node** connected to the `false` branch of the **If node**. 

With the Code node window open, configure these parameters:

- **Mode**: Select **Run Once for All Items**.
- **Language**: Select **JavaScript**.

	/// note | Using Python in code nodes
	While we use JavaScript below, you can also use Python in the Code node. To learn more, refer to the [Code node](/code/code-node.md) documentation.
	///
	
- Copy the Code below and paste it into the **Code** box to replace the existing code:

	```javascript
	let items = $input.all();
	let totalBooked = items.length;
	let bookedSum = 0;

	for (let i=0; i < items.length; i++) {
	  bookedSum = bookedSum + items[i].json.orderPrice;
	}

	return [{ json: {totalBooked, bookedSum} }];
	```

Notice the format in which we return the results of the calculation:

```javascript
return [{ json: {totalBooked, bookedSum} }]
```

/// warning | Data structure error
If you don't use the correct data structure, you will get an error message: `Error: Always an Array of items has to be returned!`
///

Now select **Execute step** and you should see the following results:

<figure><img src="/_images/courses/level-one/chapter-five/l1-c5-5-5-code-node.png" alt="Code node output" style="width:100%"><figcaption align = "center"><i>Code node output</i></figcaption></figure>

## What's next?

**Nathan 🙋**: Wow, the Code node is powerful! This means that if I have some basic JavaScript skills I can power up my workflows.

**You 👩‍🔧**: Yes! You can progress from no-code to low-code!

**Nathan 🙋**: Now, how do I send the calculations for the booked orders to my team's Discord channel?

**You 👩‍🔧**: There's an n8n node for that. I'll set it up in the next step.


# courses/level-one/chapter-5/chapter-5.6.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: tutorial
---

<!-- vale from-microsoft.We = NO -->
<!-- vale from-microsoft.FirstPerson = NO -->
# 6. Notifying the Team

In this step of the workflow, you will learn how to send messages to a Discord channel using the [Discord node](/integrations/builtin/app-nodes/n8n-nodes-base.discord/index.md). After this step, your workflow should look like this:

[[ workflowDemo("file:////courses/level-one/chapter-5/chapter-5.6.json") ]]

Now that you have a calculated summary of the booked orders, you need to notify Nathan's team in their Discord channel. For this workflow, you will send messages to the [n8n server](https://discord.gg/G98WXzsjky) on Discord.

Before you begin the steps below, use the link above to connect to the n8n server on Discord. Be sure you can access the `#course-level-1` channel.

/// note | Communication app nodes
You can replace the Discord node with another communication app. For example, n8n also has nodes for [Slack](/integrations/builtin/app-nodes/n8n-nodes-base.slack.md) and [Mattermost](/integrations/builtin/app-nodes/n8n-nodes-base.mattermost.md).
///

In your workflow, add a Discord node connected to the Code node.

When you search for the Discord node, look for **Message Actions** and select **Send a message** to add the node.

In the Discord node window, configure these parameters:

- **Connection Type**: Select **Webhook**.
- **Credential for Discord Webhook**: Select **- Create New Credential -**.
    - Copy the **Webhook URL** from the email you received when you signed up for this course and paste it into the **Webhook URL** field of the credentials.
    - Select **Save** and then close the credentials dialog.
- **Operation**: Select **Send a Message**.
- **Message**:
    - Select the **Expression** tab on the right side of the Message field.
    - Copy the text below and paste it into the **Expression** window, or construct it manually using the **Expression Editor**.
		```
		This week we've {{$json["totalBooked"]}} booked orders with a total value of {{$json["bookedSum"]}}. My Unique ID: {{ $('HTTP Request').params["headerParameters"]["parameters"][0]["value"] }}
		```

Now select **Execute step** in the Discord node. If all works well, you should see this output in n8n:

<figure><img src="/_images/courses/level-one/chapter-five/l1-c5-5-6-discord-output.png" alt="Discord node output" style="width:100%"><figcaption align = "center"><i>Discord node output</i></figcaption></figure>

And your message should appear in the Discord channel #course-level-1:

<figure><img src="/_images/courses/level-one/chapter-two/discord-output.png" alt="Discord message" style="width:100%"><figcaption align = "center"><i>Discord message</i></figcaption></figure>

## What's next?

**Nathan 🙋**: Incredible, you've saved me hours of tedious work already! Now I can execute this workflow when I need it. I just need to remember to run it every Monday morning at 9 AM.

**You 👩‍🔧**: Don't worry about that, you can actually schedule the workflow to run on a specific day, time, or interval. I'll set this up in the next step.


# courses/level-one/chapter-5/chapter-5.7.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: tutorial
---

<!-- vale from-microsoft.We = NO -->
<!-- vale from-microsoft.FirstPerson = NO -->
# 7. Scheduling the Workflow

In this step of the workflow, you will learn how to schedule your workflow so that it runs automatically at a set time/interval using the Schedule Trigger node. After this step, your workflow should look like this:

[[ workflowDemo("file:////courses/level-one/finished.json") ]]

The workflow you've built so far executes only when you click on **Test Workflow**. But Nathan needs it to run automatically every Monday morning. You can do this with the [Schedule Trigger](/integrations/builtin/core-nodes/n8n-nodes-base.scheduletrigger/index.md), which allows you to schedule workflows to run periodically at fixed dates, times, or intervals.

To achieve this, we'll remove the Manual Trigger node we started with and replace it with a Schedule Trigger node instead.

## Remove the Manual Trigger node

First, let's remove the Manual Trigger node:

1. Select the Manual Trigger node connected to your HTTP Request node.
2. Select the trash can icon to delete.

This removes the Manual Trigger node and you'll see an "Add first step" option.

## Add the Schedule Trigger node

1. Open the nodes panel and search for **Schedule Trigger**.
2. Select it when it appears in the search results.

In the Schedule Trigger node window, configure these parameters:

- **Trigger Interval**: Select **Weeks**.
- **Weeks Between Triggers**: Enter `1`.
- **Trigger on weekdays**: Select **Monday** (and remove **Sunday** if added by default).
- **Trigger at Hour**: Select **9am**.
- **Trigger at Minute**: Enter `0`.

Your Schedule Trigger node should look like this:

<figure><img src="/_images/courses/level-one/chapter-five/l1-c5-5-7-schedule-trigger-node.png" alt="Schedule Trigger Node" style="width:100%"><figcaption align = "center"><i>Schedule Trigger Node</i></figcaption></figure>

/// warning | Keep in mind
To ensure accurate scheduling with the Schedule Trigger node, be sure to set the correct timezone for your [n8n instance](/manage-cloud/set-cloud-timezone.md) or the [workflow's settings](/workflows/settings.md). The Schedule Trigger node will use the workflow's timezone if it's set; it will fall back to the n8n instance's timezone if it's not.
///

## Connect the Schedule Trigger node

Return to the canvas and connect your Schedule Trigger node to the HTTP Request node by dragging the arrow from it to the HTTP Request node.

Your full workflow should look like this:

[[ workflowDemo("file:////courses/level-one/finished.json") ]]

## What's next?

**You 👩‍🔧**: That was it for the workflow! I've added and configured all necessary nodes. Now every time you click on **Execute workflow**, n8n will execute all the nodes: getting, filtering, calculating, and transferring the sales data.

**Nathan 🙋**: This is just what I needed! My workflow will run automatically every Monday morning, correct?

**You 👩‍🔧**: Not so fast. To do that, you need to activate your workflow. I'll do this in the next step and show you how to interpret the execution log.
<!-- vale from-microsoft.We = YES -->


# courses/level-one/chapter-5/chapter-5.8.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: tutorial
---

<!-- vale from-microsoft.We = NO -->
<!-- vale from-microsoft.FirstPerson = NO -->
# 8. Activating and Examining the Workflow

In this step of the workflow, you will learn how to activate your workflow and change the default workflow settings.

Activating a workflow means that it will run automatically every time a trigger node receives input or meets a condition. By default, all newly created workflows start deactivated.

To activate your workflow, set the **Inactive** toggle in the top navigation of the Editor UI to be **Activated**. Nathan's workflow will now be executed automatically every Monday at 9 AM:

<figure><img src="/_images/courses/level-one/chapter-five/l1-c5-5-8-activated-workflow.png" alt="Activated workflow" style="width:100%"><figcaption align = "center"><i>Activated workflow</i></figcaption></figure>

## Workflow Executions

An execution represents a completed run of a workflow, from the first to the last node. n8n logs workflow executions, allowing you to see if the workflow succeeded or not. The execution log is useful for debugging your workflow and seeing at what stage it runs into issues.

To view the executions for a specific workflow, you can switch to the **Executions** tab when the workflow is open on the canvas. Use the **Editor** tab to swap back to the node editor.

To see the execution log for the entire n8n instance, in your Editor UI, select **Overview** and then select the **Executions** tab in the main panel.

<figure><img src="/_images/courses/level-one/chapter-five/l1-c5-5-8-execution-list.png" alt="Execution List" style="width:100%"><figcaption align = "center"><i>Execution List</i></figcaption></figure>

The **Executions** window displays a table with the following information:

- **Name**: The name of the workflow
- **Started At**: The date and time when the workflow started
- **Status**: The status of the workflow (Waiting, Running, Succeeded, Cancelled, or Failed) and the amount of time it took the workflow to execute
- **Execution ID**: The ID of this workflow execution

/// note | Workflow execution status
You can filter the displayed **Executions** by workflow and by status (**Any Status**, **Failed**, **Cancelled**, **Running**, **Success**, or **Waiting**).
The information displayed here depends on which executions you configure to save in the [**Workflow Settings**](/workflows/settings.md).
///


## Workflow Settings

You can customize your workflows and executions, or overwrite some global default settings in [**Workflow Settings**](/workflows/settings.md).

Access these settings by selecting the three dots in the upper right corner of the Editor UI when the workflow is open on the canvas, then select **Settings**.

<figure><img src="/_images/courses/level-one/chapter-five/l1-c5-5-8-workflow-settings.png" alt="Workflow Settings" style="width:100%"><figcaption align = "center"><i>Workflow Settings</i></figcaption></figure>

In the **Workflow Settings** window you can configure the following settings:

- **Execution Order**: Choose the execution logic for multi-branch workflows. You should leave this set to `v1` if you don't have workflows that rely on the legacy execution ordering.
- [**Error Workflow**](/flow-logic/error-handling.md): A workflow to run if the execution of the current workflow fails.
- **This workflow can be called by**: Workflows allowed to call this workflow using the [Execute Sub-workflow node](/integrations/builtin/core-nodes/n8n-nodes-base.executeworkflow.md).
- **Timezone**: The timezone to use in the current workflow. If not set, the global timezone. In particular, this setting is important for the [Schedule Trigger node](/integrations/builtin/core-nodes/n8n-nodes-base.scheduletrigger/index.md), as you want to make sure that the workflow gets executed at the right time.
- **Save failed production executions**: If n8n should save the Execution data of the workflow when it fails. Default is to save.
- **Save successful production executions**: If n8n should save the Execution data of the workflow when it succeeds. Default is to save.
- **Save manual executions**: If n8n should save executions started from the Editor UI. Default is to save.
- **Save execution progress**: If n8n should save the execution data of each node. If set to Save, you can resume the workflow from where it stopped in case of an error, though keep in mind that this might make the execution slower. Default is to not save.
- **Timeout Workflow**: Whether to cancel a workflow execution after a specific period of time. Default is to not timeout.


## What's next?

**You 👩‍🔧**: That was it! Now you have a 7-node workflow that will run automatically every Monday morning. You don't have to worry about remembering to wrangle the data. Instead, you can start your week with more meaningful or exciting work.

**Nathan 🙋**: This workflow is incredibly helpful, thank you! Now, what's next for you?

**You 👩‍🔧**: I'd like to build more workflows, share them with others, and use some workflows built by other people.


# courses/level-one/chapter-6.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: tutorial
---

<!-- vale from-microsoft.We = NO -->
<!-- vale from-microsoft.FirstPerson = NO -->
# Exporting and importing workflows

In this chapter, you will learn how to export and import workflows.

## Exporting and importing workflows

You can save n8n workflows locally as JSON files. This is useful if you want to share your workflow with someone else or import a workflow from someone else.

--8<-- "_snippets/workflows/sharing-credentials.md"

<figure><img src="/_images/courses/level-one/chapter-six/l1-c6-import-export-menu.png" alt="Import/Export menu" style="width:100%"><figcaption align = "center"><i>Import & Export workflows menu</i></figcaption></figure>

You can export and import workflows in three ways:

* From the **Editor UI** menu:
    * Export: From the top navigation bar, select the three dots in the upper right, then select **Download**. This will download your current workflow as a JSON file on your computer.
    * Import: From the top navigation bar, select the three dots in the upper right, then select **Import from URL** (to import a published workflow) or **Import from File** (to import a workflow as a JSON file).
* From the **Editor UI** canvas:
	* Export: Select all the nodes on the canvas and use ++ctrl+c++ to copy the workflow JSON. You can paste this into a file or share it directly with other people.
	* Import: You can paste a copied workflow JSON directly into the canvas with ++ctrl+v++.
* From the command line:
    * Export: See the [full list of commands ](/hosting/cli-commands.md) for exporting workflows or credentials.
    * Import: See the [full list of commands ](/hosting/cli-commands.md#import-workflows-and-credentials) for importing workflows or credentials.


# courses/level-one/chapter-7.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: tutorial
---

<!-- vale from-microsoft.We = NO -->
<!-- vale from-microsoft.FirstPerson = NO -->
# Test your knowledge

Congratulations, you finished the n8n Course Level 1!

You've learned a lot about workflow automation and built your first business workflow. Why not showcase your skills?

You can test your knowledge by taking a **quiz**, which consists of questions about the theoretical concepts and workflows covered in this course.

- You need to have at least 80% correct answers in each part to pass the quiz.
- You can take the quiz as many times as you want.
- There's no time limit on answering the quiz questions.

<br/>
[Take the quiz!](https://n8n-community.typeform.com/to/JMoBXeGA){ .md-button }


## What's next?

* Create new workflows for your work or personal use and share them with us. Don't have any ideas? Find inspiration on our [blog](https://n8n.io/blog/), [YouTube channel](https://www.youtube.com/c/n8n-io), [community forum](https://community.n8n.io), and [Discord server](https://discord.gg/vWwMVThRta).
* Take the n8n [Course Level 2](/courses/level-two/index.md).
<!-- vale from-microsoft.We = YES -->


# courses/level-one/index.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: overview
---

<!-- vale from-microsoft.We = NO -->
<!-- vale from-microsoft.FirstPerson = NO -->
# Level one: Introduction

Welcome to the **n8n Course Level 1**!

## Is this course right for me?

This course introduces you to the fundamental concepts within n8n and develops your low-code automation expertise.

This course is for you if you:

- Are starting to use n8n for the first time.
- Are looking for some extra help creating your first workflow.
- Want to automate processes in your personal or working life.

This course introduces n8n concepts and demonstrates practical workflow building without assuming any prior familiarity with n8n. If you'd like to get a feel for the basics without as much explanation, consult our [quickstart guide](/try-it-out/tutorial-first-workflow.md).

## What will I learn in this course?

We believe in learning by doing. You can expect some theoretical information about the basic concepts and components of n8n, followed by practice of building workflows step by step.

By the end of this course you will know:

- How to set up n8n and navigate the Editor UI.
- How n8n structures data.
- How to configure different node parameters and add credentials.
- When and how to use conditional logic in workflows.
- How to schedule and control workflows.
- How to import, download, and share workflows with others.

You will build two workflows:

- A two-node workflow to get articles from Hacker News
- A seven-node workflow to help your client get records from a data warehouse, filter them, make calculations, and notify team members about the results

## What do I need to get started?

1. **n8n set up**: You can use [n8n Cloud](/manage-cloud/overview.md) (or the [self-hosted version](/hosting/installation/docker.md) if you have experience hosting services).
2. **A course user ID**: [Sign up here](https://n8n-community.typeform.com/to/PDEMrevI) to get your unique ID and other credentials you will need in the course.
3. Basic knowledge of JavaScript and [APIs](https://blog.n8n.io/what-are-apis-how-to-use-them-with-no-code/) would be helpful, but isn't necessary.
4. An [account on the n8n community forum](https://community.n8n.io/) if you wish to receive a profile badge and avatar upon successful completion.

## How long does the course take?

Completing the course should take around **two hours**. You don't have to complete it in one go; feel free to take breaks and resume whenever you are ready.

## How do I complete the course?

There are two milestones in this course that test your knowledge of what you have learned in the lessons:

- [x] Building the [main workflow](/courses/level-one/chapter-5/chapter-5.1.md)
- [x] Passing the [quiz](https://n8n-community.typeform.com/to/JMoBXeGA) at the end of the course

/// note | Check your progress
You can always **check your progress** throughout the course by entering your unique ID [here](https://internal.users.n8n.cloud/webhook/course-level-1/verify).
///

If you complete the milestones above, you will get [**a badge and an avatar**](https://community.n8n.io/badges/104/completed-n8n-course-level-1) in your forum profile. You can then share your profile and course verification ID to showcase your n8n skills to others.

[Let's get started!](/courses/level-one/chapter-1.md){ .md-button }


# courses/level-two/chapter-1.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: tutorial
---

# Understanding the data structure

In this chapter, you will learn about the data structure of n8n and how to use the [Code node](/integrations/builtin/core-nodes/n8n-nodes-base.code/index.md){:target="_blank"} to transform data and simulate node outputs.


## Data structure of n8n

In a basic sense, n8n nodes function as an Extract, Transform, Load (ETL) tool. The nodes allow you to access (extract) data from multiple disparate sources, modify (transform) that data in a particular way, and pass (load) it along to where it needs to be.

The data that moves along from node to node in your workflow must be in a format (structure) that can be recognized and interpreted by each node. In n8n, this required structure is an array of objects.

/// note | About array of objects
An array is a list of values. The array can be empty or contain several elements. Each element is stored at a position (index) in the list, starting at 0, and can be referenced by the index number. For example, in the array `["Leonardo", "Michelangelo", "Donatello", "Raphael"];` the element `Donatello` is stored at index 2.

An object stores key-value pairs, instead of values at numbered indexes as in arrays. The order of the pairs isn't important, as the values can be accessed by referencing the key name. For example, the object below contains two properties (`name` and `color`):

```json
{
	name: 'Michelangelo',
	color: 'blue',
}
```

An array of objects is an array that contains one or more objects. For example, the array `turtles` below contains four objects:

```javascript
var turtles = [
	{
		name: 'Michelangelo',
		color: 'orange',
	},
	{
		name: 'Donatello',
		color: 'purple',
	},
	{
		name: 'Raphael',
		color: 'red',
	},
	{
		name: 'Leonardo',
		color: 'blue',
	}
];
```

You can access the properties of an object using dot notation with the syntax `object.property`. For example, `turtles[1].color` gets the color of the second turtle.
///


Data sent from one node to another is sent as an array of JSON objects. The elements in this collection are called items.

<figure><img src="/_images/courses/level-two/chapter-one/explanation_items.png" alt="" style="width:100%"><figcaption align = "center"><i>Items</i></figcaption></figure>

An n8n node performs its action on each item of incoming data.

<figure><img src="/_images/flow-logic/looping/customer_datastore_node.png"><figcaption align = "center"><i>Items in the Customer Datastore node</i></figcaption></figure>


## Creating data sets with the Code node

Now that you are familiar with the n8n data structure, you can use it to create your own data sets or simulate node outputs. To do this, use the [Code node](/integrations/builtin/core-nodes/n8n-nodes-base.code/index.md){:target="_blank"} to write JavaScript code defining your array of objects with the following structure:

```javascript
return [
	{
		json: {
			apple: 'beets',
		}
	}
];
```

For example, the array of objects representing the Ninja turtles would look like this in the Code node:

<figure><img src="/_images/courses/level-two/chapter-one/exercise_function_notnested.png" alt="" style="width:100%"><figcaption align = "center"><i>Array of objects in the Code node</i></figcaption></figure>

/// warning | JSON objects
Notice that this array of objects contains an extra key: `json`. n8n expects you to wrap each object in an array in another object, with the key `json`.

<figure><img src="/_images/courses/level-two/chapter-one/explanation_datastructure.png" alt="" style="width:100%"><figcaption align = "center"><i>Illustration of data structure in n8n</i></figcaption></figure>

It's good practice to pass the data in the right structure used by n8n. But don't worry if you forget to add the `json` key to an item, n8n (version 0.166.0 and above) adds it automatically.
///

You can also have nested pairs, for example if you want to define a primary and a secondary color. In this case, you need to further wrap the key-value pairs in curly braces `{}`.

/// note | n8n data structure video
[This talk](https://www.youtube.com/watch?v=mQHT3Unn4tY) offers a more detailed explanation of data structure in n8n.

<iframe width="560" height="315" src="https://www.youtube.com/embed/mQHT3Unn4tY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
///


### Exercise

In a Code node, create an array of objects named `myContacts` that contains the properties `name` and `email`, and the `email` property is further split into `personal` and `work`.

??? note "Show me the solution"

	In the **Code node**, in the JavaScript Code field you have to write the following code:

	```javascript
	var myContacts = [
		{
			json: {
				name: 'Alice',
				email: {
					personal: 'alice@home.com',
					work: 'alice@wonderland.org'
				},
			}
		},
		{
			json: {
				name: 'Bob',
				email: {
					personal: 'bob@mail.com',
					work: 'contact@thebuilder.com'
					},
			}
		},
	];

	return myContacts;
	```

	When you execute the **Code node**, the result should look like this:

	<figure><img src="/_images/courses/level-two/chapter-one/exercise_function.png" alt="" style="width:100%"><figcaption align = "center"><i>Result of Code node</i></figcaption></figure>



## Referencing node data with the Code node

Just like you can use [expressions](/code/expressions.md) to reference data from other nodes, you can also use some [methods and variables](/code/builtin/overview.md) in the **Code node**.

Please make sure you read these pages before continuing to the next exercise.

### Exercise

Let's build on the previous exercise, in which you used the Code node to create a data set of two contacts with their names and emails. Now, connect a second Code node to the first one. In the new node, write code to create a new column named `workEmail` that references the work email of the first contact.

??? note "Show me the solution"
	In the **Code node**, in the JavaScript Code field you have to write the following code:

	```javascript
	let items = $input.all();
	items[0].json.workEmail = items[0].json.email['work'];
	return items;
	```

	When you execute the **Code node**, the result should look like this:

	<figure><img src="/_images/courses/level-two/chapter-one/exercise_function_reference.png" alt="" style="width:100%"><figcaption align = "center"><i>Code node reference</i></figcaption></figure>


## Transforming data

The incoming data from some nodes may have a different data structure than the one used in n8n. In this case, you need to [transform the data](/data/transforming-data.md){:target="_blank" .external}, so that each item can be processed individually.

The two most common operations for data transformation are:

- Creating multiple items from one item
- Creating a single item from multiple items

There are several ways to transform data for the purposes mentioned above:

- Use n8n's [data transformation nodes](/data/index.md#data-transformation-nodes). Use these nodes to modify the structure of incoming data that contain lists (arrays) without needing to use JavaScript code in the **Code node**:
	- Use the [**Split Out node**](/integrations/builtin/core-nodes/n8n-nodes-base.splitout.md) to separate a single data item containing a list into multiple items.
	- Use the [**Aggregate node**](/integrations/builtin/core-nodes/n8n-nodes-base.aggregate.md) to take separate items, or portions of them, and group them together into individual items.
- Use the **Code node** to write JavaScript functions to modify the data structure of incoming data using the **Run Once for All Items** mode:
    - To create multiple items from a single item, you can use JavaScript code like this. This example assumes that the item has a key named `data` set to an array of items in the form of: `[{ "data": [{<item_1>}, {<item_2>}, ...] }]`:
	```javascript
	return $input.first().json.data.map(item => {
        return {
            json: item
        }
    });
	```
	- To create a single item from multiple items, you can use this JavaScript code:
	```javascript
    return [
    	{
        	json: {
        		data_object: $input.all().map(item => item.json)
        	}
        }
      ];
	```

These JavaScript examples assume your entire input is what you want to transform. As in the exercise above, you can also execute either operation on a specific field by identifying that in the items list, for example, if our workEmail example had multiple emails in a single field, we could run some code like this:
```javascript
let items = $input.all();
return items[0].json.workEmail.map(item => {
	return {
		json: item
	}
});
```

### Exercise

1. Use the **HTTP Request node** to make a GET request to the PokéAPI `https://pokeapi.co/api/v2/pokemon`. (This API requires no authentication).
2. Transform the data in the `results` field with the **Split Out node**.
3. Transform the data in the `results` field with the **Code node**.


??? note "Show me the solution"

	1. To get the pokemon from the PokéAPI, execute the **HTTP Request node** with the following parameters:
		- **Authentication**: None
		- **Request Method**: GET
		- **URL**: https://pokeapi.co/api/v2/pokemon
	2. To transform the data with the **Split Out node**, connect this node to the **HTTP Request node** and set the following parameters:
		- **Field To Split Out**: results
		- **Include**: No Other Fields
	3. To transform the data with the **Code node**, connect this node to the **HTTP Request node** and write the following code in the JavaScript Code field:
		```javascript
		let items = $input.all();
		return items[0].json.results.map(item => {
			return {
				json: item
			}
		});
		```


# courses/level-two/chapter-2.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: tutorial
---

# Processing different data types

In this chapter, you will learn how to process different types of data using [n8n core nodes](/workflows/components/nodes.md).


## HTML and XML data

You're most likely familiar with HTML and XML.

/// note | HTML vs. XML
HTML is a markup language used to describe the structure and semantics of a web page. XML looks similar to HTML, but the tag names are different, as they describe the kind of data they hold.
///
If you need to process HTML or XML data in your n8n workflows, use the [**HTML node**](/integrations/builtin/core-nodes/n8n-nodes-base.html.md) or the [**XML node**](/integrations/builtin/core-nodes/n8n-nodes-base.xml.md).

Use the **HTML node** to extract HTML content of a webpage by referencing CSS selectors. This is useful if you want to collect structured information from a website (web-scraping).

### HTML Exercise

Let's get the title of the latest n8n blog post:

1. Use the **HTTP Request node** to make a GET request to the URL `https://blog.n8n.io/` (this endpoint requires no authentication).
2. Connect an **HTML node** and configure it to extract the title of the first blog post on the page.
	- Hint: If you're not familiar with CSS selectors or reading HTML, the CSS selector `.post .item-title  a` should help!

??? note "Show me the solution"

	1. Configure the HTTP Request node with the following parameters:
		- **Authentication**: None
		- **Request Method**: GET
		- **URL**: https://blog.n8n.io/
	The result should look like this:

	<figure><img src="/_images/courses/level-two/chapter-two/exercise_html_httprequestnode.png" alt="Result of HTTP Request node" style="width:100%"><figcaption align = "center"><i>Result of HTTP Request node</i></figcaption></figure>

	2. Connect an **HTML node** to the **HTTP Request node** and configure the former's parameters:
		- **Operation**: Extract HTML Content
		- **Source Data**: JSON
		- **JSON Property**: data
		- **Extraction Values**:
			- **Key**: title
			- **CSS Selector**: `.post .item-title  a`
			- **Return Value**: HTML

	You can add more values to extract more data.

	The result should look like this:

	<figure><img src="/_images/courses/level-two/chapter-two/exercise_html_htmlextractnode.png" alt="Result of HTML Extract node" style="width:100%"><figcaption align = "center"><i>Result of HTML Extract node</i></figcaption></figure>


Use the **XML node** to convert XML to JSON and JSON to XML. This operation is useful if you work with different web services that use either XML or JSON and need to get and submit data between them in the two formats.

### XML Exercise

In the [final exercise of Chapter 1](/courses/level-two/chapter-1.md#exercise_2), you used an **HTTP Request node** to make a request to the PokéAPI. In this exercise, we'll return to that same API but we'll convert the output to XML:

1. Add an **HTTP Request node** that makes the same request to the PokéAPI at `https://pokeapi.co/api/v2/pokemon`.
2. Use the XML node to convert the JSON output to XML.

??? note "Show me the solution"

	1. To get the pokemon from the PokéAPI, execute the **HTTP Request node** with the following parameters:
		- **Authentication**: None
		- **Request Method**: GET
		- **URL**: https://pokeapi.co/api/v2/pokemon
	2. Connect an **XML node** to it with the following parameters:
		- **Mode**: JSON to XML
		- **Property name**: data

	The result should look like this:

	<figure><img src="/_images/courses/level-two/chapter-two/exercise_html_xmlnode_table.png" alt="Table view of XML Node (JSON to XML)" style="width:100%"><figcaption align = "center"><i>XML node (JSON to XML) – Table View</i></figcaption></figure>

	To transform data the other way around, select the mode **XML to JSON**.


## Date, time, and interval data

Date and time data types include `DATE`, `TIME`, `DATETIME`, `TIMESTAMP`, and `YEAR`. The dates and times can be passed in different formats, for example:
<!-- vale off -->
- `DATE`: March 29 2022, 29-03-2022, 2022/03/29
- `TIME`: 08:30:00, 8:30, 20:30
- `DATETIME`: 2022/03/29 08:30:00
- `TIMESTAMP`: 1616108400 (Unix timestamp), 1616108400000 (Unix ms timestamp)
- `YEAR`: 2022, 22
<!-- vale on -->
There are a few ways you can work with dates and times:

- Use the [**Date & Time node**](/integrations/builtin/core-nodes/n8n-nodes-base.datetime.md) to convert date and time data to different formats and calculate dates.
- Use [**Schedule Trigger node**](/integrations/builtin/core-nodes/n8n-nodes-base.scheduletrigger/index.md) to schedule workflows to run at a specific time, interval, or duration.

Sometimes, you might need to pause the workflow execution. This might be necessary if you know that a service doesn't process the data instantly or it's slow to return all the results. In these cases, you don't want n8n to pass incomplete data to the next node.

If you run into situations like this, use the [**Wait node**](/integrations/builtin/core-nodes/n8n-nodes-base.wait.md) after the node that you want to delay. The **Wait node** pauses the workflow execution and will resume execution:

- At a specific time.
- After a specified time interval.
- On a webhook call.



### Date Exercise

Build a workflow that adds five days to an input date from the Customer Datastore node that you used before. Then, if the calculated date occurred after 1959, the workflow waits 1 minute before [setting](/integrations/builtin/core-nodes/n8n-nodes-base.set.md) the calculated date as a value. The workflow should be triggered every 30 minutes.


To begin:
<!-- To do: need to figure out what the actual desired output is here since Date & Time options have changed and I'm unclear what the Set node should be doing-->
1. Add the **Customer Datastore (n8n training) node** with the **Get All People** action selected. Return All.
2. Add the **Date & Time node** to Round Up the created Date from the datastore to End of Month. Output this to field new-date. Include all input fields.
3. Add the **If node** to check if that new rounded date is after `1960-01-01 00:00:00`.
4. Add the **Wait node** to the True output of that node and set it to wait for one minute.
5. Add the **Edit Fields (Set) node** to set a new field called outputValue to a String containing new-date. Include all input fields.
6. Add the **Schedule Trigger node** at the beginning of the workflow to trigger it every 30 minutes. (You can keep the [Manual Trigger node](/integrations/builtin/core-nodes/n8n-nodes-base.manualworkflowtrigger.md) for testing!)

??? note "Show me the solution"

	1. Add the **Customer Datastore (n8n training) node** with the **Get All People** action selected.
		- Select the option to **Return All**.
	2. Add a **Date & Time node** connected to the Customer Datastore node. Select the option to **Round a Date**.
		- Add the `created` date as the **Date** to round.
		- Select `Round Up` as the **Mode** and `End of Month` as the **To**.
		- Set the **Output Field Name** as `new-date`.
		- In **Options**, select **Add Option** and use the control to **Include Input Fields**
	3. Add an **If node** connected to the **Date & Time node**.
		- Add the new-date field as the first part of the condition.
		- Set the comparison to **Date &Time > is after**
		- Add `1960-01-01 00:00:00` as the second part of the expression. (This should produce 3 items in the True Branch and 2 items in the False Branch)
	4. Add a **Wait node** to the True output of the **If node**.
		- Set **Resume** to `After Time interval`.
		- Set **Wait Amount** to `1.00`.
		- Set **Wait Unit** to `Minutes`.
	5. Add an **Edit Fields (Set) node** to the **Wait node**.
		- Use either JSON or Manual Mapping **Mode**.
		- Set a new field called `outputValue` to be the value of the new-date field.
		- Select the option to **Include Other Input Fields** and include **All** fields.
	6. Add a **Schedule Trigger node** at the beginning of the workflow.
		- Set the **Trigger Interval** to use `Minutes`.
		- Set the **Minutes Between Triggers** to 30.
		- To test your schedule, be sure to activate the workflow.
		- Be sure to connect this node to the **Customer Datastore (n8n training) node** you began with!

	The workflow should look like this:

	<figure><img src="/_images/courses/level-two/chapter-two/exercise_datetime.png" alt="Workflow for transforming dates" style="width:100%"><figcaption align = "center"><i>Workflow for transforming dates</i></figcaption></figure>

	To check the configuration of each node, you can copy the JSON code of this workflow and either paste it into the Editor UI or save it as a file and import from file into a new workflow. See [Export and import workflows](/workflows/export-import.md) for more information.

	```json
	{
	"name": "Course 2, Ch 2, Date exercise",
	"nodes": [
		{
		"parameters": {},
		"id": "6bf64d5c-4b00-43cf-8439-3cbf5e5f203b",
		"name": "When clicking \"Execute workflow\"",
		"type": "n8n-nodes-base.manualTrigger",
		"typeVersion": 1,
		"position": [
			620,
			280
		]
		},
		{
		"parameters": {
			"operation": "getAllPeople",
			"returnAll": true
		},
		"id": "a08a8157-99ee-4d50-8fe4-b6d7e16e858e",
		"name": "Customer Datastore (n8n training)",
		"type": "n8n-nodes-base.n8nTrainingCustomerDatastore",
		"typeVersion": 1,
		"position": [
			840,
			360
		]
		},
		{
		"parameters": {
			"operation": "roundDate",
			"date": "={{ $json.created }}",
			"mode": "roundUp",
			"outputFieldName": "new-date",
			"options": {
			"includeInputFields": true
			}
		},
		"id": "f66a4356-2584-44b6-a4e9-1e3b5de53e71",
		"name": "Date & Time",
		"type": "n8n-nodes-base.dateTime",
		"typeVersion": 2,
		"position": [
			1080,
			360
		]
		},
		{
		"parameters": {
			"conditions": {
			"options": {
				"caseSensitive": true,
				"leftValue": "",
				"typeValidation": "strict"
			},
			"conditions": [
				{
				"id": "7c82823a-e603-4166-8866-493f643ba354",
				"leftValue": "={{ $json['new-date'] }}",
				"rightValue": "1960-01-01T00:00:00",
				"operator": {
					"type": "dateTime",
					"operation": "after"
				}
				}
			],
			"combinator": "and"
			},
			"options": {}
		},
		"id": "cea39877-6183-4ea0-9400-e80523636912",
		"name": "If",
		"type": "n8n-nodes-base.if",
		"typeVersion": 2,
		"position": [
			1280,
			360
		]
		},
		{
		"parameters": {
			"amount": 1,
			"unit": "minutes"
		},
		"id": "5aa860b7-c73c-4df0-ad63-215850166f13",
		"name": "Wait",
		"type": "n8n-nodes-base.wait",
		"typeVersion": 1.1,
		"position": [
			1480,
			260
		],
		"webhookId": "be78732e-787d-463e-9210-2c7e8239761e"
		},
		{
		"parameters": {
			"assignments": {
			"assignments": [
				{
				"id": "e058832a-2461-4c6d-b584-043ecc036427",
				"name": "outputValue",
				"value": "={{ $json['new-date'] }}",
				"type": "string"
				}
			]
			},
			"includeOtherFields": true,
			"options": {}
		},
		"id": "be034e9e-3cf1-4264-9d15-b6760ce28f91",
		"name": "Edit Fields",
		"type": "n8n-nodes-base.set",
		"typeVersion": 3.3,
		"position": [
			1700,
			260
		]
		},
		{
		"parameters": {
			"rule": {
			"interval": [
				{
				"field": "minutes",
				"minutesInterval": 30
				}
			]
			}
		},
		"id": "6e8e4308-d0e0-4d0d-bc29-5131b57cf061",
		"name": "Schedule Trigger",
		"type": "n8n-nodes-base.scheduleTrigger",
		"typeVersion": 1.1,
		"position": [
			620,
			480
		]
		}
	],
	"pinData": {},
	"connections": {
		"When clicking \"Execute workflow\"": {
		"main": [
			[
			{
				"node": "Customer Datastore (n8n training)",
				"type": "main",
				"index": 0
			}
			]
		]
		},
		"Customer Datastore (n8n training)": {
		"main": [
			[
			{
				"node": "Date & Time",
				"type": "main",
				"index": 0
			}
			]
		]
		},
		"Date & Time": {
		"main": [
			[
			{
				"node": "If",
				"type": "main",
				"index": 0
			}
			]
		]
		},
		"If": {
		"main": [
			[
			{
				"node": "Wait",
				"type": "main",
				"index": 0
			}
			]
		]
		},
		"Wait": {
		"main": [
			[
			{
				"node": "Edit Fields",
				"type": "main",
				"index": 0
			}
			]
		]
		},
		"Schedule Trigger": {
		"main": [
			[
			{
				"node": "Customer Datastore (n8n training)",
				"type": "main",
				"index": 0
			}
			]
		]
		}
	}
	}
	```


## Binary data

Up to now, you have mainly worked with text data. But what if you want to process data that's not text, like images or PDF files? These types of files are represented in the binary numeral system, so they're considered binary data. In this form, binary data doesn't offer you useful information, so you'll need to convert it into a readable form.

In n8n, you can process binary data with the following nodes:

- [HTTP Request](/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/index.md) to request and send files from/to web resources and APIs.
- [Read/Write Files from Disk](/integrations/builtin/core-nodes/n8n-nodes-base.readwritefile.md) to read and write files from/to the machine where n8n is running.
- [Convert to File](/integrations/builtin/core-nodes/n8n-nodes-base.converttofile.md) to take input data and output it as a file.
- [Extract From File](/integrations/builtin/core-nodes/n8n-nodes-base.extractfromfile.md) to get data from a binary format and convert it to JSON.

/// note | Reading and writing files is only available on self-hosted n8n
Reading and writing files to disk isn't available on n8n Cloud. You'll read and write to the machine where you installed n8n. If you run n8n in Docker, your command runs in the n8n container and not the Docker host. The Read/Write Files From Disk node looks for files relative to the n8n install path. n8n recommends using absolute file paths to prevent any errors.
///

To read or write a binary file, you need to write the path (location) of the file in the node's `File(s) Selector` parameter (for the Read operation) or in the node's `File Path and Name` parameter (for the Write operation).

/// warning | Naming the right path
The file path looks slightly different depending on how you are running n8n:

- npm: `~/my_file.json`
- n8n cloud / Docker: `/tmp/my_file.json`
///



### Binary Exercise 1

For our first binary exercise, let's convert a PDF file to JSON:

1. Make an HTTP request to get this PDF file: `https://media.kaspersky.com/pdf/Kaspersky_Lab_Whitepaper_Anti_blocker.pdf.`
2. Use the **Extract From File node** to convert the file from binary to JSON.

??? note "Show me the solution"

	In the **HTTP Request node**, you should see the PDF file, like this:

	<figure><img src="/_images/courses/level-two/chapter-two/exercise_binarydata_httprequest_file.png" alt="HTTP Request node to get PDF" style="width:100%"><figcaption align = "center"><i>HTTP Request node to get PDF</i></figcaption></figure>

	When you convert the PDF from binary to JSON using the **Extract From File node**, the result should look like this:

	<figure><img src="/_images/courses/level-two/chapter-two/exercise_binarydata_movedata_btoj.png" alt="Extract From File node" style="width:100%"><figcaption align = "center"><i>Extract From File node</i></figcaption></figure>

	To check the configuration of the nodes, you can copy the JSON workflow code below and paste it into your Editor UI:

	```json
	{
		"name": "Binary to JSON",
		"nodes": [
			{
			"parameters": {},
			"id": "78639a25-b69a-4b9c-84e0-69e045bed1a3",
			"name": "When clicking \"Execute Workflow\"",
			"type": "n8n-nodes-base.manualTrigger",
			"typeVersion": 1,
			"position": [
				480,
				520
			]
			},
			{
			"parameters": {
				"url": "https://media.kaspersky.com/pdf/Kaspersky_Lab_Whitepaper_Anti_blocker.pdf",
				"options": {}
			},
			"id": "a11310df-1287-4e9a-b993-baa6bd4265a6",
			"name": "HTTP Request",
			"type": "n8n-nodes-base.httpRequest",
			"typeVersion": 4.1,
			"position": [
				700,
				520
			]
			},
			{
			"parameters": {
				"operation": "pdf",
				"options": {}
			},
			"id": "88697b6b-fb02-4c3d-a715-750d60413e9f",
			"name": "Extract From File",
			"type": "n8n-nodes-base.extractFromFile",
			"typeVersion": 1,
			"position": [
				920,
				520
			]
			}
		],
		"pinData": {},
		"connections": {
			"When clicking \"Execute Workflow\"": {
			"main": [
				[
				{
					"node": "HTTP Request",
					"type": "main",
					"index": 0
				}
				]
			]
			},
			"HTTP Request": {
			"main": [
				[
				{
					"node": "Extract From File",
					"type": "main",
					"index": 0
				}
				]
			]
			}
		}
	}
	```



### Binary Exercise 2

For our second binary exercise, let's convert some JSON data to binary:

1. Make an HTTP request to the Poetry DB API `https://poetrydb.org/random/1`.
2. Convert the returned data from JSON to binary using the **Convert to File node**.
3. Write the new binary file data to the machine where n8n is running using the **Read/Write Files From Disk node**.
4. To check that it worked out, use the **Read/Write Files From Disk node** to read the generated binary file.

??? note "Show me the solution"

	The workflow for this exercise looks like this:

	<figure><img src="/_images/courses/level-two/chapter-two/exercise_binarydata.png" alt="Workflow for moving JSON to binary data" style="width:100%"><figcaption align = "center"><i>Workflow for moving JSON to binary data</i></figcaption></figure>

	To check the configuration of the nodes, you can copy the JSON workflow code below and paste it into your Editor UI:

	```json
	{
		"name": "JSON to file and Read-Write",
		"nodes": [
			{
			"parameters": {},
			"id": "78639a25-b69a-4b9c-84e0-69e045bed1a3",
			"name": "When clicking \"Execute Workflow\"",
			"type": "n8n-nodes-base.manualTrigger",
			"typeVersion": 1,
			"position": [
				480,
				520
			]
			},
			{
			"parameters": {
				"url": "https://poetrydb.org/random/1",
				"options": {}
			},
			"id": "a11310df-1287-4e9a-b993-baa6bd4265a6",
			"name": "HTTP Request",
			"type": "n8n-nodes-base.httpRequest",
			"typeVersion": 4.1,
			"position": [
				680,
				520
			]
			},
			{
			"parameters": {
				"operation": "toJson",
				"options": {}
			},
			"id": "06be18f6-f193-48e2-a8d9-35f4779d8324",
			"name": "Convert to File",
			"type": "n8n-nodes-base.convertToFile",
			"typeVersion": 1,
			"position": [
				880,
				520
			]
			},
			{
			"parameters": {
				"operation": "write",
				"fileName": "/tmp/poetrydb.json",
				"options": {}
			},
			"id": "f2048e5d-fa8f-4708-b15a-d07de359f2e5",
			"name": "Read/Write Files from Disk",
			"type": "n8n-nodes-base.readWriteFile",
			"typeVersion": 1,
			"position": [
				1080,
				520
			]
			},
			{
			"parameters": {
				"fileSelector": "={{ $json.fileName }}",
				"options": {}
			},
			"id": "d630906c-09d4-49f4-ba14-416c0f4de1c8",
			"name": "Read/Write Files from Disk1",
			"type": "n8n-nodes-base.readWriteFile",
			"typeVersion": 1,
			"position": [
				1280,
				520
			]
			}
		],
		"pinData": {},
		"connections": {
			"When clicking \"Execute Workflow\"": {
			"main": [
				[
				{
					"node": "HTTP Request",
					"type": "main",
					"index": 0
				}
				]
			]
			},
			"HTTP Request": {
			"main": [
				[
				{
					"node": "Convert to File",
					"type": "main",
					"index": 0
				}
				]
			]
			},
			"Convert to File": {
			"main": [
				[
				{
					"node": "Read/Write Files from Disk",
					"type": "main",
					"index": 0
				}
				]
			]
			},
			"Read/Write Files from Disk": {
			"main": [
				[
				{
					"node": "Read/Write Files from Disk1",
					"type": "main",
					"index": 0
				}
				]
			]
			}
		}
	}
	```


# courses/level-two/chapter-3.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: tutorial
---

# Merging and splitting data

In this chapter, you will learn how to merge and split data, and in what cases it might be useful to perform these operations.


## Merging data

In some cases, you might need to merge (combine) and process data from different sources.

Merging data can involve:

- Creating one data set from multiple sources.
- Synchronizing data between multiple systems. This could include removing duplicate data or updating data in one system when it changes in another.

/// note | One-way vs. two-way sync
In a one-way sync, data is synchronized in one direction. One system serves as the single source of truth. When information changes in that main system, it automatically changes in the secondary system; but if information changes in the secondary system, the changes aren't reflected in the main system.

In a two-way sync, data is synchronized in both directions (between both systems). When information changes in either of the two systems, it automatically changes in the other one as well.

[This blog tutorial](https://blog.n8n.io/how-to-sync-data-between-two-systems/) explains how to sync data one-way and two-way between two CRMs.
///


In n8n, you can merge data from two different nodes using the [Merge node](/integrations/builtin/core-nodes/n8n-nodes-base.merge.md){:target="_blank"}, which provides several merging options:

- [Append](/integrations/builtin/core-nodes/n8n-nodes-base.merge.md#append){:target="_blank"}
- [Combine](/integrations/builtin/core-nodes/n8n-nodes-base.merge.md#combine){:target="_blank"}
	- [Merge by Fields](/integrations/builtin/core-nodes/n8n-nodes-base.merge.md#combine-by-matching-fields){:target="_blank"}: requires input fields to match on
	- [Merge by Position](/integrations/builtin/core-nodes/n8n-nodes-base.merge.md#combine-by-position){:target="_blank"}
	- [Combine all possible combinations](/integrations/builtin/core-nodes/n8n-nodes-base.merge.md#combine-by-all-possible-combinations){:target="_blank"}
- [Choose Branch](/integrations/builtin/core-nodes/n8n-nodes-base.merge.md#choose-branch){:target="_blank"}

Notice that Combine > Merge by Fields requires you enter input fields to match on. These fields should contain identical values between the data sources so n8n can properly match data together. In the **Merge node**, they're called `Input 1 Field` and `Input 2 Field`.

<figure><img src="/_images/courses/level-two/chapter-three/explanation_mergepropertyinput.png" alt="Property Input fields in the Merge node" style="width:100%"><figcaption align = "center"><i>Property Input fields in the Merge node</i></figcaption></figure>

/// warning | Property Input in dot notation
If you want to reference nested values in the **Merge node** parameters `Input 1 Field` and `Input 2 Field`, you need to enter the property key in dot-notation format (as text, not as an expression).
///

/// note
You can also find the **Merge node** under the alias Join. This might be more intuitive if you're familiar with SQL joins.
///

### Merge Exercise

Build a workflow that merges data from the Customer Datastore node and Code node.

1. Add a **Merge node** that takes `Input 1` from a **Customer Datastore node** and `Input 2` from a **Code node**.
2. In the **Customer Datastore node**, run the operation **Get All People**.
3. In the **Code node**, create an array of two objects with three properties: `name`, `language`, and `country`, where the property `country` has two sub-properties `code` and `name`.
	- Fill out the values of these properties with the information of two characters from the Customer Database.
	- For example, Jay Gatsby's language is English and country name is United States.
4. In the **Merge node**, try out different merge options.

??? note "Show me the solution"

	The workflow for this exercise looks like this:

	<figure><img src="/_images/courses/level-two/chapter-three/exercise_merge.png" alt="Workflow exercise for merging data" style="width:100%"><figcaption align = "center"><i>Workflow exercise for merging data</i></figcaption></figure>

	If you merge data with the option **Keep Matches** using the name as the input fields to match, the result should look like this (note this example only contains Jay Gatsby; yours might look different depending on which characters you selected):

	<figure><img src="/_images/courses/level-two/chapter-three/exercise_merge_kkm.png" alt="Output of Merge node with option to keep matches" style="width:100%"><figcaption align = "center"><i>Output of Merge node with option to keep matches</i></figcaption></figure>

	To check the configuration of the nodes, you can copy the JSON workflow code below and paste it into your Editor UI:

	```json
	{
	"meta": {
		"templateCredsSetupCompleted": true,
		"instanceId": "cb484ba7b742928a2048bf8829668bed5b5ad9787579adea888f05980292a4a7"
	},
	"nodes": [
		{
		"parameters": {
			"mode": "combine",
			"mergeByFields": {
			"values": [
				{
				"field1": "name",
				"field2": "name"
				}
			]
			},
			"options": {}
		},
		"id": "578365f3-26dd-4fa6-9858-f0a5fdfc413b",
		"name": "Merge",
		"type": "n8n-nodes-base.merge",
		"typeVersion": 2.1,
		"position": [
			720,
			580
		]
		},
		{
		"parameters": {},
		"id": "71aa5aad-afdf-4f8a-bca0-34450eee8acc",
		"name": "When clicking \"Execute workflow\"",
		"type": "n8n-nodes-base.manualTrigger",
		"typeVersion": 1,
		"position": [
			260,
			560
		]
		},
		{
		"parameters": {
			"operation": "getAllPeople"
		},
		"id": "497174fe-3cab-4160-8103-78b44efd038d",
		"name": "Customer Datastore (n8n training)",
		"type": "n8n-nodes-base.n8nTrainingCustomerDatastore",
		"typeVersion": 1,
		"position": [
			500,
			460
		]
		},
		{
		"parameters": {
			"jsCode": "return [\n  {\n    'name': 'Jay Gatsby',\n    'language': 'English',\n    'country': {\n      'code': 'US',\n      'name': 'United States'\n    }\n    \n  }\n  \n];"
		},
		"id": "387e8a1e-e796-4f05-8e75-7ce25c786c5f",
		"name": "Code",
		"type": "n8n-nodes-base.code",
		"typeVersion": 2,
		"position": [
			500,
			720
		]
		}
	],
	"connections": {
		"When clicking \"Execute workflow\"": {
		"main": [
			[
			{
				"node": "Customer Datastore (n8n training)",
				"type": "main",
				"index": 0
			},
			{
				"node": "Code",
				"type": "main",
				"index": 0
			}
			]
		]
		},
		"Customer Datastore (n8n training)": {
		"main": [
			[
			{
				"node": "Merge",
				"type": "main",
				"index": 0
			}
			]
		]
		},
		"Code": {
		"main": [
			[
			{
				"node": "Merge",
				"type": "main",
				"index": 1
			}
			]
		]
		}
	},
	"pinData": {}
	}
	```


## Looping

In some cases, you might need to perform the same operation on each element of an array or each data item (for example sending a message to every contact in your address book). In technical terms, you need to iterate through the data (with loops).

n8n generally handles this repetitive processing automatically, as the nodes run once for each item, so you don't need to build loops into your workflows.

However, there are some [exceptions of nodes and operations](/flow-logic/looping.md#node-exceptions){:target="_blank"} that will require you to build a loop into your workflow.

To [create a loop in an n8n workflow](/flow-logic/looping.md#using-loops-in-n8n){:target="_blank"}, you need to connect the output of one node to the input of a previous node, and add an **If node** to check when to stop the loop.

## Splitting data in batches

If you need to process large volumes of incoming data, execute the **Code node** multiple times, or avoid API rate limits, it's best to split the data into batches (groups) and process these batches.

For these processes, use the [**Loop Over Items node**](/integrations/builtin/core-nodes/n8n-nodes-base.splitinbatches.md){:target="_blank"}. This node splits input data into a specified batch size and, with each iteration, returns a predefined amount of data.

/// warning | Execution of Loop Over Items node
The **Loop Over Items node** stops executing after all the incoming items get divided into batches and passed on to the next node in the workflow, so it's not necessary to add an **If node** to stop the loop.
///

### Loop/Batch Exercise

Build a workflow that reads the RSS feed from Medium and dev.to. The workflow should consist of three nodes:

1. A **Code node** that returns the URLs of the RSS feeds of Medium (`https://medium.com/feed/n8n-io`) and dev.to (`https://dev.to/feed/n8n`).
2. A **Loop Over Items node** with `Batch Size: 1`, that takes in the inputs from the **Code node** and **RSS Read node** and iterates over the items.
3. An **RSS Read node** that gets the URL of the Medium RSS feed, passed as an expression: `{{ $json.url }}`.
	- The **RSS Read node** is one of the [exception nodes](/flow-logic/looping.md#node-exceptions){:target="_blank"} which processes only the first item it receives, so the **Loop Over Items node** is necessary for iterating over multiple items.

??? note "Show me the solution"

	1. Add a **Code Node**. You can format the code in several ways, one way is:
		- Set **Mode** to `Run Once for All Items`.
		- Set **Language** to `JavaScript`.
		- Copy the code below and paste it into the JavaScript Code editor:
			```javascript
			let urls = [
				{
					json: {
					url: 'https://medium.com/feed/n8n-io'
					}
				},
				{
				json: {
					url: 'https://dev.to/feed/n8n'
					} 
				}
			]
			return urls;
			```
	2. Add a **Loop Over Items node** connected to the **Code node**.
		- Set **Batch Size** to `1`.
	3. The **Loop Over Items node** automatically adds a node called "Replace Me". Replace that node with an **RSS Read node**.
		- Set the **URL** to use the url from the Code Node: `{{ $json.url }}`.
	
	The workflow for this exercise looks like this:

	<figure><img src="/_images/courses/level-two/chapter-three/exercise_splitinbatches.png" alt="Workflow for getting RSS feeds from two blogs" style="width:100%"><figcaption align = "center"><i>Workflow for getting RSS feeds from two blogs</i></figcaption></figure>

	To check the configuration of the nodes, you can copy the JSON workflow code below and paste it into your Editor UI:

	```json
	{
	"meta": {
		"templateCredsSetupCompleted": true,
		"instanceId": "cb484ba7b742928a2048bf8829668bed5b5ad9787579adea888f05980292a4a7"
	},
	"nodes": [
		{
		"parameters": {},
		"id": "ed8dc090-ae8c-4db6-a93b-0fa873015c25",
		"name": "When clicking \"Execute workflow\"",
		"type": "n8n-nodes-base.manualTrigger",
		"typeVersion": 1,
		"position": [
			460,
			460
		]
		},
		{
		"parameters": {
			"jsCode": "let urls = [\n  {\n    json: {\n      url: 'https://medium.com/feed/n8n-io'\n    }\n  },\n  {\n   json: {\n     url: 'https://dev.to/feed/n8n'\n   } \n  }\n]\n\nreturn urls;"
		},
		"id": "1df2a9bf-f970-4e04-b906-92dbbc9e8d3a",
		"name": "Code",
		"type": "n8n-nodes-base.code",
		"typeVersion": 2,
		"position": [
			680,
			460
		]
		},
		{
		"parameters": {
			"options": {}
		},
		"id": "3cce249a-0eab-42e2-90e3-dbdf3684e012",
		"name": "Loop Over Items",
		"type": "n8n-nodes-base.splitInBatches",
		"typeVersion": 3,
		"position": [
			900,
			460
		]
		},
		{
		"parameters": {
			"url": "={{ $json.url }}",
			"options": {}
		},
		"id": "50e1c1dc-9a5d-42d3-b7c0-accc31636aa6",
		"name": "RSS Read",
		"type": "n8n-nodes-base.rssFeedRead",
		"typeVersion": 1,
		"position": [
			1120,
			460
		]
		}
	],
	"connections": {
		"When clicking \"Execute workflow\"": {
		"main": [
			[
			{
				"node": "Code",
				"type": "main",
				"index": 0
			}
			]
		]
		},
		"Code": {
		"main": [
			[
			{
				"node": "Loop Over Items",
				"type": "main",
				"index": 0
			}
			]
		]
		},
		"Loop Over Items": {
		"main": [
			null,
			[
			{
				"node": "RSS Read",
				"type": "main",
				"index": 0
			}
			]
		]
		},
		"RSS Read": {
		"main": [
			[
			{
				"node": "Loop Over Items",
				"type": "main",
				"index": 0
			}
			]
		]
		}
	},
	"pinData": {}
	}
	```


# courses/level-two/chapter-4.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: tutorial
---

# Dealing with errors in workflows

Sometimes you build a nice workflow, but it fails when you try to execute it. Workflow executions may fail for a variety of reasons, ranging from straightforward problems with incorrectly configuring a node or a failure in a third-party service to more mysterious errors.

But don't panic. In this lesson, you'll learn how you can troubleshoot errors so you can get your workflow up and running as soon as possible.


## Checking failed workflows

n8n tracks executions of your workflows.

When one of your workflows fails, you can check the Executions log to see what went wrong. The Executions log shows you a list of the latest execution time, status, mode, and running time of your saved workflows.

Open the Executions log by selecting [**Executions**](/workflows/executions/index.md#execution-modes) in the left-side panel. 

To investigate a specific failed execution from the list, select the name or the **View** button that appears when you hover over the row of the respective execution.

<figure><img src="/_images/courses/level-two/chapter-four/explanation_workflowexecutions.png" alt="Executions log" style="width:100%"><figcaption align = "center"><i>Executions log</i></figcaption></figure>


This will open the workflow in read-only mode, where you can see the execution of each node. This representation can help you identify at what point the workflow ran into issues.

To toggle between viewing the execution and the editor, select the **Editor | Executions** button at the top of the page.

<figure><img src="/_images/courses/level-two/chapter-four/explanation_workflowexecutions_readonly.png" alt="Workflow execution view" style="width:100%"><figcaption align = "center"><i>Workflow execution view</i></figcaption></figure>

## Catching erroring workflows

To catch failed workflows, create a separate [**Error Workflow**](/flow-logic/error-handling.md) with the [**Error Trigger node**](/integrations/builtin/core-nodes/n8n-nodes-base.errortrigger.md). This workflow will only execute if the main workflow execution fails.

Use additional nodes in your **Error Workflow** that make sense, like sending notifications about the failed workflow and its errors using email or Slack.

To receive error messages for a failed workflow, set the **Error Workflow** in the [Workflow Settings](/workflows/settings.md) to an Error Workflow that uses an **Error Trigger node**.

The only difference between a regular workflow and an Error Workflow is that the latter contains an **Error Trigger node**. Make sure to create this node before you set this as another workflow's designated Error Workflow.

/// note | Error workflows
- If a workflow uses the Error Trigger node, you don't have to activate the workflow.
- If a workflow contains the Error Trigger node, by default, the workflow uses itself as the error workflow.
- You can't test error workflows when running workflows manually. The Error trigger only runs when an automatic workflow errors.
- You can set the same Error Workflow for multiple workflows.
///

### Exercise

In the previous chapters, you've built several small workflows. Now, pick one of them that you want to monitor and create an Error Workflow for it:

1. Create a new Error Workflow.
2. Add the **Error Trigger node**.
3. Connect a node for the communication platform of your choice to the Error Trigger node, like [Slack](/integrations/builtin/app-nodes/n8n-nodes-base.slack.md), [Discord](/integrations/builtin/app-nodes/n8n-nodes-base.discord/index.md), [Telegram](/integrations/builtin/app-nodes/n8n-nodes-base.telegram/index.md), or even [Gmail](/integrations/builtin/app-nodes/n8n-nodes-base.gmail/index.md) or a more generic [Send Email](/integrations/builtin/core-nodes/n8n-nodes-base.sendemail.md).
4. In the workflow you want to monitor, open the [Workflow Settings](/workflows/settings.md) and select the new Error Workflow you just created. Note that this workflow needs to run automatically to trigger the error workflow.

??? note "Show me the solution"

	The workflow for this exercise looks like this:

	<figure><img src="/_images/courses/level-two/chapter-four/exercise_errors_errortriggernode_workflow.png" alt="" style="width:100%"><figcaption align = "center"><i>Error workflow</i></figcaption></figure>

	To check the configuration of the nodes, you can copy the JSON workflow code below and paste it into your Editor UI:

	```json
	{
		"nodes": [
			{
				"parameters": {},
				"name": "Error Trigger",
				"type": "n8n-nodes-base.errorTrigger",
				"typeVersion": 1,
				"position": [
					720,
					-380
				]
			},
			{
				"parameters": {
					"channel": "channelname",
					"text": "=This workflow {{$node[\"Error Trigger\"].json[\"workflow\"][\"name\"]}}failed.\nHave a look at it here: {{$node[\"Error Trigger\"].json[\"execution\"][\"url\"]}}",
					"attachments": [],
					"otherOptions": {}
				},
				"name": "Slack",
				"type": "n8n-nodes-base.slack",
				"position": [
					900,
					-380
				],
				"typeVersion": 1,
				"credentials": {
					"slackApi": {
						"id": "17",
						"name": "slack_credentials"
					}
				}
			}
		],
		"connections": {
			"Error Trigger": {
				"main": [
					[
						{
							"node": "Slack",
							"type": "main",
							"index": 0
						}
					]
				]
			}
		}
	}
	```



## Throwing exceptions in workflows

Another way of troubleshooting workflows is to include a [**Stop and Error node**](/integrations/builtin/core-nodes/n8n-nodes-base.stopanderror.md) in your workflow. This node throws an error. You can specify the error type:

- **Error Message**: returns a custom message about the error
- **Error Object**: returns the type of error

You can only use the **Stop and Error node** as the last node in a workflow.

/// note | When to throw errors
Throwing exceptions with the **Stop and Error node** is useful for verifying the data (or assumptions about the data) from a node and returning custom error messages.

If you are working with data from a third-party service, you may come across problems such as:

- Wrongly formatted JSON output
- Data with the wrong type (for example, numeric data that has a non-numeric value)
- Missing values
- Errors from remote servers

Though this kind of invalid data might not cause the workflow to fail right away, it could cause problems later on, and then it can become difficult to track the source error. This is why it's better to throw an error at the time you know there might be a problem.

<figure><img src="/_images/courses/level-two/chapter-four/exercise_errors_stopanderror.png" alt="Stop and Error node with error message" style="width:100%"><figcaption align = "center"><i>Stop and Error node with error message</i></figcaption></figure>
///



# courses/level-two/chapter-5/chapter-5.0.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: tutorial
---

# Automating a business workflow

Remember [our friend Nathan](/courses/level-one/chapter-3.md)?

**Nathan 🙋:** Hello, it's me again. My manager was so impressed with my first workflow automation solution that she entrusted me with more responsibility.<br/>
**You 👩‍🔧:** More work and responsibility. Congratulations, I guess. What do you need to do now?<br/>
**Nathan 🙋:** I got access to all our sales data and I'm now responsible for creating two reports: one for regional sales and one for orders prices. They're based on data from different sources and come in different formats.<br/>
**You 👩‍🔧:** Sounds like a lot of manual work, but the kind that can be automated. Let's do it!


## Workflow design

Now that we know what Nathan wants to automate, let's list the steps he needs to take to achieve this:

1. Get and combine data from all necessary sources.
2. Sort the data and format the dates.
3. Write binary files.
4. Send notifications using email and Discord.

n8n provides [core nodes](/integrations/builtin/node-types.md#core-nodes) for all these steps. This use case is somewhat complex. We should build it from three separate workflows:

1. A workflow that merges the company data with external information.
2. A workflow that generates the reports.
3. A workflow that monitors errors in the second workflow.

## Workflow prerequisites

To build the workflows, you will need the following:

* An [Airtable](https://airtable.com/){:target="_blank" .external-link} account and [credentials](/integrations/builtin/credentials/airtable.md).
* A [Google](https://www.google.com/account/about/){:target="_blank" .external-link} account and [credentials](/integrations/builtin/credentials/google/index.md) to access Gmail.
* A [Discord](https://discord.com/){:target="_blank" .external-link} account and webhook URL (you receive this using email when you sign up for this course).

Next, you will build these three workflows with step-by-step instructions.


# courses/level-two/chapter-5/chapter-5.1.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: tutorial
---

# Workflow 1: Merging data

Nathan's company stores its customer data in Airtable. This data contains information about the customers' ID, country, email, and join date, but lacks data about their respective region and subregion. You need to fill in these last two fields in order to create the reports for regional sales.

To accomplish this task, you first need to make a copy of this table in your Airtable account:

<iframe class="airtable-embed" src="https://airtable.com/embed/shrNX9tjPkVLABbNz?backgroundColor=orange&viewControls=on" frameborder="0" onmousewheel="" width="100%" height="533" style="background: transparent; border: 1px solid #ccc;"></iframe>

Next, build a small workflow that merges data from Airtable and a REST Countries API:

1. Use the [**Airtable node**](/integrations/builtin/app-nodes/n8n-nodes-base.airtable/index.md) to list the data in the Airtable table named `customers`.
2. Use the [**HTTP Request node**](/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/index.md) to get data from the REST Countries API: `https://restcountries.com/v3.1/all`. This will return data about world countries, split out into separate items.
3. Use the [**Merge node**](/integrations/builtin/core-nodes/n8n-nodes-base.merge.md) to merge data from Airtable and the Countries API by country name, represented as `customerCountry` in Airtable and `name.common` in the Countries API, respectively.
4. Use another Airtable node to update the fields `region` and `subregion` in Airtable with the data from the Countries API.

The workflow should look like this:

<figure><img src="/_images/courses/level-two/chapter-five/workflow1.png" alt="Workflow 1 for merging data from Airtable and the Countries API" style="width:100%"><figcaption align = "center"><i>Workflow 1 for merging data from Airtable and the Countries API</i></figcaption></figure>


/// question | Quiz questions
* How many items does the **HTTP Request node** return?
* How many items does the **Merge node** return?
* How many unique regions are assigned in the customers table?
* What's the subregion assigned to the customerID 10?
///


# courses/level-two/chapter-5/chapter-5.2.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: tutorial
---

# Workflow 2: Generating reports

In this workflow, you will merge data from different sources, transform binary data, generate files, and send notifications about them. The final workflow should look like this:

<figure><img src="/_images/courses/level-two/chapter-five/workflow2.png" alt="Workflow 2 for aggregating data and generating files" style="width:100%"><figcaption align = "center"><i>Workflow 2 for aggregating data and generating files</i></figcaption></figure>

To make things easier, let's split the workflow into three parts.

## Part 1: Getting data from different sources

The first part of the workflow consists of five nodes:

<figure><img src="/_images/courses/level-two/chapter-five/workflow2_1.png" alt="Workflow 1: Getting data from different sources" style="width:100%"><figcaption align = "center"><i>Workflow 1: Getting data from different sources</i></figcaption></figure>

1. Use the [**HTTP Request node**](/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/index.md) to get data from the API endpoint that stores company data. Configure the following node parameters:

    - **Method**: Get
    - **URL**: The **Dataset URL** you received in the email when you signed up for this course.
    - **Authentication**: Generic Credential Type
        - **Generic Auth Type**: Header Auth
        - **Credentials for Header Auth**: The Header Auth name and Header Auth value you received in the email when you signed up for this course.
    - **Send Headers**: Toggle to true
        - **Specify Headers**: Select `Using Fields Below`
        - **Name**: `unique_id`
        - **Value**: The unique ID you received in the email when you signed up for this course.

2. Use the [**Airtable node**](/integrations/builtin/app-nodes/n8n-nodes-base.airtable/index.md) to list data from the `customers` table (where you updated the fields `region` and `subregion`).
3. Use the [**Merge node**](/integrations/builtin/core-nodes/n8n-nodes-base.merge.md) to merge data from the Airtable and HTTP Request node, based on matching the input fields for `customerID`.
4. Use the [**Sort node**](/integrations/builtin/core-nodes/n8n-nodes-base.sort.md) to sort data by `orderPrice` in descending order.

/// question | Quiz questions
* What's the name of the employee assigned to customer 1?
* What's the order status of customer 2?
* What's the highest order price?
///

## Part 2: Generating file for regional sales

The second part of the workflow consists of four nodes:

<figure><img src="/_images/courses/level-two/chapter-five/workflow2_2.png" alt="Workflow 2: Generating file for regional sales" style="width:100%"><figcaption align = "center"><i>Workflow 2: Generating file for regional sales</i></figcaption></figure>

1. Use the [**If node**](/integrations/builtin/core-nodes/n8n-nodes-base.if.md) to filter to only display orders from the region `Americas`.
2. Use the [**Convert to File**](/integrations/builtin/core-nodes/n8n-nodes-base.converttofile.md) to transform the incoming data from JSON to binary format. Convert each item to a separate file. (Bonus points if you can figure out how to name each report based on the orderID!)
3. Use the [**Gmail node**](/integrations/builtin/app-nodes/n8n-nodes-base.gmail/index.md) (or another email node) to send the files using email to an address you have access to. Note that you need to add an attachment with the data property.
4. Use the [**Discord node**](/integrations/builtin/app-nodes/n8n-nodes-base.discord/index.md) to send a message in the n8n Discord channel `#course-level-two`. In the node, configure the following parameters:
    * **Webhook URL**: The Discord URL you received in the email when you signed up for this course.
    * **Text**: "I sent the file using email with the label ID `{label ID}`. My ID: " followed by the unique ID emailed to you when you registered for this course. <br/> Note that you need to replace the text in curly braces `{}` with [expressions](/glossary.md#expression-n8n) that reference the data from the nodes.

/// question | Quiz questions
* How many orders are assigned to the `Americas` region?
* What's the total price of the orders in the `Americas` region?
* How many items does the **Write Binary File node** return?
///

## Part 3: Generating files for total sales

The third part of the workflow consists of five nodes:

<figure><img src="/_images/courses/level-two/chapter-five/workflow2_3.png" alt="Workflow 3: Generating files for total sales" style="width:100%"><figcaption align = "center"><i>Workflow 3: Generating files for total sales</i></figcaption></figure>

1. Use the [**Loop Over Items node**](/integrations/builtin/core-nodes/n8n-nodes-base.splitinbatches.md) to split data from the Item Lists node into batches of 5.
2. Use the [**Set node**](/integrations/builtin/core-nodes/n8n-nodes-base.set.md) to set four values, referenced with expressions from the previous node: `customerEmail`, `customerRegion`, `customerSince`, and `orderPrice`.
3. Use the [**Date & Time node**](/integrations/builtin/core-nodes/n8n-nodes-base.datetime.md) to change the date format of the field `customerSince` to the format MM/DD/YYYY.
    - Set the **Include Input Fields** option to keep all the data together.
4. Use the [**Convert to File node**](/integrations/builtin/core-nodes/n8n-nodes-base.converttofile.md) to create a CSV spreadsheet with the file name set as the expression: `{{$runIndex > 0 ? 'file_low_orders':'file_high_orders'}}`.
5. Use the [**Discord node**](/integrations/builtin/app-nodes/n8n-nodes-base.discord/index.md) to send a message in the n8n Discord channel `#course-level-two`. In the node, configure the following parameters:
    * **Webhook URL**: The Discord URL you received in the email when you signed up for this course.
    * **Text**: "I created the spreadsheet `{file name}`. My ID:" followed by the unique ID emailed to you when you registered for this course. <br/> Note that you need to replace `{file name}` with an expression that references data from the previous **Convert to File node**.<br/>

/// question | Quiz questions
* What's the lowest order price in the first batch of items?
* What's the formatted date of customer 7?
* How many items does the **Convert to File node** return?
///

??? note "Show me the solution"

	To check the configuration of the nodes, you can copy the JSON workflow code below and paste it into your Editor UI:

	```json
    {
    "meta": {
        "templateCredsSetupCompleted": true,
        "instanceId": "cb484ba7b742928a2048bf8829668bed5b5ad9787579adea888f05980292a4a7"
    },
    "nodes": [
        {
        "parameters": {
            "sendTo": "bart@n8n.io",
            "subject": "Your TPS Reports",
            "emailType": "text",
            "message": "Please find your TPS report attached.",
            "options": {
            "attachmentsUi": {
                "attachmentsBinary": [
                {}
                ]
            }
            }
        },
        "id": "d889eb42-8b34-4718-b961-38c8e7839ea6",
        "name": "Gmail",
        "type": "n8n-nodes-base.gmail",
        "typeVersion": 2.1,
        "position": [
            2100,
            500
        ],
        "credentials": {
            "gmailOAuth2": {
            "id": "HFesCcFcn1NW81yu",
            "name": "Gmail account 7"
            }
        }
        },
        {
        "parameters": {},
        "id": "c0236456-40be-4f8f-a730-e56cb62b7b5c",
        "name": "When clicking \"Execute workflow\"",
        "type": "n8n-nodes-base.manualTrigger",
        "typeVersion": 1,
        "position": [
            780,
            600
        ]
        },
        {
        "parameters": {
            "url": "https://internal.users.n8n.cloud/webhook/level2-erp",
            "authentication": "genericCredentialType",
            "genericAuthType": "httpHeaderAuth",
            "sendHeaders": true,
            "headerParameters": {
            "parameters": [
                {
                "name": "unique_id",
                "value": "recFIcD6UlSyxaVMQ"
                }
            ]
            },
            "options": {}
        },
        "id": "cc106fa0-6630-4c84-aea4-a4c7a3c149e9",
        "name": "HTTP Request",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 4.1,
        "position": [
            1000,
            500
        ],
        "credentials": {
            "httpHeaderAuth": {
            "id": "qeHdJdqqqaTC69cm",
            "name": "Course L2 Credentials"
            }
        }
        },
        {
        "parameters": {
            "operation": "search",
            "base": {
            "__rl": true,
            "value": "apprtKkVasbQDbFa1",
            "mode": "list",
            "cachedResultName": "All your base",
            "cachedResultUrl": "https://airtable.com/apprtKkVasbQDbFa1"
            },
            "table": {
            "__rl": true,
            "value": "tblInZ7jeNdlUOvxZ",
            "mode": "list",
            "cachedResultName": "Course L2, Workflow 1",
            "cachedResultUrl": "https://airtable.com/apprtKkVasbQDbFa1/tblInZ7jeNdlUOvxZ"
            },
            "options": {}
        },
        "id": "e5ae1927-b531-401c-9cb2-ecf1f2836ba6",
        "name": "Airtable",
        "type": "n8n-nodes-base.airtable",
        "typeVersion": 2,
        "position": [
            1000,
            700
        ],
        "credentials": {
            "airtableTokenApi": {
            "id": "MIplo6lY3AEsdf7L",
            "name": "Airtable Personal Access Token account 4"
            }
        }
        },
        {
        "parameters": {
            "mode": "combine",
            "mergeByFields": {
            "values": [
                {
                "field1": "customerID",
                "field2": "customerID"
                }
            ]
            },
            "options": {}
        },
        "id": "1cddc984-7fca-45e0-83b8-0c502cb4c78c",
        "name": "Merge",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2.1,
        "position": [
            1220,
            600
        ]
        },
        {
        "parameters": {
            "sortFieldsUi": {
            "sortField": [
                {
                "fieldName": "orderPrice",
                "order": "descending"
                }
            ]
            },
            "options": {}
        },
        "id": "2f55af2e-f69b-4f61-a9e5-c7eefaad93ba",
        "name": "Sort",
        "type": "n8n-nodes-base.sort",
        "typeVersion": 1,
        "position": [
            1440,
            600
        ]
        },
        {
        "parameters": {
            "conditions": {
            "options": {
                "caseSensitive": true,
                "leftValue": "",
                "typeValidation": "strict"
            },
            "conditions": [
                {
                "id": "d3afe65c-7c80-4caa-9d1c-33c62fbc2197",
                "leftValue": "={{ $json.region }}",
                "rightValue": "Americas",
                "operator": {
                    "type": "string",
                    "operation": "equals",
                    "name": "filter.operator.equals"
                }
                }
            ],
            "combinator": "and"
            },
            "options": {}
        },
        "id": "2ed874a9-5bcf-4cc9-9b52-ea503a562892",
        "name": "If",
        "type": "n8n-nodes-base.if",
        "typeVersion": 2,
        "position": [
            1660,
            500
        ]
        },
        {
        "parameters": {
            "operation": "toJson",
            "mode": "each",
            "options": {
            "fileName": "=report_orderID_{{ $('If').item.json.orderID }}.json"
            }
        },
        "id": "d93b4429-2200-4a84-8505-16266fedfccd",
        "name": "Convert to File",
        "type": "n8n-nodes-base.convertToFile",
        "typeVersion": 1.1,
        "position": [
            1880,
            500
        ]
        },
        {
        "parameters": {
            "authentication": "webhook",
            "content": "I sent the file using email with the label ID  and wrote the binary file {file name}. My ID: 123",
            "options": {}
        },
        "id": "26f43f2c-1422-40de-9f40-dd2d80926b1c",
        "name": "Discord",
        "type": "n8n-nodes-base.discord",
        "typeVersion": 2,
        "position": [
            2320,
            500
        ],
        "credentials": {
            "discordWebhookApi": {
            "id": "WEBrtPdoLrhlDYKr",
            "name": "L2 Course Discord Webhook account"
            }
        }
        },
        {
        "parameters": {
            "batchSize": 5,
            "options": {}
        },
        "id": "0fa1fbf6-fe77-4044-a445-c49a1db37dec",
        "name": "Loop Over Items",
        "type": "n8n-nodes-base.splitInBatches",
        "typeVersion": 3,
        "position": [
            1660,
            700
        ]
        },
        {
        "parameters": {
            "assignments": {
            "assignments": [
                {
                "id": "ce839b80-c50d-48f5-9a24-bb2df6fdd2ff",
                "name": "customerEmail",
                "value": "={{ $json.customerEmail }}",
                "type": "string"
                },
                {
                "id": "0c613366-3808-45a2-89cc-b34c7b9f3fb7",
                "name": "region",
                "value": "={{ $json.region }}",
                "type": "string"
                },
                {
                "id": "0f19a88c-deb0-4119-8965-06ed62a840b2",
                "name": "customerSince",
                "value": "={{ $json.customerSince }}",
                "type": "string"
                },
                {
                "id": "a7e890d6-86af-4839-b5df-d2a4efe923f7",
                "name": "orderPrice",
                "value": "={{ $json.orderPrice }}",
                "type": "number"
                }
            ]
            },
            "options": {}
        },
        "id": "09b8584c-4ead-4007-a6cd-edaa4669a757",
        "name": "Edit Fields",
        "type": "n8n-nodes-base.set",
        "typeVersion": 3.3,
        "position": [
            1880,
            700
        ]
        },
        {
        "parameters": {
            "operation": "formatDate",
            "date": "={{ $json.customerSince }}",
            "options": {
            "includeInputFields": true
            }
        },
        "id": "c96fae90-e080-48dd-9bff-3e4506aafb86",
        "name": "Date & Time",
        "type": "n8n-nodes-base.dateTime",
        "typeVersion": 2,
        "position": [
            2100,
            700
        ]
        },
        {
        "parameters": {
            "options": {
            "fileName": "={{$runIndex > 0 ? 'file_low_orders':'file_high_orders'}}"
            }
        },
        "id": "43dc8634-2f16-442b-a754-89f47c51c591",
        "name": "Convert to File1",
        "type": "n8n-nodes-base.convertToFile",
        "typeVersion": 1.1,
        "position": [
            2320,
            700
        ]
        },
        {
        "parameters": {
            "authentication": "webhook",
            "content": "I created the spreadsheet {file name}. My ID: 123",
            "options": {}
        },
        "id": "05da1c22-d1f6-4ea6-9102-f74f9ae2e9d3",
        "name": "Discord1",
        "type": "n8n-nodes-base.discord",
        "typeVersion": 2,
        "position": [
            2540,
            700
        ],
        "credentials": {
            "discordWebhookApi": {
            "id": "WEBrtPdoLrhlDYKr",
            "name": "L2 Course Discord Webhook account"
            }
        }
        }
    ],
    "connections": {
        "Gmail": {
        "main": [
            [
            {
                "node": "Discord",
                "type": "main",
                "index": 0
            }
            ]
        ]
        },
        "When clicking \"Execute workflow\"": {
        "main": [
            [
            {
                "node": "HTTP Request",
                "type": "main",
                "index": 0
            },
            {
                "node": "Airtable",
                "type": "main",
                "index": 0
            }
            ]
        ]
        },
        "HTTP Request": {
        "main": [
            [
            {
                "node": "Merge",
                "type": "main",
                "index": 0
            }
            ]
        ]
        },
        "Airtable": {
        "main": [
            [
            {
                "node": "Merge",
                "type": "main",
                "index": 1
            }
            ]
        ]
        },
        "Merge": {
        "main": [
            [
            {
                "node": "Sort",
                "type": "main",
                "index": 0
            }
            ]
        ]
        },
        "Sort": {
        "main": [
            [
            {
                "node": "Loop Over Items",
                "type": "main",
                "index": 0
            },
            {
                "node": "If",
                "type": "main",
                "index": 0
            }
            ]
        ]
        },
        "If": {
        "main": [
            [
            {
                "node": "Convert to File",
                "type": "main",
                "index": 0
            }
            ]
        ]
        },
        "Convert to File": {
        "main": [
            [
            {
                "node": "Gmail",
                "type": "main",
                "index": 0
            }
            ]
        ]
        },
        "Loop Over Items": {
        "main": [
            null,
            [
            {
                "node": "Edit Fields",
                "type": "main",
                "index": 0
            }
            ]
        ]
        },
        "Edit Fields": {
        "main": [
            [
            {
                "node": "Date & Time",
                "type": "main",
                "index": 0
            }
            ]
        ]
        },
        "Date & Time": {
        "main": [
            [
            {
                "node": "Convert to File1",
                "type": "main",
                "index": 0
            }
            ]
        ]
        },
        "Convert to File1": {
        "main": [
            [
            {
                "node": "Discord1",
                "type": "main",
                "index": 0
            }
            ]
        ]
        },
        "Discord1": {
        "main": [
            [
            {
                "node": "Loop Over Items",
                "type": "main",
                "index": 0
            }
            ]
        ]
        }
    },
    "pinData": {}
    }
    ```


# courses/level-two/chapter-5/chapter-5.3.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: tutorial
---

# Workflow 3: Monitoring workflow errors

Last but not least, let's help Nathan know if there are any errors running the workflow.

To accomplish this task, create an Error workflow that monitors the main workflow:

1. Create a new workflow.
2. Add an **Error Trigger node** (and execute it as a test).
3. Connect a **Discord node** to the **Error Trigger node** and configure these fields:<br/>

	* **Webhook URL**: The Discord URL that you received in the email from n8n when you signed up for this course.
	* **Text**: "The workflow `{workflow name}` failed, with the error message: `{execution error message}`. Last node executed: `{name of the last executed node}`. Check this workflow execution here: `{execution URL}` My Unique ID: " followed by the unique ID emailed to you when you registered for this course.

		Note that you need to replace the text in curly brackets `{}` with expressions that take the respective information from the Error Trigger node.<br/>

4. Execute the Discord node.
5. Set the newly created workflow as the **Error Workflow** for the main workflow you created in the previous lesson.

The workflow should look like this:

<figure><img src="/_images/courses/level-two/chapter-five/workflow3.png" alt="Workflow 3 for monitoring workflow errors" style="width:100%"><figcaption align = "center"><i>Workflow 3 for monitoring workflow errors</i></figcaption></figure>

/// question | Quiz questions
* What fields does the **Error Trigger node** return?
* What information about the execution does the **Error Trigger node** return?
* What information about the workflow does the **Error Trigger node** return?
* What's the expression to reference the workflow name?
///


# courses/level-two/chapter-6.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: tutorial
---

# Test your knowledge

Congratulations, you finished the n8n Course Level 2!

You've learned a lot about workflow automation and built quite a complex business workflow. Why not showcase your skills?

You can test your knowledge by taking a **quiz**, which consists of questions about the theoretical concepts and workflows covered in this course.

- You need to have at least 80% correct answers to pass the quiz.
- You can take the quiz as many times as you want.
- There's no time limit on answering the quiz questions.

<br/>
[Take the quiz!](https://n8n-community.typeform.com/to/r9hDbytg){ .md-button }

## What's next?

- Create new workflows for your work or personal use and share them with us. Don't have any ideas? Find inspiration on the [workflows page](https://n8n.io/workflows){:target="_blank" .external-link} and on our [blog](https://n8n.io/blog/){:target="_blank" .external-link}.
- Dive deeper into n8n's features by reading the [docs](/index.md).


# courses/level-two/index.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: overview
---

# Level two: Introduction

Welcome to the **n8n Course Level 2**!


## Is this course right for me?

This course is for you if you:

- Want to automate somewhat complex business processes.
- Want to dive deeper into n8n after taking the [Level 1 course](/courses/level-one/index.md).

## What will I learn in this course?

The focus in this course is on working with data. You will learn how to:

- Use the data structure of n8n correctly.
- Process different data types (for example, XML, HTML, date, time, and binary data).
- Merge data from different sources (for example, a database, spreadsheet, or CRM).
- Use functions and JavaScript code in the [Code node](/integrations/builtin/core-nodes/n8n-nodes-base.code/index.md).
- Deal with error workflows and workflow errors.

You will learn all this by completing short practical exercises after the theoretical explanations and building a business workflow following instructions.

## What do I need to get started?

To follow along this course (at a comfortable pace) you will need the following:

- **n8n set up**: You can use the [self-hosted version](/hosting/installation/npm.md) or [n8n Cloud](/manage-cloud/overview.md).
- **A user ID**: [Sign up here](https://n8n-community.typeform.com/to/HQoQ7nXg){:target="_blank" .external-link} to get your unique ID and other credentials you will need in the course.
- **Basic n8n skills**: We strongly recommend taking the [Level 1 course](/courses/level-one/index.md) before this one.
- **Basic JavaScript understanding**

## How long does the course take?

Completing the course should take around **two hours**. You don't have to complete it in one go; feel free to take breaks and resume whenever you are ready.

## How do I complete the course?

There are two milestones in this course that test your knowledge of what you have learned in the lessons:

- [x] Building the [main workflow](/courses/level-two/chapter-5/chapter-5.0.md)
- [x] Passing the [quiz](https://n8n-community.typeform.com/to/r9hDbytg){:target="_blank" .external} at the end of the course

You can always **check your progress** throughout the course by entering your unique ID [here](https://internal.users.n8n.cloud/webhook/course-level-2/verify){:target="_blank" .external-link}.

If you successfully complete the milestones above, you will get [**a badge and an avatar**](https://community.n8n.io/badges/105/completed-n8n-course-level-2){:target="_blank" .external} in your forum profile. You can then share your profile and course verification ID to showcase your n8n skills to others.

[Let's get started!](/courses/level-two/chapter-1.md){ .md-button }
