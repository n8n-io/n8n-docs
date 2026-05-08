---
contentType: howto
---

# Manage community packages from environment variables

/// info | Available from n8n vX.Y.Z
<!-- TODO: fill version -->
///

On self-hosted n8n, you can manage the set of installed community packages from environment variables. n8n reconciles the installed packages against the list on every startup, installing missing packages, correcting versions, and uninstalling packages not in the list. Use this method to bootstrap an instance with a fixed set of packages, for example through a deployment pipeline.

## Configure

Set the following environment variables on your n8n instance, then restart:

--8<-- "_snippets/self-hosting/configuration/environment-variables/settings-env-vars/community-packages.md"

For example:

```bash
export N8N_COMMUNITY_PACKAGES_MANAGED_BY_ENV=true
export N8N_COMMUNITY_PACKAGES='[{"name":"n8n-nodes-foo","version":"1.2.3"}]'
```

While `N8N_COMMUNITY_PACKAGES_MANAGED_BY_ENV` is `true`, the community nodes UI controls are read-only.

For the supported ways to set environment variables, see [Configuration methods](/hosting/configuration/configuration-methods.md).

## Manage packages

To add, remove, upgrade, or downgrade a package, edit `N8N_COMMUNITY_PACKAGES` and restart n8n. n8n reconciles to the new list on the next startup.

/// warning | Breaking changes in versions
Node developers may introduce breaking changes in new versions of their nodes. A breaking change is an update that breaks previous functionality. Be careful when changing versions. If a new version causes issues, set `version` back to the previous value and restart n8n to roll back.
///
