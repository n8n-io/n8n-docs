---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Set up OIDC
description: Generic setup instructions for using OIDC SSO with n8n.
contentType: howto
---

## Enable OIDC

1. In n8n, go to **Settings** > **SSO**.
2. Under **Select Authentication Protocol**, choose **OIDC** from the dropdown.
3. Copy the **redirect URL** shown (e.g., `https://yourworkspace.app.n8n.cloud/rest/sso/oidc/callback`)
   1. **Optional**: if you are running n8n behind a load balancer, make sure you have `N8N_EDITOR_BASE_URL` configured.
4. Set up OIDC with your IdP (identity provider). You'll need to:
   - Register n8n as a new OIDC client/application in your IdP
   - Configure the redirect URL from step 3
   - Note down the **Client ID** and **Client Secret** provided by your IdP
5. In your IdP, locate the **Discovery Endpoint** (also called the well-known configuration endpoint). This is typically in the format:
   ```
   https://your-idp-domain/.well-known/openid-configuration
   ```
6. Back in n8n, fill in the OIDC configuration:
   - **Discovery Endpoint**: Enter the discovery endpoint URL from your IdP
   - **Client ID**: Enter the client ID you received when registering your application with your IdP
   - **Client Secret**: Enter the client secret you received when registering your application with your IdP
7. Select **Save settings**.
9. Set OIDC to **Activated**.

