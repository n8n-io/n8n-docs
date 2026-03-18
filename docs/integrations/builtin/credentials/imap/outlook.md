---
title: Outlook.com
description: Documentation for Outlook.com IMAP credentials. Use these credentials to authenticate Outlook.com IMAP in n8n, a workflow automation platform.
contentType: [integration, reference]
priority: high
---

/// warning | Microsoft has removed Basic Auth for Outlook.com IMAP
Microsoft deprecated Basic Authentication for IMAP in Exchange Online and
Outlook.com. As a result, the IMAP node **cannot connect to Outlook.com or
Microsoft 365 accounts**. App passwords are not a workaround for this
restriction.

**Use the [Microsoft Outlook node](/integrations/builtin/app-nodes/n8n-nodes-base.microsoftoutlook.md)
instead.** It uses OAuth 2.0, which Microsoft now requires for mail access.

Refer to [Microsoft's deprecation notice](https://learn.microsoft.com/en-us/exchange/clients-and-mobile-in-exchange-online/deprecation-of-basic-authentication-exchange-online#what-we-are-changing)
for more information.
///


# Outlook.com IMAP credentials

IMAP access for Outlook.com and Microsoft 365 accounts is no longer supported in n8n due to Microsoft's deprecation of Basic Authentication. You cannot use IMAP (with a regular password or app password) to connect to Outlook.com or Microsoft 365 accounts.

To replace IMAP triggers for incoming email, use the [Microsoft Outlook Trigger node](/integrations/builtin/trigger-nodes/n8n-nodes-base.microsoftoutlooktrigger.md), which supports the Message Received event.

For general Microsoft Outlook automation, use the [Microsoft Outlook node](/integrations/builtin/app-nodes/n8n-nodes-base.microsoftoutlook.md), which uses OAuth 2.0 as required by Microsoft.

For more information, refer to [Microsoft's deprecation notice](https://learn.microsoft.com/en-us/exchange/clients-and-mobile-in-exchange-online/deprecation-of-basic-authentication-exchange-online#what-we-are-changing).
