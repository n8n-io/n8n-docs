---
title: Microsoft Entra ID node documentation
description: Learn how to use the Microsoft Entra ID node in n8n. Follow technical documentation to integrate Microsoft Entra ID node into your workflows.
contentType: [integration, reference]
---

# Microsoft Entra ID node

Use the Microsoft Entra ID node to automate work in Microsoft Entra ID and integrate Microsoft Entra ID with other applications. n8n has built-in support for a wide range of Microsoft Entra ID features, which includes creating, getting, updating, and deleting users and groups, as well as adding users to and removing them from groups.

On this page, you'll find a list of operations the Microsoft Entra ID node supports, and links to more resources.

///  note  | Credentials
You can find authentication information for this node [here](/integrations/builtin/credentials/microsoftentra.md).
///


## Operations

* **Group**
	* **Create**: Create a new group
	* **Delete**: Delete an existing group
	* **Get**: Retrieve data for a specific group
	* **Get Many**: Retrieve a list of groups
	* **Update**: Update a group
* **User**
	* **Create**: Create a new user
	* **Delete**: Delete an existing user
	* **Get**: Retrieve data for a specific user
	* **Get Many**: Retrieve a list of users
	* **Update**: Update a user
	* **Add to Group**: Add user to a group
	* **Remove from Group**: Remove user from a group

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'microsoft-entra-id-azure-active-directory') ]]

## Related resources

<!-- vale from-microsoft.We = NO -->
Refer to [Microsoft Entra ID's documentation](https://learn.microsoft.com/en-us/graph/api/resources/identity-network-access-overview?view=graph-rest-1.0) for more information about the service.
<!-- vale from-microsoft.We = YES -->

--8<-- "_snippets/integrations/builtin/app-nodes/operation-not-supported.md"

## Common issues

Here are some common errors and issues with the Microsoft Entra ID node and steps to resolve or troubleshoot them.

### Updating the Allow External Senders and Auto Subscribe New Members options fails

You can't update the **Allow External Senders** and **Auto Subscribe New Members** options directly after creating a new group. You must wait after creating a group before you can change the values of these options.

When designing workflows that use multiple Microsoft Entra ID nodes to first create groups and then update these options, add a [Wait](/integrations/builtin/core-nodes/n8n-nodes-base.wait.md) node between the two operations. A Wait node configured to pause for at least two seconds allows time for the group to fully initialize. After the wait, the update operation can complete without erroring.
