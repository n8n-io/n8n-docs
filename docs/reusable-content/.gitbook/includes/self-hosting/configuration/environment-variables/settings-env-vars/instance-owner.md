---
title: instance-owner
---
| Variable | Type | Default | Description |
| :------- | :--- | :------ | :---------- |
| `N8N_INSTANCE_OWNER_MANAGED_BY_ENV` | Boolean | `false` | Set to `true` to manage the instance owner from environment variables. When `true`, n8n overwrites the instance owner details below on every startup, locks the UI control for that user, and rejects API writes. |
| `N8N_INSTANCE_OWNER_EMAIL` | String | - | Email address for the instance owner. |
| `N8N_INSTANCE_OWNER_FIRST_NAME` | String | - | First name for the instance owner. |
| `N8N_INSTANCE_OWNER_LAST_NAME` | String | - | Last name for the instance owner. |
| `N8N_INSTANCE_OWNER_PASSWORD_HASH` | String | - | Bcrypt hash of the instance owner's password. Setting a plaintext password breaks login. |

{% hint style="warning" %}
**Owner email must be unique**

`N8N_INSTANCE_OWNER_EMAIL` must not already belong to another user on the instance. This setting updates the existing instance owner account; it doesn't transfer ownership to another existing user or merge user accounts. To use an email address that already belongs to another user, change or delete that user first so the email becomes available.
{% endhint %}
