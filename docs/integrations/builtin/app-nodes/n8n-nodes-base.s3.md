---
title: S3
description: Documentation for the S3 node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
contentType: integration
---

# S3

Use the S3 node to automate work in S3, and integrate S3 with other applications. n8n has built-in support for a wide range of S3 features, including creating, deleting, and getting buckets, files, and folders. 

On this page, you'll find a list of operations the S3 node supports and links to more resources.

!!! note "Credentials"
    Refer to [S3 credentials](/integrations/builtin/credentials/s3/) for guidance on setting up authentication. 

!!! note "Examples and templates"
    For usage examples and templates to help you get started, take a look at n8n's [S3 integrations](https://n8n.io/integrations/s3/){:target="_blank" .external-link} list.


## Operations

* Bucket
    * Create a bucket
    * Delete a bucket
    * Get all buckets
    * Search within a bucket
* File
    * Copy a file
    * Delete a file
    * Download a file
    * Get all files
    * Upload a file
* Folder
    * Create a folder
    * Delete a folder
    * Get all folders

**Note:** To attach a file for upload, you will need to use an additional node such as the [Read Binary File](/integrations/builtin/core-nodes/n8n-nodes-base.readbinaryfile/) node or the [HTTP Request](/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/) node to pass the file as a data property.


## Node reference

### Setting file permissions in Wasabi

When uploading files to [Wasabi](https://wasabi.com/), permissions for the files must be set using the **ACL** dropdown and not the toggles.

![File permissions when using the S3 node with Wasabi](/_images/integrations/builtin/app-nodes/s3/acl_dropdown.png)

