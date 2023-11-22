---
contentType: tutorial
---

# Navigating the Editor UI

In this lesson you will learn how to navigate the Editor UI. We will walk through the canvas and show you what each icon means and where to find things you will need while building workflows in n8n.

## Getting started

The first step is setting up n8n. There are two ways you can do this:

- [n8n Cloud](https://app.n8n.cloud/register){:target="_blank" .external} - Hosted solution, no installation needed. Great for all levels of expereince
- [Self-host](/hosting/){:target="_blank" .external} - Recommended for advanced users with technical knowledge

For more details on the different ways to set up n8n, see our [platforms documentation](/choose-n8n/#platforms){:target="_blank" .external}

/// warning | n8n version
This course was developed on n8n version 1.15.0. In other versions, some of the user interface might look different, but the core functionality should not be impacted.
///
Once you have n8n running, open the Editor UI in a browser window. It should look like this:

<figure><img src="/_images/courses/level-one/chapter-one/l1-c1-editor-ui.png" alt="Editor UI" style="width:100%"><figcaption align = "center"><i>Editor UI</i></figcaption></figure>

## Editor UI settings

The [Editor UI](/editor-ui/) represents the web interface where you build [workflows](/workflows/workflows/). Think of it as a canvas on which the artist in you designs automations. From the Editor UI you can access all your workflows and credentials, as well as support pages.

### Left-side panel

On the left side of the editor UI, there is a panel which contains the core functionalities and settings for managing your workflows. It can be expanded and collapsed by clicking on the small arrow icon.

The panel contains the following sections:

- *Workflows*: Contains all the workflows you have access to and where you can create new workflows.
- *Templates*: A collection of pre-made workflows. Great place to get started with common use cases.
- *Credentials*: Contains all the credentials you have access to and where you can add additional credentials.
- *Variables*: Used to store and access fixed data across your workflows. This feature is available on Pro & Enterprise Plan.
- *All executions*: Contains information about your workflow executions
- *Admin Panel*: Access your n8n instance usage, billing and version settings(for n8n Cloud users)
- *Settings*: Access settings for a variety of features, manage users
- *Help*: Contains resources around n8n product and community
- *Update*: Indicator for any recently released product updates 

<figure style="text-align: center;"><img src="/_images/courses/level-one/chapter-one/l1-c1-side-panel.png" alt="Editor UI left-side menu" style="height: 600px;"><figcaption align = "center"><i>Editor UI left-side menu</i></figcaption></figure>

### Top bar

The top bar of the Editor UI contains the following information:

- *Workflow Name:* By default, a new workflow is named “My Workflow”, but can be edited at any time as required.
- *+Add Tag:* Tags help you organise your workflows by category, use case or whatever is relevant for you. Tags are also optional
- *Inactive/active toggle:* This button activates or deactivates the current workflow. By default, workflows are deactivated.
- *Share:* You can share and collaborate with others on workflows on the Starter, Pro & Enterprise plans
- *Save:* This button saves the current workflow

<figure><img src="/_images/courses/level-one/chapter-one/l1-c1-top-bar.png" alt="Editor UI top bar" style="width:100%"><figcaption align = "center"><i>Editor UI top bar</i></figcaption></figure>

### Canvas

The *canvas* is the gray grid background in the Editor UI. On the canvas, there are several icons and a node with different functionalities:

- Buttons to zoom the canvas to fit the screen, zoom in or out of the canvas, and reset the canvas to the original resolution.
- A button to *Execute Workflow*. When you click on it, all nodes on the canvas are executed.
- A button with a *+* sign inside. This button opens the nodes panel.
- A button with a note icon inside. This button adds a [sticky note](/workflows/sticky-notes){:target="_blank" .external} to the canvas. (Visible when hovering on the top right + icon)
- A dotted square with the text "add first step". This is where you would add your first node.

<figure><img src="/_images/courses/level-one/chapter-one/l1-c1-canvas.png" alt="Workflow canvas" style="width:100%"><figcaption align = "center"><i>Workflow canvas</i></figcaption></figure>

/// note | Moving the canvas
You can move the workflow canvas around in two ways:

- Click **Ctrl + Left Mouse Button** on the canvas and move it around
- Place two fingers on your touchpad and slide
///


Don't worry about workflow execution and activation for now, we will explain these concepts later on in the course.

## Nodes

You can think of nodes as building blocks that serve different functions but, when put together, they make up a functioning machine – an automated workflow.

/// note | Node
A node is an individual step in your workflow — one that either (a) loads, (b) processes or (c) sends data.
///

Based on their function, nodes can be classified into two types:

- **Regular Nodes** add, remove, and edit data, as well as request and send external data.
- **Trigger Nodes** start a workflow and supply the initial data.

/// note | Keep in mind
Among the Regular and Trigger nodes there are some nodes that do not represent any app or service, instead they serve general functions like scheduling workflows (e.g. Schedule Trigger) or adding JavaScript functions (e.g. Code Node). We refer to these as *Core Nodes*.
///

### Finding nodes

You can find all available nodes in the nodes panel on the right side of the Editor UI. There are three ways in which you can open the nodes panel:

- Click the *+* icon in the top right corner of the canvas.
- Click the *+* icon on the right side of an existing node on the canvas (the node to which you want to add another one)
- Click the Tab key on your keyboard.

<figure style="text-align: center; width:50%; margin:auto;"><img src="/_images/courses/level-one/chapter-one/l1-c1-node-menu-drilldown.gif" alt="Nodes panel"><figcaption align = "center"><i>Nodes panel</i></figcaption></figure>

In the nodes panel, notice that when adding your first node, you will see the different trigger node categories. After you have added your trigger node, you'll see that the nodes panel changes to show Action, Data transformation, Helper, Flow and File nodes.

If you want to find a specific node, you can use the search input at the top of the nodes panel.


### Adding nodes

There are two ways to add nodes to your canvas:

- Click on the node you want in the nodes panel. The new node will automatically be connected to the selected node on the canvas.
- Drag and drop the node from the nodes panel to the canvas.

### Node buttons

If you hover on a node, you'll notice that four icons appear on top:

- Delete the node (Trash icon)
- Deactivate/Activate the node (Pause icon)
- Duplicate the node (Copy icon)
- Execute the node (Play icon)

/// note | Moving a workflow
To move a workflow around the canvas, select all nodes with your mouse or by clicking **Ctrl + A**, click and hold on a node, then drag it to any point you want on the canvas.
///

## Summary

In this lesson you learned how to navigate the Editor UI, what the icons mean, how to access the left-side and node panels, and how to add nodes to the canvas and interpret their execution results.

In the next lesson, you will build a mini-workflow to put into practice what you've learned so far.
