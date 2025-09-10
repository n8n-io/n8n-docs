---
title: IMAP credentials
description: Documentation for IMAP credentials. Use these credentials to authenticate IMAP in n8n, a workflow automation platform.
contentType: [integration, reference]
priority: high
---

# IMAP credentials

You can use these credentials to authenticate the following nodes:

- [IMAP Email](/integrations/builtin/core-nodes/n8n-nodes-base.emailimap.md)

## Prerequisites

Create an email account on a service with IMAP support.

## Supported authentication methods

- User account

## Related resources

Internet Message Access Protocol (IMAP) is a standard protocol for receiving email. Most email providers offer instructions on setting up their service with IMAP; refer to your provider's IMAP instructions.

## Using user account

To configure this credential, you'll need:

- A **User** name: The email address you're retrieving email for.
- A **Password**: Either the password you use to check email or an app password. Your provider will tell you whether to use your own password or to generate an app password.
- A **Host**: The IMAP host address for your email provider, often formatted as `imap.<provider>.com`. Check with your provider.
- A **Port** number: The default is port `993`. Use this port unless your provider or email administrator tells you to use something different.

Choose whether to use **SSL/TLS** and whether to **Allow Self-Signed Certificates**.

### Provider instructions

Refer to the quickstart guides for these common email providers.

#### Gmail

Refer to [Gmail](/integrations/builtin/credentials/imap/gmail.md).

#### Outlook.com

Refer to [Outlook.com](/integrations/builtin/credentials/imap/outlook.md).

#### Yahoo

Refer to [Yahoo](/integrations/builtin/credentials/imap/yahoo.md).

### My provider isn't listed

If your email provider isn't listed here, search for their `IMAP settings` or `IMAP instructions`.
