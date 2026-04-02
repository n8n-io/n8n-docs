---
title: Yahoo
description: Documentation for Yahoo IMAP credentials. Use these credentials to authenticate Yahoo IMAP in n8n, a workflow automation platform.
contentType: [integration, reference]
priority: high
---

# Yahoo IMAP credentials

Follow these steps to configure the IMAP credentials with a Yahoo account.

## Prerequisites

To follow these instructions, you must first generate an app password:

--8<-- "_snippets/integrations/builtin/credentials/email/yahoo-app-password.md"

## Set up the credential

To set up the IMAP credential with a Yahoo Mail account, use these settings:

1. Enter your Yahoo email address as the **User**.
2. Enter the app password you generated above as the **Password**.
3. Enter `imap.mail.yahoo.com` as the **Host**.
4. Keep the default **Port** number of `993`. Check with your email administrator if this port doesn't work.
5. Turn on the **SSL/TLS** toggle.
6. Check with your email administrator about whether to **Allow Self-Signed Certificates**.

Refer to [Set up IMAP for Yahoo mail account](https://help.yahoo.com/kb/sln4075.html) for more information.
