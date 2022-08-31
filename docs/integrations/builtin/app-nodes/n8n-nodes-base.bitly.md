# Bitly

[Bitly](https://bitly.com/) is URL shortening service and a link management platform that allows users to shorten, create and share trusted, powerful links for businesses.

!!! note "Credentials"
    You can find authentication information for this node [here](/integrations/builtin/credentials/bitly/).


## Basic Operations

* Link
    * Create a link
    * Get a link
    * Update a link

## Example Usage

This workflow shows you how to create a new link. You can also find the [workflow](https://n8n.io/workflows/442) on the website. This example usage workflow uses the following two nodes.
- [Start](/integrations/builtin/core-nodes/n8n-nodes-base.start/)
- [Bitly]()

The final workflow should look like the following image.

![A workflow with the Bitly node](/_images/integrations/builtin/app-nodes/bitly/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Bitly node

1. First of all, you'll have to enter credentials for the Bitly node. You can find out how to do that [here](/integrations/builtin/credentials/bitly/).
2. Enter the URL in the *Long URL* field.
3. Click on *Execute Node* to run the workflow.
