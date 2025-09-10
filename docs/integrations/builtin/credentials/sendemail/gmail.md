---
title: Gmail
description: Documentation for Gmail Send Email credentials. Use these credentials to authenticate Send Email with Gmail in n8n, a workflow automation platform.
contentType: [integration, reference]
priority: high
---

# Gmail Send Email credentials

Follow these steps to configure the Send Email credentials with a Gmail account.

## Prerequisites

To follow these instructions, you must first:

1. [Enable 2-step Verification](#enable-2-step-verification) on your Gmail account.
2. [Generate an app password](#generate-an-app-password).

### Enable 2-step Verification

--8<-- "_snippets/integrations/builtin/credentials/email/gmail-two-step-verification.md"

### Generate an app password

--8<-- "_snippets/integrations/builtin/credentials/email/gmail-app-password.md"

## Set up the credential

To set up the Send Email credential to use Gmail:

1. Enter your Gmail email address as the **User**.
2. Enter the app password you generated above as the **Password**.
3. Enter `smtp.gmail.com` as the **Host**.
4. For the **Port**:
    - Keep the default `465` for SSL or if you're unsure what to use.
    - Enter `587` for TLS.
5. Turn on the **SSL/TLS** toggle.

Refer to the Outgoing Mail (SMTP) Server settings in [Read Gmail messages on other email clients using POP](https://support.google.com/mail/answer/7104828?hl=en) for more information. If the settings above don't work for you, check with your email administrator.
