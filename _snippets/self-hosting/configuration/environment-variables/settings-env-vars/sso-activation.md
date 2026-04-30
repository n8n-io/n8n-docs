| Variable | Type | Default | Description |
| :------- | :--- | :------ | :---------- |
| `N8N_SSO_MANAGED_BY_ENV` | Boolean | `false` | Set to `true` to manage SSO from environment variables. When `true`, n8n applies the SSO variables on every startup and locks the matching UI controls. |
| `N8N_SSO_USER_ROLE_PROVISIONING` | Enum string: `disabled`, `instance_role`, `instance_and_project_roles` | `disabled` | How n8n provisions roles for users who sign in through SSO. `disabled` doesn't provision any roles. `instance_role` provisions the instance-level role only. `instance_and_project_roles` provisions both instance and project roles. |
