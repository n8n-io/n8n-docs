---
title: Restrict account registration to email-verified users
description: Require all new accounts to be verified by email.
contentType: howto
nodeTitle: Verify user emails
originalFilePath: hosting/securing/restrict-by-email-verification.md
originalUrl: 'https://docs.n8n.io/hosting/securing/restrict-by-email-verification'
url: 'https://docs.n8n.io/deploy/host-n8n/configure-n8n/security/verify-user-emails'
layout:
  description:
    visible: false
---

# Restrict account registration to email-verified users <a href="#restrict-account-registration-to-email-verified-users" id="restrict-account-registration-to-email-verified-users"></a>

You can require all new accounts to be verified by email. This prevents malicious admins from registering accounts without email verification.

## Prerequisites <a href="#prerequisites" id="prerequisites"></a>

* SMTP must be set up and n8n must be able to send emails.

## How to restrict account registration <a href="#how-to-restrict-account-registration" id="how-to-restrict-account-registration"></a>

Set the environment variable `N8N_INVITE_LINKS_EMAIL_ONLY` to `true`. This locks down your instance so that only users with verified email addresses can register.

For more details on configuring SMTP, see [Set up SMTP](../user-management.md#step-one-smtp).
