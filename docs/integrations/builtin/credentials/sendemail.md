---
title: Send Email credentials
description: Documentation for Send Email credentials. Use these credentials to authenticate Send Email in n8n, a workflow automation platform.
contentType: integration
---

# Send Email credentials

You can use these credentials to authenticate the following nodes:

- [Send Email](/integrations/builtin/core-nodes/n8n-nodes-base.sendemail/)

## Prerequisites

- Create an email account on a service that supports SMTP.
- Some email providers require that you enable or set up outgoing SMTP or generate an app password. Refer to your provider's documentation to see if there are other required steps.

## Supported authentication methods

- SMTP account

## Related resources

Simple Message Transfer Protocol (SMTP) is a standard protocol for sending and receiving email. Most email providers offer instructions on setting up their service with SMTP; refer to your provider's SMTP instructions.

## Using SMTP account

To configure this credential, you'll need:

- A **User** email address
- A **Password**: Depending on your email provider, this may be the user's password or an app password. Refer to the documentation for your email provider.
- The **Host**: The SMTP host address for your email provider, often formatted as `smtp.<provider>.com`. Check with your provider.
- A **Port** number: The default is port 465, commonly used for SSL. Other common ports are 587 for TLS or 25 for no encryption. Check with your provider.
- **SSL/TLS**: When turned on, SMTP will use SSL/TLS.
- **Client Host Name**: If needed by your provider, add a client host name. This name identifies the client to the server.

Quickstart guides to some common email providers are below.

### Using Gmail

To configure the SMTP credential with a Gmail account, use these settings:

- **User**: Enter your Gmail email address.
- **Password**: Generate an **App password** and use that password in the n8n credential. Refer to Google's [Sign in with app passwords documentation](https://support.google.com/accounts/answer/185833?hl=en){:target=_blank .external-link} for detailed instructions.
- **Host**: Enter `smtp.gmail.com`.
- **Port**: Keep the default 465 for SSL; enter `587` for TLS; or check with your email administrator.
- **SSL/TLS**: Toggle on.

Refer to the Outgoing Mail (SMTP) Server settings in [Read Gmail messages on other email clients using POP](https://support.google.com/mail/answer/7104828?hl=en){:target=_blank .external-link} for more information.

### Using Yahoo Mail

To configure the SMTP credential with a Yahoo Mail account, use these settings:

- **User**: Enter your Yahoo email address.
- **Password**: Generate an **App password** and use that password in the n8n credential. Refer to Yahoo's [Generate and manage 3rd-party app passwords](https://help.yahoo.com/kb/generate-manage-third-party-passwords-sln15241.html){:target=_blank .external-link} for detailed instructions.
- **Host**: Enter `smtp.mail.yahoo.com`.
- **Port**: Yahoo supports the default `465` and `587`; check with your email administrator.
- **SSL/TLS**: Toggle on.

Refer to [IMAP server settings for Yahoo Mail](https://help.yahoo.com/kb/sln4075.html){:target=_blank .external-link} for more information.

### Using Outlook.com

To configure the SMTP credential with Outlook.com account, use these settings:

- **User**: Enter your Outlook.com email address.
- **Password**: Enter your Outlook.com password. You can also use an app password, but Outlook.com doesn't require one. Refer to Outlook's [Create app passwords from the Security info (preview) page](https://support.microsoft.com/en-us/account-billing/create-app-passwords-from-the-security-info-preview-page-d8bc744a-ce3f-4d4d-89c9-eb38ab9d4137){:target=_blank .external-link} for detailed instructions.
- **Host**: Enter `smtp-mail.outlook.com`.
- **Port**: Enter `587`.
- **SSL/TLS**: Toggle on.

Refer to Microsoft's [POP, IMAP, and SMTP settings for Outlook.com](https://support.microsoft.com/en-us/office/pop-imap-and-smtp-settings-for-outlook-com-d088b986-291d-42b8-9564-9c414e2aa040){:target=_blank .external-link} documentation for more information.

