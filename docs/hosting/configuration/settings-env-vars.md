---
title: Manage instance settings using environment variables
description: Configure a self-hosted n8n instance owner, SSO, security policy, and log streaming settings from environment variables.
contentType: overview
---

# Manage instance settings using environment variables

You can manage a subset of instance settings from environment variables, instead of configuring them through the UI. This is useful when you provision n8n instances automatically, such as through an internal deployment pipeline.

Each supported area has a dedicated environment variable named `<AREA>_MANAGED_BY_ENV`. Set this variable to `true` to activate environment variable management for that area. n8n then applies the related environment variables and locks the matching UI controls.

## How it works

When you set `<AREA>_MANAGED_BY_ENV` to `true`:

* n8n reapplies the settings from environment variables **on every startup**.
* The matching UI controls become **read-only**.

When `<AREA>_MANAGED_BY_ENV` is `false` (the default), n8n ignores the related environment variables, even if you set them.

/// note | Values persist when you turn off `*_MANAGED_BY_ENV`
Setting `*_MANAGED_BY_ENV` back to `false` restores UI write access but keeps the values that were last applied. Edit them through the UI afterward if you want to change them.
///

/// note | Unexpected read-only UI controls
If a setting appears as read-only and you didn't expect it, check whether the matching `*_MANAGED_BY_ENV` variable is `true` in your environment.
///

The four supported areas and their activating variables:

* Instance owner: `N8N_INSTANCE_OWNER_MANAGED_BY_ENV`
* SSO: `N8N_SSO_MANAGED_BY_ENV`
* Security policy: `N8N_SECURITY_POLICY_MANAGED_BY_ENV`
* Log streaming: `N8N_LOG_STREAMING_MANAGED_BY_ENV`

/// note | Set `<AREA>_MANAGED_BY_ENV` to activate the group
The other environment variables for an area have no effect unless `<AREA>_MANAGED_BY_ENV` is `true`. Set it to `true` to activate the group.
///

## Instance owner

/// info | Available from n8n v2.17.0
///

Pre-provision the [instance owner](/hosting/configuration/user-management-self-hosted.md) from environment variables instead of going through the in-app setup.

/// warning | `N8N_INSTANCE_OWNER_PASSWORD_HASH` must be a bcrypt hash
This variable expects a pre-hashed bcrypt value. Setting a plaintext password breaks login.
///

--8<-- "_snippets/self-hosting/configuration/environment-variables/settings-env-vars/instance-owner.md"

## SSO

/// info | Available from n8n v2.18.0
///

/// info | Feature availability
Single sign-on is available on Business and Enterprise plans.
///

Configure [single sign-on](/hosting/securing/set-up-sso.md) from environment variables.

### Activation and shared settings

--8<-- "_snippets/self-hosting/configuration/environment-variables/settings-env-vars/sso-activation.md"

### OIDC

--8<-- "_snippets/self-hosting/configuration/environment-variables/settings-env-vars/sso-oidc.md"

### SAML

/// warning | SAML metadata variables are mutually exclusive
Set either `N8N_SSO_SAML_METADATA` (inline XML) or `N8N_SSO_SAML_METADATA_URL` (URL), not both.
///

--8<-- "_snippets/self-hosting/configuration/environment-variables/settings-env-vars/sso-saml.md"

## Security policy

/// info | Available from n8n v2.18.0
///

Manage the instance security policy from environment variables, including MFA enforcement and personal space restrictions.

--8<-- "_snippets/self-hosting/configuration/environment-variables/settings-env-vars/security-policy.md"

## Log streaming

/// info | Available from n8n v2.19.0
///

Manage [log streaming](/log-streaming.md) destinations from environment variables. See [Configure using environment variables](/log-streaming.md#configure-using-environment-variables) for the per-destination JSON shape.

--8<-- "_snippets/self-hosting/configuration/environment-variables/settings-env-vars/log-streaming.md"

## Combined example

The following example configures an instance with all four areas managed by environment variables. It creates the instance owner, configures OIDC SSO, enforces MFA, and registers a webhook log streaming destination.

```bash
# Instance owner
export N8N_INSTANCE_OWNER_MANAGED_BY_ENV=true
export N8N_INSTANCE_OWNER_EMAIL=<owner-email>
export N8N_INSTANCE_OWNER_FIRST_NAME=<first-name>
export N8N_INSTANCE_OWNER_LAST_NAME=<last-name>
export N8N_INSTANCE_OWNER_PASSWORD_HASH=<bcrypt-hash>

# SSO using OIDC
export N8N_SSO_MANAGED_BY_ENV=true
export N8N_SSO_USER_ROLE_PROVISIONING=instance_role
export N8N_SSO_OIDC_LOGIN_ENABLED=true
export N8N_SSO_OIDC_CLIENT_ID=<client-id>
export N8N_SSO_OIDC_CLIENT_SECRET=<client-secret>
export N8N_SSO_OIDC_DISCOVERY_ENDPOINT=<discovery-url>

# Security policy
export N8N_SECURITY_POLICY_MANAGED_BY_ENV=true
export N8N_MFA_ENFORCED_ENABLED=true
export N8N_PERSONAL_SPACE_PUBLISHING_ENABLED=false
export N8N_PERSONAL_SPACE_SHARING_ENABLED=false

# Log streaming
export N8N_LOG_STREAMING_MANAGED_BY_ENV=true
export N8N_LOG_STREAMING_DESTINATIONS='[{"type":"webhook","url":"https://logs.example.com/n8n"}]'
```

## Set environment variables

For the supported ways to set environment variables, see [Configuration methods](/hosting/configuration/configuration-methods.md).
