---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
description: How to enable 2FA for your n8n account
---

# Two-factor authentication (2FA)

Two-factor authentication (2FA) adds a second authentication method on top of username and password. This increases account security. n8n supports 2FA using an authenticator app.

## Enable 2FA

You need an authenticator app on your phone.

To enable 2FA in n8n:

1. Go to you **Settings** > **Personal**.
2. Select **Enable 2FA**. n8n opens a modal with a QR code.
3. Scan the QR code in your authenticator app.
4. Enter the code from your app in **Code from authenticator app**.
5. Select **Continue**. n8n displays recovery codes.
6. Save the recovery codes. You need these to regain access to your account if you lose your authenticator.

## Disable 2FA for your instance

Self-hosted users can configure their n8n instance to disable 2FA for all users by setting `N8N_MFA_ENABLED` to false. Note that n8n ignores this if existing users have 2FA enabled. Refer to [Configuration methods](/hosting/configuration/configuration-methods/) for more information on configuring your n8n instance with environment variables.
