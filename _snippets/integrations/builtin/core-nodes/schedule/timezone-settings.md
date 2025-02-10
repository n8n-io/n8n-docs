/// note | Timezone settings
The node relies on the timezone setting. n8n uses either:

1. The workflow timezone, if set. Refer to [Workflow settings](/workflows/settings.md) for more information.
2. The n8n instance timezone, if the workflow timezone isn't set. The default is `America/New York` for self-hosted instances. n8n Cloud tries to detect the instance owner's timezone when they sign up, falling back to GMT as the default. Self-hosted users can change the instance setting using [Environment variables](/hosting/configuration/environment-variables/timezone-localization.md). Cloud admins can change the instance timezone in the [Admin dashboard](/manage-cloud/set-cloud-timezone.md).
///
