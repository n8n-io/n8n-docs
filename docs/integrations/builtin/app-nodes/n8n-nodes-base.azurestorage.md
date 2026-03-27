---
title: Azure Storage node documentation
description: Learn how to use the Azure Storage node in n8n. Follow technical documentation to integrate Azure Storage node into your workflows.
contentType: [integration, reference]
---

# Azure Storage node

The Azure Storage node has built-in support for a wide range of features, which includes creating, getting, and deleting blobs and containers. Use this node to automate work within the Azure Storage service or integrate it with other services in your workflow.

On this page, you'll find a list of operations the Azure Storage node supports, and links to more resources.

///  note  | Credentials
You can find authentication information for this node [here](/integrations/builtin/credentials/azurestorage.md).
///


## Operations

* **Blob**
	* **Create blob**: Create a new blob or replace an existing one.
	* **Delete blob**: Delete an existing blob.
	* **Get blob**: Retrieve data for a specific blob.
	* **Get many blobs**: Retrieve a list of blobs.
* **Container**
	* **Create container**: Create a new container.
	* **Delete container**: Delete an existing container.
	* **Get container**: Retrieve data for a specific container.
	* **Get many containers**: Retrieve a list of containers.

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'azure-storage') ]]

## Related resources

<!-- add a link to the service's documentation. This should usually go direct to the API docs -->
Refer to [Microsoft's Azure Storage documentation](https://learn.microsoft.com/en-us/rest/api/storageservices/) for more information about the service.

--8<-- "_snippets/integrations/builtin/app-nodes/operation-not-supported.md"
