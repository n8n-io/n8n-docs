---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Slack trigger
description: Documentation for the Slack trigger node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
contentType: integration
priority: medium
---
# Slack trigger

Use the Slack trigger node to respond to events in Slack and integrate Slack with other applications. n8n has built-in support for a wide range of Slack events, including new messages, reactions and new channels.

On this page, you'll find a list of events the Slack trigger node can respond to, and links to more resources.

///  note  | Credentials
You can find authentication information for this node [here](/integrations/builtin/credentials/slack/).
///
///  note  | Examples and templates
For usage examples and templates to help you get started, refer to n8n's [Slack integrations](https://n8n.io/integrations/slack-trigger/){:target=_blank .external-link} page.
///

## Events

* **Any Event**: The node triggers on any event in Slack.
* **Bot / App Mention**: The node triggers when your bot or app is [mentioned](https://slack.com/help/articles/205240127-Use-mentions-in-Slack){:target=_blank .external-link} in a channel the app is in.
* **File Made Public**: The node triggers when a file is [made public](https://slack.com/help/articles/4412651915539-Manage-public-file-sharing){:target=_blank .external-link}.
* **File Shared**: The node triggers when a file is [shared](https://slack.com/help/articles/201330736-Add-files-to-Slack){:target=_blank .external-link} in a channel the app is in.
* **New Message Posted to Channel**: The node triggers when a new message is posted to a channel the app is in.
* **New Public Channel Created**: The node triggers when a new [public channel](https://slack.com/help/articles/360017938993-What-is-a-channel){:target=_blank .external-link} is created.
* **New User**: The node triggers when a new user is added to Slack.
* **Reaction Added**: The node triggers when a [reaction](https://slack.com/help/articles/202931348-Use-emoji-and-reactions){:target=_blank .external-link} is added to a message the app is added to.

## Parameters

Once you've set the events to trigger on, use the remaining parameters to further define the node's behavior:

* **Watch Whole Workspace**: Whether the node should watch for the selected **Events** in all channels in the workspace (turned on) or not (turned off, default).

    ///warning | Caution
    This will use one execution for every event in any channel your bot or app is in. Use with caution!
    ///

* **Channel to Watch**: Select the channel your node should watch for the selected **Events**. This parameter only appears if you don't turn on **Watch Whole Workspace**. You can select a channel:
    * **From list**: The node uses your credential to look up a list of channels in the workspace so you can select the channel you want.
    * **By ID**: Enter the ID of a channel you want to watch. Slack displays the channel ID at the bottom of the channel details with a one-click copy button.
    * **By URL**: Enter the URL of the channel you want to watch, formatted as `https://app.slack.com/client/<channel-address>`.
* **Download Files**: Whether to download files and use them in the node's output (turned on) or not (turned off, default). Use this parameter with the **File Made Public** and **File Shared** events.

## Options

You can further refine the node's behavior when you **Add Option**s:

* **Resolve IDs**: Whether to resolve the IDs to their respective names and return them (turned on) or not (turned off, default).
* **Usernames or IDs to ignore**: Select usernames or enter a comma-separated string of encoded user IDs to ignore events from. Choose from the list, or specify IDs using an [expression](/code/expressions/).

## Related resources

n8n provides an app node for Slack. You can find the node docs [here](/integrations/builtin/app-nodes/n8n-nodes-base.slack/).

View [example workflows and related content](https://n8n.io/integrations/slack-trigger/){:target=_blank .external-link} on n8n's website.

Refer to [Slack's documentation](https://api.slack.com/apis/connections/events-api){:target=_blank .external-link} for details about their API.

## Required scopes

To use this node, you need to create an application in Slack and enable event subscriptions. Refer to [Slack credentials | Slack Trigger configuration](/integrations/builtin/credentials/slack/#slack-trigger-configuration) for more information.

You must add the appropriate scopes to your Slack app for this trigger node to work.

The node requires scopes for the [conversations.list](https://api.slack.com/methods/conversations.list){:target=blank .external-link} and [users.list](https://api.slack.com/methods/users.list){:target=blank .external-link} methods at minimum. Check out the [Scopes | Slack credentials](/integrations/builtin/credentials/slack/#scopes) list for a more complete list of scopes.
