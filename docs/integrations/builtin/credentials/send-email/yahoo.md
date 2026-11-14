---
title: Yahoo
description: >-
  Documentation for Yahoo Send Email credentials. Use these credentials to
  authenticate Send Email with Yahoo in n8n, a workflow automation platform.
contentType:
  - integration
  - reference
priority: high
nodeTitle: Yahoo
originalFilePath: integrations/builtin/credentials/sendemail/yahoo.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/credentials/sendemail/yahoo'
url: 'https://docs.n8n.io/integrations/builtin/credentials/send-email/yahoo'
layout:
  description:
    visible: false
---

# Yahoo Send Email credentials <a href="#yahoo-send-email-credentials" id="yahoo-send-email-credentials"></a>

Follow these steps to configure the Send Email credentials with a Yahoo account.

## Prerequisites <a href="#prerequisites" id="prerequisites"></a>

To follow these instructions, you must first generate an app password:

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/2ZBcW11hezK8c3JZNsKm/" %}

## Set up the credential <a href="#set-up-the-credential" id="set-up-the-credential"></a>

To configure the Send Email credential to use Yahoo Mail:

1. Enter your Yahoo email address as the **User**.
2. Enter the app password you generated above as the **Password**.
3. Enter `smtp.mail.yahoo.com` as the **Host**.
4. For the **Port**:
    - Keep the default `465` for SSL or if you're unsure what to use.
    - Enter `587` for TLS.
5. Turn on the **SSL/TLS** toggle.

Refer to [IMAP server settings for Yahoo Mail](https://help.yahoo.com/kb/sln4075.html) for more information. If the settings above don't work for you, check with your email administrator.
