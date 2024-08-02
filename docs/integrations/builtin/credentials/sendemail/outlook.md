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
    - Outlook.com doesn't require you to use an app password, but if you'd like to for security reasons, refer to [Use an app password](#use-an-app-password).
///
3. Enter `smtp-mail.outlook.com` as the **Host**.
4. Enter `587` for the **Port**.
5. Turn on the **SSL/TLS** toggle.

Refer to Microsoft's [POP, IMAP, and SMTP settings for Outlook.com](https://support.microsoft.com/en-us/office/pop-imap-and-smtp-settings-for-outlook-com-d088b986-291d-42b8-9564-9c414e2aa040){:target=_blank .external-link} documentation for more information. If the settings above don't work for you, check with your email administrator.

## Use an app password

If you'd prefer to use an app password instead of your email account password:

1. Log into the [My Account](https://myaccount.microsoft.com/) page.
2. If you have a left navigation option for **Security Info**, jump to [Security Info app password](#security-info-app-password). If you don't have an option for **Security Info**, continue with these instructions.
3. Go to the [Additional security verification page](https://account.activedirectory.windowsazure.com/Proofup.aspx){:target=_blank .external-link}.
4. Select **App passwords** and **Create**.
5. Enter a **Name** for your app password, like `n8n credential`.
6. Use the option to **copy password to clipboard** and enter this as the **Password** in n8n instead of your email account password.

Refer to Outlook's [Manage app passwords for 2-step verification](https://support.microsoft.com/en-us/account-billing/manage-app-passwords-for-two-step-verification-d6dc8c6d-4bf7-4851-ad95-6d07799387e9){:target=_blank .external-link} page for more information.

### Security Info app password

If you have a left navigation option for **Security Info**:

1. Select **Security Info**. The Security Info page opens.
2. Select **+ Add method**.
3. On the **Add a method** page, select **App password** and then select **Add**.
4. Enter a **Name** for your app password, like `n8n credential`.
5. Copy the **Password** and enter this as the **Password** in n8n instead of your email account password.

Refer to Outlook's [Create app passwords from the Security info (preview)](https://support.microsoft.com/en-us/account-billing/create-app-passwords-from-the-security-info-preview-page-d8bc744a-ce3f-4d4d-89c9-eb38ab9d4137){:target=_blank .external-link} page for more information.
