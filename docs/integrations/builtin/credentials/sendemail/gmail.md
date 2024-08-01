---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Gmail
description: Documentation for Gmail Send Email credentials. Use these credentials to authenticate Send Email with Gmail in n8n, a workflow automation platform.
contentType: integration
priority: high
---

# Gmail Send Email credentials

Follow these steps to configure the Send Email credentials with a Gmail account.

## Prerequisites

To follow these instructions, you must first:

1. [Enable 2-step Verification](#enable-2-step-verification) on your Gmail account.
2. [Generate an app password](#generate-an-app-password).

### Enable 2-step Verification

To enable 2-step Verification:

1. Log in to your [Google Account](https://myaccount.google.com/){:target=_blank .external-link}.
2. Select **Security** from the left navigation.
3. Under **How you sign in to Google**, select **2-Step Verification**.
    - If 2-Step Verification is already enabled, skip to the next section.
4. Select **Get started**.
5. Follow the on-screen steps to configure 2-Step Verification.

Refer to [Turn on 2-step Verification](https://support.google.com/accounts/answer/185839){:target=_blank .external-link} for more information.

If you can't turn on 2-step Verification, check with your email administrator.

### Generate an app password

To generate an app password:

1. In your Google account, go to [App passwords](https://myaccount.google.com/apppasswords){:target=_blank .external-link}.
2. Enter an **App name** for your new app password, like `n8n credential`.
3. Select **Create**.
4. Copy the generated app password. You'll use this in your n8n credential.

Refer to Google's [Sign in with app passwords documentation](https://support.google.com/accounts/answer/185833?hl=en){:target=_blank .external-link} for more information.

## Set up the credential

To set up the Send Email credential to use Gmail:

1. Enter your Gmail email address as the **User**.
2. Enter the app password you generated above as the **Password**.
3. Enter `smtp.gmail.com` as the **Host**.
4. For the **Port**:
    - Keep the default `465` for SSL or if you're unsure what to use.
    - Enter `587` for TLS.
5. Turn on the **SSL/TLS** toggle.

Refer to the Outgoing Mail (SMTP) Server settings in [Read Gmail messages on other email clients using POP](https://support.google.com/mail/answer/7104828?hl=en){:target=_blank .external-link} for more information. If the settings above don't work for you, check with your email administrator.
