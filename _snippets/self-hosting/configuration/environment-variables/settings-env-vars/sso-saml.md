| Variable | Type | Default | Description |
| :------- | :--- | :------ | :---------- |
| `N8N_SSO_SAML_LOGIN_ENABLED` | Boolean | `false` | Whether SAML login is enabled (`true`) or not (`false`). |
| `N8N_SSO_SAML_METADATA` | String | - | SAML identity provider metadata as an XML string. Mutually exclusive with `N8N_SSO_SAML_METADATA_URL`. Setting both is rejected. |
| `N8N_SSO_SAML_METADATA_URL` | String | - | URL to fetch SAML identity provider metadata from. Mutually exclusive with `N8N_SSO_SAML_METADATA`. Setting both is rejected. |
