---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: ONLYOFFICE DocSpace User operations
description: Documentation for the User operations in ONLYOFFICE DocSpace node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
contentType: [integration, reference]
---

# ONLYOFFICE DocSpace User operations

Use this operation to manage users in ONLYOFFICE DocSpace. Refer to [ONLYOFFICE DocSpace](/integrations/builtin/app-nodes/n8n-nodes-base.onlyofficedocspace/index.md) for more information on the ONLYOFFICE DocSpace node itself.

## Delete a user

Use this operation to delete a user from the portal.

Enter these parameters:

- **Credential to connect with**: Create or select an existing [ONLYOFFICE DocSpace credentials](/integrations/builtin/credentials/onlyofficedocspace.md).
- **Resource**: Select **User**.
- **Operation**: Select **Delete User**.
- **User ID**: Enter the ID of the user you want to delete.
    - Select **From List** to choose the user from the users that can be deleted in the portal.
    - Select **Manual** to enter the ID of the user manually.

## Disable a user

Use this operation to disable a user in the portal.

Enter these parameters:

- **Credential to connect with**: Create or select an existing [ONLYOFFICE DocSpace credentials](/integrations/builtin/credentials/onlyofficedocspace.md).
- **Resource**: Select **User**.
- **Operation**: Select **Disable User**.
- **User ID**: Enter the ID of the user you want to disable.
    - Select **From List** to choose the user from the users that can be disabled in the portal.
    - Select **Manual** to enter the ID of the user manually.

## Enable a user

Use this operation to enable a user in the portal.

Enter these parameters:

- **Credential to connect with**: Create or select an existing [ONLYOFFICE DocSpace credentials](/integrations/builtin/credentials/onlyofficedocspace.md).
- **Resource**: Select **User**.
- **Operation**: Select **Enable User**.
- **User ID**: Enter the ID of the user you want to enable.
    - Select **From List** to choose the user from the users that can be enabled in the portal.
    - Select **Manual** to enter the ID of the user manually.

## Get a user

Use this operation to get information about a user in the portal.

Enter these parameters:

- **Credential to connect with**: Create or select an existing [ONLYOFFICE DocSpace credentials](/integrations/builtin/credentials/onlyofficedocspace.md).
- **Resource**: Select **User**.
- **Operation**: Select **Get User Info**.
- **User ID**: Enter the ID of the user you want to get information about. This parameter is mutually exclusive with the **Is Me** and **User Email** parameters.
    - Select **From List** to choose the user from the users that can be accessed in the portal.
    - Select **Manual** to enter the ID of the user manually.

### Options

- **Is Me**: Toggle to indicate whether you want to get information about the user that is currently authenticated in the portal. This parameter is mutually exclusive with the **User ID** and **User Email** parameters.
- **User Email**: Enter the email address of the user you want to get information about. This parameter is mutually exclusive with the **Is Me** and **User ID** parameters.

## Invite a user

Use this operation to invite a user to the portal.

Enter these parameters:

- **Credential to connect with**: Create or select an existing [ONLYOFFICE DocSpace credentials](/integrations/builtin/credentials/onlyofficedocspace.md).
- **Resource**: Select **User**.
- **Operation**: Select **Invite User**.
- **Type**: Select the type of the user you want to invite.
- **Email**: Enter the email address of the user you want to invite.

### Options

- **Culture**: Enter the culture code to use for the invitation notification. Leave empty to use the default culture code in the portal.
    - Select **From List** to choose the culture code from the codes that can be used in the portal.
    - Select **Manual** to enter the culture code manually.

## Search for a user

Use this operation to search for a user in the portal.

Enter these parameters:

- **Credential to connect with**: Create or select an existing [ONLYOFFICE DocSpace credentials](/integrations/builtin/credentials/onlyofficedocspace.md).
- **Resource**: Select **User**.
- **Operation**: Select **Search User**.
- **Query**: Enter the search query to use for finding the user. Leave empty to return all users that can be accessed in the portal.

## Update a user

Use this operation to update a user in the portal.

Enter these parameters:

- **Credential to connect with**: Create or select an existing [ONLYOFFICE DocSpace credentials](/integrations/builtin/credentials/onlyofficedocspace.md).
- **Resource**: Select **User**.
- **Operation**: Select **Update User**.
- **User ID**: Enter the ID of the user you want to update.
    - Select **From List** to choose the user from the users that can be updated in the portal.
    - Select **Manual** to enter the ID of the user manually.
- **Type**: Select the new type of the user you want to update.
