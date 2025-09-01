---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Troubleshooting for OIDC SSO
description: Things to be aware of and troubleshooting OIDC within n8n
contentType: howto
---

# Troubleshooting OIDC SSO

## Known issues

### State parameter not supported

When using OIDC providers that enforce the use of the `state` CSRF token parameter, authentication fails with the error:

```json
{"code":0,"message":"authorization response from the server is an error"}
```

n8n's current OIDC implementation doesn't handle the `state` parameter that some OIDC providers send as a security measure against CSRF attacks.

Currently the only work around is to configure your OIDC provider to disable the requirement for the `state` parameter if possible.

Full support for the OIDC `state` parameter is planned for a future release.

### PKCE not supported

OIDC providers that require PKCE (Proof Key for Code Exchange) may fail authentication or reject n8n's authorization requests. n8n's current OIDC implementation doesn't support PKCE.

Currently the only work around is to configure your OIDC provider to no require PKCE for the n8n client if this option is available in your providers settings. 

PKCE support is planned for a future release
