---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Yahoo IMAP credentials
description: Documentation for Yahoo IMAP credentials. Use these credentials to authenticate Yahoo IMAP in n8n, a workflow automation platform.
contentType: integration
priority: high
---

# Yahoo IMAP credentials

Follow these steps to configure the IMAP credentials with a Yahoo account.

## Prerequisites

To follow these instructions, you must first generate an app password:

1. Log in to your Yahoo account [Security page](https://login.yahoo.com/account/security).
2. Select **Generate app password** or **Generate and manage app passwords**.
3. Select **Get Started**.
2. Enter an **App name** for your new app password, like `n8n credential`.
3. Select **Generate password**.
4. Copy the generated app password. You'll use this in your n8n credential.

Refer to Yahoo's [Generate and manage 3rd-party app passwords](https://help.yahoo.com/kb/generate-manage-third-party-passwords-sln15241.html){:target=_blank .external-link} for more information.

## Set up the credential

To set up the IMAP credential with a Yahoo Mail account, use these settings:

1. Enter your Yahoo email address as the **User**.
2. Enter the app password you generated above as the **Password**.
3. Enter `imap.mail.yahoo.com` as the **Host**.
4. Keep the default **Port** number of `993`. Check with your email administrator if this port doesn't work.
5. Turn on the **SSL/TLS** toggle.
6. Check with your email administrator about whether to **Allow Self-Signed Certificates**.

Refer to [Set up IMAP for Yahoo mail account](https://help.yahoo.com/kb/sln4075.html){:target=_blank .external-link} for more information.
