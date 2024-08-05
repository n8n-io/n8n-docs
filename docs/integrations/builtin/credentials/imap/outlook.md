---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Outlook.com
description: Documentation for Outlook.com IMAP credentials. Use these credentials to authenticate Outlook.com IMAP in n8n, a workflow automation platform.
contentType: integration
priority: high
---

# Outlook.com IMAP credentials

Follow these steps to configure the IMAP credentials with an Outlook.com account.

## Set up the credentials

To set up the IMAP credential with Outlook.com account, use these settings:

1. Enter your Outlook.com email address as the **User**.
2. Enter your Outlook.com password as the **Password**.

    /// note | App password
    Outlook.com doesn't require you to use an app password, but if you'd like to for security reasons, refer to [Use an app password](#use-an-app-password).
    ///

3. Enter `outlook.office365.com` as the **Host**.
4. For the **Port**, keep the default port number of `993`.
5. Turn on the **SSL/TLS** toggle.
6. Check with your email administrator about whether to **Allow Self-Signed Certificates**.

Refer to Microsoft's [POP, IMAP, and SMTP settings for Outlook.com](https://support.microsoft.com/en-us/office/pop-imap-and-smtp-settings-for-outlook-com-d088b986-291d-42b8-9564-9c414e2aa040){:target=_blank .external-link} documentation for more information.

## Connection errors

You may receive a connection error if you configured your Outlook.com account as IMAP in multiple email clients. Microsoft is working on a fix for this. For now, try this workaround:

1. Go to [account.live.com/activity](https://account.live.com/activity) and sign in using the email address and password of the affected account.
1. Under **Recent activity**, find the **Session Type** event that matches the most recent time you received the connection error. Select it to expand the details.
1. Select **This was me** to approve the IMAP connection.
1. Retest your n8n credential.

Refer to [What is the Recent activity page?](https://support.microsoft.com/en-us/account-billing/what-is-the-recent-activity-page-23cf5556-4dbe-70da-82c8-bb3a8d8f8016){:target=_blank .external-link} for more information on using this page.

The source for these instructions is [Outlook.com IMAP connection errors](https://support.microsoft.com/en-us/office/pop-imap-and-smtp-settings-for-outlook-com-d088b986-291d-42b8-9564-9c414e2aa040){:target=_blank .external-link}. Refer to that documentation for more information.

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