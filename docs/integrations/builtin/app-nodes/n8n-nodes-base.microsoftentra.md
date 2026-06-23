---
title: Microsoft Entra ID node documentation
description: >-
  Learn how to use the Microsoft Entra ID node in n8n. Follow technical
  documentation to integrate Microsoft Entra ID node into your workflows.
contentType:
  - integration
  - reference
nodeTitle: Microsoft Entra ID node documentation
originalFilePath: integrations/builtin/app-nodes/n8n-nodes-base.microsoftentra.md
originalUrl: >-
  https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.microsoftentra
url: >-
  https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.microsoftentra
layout:
  description:
    visible: false
---

# Microsoft Entra ID node <a href="#microsoft-entra-id-node" id="microsoft-entra-id-node"></a>

Use the Microsoft Entra ID node to automate work in Microsoft Entra ID and integrate Microsoft Entra ID with other applications. n8n has built-in support for a wide range of Microsoft Entra ID features, which includes creating, getting, updating, and deleting users and groups, as well as adding users to and removing them from groups.

On this page, you'll find a list of operations the Microsoft Entra ID node supports, and links to more resources.

{% hint style="info" %}
**Credentials**

You can find authentication information for this node [here](../credentials/microsoftentra.md).
{% endhint %}

{% hint style="info" %}
**Government Cloud Support**

If you're using a government cloud tenant (US Government, US Government DOD, or China), make sure to select the appropriate **Microsoft Graph API Base URL** in your Microsoft Entra ID credentials configuration.
{% endhint %}


## Operations <a href="#operations" id="operations"></a>

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

## Templates and examples <a href="#templates-and-examples" id="templates-and-examples"></a>


[Browse Microsoft Entra ID node documentation integration templates](https://n8n.io/integrations/microsoft-entra-id-azure-active-directory) or [search all templates](https://n8n.io/workflows/)

## Related resources <a href="#related-resources" id="related-resources"></a>


Refer to [Microsoft Entra ID's documentation](https://learn.microsoft.com/en-us/graph/api/resources/identity-network-access-overview?view=graph-rest-1.0) for more information about the service.


{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/lMIxsgtfHVazfAS7oe1v/" %}

## Common issues <a href="#common-issues" id="common-issues"></a>

Here are some common errors and issues with the Microsoft Entra ID node and steps to resolve or troubleshoot them.

### Updating the Allow External Senders and Auto Subscribe New Members options fails <a href="#updating-the-allow-external-senders-and-auto-subscribe-new-members-options-fails" id="updating-the-allow-external-senders-and-auto-subscribe-new-members-options-fails"></a>

You can't update the **Allow External Senders** and **Auto Subscribe New Members** options directly after creating a new group. You must wait after creating a group before you can change the values of these options.

When designing workflows that use multiple Microsoft Entra ID nodes to first create groups and then update these options, add a [Wait](../core-nodes/n8n-nodes-base.wait.md) node between the two operations. A Wait node configured to pause for at least two seconds allows time for the group to fully initialize. After the wait, the update operation can complete without erroring.
