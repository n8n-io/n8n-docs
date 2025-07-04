---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: ONLYOFFICE DocSpace Folder operations
description: Documentation for the Folder operations in ONLYOFFICE DocSpace node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
contentType: [integration, reference]
---

# ONLYOFFICE DocSpace Folder operations

Use this operation to manage folders in ONLYOFFICE DocSpace. Refer to [ONLYOFFICE DocSpace](/integrations/builtin/app-nodes/n8n-nodes-base.onlyofficedocspace/index.md) for more information on the ONLYOFFICE DocSpace node itself.

## Copy a folder

Use this operation to copy a folder to the portal.

Enter these parameters:

- **Credential to connect with**: Create or select an existing [ONLYOFFICE DocSpace credentials](/integrations/builtin/credentials/onlyofficedocspace.md).
- **Resource**: Select **Folder**.
- **Operation**: Select **Copy Folder**.
- **Folder ID**: Enter the ID of the folder you want to copy.
- **Destination ID**: Enter the ID of the room or folder where you want to copy the folder. This parameter is mutually exclusive with the **To My Documents** parameter.

### Options

- **To My Documents**: Toggle to copy the folder to your My Documents section. This parameter is mutually exclusive with the **Destination ID** parameter.

## Create a folder

Use this operation to create a new folder in the portal.

Enter these parameters:

- **Credential to connect with**: Create or select an existing [ONLYOFFICE DocSpace credentials](/integrations/builtin/credentials/onlyofficedocspace.md).
- **Resource**: Select **Folder**.
- **Operation**: Select **Create Folder**.
- **Parent ID**: Enter the ID of the room or folder where you want to create the folder. This parameter is mutually exclusive with the **In My Documents** parameter.
- **Title**: Enter the title of the folder you want to create.

### Options

- **In My Documents**: Toggle to create the folder in your My Documents section. This parameter is mutually exclusive with the **Parent ID** parameter.

## Delete a folder

Use this operation to delete a folder from the portal.

Enter these parameters:

- **Credential to connect with**: Create or select an existing [ONLYOFFICE DocSpace credentials](/integrations/builtin/credentials/onlyofficedocspace.md).
- **Resource**: Select **Folder**.
- **Operation**: Select **Delete Folder**.
- **Folder ID**: Enter the ID of the folder you want to delete.

## Get the contents of a folder

Use this operation to get the contents of a folder in the portal.

Enter these parameters:

- **Credential to connect with**: Create or select an existing [ONLYOFFICE DocSpace credentials](/integrations/builtin/credentials/onlyofficedocspace.md).
- **Resource**: Select **Folder**.
- **Operation**: Select **Get Folder Contents**.
- **Folder ID**: Enter the ID of the folder you want to get the contents of. This parameter is mutually exclusive with the **Is My Documents** parameter.

### Options

- **Is My Documents**: Toggle to get the contents of your My Documents section. This parameter is mutually exclusive with the **Folder ID** parameter.
- **Query**: Enter a query to filter the contents of the folder. Leave empty to return all contents of the folder.

## Get the info of a folder

Use this operation to get the information of a folder in the portal.

Enter these parameters:

- **Credential to connect with**: Create or select an existing [ONLYOFFICE DocSpace credentials](/integrations/builtin/credentials/onlyofficedocspace.md).
- **Resource**: Select **Folder**.
- **Operation**: Select **Get Folder Info**.
- **Folder ID**: Enter the ID of the folder you want to get the information of. This parameter is mutually exclusive with the **Is My Documents** parameter.

### Options

- **Is My Documents**: Toggle to get the information of your My Documents section. This parameter is mutually exclusive with the **Folder ID** parameter.

## Get the history of a folder

Use this operation to get the history of a folder in the portal.

Enter these parameters:

- **Credential to connect with**: Create or select an existing [ONLYOFFICE DocSpace credentials](/integrations/builtin/credentials/onlyofficedocspace.md).
- **Resource**: Select **Folder**.
- **Operation**: Select **Get Folder History**.
- **Folder ID**: Enter the ID of the folder you want to get the history for.

### Options

- **From Date**: Enter the start date to filter the history of the folder. The date must be in ISO 8601 format.
- **To Date**: Enter the end date to filter the history of the folder. The date must be in ISO 8601 format.

## Get the link of a folder

Use this operation to get the link of a folder in the portal.

Enter these parameters:

- **Credential to connect with**: Create or select an existing [ONLYOFFICE DocSpace credentials](/integrations/builtin/credentials/onlyofficedocspace.md).
- **Resource**: Select **Folder**.
- **Operation**: Select **Get Folder Link**.
- **Folder ID**: Enter the ID of the folder you want to get the link for.

## Move a folder

Use this operation to move a folder to another room or folder in the portal.

Enter these parameters:

- **Credential to connect with**: Create or select an existing [ONLYOFFICE DocSpace credentials](/integrations/builtin/credentials/onlyofficedocspace.md).
- **Resource**: Select **Folder**.
- **Operation**: Select **Move Folder**.
- **Folder ID**: Enter the ID of the folder you want to move.
- **Destination ID**: Enter the ID of the room or folder where you want to move the folder. This parameter is mutually exclusive with the **To My Documents** parameter.

### Options

- **To My Documents**: Toggle to move the folder to your My Documents section. This parameter is mutually exclusive with the **Destination ID** parameter.

## Update a folder

Use this operation to update a folder in the portal.

Enter these parameters:

- **Credential to connect with**: Create or select an existing [ONLYOFFICE DocSpace credentials](/integrations/builtin/credentials/onlyofficedocspace.md).
- **Resource**: Select **Folder**.
- **Operation**: Select **Update Folder**.
- **Folder ID**: Enter the ID of the folder you want to update.
- **Title**: Enter the new title of the folder you want to update.
