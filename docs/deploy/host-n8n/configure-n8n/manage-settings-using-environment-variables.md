---
title: Manage instance settings using environment variables
description: >-
  Configure a self-hosted n8n instance owner, SSO, security policy, log
  streaming, MCP, and community packages from environment variables.
contentType: overview
nodeTitle: Manage settings using environment variables
originalFilePath: hosting/configuration/settings-env-vars.md
originalUrl: 'https://docs.n8n.io/hosting/configuration/settings-env-vars'
url: >-
  https://docs.n8n.io/deploy/host-n8n/configure-n8n/manage-settings-using-environment-variables
layout:
  description:
    visible: false
---

# Manage instance settings using environment variables <a href="#manage-instance-settings-using-environment-variables" id="manage-instance-settings-using-environment-variables"></a>

You can manage a subset of instance settings from environment variables, instead of configuring them through the UI. This is useful when you provision n8n instances automatically, such as through an internal deployment pipeline.

Each supported area has a dedicated environment variable named `<AREA>_MANAGED_BY_ENV`. Set this variable to `true` to activate environment variable management for that area. n8n then applies the related environment variables and locks the matching UI controls.

## How it works <a href="#how-it-works" id="how-it-works"></a>

When you set `<AREA>_MANAGED_BY_ENV` to `true`:

* n8n reapplies the settings from environment variables **on every startup**.
* The matching UI controls become **read-only**.

When `<AREA>_MANAGED_BY_ENV` is `false` (the default), n8n ignores the related environment variables, even if you set them.

{% hint style="info" %}
**Values persist when you turn off `*_MANAGED_BY_ENV`**

Setting `*_MANAGED_BY_ENV` back to `false` restores UI write access but keeps the values that were last applied. Edit them through the UI afterward if you want to change them.
{% endhint %}

{% hint style="info" %}
**Unexpected read-only UI controls**

If a setting appears as read-only and you didn't expect it, check whether the matching `*_MANAGED_BY_ENV` variable is `true` in your environment.
{% endhint %}

The supported areas and their activating variables:

* Instance owner: `N8N_INSTANCE_OWNER_MANAGED_BY_ENV`
* SSO: `N8N_SSO_MANAGED_BY_ENV`
* Security policy: `N8N_SECURITY_POLICY_MANAGED_BY_ENV`
* Log streaming: `N8N_LOG_STREAMING_MANAGED_BY_ENV`
* MCP: `N8N_MCP_MANAGED_BY_ENV`
* Community packages: `N8N_COMMUNITY_PACKAGES_MANAGED_BY_ENV`

{% hint style="info" %}
**Set `<AREA>_MANAGED_BY_ENV` to activate the group**

The other environment variables for an area have no effect unless `<AREA>_MANAGED_BY_ENV` is `true`. Set it to `true` to activate the group.
{% endhint %}

## Instance owner <a href="#instance-owner" id="instance-owner"></a>

{% hint style="info" %}
**Available from n8n v2.17.0**


{% endhint %}

Pre-provision the [instance owner](user-management.md) from environment variables instead of going through the in-app setup. To change the owner email after setup, see [Change the instance owner email for self-hosted n8n](change-instance-owner-email.md).

{% hint style="warning" %}
**`N8N_INSTANCE_OWNER_PASSWORD_HASH` must be a bcrypt hash**

This variable expects a pre-hashed bcrypt value. Setting a plaintext password breaks login.
{% endhint %}

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/75cM0VtFejV1gnDTFOSV/" %}

## SSO <a href="#sso" id="sso"></a>

{% hint style="info" %}
**Available from n8n v2.18.0**


{% endhint %}

{% hint style="info" %}
**Feature availability**

Single sign-on is available on Business and Enterprise plans.
{% endhint %}

Configure [single sign-on](security/configure-sso.md) from environment variables.

### Activation and shared settings <a href="#activation-and-shared-settings" id="activation-and-shared-settings"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/TJ7IUBpRrfLoXyEn4T4d/" %}

### OIDC <a href="#oidc" id="oidc"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/SBpz79jvy94Y5dKIvxqR/" %}

### SAML <a href="#saml" id="saml"></a>

{% hint style="warning" %}
**SAML metadata variables are mutually exclusive**

Set either `N8N_SSO_SAML_METADATA` (inline XML) or `N8N_SSO_SAML_METADATA_URL` (URL), not both.
{% endhint %}

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/NnYMdwgkElS7TK37owd0/" %}

## Security policy <a href="#security-policy" id="security-policy"></a>

{% hint style="info" %}
**Available from n8n v2.18.0**


{% endhint %}

Manage the instance security policy from environment variables, including MFA enforcement and personal space restrictions.

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/xVIddGVtWAPFZlRYTrwL/" %}

## Log streaming <a href="#log-streaming" id="log-streaming"></a>

{% hint style="info" %}
**Available from n8n v2.19.0**


{% endhint %}

Manage [log streaming](https://app.gitbook.com/s/wMJrGrimpx3PxCJpUswm/observe-and-log/stream-logs-to-external-systems) destinations from environment variables. See [Configure using environment variables](https://app.gitbook.com/s/wMJrGrimpx3PxCJpUswm/observe-and-log/stream-logs-to-external-systems#configure-using-environment-variables) for the per-destination JSON shape.

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/JvN9TDUUWTwpWaT83YrH/" %}

## MCP <a href="#mcp" id="mcp"></a>

{% hint style="info" %}
**Available from n8n v2.20.0**


{% endhint %}

Manage [instance-level MCP access](https://app.gitbook.com/s/r7wKI4I1BgdBCuq5Cvcx/connect-to-n8n-mcp-server) from environment variables.

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/Gf4nC8Xoy8uJDma1fIYg/" %}

## Community packages <a href="#community-packages" id="community-packages"></a>

{% hint style="info" %}
**Available from n8n v2.21.0**


{% endhint %}

Manage the set of installed [community packages](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/community-nodes/installation-and-management) from environment variables. n8n reconciles the installed packages against the list on every startup. Managed packages can't be uninstalled or updated through the UI.

`N8N_COMMUNITY_PACKAGES_ENABLED` must also be set to `true` (the default). When community packages are disabled, n8n ignores `N8N_COMMUNITY_PACKAGES_MANAGED_BY_ENV` and logs a warning.

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/w3ftfKhp9KdsaTfUFHE8/" %}

## Combined example <a href="#combined-example" id="combined-example"></a>

The following example configures an instance with all six areas managed by environment variables. It creates the instance owner, configures OIDC SSO, enforces MFA, registers a webhook log streaming destination, enables MCP access, and manages a community package.

```bash
# Instance owner <a href="#instance-owner" id="instance-owner"></a>
export N8N_INSTANCE_OWNER_MANAGED_BY_ENV=true
export N8N_INSTANCE_OWNER_EMAIL=<owner-email>
export N8N_INSTANCE_OWNER_FIRST_NAME=<first-name>
export N8N_INSTANCE_OWNER_LAST_NAME=<last-name>
export N8N_INSTANCE_OWNER_PASSWORD_HASH=<bcrypt-hash>

# SSO using OIDC <a href="#sso-using-oidc" id="sso-using-oidc"></a>
export N8N_SSO_MANAGED_BY_ENV=true
export N8N_SSO_USER_ROLE_PROVISIONING=instance_role
export N8N_SSO_OIDC_LOGIN_ENABLED=true
export N8N_SSO_OIDC_CLIENT_ID=<client-id>
export N8N_SSO_OIDC_CLIENT_SECRET=<client-secret>
export N8N_SSO_OIDC_DISCOVERY_ENDPOINT=<discovery-url>

# Security policy <a href="#security-policy" id="security-policy"></a>
export N8N_SECURITY_POLICY_MANAGED_BY_ENV=true
export N8N_MFA_ENFORCED_ENABLED=true
export N8N_PERSONAL_SPACE_PUBLISHING_ENABLED=false
export N8N_PERSONAL_SPACE_SHARING_ENABLED=false

# Log streaming <a href="#log-streaming" id="log-streaming"></a>
export N8N_LOG_STREAMING_MANAGED_BY_ENV=true
export N8N_LOG_STREAMING_DESTINATIONS='[{"type":"webhook","url":"https://logs.example.com/n8n"}]'

# MCP <a href="#mcp" id="mcp"></a>
export N8N_MCP_MANAGED_BY_ENV=true
export N8N_MCP_ACCESS_ENABLED=true

# Community packages <a href="#community-packages" id="community-packages"></a>
export N8N_COMMUNITY_PACKAGES_MANAGED_BY_ENV=true
export N8N_COMMUNITY_PACKAGES='[{"name":"n8n-nodes-foo","version":"1.2.3"}]'
```

## Set environment variables <a href="#set-environment-variables" id="set-environment-variables"></a>

For the supported ways to set environment variables, see [Configuration methods](basic-configuration.md).
