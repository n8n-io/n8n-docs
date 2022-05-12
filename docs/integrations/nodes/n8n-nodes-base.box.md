# Box

[Box](https://www.box.com/) is a cloud computing company which provides file sharing, collaborating, and other tools for working with files that are uploaded to its servers.

!!! note "Credentials"
    You can find authentication information for this node [here](/integrations/credentials/box/).


## Basic Operations

* File
    * Copy a file
    * Delete a file
    * Download a file
    * Get a file
    * Search files
    * Share a file
    * Upload a file
* Folder
    * Create a folder
    * Get a folder
    * Delete a folder
    * Search files
    * Share a folder
    * Update folder

## Example Usage

This workflow allows you to create a folder on Box. You can also find the [workflow](https://n8n.io/workflows/559) on the website. This example usage workflow would use the following two nodes.
- [Start](/integrations/core-nodes/n8n-nodes-base.start/)
- [Box]()

The final workflow should look like the following image.

![A workflow with the Box node](/_images/integrations/nodes/box/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Box node

1. First of all, you'll have to enter credentials for the Box node. You can find out how to do that [here](/integrations/credentials/box/).
2. Select the 'Folder' option from the *Resource* dropdown list.
3. Enter the name of the folder in the *Name* field.
4. Click on *Execute Node* to run the workflow.
