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

LDAP is available on:

- **n8n Cloud:** Enterprise
- **Self-hosted:** Business, Enterprise

You need access to the n8n instance owner account.
{% endhint %}

This page tells you how to enable LDAP in n8n. It assumes you're familiar with LDAP, and have an existing LDAP server set up.

LDAP allows users to sign in to n8n with their organization credentials, instead of an n8n login.

## Enable LDAP <a href="#enable-ldap" id="enable-ldap"></a>

1. Log in to n8n as the instance owner.
2. Select **Settings** <img src="../../.gitbook/assets/settings.png" alt="Settings icon" data-size="line"> > **LDAP**.
3. Toggle on **Enable LDAP Login**.
4. Complete the fields with details from your LDAP server. Refer to [Connection settings](#connection-settings).
5. Select **Test connection** to check your connection setup, or **Save connection** to create the connection.

After enabling LDAP, anyone on your LDAP server can sign in to the n8n instance, unless you exclude them using the **User Filter** setting.

You can still create non-LDAP users (email users) on the **Settings** > **Users** page.

## Connection settings

These fields appear once you turn on **Enable LDAP Login**.

| Field | What to enter |
| -- | -- |
| **LDAP Login** | The text users see in the login field on the n8n login page. |
| **LDAP Server Address** | The IP address or domain of your LDAP server. |
| **LDAP Server Port** | The port n8n connects to. |
| **Connection Security** | `None`, `TLS`, or `STARTTLS`. `TLS` connects with `ldaps://`. `None` and `STARTTLS` connect with `ldap://`, and `STARTTLS` then upgrades the connection. |
| **Ignore SSL/TLS Issues** | Connect even when the certificate check fails. This field only appears when **Connection Security** isn't `None`. |
| **Base DN** | Where n8n starts looking for users in the directory tree, for example `o=acme,dc=example,dc=com`. |
| **Binding as** | `Admin` or `Anonymous`. Refer to [Bind methods](#bind-methods). |
| **Binding DN** | The account n8n uses to search the directory, for example `uid=2da2de69435c,ou=Users,o=Acme,dc=com`. This field only appears when **Binding as** is `Admin`. |
| **Binding Password** | The password for the **Binding DN** user. This field only appears when **Binding as** is `Admin`. |
| **User Filter** | An LDAP query that limits who can sign in, for example `(ObjectClass=user)`. Only the users this query returns can sign in. |
| **Enforce Email Uniqueness** | Blocks sign in when more than one LDAP account uses the same email address. |

The **Attribute mapping** fields come next. They tell n8n which LDAP attributes to read for a user's ID, login ID, email, first name, and last name. The right values depend on your directory, and the examples n8n shows in these fields don't suit every server. Query your LDAP server with a tool such as `ldapsearch` to see which attributes your setup has.

The synchronization fields come last. They only appear when you turn on **Enable periodic LDAP synchronization**.

## Bind methods

n8n uses a simple bind to connect to your LDAP server. **Binding as** sets how:

- `Admin`: n8n binds with the **Binding DN** and **Binding Password** you enter.
- `Anonymous`: n8n sends an empty DN and password, so your server has to allow anonymous search.

n8n doesn't support SASL binds, including GSSAPI and Kerberos. There's no field for a SASL mechanism, a keytab, or a Kerberos ticket cache. If your directory needs Kerberos-based binding, common in Active Directory setups, you can't use LDAP login. n8n also supports [SAML](use-saml/README.md) and [OIDC](use-oidc/README.md) for single sign-on.

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

## Related resources

* [Verify user identity](./)
* [Require two-factor auth](require-two-factor-auth.md)
* [Use SAML](use-saml/README.md)
* [Use OIDC](use-oidc/README.md)
