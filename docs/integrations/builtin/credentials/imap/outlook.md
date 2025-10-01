---
title: Outlook.com
description: Documentation for Outlook.com IMAP credentials. Use these credentials to authenticate Outlook.com IMAP in n8n, a workflow automation platform.
contentType: [integration, reference]
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

Refer to Microsoft's [POP, IMAP, and SMTP settings for Outlook.com](https://support.microsoft.com/en-us/office/pop-imap-and-smtp-settings-for-outlook-com-d088b986-291d-42b8-9564-9c414e2aa040) documentation for more information.

## Connection errors

You may receive a connection error if you configured your Outlook.com account as IMAP in multiple email clients. Microsoft is working on a fix for this. For now, try this workaround:

1. Go to [account.live.com/activity](https://account.live.com/activity) and sign in using the email address and password of the affected account.
1. Under **Recent activity**, find the **Session Type** event that matches the most recent time you received the connection error. Select it to expand the details.
1. Select **This was me** to approve the IMAP connection.
1. Retest your n8n credential.

Refer to [What is the Recent activity page?](https://support.microsoft.com/en-us/account-billing/what-is-the-recent-activity-page-23cf5556-4dbe-70da-82c8-bb3a8d8f8016) for more information on using this page.

The source for these instructions is [Outlook.com IMAP connection errors](https://support.microsoft.com/en-us/office/pop-imap-and-smtp-settings-for-outlook-com-d088b986-291d-42b8-9564-9c414e2aa040). Refer to that documentation for more information.

## Use an app password

--8<-- "_snippets/integrations/builtin/credentials/email/outlook-app-password.md"
