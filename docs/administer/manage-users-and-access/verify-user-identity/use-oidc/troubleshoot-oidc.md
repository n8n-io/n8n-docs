---
title: Troubleshooting for OIDC SSO
description: Things to be aware of and troubleshooting OIDC within n8n
contentType: howto
nodeTitle: Troubleshoot OIDC
originalFilePath: user-management/oidc/troubleshooting.md
originalUrl: 'https://docs.n8n.io/user-management/oidc/troubleshooting'
url: >-
  https://docs.n8n.io/administer/manage-users-and-access/verify-user-identity/use-oidc/troubleshoot-oidc
layout:
  description:
    visible: false
---

# Troubleshooting OIDC SSO <a href="#troubleshooting-oidc-sso" id="troubleshooting-oidc-sso"></a>

## Known issues <a href="#known-issues" id="known-issues"></a>

### State parameter not supported <a href="#state-parameter-not-supported" id="state-parameter-not-supported"></a>

When using OIDC providers that enforce the use of the `state` CSRF token parameter, authentication fails with the error:

```json
{"code":0,"message":"authorization response from the server is an error"}
```

n8n's current OIDC implementation doesn't handle the `state` parameter that some OIDC providers send as a security measure against CSRF attacks.

For now, the only work around is to configure your OIDC provider to disable the `state` parameter if possible.

n8n is working on adding full support for the OIDC `state` parameter in a future release.

### PKCE not supported <a href="#pkce-not-supported" id="pkce-not-supported"></a>

OIDC providers that require PKCE (Proof Key for Code Exchange) may fail authentication or reject n8n's authorization requests. n8n's current OIDC implementation doesn't support PKCE.

The only work around is to configure your OIDC provider to not require PKCE for the n8n client if this option is available in your providers settings. 

n8n plans on adding PKCE support in a future release
