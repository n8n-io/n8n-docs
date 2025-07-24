---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Send Email credentials
description: Documentation for Send Email credentials. Use these credentials to authenticate Send Email in n8n, a workflow automation platform.
contentType: [integration, reference]
priority: high
---

# Send Email credentials

You can use these credentials to authenticate the following nodes:

- [Send Email](/integrations/builtin/core-nodes/n8n-nodes-base.sendemail.md)

## Prerequisites

- Create an email account on a service that supports SMTP.
- Some email providers require that you enable or set up outgoing SMTP or generate an app password. Refer to your provider's documentation to see if there are other required steps.

## Supported authentication methods

- SMTP account

## Related resources

Simple Message Transfer Protocol (SMTP) is a standard protocol for sending and receiving email. Most email providers offer instructions on setting up their service with SMTP. Refer to your provider's SMTP instructions.

## Using SMTP account

To configure this credential, you'll need:

- A **User** email address
- A **Password**: This may be the user's password or an app password. Refer to the documentation for your email provider.
- The **Host**: The SMTP host address for your email provider, often formatted as `smtp.<provider>.com`. Check with your provider.
- A **Port** number: The default is port `465`, commonly used for SSL. Other common ports are `587` for TLS or `25` for no encryption. Check with your provider.
- **SSL/TLS**: When turned on, SMTP will use SSL/TLS.
- **Disable STARTTLS**: When SSL/TLS is disabled, the SMTP server can still try to [upgrade the TCP connection using STARTTLS](https://en.wikipedia.org/wiki/Opportunistic_TLS){:target=_blank .external-link}. Turning this on prevents that behaviour.
- **Client Host Name**: If needed by your provider, add a client host name. This name identifies the client to the server.

### Provider instructions

Refer to the quickstart guides for these common email providers.

#### Gmail

Refer to [Gmail](/integrations/builtin/credentials/sendemail/gmail.md).

#### Outlook.com

Refer to [Outlook.com](/integrations/builtin/credentials/sendemail/outlook.md).

#### Yahoo

Refer to [Yahoo](/integrations/builtin/credentials/sendemail/yahoo.md).

### My provider isn't listed

If your email provider isn't listed here, search for `SMTP settings` to find their instructions. (These instructions may also be included with `IMAP settings` or `POP settings`.)
