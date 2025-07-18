---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Troubleshooting & FAQs for OIDC SSO
description: A list of things to check if you encounter issues with OIDC.
contentType: howto
---

### Provider-Specific Endpoints
- **Google**: Discovery endpoint is `https://accounts.google.com/.well-known/openid-configuration`
- **Microsoft Azure AD**: Discovery endpoint is `https://login.microsoftonline.com/{tenant-id}/v2.0/.well-known/openid-configuration`
- **Auth0**: Discovery endpoint is `https://{your-domain}.auth0.com/.well-known/openid-configuration`
- **Okta**: Discovery endpoint is `https://{your-domain}.okta.com/.well-known/openid-configuration`