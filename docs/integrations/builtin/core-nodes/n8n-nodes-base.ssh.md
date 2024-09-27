---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: SSH
description: Documentation for the SSH node in n8n, a workflow automation platform. Includes guidance on usage, and links to examples.
contentType: integration
priority: medium
---

# SSH

The SSH node is useful for executing commands using the Secure Shell Protocol.

/// note | Credentials
You can find authentication information for this node [here](/integrations/builtin/credentials/ssh/).
///

## Operations

- [**Execute** a command](#execute-command)
- [**Download** a file](#download-file)
- [**Upload** a file](#upload-file)

/// note | Uploading files
To attach a file for upload, you will need to use an extra node such as the [Read/Write Files from Disk](/integrations/builtin/core-nodes/n8n-nodes-base.readwritefile/) node or the [HTTP Request](/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/) node to pass the file as a data property.
///

### Execute Command

Configure this operation with these parameters:

- **Credential to connect with**: Select an existing or create a new [SSH credential](/integrations/builtin/credentials/ssh/) to connect with.
- **Command**: Enter the command to execute on the remote device.
- **Working Directory**: Enter the directory where n8n should execute the command.

### Download File

- **Credential to connect with**: Select an existing or create a new [SSH credential](/integrations/builtin/credentials/ssh/) to connect with.
- **Path**: Enter the path for the file you want to download. This path must include the file name. The downloaded file will use this file name. To use a different name, use the **File Name** option. Refer to [Node options](#node-options) for more information.
- **File Property**: Enter the name of the object property that holds the binary data you want to download.

#### Download File options

You can further configure this operation with the **File Name** option. Use this option to override the binary data file name to a name of your choice.

### Upload File

- **Credential to connect with**: Select an existing or create a new [SSH credential](/integrations/builtin/credentials/ssh/) to connect with.
- **Input Binary Field**: Enter the name of the input binary field that contains the file you want to upload.
- **Target Directory**: The directory to upload the file to. The name of the file is taken from the binary data file name. To enter a different name, use the **File Name** option. Refer to [Node options](#node-options) for more information.

#### Upload File options

You can further configure this operation with the **File Name** option. Use this option to override the binary data file name to a name of your choice.

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'ssh') ]]
