# Cockpit

The Cockpit node allows you to automate work in Cockpit, and integrate Cockpit with other applications. n8n has built-in support for a wide range of Cockpit features, including creating a collection entry, storing data from a form submission, and getting singletons.

On this page, you'll find a list of operations the Cockpit node supports and links to more resources.

!!! note "Credentials"
    Refer to [Cockpit credentials](https://docs.n8n.io/integrations/builtin/credentials/cockpit/) for guidance on setting up authentication. 

!!! note "Examples and templates"
    For usage examples and templates to help you get started, take a look at n8n's [Cockpit integrations](https://n8n.io/integrations/cockpit/){:target="_blank" .external-link} list.


## Basic Operations

* Collection
    * Create a collection entry
    * Get all collection entries
    * Update a collection entry
* Form
    * Store data from a form submission
* Singleton
    * Get a singleton

## Example Usage

This workflow allows you to get entries from a collection in Cockpit. You can also find the [workflow](https://n8n.io/workflows/518) on the website. This example usage workflow would use the following two nodes.
- [Start](/integrations/builtin/core-nodes/n8n-nodes-base.start/)
- [Cockpit]()

The final workflow should look like the following image.

![A workflow with the Cockpit node](/_images/integrations/builtin/app-nodes/cockpit/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Cockpit node

1. First of all, you'll have to enter credentials for the Cockpit node. You can find out how to do that [here](/integrations/builtin/credentials/cockpit/).
2. Select your collection from the *Collection* dropdown list.
3. Click on *Execute Node* to run the workflow.
