---
description: Manage instance-wide security policies including MFA enforcement and personal space controls.
contentType: howto
---

# Security settings

/// info | Feature availability
Security settings are available on Enterprise plans. Some settings require specific license features. Settings that aren't available on your plan display an **Upgrade** badge.
///

Security settings let you manage instance-wide security policies. You can enforce two-factor authentication for all users and control what users can do in their personal spaces.

To access security settings, navigate to **Settings** > **Security**.

## Enforce two-factor authentication

You can require all users on your instance to set up two-factor authentication (2FA) when they sign in with email and password.

/// note | Applies to email and password logins only
MFA enforcement applies to users authenticating with email and password. Users signing in through SSO (SAML or OIDC) aren't affected by this setting.
///

To enforce 2FA:

1. Navigate to **Settings** > **Security**.
2. In the **Enforce two-factor authentication** section, toggle the switch on.

When you enable this setting:

- All users must set up 2FA before they can continue using the instance.
- Users who haven't configured 2FA yet are prompted to do so on their next sign-in.

To stop enforcing 2FA, toggle the switch off. Users who already set up 2FA keep it enabled but new users are no longer required to configure it.

Refer to [Two-factor authentication](/user-management/two-factor-auth.md) for more information on how individual users can set up 2FA.

## Personal space policies

/// info | Feature availability
Personal space policies require the **Personal Space Policy** license feature. If your plan doesn't include this feature, the toggles are disabled and display an upgrade prompt.
///

Personal space policies let instance admins control whether users can share and publish workflows and credentials from their personal spaces.

### Sharing workflows and credentials

Controls whether users can share workflows and credentials from their personal space with other users or projects.

To manage sharing:

1. Navigate to **Settings** > **Security**.
2. In the **Personal Space** section, find **Sharing workflows and credentials**.
3. Toggle the switch to enable or disable sharing.

When you disable sharing:

- A confirmation dialog appears warning that this prevents all future sharing from personal spaces.
- Existing shares remain in place. The setting only affects new sharing actions.
- The number of currently shared workflows and credentials is displayed below the toggle.

### Publishing workflows

Controls whether users can publish workflows from their personal space to make them available for execution.

To manage publishing:

1. Navigate to **Settings** > **Security**.
2. In the **Personal Space** section, find **Publishing workflows**.
3. Toggle the switch to enable or disable publishing.

When you disable publishing:

- A confirmation dialog appears warning that this prevents all future publish actions in personal spaces.
- Currently published workflows remain published. The setting only affects new publish actions.
- The number of currently published personal workflows is displayed below the toggle.

## API access

Instance admins can also manage these settings through the REST API:

- `GET /settings/security` - Retrieve current security settings and counts of existing shares and published workflows.
- `POST /settings/security` - Update sharing or publishing settings. Send `personalSpacePublishing` or `personalSpaceSharing` as boolean values.

Both endpoints require the `securitySettings:manage` global scope and an active **Personal Space Policy** license feature.
