# Key Components

## [Connection](connection.md)

A connection establishes a link between nodes to route data through the workflow. Each node can have one or multiple connections.

## [Node](node.md)

Nodes are the building blocks of workflows. A node is an entry point for retrieving data, a function to process data, or an exit for sending data. There can be one or several nodes for your API, service, or app. You can connect multiple nodes, enabling you to intuitively create simple or complex workflows to suit your needs.

For example, consider a Google Sheets node. It can be used to retrieve or write data to a Google Sheet.

::: tip 💡 Keep in mind
If an application you need does not have a dedicated node yet, you can access the data by using the [HTTP Request](../nodes/nodes-library/core-nodes/HTTPRequest/README.md) or the [Webhook](../nodes/nodes-library/core-nodes/Webhook/README.md) node.
:::

## [Workflow](workflow.md)

A workflow is an automation project. It is a series of nodes connected together to perform a specific task. Workflows can be started manually or by trigger nodes (i.e. on a schedule, when an event occurs, when data changes). A workflow execution ends when all active and connected nodes have processed their data.
