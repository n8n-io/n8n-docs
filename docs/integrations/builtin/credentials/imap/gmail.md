---
title: Gmail
description: >-
  Documentation for Gmail IMAP credentials. Use these credentials to
  authenticate Gmail IMAP in n8n, a workflow automation platform.
contentType:
  - integration
  - reference
priority: high
nodeTitle: Gmail
originalFilePath: integrations/builtin/credentials/imap/gmail.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/credentials/imap/gmail'
url: 'https://docs.n8n.io/integrations/builtin/credentials/imap/gmail'
layout:
  description:
    visible: false
---

# Gmail IMAP credentials <a href="#gmail-imap-credentials" id="gmail-imap-credentials"></a>

Follow these steps to configure the IMAP credentials with a Gmail account.

## Prerequisites <a href="#prerequisites" id="prerequisites"></a>

To follow these instructions, you must first:

1. [Enable 2-step Verification](#enable-2-step-verification) on your Gmail account.
2. [Generate an app password](#generate-an-app-password).

### Enable 2-step Verification <a href="#enable-2-step-verification" id="enable-2-step-verification"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/bAchsCEbARjioUMmRQBn/" %}

### Generate an app password <a href="#generate-an-app-password" id="generate-an-app-password"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/KKq1ahPmcFa6J67IyuN4/" %}

## Set up the credential <a href="#set-up-the-credential" id="set-up-the-credential"></a>

To set up the IMAP credential with a Gmail account, use these settings:

1. Enter your Gmail email address as the **User**.
2. Enter the app password you generated above as the **Password**.
3. Enter `imap.gmail.com` as the **Host**.
4. For the **Port**, keep the default port number of `993`. Check with your email administrator if this port doesn't work.
5. Turn on the **SSL/TLS** toggle.
6. Check with your email administrator about whether to **Allow Self-Signed Certificates**.

Refer to [Add Gmail to another client](https://support.google.com/mail/answer/7126229?hl=en) for more information. You may need to **Enable IMAP** if you're using a personal Google account before June 2024.
