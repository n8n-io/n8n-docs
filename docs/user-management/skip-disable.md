---
description: How to skip or disable user management
---

# Skip or disable user management

You don't have to use n8n's user management feature. You can:

* Leave it enabled, but choose to skip the setup step. You can use n8n as normal. If you want to set up user management later, go to **Settings** > **Users**.
* Self-hosted only: Disable the feature completely using the `N8N_USER_MANAGEMENT_DISABLED` environment variable. Setting this environment variable to `true` completely hides the feature in your n8n instance. You can't use this setting if you have already set up an owner account.
