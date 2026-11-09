---
title: Troubleshooting SAML SSO
description: A list of things to check if you encounter issues with SAML.
contentType: howto
nodeTitle: Troubleshoot SAML
originalFilePath: user-management/saml/troubleshooting.md
originalUrl: 'https://docs.n8n.io/user-management/saml/troubleshooting'
url: >-
  https://docs.n8n.io/administer/manage-users-and-access/verify-user-identity/use-saml/troubleshoot-saml
layout:
  description:
    visible: false
---

# Troubleshooting SAML SSO <a href="#troubleshooting-saml-sso" id="troubleshooting-saml-sso"></a>

If you get an error when testing your SAML setup, check the following:

* Does the app you created in your IdP support SAML?
* Did you enter the n8n redirect URL and entity ID in the correct fields in your IdP?
* Is the metadata XML correct? Check that the metadata you copied into n8n is formatted correctly.

For more support, use the [forum](https://community.n8n.io/), or contact your support representative if you have a paid support plan.

## Users land in the same account after SAML login

n8n links each SAML identity to an n8n account by the `userPrincipalName` (`upn`) claim. If your IdP sends the same value for more than one person, they all sign in to the same account. Give each user a distinct value. See [Set up SAML](set-up-saml.md) for the attribute mapping.

n8n emits an `n8n.audit.user.login.emailConflict` audit event when a SAML login resolves to an existing user whose email differs from the asserted email. Stream it to catch this case. See [Log streaming](../../../observe-and-log/stream-logs-to-external-systems.md#events).

## Related resources

* [Use SAML](./)
* [Set up SAML](set-up-saml.md)
* [Okta Workforce Identity SAML setup](set-up-okta-workforce-identity-saml.md)
* [Azure AD SAML setup](set-up-azure-ad-saml.md)
* [Manage users with SAML](manage-users-with-saml.md)
