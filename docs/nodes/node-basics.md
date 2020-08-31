# Node Basics


## Types

There are two main node types in n8n: Trigger nodes and Regular nodes.


### Trigger Nodes

The Trigger nodes start a workflow and supply the initial data. A workflow can contain multiple trigger nodes but with each execution, only one of them will execute. This is because the other trigger nodes would not have any input as they are the nodes from which the execution of the workflow starts.


### Regular Nodes

These nodes do the actual work. They can add, remove, and edit the data in the flow as well as request and send data to external APIs. They can do everything possible with Node.js in general.


## Credentials

External services need a way to identify and authenticate users. This data can range from an API key over an email/password combination to a very long multi-line private key and can be saved in n8n as credentials.

Nodes in n8n can then request that credential information. As an additional layer of security credentials can only be accessed by node types which specifically have the right to do so.

To make sure that the data is secure, it gets saved to the database encrypted. A random personal encryption key is used which gets automatically generated on the first run of n8n and then saved under `~/.n8n/config`.


## Pausing Node

Sometimes when creating and debugging a workflow, it is helpful to not execute specific nodes. To do that without disconnecting each node, you can pause them. When a node gets paused, the data passes through the node without being changed.

There are two ways to pause a node. You can either press the pause button which gets displayed above the node when hovering over it or select the node and press “d”.
