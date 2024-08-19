---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Outlook.com
description: Documentation for Outlook.com Send Email credentials. Use these credentials to authenticate Send Email with Outlook.com in n8n, a workflow automation platform.
contentType: integration
priority: high
---

# Outlook.com Send Email credentials

Follow these steps to configure the Send Email credentials with an Outlook.com account.

## Set up the credential

To configure the Send Email credential to use an Outlook.com account:

1. Enter your Outlook.com email address as the **User**.
2. Enter your Outlook.com password as the **Password**.

	/// note | App password
	Outlook.com doesn't require you to use an app password, but if you'd like to for security reasons, refer to [Use an app password](#use-an-app-password).
	///

4. Enter `smtp-mail.outlook.com` as the **Host**.
5. Enter `587` for the **Port**.
6. Turn on the **SSL/TLS** toggle.

Refer to Microsoft's [POP, IMAP, and SMTP settings for Outlook.com](https://support.microsoft.com/en-us/office/pop-imap-and-smtp-settings-for-outlook-com-d088b986-291d-42b8-9564-9c414e2aa040){:target=_blank .external-link} documentation for more information. If the settings above don't work for you, check with your email administrator.

## Use an app password

--8<-- "_snippets/integrations/builtin/credentials/email/outlook-app-password.md"
