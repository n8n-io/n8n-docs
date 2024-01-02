---
description: How to access the Cloud admin dashboard.
contentType: howto
---

# Cloud admin dashboard

Instance owners can access the admin dashboard to manage their Cloud instance. This is where you can upgrade your n8n version.

## Access the dashboard from the app

1. [Log in to n8n](https://app.n8n.cloud/login){:target=_blank .external-link}
1. Select **Admin Dashboard**. n8n opens the dashboard.

## Access the dashboard if the app is offline

If your instance is down, you can still access the admin dashboard. When you log in to the app, n8n will ask you if you want a magic link to access your dashboard. Select **Send magic link**, then check your email for the link.

## Set the timezone for your Cloud instance

You can change the timezone for your n8n instance. This affects the [Schedule Trigger](/integrations/builtin/core-nodes/n8n-nodes-base.scheduletrigger/) and [Date & Time node](/integrations/builtin/core-nodes/n8n-nodes-base.datetime/). Users can configure the timezone for individual workflows in [Workflow settings](/workflows/settings/).

1. On your dashboard, select **Manage**.
1. Change the **Timezone** dropdown to the timezone you want.


## Update your Cloud version

n8n recommends regularly updating your Cloud version. Check the [Release notes](/release-notes/) to learn more about changes.

1. On your dashboard, select **Manage**.
1. Use the **n8n version** dropdown to select your preferred release version: 
	* Latest Stable: recommended for most users.
	* Latest Beta: get the newest n8n. This may be unstable.
1. Select **Save Changes** to restart your n8n instance and perform the update. 
1. In the confirmation modal, select **Confirm**.
