---
title: SSH
description: >-
  Documentation for the SSH node in n8n, a workflow automation platform.
  Includes guidance on usage, and links to examples.
contentType:
  - integration
  - reference
priority: medium
nodeTitle: SSH
originalFilePath: integrations/builtin/core-nodes/n8n-nodes-base.ssh.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.ssh'
url: 'https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.ssh'
layout:
  description:
    visible: false
---

# SSH <a href="#ssh" id="ssh"></a>

The SSH node is useful for executing commands using the Secure Shell Protocol.

{% hint style="info" %}
**Credentials**

You can find authentication information for this node [here](../credentials/ssh.md).
{% endhint %}

## Operations <a href="#operations" id="operations"></a>

- [**Execute** a command](#execute-command)
- [**Download** a file](#download-file)
- [**Upload** a file](#upload-file)

{% hint style="info" %}
**Uploading files**

To attach a file for upload, you will need to use an extra node such as the [Read/Write Files from Disk](n8n-nodes-base.readwritefile.md) node or the [HTTP Request](n8n-nodes-base.httprequest/README.md) node to pass the file as a data property.
{% endhint %}

### Execute Command <a href="#execute-command" id="execute-command"></a>

Configure this operation with these parameters:

- **Credential to connect with**: Select an existing or create a new [SSH credential](../credentials/ssh.md) to connect with.
- **Command**: Enter the command to execute on the remote device.
- **Working Directory**: Enter the directory where n8n should execute the command.

### Download File <a href="#download-file" id="download-file"></a>

- **Credential to connect with**: Select an existing or create a new [SSH credential](../credentials/ssh.md) to connect with.
- **Path**: Enter the path for the file you want to download. This path must include the file name. The downloaded file will use this file name. To use a different name, use the **File Name** option. Refer to [Download File options](#download-file-options) for more information.
- **File Property**: Enter the name of the object property that holds the binary data you want to download.

#### Download File options <a href="#download-file-options" id="download-file-options"></a>

You can further configure this operation with the **File Name** option. Use this option to override the binary data file name to a name of your choice.

### Upload File <a href="#upload-file" id="upload-file"></a>

- **Credential to connect with**: Select an existing or create a new [SSH credential](../credentials/ssh.md) to connect with.
- **Input Binary Field**: Enter the name of the input binary field that contains the file you want to upload.
- **Target Directory**: The directory to upload the file to. The name of the file is taken from the binary data file name. To enter a different name, use the **File Name** option. Refer to [Upload File options](#upload-file-options) for more information.

#### Upload File options <a href="#upload-file-options" id="upload-file-options"></a>

You can further configure this operation with the **File Name** option. Use this option to override the binary data file name to a name of your choice.

## Templates and examples <a href="#templates-and-examples" id="templates-and-examples"></a>


[Browse SSH integration templates](https://n8n.io/integrations/ssh) or [search all templates](https://n8n.io/workflows/)
