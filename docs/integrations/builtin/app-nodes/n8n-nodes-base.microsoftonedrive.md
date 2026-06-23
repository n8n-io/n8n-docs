---
title: Microsoft OneDrive node documentation
description: >-
  Learn how to use the Microsoft OneDrive node in n8n. Follow technical
  documentation to integrate Microsoft OneDrive node into your workflows.
contentType:
  - integration
  - reference
priority: medium
nodeTitle: Microsoft OneDrive node documentation
originalFilePath: integrations/builtin/app-nodes/n8n-nodes-base.microsoftonedrive.md
originalUrl: >-
  https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.microsoftonedrive
url: >-
  https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.microsoftonedrive
layout:
  description:
    visible: false
---

# Microsoft OneDrive node <a href="#microsoft-onedrive-node" id="microsoft-onedrive-node"></a>

Use the Microsoft OneDrive node to automate work in Microsoft OneDrive, and integrate Microsoft OneDrive with other applications. n8n has built-in support for a wide range of Microsoft OneDrive features, including creating, updating, deleting, and getting files, and folders.

On this page, you'll find a list of operations the Microsoft OneDrive node supports and links to more resources.

{% hint style="info" %}
**Credentials**

This node supports two authentication options:

- **Microsoft Drive OAuth2 API**: the Microsoft OneDrive-specific OAuth2 credential (default).
- **Microsoft OAuth2 API**: a generic Microsoft Graph credential that you can reuse across other Microsoft nodes. When you select this option, make sure the credential is granted the scopes this node needs (for example, `Files.ReadWrite.All`).

Refer to [Microsoft credentials](../credentials/microsoft.md) for guidance on setting up authentication.
{% endhint %}

{% hint style="info" %}
**Government Cloud Support**

If you're using a government cloud tenant (US Government, US Government DOD, or China), make sure to select the appropriate **Microsoft Graph API Base URL** in your Microsoft credentials configuration.
{% endhint %}

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/hLGdVKMP8bGrbsRtVcGc/" %}

## Operations <a href="#operations" id="operations"></a>

* File
    * Copy a file
    * Delete a file
    * Download a file
    * Get a file
    * Rename a file
    * Search a file
    * Share a file
    * Upload a file up to 4MB in size
* Folder
    * Create a folder
    * Delete a folder
    * Get Children (get items inside a folder)
    * Rename a folder
    * Search a folder
    * Share a folder

## Templates and examples <a href="#templates-and-examples" id="templates-and-examples"></a>


[Browse Microsoft OneDrive node documentation integration templates](https://n8n.io/integrations/microsoft-onedrive) or [search all templates](https://n8n.io/workflows/)

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [Microsoft's OneDrive API documentation](https://learn.microsoft.com/en-us/onedrive/developer/rest-api/) for more information about the service.

## Find the folder ID <a href="#find-the-folder-id" id="find-the-folder-id"></a>

To perform operations on folders, you need to supply the ID. You can find this:

* In the URL of the folder
* By searching for it using the node. You need to do this if using MS 365 (where OneDrive uses SharePoint behind the scenes):
	1. Select **Resource** > **Folder**.
	2. Select **Operation** > **Search**.
	3. In **Query**, enter the folder name.
	4. Select **Execute step**. n8n runs the query and returns data about the folder, including an `id` field containing the folder ID.

