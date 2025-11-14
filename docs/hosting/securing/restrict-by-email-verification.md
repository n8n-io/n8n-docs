---
title: Restrict account registration to email-verified users
description: "Require all new accounts to be verified by email."
contentType: howto
---

# Restrict account registration to email-verified users

You can require all new accounts to be verified by email. This prevents malicious admins from registering accounts without email verification.

## Prerequisites

* SMTP must be set up and n8n must be able to send emails.

## How to restrict account registration

Set the environment variable `N8N_INVITE_LINKS_EMAIL_ONLY` to `true`. This locks down your instance so that only users with verified email addresses can register.

For more details on configuring SMTP, see [Set up SMTP](/hosting/configuration/user-management-self-hosted.md/#step-one-smtp).