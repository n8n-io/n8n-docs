---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Yahoo
description: Documentation for Yahoo Send Email credentials. Use these credentials to authenticate Send Email with Yahoo in n8n, a workflow automation platform.
contentType: integration
priority: high
---

# Yahoo Send Email credentials

Follow these steps to configure the Send Email credentials with a Yahoo account.

## Prerequisites

To follow these instructions, you must first generate an app password:

--8<-- "_snippets/integrations/builtin/credentials/email/yahoo-app-password.md"

## Set up the credential

To configure the Send Email credential to use Yahoo Mail:

1. Enter your Yahoo email address as the **User**.
2. Enter the app password you generated above as the **Password**.
3. Enter `smtp.mail.yahoo.com` as the **Host**.
4. For the **Port**:
    - Keep the default `465` for SSL or if you're unsure what to use.
    - Enter `587` for TLS.
5. Turn on the **SSL/TLS** toggle.

Refer to [IMAP server settings for Yahoo Mail](https://help.yahoo.com/kb/sln4075.html){:target=_blank .external-link} for more information. If the settings above don't work for you, check with your email administrator.
