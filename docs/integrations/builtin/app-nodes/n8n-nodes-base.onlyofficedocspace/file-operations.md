---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: ONLYOFFICE DocSpace File operations
description: Documentation for the File operations in ONLYOFFICE DocSpace node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
contentType: [integration, reference]
---

# ONLYOFFICE DocSpace File operations

Use this operation to manage files in ONLYOFFICE DocSpace. Refer to [ONLYOFFICE DocSpace](/integrations/builtin/app-nodes/n8n-nodes-base.onlyofficedocspace/index.md) for more information on the ONLYOFFICE DocSpace node itself.

## Copy a file

Use this operation to copy a file to the portal.

Enter these parameters:

- **Credential to connect with**: Create or select an existing [ONLYOFFICE DocSpace credentials](/integrations/builtin/credentials/onlyofficedocspace.md).
- **Resource**: Select **File**.
- **Operation**: Select **Copy File**.
- **File ID**: Enter the ID of the file you want to copy.
- **Destination ID**: Enter the ID of the room or folder where you want to copy the file. This parameter is mutually exclusive with the **To My Documents** parameter.

### Options

- **To My Documents**: Toggle to copy the file to your My Documents section. This parameter is mutually exclusive with the **Destination ID** parameter.

## Create a file

Use this operation to create an empty file in the portal.

Enter these parameters:

- **Credential to connect with**: Create or select an existing [ONLYOFFICE DocSpace credentials](/integrations/builtin/credentials/onlyofficedocspace.md).
- **Resource**: Select **File**.
- **Operation**: Select **Create File**.
- **Parent ID**: Enter the ID of the room or folder where you want to create the file. This parameter is mutually exclusive with the **In My Documents** parameter.
- **Type**: Select the type of the file you want to create.
- **Title**: Enter the title of the file you want to create.

### Options

- **In My Documents**: Toggle to create the file in your My Documents section. This parameter is mutually exclusive with the **Parent ID** parameter.

## Delete a file

Use this operation to delete a file from the portal.

Enter these parameters:

- **Credential to connect with**: Create or select an existing [ONLYOFFICE DocSpace credentials](/integrations/builtin/credentials/onlyofficedocspace.md).
- **Resource**: Select **File**.
- **Operation**: Select **Delete File**.
- **File ID**: Enter the ID of the file you want to delete.

## Download a file

Use this operation to download a file from the portal.

Enter these parameters:

- **Credential to connect with**: Create or select an existing [ONLYOFFICE DocSpace credentials](/integrations/builtin/credentials/onlyofficedocspace.md).
- **Resource**: Select **File**.
- **Operation**: Select **Download File**.
- **File ID**: Enter the ID of the file you want to download.

### Options

- **As Text**: Toggle to download the file as text. When toggled on, the file will be downloaded as `.csv` or `.txt`, depending on the original file format. This parameter is mutually exclusive with the **Output Format** parameter.
- **Output Format**: Enter the output format of the file you want to download. Leave this parameter empty to download the file in its original format. This parameter is mutually exclusive with the **As Text** parameter.
    - Select **From List** to choose the output format from the formats in which the file you specified in the **File ID** parameter can be converted.
    - Select **Manual** to enter the output format manually.
- **Put Output File in Field**: Enter the field name to place the binary file contents to make it available to following nodes.

## Get the info of a file

Use this operation to get the information about a file in the portal.

Enter these parameters:

- **Credential to connect with**: Create or select an existing [ONLYOFFICE DocSpace credentials](/integrations/builtin/credentials/onlyofficedocspace.md).
- **Resource**: Select **File**.
- **Operation**: Select **Get File Info**.
- **File ID**: Enter the ID of the file you want to get information about.

## Get the link of a file

Use this operation to get the link to a file in the portal.

Enter these parameters:

- **Credential to connect with**: Create or select an existing [ONLYOFFICE DocSpace credentials](/integrations/builtin/credentials/onlyofficedocspace.md).
- **Resource**: Select **File**.
- **Operation**: Select **Get File Link**.
- **File ID**: Enter the ID of the file you want to get the link for.

## Move a file

Use this operation to move a file to another room or folder in the portal.

Enter these parameters:

- **Credential to connect with**: Create or select an existing [ONLYOFFICE DocSpace credentials](/integrations/builtin/credentials/onlyofficedocspace.md).
- **Resource**: Select **File**.
- **Operation**: Select **Move File**.
- **File ID**: Enter the ID of the file you want to move.
- **Destination ID**: Enter the ID of the room or folder where you want to move the file. This parameter is mutually exclusive with the **To My Documents** parameter.

### Options

- **To My Documents**: Toggle to move the file to your My Documents section. This parameter is mutually exclusive with the **Destination ID** parameter.

## Update a file

Use this operation to update a file in the portal.

Enter these parameters:

- **Credential to connect with**: Create or select an existing [ONLYOFFICE DocSpace credentials](/integrations/builtin/credentials/onlyofficedocspace.md).
- **Resource**: Select **File**.
- **Operation**: Select **Update File**.
- **File ID**: Enter the ID of the file you want to update.
- **Title**: Enter the new title of the file you want to update.

## Upload a file

Use this operation to upload a file to the portal.

Enter these parameters:

- **Credential to connect with**: Create or select an existing [ONLYOFFICE DocSpace credentials](/integrations/builtin/credentials/onlyofficedocspace.md).
- **Resource**: Select **File**.
- **Operation**: Select **Upload File**.
- **Parent ID**: Enter the ID of the room or folder where you want to upload the file. This parameter is mutually exclusive with the **To My Documents** parameter.
- **Binary File**: Toggle to upload a data from a binary field. This parameter is mutually exclusive with the **File Content** parameter.

### Options

- **To My Documents**: Toggle to upload the file to your My Documents section. This parameter is mutually exclusive with the **Parent ID** parameter.
- **File Name**: Enter the name of the file with a file extension you want to upload. Leave this parameter empty to use the file name from the binary field. When using the **File Content** parameter, this parameter is mandatory.
- **File Content**: Enter the file content to upload. This parameter is mutually exclusive with the **Binary File** parameter.
- **Input Binary Field**: Enter the name of the binary field to upload. This parameter is mutually exclusive with the **File Content** parameter.
