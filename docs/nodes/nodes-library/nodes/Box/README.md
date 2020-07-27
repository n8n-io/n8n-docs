---
permalink: /nodes/n8n-nodes-base.box
---

# Box

[Box](https://www.box.com/) is a cloud computing business which provides file sharing, collaborating, and other tools for working with files that are uploaded to its servers.

::: tip 🔑 Credentials
You can find authentication information for this node [here](../../../credentials/Box/README.md).
:::

## Basic Operations

- File
	- Copy a file
	- Delete a file
	- Download a file
	- Get a file
	- Search files
	- Upload a file
- Folder
	- Create a folder
	- Delete a folder
	- Search files

## Example Usage

This workflow allows you to create a folder on Box. You can also find the [workflow](https://n8n.io/workflows/559) on the website. This example usage workflow would use the following two nodes.
- [Start](../../core-nodes/Start/README.md)
- [Box]()

The final workflow should look like the following image.

![A workflow with the Box node](./workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Box node

1. First of all, you'll have to enter credentials for the Box node. You can find out how to do that [here](../../../credentials/Box/README.md).
2. Select the 'Folder' option from the *Resource* dropdown list.
3. Select the 'Create' option from the *Operation* dropdown list.
4. Enter the name of the folder in the *Name* field.
5. Click on *Execute Node* to run the workflow.
