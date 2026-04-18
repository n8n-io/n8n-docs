---
title: User management SMTP, and two-factor authentication environment variables
description: Environment variables to set up user management and emails.
contentType: reference
tags:
  - environment variables
hide:
  - toc
  - tags
---

# User management SMTP, and two-factor authentication environment variables

--8<-- "_snippets/self-hosting/file-based-configuration.md"

Refer to [User management](/hosting/configuration/user-management-self-hosted.md) for more information on setting up user management and emails.
<!-- vale off -->
| Variable | Type | Default | Description |
| :------- | :--- | :------ | :---------- |
| `N8N_EMAIL_MODE` | String | `smtp` | Enable emails. |
| `N8N_SMTP_HOST` | String | - | _your_SMTP_server_name_ |
| `N8N_SMTP_PORT` | Number | - | _your_SMTP_server_port_ |
| `N8N_SMTP_USER` | String | - | _your_SMTP_username_ |
| `N8N_SMTP_PASS` | String | - | _your_SMTP_password_ |
| `N8N_SMTP_OAUTH_SERVICE_CLIENT` | String | - | If using 2LO with a service account this is your client ID |
| `N8N_SMTP_OAUTH_PRIVATE_KEY` | String | - | If using 2LO with a service account this is your private key |
| `N8N_SMTP_SENDER` | String | - | Sender email address. You can optionally include the sender name. Example with name: _n8n `<contact@n8n.com>`_ |
| `N8N_SMTP_SSL` | Boolean | `true` | Whether to use SSL for SMTP (true) or not (false). |
| `N8N_SMTP_STARTTLS` | Boolean | `true` | Whether to use STARTTLS for SMTP (true) or not (false). |
| `N8N_UM_EMAIL_TEMPLATES_INVITE` | String | - | Full path to your HTML email template. This overrides the default template for invite emails. |
| `N8N_UM_EMAIL_TEMPLATES_PWRESET` | String | - | Full path to your HTML email template. This overrides the default template for password reset emails. |
| `N8N_UM_EMAIL_TEMPLATES_WORKFLOW_SHARED` | String | - | Overrides the default HTML template for notifying users that a workflow was shared. Provide the full path to the template. |
| `N8N_UM_EMAIL_TEMPLATES_CREDENTIALS_SHARED` | String | - | Overrides the default HTML template for notifying users that a credential was shared. Provide the full path to the template.  |
| `N8N_UM_EMAIL_TEMPLATES_PROJECT_SHARED` | String | - | Overrides the default HTML template for notifying users that a project was shared. Provide the full path to the template.  |
| `N8N_USER_MANAGEMENT_JWT_SECRET` | String | - | Set a specific JWT secret. By default, n8n generates one on start. |
| `N8N_USER_MANAGEMENT_JWT_DURATION_HOURS` | Number | 168 | Set an expiration date for the JWTs in hours. |
| `N8N_USER_MANAGEMENT_JWT_REFRESH_TIMEOUT_HOURS` | Number | 0 | How many hours before the JWT expires to automatically refresh it. 0 means 25% of `N8N_USER_MANAGEMENT_JWT_DURATION_HOURS`. -1 means it will never refresh, which forces users to log in again after the period defined in `N8N_USER_MANAGEMENT_JWT_DURATION_HOURS`. |
| `N8N_MFA_ENABLED` | Boolean | `true` | Whether to enable two-factor authentication (true) or disable (false). n8n ignores this if existing users have 2FA enabled. |
| `N8N_INVITE_LINKS_EMAIL_ONLY` | Boolean | `false` | When set to true, n8n will only deliver invite links via email and will not expose them through the API. This option enhances security by preventing invite URLs from being accessible programmatically, or to high privileged users. |
| `N8N_INSTANCE_OWNER_MANAGED_BY_ENV` | Boolean | `false` | When `true`, n8n manages the instance owner account from the `N8N_INSTANCE_OWNER_*` environment variables and overrides the owner's details on every startup. When `false` (the default), n8n ignores the other `N8N_INSTANCE_OWNER_*` variables even if you set them. |
| `N8N_INSTANCE_OWNER_EMAIL` | String | - | Email address for the instance owner account. Applied only when `N8N_INSTANCE_OWNER_MANAGED_BY_ENV` is `true`. |
| `N8N_INSTANCE_OWNER_FIRST_NAME` | String | `Instance` | First name for the instance owner account. Applied only when `N8N_INSTANCE_OWNER_MANAGED_BY_ENV` is `true`. |
| `N8N_INSTANCE_OWNER_LAST_NAME` | String | `Owner` | Last name for the instance owner account. Applied only when `N8N_INSTANCE_OWNER_MANAGED_BY_ENV` is `true`. |
| `N8N_INSTANCE_OWNER_PASSWORD_HASH` | String | - | Pre-hashed bcrypt password for the instance owner account. Provide the hash from an external secrets system or deployment pipeline. Don't supply a plaintext password: it breaks login. Applied only when `N8N_INSTANCE_OWNER_MANAGED_BY_ENV` is `true`. |
<!-- vale on -->
