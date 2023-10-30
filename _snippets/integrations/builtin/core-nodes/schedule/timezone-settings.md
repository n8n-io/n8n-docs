!!! note "Timezone settings"
	The node relies on the timezone setting. n8n uses either:

	1. The workflow timezone, if set. Refer to [Workflow settings](/workflows/settings/) for more information.
	2. The n8n instance timezone, if the workflow timezone isn't set. The default is `America/New York` for self-hosted instances, or GMT for n8n Cloud. Self-hosted users can change the instance setting using [Environment variables](/hosting/environment-variables/environment-variables/#timezone-and-localization). Cloud admins can change the instance timezone in the [Admin dashboard](/cloud-admin-dashboard/).
