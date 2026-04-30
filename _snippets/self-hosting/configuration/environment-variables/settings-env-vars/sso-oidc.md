| Variable | Type | Default | Description |
| :------- | :--- | :------ | :---------- |
| `N8N_SSO_OIDC_LOGIN_ENABLED` | Boolean | `false` | Whether to enable OIDC login. |
| `N8N_SSO_OIDC_CLIENT_ID` | String | - | OIDC client ID issued by your identity provider. |
| `N8N_SSO_OIDC_CLIENT_SECRET` | String | - | OIDC client secret issued by your identity provider. |
| `N8N_SSO_OIDC_DISCOVERY_ENDPOINT` | String | - | OIDC discovery endpoint URL (the `.well-known/openid-configuration` URL for your identity provider). |
| `N8N_SSO_OIDC_PROMPT` | String | - | Optional OIDC `prompt` parameter to send with the authorization request, for example `login` or `consent`. |
| `N8N_SSO_OIDC_ACR_VALUES` | String | - | Optional OIDC `acr_values` parameter. Use this to request a specific authentication context, for example a step-up MFA flow. |
