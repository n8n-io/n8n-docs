# Integrations

In n8n, integrations are called nodes.

Nodes are the building blocks of workflows in n8n. They're an entry point for retrieving data, a function to process data, or an exit for sending data. The data process includes filtering, recomposing, and changing data. There can be one or several nodes for your API, service or app. You can connect multiple nodes, which allows you to create both simple and complex workflows.

## Node types

There are two main node types in n8n: trigger nodes and regular nodes.


### Trigger nodes

The Trigger nodes start a workflow and supply the initial data. A workflow can contain multiple trigger nodes but with each execution, only one of them will execute. This is because the other trigger nodes would not have any input as they're the nodes from which the execution of the workflow starts.


### Regular nodes

These nodes do the actual work. They can add, remove, and edit the data in the flow as well as request and send data to external APIs. They can do everything possible with Node.js in general.


## Credentials

External services need a way to identify and authenticate users. This data can range from an API key over an email/password combination to a long multi-line private key. You can save these in n8n as credentials.

Nodes in n8n can then request that credential information. As another layer of security, only node types with specific access rights can access the credentials.

To make sure that the data is secure, it gets saved to the database encrypted. n8n uses a random personal encryption key, which it automatically generates on the first run of n8n and then saved under `~/.n8n/config`.

## Community nodes

n8n includes a collection of built-in integrations. You can also install community-built nodes. Refer to [community nodes](/integrations/community-nodes/) for more information.

## Where to go next

* If you want to create your own node, head over to the [Creating Nodes](/integrations/creating-nodes/) section.
* Check out [community nodes](/integrations/community-nodes) to learn about installing and managing community-built nodes.
* If you'd like to learn more about the different nodes in n8n, their functionalities and example usage, check out n8n's node libraries: [core nodes](/integrations/core-nodes/), [nodes](/integrations/core-nodes/), and [trigger nodes](/integrations/core-nodes/).
* If you'd like to learn how to add the credentials for the different nodes, head over to the [Credentials](/integrations/credentials/) section.
