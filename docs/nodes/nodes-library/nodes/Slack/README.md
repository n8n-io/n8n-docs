---
permalink: /nodes/n8n-nodes-base.slack
description: Learn how to use the Slack node in n8n
---

# Slack

[Slack](https://slack.com) is a business communication platform offering many IRC-style features, including persistent chat rooms (channels), private groups, and direct messaging.

::: tip 🔑 Credentials
You can find authentication information for this node [here](../../../credentials/Slack/README.md).
:::

## Basic Operations

::: details Channel
- Archive a conversation
- Close a direct message or multi-person direct message
- Create a public or private channel-based conversation
- Get information about a channel
- Get all channels in a Slack team
- Get a conversation's history of messages and events
- Invite a user to a channel
- Join an existing conversation
- Remove a user from a channel
- Leave a conversation
- Open or resume a direct message or multi-person direct message
- Rename a conversation
- Get a thread of replies posted to a channel
- Set the purpose for a conversation
- Set the topic for a conversation
- Unarchive a conversation
:::

::: details File
- Get a file's information
- Get and filter a team's files
- Upload an existing file or create a new one
:::

::: details Message
- Post a message in a channel
- Update a message
:::

::: details Star
- Add a star to an item
- Delete a star from an item
- Get all the stars of an authenticated user
:::

::: details User Profile
- Get your user profile
- Update user's profile
:::

## Example Usage

This workflow allows you to create a channel, invite users to the channel, post a message, and upload a file to the channel. You can also find the [workflow](https://n8n.io/workflows/811) on n8n.io This example usage workflow uses the following nodes.
- [Start](../../core-nodes/Start/README.md)
- [Slack]()
- [HTTP Request](../../core-nodes/HTTPRequest/README.md)

The final workflow should look like the following image.

![A workflow with the Slack node](./workflow.png)

### 1. Start node

The Start node exists by default when you create a new workflow.

### 2. Slack node (create: channel)

This node will create a new channel in your Slack workspace. This operation requires the `channel:manage` scope. Add this scope under the ***Bot Token Scopes*** section on Slack. You can refer to the [FAQs](#_2-how-to-add-oauth-scopes-to-a-slack-app) to learn how to add scopes.

1. Select 'Access Token' from the ***Authentication*** dropdown list.
2. You'll have to enter credentials for the Slack node. You can find out how to enter credentials for this node [here](../../../credentials/Slack/README.md).
3. Select 'Channel' from the ***Resource*** dropdown list.
4. Enter a channel name in the ***Channel*** field.
5. Click on ***Execute Node*** to run the node.

In the screenshot below, you will notice that node creates a new channel in Slack.

![Using the Slack node to create a channel](./Slack_node.png)

### 3. Slack1 node (invite: channel)

This node will invite a member to the channel that we created in the previous node. This operation requires the `channel:read` scope. Add this scope under the ***Bot Token Scopes*** section on Slack.
::: v-pre
1. Select 'Access Token' from the ***Authentication*** dropdown list.
2. Select the credentials that you entered in the previous node.
3. Select 'Channel' from the ***Resource*** dropdown list.
4. Select 'Invite' from the ***Operation*** dropdown list.
5. Click on the gears icon next to the ***Channel*** field click on ***Add Expression***.
6. Select the following in the ***Variable Selector*** section: Nodes > Slack > Output Data > JSON > id. You can also add the following expression: `{{$node["Slack"].json["id"]}}`.
7. Select the users from the ***User IDs*** dropdown list. The users you select in this field will be added to the channel.
8. Click on ***Execute Node*** to run the node.
:::
In the screenshot below, you will notice that node invites the user to the channel we created using the previous node.

![Using the Slack node to invite a user to a channel](./Slack1_node.png)

### 4. Slack2 node (post: message)

This node will post a message in the channel with an attachment.
::: v-pre
1. Select 'Access Token' from the ***Authentication*** dropdown list.
2. Select the credentials that you entered in the previous node.
3. Click on the gears icon next to the ***Channel*** field click on ***Add Expression***.
4. Select the following in the ***Variable Selector*** section: Nodes > Slack > Output Data > JSON > id. You can also add the following expression: `{{$node["Slack"].json["id"]}}`.
5. Enter a message in the ***Text*** field.
6. Toggle ***As User*** to `true`. This option allows you to post a message as a bot.
7. Click on the ***Add attachment*** button.
8. Select 'Image URL' from the ***Add attachment item*** dropdown list.
9. Enter the URL of an image in the ***Image URL*** field.
10. Select 'Title' from the ***Add attachment item*** dropdown list.
11. Enter a title in the ***Title*** field.
12. Click on ***Execute Node*** to run the node.
:::
In the screenshot below, you will notice that node sends a message with an attachment to the channel that we created in the previous node.

![Using the Slack node to send a message with an attachment to a channel](./Slack2_node.png)

### 5. HTTP Request node (GET)

This node will fetch a file from a URL. You can also use the [Read Binary File](../../core-nodes/ReadBinaryFile/README.md) node to read a file from the path you specify.

1. Enter the URL of a file in the ***URL*** field.
2. Select 'File' from the ***Response Format*** dropdown list.
3. Click on ***Execute Node*** to run the node.

In the screenshot below, you will notice that the HTTP Request node fetches the file from the URL. This file gets passed on as binary data to the next node in the workflow.

![Using the HTTP Request node to fetch a file from a URL](./HTTPRequest_node.png)

### 6. Slack3 node (upload: file)

This node will upload the file that we got from the previous node to a channel we specify.

1. Select 'Access Token' from the ***Authentication*** dropdown list.
2. Select the credentials that you entered in the previous Slack node.
3. Select 'File' from ***Resource*** dropdown list.
4. Select 'Upload' from the ***Operation*** dropdown list.
5. Toggle ***Binary Data*** to true.
6. Click on ***Add options*** and select 'Channels'.
7. Select the channel from the ***Channels*** dropdown list.
8. Click on ***Execute Node*** to run the node.

In the screenshot below, you will notice that the node uploads the file to the channel that we created earlier.

![Using the Slack node to upload a file to a channel](./Slack3_node.png)

## FAQs

### 1. How to create a private channel?

To create a private channel, follow the steps mention below.
1. Select 'Channel' from the ***Resource*** dropdown list.
2. Select 'Create' from the ***Operation*** dropdown list.
3. Click on the ***Add Field*** button.
4. Toggle ***Is Private*** to `true`.

### 2. How to add OAuth Scopes to a Slack app?

Your app needs appropriate scopes and permissions to perform actions. For example, if you want to create a new channel, your app requires the `channel:manage` scope. To add scopes and permissions, follow the steps mentioned below.
1. Navigate to the [Slack App dashboard](https://api.slack.com/apps) page and select your app.
2. Click on 'OAuth & Permissions' under the ***Feature*** section on the left sidebar.
3. Scroll down to the ***Scopes*** section.
4. If you're building a bot, click on ***Add an OAuth Scope*** under the ***Bot Token Scopes***.
5. Select the permissions you want to give to your bot from the dropdown list.
6. If you want the app to access user data and act on behalf of users that authorize them, add scopes under the ***User Token Scopes***.
7. When you add new scopes, Slack will ask you to reinstall the app. Click on 'reinstall your app' on the top of the page and reinstall the app.

You can refer to the official documentation on [Scopes and permissions](https://api.slack.com/scopes) to learn more.

## Further Reading

- [Giving kudos to contributors with GitHub, Slack, and n8n 👏](https://medium.com/n8n-io/giving-kudos-to-contributors-with-github-slack-and-n8n-b3f5f4a653a6)
