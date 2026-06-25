---
title: Gmail
description: >-
  Documentation for Gmail Send Email credentials. Use these credentials to
  authenticate Send Email with Gmail in n8n, a workflow automation platform.
contentType:
  - integration
  - reference
priority: high
nodeTitle: Gmail
originalFilePath: integrations/builtin/credentials/sendemail/gmail.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/credentials/sendemail/gmail'
url: 'https://docs.n8n.io/integrations/builtin/credentials/send-email/gmail'
layout:
  description:
    visible: false
---

# Gmail Send Email credentials <a href="#gmail-send-email-credentials" id="gmail-send-email-credentials"></a>

Follow these steps to configure the Send Email credentials with a Gmail account.

## Prerequisites <a href="#prerequisites" id="prerequisites"></a>

To follow these instructions, you must first:

1. [Enable 2-step Verification](#enable-2-step-verification) on your Gmail account.
2. [Generate an app password](#generate-an-app-password).

### Enable 2-step Verification <a href="#enable-2-step-verification" id="enable-2-step-verification"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/ysY7mHC9pN3kCUPncSi8/" %}

### Generate an app password <a href="#generate-an-app-password" id="generate-an-app-password"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/rJn9WooD0IwP7abKawNZ/" %}

## Set up the credential <a href="#set-up-the-credential" id="set-up-the-credential"></a>

To set up the Send Email credential to use Gmail:

1. Enter your Gmail email address as the **User**.
2. Enter the app password you generated above as the **Password**.
3. Enter `smtp.gmail.com` as the **Host**.
4. For the **Port**:
    - Keep the default `465` for SSL or if you're unsure what to use.
    - Enter `587` for TLS.
5. Turn on the **SSL/TLS** toggle.

Refer to the Outgoing Mail (SMTP) Server settings in [Read Gmail messages on other email clients using POP](https://support.google.com/mail/answer/7104828?hl=en) for more information. If the settings above don't work for you, check with your email administrator.
