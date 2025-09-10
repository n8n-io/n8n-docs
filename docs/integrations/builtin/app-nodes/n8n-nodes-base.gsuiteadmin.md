---
title: Google Workspace Admin node documentation
description: Learn how to use the Google Workspace Admin node in n8n. Follow technical documentation to integrate Google Workspace Admin node into your workflows.
contentType: [integration, reference]
---

# Google Workspace Admin node

Use the Google Workspace Admin node to automate work in Google Workspace Admin, and integrate Google Workspace Admin with other applications. n8n has built-in support for a wide range of Google Workspace Admin features, including creating, updating, deleting, and getting users, groups, and ChromeOS devices. 

On this page, you'll find a list of operations the Google Workspace Admin node supports and links to more resources.

/// note | Credentials
Refer to [Google credentials](/integrations/builtin/credentials/google/index.md) for guidance on setting up authentication. 
///

--8<-- "_snippets/integrations/builtin/app-nodes/ai-tools.md"

## Operations

* ChromeOS Device
	* Get a ChromeOS device
	* Get many ChromeOS devices
	* Update a ChromeOS device
	* Change the status of a ChromeOS device
* Group
    * Create a group
    * Delete a group
    * Get a group
    * Get many groups
    * Update a group
* User
	* Add an existing user to a group
    * Create a user
    * Delete a user
    * Get a user
    * Get many users
	* Remove a user from a group
    * Update a user

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'google-workspace-admin') ]]

## How to control which custom fields to fetch for a user

There are three different ways to control which custom fields to retrieve when getting a user's information. Use the **Custom Fields** parameter to select one of the following:

- **Don't Include**: Doesn't include any custom fields.
- **Custom**: Includes the custom fields from schemas in **Custom Schema Names or IDs**.
- **Include All**: Include all the fields associated with the user.

To include custom fields, follow these steps:

1. Select **Custom** from the **Custom Fields** dropdown list.
2. Select the schema names you want to include in the **Custom Schema Names or IDs** dropdown list.
