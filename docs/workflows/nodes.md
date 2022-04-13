# Node

A node is an entry point for retrieving data, a function to process data, or an exit for sending data. The data process performed by nodes can include filtering, recomposing, and changing data.

There may be one or several nodes for your API, service, or app. By connecting multiple nodes, you can create simple and complex workflows. When you add a node to the Editor UI, the node is automatically activated and requires you to configure it (by adding credentials, selecting operations, writing expressions, etc.).

There are three types of nodes:

* Core Nodes
* Regular Nodes
* Trigger Nodes

## Core nodes

Core nodes are functions or services that can be used to control how workflows are run or to provide generic API support.

Use the Start node when you want to manually trigger the workflow with the `Execute Workflow` button at the bottom of the Editor UI. This way of starting the workflow is useful when creating and testing new workflows.

If an application you need does not have a dedicated Node yet, you can access the data by using the [HTTP Request node](/integrations/core-nodes/n8n-nodes-base.httpRequest/) or the [Webhook node](/integrations/core-nodes/n8n-nodes-base.webhook/). You can also read about [creating nodes](/integrations/creating-nodes/) and make a node for your desired application.


## Regular nodes

Regular nodes perform an action, like fetching data or creating an entry in a calendar. Regular nodes are named for the application they represent and are listed under Regular Nodes in the Editor UI.

![Regular Nodes](/_images/workflows/nodes/Regular_nodes.png)

### Example

A [Google Sheets node](/integrations/nodes/n8n-nodes-base.googleSheets/) can be used to retrieve or write data to a Google Sheet.

![Sheets_node](/_images/workflows/nodes/Google_sheets.png)

## Trigger nodes

Trigger nodes start workflows and supply the initial data.

![Trigger_nodes](/_images/workflows/nodes/Trigger_nodes.png)

Trigger nodes can be app or core nodes.

* **Core Trigger nodes** start the workflow at a specific time, at a time interval, or on a webhook call. For example, to get all users from a Postgres database every 10 minutes, use the Interval Trigger node with the Postgres node.

* **App Trigger nodes** start the workflow when an event happens in an app. App Trigger nodes are named like the application they represent followed by "Trigger" and are listed under Trigger Nodes in the Editor. For example, a [Telegram trigger node](/integrations/trigger-nodes/n8n-nodes-base.telegramtrigger/) can be used to trigger a workflow when a message is sent in a Telegram chat.

![Telegram trigger](/_images/workflows/nodes/telegram_trigger.png)

## Node settings

Nodes come with global **operations** and **settings**, as well as app-specific **parameters** that can be configured.

### Operations

The node operations are illustrated with icons that appear on top of the node when you hover on it:
* **Delete**: Remove the selected node from the workflow
* **Pause**: Deactivate the selected node
* **Copy**: Duplicate the selected node
* **Play**: Run the selected node

![Node settings](/_images/workflows/nodes/Node_settings.gif)

To access the node parameters and settings, double-click on the node.

### Parameters

The node parameters allow you to define the operations the node should perform. Find the available parameters of each node in the [node reference](/integrations/nodes/).

### Settings

The node settings allow you to configure the look and execution of the node. The following options are available:

* **Notes**: Optional note to save with the node
* **Display note in flow**: If active, the note above will be displayed in the workflow as a subtitle
* **Always Output Data**: If active, the node will return an empty item even if the node returns no data during an initial execution. Be careful setting this on IF nodes, as it could cause an infinite loop.
* **Execute Once**: If active, the node executes only once, with data from the first item it receives.
* **Retry On Fail**: If active, the node tries to execute a failed attempt multiple times until it succeeds
* **Continue On Fail**: If active, the workflow continues even if the execution of the node fails. When this happens, the node passes along input data from previous nodes, so the workflow should account for unexpected output data.

![Node parameters](/_images/workflows/nodes/Node_parameters.gif)

If a node is not correctly configured or is missing some required information, a **warning sign** is displayed on the top right corner of the node. To see what parameters are incorrect, double-click on the node and have a look at fields marked with red and the error message displayed in the respective warning symbol.

![Node error](/_images/workflows/nodes/Node_error.gif)


## Pausing nodes

Sometimes when creating and debugging a workflow, it is helpful to not execute specific nodes. To do that without disconnecting each node, you can pause them. When a node gets paused, the data passes through the node without being changed.

There are two ways to pause a node. You can either press the pause button which gets displayed above the node when hovering over it or select the node and press "d".
