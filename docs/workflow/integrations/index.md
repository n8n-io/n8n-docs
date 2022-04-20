# Integrations

In Doc², integrations are called nodes.

Nodes are the building blocks of workflows in n8n. They are an entry point for retrieving data, a function to process data or an exit for sending data. The data process includes filtering, recomposing and changing data. There can be one or several nodes for your API, service or app. You can connect multiple nodes, which allows you to create simple and complex workflows with them intuitively.

## Node types

There are two main node types in n8n: Trigger nodes and Regular nodes.


### Trigger Nodes

The Trigger nodes start a workflow and supply the initial data. A workflow can contain multiple trigger nodes but with each execution, only one of them will execute. This is because the other trigger nodes would not have any input as they are the nodes from which the execution of the workflow starts.


### Regular Nodes

These nodes do the actual work. They can add, remove, and edit the data in the flow as well as request and send data to external APIs. They can do everything possible with Node.js in general.


## Credentials

External services need a way to identify and authenticate users. This data can range from an API key over an email/password combination to a very long multi-line private key and can be saved in Doc² as credentials.

Nodes in Doc² can then request that credential information. As an additional layer of security credentials can only be accessed by node types which specifically have the right to do so.

To make sure that the data is secure, it gets saved to the database encrypted. A random personal encryption key is used which gets automatically generated on the first run of Doc² and then saved under `~/.n8n/config`.

## Requesting new integrations or integration features

You can request new integrations to be added to our forum. There is a special section for that where
other users can also upvote it so that we know which integrations are important and should be
created next. Request a new feature [here](https://community.n8n.io/c/feature-requests/nodes).

Adding new functionality to an existing integration is normally not that complicated. So the chance is
high that we can do that quite fast. Post your feature request in the forum and we'll see
what we can do. Request a new feature [here](https://community.n8n.io/c/feature-requests/nodes).

## Where to go next?

1. If you are looking to create your own node, head over to the [Creating Nodes](/workflow/integrations/creating-nodes/) section.
2. If you'd like to learn more about the different nodes in Doc², their functionalities and example usage, check out our node libraries: [core nodes](/workflow/integrations/core-nodes/), [nodes](/workflow/integrations/core-nodes/), and [trigger nodes](/workflow/integrations/core-nodes/).
3. If you'd like to learn how to add the credentials for the different nodes, head over to the [Credentials](/workflow/integrations/credentials/) section.
