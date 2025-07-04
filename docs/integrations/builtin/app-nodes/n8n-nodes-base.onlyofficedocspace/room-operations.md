---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: ONLYOFFICE DocSpace Room operations
description: Documentation for the Room operations in ONLYOFFICE DocSpace node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
contentType: [integration, reference]
---

# ONLYOFFICE DocSpace Room operations

Use this operation to manage rooms in ONLYOFFICE DocSpace. Refer to [ONLYOFFICE DocSpace](/integrations/builtin/app-nodes/n8n-nodes-base.onlyofficedocspace/index.md) for more information on the ONLYOFFICE DocSpace node itself.

## Archive a room

Use this operation to archive a room in the portal.

Enter these parameters:

- **Credential to connect with**: Create or select an existing [ONLYOFFICE DocSpace credentials](/integrations/builtin/credentials/onlyofficedocspace.md).
- **Resource**: Select **Room**.
- **Operation**: Select **Archive Room**.
- **Room ID**: Enter the ID of the room you want to archive.
    - Select **From List** to choose the room from the rooms that can be archived in the portal.
    - Select **Manual** to enter the ID of the room manually.

## Create a room

Use this operation to create a new room in the portal.

Enter these parameters:

- **Credential to connect with**: Create or select an existing [ONLYOFFICE DocSpace credentials](/integrations/builtin/credentials/onlyofficedocspace.md).
- **Resource**: Select **Room**.
- **Operation**: Select **Create Room**.
- **Title**: Enter the title of the room you want to create.
- **Type**: Select the type of the room you want to create.

## Get the info of a room

Use this operation to get information about a room in the portal.

Enter these parameters:

- **Credential to connect with**: Create or select an existing [ONLYOFFICE DocSpace credentials](/integrations/builtin/credentials/onlyofficedocspace.md).
- **Resource**: Select **Room**.
- **Operation**: Select **Get Room Info**.
- **Room ID**: Enter the ID of the room you want to get information about.
    - Select **From List** to choose the room from the rooms that can be accessed in the portal.
    - Select **Manual** to enter the ID of the room manually.

## Get the link of a room

Use this operation to get the link to a room in the portal.

Enter these parameters:

- **Credential to connect with**: Create or select an existing [ONLYOFFICE DocSpace credentials](/integrations/builtin/credentials/onlyofficedocspace.md).
- **Resource**: Select **Room**.
- **Operation**: Select **Get Room Link**.
- **Room ID**: Enter the ID of the room you want to get the link for.
    - Select **From List** to choose the room from the rooms that can be shared in the portal.
    - Select **Manual** to enter the ID of the room manually.

## Invite a user to a room

Use this operation to invite a user to a room in the portal.

Enter these parameters:

- **Credential to connect with**: Create or select an existing [ONLYOFFICE DocSpace credentials](/integrations/builtin/credentials/onlyofficedocspace.md).
- **Resource**: Select **Room**.
- **Operation**: Select **Invite User**.
- **Room ID**: Enter the ID of the room you want to invite a user to.
    - Select **From List** to choose the room from the rooms that allow user invitations in the portal.
    - Select **Manual** to enter the ID manually.
- **User ID**: Enter the ID of the user you want to invite to the room. This parameter is mutually exclusive with the **User Email** parameter.
    - Select **From List** to choose the user from the users that can be invited to the room you specified in the **Room ID** parameter.
    - Select **Manual** to enter the ID of the user manually.
- **User Access**: Enter the access level to grant to the user in the room. Note that the access level depends on the room type.
    - Select **From List** to choose the access level from the available access levels for the room you specified in the **Room ID** parameter.
    - Select **Manual** to enter the access level manually.

### Options

- **User Email**: Enter the email address of the user you want to invite to the room. This parameter is mutually exclusive with the **User ID** parameter.
- **Notify**: Toggle to send a notification to the user about the invitation.
- **Culture**: Enter the culture code to use for the invitation notification. Leave empty to use the default culture code in the portal. This parameter is available when the **Notify** parameter is toggled on.
    - Select **From List** to choose the culture code from the codes that can be used in the portal.
    - Select **Manual** to enter the culture code manually.

## Remove a user from a room

Use this operation to remove a user from a room in the portal.

Enter these parameters:

- **Credential to connect with**: Create or select an existing [ONLYOFFICE DocSpace credentials](/integrations/builtin/credentials/onlyofficedocspace.md).
- **Resource**: Select **Room**.
- **Operation**: Select **Remove User**.
- **Room ID**: Enter the ID of the room you want to remove a user from.
    - Select **From List** to choose the room from the rooms that allow user removal in the portal.
    - Select **Manual** to enter the ID of the room manually.
- **User ID**: Enter the ID of the user you want to remove from the room. This parameter is mutually exclusive with the **User Email** parameter.
    - Select **From List** to choose the user from the users that can be removed from the room you specified in the **Room ID** parameter.
    - Select **Manual** to enter the ID of the user manually.

### Options

- **User Email**: Enter the email address of the user you want to remove from the room. This parameter is mutually exclusive with the **User ID** parameter.

## Search for a room

Use this operation to search for a room in the portal.

Enter these parameters:

- **Credential to connect with**: Create or select an existing [ONLYOFFICE DocSpace credentials](/integrations/builtin/credentials/onlyofficedocspace.md).
- **Resource**: Select **Room**.
- **Operation**: Select **Search Room**.
- **Query**: Enter the search query to use for finding the room. Leave empty to return all rooms that can be accessed in the portal.

## Search for a user in a room

Use this operation to search for a user in a room in the portal.

Enter these parameters:

- **Credential to connect with**: Create or select an existing [ONLYOFFICE DocSpace credentials](/integrations/builtin/credentials/onlyofficedocspace.md).
- **Resource**: Select **Room**.
- **Operation**: Select **Search User**.
- **Room ID**: Enter the ID of the room you want to search for a user in.
    - Select **From List** to choose the room from the rooms that can be accessed in the portal.
    - Select **Manual** to enter the ID of the room manually.
- **Query**: Enter the search query to use for finding the user. Leave empty to return all users that can be accessed in the room you specified in the **Room ID** parameter.

## Update a room

Use this operation to update a room in the portal.

Enter these parameters:

- **Credential to connect with**: Create or select an existing [ONLYOFFICE DocSpace credentials](/integrations/builtin/credentials/onlyofficedocspace.md).
- **Resource**: Select **Room**.
- **Operation**: Select **Update Room**.
- **Room ID**: Enter the ID of the room you want to update.
    - Select **From List** to choose the room from the rooms that can be updated in the portal.
    - Select **Manual** to enter the ID of the room manually.
- **Title**: Enter the new title of the room you want to update.

## Update a user in a room

Use this operation to update a user in a room in the portal.

Enter these parameters:

- **Credential to connect with**: Create or select an existing [ONLYOFFICE DocSpace credentials](/integrations/builtin/credentials/onlyofficedocspace.md).
- **Resource**: Select **Room**.
- **Operation**: Select **Update User**.
- **Room ID**: Enter the ID of the room where you want to update a user.
    - Select **From List** to choose the room from the rooms that allow user updates in the portal.
    - Select **Manual** to enter the ID of the room manually.
- **User ID**: Enter the ID of the user you want to update. This parameter is mutually exclusive with the **User Email** parameter.
    - Select **From List** to choose the user from the users that can be updated in the room you specified in the **Room ID** parameter.
    - Select **Manual** to enter the ID of the user manually.
- **User Access**: Enter the new access level to grant to the user in the room. Note that the access level depends on the room type.
    - Select **From List** to choose the access level from the available access levels for the room you specified in the **Room ID** parameter.
    - Select **Manual** to enter the access level manually.

### Options

- **User Email**: Enter the email address of the user you want to update. This parameter is mutually exclusive with the **User ID** parameter.
