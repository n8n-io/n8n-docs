---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: IMAP credentials
description: Documentation for IMAP credentials. Use these credentials to authenticate IMAP in n8n, a workflow automation platform.
contentType: integration
---

# IMAP credentials

You can use these credentials to authenticate the following nodes:

- [IMAP Email](/integrations/builtin/core-nodes/n8n-nodes-base.emailimap/)

## Prerequisites

Create an email account on a service with IMAP support.

## Supported authentication methods

- User account

## Related resources

Internet Message Access Protocol (IMAP) is a standard protocol for receiving email. Most email providers offer instructions on setting up their service with IMAP; refer to your provider's IMAP instructions.

## Using user account

To configure this credential, you'll need:

- A **User** name: The email address you're retrieving email for
- A **Password**: Either the password you use to check email or an app password. Your provider will tell you whether to use your own password or to generate an app password.
- A **Host**: The IMAP host address for your email provider, generally formatted as `imap.<provider>.com`. Check with your provider.
- A **Port** number: The default is port 993. Use this port unless your provider or email administrator tells you to use something different.

You can choose whether to use **SSL/TLS** and whether to **Allow Self-Signed Certificates**.

See below for more detailed instructions on some common email providers.

## Using Gmail

To configure the IMAP credential with a Gmail account, use these settings:

- **User**: Enter your Gmail email address.
- **Password**: Generate an **App password** and use that password in the n8n credential. Refer to Google's [Sign in with app passwords documentation](https://support.google.com/accounts/answer/185833?hl=en){:target=_blank .external-link} for detailed instructions.
- **Host**: Enter `imap.gmail.com`.
- **Port**: Keep the default Port number or check with your email administrator.
- **SSL/TLS**: Toggle on.
- **Allow Self-Signed Certificates**: Should work with either setting.

Refer to [Add Gmail to another client](https://support.google.com/mail/answer/7126229?hl=en){:target=_blank .external-link} for more information. You may need to **Enable IMAP** if you're using a personal Google account before June 2024.

## Using Yahoo Mail

To configure the IMAP credential with a Yahoo Mail account, use these settings:

- **User**: Enter your Yahoo email address.
- **Password**: Generate an **App password** and use that password in the n8n credential. Refer to Yahoo's [Generate and manage 3rd-party app passwords](https://help.yahoo.com/kb/generate-manage-third-party-passwords-sln15241.html){:target=_blank .external-link} for detailed instructions.
- **Host**: Enter `imap.mail.yahoo.com`.
- **Port**: Keep the default Port number or check with your email administrator.
- **SSL/TLS**: Toggle on.
- **Allow Self-Signed Certificates**: Should work with either setting.

Refer to [Set up IMAP for Yahoo mail account](https://help.yahoo.com/kb/sln4075.html){:target=_blank .external-link} for more information.

## Using Outlook.com

To configure the IMAP credential with Outlook.com account, use these settings:

- **User**: Enter your Outlook.com email address.
- **Password**: Enter your Outlook.com password. You can also use an app password, but Outlook.com does not require this. Refer to Outlook's [Create app passwords from the Security info (preview) page](https://support.microsoft.com/en-us/account-billing/create-app-passwords-from-the-security-info-preview-page-d8bc744a-ce3f-4d4d-89c9-eb38ab9d4137){:target=_blank .external-link} for detailed instructions.
- **Host**: Enter `outlook.office365.com`.
- **Port**: Keep the default Port number, which Outlook uses for both incoming and outgoing mail.
- **SSL/TLS**: Toggle on.
- **Allow Self-Signed Certificates**: Should work with either setting.

Refer to Microsoft's [POP, IMAP, and SMTP settings for Outlook.com](https://support.microsoft.com/en-us/office/pop-imap-and-smtp-settings-for-outlook-com-d088b986-291d-42b8-9564-9c414e2aa040){:target=_blank .external-link} documentation for more information.

If you receive a connection error, refer to the [Outlook.com IMAP connection errors](https://support.microsoft.com/en-us/office/pop-imap-and-smtp-settings-for-outlook-com-d088b986-291d-42b8-9564-9c414e2aa040){:target=_blank .external-link} section of Microsoft's documentation for more detailed troubleshooting steps.

