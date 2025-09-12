---
description: Configure self-hosted n8n for user management
contentType: howto
---

# Configure self-hosted n8n for user management

This document describes how to configure your self-hosted n8n instance to support user management. Once configured, you can add, delete, and manage users by following the [user management instructions](/user-management/manage-users.md).

## Set up SMTP for your instance

n8n recommends setting up an SMTP server for self-hosted n8n instances to use for user invites and password resets.

From [version 0.210.1](/release-notes/0-x.md#n8n02101) onward, this step is optional. You can choose to manually copy and send invite links instead of setting up SMTP. Please note however, that if you skip this step, users can't reset passwords.

/// note | New to SMTP?
If you're not familiar with SMTP, this [blog post by SendGrid](https://sendgrid.com/blog/what-is-an-smtp-server/) offers a short introduction, while [Wikipedia's Simple Mail Transfer Protocol article](https://en.wikipedia.org/wiki/Simple_Mail_Transfer_Protocol) provides more detailed technical background.
///

### Gather details from your SMTP provider

To get started, collect the following information from your SMTP provider:

* SMTP server host name
* SMTP server port
* SMTP account username
* SMTP account password

### Configure SMTP with environment variables

Next, use the information you gathered to configure SMTP in n8n. The [user management and SMTP environment variables](/hosting/configuration/environment-variables.md#user-management-smtp-and-two-factor-authentication) include all of the environment variables related to this process. You can find out how to set environment variables for your instance on the [configuration methods](/hosting/configuration/configuration-methods.md) page.

Some of the most important ones to configure include:

* `N8N_EMAIL_MODE`: Set to `smtp`.
* `N8N_SMTP_SENDER`: The email address and optional name you want to use as the sender for n8n-generated emails.
* `N8N_SMTP_HOST`: Set to your SMTP provider's server hostname.
* `N8N_SMTP_PORT`: Set to your SMTP provider's server port.
* `N8N_SMTP_USER`: Set to the username or email address for your SMTP account.
* `N8N_SMTP_PASS`: Set to your SMTP account's password.
* `N8N_SMTP_SSL`: Whether to use SSL for SMTP connections.

Some other items you might want to configure depending on your needs include:

* The `N8N_SMTP_OAUTH_*` variables if you're configuring SMTP using [two-legged OAuth (2LO) with a service account](https://developers.google.com/identity/protocols/oauth2/service-account).
* The `N8N_UM_EMAIL_TEMPLATES_*` variables to override the default email templates sent for various communications.

If your n8n instance is already running, restart it to enable new SMTP settings.

## Running behind a reverse proxy

If you run n8n behind a reverse proxy, set the following environment variables so that n8n generates emails with the correct URL:

* `N8N_HOST`
* `N8N_PORT`
* `N8N_PROTOCOL`
* `N8N_EDITOR_BASE_URL`  

More information on these variables is available in [deployment environment variables](/hosting/configuration/environment-variables.md#deployment).
