---
title: 'User management SMTP, and two-factor authentication environment variables'
description: Environment variables to set up user management and emails.
contentType: reference
tags:
  - environment variables
hide:
  - toc
  - tags
nodeTitle: User management and 2FA
originalFilePath: hosting/configuration/environment-variables/user-management-smtp-2fa.md
originalUrl: >-
  https://docs.n8n.io/hosting/configuration/environment-variables/user-management-smtp-2fa
url: >-
  https://docs.n8n.io/deploy/host-n8n/configure-n8n/basic-configuration/use-environment-variables/user-management-and-2fa
layout:
  description:
    visible: false
---

# User management SMTP, and two-factor authentication environment variables <a href="#user-management-smtp-and-two-factor-authentication-environment-variables" id="user-management-smtp-and-two-factor-authentication-environment-variables"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/ASsLuMLGKMy2O0q7awMF/" %}

Refer to [User management](../../user-management.md) for more information on setting up user management and emails.

| Variable | Type | Default | Description |
| :------- | :--- | :------ | :---------- |
| `N8N_EMAIL_MODE` | String | `smtp` | Email delivery method: `smtp`, `microsoftGraph`, or empty to disable. |
| `N8N_SMTP_HOST` | String | - | _your_SMTP_server_name_ |
| `N8N_SMTP_PORT` | Number | - | _your_SMTP_server_port_ |
| `N8N_SMTP_USER` | String | - | _your_SMTP_username_ |
| `N8N_SMTP_PASS` | String | - | _your_SMTP_password_ |
| `N8N_SMTP_OAUTH_SERVICE_CLIENT` | String | - | If using 2LO with a service account this is your client ID |
| `N8N_SMTP_OAUTH_PRIVATE_KEY` | String | - | If using 2LO with a service account this is your private key |
| `N8N_SMTP_SENDER` | String | - | Sender email address. You can optionally include the sender name. Example with name: _n8n `<contact@n8n.com>`_ |
| `N8N_SMTP_SSL` | Boolean | `true` | Whether to use SSL for SMTP (true) or not (false). |
| `N8N_SMTP_STARTTLS` | Boolean | `true` | Whether to use STARTTLS for SMTP (true) or not (false). |
| `MICROSOFT_GRAPH_CLIENT_ID` | String | - | Microsoft Entra application (client) ID. Required when `N8N_EMAIL_MODE=microsoftGraph`. |
| `MICROSOFT_GRAPH_CLIENT_SECRET` | String | - | Microsoft Entra application client secret. Required when `N8N_EMAIL_MODE=microsoftGraph`. |
| `MICROSOFT_GRAPH_TENANT_ID` | String | - | Microsoft Entra directory (tenant) ID. Required when `N8N_EMAIL_MODE=microsoftGraph`. |
| `MICROSOFT_GRAPH_SENDER` | String | - | Mailbox to send from (UPN or object ID). Required for app-only `sendMail` when using Microsoft Graph mode. |
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

{% hint style="info" %}
**Microsoft Graph email**

When `N8N_EMAIL_MODE=microsoftGraph`, n8n sends system emails through the Microsoft Graph `sendMail` API using OAuth2 client-credentials. Register an app in Microsoft Entra with the `Mail.Send` application permission (admin-consented), then set the four `MICROSOFT_GRAPH_*` variables. n8n ignores the `N8N_SMTP_*` variables in this mode.
{% endhint %}


## Instance owner using environment variables <a href="#instance-owner-using-environment-variables" id="instance-owner-using-environment-variables"></a>

Set `N8N_INSTANCE_OWNER_MANAGED_BY_ENV` to `true` to pre-provision the instance owner from environment variables. See [Manage instance settings using environment variables](../../manage-settings-using-environment-variables.md) for how the activation pattern works.

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/75cM0VtFejV1gnDTFOSV/" %}
