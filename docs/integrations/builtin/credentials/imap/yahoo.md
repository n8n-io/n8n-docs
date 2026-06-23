---
title: Yahoo
description: >-
  Documentation for Yahoo IMAP credentials. Use these credentials to
  authenticate Yahoo IMAP in n8n, a workflow automation platform.
contentType:
  - integration
  - reference
priority: high
nodeTitle: Yahoo
originalFilePath: integrations/builtin/credentials/imap/yahoo.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/credentials/imap/yahoo'
url: 'https://docs.n8n.io/integrations/builtin/credentials/imap/yahoo'
layout:
  description:
    visible: false
---

# Yahoo IMAP credentials <a href="#yahoo-imap-credentials" id="yahoo-imap-credentials"></a>

Follow these steps to configure the IMAP credentials with a Yahoo account.

## Prerequisites <a href="#prerequisites" id="prerequisites"></a>

To follow these instructions, you must first generate an app password:

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/4soqoHfNaeNU0PiTkc6P/" %}

## Set up the credential <a href="#set-up-the-credential" id="set-up-the-credential"></a>

To set up the IMAP credential with a Yahoo Mail account, use these settings:

1. Enter your Yahoo email address as the **User**.
2. Enter the app password you generated above as the **Password**.
3. Enter `imap.mail.yahoo.com` as the **Host**.
4. Keep the default **Port** number of `993`. Check with your email administrator if this port doesn't work.
5. Turn on the **SSL/TLS** toggle.
6. Check with your email administrator about whether to **Allow Self-Signed Certificates**.

Refer to [Set up IMAP for Yahoo mail account](https://help.yahoo.com/kb/sln4075.html) for more information.
