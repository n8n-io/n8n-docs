---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: G Suite Admin node documentation
description: Learn how to use the G Suite Admin node in n8n. Follow technical documentation to integrate G Suite Admin node into your workflows.
contentType: integration
---

# G Suite Admin node

Use the G Suite Admin node to automate work in G Suite Admin, and integrate G Suite Admin with other applications. n8n has built-in support for a wide range of G Suite Admin features, including creating, updating, deleting, and getting users, and groups. 

On this page, you'll find a list of operations the G Suite Admin node supports and links to more resources.

/// note | Credentials
Refer to [G Suite Admin credentials](/integrations/builtin/credentials/google/) for guidance on setting up authentication. 
///

## Operations

* Group
    * Create a group
    * Delete a group
    * Get a group
    * Get all groups
    * Update a group
* User
    * Create a user
    * Delete a user
    * Get a user
    * Get all users
    * Update a user

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'google-workspace-admin') ]]

## How to project a user's information

There are three different ways to project a user's information:

- **Basic**: Doesn't include any custom fields.
- **Custom**: Includes the custom fields from schemas in `customField`.
- **Full**: Include all the fields associated with the user.

To include custom fields, follow these steps:

1. Select **Custom** from the **Projection** dropdown list.
2. Select the **Add Options** button and select **Custom Schemas** from the dropdown list.
3. Select the schema names you want to include from the **Custom Schemas** dropdown list.

