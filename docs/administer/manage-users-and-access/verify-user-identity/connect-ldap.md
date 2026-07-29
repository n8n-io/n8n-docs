---
description: Using LDAP with n8n.
contentType: howto
nodeTitle: Connect LDAP
originalFilePath: user-management/ldap.md
originalUrl: 'https://docs.n8n.io/user-management/ldap'
url: >-
  https://docs.n8n.io/administer/manage-users-and-access/verify-user-identity/connect-ldap
layout:
  description:
    visible: false
---

# Lightweight Directory Access Protocol (LDAP) <a href="#lightweight-directory-access-protocol-ldap" id="lightweight-directory-access-protocol-ldap"></a>

{% hint style="info" %}
**Feature availability**

* Available on Self-hosted Business and Enterprise, and Cloud Enterprise plans.
* You need access to the n8n instance owner account.
{% endhint %}

This page tells you how to enable LDAP in n8n. It assumes you're familiar with LDAP, and have an existing LDAP server set up.

LDAP allows users to sign in to n8n with their organization credentials, instead of an n8n login.

## Enable LDAP <a href="#enable-ldap" id="enable-ldap"></a>

1. Log in to n8n as the instance owner.
2. Select **Settings** <img src="../../.gitbook/assets/settings.png" alt="Settings icon" data-size="line"> > **LDAP**.
3. Toggle on **Enable LDAP Login**.
4. Complete the fields with details from your LDAP server.
5. Select **Test connection** to check your connection setup, or **Save connection** to create the connection.

After enabling LDAP, anyone on your LDAP server can sign in to the n8n instance, unless you exclude them using the **User Filter** setting.

You can still create non-LDAP users (email users) on the **Settings** > **Users** page.

## Merging n8n and LDAP accounts <a href="#merging-n8n-and-ldap-accounts" id="merging-n8n-and-ldap-accounts"></a>

If n8n finds matching accounts (matching emails) for email users and LDAP users, the user must sign in with their LDAP account. n8n instance owner accounts are excluded from this: n8n never converts owner accounts to LDAP users.

## LDAP user accounts in n8n <a href="#ldap-user-accounts-in-n8n" id="ldap-user-accounts-in-n8n"></a>

On first sign in, n8n creates a user account in n8n for the LDAP user.

You must manage user details on the LDAP server, not in n8n. If you update or delete a user on your LDAP server, the n8n account updates at the next scheduled sync, or when the user next tries to log in, whichever happens first.

{% hint style="info" %}
**User deletion**

If you remove a user from your LDAP server, they lose n8n access on the next sync.
{% endhint %}
## Turn LDAP off <a href="#turn-ldap-off" id="turn-ldap-off"></a>

To turn LDAP off:

1. Log in to n8n as the instance owner.
2. Select **Settings** <img src="../../.gitbook/assets/settings.png" alt="Settings icon" data-size="line"> > **LDAP**.
3. Toggle off **Enable LDAP Login**.

If you turn LDAP off, n8n converts existing LDAP users to email users on their next login. The users must reset their password.
