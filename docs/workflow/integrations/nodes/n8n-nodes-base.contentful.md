# Contentful

[Contentful](https://www.contentful.com/) provides a content infrastructure for digital teams to power content in websites, apps, and devices. It offers a central hub for structured content, powerful management and delivery APIs, and a customizable web app.

!!! note "🔑 Credentials"
    You can find authentication information for this node [here](/workflow/integrations/credentials/contentful/).


## Basic Operations

* Asset
    * Get
    * Get All
* Content Type
    * Get
* Entry
    * Get
    * Get All
* Locale
    * Get All
* Space
    * Get

## Example Usage

This workflow allows you to get all the entries using the Delivery API of Contentful. You can also find the [workflow](https://n8n.io/workflows/640) on n8n.io. This example usage workflow would use the following nodes.
- [Start](/workflow/integrations/core-nodes/n8n-nodes-base.start/)
- [Contentful]()

The final workflow should look like the following image.

![A workflow with the Contentful node](/_images/integrations/nodes/contentful/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Contentful node

1. First of all, you'll have to enter credentials for the Contentful node. You can find out how to do that [here](/workflow/integrations/credentials/contentful/).
2. Select 'Get All' from the ***Operation*** dropdown list.
3. Toggle ***Return All*** to true.
4. Click on ***Execute Node*** to run the node.

![Using the Contentful node to get all entries](/_images/integrations/nodes/contentful/contentful_node.png)
