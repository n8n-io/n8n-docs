# Contentful

The Contentful node allows you to automate work in Contentful, and integrate Contentful with other applications. n8n has built-in support for a wide range of Contentful features, including getting assets, content types, entries, locales, and space.

On this page, you'll find a list of operations the Contentful node supports and links to more resources.

!!! note "Credentials"
    Refer to [Contentful credentials](https://docs.n8n.io/integrations/builtin/credentials/contentful/) for guidance on setting up authentication. 

!!! note "Examples and templates"
    For usage examples and templates to help you get started, take a look at n8n's [Contentful integrations](https://n8n.io/integrations/contentful/){:target="_blank" .external-link} list.


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
- [Start](/integrations/builtin/core-nodes/n8n-nodes-base.start/)
- [Contentful]()

The final workflow should look like the following image.

![A workflow with the Contentful node](/_images/integrations/builtin/app-nodes/contentful/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Contentful node

1. First of all, you'll have to enter credentials for the Contentful node. You can find out how to do that [here](/integrations/builtin/credentials/contentful/).
2. Select 'Get All' from the ***Operation*** dropdown list.
3. Toggle ***Return All*** to true.
4. Click on ***Execute Node*** to run the node.

![Using the Contentful node to get all entries](/_images/integrations/builtin/app-nodes/contentful/contentful_node.png)
