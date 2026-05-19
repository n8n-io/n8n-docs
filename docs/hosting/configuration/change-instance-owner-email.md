---
title: Change the instance owner email for self-hosted n8n
description: Change the owner email address for a self-hosted n8n instance using the UI or environment variables.
contentType: howto
---

# Change the instance owner email for self-hosted n8n

You can change the instance owner email from the UI, or from environment variables if you manage the instance owner that way.

/// note | Owner email must be unique
The owner email must not already belong to another user on the instance. If the email you want is already used by another user, change or delete that user first so the email becomes available.
///

Changing the owner email updates the existing instance owner account. It doesn't transfer ownership to another existing user or merge user accounts.

## Change the owner email in the UI

1. Log in as the instance owner.
2. Go to **Settings** > **Personal**.
3. Update the **Email** field.
4. Select **Save**.

## Change the owner email using environment variables

If you manage the instance owner using environment variables:

1. Set `N8N_INSTANCE_OWNER_MANAGED_BY_ENV` to `true`.
2. Set `N8N_INSTANCE_OWNER_EMAIL` to the new owner email.
3. Keep `N8N_INSTANCE_OWNER_FIRST_NAME`, `N8N_INSTANCE_OWNER_LAST_NAME`, and `N8N_INSTANCE_OWNER_PASSWORD_HASH` set.
4. Restart n8n.

When `N8N_INSTANCE_OWNER_MANAGED_BY_ENV` is `true`, n8n reapplies the owner details on every startup. The matching UI controls become read-only.

/// warning | `N8N_INSTANCE_OWNER_PASSWORD_HASH` must be a bcrypt hash
This variable expects a pre-hashed bcrypt value. Setting a plaintext password breaks login.
///

For more information, see [Manage instance settings using environment variables](/hosting/configuration/settings-env-vars.md#instance-owner).
