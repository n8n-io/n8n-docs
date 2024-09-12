---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Gmail trigger
description: Documentation for the Gmail trigger node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
contentType: integration
priority: high
---

# Gmail trigger

[Gmail](https://www.gmail.com){:target=_blank .external-link} is an email service developed by Google. The Gmail trigger node can start a workflow based on events in Gmail.

/// note | Credentials
You can find authentication information for this node [here](/integrations/builtin/credentials/google/).
///

///  note  | Examples and templates
For usage examples and templates to help you get started, refer to n8n's [Gmail Trigger integrations](https://n8n.io/integrations/gmail-trigger/){:target=_blank .external-link} page.
///

## Events

* **Message Received**: The node triggers for new messages at the selected **Poll Time**.

## Node parameters

Configure the node with these parameters:

* **Credential to connect with**: Select or create a new Google credential to use for the trigger.
* **Poll Times**: Select a poll **Mode** to set how often to trigger the poll. Your **Mode** selection will add or remove relevant fields. Refer to [Poll Mode options](#poll-mode-options) to configure the parameters for each mode type.
* **Simplify**: Choose whether to return a simplified version of the response (turned on) or the raw data (turned off). Default is on.
    * This returns email message IDs, labels, and email headers, including: From, To, CC, BCC, and Subject.

## Node filters

Use these filters to further refine the node's behavior:

* **Include Spam and Trash**: Select whether the node should trigger on new messages in the Spam and Trash folders (turned on) or not (turned off).
* **Label Names or IDs**: Only trigger on messages with the selected labels added to them. Select the Label names you want to apply or enter an expression to specify IDs. The dropdown populates based on the **Credential** you selected.
* **Search**: Enter Gmail search refine filters, like `from:`, to trigger the node on the filtered conditions only. Refer to [Refine searches in Gmail](https://support.google.com/mail/answer/7190?hl=en){:target=_blank .external-link} for more information.
* **Read Status**: Choose whether to receive **Unread and read emails**, **Unread emails only** (default), or **Read emails only**.
* **Sender**: Enter an email or a part of a sender name to trigger only on messages from that sender.

## Related resources

n8n provides an app node for Gmail. You can find the node docs [here](/integrations/builtin/app-nodes/n8n-nodes-base.gmail/).

View [example workflows and related content](https://n8n.io/integrations/gmail-trigger/){:target=_blank .external-link} on n8n's website.

Refer to [Google's Gmail API documentation](https://developers.google.com/gmail/api/guides){:target=_blank .external-link} for details about their API.

## 401 unauthorized error

The full text of the error looks like this:
<!--vale off-->
```
401 - {"error":"unauthorized_client","error_description":"Client is unauthorized to retrieve access tokens using this method, or client not authorized for any of the scopes requested."}
```
<!--vale on-->

This error occurs when there's an issue with the credential you're using and its scopes or permissions.

To resolve:

1. For [OAuth2](/integrations/builtin/credentials/google/oauth-single-service/) credentials, make sure you've enabled the Gmail API in **APIs & Services > Library**. Refer to [Google OAuth2 Single Service - Enable APIs](/integrations/builtin/credentials/google/oauth-single-service/#enable-apis) for more information.
2. For [Service Account](/integrations/builtin/credentials/google/service-account/) credentials:
    1. [Enable domain-wide delegation](/integrations/builtin/credentials/google/service-account/#enable-domain-wide-delegation).
    2. Make sure you add the Gmail API as part of the domain-wide delegation configuration.

## Poll mode options

--8<-- "_snippets/integrations/builtin/poll-modes.md"
