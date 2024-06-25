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

Node parameters depend on the operation you select:

- **Path**: Specify the remote path that you would like to connect to. Not available when you select the **Rename** operation.
- **Put Output File in Field**: Only available when you select the **Download** operation. Enter the name of the output binary field to put the file in.
- **Recursive**: Only available when you select the **List** operation. Toggle that controls whether to return object representing all directories / objects recursively found within the FTP/SFTP server.
- **Old Path**: Only available when you select the **Rename** operation. Enter the existing path of the file you'd like to rename.
- **New Path**: Only available when you select the **Rename** operation. Enter the new path for the renamed path.
- **Binary File**: Only available when you select the **Upload** operation. When turned on, the node expects you to upload a binary file.
    - **File Content**: Only available when you turn off **Binary File**. Enter the text content of the file you'll upload.
    - **Input Binary Field**: Only available when you turn on **Binary File**. Enter the name of the input binary field that contains the file you'll upload.

To connect to an SFTP server, use an SFTP credential. Refer to [FTP credentials](/integrations/builtin/credentials/ftp/) for more information.

## Node options

Node options depend on the operation you select:

- **Folder**: Only available when you select the **Delete** operation. When turned on, the node can delete both folders and files.
    - **Recursive**: Only available when you select the **Delete** operation and turn on the **Folder** toggle. When turned on, the node will delete all files and directories in the target directory. 
- **Create Directories**: Only available when you select the **Rename** operation. When turned on, the node will recursively create the destination directory when renaming an existing file or folder.