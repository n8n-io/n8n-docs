# Navigating the Editor UI

In this lesson you will learn how to navigate the Editor UI. We will walk through the canvas and show you what each icon means and where to find things you will need while building workflows in n8n.

[[toc]]

## Getting started

First of all, you need to set up n8n. There are different ways to [get started with n8n](https://docs.n8n.io/getting-started/installation/), you can: 

* [Install it locally with npm](https://docs.n8n.io/getting-started/installation/#npm) 
* Run it using [Docker](https://docs.n8n.io/getting-started/installation/docker-quickstart.html)
* Sign up on [n8n.cloud](http://n8n.cloud)

**This course was developed on n8n version 0.127.0, make sure you are using the same or newer version.**

We recommend using n8n.cloud to ensure easy access to the latest version of n8n and all functionality needed to complete the course with no configuration to worry about.

Once you have n8n running, open the Editor UI in a browser window. It should look like this:

<figure><img src="./images/chapter-one/Editor-UI.png" alt="Editor UI" style="width:100%"><figcaption align = "center"><i>Editor UI</i></figcaption></figure>

Now that you have the Editor UI open, you'll learn how to navigate it.

## Editor UI settings

The [Editor UI](http://docs.n8n.io/reference/glossary.html#editor-ui) represents the web interface used to create [workflows](http://docs.n8n.io/getting-started/key-components/workflow.html). Think of it as a canvas where the artist in you will create automations. From the Editor UI you can access all your workflows and credentials, as well as the n8n documentation and forum.

### Left-side panel

Under the n8n logo in the upper left corner you will notice a round arrow icon. Click on it to open the left-side menu, which contains the core functionalities and settings for managing workflows.

<figure style="text-align: center;"><img src="./images/chapter-one/Left-side-menu.png" alt="Editor UI left-side menu" style="height: 600px;"><figcaption align = "center"><i>Editor UI left-side menu</i></figcaption></figure>


There are four main sections in the left menu:

- *Admin Panel*: Only for users on n8n.cloud, used to access the management Dashboard.
- *Workflows*: Contains operations for creating and editing workflows.
- *Credentials*: Contains operations for creating credentials.
- *Executions*: Contains information about your workflow [executions](http://docs.n8n.io/reference/glossary.html#execution), which are complete runs of a workflow from the first to the last node.
- *Help*: Contains resources around n8n product and community.

### Top bar

The top bar of the Editor UI contains four pieces of information:

<figure><img src="./images/chapter-one/Editor-UI-top-bar.png" alt="Editor UI top bar" style="width:100%"><figcaption align = "center"><i>Editor UI top bar</i></figcaption></figure>

- The text that appears in the top left is the *name* of the current workflow. You can edit this name anytime.
- Next to it, you have the option to add a *tag*. Tags help you organize your workflows by use case, domain, or whatever is relevant for you.
- In the top right there is an orange *Save* button that saves the current workflow.
- Next to it, there is a *toggle* button used to activate or deactivate the current workflow.

### Canvas

The *canvas* is the gray grid background in the Editor UI. On the canvas, there are five buttons and a node with different functionalities:

<figure><img src="./images/chapter-one/Workflow-canvas.png" alt="Workflow canvas" style="width:100%"><figcaption align = "center"><i>Workflow canvas</i></figcaption></figure>

- In the bottom left corner of the canvas there are three small icons used to zoom in (**+**) or out (**-**) of the canvas, and reset (**←**) the canvas to the original resolution.
- At the bottom center of the canvas there is an orange *Execute Workflow* button. When you click on it all nodes on the canvas are executed.
- On the top right corner of the canvas there is an orange circle with a *+* sign inside. This button opens the nodes panel.
- In the center of the canvas, there is a square with a green play icon inside. This is the *Start node*. You will learn more about nodes in the [next section](#nodes).

::: tip 💡 Moving the canvas
You can move the workflow canvas around in two ways:
- Click **Ctrl + Left Mouse Button** on the canvas and move it around
- Place two fingers on your touchpad and slide
:::

Don’t worry about workflow execution and activation for now, we will explain these concepts later on in the course.

## Nodes

You can think of nodes as building blocks that serve different functions but, when put together, they make up a functioning machinery – an automated workflow.

::: tip 📖 Node
A [node](http://docs.n8n.io/reference/glossary.html#node) is an individual step in your workflow — one that either (a) loads, (b) processes or (c) sends data.
:::

Based on their function, nodes can be classified into two types:

- **Regular Nodes** add, remove, and edit data, as well as request and send external data.
- **Trigger Nodes** start a workflow and supply the initial data.

::: tip 💡 Keep in mind
Among the Regular and Trigger nodes there are some nodes that do not represent any app or service, instead they serve general functions like scheduling workflows (e.g. Cron and Interval nodes) or adding JavaScript functions (e.g. Function and Function Item nodes). We refer to these as *Core Nodes*.
:::

### Start node

The [*Start node*](https://docs.n8n.io/nodes/n8n-nodes-base.start) is the default starting point in any workflow. Every time you create a new workflow, a *Start node* will be included by default.

<figure style="text-align: center;"><img src="./images/chapter-one/Start-node.png" alt="Start node" style="width:30%"><figcaption align = "center"><i>Start node</i></figcaption></figure>

The **Start** node cannot be deleted or duplicated. If you have a workflow in which you don’t use the Start node, you can remove the connection, deactivate it, and move it away from the workflow. If you need more than one Start node, you probably need to use other Trigger nodes or create separate workflows.

You’ve probably figured out already that the *Start node* is a Core Trigger node. Apart from it, there are over 290 other Regular and Trigger nodes for various functions, apps, and services.

### Finding nodes

You can find all available nodes in the nodes panel on the right side of the Editor UI. There are three ways in which you can open the nodes panel:

- Click the *+* icon in the top right corner of the canvas.
- Click the gray dot on the right side of an existing node on the canvas (the node to which you want to add another one) and pull the connection line to the right.
- Click the Tab key on your keyboard.

The nodes panel looks like this:

<figure style="text-align: center;"><img src="./images/chapter-one/Nodes-panel.png" alt="Nodes panel" style="width:50%"><figcaption align = "center"><i>Nodes panel</i></figcaption></figure>

In the nodes panel, notice that the nodes are grouped in three tabs: All, Regular, and Trigger. In addition, nodes are also grouped by their functionality domain (like Analytics or Sales). This makes it easier to find the nodes you need.

If you want to get a specific node, type in the name of the node, app, or service in the search field and select the respective tab.

### Adding nodes

To add a new node to the Editor UI, click on the node you want in the nodes panel. The new node will automatically be connected to the selected node on the canvas.

To review, here’s a walkthrough of the Editor UI touching on all the settings you’ve learned so far:

<figure><img src="./images/chapter-one/Editor-UI-walkthrough.gif" alt="Editor UI walkthrough" style="width:100%"><figcaption align = "center"><i>Editor UI walkthrough</i></figcaption></figure>

### Node buttons

If you hover on a node, you’ll notice that four icons appear on top:

- Delete the node
- Deactivate/Activate the node
- Duplicate the node
- Execute the node

<figure><img src="./images/chapter-one/Node-buttons.gif" alt="The four node buttons" style="width:100%"><figcaption align = "center"><i>The four node buttons</i></figcaption></figure>


::: tip 💡 Moving a workflow
To move a workflow around the canvas, select all nodes (**Ctrl + A**), click and hold on a node then drag it to any point you want on the canvas.
:::

## Summary

In this lesson you learned how to navigate the Editor UI, what the icons mean, how to access the left-side and node panels, and how to add nodes to the canvas and interpret their execution results.

In the next lesson, you will build a mini-workflow to put into practice what you've learned so far.
