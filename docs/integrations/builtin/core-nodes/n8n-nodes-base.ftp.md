---
title: FTP
description: >-
  Documentation for the FTP node in n8n, a workflow automation platform.
  Includes guidance on usage, and links to examples.
contentType:
  - integration
  - reference
priority: medium
nodeTitle: FTP
originalFilePath: integrations/builtin/core-nodes/n8n-nodes-base.ftp.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.ftp'
url: 'https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.ftp'
layout:
  description:
    visible: false
---

# FTP <a href="#ftp" id="ftp"></a>

The FTP node is useful to access and upload files to an FTP or SFTP server.

{% hint style="info" %}
**Credentials**

You can find authentication information for this node [here](../credentials/ftp.md).
{% endhint %}

To connect to an SFTP server, use an SFTP credential. Refer to [FTP credentials](../credentials/ftp.md) for more information.

## Operations <a href="#operations" id="operations"></a>

- [**Delete**](#delete) a file or folder
- [**Download**](#download) a file
- [**List**](#list) folder content
- [**Rename**](#rename) or move a file or folder
- [**Upload**](#upload) a file

{% hint style="info" %}
**Uploading files**

To attach a file for upload, you'll need to use an extra node such as the [Read/Write Files from Disk](n8n-nodes-base.readwritefile.md) node or the [HTTP Request](n8n-nodes-base.httprequest/README.md) node to pass the file as a data property.
{% endhint %}

## Delete <a href="#delete" id="delete"></a>

This operation includes one parameter: **Path**. Enter the remote path that you would like to connect to.

### Delete options <a href="#delete-options" id="delete-options"></a>

The delete operation adds one new option: **Folder**. If you turn this option on, the node can delete both folders and files. This configuration also displays one more option:

- **Recursive**: If you turn this option on and you delete a folder or directory, the node will delete all files and directories within the target directory.

## Download <a href="#download" id="download"></a>

Configure this operation with these parameters:

* **Path**: Enter the remote path that you would like to connect to.
* **Put Output File in Field**: Enter the name of the output binary field to put the file in.

{% hint style="info" %}
**Concurrent Reads with SFTP**

When using SFTP, you can enable concurrent reads. This improves download speeds but may not be supported by all SFTP servers.
{% endhint %}

## List <a href="#list" id="list"></a>

Configure this operation with these parameters:

* **Path**: Enter the remote path that you would like to connect to.
* **Recursive**: Select whether to return an object representing all directories / objects recursively found within the FTP/SFTP server (turned on) or not (turned off).

## Rename <a href="#rename" id="rename"></a>

Configure this operation with these parameters:

- **Old Path**: Enter the existing path of the file you'd like to rename in this field.
- **New Path**: Enter the new path for the renamed file in this field.

### Rename options <a href="#rename-options" id="rename-options"></a>

This operation adds one new option: **Create Directories**. If you turn this option on, the node will recursively create the destination directory when renaming an existing file or folder.

## Upload <a href="#upload" id="upload"></a>

Configure this operation with these parameters:

* **Path**: Enter the remote path that you would like to connect to.
* **Binary File**: Select whether you'll upload a binary file (turned on) or enter text content to be uploaded (turned off). Other parameters depend on your selection in this field.
    * **Input Binary Field**: Displayed if you turn on **Binary File**. Enter the name of the input binary field that contains the file you'll upload in this field.
    * **File Content**: Displayed if you turn off **Binary File** Enter the text content of the file you'll upload in this field.

{% hint style="info" %}
**Uploading files**

To attach a file for upload, you'll need to use an extra node such as the [Read/Write Files from Disk](n8n-nodes-base.readwritefile.md) node or the [HTTP Request](n8n-nodes-base.httprequest/README.md) node to pass the file as a data property.
{% endhint %}

## Templates and examples <a href="#templates-and-examples" id="templates-and-examples"></a>


[Browse FTP integration templates](https://n8n.io/integrations/ftp) or [search all templates](https://n8n.io/workflows/)
