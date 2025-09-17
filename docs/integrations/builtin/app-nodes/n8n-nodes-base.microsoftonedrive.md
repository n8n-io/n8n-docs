---
title: Microsoft OneDrive node documentation
description: Learn how to use the Microsoft OneDrive node in n8n. Follow technical documentation to integrate Microsoft OneDrive node into your workflows.
contentType: [integration, reference]
priority: medium
---

# Microsoft OneDrive node

Use the Microsoft OneDrive node to automate work in Microsoft OneDrive, and integrate Microsoft OneDrive with other applications. n8n has built-in support for a wide range of Microsoft OneDrive features, including creating, updating, deleting, and getting files, and folders.

On this page, you'll find a list of operations the Microsoft OneDrive node supports and links to more resources.

/// note | Credentials
Refer to [Microsoft credentials](/integrations/builtin/credentials/microsoft.md) for guidance on setting up authentication.
///

--8<-- "_snippets/integrations/builtin/app-nodes/ai-tools.md"

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

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'microsoft-onedrive') ]]

## Related resources

Refer to [Microsoft's OneDrive API documentation](https://learn.microsoft.com/en-us/onedrive/developer/rest-api/) for more information about the service.

## Find the folder ID

To perform operations on folders, you need to supply the ID. You can find this:

* In the URL of the folder
* By searching for it using the node. You need to do this if using MS 365 (where OneDrive uses SharePoint behind the scenes):
	1. Select **Resource** > **Folder**.
	2. Select **Operation** > **Search**.
	3. In **Query**, enter the folder name.
	4. Select **Execute step**. n8n runs the query and returns data about the folder, including an `id` field containing the folder ID.

