---
title: Slack Trigger node documentation
description: Learn how to use the Slack Trigger node in n8n. Follow technical documentation to integrate Slack Trigger node into your workflows.
contentType: [integration, reference]
priority: medium
---

# Slack Trigger node

Use the Slack Trigger node to respond to events in [Slack](https://slack.com/) and integrate Slack with other applications. n8n has built-in support for a wide range of Slack events, including new messages, reactions, and new channels.

On this page, you'll find a list of events the Slack Trigger node can respond to and links to more resources.

///  note  | Credentials
You can find authentication information for this node [here](/integrations/builtin/credentials/slack.md).
///
///  note  | Examples and templates
For usage examples and templates to help you get started, refer to n8n's [Slack integrations](https://n8n.io/integrations/slack-trigger/) page.
///

## Events

* **Any Event**: The node triggers on any event in Slack.
* **Bot / App Mention**: The node triggers when your bot or app is [mentioned](https://slack.com/help/articles/205240127-Use-mentions-in-Slack) in a channel the app is in.
* **File Made Public**: The node triggers when a file is [made public](https://slack.com/help/articles/4412651915539-Manage-public-file-sharing).
* **File Shared**: The node triggers when a file is [shared](https://slack.com/help/articles/201330736-Add-files-to-Slack) in a channel the app is in.
* **New Message Posted to Channel**: The node triggers when a new message is posted to a channel the app is in.
* **New Public Channel Created**: The node triggers when a new [public channel](https://slack.com/help/articles/360017938993-What-is-a-channel) is created.
* **New User**: The node triggers when a new user is added to Slack.
* **Reaction Added**: The node triggers when a [reaction](https://slack.com/help/articles/202931348-Use-emoji-and-reactions) is added to a message the app is added to.

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
* **Usernames or IDs to ignore**: Select usernames or enter a comma-separated string of encoded user IDs to ignore events from. Choose from the list, or specify IDs using an [expression](/code/expressions.md).

## Related resources

n8n provides an app node for Slack. You can find the node docs [here](/integrations/builtin/app-nodes/n8n-nodes-base.slack.md).

View [example workflows and related content](https://n8n.io/integrations/slack-trigger/) on n8n's website.

Refer to [Slack's documentation](https://api.slack.com/apis/connections/events-api) for details about their API.

## Required scopes

To use this node, you need to create an application in Slack and enable event subscriptions. Refer to [Slack credentials | Slack Trigger configuration](/integrations/builtin/credentials/slack.md#slack-trigger-configuration) for more information.

You must add the appropriate scopes to your Slack app for this trigger node to work.

The node requires scopes for the [conversations.list](https://api.slack.com/methods/conversations.list) and [users.list](https://api.slack.com/methods/users.list) methods at minimum. Check out the [Scopes | Slack credentials](/integrations/builtin/credentials/slack.md#scopes) list for a more complete list of scopes.

## Verify the webhook

From version `1.106.0`, you can set a [Slack Signing Secret](https://api.slack.com/authentication/verifying-requests-from-slack#signing_secrets_admin_page) when configuring your [Slack credentials](/integrations/builtin/credentials/slack.md#slack-trigger-configuration). When set, the Slack trigger node automatically verifies that requests are from Slack and include a trusted signature. n8n recommends setting this to ensure you only process requests sent from Slack.

## Common issues

Here are some common errors and issues with the Slack Trigger node and steps to resolve or troubleshoot them.

### Workflow only works in testing or production

Slack only allows you to register a single webhook per app. This means that you can't switch from using the testing URL to the production URL (and vice versa) without reconfiguring the registered webhook URL. 

You may have trouble with this if you try to test a workflow that's also active in production. Slack will only send events to one of the two webhook URLs, so the other will never receive event notifications.

To work around this, you can disable your workflow when testing:

/// warning | Halts production traffic
This temporarily disables your production workflow for testing. Your workflow will no longer receive production traffic while it's deactivated.
///

1. Go to your workflow page.
2. Toggle the **Active** switch in the top panel to disable the workflow temporarily.
3. Edit the **Request URL** in your the [Slack Trigger configuration](/integrations/builtin/credentials/slack.md#slack-trigger-configuration) to use the testing webhook URL instead of the production webhook URL.
4. Test your workflow using the test webhook URL.
5. When you finish testing, edit the **Request URL** in your the [Slack Trigger configuration](/integrations/builtin/credentials/slack.md#slack-trigger-configuration) to use the production webhook URL instead of the testing webhook URL.
6. Toggle the **Inactive** toggle to enable the workflow again. The production webhook URL should resume working.

### Token expired

--8<-- "_snippets/integrations/builtin/credentials/slack/token-rotation.md"
