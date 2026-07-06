---
title: Azure AD SAML setup
description: Use Azure AD with n8n.
contentType: tutorial
nodeTitle: Set up Azure AD SAML
originalFilePath: user-management/saml/azuread.md
originalUrl: 'https://docs.n8n.io/user-management/saml/azuread'
url: >-
  https://docs.n8n.io/administer/manage-users-and-access/verify-user-identity/use-saml/set-up-azure-ad-saml
layout:
  description:
    visible: false
---

# Azure AD SAML setup <a href="#azure-ad-saml-setup" id="azure-ad-saml-setup"></a>

This document provides instructions for configuring Azure AD to send role information to n8n via SAML attributes. This enables automatic role assignment based on Azure AD group membership.

## Prerequisites <a href="#prerequisites" id="prerequisites"></a>

You need an Azure AD account with access to Enterprise Applications, and the redirect URL and entity ID from n8n's SAML settings.

Read the [Set up SAML](set-up-saml.md) guide first.

## What n8n requires <a href="#what-n8n-requires" id="what-n8n-requires"></a>

n8n expects a custom SAML attribute to be included in the SAML assertion:

| **Attribute Name** | **Data Type** | **Purpose** |
| ------------------- | ------------- | ----------- |
| n8n_instance_role | String | Controls the user's global role in n8n |

Valid values for `n8n_instance_role`:

| **Value** | **Description** |
| --------- | --------------- |
| `global:owner` | Full instance owner access |
| `global:admin` | Administrator access |
| `global:member` | Regular member access (default if not specified) |
| `global:chatUser` | Restricted, non-technical role in n8n designed for securely interacting with AI agents via the Chat Hub interface |

## Setup <a href="#setup" id="setup"></a>

**Step 1: Configure Standard SAML Attributes**

1. In your Azure AD portal, navigate to your n8n Enterprise Application.
2. Go to **Single sign-on** > **Attributes & Claims**.
3. Ensure these standard attributes are configured:

	| **Claim Name** | **Source Attribute** |
	| -------------- | ------------------- |
	| `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress` | user.mail |
	| `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/firstname` | user.givenname |
	| `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/lastname` | user.surname |
	| `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/upn` | user.userprincipalname |


**Step 2: Add the n8n_instance_role Claim**

This claim uses conditional logic to emit different role values based on Azure AD group membership.

1. In **Attributes & Claims**, click **Add new claim**.
2. Configure the basic settings:
	* **Name**: `n8n_instance_role`
	* **Namespace**: leave empty
	* **Source**: `Attribute`
3. Expand **Claim conditions** and click **Add condition**.
4. Add conditions for each Azure AD group (in priority order):

	| **User Type** | **Scoped Groups** | **Source** | **Value** |
	| ------------- | ----------------- | ---------- | --------- |
	| Members | n8n-chatusers | Attribute | `global:chatUser` |
	| Members | n8n-users | Attribute | `global:member` |
	| Members | n8n-admins | Attribute | `global:admin` |
	| Members | n8n-owners | Attribute | `global:owner` |

{% hint style="info" %}
**Condition order**

Conditions are evaluated in order. Place the most privileged group (owners) at the end.
{% endhint %}

5. Click **Save**.

### Testing the configuration <a href="#testing-the-configuration" id="testing-the-configuration"></a>

1. In n8n, go to **Settings** > **SSO**.
1. Set **Role assignment** to **Instance roles via SSO**.
1. Set **Role mapping method** to **Map rules on your IdP**.
1. Click **Test settings**.
1. Verify the SAML response shows the correct `n8n_instance_role` value.

### Troubleshooting <a href="#troubleshooting" id="troubleshooting"></a>

**Claim not appearing in SAML response**

* Verify the user is a member of at least one of the configured groups.
* Check that the groups are assigned to the Enterprise Application.
* Ensure conditions are configured with `Attribute` as the source.
* Use a browser extension plugin like 'SAML Chrome Panel' to view the application SAML response.

**User gets wrong role**

* Check condition order (most privileged group should be last).

## Assigning multiple project roles using app roles instead of group-based claims <a href="#assigning-multiple-project-roles-using-app-roles-instead-of-group-based-claims" id="assigning-multiple-project-roles-using-app-roles-instead-of-group-based-claims"></a>

Using Azure AD group-based claim conditions for assigning multiple project roles to users often results in only the first matching group claim being sent in the SAML assertion. This means users may see access to only one project despite belonging to several groups.

To reliably assign multiple projects with their respective roles, use **App Roles** defined in the App Registration instead of group-based claims:

1. In the **App Registration** for your n8n SAML app, define App Roles representing each project and permission combination (for example, `<projectId>:<role>`).
2. Save the updated App Manifest.
3. In the **Enterprise Application**, assign users or groups to these App Roles under **Users and groups**.
4. Update the `n8n_projects` SAML claim in **Single sign-on > Attributes & Claims** to source from `user.assignedroles`. This emits all assigned roles as an array in the SAML response.

This setup ensures n8n receives all project assignments correctly, enabling appropriate access across multiple projects. While defining App Roles adds initial administrative overhead, it simplifies ongoing user-role management and guarantees complete project role sync.

When migrating from group-based claims to App Roles, adjust your role definitions and claims mapping accordingly to prevent incomplete project access.

## References <a href="#references" id="references"></a>

* [n8n SAML Setup](https://docs.n8n.io/user-management/saml/setup/)
* [n8n Okta Guide (reference)](https://docs.n8n.io/user-management/saml/okta/)
* [Azure AD Claims Customization](https://learn.microsoft.com/en-us/entra/identity-platform/saml-claims-customization)
