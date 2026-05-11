---
contentType: howto
---

# Manage community packages from environment variables

/// info | Available from n8n v2.21.0
///

On self-hosted n8n, you can manage the set of installed community packages from environment variables. n8n reconciles the installed packages against the list on every startup, installing missing packages, correcting versions, and uninstalling packages not in the list. Use this method to bootstrap an instance with a fixed set of packages, for example through a deployment pipeline.

/// warning | Enabling this uninstalls packages that aren't in the list
The first time you start n8n with `N8N_COMMUNITY_PACKAGES_MANAGED_BY_ENV=true`, n8n uninstalls any currently-installed community packages that aren't included in `N8N_COMMUNITY_PACKAGES`. If you already manage packages through the UI, review the **Community nodes** settings page and add the packages you want to keep to `N8N_COMMUNITY_PACKAGES` before enabling this variable.
///

## Configure

Set the following environment variables on your n8n instance, then restart:

--8<-- "_snippets/self-hosting/configuration/environment-variables/settings-env-vars/community-packages.md"

/// note | Community packages must be enabled
`N8N_COMMUNITY_PACKAGES_ENABLED` must be `true` (the default). If community packages are disabled at the instance level, n8n ignores `N8N_COMMUNITY_PACKAGES_MANAGED_BY_ENV` and logs a warning on startup.
///

For example:

```bash
export N8N_COMMUNITY_PACKAGES_MANAGED_BY_ENV=true
export N8N_COMMUNITY_PACKAGES='[{"name":"n8n-nodes-foo","version":"1.2.3"}]'
```

While `N8N_COMMUNITY_PACKAGES_MANAGED_BY_ENV` is `true`, the **Community nodes** settings page is read-only: you can't install, update, or uninstall packages from the UI.

### Per-package fields

| Field | Type | Required | Description |
| :---- | :--- | :------- | :---------- |
| `name` | string | Yes | npm package name. You can include the version inline as `<package-name>@<version>`. If you do, don't also set the `version` field to a different value, n8n rejects conflicting versions. |
| `version` | string | No | Version specifier. If omitted, n8n looks the package up in the vetted-packages registry and uses that version; if the package isn't vetted, n8n installs whatever npm resolves and won't reconcile the version across restarts. |
| `checksum` | string | No | SHA-512 checksum (`sha512-...`) for the resolved tarball. Requires `version` to be set. n8n resolves the checksum automatically from the vetted registry when possible. |

Example with all three fields:

```json
[
  { "name": "n8n-nodes-foo", "version": "1.2.3" },
  { "name": "n8n-nodes-bar@0.5.0" },
  { "name": "n8n-nodes-baz", "version": "2.0.0", "checksum": "sha512-..." }
]
```

/// warning | Unverified packages need a checksum
If a package isn't in the vetted-packages registry and `N8N_UNVERIFIED_PACKAGES_ENABLED` is `false`, n8n fails to start. Either pin a `checksum` for the package, set `N8N_UNVERIFIED_PACKAGES_ENABLED=true`, or pick a vetted package.
///

For the supported ways to set environment variables, see [Configuration methods](/hosting/configuration/configuration-methods.md).

## Manage packages

To add, remove, upgrade, or downgrade a package, edit `N8N_COMMUNITY_PACKAGES` and restart n8n. n8n reconciles to the new list on the next startup.

/// warning | Breaking changes in versions
Node developers may introduce breaking changes in new versions of their nodes. A breaking change is an update that breaks previous functionality. Be careful when changing versions. If a new version causes issues, set `version` back to the previous value and restart n8n to roll back.
///
