---
description: Configure self-hosted n8n for user management
contentType: howto
nodeTitle: User management
originalFilePath: hosting/configuration/user-management-self-hosted.md
originalUrl: 'https://docs.n8n.io/hosting/configuration/user-management-self-hosted'
url: 'https://docs.n8n.io/deploy/host-n8n/configure-n8n/user-management'
layout:
  description:
    visible: false
---

# Configure self-hosted n8n for user management <a href="#configure-self-hosted-n8n-for-user-management" id="configure-self-hosted-n8n-for-user-management"></a>

User management in n8n allows you to invite people to work in your n8n instance. 

This document describes how to configure your n8n instance to support user management, and the steps to start inviting users.

Refer to the main [User management](https://app.gitbook.com/s/wMJrGrimpx3PxCJpUswm/manage-users-and-access) guide for more information about usage, including:

* [Managing users](https://app.gitbook.com/s/wMJrGrimpx3PxCJpUswm/manage-users-and-access/add-and-remove-users)
* [Account types](https://app.gitbook.com/s/wMJrGrimpx3PxCJpUswm/manage-users-and-access/understand-account-types)
* [Best practices](https://app.gitbook.com/s/wMJrGrimpx3PxCJpUswm/manage-users-and-access/follow-best-practices)

For LDAP setup information, refer to [LDAP](https://app.gitbook.com/s/wMJrGrimpx3PxCJpUswm/manage-users-and-access/verify-user-identity/connect-ldap).

For SAML setup information, refer to [SAML](https://app.gitbook.com/s/wMJrGrimpx3PxCJpUswm/manage-users-and-access/verify-user-identity/use-saml).

{% hint style="info" %}
**Unsupported user management methods**

In version 1.0, n8n:
- Removed support for **basic auth** and **JWT** 
- Removed the `N8N_USER_MANAGEMENT_DISABLED` environment variable. No supported way to disable the login screen exists in recent versions of n8n, including for local or development use. If you need to simplify login for local development, consider using a password manager, setting a simple local password, or scripting the standard login flow.
{% endhint %}
## Setup <a href="#setup" id="setup"></a>

There are three stages to set up user management in n8n:

1. Configure your n8n instance to use your SMTP server.
2. Start n8n and follow the setup steps in the app.
3. Invite users.

### Step one: SMTP <a href="#step-one-smtp" id="step-one-smtp"></a>

n8n recommends setting up an SMTP server, for user invites and password resets. 

{% hint style="info" %}
**Optional from 0.210.1**

From version 0.210.1 onward, this step is optional. You can choose to manually copy and send invite links instead of setting up SMTP. Note that if you skip this step, users can't reset passwords.
{% endhint %}
Get the following information from your SMTP provider:

* Server name
* SMTP username
* SMTP password
* SMTP sender name

To set up SMTP with n8n, configure the SMTP environment variables for your n8n instance. For information on how to set environment variables, refer to [Configuration](basic-configuration.md)

| Variable | Type | Description | Required? |
| -------- | ---- | ----------- | --------- |
| `N8N_EMAIL_MODE` | string | `smtp` | Required |
| `N8N_SMTP_HOST` | string | _your_SMTP_server_name_ | Required |
| `N8N_SMTP_PORT` | number | _your_SMTP_server_port_ Default is `465`.| Optional |
| `N8N_SMTP_USER` | string | _your_SMTP_username_ | Optional |
| `N8N_SMTP_PASS` | string | _your_SMTP_password_ | Optional |
| `N8N_SMTP_OAUTH_SERVICE_CLIENT` | string | _your_OAuth_service_client_ | Optional |
| `N8N_SMTP_OAUTH_PRIVATE_KEY` | string | _your_OAuth_private_key_ | Optional |
| `N8N_SMTP_SENDER` | string | Sender email address. You can optionally include the sender name. Example with name: _n8n `<contact@n8n.com>`_ | Required |
| `N8N_SMTP_SSL` | boolean | Whether to use SSL for SMTP (true) or not (false). Defaults to `true`. | Optional | 
| `N8N_UM_EMAIL_TEMPLATES_INVITE` | string | Full path to your HTML email template. This overrides the default template for invite emails. | Optional |
| `N8N_UM_EMAIL_TEMPLATES_PWRESET` | string | Full path to your HTML email template. This overrides the default template for password reset emails. | Optional |
| `N8N_UM_EMAIL_TEMPLATES_WORKFLOW_SHARED` | String | Overrides the default HTML template for notifying users that a credential was shared. Provide the full path to the template. | Optional |
| `N8N_UM_EMAIL_TEMPLATES_CREDENTIALS_SHARED` | String | Overrides the default HTML template for notifying users that a credential was shared. Provide the full path to the template. | Optional |
| `N8N_UM_EMAIL_TEMPLATES_PROJECT_SHARED` | String | Overrides the default HTML template for notifying users that a project was shared. Provide the full path to the template. | Optional |


If your n8n instance is already running, you need to restart it to enable the new SMTP settings.

{% hint style="info" %}
**More configuration options**

There are more configuration options available as environment variables. Refer to [Environment variables](basic-configuration/use-environment-variables/README.md) for a list. These include options to disable tags, workflow templates, and the personalization survey, if you don't want your users to see them.
{% endhint %}

{% hint style="info" %}
**New to SMTP?**

If you're not familiar with SMTP, this [blog post by SendGrid](https://sendgrid.com/blog/what-is-an-smtp-server/) offers a short introduction, while [Wikipedia's Simple Mail Transfer Protocol article](https://en.wikipedia.org/wiki/Simple_Mail_Transfer_Protocol) provides more detailed technical background.
{% endhint %}

### Step two: In-app setup <a href="#step-two-in-app-setup" id="step-two-in-app-setup"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/c0111xcskz1G8PKOQogB/" %}

#### Pre-provision the instance owner from environment variables <a href="#pre-provision-the-instance-owner-from-environment-variables" id="pre-provision-the-instance-owner-from-environment-variables"></a>

{% hint style="info" %}
**Available from n8n v2.17.0**


{% endhint %}

You can pre-provision the instance owner from environment variables instead of going through the in-app setup. Set `N8N_INSTANCE_OWNER_MANAGED_BY_ENV` to `true` and provide the owner details. See [Manage instance settings using environment variables](manage-settings-using-environment-variables.md) for how the activation pattern works.

To change the owner email after setup, see [Change the instance owner email for self-hosted n8n](change-instance-owner-email.md).

{% hint style="warning" %}
**`N8N_INSTANCE_OWNER_PASSWORD_HASH` must be a bcrypt hash**

This variable expects a pre-hashed bcrypt value. Setting a plaintext password breaks login.
{% endhint %}

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/75cM0VtFejV1gnDTFOSV/" %}

### Step three: Invite users <a href="#step-three-invite-users" id="step-three-invite-users"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/8qoOEjsLz4RnydVBogNy/" %}
