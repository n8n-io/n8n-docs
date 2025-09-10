---
title: Microsoft SharePoint node documentation
description: Learn how to use the Microsoft SharePoint node in n8n. Follow technical documentation to integrate Microsoft SharePoint node into your workflows.
contentType: [integration, reference]
---

# Microsoft SharePoint node

Use the Microsoft SharePoint node to automate work in Microsoft SharePoint and integrate Microsoft SharePoint with other applications. n8n has built-in support for a wide range of Microsoft SharePoint features, which includes downloading, uploading, and updating files, managing items in a list, and getting lists and list items.

On this page, you'll find a list of operations the Microsoft SharePoint node supports, and links to more resources.

///  note  | Credentials
You can find authentication information for this node [here](/integrations/builtin/credentials/microsoft.md).
///


## Operations

<!-- To avoid warning about "many" -->
<!-- vale from-write-good.Weasel = NO -->
* **File**:
	* Download: Download a file.
	* Update: Update a file.
	* Upload: Upload an existing file.
* **Item**:
	* Create: Create an item in an existing list.
	* Create or Update: Create a new item, or update the current one if it already exists (upsert).
	* Delete: Delete an item from a list.
	* Get: Retrieve an item from a list.
	* Get Many: Get specific items in a list or list many items.
	* Update: Update an item in an existing list.
* **List**:
	* Get: Retrieve details of a single list.
	* Get Many: Retrieve a list of lists.
<!-- vale from-write-good.Weasel = YES -->

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'microsoft-sharepoint') ]]

## Related resources

<!-- add a link to the service's documentation. This should usually go direct to the API docs -->
Refer to [Microsoft's SharePoint documentation](https://learn.microsoft.com/en-us/sharepoint/dev/sp-add-ins/get-to-know-the-sharepoint-rest-service) for more information about the service.

