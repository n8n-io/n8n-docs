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

/// note | Examples and templates
For usage examples and templates to help you get started, refer to n8n's [SSH integrations](https://n8n.io/integrations/ssh/){:target=_blank .external-link} page.
///

## Basic Operations

- Execute a command
- Download a file
- Upload a file

**Note:** To attach a file for upload, you will need to use an additional node such as the [Read/Write Files from Disk](/integrations/builtin/core-nodes/n8n-nodes-base.filesreadwrite/) node or the [HTTP Request](/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/) node to pass the file as a data property.

## Node Reference

- ***Authentication:*** A dropdown list to choose between Password or Private Key authentication.
- ***Resource:*** A dropdown list used to specify if you are executing a command or processing a file.
- ***Operation:*** A dropdown list to select the action to be performed. When selecting **Command** as the ***Resource***, only **Execute** is available. For a **File** ***Resource*** you can select either **Upload** or **Download**.
- ***Command:*** Only visible for **Command** resources. The command to execute on the remote machine.
- ***Working Directory:*** Only visible for **Command** resources. The directory where the command should be executed.
- ***Path:*** Only visible for **Download** operation on file resources. The path where the desired file is found.
- ***Binary Property:*** Only visible for file resources. The name of the binary property which contains the data for the file to be uploaded.
- ***Target Directory:*** Only visible for **Upload** operations on file resources. The directory to upload the file to. The name of the file doesn'tneed to be specified, it's taken from the binary data file name. To override this behavior, set the parameter **File Name** under options.
