---
title: FTP
description: Documentation for the FTP node in n8n, a workflow automation platform. Includes guidance on usage, and links to examples.
contentType: integration
---

# FTP

The FTP node is useful to access and upload files to an FTP server.

/// note | Credentials
You can find authentication information for this node [here](/integrations/builtin/credentials/ftp/).
///

/// note | Examples and templates
For usage examples and templates to help you get started, refer to n8n's [FTP integrations](https://n8n.io/integrations/ftp/){:target=_blank .external-link} page.
///

## Basic Operations

- Delete a file
- Download a file
- List contents of a folder
- Rename/move content from old path to new path
- Upload a file

**Note:** To attach a file for upload, you will need to use an additional node such as the [Read/Write Files from Disk](/integrations/builtin/core-nodes/n8n-nodes-base.filesreadwrite/) node or the [HTTP Request](/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/) node to pass the file as a data property.

## Node Reference

- ***Protocol:*** A dropdown list to choose between the FTP or SFTP protocol.
- ***Path:*** A field used to specify the remote path that you would like to connect to.
- ***Recursive:*** A toggle that can be used to include all subdirectories and files.


