---
description: >-
  Use SCIM 2.0 to create, update, and deactivate n8n users automatically from
  your identity provider, such as Okta or Microsoft Entra ID.
layout:
  description:
    visible: false
status: preview
tags:
  - tag: preview
    primary: true
---

# Provision users with SCIM

SCIM provisioning lets your identity provider (IdP) create, update, and deactivate n8n user accounts automatically, so you don't add or remove users by hand.

{% hint style="info" %}
**Preview status**

SCIM provisioning is in Preview and may change in future releases. Avoid relying on it in production.
{% endhint %}

{% hint style="info" %}
**Feature availability**

SCIM provisioning is available from n8n [VERSION-TBD] on Enterprise plans.
{% endhint %}

SCIM (System for Cross-domain Identity Management) is an open standard that IdPs use to keep user accounts in sync with the apps they connect to. n8n supports SCIM 2.0 and works with IdPs such as Okta and Microsoft Entra ID.

When someone joins your organization, changes their name or email, or leaves, you make the change once in your IdP. Your IdP then sends the change to n8n.

## What SCIM manages and what SSO manages

SCIM in n8n manages the user account lifecycle: it creates, updates, and deactivates accounts. SCIM doesn't currently manage roles. Single sign-on (SSO) handles sign-in and all roles.

| What | Managed by | Details |
|------|------------|---------|
| Sign-in | SSO | SAML or OIDC. |
| Account creation | SCIM | Your IdP creates the account when you assign the user to the n8n app. n8n always creates new accounts with the Member instance role. |
| Name and email | SCIM | n8n keeps them in sync with your IdP. |
| Instance role | SSO role assignment, or an admin | SCIM only manages the user lifecycle, not roles. New accounts start as Member, and any later changes come from SSO or an admin. |
| Project roles | SSO role assignment, or an admin | SCIM doesn't currently manage project access. |
| Deactivation | SCIM | n8n disables the account. The user's personal project and workflows stay in place. |
| Deletion | Deprovisioning policy | See [What happens when your IdP deletes a user](#what-happens-when-your-idp-deletes-a-user). |

If your IdP sends a `roles` attribute, n8n accepts it but ignores the value. This means a role mapping in your IdP's SCIM settings doesn't cause an error, but it doesn't change anything in n8n either. To manage roles from your IdP, set up role assignment for [SAML](use-saml/set-up-saml.md#instance-and-project-access-provisioning) or [OIDC](use-oidc/set-up-oidc.md#instance-and-project-access-provisioning). n8n applies those roles when the user signs in with SSO.

## Before you set up SCIM

To use SCIM provisioning, you need:

* An n8n Enterprise plan.
* Permission to manage SCIM. Instance owners and instance admins can manage SCIM, as well as any [custom instance role](../set-permissions-and-roles-rbac/create-custom-instance-roles.md) with the **Instance settings** > **Manage** permission.
* SAML or OIDC single sign-on set up and active. You can't turn on SCIM without it. SCIM doesn't work with LDAP. To set up SSO, see [Set up SAML](use-saml/set-up-saml.md) or [Set up OIDC](use-oidc/set-up-oidc.md).

## Turn on SCIM in n8n

1. In n8n, go to **Settings** > **Authentication** > **Single sign-on (SSO)**.
1. In the SCIM section, turn on **SCIM provisioning**.
1. Copy the **bearer token**. n8n only shows the token once, so store it somewhere secure before you leave the page.
1. Copy the **SCIM base URL**. It usually has this format: `https://<your-n8n-domain>/scim/v2`.

n8n uses one SCIM token for the whole instance, not one per admin.

## Connect your identity provider

Exact steps vary by IdP and change over time. Use these steps as a guide and check your IdP's documentation for details.

### Connect Okta

1. In the Okta Admin Console, add n8n as an app that uses SCIM 2.0 provisioning.
1. In the app's SCIM connection settings, enter the SCIM base URL and bearer token from n8n.
1. Turn on these provisioning features: **Create Users**, **Update User Attributes**, and **Deactivate Users**.
1. Assign people or groups to the n8n app. Okta creates an n8n account for each assigned person.

You don't need to map roles in Okta for SCIM.

### Connect Microsoft Entra ID

1. In the Microsoft Entra admin center, open your n8n enterprise application and set up automatic provisioning.
1. Set **Tenant URL** to the SCIM base URL and **Secret Token** to the bearer token from n8n.
1. Select **Test Connection**.
1. Set **Provisioning Status** to **On**.
1. Assign users to the application. Entra ID syncs them to n8n during its next provisioning cycle.

## What happens when you change users in your IdP

| Change in your IdP | Result in n8n |
|--------------------|---------------|
| You assign a user to the n8n app | n8n creates the account with the Member instance role. |
| You change a user's name or email | n8n updates the account. |
| You change a user's role or group | Nothing changes through SCIM. If SSO role assignment is on, the role updates the next time the user signs in with SSO. |
| You unassign or deactivate a user | n8n disables the account. The user's personal project and workflows stay. n8n doesn't transfer or delete anything. |
| You delete a user | n8n applies the deprovisioning policy. The default is to disable the account. |

An admin can transfer or delete a disabled user's workflows by hand after n8n disables the account. For how to do this, see [Delete a user](../add-and-remove-users.md#delete-a-user).

### What happens when your IdP deletes a user

Most IdPs deactivate users instead of deleting them. Okta never sends a delete request: unassigning a user deactivates them. Entra ID sends a delete request only when you permanently delete a user.

When n8n receives a delete request, it applies the deprovisioning policy. By default, n8n disables the account in the same way as a deactivation. There's no setting in the n8n UI to change the deprovisioning policy yet.

n8n protects some accounts from SCIM changes:

* SCIM can disable an admin but never deletes one.
* SCIM can't change the instance owner's email or username, and can't deactivate or delete the instance owner. n8n returns a `403` error to your IdP if it tries.

## Manage the SCIM token

Instance owners and instance admins can rotate or revoke the SCIM token, as well as any role with the **Instance settings** > **Manage** permission. To manage the token, go to **Settings** > **Authentication** > **Single sign-on (SSO)**. After the token exists, n8n only shows its last four characters.

* **Rotate:** creates a new token and replaces the old one. Update the token in your IdP straight away, or provisioning requests fail.
* **Revoke:** removes the token. Your IdP can't send provisioning changes to n8n until you create a new token and add it to your IdP.

## Turn off SCIM or SSO

If you turn off SCIM:

* n8n rejects provisioning requests from your IdP with a `403` error.
* Existing users stay in n8n and can still sign in with SSO.
* Roles keep coming from SSO role assignment when users sign in, as before.

If you turn off SSO:

* n8n turns off SCIM too, and your IdP's provisioning requests get a `403` error.
* n8n keeps the SCIM token and settings.
* Existing users stay in n8n.
* Admins can change roles by hand in n8n while SSO is off.

Turning SSO back on doesn't turn SCIM back on. Turn on SCIM again yourself. Your original token still works, so you don't need to update your IdP.

## Limitations

While SCIM provisioning is in Preview:

* SCIM doesn't set instance or project roles. Use SSO role assignment instead.
* n8n doesn't support SCIM groups. Your IdP can assign a group to the n8n app to provision its members, but n8n doesn't create or sync groups.
* There's no UI to change the deprovisioning policy.

## Related resources

* [Verify user identity](./)
* [Require two-factor auth](require-two-factor-auth.md)
* [Connect LDAP](connect-ldap.md)
* [Use SAML](use-saml/README.md)
* [Use OIDC](use-oidc/README.md)
* [Understand instance roles](../understand-instance-roles.md)
