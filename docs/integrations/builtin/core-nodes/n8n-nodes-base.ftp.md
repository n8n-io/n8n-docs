---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: FTP
description: Documentation for the FTP node in n8n, a workflow automation platform. Includes guidance on usage, and links to examples.
contentType: integration
priority: medium
---

# FTP

The FTP node is useful to access and upload files to an FTP or SFTP server.

/// note | Credentials
You can find authentication information for this node [here](/integrations/builtin/credentials/ftp/).
///

To connect to an SFTP server, use an SFTP credential. Refer to [FTP credentials](/integrations/builtin/credentials/ftp/) for more information.

## Operations

- [**Delete**](#delete) a file or folder
- [**Download**](#download) a file
- [**List**](#list) folder content
- [**Rename**](#rename) or move a file or folder
- [**Upload**](#upload) a file

/// note | Uploading files
To attach a file for upload, you'll need to use an extra node such as the [Read/Write Files from Disk](/integrations/builtin/core-nodes/n8n-nodes-base.readwritefile/) node or the [HTTP Request](/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/) node to pass the file as a data property.
///

## Delete

This operation includes one parameter: **Path**. Enter the remote path that you would like to connect to.

### Delete options

The delete operation adds one new option: **Folder**. If you turn this option on, the node can delete both folders and files. This configuration also displays one more option:

- **Recursive**: If you turn this option on and you delete a folder or directory, the node will delete all files and directories within the target directory.

## Download

Configure this operation with these parameters:

* **Path**: Enter the remote path that you would like to connect to.
* **Put Output File in Field**: Enter the name of the output binary field to put the file in.

## List

Configure this operation with these parameters:

* **Path**: Enter the remote path that you would like to connect to.
* **Recursive**: Select whether to return an object representing all directories / objects recursively found within the FTP/SFTP server (turned on) or not (turned off).

## Rename

Configure this operation with these parameters:

- **Old Path**: Enter the existing path of the file you'd like to rename in this field.
- **New Path**: Enter the new path for the renamed file in this field.

### Rename options

This operation adds one new option: **Create Directories**. If you turn this option on, the node will recursively create the destination directory when renaming an existing file or folder.

## Upload

Configure this operation with these parameters:

* **Path**: Enter the remote path that you would like to connect to.
* **Binary File**: Select whether you'll upload a binary file (turned on) or enter text content to be uploaded (turned off). Other parameters depend on your selection in this field.
    * **Input Binary Field**: Displayed if you turn on **Binary File**. Enter the name of the input binary field that contains the file you'll upload in this field.
    * **File Content**: Displayed if you turn off **Binary File** Enter the text content of the file you'll upload in this field.

/// note | Uploading files
To attach a file for upload, you'll need to use an extra node such as the [Read/Write Files from Disk](/integrations/builtin/core-nodes/n8n-nodes-base.readwritefile/) node or the [HTTP Request](/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/) node to pass the file as a data property.
///

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'ftp') ]]
