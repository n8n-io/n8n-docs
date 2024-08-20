---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: tutorial
---

# Navigating the Editor UI

In this lesson you will learn how to navigate the Editor UI. We will walk through the canvas and show you what each icon means and where to find things you will need while building workflows in n8n.

## Getting started

Begin by setting up n8n. There are two ways you can do this:

- [n8n Cloud](https://app.n8n.cloud/register){:target="_blank" .external} - Hosted solution, no installation needed. Great for all levels of experience.
- [Self-host](/hosting/){:target="_blank" .external} - Recommended for advanced users with technical knowledge

For more details on the different ways to set up n8n, see our [platforms documentation](/choose-n8n/#platforms){:target="_blank" .external}.

/// warning | n8n version
This course was developed on n8n version 1.30.0. In other versions, some of the user interface might look different, but the core functionality shouldn't be impacted.
///
Once you have n8n running, open the Editor UI in a browser window. It should look like this:

<figure><img src="/_images/courses/level-one/chapter-one/l1-c1-editor-ui.png" alt="Editor UI" style="width:100%"><figcaption align = "center"><i>Editor UI</i></figcaption></figure>

## Editor UI settings

The [Editor UI](/editor-ui/) is the web interface where you build [workflows](/workflows/workflows/). You can access all your workflows and credentials, as well as support pages, from the Editor UI.

### Left-side panel

On the left side of the **Editor UI**, there is a panel which contains the core functionalities and settings for managing your workflows. Expand and collapse it by selecting the small arrow icon.

The panel contains the following sections:

- <span class="inline-image">![Home icon](/_images/common-icons/home.png){.off-glb}</span> **Home**: Contains all the workflows and credentials you have access to. During this course, create new workflows here.
- **Templates**: A collection of pre-made workflows. Great place to get started with common use cases.
- **Variables**: Used to store and access fixed data across your workflows. This feature is available on the Pro and Enterprise Plans.
- **All executions**: Contains information about your workflow executions.
- **Settings**: Manage users and access settings for a variety of features.
- **Help**: Contains resources around n8n product and community.
- **Admin Panel**: n8n Cloud only. Access your n8n instance usage, billing, and version settings.
- **Update**: n8n Cloud only. Indicator for any recently released product updates.

<figure style="text-align: center;"><img src="/_images/courses/level-one/chapter-one/l1-c1-side-panel.png" alt="Editor UI left-side menu" style="height: 600px;"><figcaption align = "center"><i>Editor UI left-side menu</i></figcaption></figure>

### Top bar

The top bar of the **Editor UI** contains the following information:

- **Workflow Name**: By default, n8n names a new workflow as “My Workflow,” but you can edit the name at any time.
- **+Add Tag**: Tags help you organise your workflows by category, use case, or whatever is relevant for you. Tags are optional.
- **Inactive/active toggle**: This button activates or deactivates the current workflow. By default, workflows are deactivated.
- **Share**: You can share and collaborate with others on workflows on the Starter, Pro, and Enterprise plans.
- **Save**: This button saves the current workflow.

<figure><img src="/_images/courses/level-one/chapter-one/l1-c1-top-bar.png" alt="Editor UI top bar" style="width:100%"><figcaption align = "center"><i>Editor UI top bar</i></figcaption></figure>

### Canvas

The **canvas** is the gray dotted grid background in the Editor UI. It displays several icons and a node with different functionalities:

- Buttons to zoom the canvas to fit the screen, zoom in or out of the canvas, and reset the canvas to the original resolution.
- A button to **Execute Workflow**. When you click on it, all nodes on the canvas are executed.
- A button with a **+** sign inside. This button opens the nodes panel.
- A button with a note icon inside. This button adds a [sticky note](/workflows/sticky-notes){:target="_blank" .external} to the canvas. (Visible when hovering on the top right + icon)
- A dotted square with the text "Add first step." This is where you add your first node.

<figure><img src="/_images/courses/level-one/chapter-one/l1-c1-canvas.png" alt="Workflow canvas" style="width:100%"><figcaption align = "center"><i>Workflow canvas</i></figcaption></figure>

/// note | Moving the canvas
You can move the workflow canvas around in three ways:

- Select **Ctrl + Left Mouse Button** on the canvas and move it around.
- Select **Middle Mouse Button** on the canvas and move it around.
- Place two fingers on your touchpad and slide.
///


Don't worry about workflow execution and activation for now; we'll explain these concepts later on in the course.

## Nodes

You can think of nodes as building blocks that serve different functions that, when put together, make up a functioning machine: an automated workflow.

/// note | Node
A node is an individual step in your workflow: one that either (a) loads, (b) processes, or (c) sends data.
///

Based on their function, n8n classifies nodes into four types:

- **App** or **Action Nodes** add, remove, and edit data; request and send external data; and trigger events in other systems. Refer to the [Action nodes library](/integrations/builtin/app-nodes/) for a full list of these nodes.
- **Trigger Nodes** start a workflow and supply the initial data. Refer to the [Trigger nodes library](/integrations/builtin/trigger-nodes/) for a full list of trigger nodes.
- **Core Nodes** can be core or app nodes. Whereas most nodes connect to a specific external service, core nodes provide functionality such as logic, scheduling, or generic API calls. Refer to the [Core Nodes library](https://docs.n8n.io/integrations/builtin/core-nodes/) for a full list of core nodes.
- **Cluster Nodes** are node groups that work together to provide functionality in a workflow. Refer to [Cluster nodes](/integrations/builtin/cluster-nodes/) for more information.

/// note | Learn more
Refer to [Node types](/builtin/node-types/) for a more detailed explanation of all node types.
///

### Finding nodes

You can find all available nodes in the **nodes panel** on the right side of the Editor UI. There are three ways in which you can open the nodes panel:

- Click the **+** icon in the top right corner of the canvas.
- Click the **+** icon on the right side of an existing node on the canvas (the node to which you want to add another one).
- Click the Tab key on your keyboard.

<figure style="text-align: center; width:50%; margin:auto;"><img src="/_images/courses/level-one/chapter-one/l1-c1-node-menu-drilldown.gif" alt="Nodes panel"><figcaption align = "center"><i>Nodes panel</i></figcaption></figure>

In the nodes panel, notice that when adding your first node, you will see the different trigger node categories. After you have added your trigger node, you'll see that the nodes panel changes to show Action, Data transformation, Helper, Flow and File nodes.

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

Additionally, you'll see an elipsis icon, which opens a context menu containing other [node options](/workflows/components/nodes/#node-controls).

/// note | Moving a workflow
To move a workflow around the canvas, select all nodes with your mouse or by selecting **Ctrl + A**, select and hold on a node, then drag it to any point you want on the canvas.
///

## Summary

In this lesson you learned how to navigate the Editor UI, what the icons mean, how to access the left-side and node panels, and how to add nodes to the canvas and interpret their execution results.

In the next lesson, you will build a mini-workflow to put into practice what you've learned so far.
