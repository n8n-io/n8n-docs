---
title: S3 node documentation
contentType:
  - integration
  - reference
priority: medium
nodeTitle: S3 node documentation
originalFilePath: integrations/builtin/app-nodes/n8n-nodes-base.s3.md
originalUrl: https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.s3
url: https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.s3
description: >-
  Learn how to use the S3 node in n8n. Follow technical documentation to
  integrate S3 node into your workflows.
layout:
  width: default
  title:
    visible: true
  description:
    visible: false
  tableOfContents:
    visible: true
  outline:
    visible: true
  pagination:
    visible: true
  metadata:
    visible: true
  tags:
    visible: true
  actions:
    visible: true
---

# S3

Use the S3 node to automate work in non-AWS S3 storage and integrate S3 with other applications. n8n has built-in support for a wide range of S3 features, including creating, deleting, and getting buckets, files, and folders. For AWS S3, use [AWS S3](n8n-nodes-base.awss3.md).

Use the S3 node for non-AWS S3 solutions like:

* [MinIO](https://min.io/)
* [Wasabi](https://wasabi.com/)
* [Digital Ocean spaces](https://www.digitalocean.com/products/spaces)

On this page, you'll find a list of operations the S3 node supports and links to more resources.

{% hint style="info" %}
**Credentials**

Refer to [S3 credentials](../credentials/s3.md) for guidance on setting up authentication.
{% endhint %}

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/hLGdVKMP8bGrbsRtVcGc/" %}

## Operations <a href="#operations" id="operations"></a>

* Bucket
  * Create a bucket
  * Delete a bucket
  * Get all buckets
  * Search within a bucket
*   File<br>

    * Copy a file
    * Delete a file
    * Download a file
    * Get all files
    * Upload a file

    <div data-gb-custom-block data-tag="hint" data-style="info" class="hint hint-info"><p><strong>Attach file for upload</strong></p><p>To attach a file for upload, use another node to pass the file as a data property. Nodes like the <a href="../core-nodes/n8n-nodes-base.readwritefile.md">Read/Write Files from Disk</a> node or the <a href="../core-nodes/n8n-nodes-base.httprequest/">HTTP Request</a> work well.</p></div>
* Folder
  * Create a folder
  * Delete a folder
  * Get all folders

## Templates and examples <a href="#templates-and-examples" id="templates-and-examples"></a>

[Browse S3 node documentation integration templates](https://n8n.io/integrations/s3) or [search all templates](https://n8n.io/workflows/)

## Node reference <a href="#node-reference" id="node-reference"></a>

### Setting file permissions in Wasabi <a href="#setting-file-permissions-in-wasabi" id="setting-file-permissions-in-wasabi"></a>

When uploading files to [Wasabi](https://wasabi.com/), you must set permissions for the files using the **ACL** dropdown and not the toggles.

![File permissions when using the S3 node with Wasabi](../../.gitbook/assets/acl_dropdown.png)
