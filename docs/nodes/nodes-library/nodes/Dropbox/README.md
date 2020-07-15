---
permalink: /nodes/n8n-nodes-base.dropbox
---

# Dropbox

[Dropbox](https://dropbox.com) is a cloud-based file storage and sharing service, accessible through multiple devices.

::: tip 🔑 Credentials
You can find authentication information for this node [here](../../../credentials/Dropbox/README.md).
:::

## Basic Operations

- File
	- Copy a file
	- Delete a file
	- Download a file
	- Move a file
	- Upload a file
- Folder
	- Copy a folder
	- Create a folder
	- Delete a folder
	- Return the files and folders in a given folder
	- Move a folder

## Example Usage

This workflow allows you to create a folder in Dropbox. You can also find the [workflow](https://n8n.io/workflows/439) on this website. This example usage workflow uses the following two nodes.
- [Start](../../core-nodes/Start)
- [Dropbox]()

The final workflow should look like the following image.

![A workflow with the Dropbox node](./workflow.png)

### 1. Start node

The Start node exists by default when you create a new workflow.

### 2. Dropbox node

1. First of all, you'll have to enter credentials for the Dropbox node. You can find out how to do that [here](../../../credentials/Dropbox/).
2. Select 'Folder' from the *Resource* dropdown list.
3. Enter the name of the new folder in the *Folder* field.
4. Click on *Execute Node* to run the workflow.
