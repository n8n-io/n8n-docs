| Variable | Type | Default | Description |
| :------- | :--- | :------ | :---------- |
| `N8N_COMMUNITY_PACKAGES_MANAGED_BY_ENV` | Boolean | `false` | Set to `true` to manage installed community packages from environment variables. When `true`, n8n reconciles the installed packages against `N8N_COMMUNITY_PACKAGES` on every startup, installing missing packages, correcting versions, and uninstalling packages not in the list. The community nodes UI controls are locked. |
| `N8N_COMMUNITY_PACKAGES` | JSON string | - | JSON array of community packages to install. Each entry is an object with a `name` (npm package name) and a `version`. For example: `[{"name":"n8n-nodes-foo","version":"1.2.3"}]`. |
