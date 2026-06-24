---
description: >-
  Manage instance-wide security policies including MFA enforcement and personal
  space controls.
contentType: howto
nodeTitle: Manage security policies
originalFilePath: security-settings.md
originalUrl: 'https://docs.n8n.io/security-settings'
url: >-
  https://docs.n8n.io/deploy/host-n8n/configure-n8n/security/manage-security-policies
layout:
  description:
    visible: false
---

# Security settings <a href="#security-settings" id="security-settings"></a>

{% hint style="info" %}
**Feature availability**

Security settings are available on Business and Enterprise plans. Some settings require specific license features. Settings that aren't available on your plan display an **Upgrade** badge.
{% endhint %}

Security settings let you manage instance-wide security policies. You can enforce two-factor authentication for all users and control what users can do in their personal spaces.

To access security settings, navigate to **Settings** > **Security**.

## Enforce two-factor authentication <a href="#enforce-two-factor-authentication" id="enforce-two-factor-authentication"></a>

You can require all users on your instance to set up two-factor authentication (2FA) when they sign in with email and password.

{% hint style="info" %}
**Applies to email and password logins only**

2FA enforcement applies to users authenticating with email and password. Users signing in through SSO (SAML or OIDC) aren't affected by this setting.
{% endhint %}

To enforce 2FA:

1. Navigate to **Settings** > **Security**.
2. In the **Enforce two-factor authentication** section, toggle the switch on.

When you enable this setting:

- All users must set up 2FA before they can continue using the instance.
- Users who haven't configured 2FA yet are prompted to do so on their next sign-in.

To stop enforcing 2FA, toggle the switch off. Users who already set up 2FA keep it enabled but new users are no longer required to configure it.

Refer to [Two-factor authentication](https://app.gitbook.com/s/wMJrGrimpx3PxCJpUswm/manage-users-and-access/verify-user-identity/require-two-factor-auth) for more information on how individual users can set up 2FA.

## Personal space policies <a href="#personal-space-policies" id="personal-space-policies"></a>

Personal space policies let instance admins control whether users can share and publish workflows and credentials from their personal spaces.

### Sharing workflows and credentials <a href="#sharing-workflows-and-credentials" id="sharing-workflows-and-credentials"></a>

Controls whether users can share workflows and credentials from their personal space with other users or projects.

To manage sharing:

1. Navigate to **Settings** > **Security**.
2. In the **Personal Space** section, find **Sharing workflows and credentials**.
3. Toggle the switch to enable or disable sharing.

When you disable sharing:

- Existing shares remain in place. The setting only affects new sharing actions.
- The number of currently shared workflows and credentials is displayed below the toggle.

### Publishing workflows <a href="#publishing-workflows" id="publishing-workflows"></a>

Controls whether users can publish workflows from their personal space to make them available for execution.

To manage publishing:

1. Navigate to **Settings** > **Security**.
2. In the **Personal Space** section, find **Publishing workflows**.
3. Toggle the switch to enable or disable publishing.

When you disable publishing:

- Currently published workflows remain published. The setting only affects new publish actions.
- The number of currently published personal workflows is displayed below the toggle.

## Enforce execution data redaction <a href="#enforce-execution-data-redaction" id="enforce-execution-data-redaction"></a>

You can enforce [execution data redaction](redact-execution-data.md) for all workflows on the instance. Enforcement sets an instance-wide minimum redaction policy that individual workflow settings can't weaken.

{% hint style="info" %}
**Feature availability**

Data redaction enforcement is available on Enterprise Self-hosted and Enterprise Cloud plans.

**Available from:** n8n version 2.26.0
{% endhint %}

To enforce data redaction:

1. Navigate to **Settings** > **Security**.
2. In the **Data redaction** section, toggle **Enforce data redaction** on.
3. Under **Redact executions**, select the enforcement scope:
	- **Production executions (Recommended)**: n8n redacts data from production executions in all workflows.
	- **Manual and production executions**: n8n redacts data from both manual and production executions in all workflows.
4. Confirm your choice in the dialog.

When you enable enforcement:

- n8n redacts execution data for all workflows within the selected scope, including workflows that don't have redaction enabled in their own settings.
- Users can't set workflow-level redaction settings weaker than the enforced scope. Workflows can still opt into stricter redaction, for example redacting manual executions when only production enforcement is active.
- New workflows start with the enforced scope as their redaction policy.

Redaction enforcement requires an Enterprise license with the data redaction feature. For details on what redaction covers, revealing data, and permissions, refer to [Execution data redaction](redact-execution-data.md).

## Configure security policy with environment variables <a href="#configure-security-policy-with-environment-variables" id="configure-security-policy-with-environment-variables"></a>

You can also manage security policy settings from environment variables instead of through the UI. Available from n8n v2.18.0. Set `N8N_SECURITY_POLICY_MANAGED_BY_ENV` to `true` and provide the variables below. See [Manage instance settings using environment variables](../manage-settings-using-environment-variables.md) for how the activation pattern works.

When `N8N_SECURITY_POLICY_MANAGED_BY_ENV` is `true`, the **Enforce two-factor authentication** and **Personal Space** toggles on this page become read-only.

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/Hlnt6L4Wk4TL9ywOlK1S/" %}
