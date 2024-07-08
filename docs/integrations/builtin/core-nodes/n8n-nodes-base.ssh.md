---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: SSH
description: Documentation for the SSH node in n8n, a workflow automation platform. Includes guidance on usage, and links to examples.
contentType: integration
---

# SSH

The SSH node is useful for executing commands using the Secure Shell Protocol.

/// note | Credentials
You can find authentication information for this node [here](/integrations/builtin/credentials/ssh/).
///

## Basic Operations

- **Execute** a command
- **Download** a file
- **Upload** a file

/// note | Uploading files
To attach a file for upload, you will need to use an extra node such as the [Read/Write Files from Disk](/integrations/builtin/core-nodes/n8n-nodes-base.filesreadwrite/) node or the [HTTP Request](/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/) node to pass the file as a data property.
///

## Node parameters

All operations include these parameters:

- **Credential to connect with**: Select an existing or create a new [SSH credential](/integrations/builtin/credentials/ssh/) to connect with.
- **Resource**: Select whether you want to **Execute** a command or process a **File**.
- **Operation**: Select the action you want to perform. If you selected **Command** as your resource, you can only select **Execute**. If you selected **File** as your resource, select either  **Upload** or **Download**.

The remaining parameters depend on the **Resource** and **Operation** you select.

### Execute Command parameters

- **Command**: Enter the command to execute on the remote device.
- **Working Directory**: Enter the directory where n8n should execute the command.

### Upload File parameters

- **Input Binary Field**: Enter the name of the input binary field that contains the file you want to upload.
- **Target Directory**: The directory to upload the file to. The name of the file is taken from the binary data file name. To enter a different name, use the **File Name** option. Refer to [Node options](#node-options) for more information.

### Download File parameters

- **Path**: Enter the path for the file you want to download. This path must include the file name. The downloaded file will use this file name. To use a different name, use the **File Name** option. Refer to [Node options](#node-options) for more information.
- **File Property**: Enter the name of the object property that holds the binary data you want to download.

## Node options

The **File** Resources display one node option: **File Name**.

If you select this option, any file name you enter here will override the binary data file name. This allows you to rename the file you're uploading or downloading.

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(title, 'ssh') ]]
