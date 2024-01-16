---
title: Microsoft OneDrive
description: Documentation for the Microsoft OneDrive node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
contentType: integration
---

# Microsoft OneDrive

Use the Microsoft OneDrive node to automate work in Microsoft OneDrive, and integrate Microsoft OneDrive with other applications. n8n has built-in support for a wide range of Microsoft OneDrive features, including creating, updating, deleting, and getting files, and folders.

On this page, you'll find a list of operations the Microsoft OneDrive node supports and links to more resources.

/// note | Credentials
Refer to [Microsoft OneDrive credentials](/integrations/builtin/credentials/microsoft/) for guidance on setting up authentication. 
///
/// note | Examples and templates
For usage examples and templates to help you get started, take a look at n8n's [Microsoft OneDrive integrations](https://n8n.io/integrations/microsoft-onedrive/){:target="_blank" .external-link} list.
///


## Operations

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

## Related resources


Refer to [Microsoft's OneDrive API documentation](https://learn.microsoft.com/en-us/onedrive/developer/rest-api/){:target=_blank .external-link} for more information about the service.

View [example workflows and related content](https://n8n.io/integrations/microsoft-onedrive/){:target=_blank .external-link} on n8n's website.

## Find the folder ID

To perform operations on folders, you need to supply the ID. You can find this:

* In the URL of the folder
* By searching for it using the node. You need to do this if using MS 365 (where OneDrive uses Sharepoint behind the scenes):
	1. Select **Resource** > **Folder**.
	2. Select **Operation** > **Search**.
	3. In **Query**, enter the folder name.
	4. Select **Test step**. n8n runs the query and returns data about the folder, including an `id` field containing the folder ID.

