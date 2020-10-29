---
permalink: /nodes/n8n-nodes-base.microsoftOneDrive
description: Learn how to use the Microsoft OneDrive node in n8n
---

# Microsoft OneDrive

[Microsoft OneDrive](https://onedrive.live.com/) is a file hosting service and synchronization service operated by Microsoft.

::: tip 🔑 Credentials
You can find authentication information for this node [here](../../../credentials/Microsoft/README.md).
:::

## Basic Operations

::: details File
- Copy a file
- Delete a file
- Download a file
- Get a file
- Search a file
- Share a file
- Upload a file
:::

::: details Folder
- Create a folder
- Get items inside a folder
- Search a folder
- Share a folder
:::

## Example Usage

This workflow allows you to create a folder in Microsoft OneDrive. You can also find the [workflow](https://n8n.io/workflows/565) on the website. This example usage workflow would use the following two nodes.
- [Start](../../core-nodes/Start/README.md)
- [Microsoft OneDrive]()

The final workflow should look like the following image.

![A workflow with the Microsoft OneDrive node](./workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Microsoft OneDrive node

1. First of all, you'll have to enter credentials for the Microsoft OneDrive node. You can find out how to do that [here](../../../credentials/Microsoft/README.md).
2. Select the 'Folder' option from the *Resource* dropdown list.
3. Select the 'Create' option from the *Operation* dropdown list.
4. Enter the folder name in the *Name* field.
5. Click on *Execute Node* to run the workflow.
