---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Slack trigger
description: Documentation for the Slack trigger node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
contentType: integration
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

* Any Event
* Bot / App Mention
* File Made Public
* File Shared
* New Message Posted to Channel
* New Public Channel Created
* New User
* Reaction Added

## Related resources

n8n provides an app node for Slack. You can find the node docs [here](/integrations/builtin/app-nodes/n8n-nodes-base.slack/).

View [example workflows and related content](https://n8n.io/integrations/slack-trigger/){:target=_blank .external-link} on n8n's website.

Refer to [Slack's documentation](https://api.slack.com/apis/connections/events-api){:target=_blank .external-link} for details about their API.

## Slack configuration

To use this node you first need to create an application in Slack and enable event subscriptions. For the **Request URL** input the production or test URL displayed in the webhooks section of the node.

///  note  | Request URL
Slack only allows one request URL per app, This means if you want to test your workflow you will need to either use the production URL with execution logging or change the URL in Slack to the test URL.
///

Once verified you can select the bot events to subscribe to. You can use the **Events** option in the node to filter these requests. If you want to use an event not in the list you can add it as a bot event and select **Any Event** in the node.

