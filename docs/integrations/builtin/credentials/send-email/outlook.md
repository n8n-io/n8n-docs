---
title: Outlook.com
description: >-
  Documentation for Outlook.com Send Email credentials. Use these credentials to
  authenticate Send Email with Outlook.com in n8n, a workflow automation
  platform.
contentType:
  - integration
  - reference
priority: high
nodeTitle: Outlook.com
originalFilePath: integrations/builtin/credentials/sendemail/outlook.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/credentials/sendemail/outlook'
url: 'https://docs.n8n.io/integrations/builtin/credentials/send-email/outlook'
layout:
  description:
    visible: false
---


# Outlook.com Send Email credentials <a href="#outlookcom-send-email-credentials" id="outlookcom-send-email-credentials"></a>

{% hint style="warning" %}
**Microsoft has removed Basic Auth and App Passwords for Outlook.com SMTP**

Microsoft deprecated Basic Authentication and app passwords for SMTP in Exchange Online and Outlook.com. As a result, the Send Email node **cannot connect to Outlook.com or Microsoft 365 accounts** using username/password or app password authentication.

**To send email from your Outlook.com or Microsoft 365 account, use the [Microsoft Outlook node](../../app-nodes/n8n-nodes-base.microsoftoutlook.md), which uses OAuth 2.0 as required by Microsoft.**

Refer to [Microsoft's deprecation notice](https://learn.microsoft.com/en-us/exchange/clients-and-mobile-in-exchange-online/deprecation-of-basic-authentication-exchange-online#what-we-are-changing) for more information.
{% endhint %}
