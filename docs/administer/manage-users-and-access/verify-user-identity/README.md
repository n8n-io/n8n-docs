---
layout:
  description:
    visible: false
---
# Verify user identity <a href="#verify-user-identity" id="verify-user-identity"></a>

Confirm who's signing in to your n8n instance, from two-factor auth to directory-backed single sign-on.

In n8n, go to **Settings** > **Authentication** to see the sign-in methods for your instance. The page lists single sign-on (SSO) and LDAP, marks the active method, and shows whether two-factor auth is enforced.

* [Use OIDC](use-oidc/README.md)
* [Use SAML](use-saml/README.md)
* [Connect LDAP](connect-ldap.md)

## Use one sign-in method at a time

An n8n instance can use only one of SAML, OIDC, or LDAP at a time, with one identity provider (IdP). To use several IdPs, use an identity broker that federates them, such as Okta, and connect n8n to the broker with SAML or OIDC.

## Switch an instance with existing users to SSO

When you enable SAML or OIDC on an instance that already has users, n8n keeps their accounts and data. Password login is disabled, except for the instance owner and users with **Allow Manual Login**. The first time a user signs in through your IdP, n8n links their account by email address, so make sure their n8n and IdP emails match. By default, if they don't, n8n creates a new account and leaves the old one unused.

## Change your name or email address with SSO

Users who sign in with SAML or OIDC can't change their name or email address in n8n, and signing in again through your IdP doesn't update them. Contact your instance owner or admin to change them.

## Change another user's name or email address

Instance owners and admins can't edit another SSO user's name or email in n8n. To change one user's details, update them in your IdP, then delete the user in n8n and transfer their workflows and credentials, as described in [Manage users](../add-and-remove-users.md). When the user signs in again through your IdP, n8n creates their account with the new details. The new account doesn't keep the user's API keys or MFA setup, and this doesn't work for the instance owner.

## In this section

* [Require two-factor auth](require-two-factor-auth.md): enable 2FA for your n8n account.
* [Connect LDAP](connect-ldap.md): use LDAP with n8n.
* [Use SAML](use-saml/README.md): enable SAML SSO (single sign-on) in n8n.
* [Use OIDC](use-oidc/README.md): enable OpenID Connect (OIDC) for single sign-on.

## Related resources

* [Manage users and access](../)
* [Set up for Cloud](../set-up-for-cloud.md)
* [Add and remove users](../add-and-remove-users.md)
* [Understand instance roles](../understand-instance-roles.md)
* [Set permissions and roles (RBAC)](../set-permissions-and-roles-rbac/README.md)
* [Follow best practices](../follow-best-practices.md)
