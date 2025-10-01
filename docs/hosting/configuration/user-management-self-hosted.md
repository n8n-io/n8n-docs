---
description: Configure self-hosted n8n for user management
contentType: howto
---

# Configure self-hosted n8n for user management

User management in n8n allows you to invite people to work in your n8n instance. 

This document describes how to configure your n8n instance to support user management, and the steps to start inviting users.

Refer to the main [User management](/user-management/index.md) guide for more information about usage, including:

* [Managing users](/user-management/manage-users.md)
* [Account types](/user-management/account-types.md)
* [Best practices](/user-management/best-practices.md)

For LDAP setup information, refer to [LDAP](/user-management/ldap.md).

For SAML setup information, refer to [SAML](/user-management/saml/index.md).

/// note | Basic auth and JWT removed
n8n removed support for basic auth and JWT in version 1.0.
///
## Setup

There are three stages to set up user management in n8n:

1. Configure your n8n instance to use your SMTP server.
2. Start n8n and follow the setup steps in the app.
3. Invite users.

### Step one: SMTP

n8n recommends setting up an SMTP server, for user invites and password resets. 

/// note | Optional from 0.210.1
From version 0.210.1 onward, this step is optional. You can choose to manually copy and send invite links instead of setting up SMTP. Note that if you skip this step, users can't reset passwords.
///
Get the following information from your SMTP provider:

* Server name
* SMTP username
* SMTP password
* SMTP sender name

To set up SMTP with n8n, configure the SMTP environment variables for your n8n instance. For information on how to set environment variables, refer to [Configuration](/hosting/configuration/configuration-methods.md)
<!-- vale off -->
| Variable | Type | Description | Required? |
| -------- | ---- | ----------- | --------- |
| `N8N_EMAIL_MODE` | string | `smtp` | Required |
| `N8N_SMTP_HOST` | string | _your_SMTP_server_name_ | Required |
| `N8N_SMTP_PORT` | number | _your_SMTP_server_port_ Default is `465`.| Optional |
| `N8N_SMTP_USER` | string | _your_SMTP_username_ | Optional |
| `N8N_SMTP_PASS` | string | _your_SMTP_password_ | Optional |
| `N8N_SMTP_OAUTH_SERVICE_CLIENT` | string | _your_OAuth_service_client_ | Optional |
| `N8N_SMTP_OAUTH_PRIVATE_KEY` | string | _your_OAuth_private_key_ | Optional |
| `N8N_SMTP_SENDER` | string | Sender email address. You can optionally include the sender name. Example with name: _N8N `<contact@n8n.com>`_ | Required |
| `N8N_SMTP_SSL` | boolean | Whether to use SSL for SMTP (true) or not (false). Defaults to `true`. | Optional | 
| `N8N_UM_EMAIL_TEMPLATES_INVITE` | string | Full path to your HTML email template. This overrides the default template for invite emails. | Optional |
| `N8N_UM_EMAIL_TEMPLATES_PWRESET` | string | Full path to your HTML email template. This overrides the default template for password reset emails. | Optional |
| `N8N_UM_EMAIL_TEMPLATES_WORKFLOW_SHARED` | String | Overrides the default HTML template for notifying users that a credential was shared. Provide the full path to the template. | Optional |
| `N8N_UM_EMAIL_TEMPLATES_CREDENTIALS_SHARED` | String | Overrides the default HTML template for notifying users that a credential was shared. Provide the full path to the template. | Optional |
| `N8N_UM_EMAIL_TEMPLATES_PROJECT_SHARED` | String | Overrides the default HTML template for notifying users that a project was shared. Provide the full path to the template. | Optional |

<!-- vale on-->
If your n8n instance is already running, you need to restart it to enable the new SMTP settings.

/// note | More configuration options
There are more configuration options available as environment variables. Refer to [Environment variables](/hosting/configuration/environment-variables/index.md) for a list. These include options to disable tags, workflow templates, and the personalization survey, if you don't want your users to see them.
///

/// note | New to SMTP?
If you're not familiar with SMTP, this [blog post by SendGrid](https://sendgrid.com/blog/what-is-an-smtp-server/) offers a short introduction, while [Wikipedia's Simple Mail Transfer Protocol article](https://en.wikipedia.org/wiki/Simple_Mail_Transfer_Protocol) provides more detailed technical background.
///

### Step two: In-app setup

--8<-- "_snippets/user-management/in-app-setup.md"

### Step three: Invite users

--8<-- "_snippets/user-management/invite-users.md"
