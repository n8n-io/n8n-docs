---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Slack node documentation
description: Learn how to use the Slack node in n8n. Follow technical documentation to integrate Slack node into your workflows.
contentType: integration
priority: high
---

# Slack node

Use the Slack node to automate work in Slack, and integrate Slack with other applications. n8n has built-in support for a wide range of Slack features, including creating, archiving, and closing channels, getting users and files, as well as deleting messages.

On this page, you'll find a list of operations the Slack node supports and links to more resources.

/// note | Credentials
Refer to [Slack credentials](/integrations/builtin/credentials/slack/) for guidance on setting up authentication. 
///

## Operations

* **Channel**
    * **Archive** a channel.
    * **Close** a direct message or multi-person direct message.
    * **Create** a public or private channel-based conversation.
    * **Get** information about a channel.
    * **Get Many**: Get a list of channels in Slack.
    * **History**: Get a channel's history of messages and events.
    * **Invite** a user to a channel.
    * **Join** an existing channel.
    * **Kick**: Remove a user from a channel.
    * **Leave** a channel.
    * **Member**: List the members of a channel.
    * **Open** or resume a direct message or multi-person direct message.
    * **Rename** a channel.
    * **Replies**: Get a thread of messages posted to a channel.
    * **Sets purpose** of a channel.
    * **Sets topic** of a channel.
    * **Unarchive** a channel.
* **File**
    * **Get** a file.
    * **Get Many**: Get and filter team files.
    * **Upload**: Create or upload an existing file.
* **Message**
    * **Delete** a message
    * **Get permalink**: Get a message's permalink.
    * **Search** for messages
    * **Send** a message
    * **Send and Wait for Approval**: Send a message and wait for approval from the recipient before continuing.
    * **Update** a message
* **Reaction**
    * **Add** a reaction to a message.
    * **Get** a message's reactions.
    * **Remove** a reaction from a message.
* **Star**
    * **Add** a star to an item.
    * **Delete** a star from an item.
    * **Get Many**: Get a list of an authenticated user's stars.
* **User**
    * **Get** information about a user.
	* **Get Many**: Get a list of users.
    * **Get User's Profile**.
    * **Get User's Status**.
	* **Update User's Profile**.
* **User Group**
    * **Create** a user group.
    * **Disable** a user group.
    * **Enable** a user group.
    * **Get Many**: Get a list of user groups.
    * **Update** a user group.

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'slack') ]]

## Related resources

Refer to [Slack's documentation](https://api.slack.com/){:target=_blank .external-link} for more information about the service.

## Required scopes

Once you create a Slack app for your [Slack credentials](/integrations/builtin/credentials/slack/), you must add the appropriate scopes to your Slack app for this node to work. Start with the scopes listed in the [Scopes | Slack credentials](/integrations/builtin/credentials/slack/#scopes) page.

If those aren't enough, use the table below to look up the resource and operation you want to use, then follow the link to Slack's API documentation to find the correct scopes.

<!-- vale off -->

| **Resource** | **Operation** | **Slack API method** |
| --- | --- | --- |
| Channel | Archive | [conversations.archive](https://api.slack.com/methods/conversations.archive){:target=blank .external-link} |
| Channel | Close | [conversations.close](https://api.slack.com/methods/conversations.close){:target=blank .external-link} |
| Channel | Create | [conversations.create](https://api.slack.com/methods/conversations.create){:target=blank .external-link} |
| Channel | Get | [conversations.info](https://api.slack.com/methods/conversations.info){:target=blank .external-link} |
| Channel | Get Many | [conversations.list](https://api.slack.com/methods/conversations.list){:target=blank .external-link} |
| Channel | History | [conversations.history](https://api.slack.com/methods/conversations.history){:target=blank .external-link} |
| Channel | Invite | [conversations.invite](https://api.slack.com/methods/conversations.invite){:target=blank .external-link} |
| Channel | Join | [conversations.join](https://api.slack.com/methods/conversations.join){:target=blank .external-link} |
| Channel | Kick | [conversations.kick](https://api.slack.com/methods/conversations.kick){:target=blank .external-link} |
| Channel | Leave | [conversations.leave](https://api.slack.com/methods/conversations.leave){:target=blank .external-link} |
| Channel | Member | [conversations.members](https://api.slack.com/methods/conversations.members){:target=blank .external-link} |
| Channel | Open | [conversations.open](https://api.slack.com/methods/conversations.open){:target=blank .external-link} |
| Channel | Rename | [conversations.rename](https://api.slack.com/methods/conversations.rename){:target=blank .external-link} |
| Channel | Replies | [conversations.replies](https://api.slack.com/methods/conversations.replies){:target=blank .external-link} |
| Channel | Set Purpose | [conversations.setPurpose](https://api.slack.com/methods/conversations.setPurpose){:target=blank .external-link} |
| Channel | Set Topic | [conversations.setTopic](https://api.slack.com/methods/conversations.setTopic){:target=blank .external-link} |
| Channel | Unarchive | [conversations.unarchive](https://api.slack.com/methods/conversations.unarchive){:target=blank .external-link} |
| File | Get | [files.info](https://api.slack.com/methods/files.info){:target=blank .external-link} |
| File | Get Many | [files.list](https://api.slack.com/methods/files.list){:target=blank .external-link} |
| File | Upload | [files.upload](https://api.slack.com/methods/files.upload){:target=blank .external-link} |
| Message | Delete | [chat.delete](https://api.slack.com/methods/chat.delete){:target=blank .external-link} |
| Message | Get Permalink | [chat.getPermalink](https://api.slack.com/methods/chat.getPermalink){:target=blank .external-link} |
| Message | Search | [search.messages](https://api.slack.com/methods/search.messages){:target=blank .external-link} |
| Message | Send | [chat.postMessage](https://api.slack.com/methods/chat.postMessage){:target=blank .external-link} |
| Message | Send and Wait for Approval | [chat.postMessage](https://api.slack.com/methods/chat.postMessage){:target=blank .external-link} |
| Message | Update | [chat.update](https://api.slack.com/methods/chat.update){:target=blank .external-link} |
| Reaction | Add | [reactions.add](https://api.slack.com/methods/reactions.add){:target=blank .external-link} |
| Reaction | Get | [reactions.get](https://api.slack.com/methods/reactions.get){:target=blank .external-link} |
| Reaction | Remove | [reactions.remove](https://api.slack.com/methods/reactions.remove){:target=blank .external-link} |
| Star | Add | [stars.add](https://api.slack.com/methods/stars.add){:target=blank .external-link} |
| Star | Delete | [stars.remove](https://api.slack.com/methods/stars.remove){:target=blank .external-link} |
| Star | Get Many | [stars.list](https://api.slack.com/methods/stars.list){:target=blank .external-link} |
| User | Get | [users.info](https://api.slack.com/methods/users.info){:target=blank .external-link} |
| User | Get Many | [users.list](https://api.slack.com/methods/users.list){:target=blank .external-link} |
| User | Get User's Profile | [users.profile.get](https://api.slack.com/methods/users.profile.get){:target=blank .external-link} |
| User | Get User's Status | [users.getPresence](https://api.slack.com/methods/users.getPresence){:target=blank .external-link} |
| User | Update User's Profile | [users.profile.set](https://api.slack.com/methods/users.profile.set){:target=blank .external-link} |
| User Group | Create | [usergroups.create](https://api.slack.com/methods/usergroups.create){:target=blank .external-link} |
| User Group | Disable | [usergroups.disable](https://api.slack.com/methods/usergroups.disable){:target=blank .external-link} |
| User Group | Enable | [usergroups.enable](https://api.slack.com/methods/usergroups.enable){:target=blank .external-link} |
| User Group | Get Many | [usergroups.list](https://api.slack.com/methods/usergroups.list){:target=blank .external-link} |
| User Group | Update | [usergroups.update](https://api.slack.com/methods/usergroups.update){:target=blank .external-link} |

<!-- vale on -->

--8<-- "_snippets/integrations/builtin/app-nodes/operation-not-supported.md"
