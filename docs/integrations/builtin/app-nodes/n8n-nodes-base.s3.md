---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: S3 node documentation
description: Learn how to use the S3 node in n8n. Follow technical documentation to integrate S3 node into your workflows.
contentType: integration
priority: medium
---

# S3 node

Use the S3 node to automate work in non-AWS S3 storage and integrate S3 with other applications. n8n has built-in support for a wide range of S3 features, including creating, deleting, and getting buckets, files, and folders. For AWS S3, use [AWS S3](/integrations/builtin/app-nodes/n8n-nodes-base.awss3/).

Use the S3 node for non-AWS S3 solutions like:

* [MinIO](https://min.io/){:target="_blank" .external-link}
* [Wasabi](https://wasabi.com/){:target="_blank" .external-link}
* [Digital Ocean spaces](https://www.digitalocean.com/products/spaces){:target="_blank" .external-link}

On this page, you'll find a list of operations the S3 node supports and links to more resources.

/// note | Credentials
Refer to [S3 credentials](/integrations/builtin/credentials/s3/) for guidance on setting up authentication.
///

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

    /// note | Attach file for upload
    To attach a file for upload, use another node to pass the file as a data property. Nodes like the [Read/Write Files from Disk](/integrations/builtin/core-nodes/n8n-nodes-base.readwritefile/) node or the [HTTP Request](/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/) work well.
    ///

* Folder
    * Create a folder
    * Delete a folder
    * Get all folders

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 's3') ]]

## Node reference

### Setting file permissions in Wasabi

When uploading files to [Wasabi](https://wasabi.com/){:target="_blank" .external-link}, you must set permissions for the files using the **ACL** dropdown and not the toggles.

![File permissions when using the S3 node with Wasabi](/_images/integrations/builtin/app-nodes/s3/acl_dropdown.png)
