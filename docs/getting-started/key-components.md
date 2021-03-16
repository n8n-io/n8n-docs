# Key Components

Before you start automating workflows with n8n, it's important to understand some key components and concepts.

## Editor

The [Editor](../reference/glossary.md#editor-ui) is the web interface used to create [workflows](#Workflow). It is accessed through a web browser at a designated website address.

## Connection

A [connection](../reference/glossary.md#connection) establishes a link between nodes to route data through the workflow. Each node can have one or multiple connections.
* *Example*: An [IF node](../nodes/nodes-library/core-nodes/If/README.md) has two connections to different nodes: one for the case when the statement is false and one for the case when the statement is true.


## Node

A [node](../reference/glossary.md#node) is an entry point for retrieving data, a function to process data, or an exit for sending data. The data process includes filtering, recomposing, and changing data. There can be one or several nodes for your API, service, or app. By connecting multiple nodes, you can create simple and complex workflows. Nodes are named like the application they represent and are listed under Regular Nodes in the Editor.

* *Example*: A [Google Sheets node](../nodes/nodes-library/nodes/GoogleSheets/README.md) can be used to retrieve or write data to a Google Sheet.

Note that if an application you need does not have a dedicated Node yet, you can access the data by using the [HTTP Request node](../nodes/nodes-library/core-nodes/HTTPRequest/README.md) or the [Webhook node](../nodes/nodes-library/core-nodes/Webhook/README.md). These nodes offer generic API support and are very versatile.


## Trigger Node

A [trigger node](../reference/glossary.md#trigger) is a node that starts a workflow and supplies the initial data. What triggers it, depends on the node. It could be the time, a webhook call, or an event from an external service. Trigger nodes are named like the application they represent followed by "Trigger" and are listed under Trigger Nodes in the Editor. 

* *Example*: A [Trello trigger node](../nodes/nodes-library/nodes/Trello/README.md) can be used to trigger a workflow when a Trello Board gets updated, using the data from the updated board.


## Workflow

A [workflow](../reference/glossary.md#workflow) is a collection of node connected together to automate a process. A workflow can be started manually or by trigger nodes. A workflow run ends when all active and connected nodes have processed their data.
