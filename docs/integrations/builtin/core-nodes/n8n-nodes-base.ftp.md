---
title: FTP
description: Documentation for the FTP node in n8n, a workflow automation platform. Includes guidance on usage, and links to examples.
contentType: integration
---

# FTP

The FTP node is useful to access and upload files to an FTP or SFTP server.

/// note | Credentials
You can find authentication information for this node [here](/integrations/builtin/credentials/ftp/).
///

/// note | Examples and templates
For usage examples and templates to help you get started, refer to n8n's [FTP integrations](https://n8n.io/integrations/ftp/){:target=_blank .external-link} page.
///

## Operations

- Delete a file or folder
- Download a file
- List folder content
- Rename/move a file or folder
- Upload a file

/// note | Uploading files
To attach a file for upload, you'll need to use an extra node such as the [Read/Write Files from Disk](/integrations/builtin/core-nodes/n8n-nodes-base.filesreadwrite/) node or the [HTTP Request](/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/) node to pass the file as a data property.
///

## Node parameters

Node parameters depend on the operation you select. Most operations display a common node parameter, the **Path**. Specify the remote path that you would like to connect to. This parameter isn't available when you select the **Rename** operation.

To connect to an SFTP server, use an SFTP credential. Refer to [FTP credentials](/integrations/builtin/credentials/ftp/) for more information.

### Download parameters

- **Put Output File in Field**: Only available when you select the **Download** operation. Enter the name of the output binary field to put the file in.

### List parameters
- **Recursive**: Only available when you select the **List** operation. Toggle that controls whether to return object representing all directories / objects recursively found within the FTP/SFTP server.

### Rename parameters

The rename operation adds two parameters:

- **Old Path**: Enter the existing path of the file you'd like to rename in this field.
- **New Path**: Enter the new path for the renamed file in this field.

### Upload parameters

The upload operation adds one new parameter: **Binary File**. Other parameters depend on your selection here.

If you turn this control on, the node expects you to upload a binary file and displays the **Input Binary Field**. Enter the name of the input binary field that contains the file you'll upload in this field.

If you turn the **Binary File** control off, the node displays the **File Content**. Enter the text content of the file you'll upload in this field.

## Node options

Node options depend on the operation you select.

### Delete options

The delete operation adds one new option: **Folder**. If you turn this option on, the node can delete both folders and files. This configuration also displays one more option:

- **Recursive**: If you turn this option on and you delete a folder or directory, the node will delete all files and directories within the target directory.

### Rename options

The rename operation adds one new option: **Create Directories**. If you turn this option on, the node will recursively create the destination directory when renaming an existing file or folder.