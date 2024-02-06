---
description: How to update your n8n version on Cloud.
contentType: howto
---

# Update your Cloud version

n8n recommends regularly updating your Cloud version. Check the [Release notes](/release-notes/) to learn more about changes.

1. [Log in to n8n](https://app.n8n.cloud/magic-link){:target=_blank .external-link}
1. Select **Admin Dashboard**. n8n opens the dashboard.
1. On your dashboard, select **Manage**.
1. Use the **n8n version** dropdown to select your preferred release version: 
	* Latest Stable: recommended for most users.
	* Latest Beta: get the newest n8n. This may be unstable.
1. Select **Save Changes** to restart your n8n instance and perform the update. 
1. In the confirmation modal, select **Confirm**.


## Best practices for updating

* Update frequently: this avoids having to jump multiple versions at once, reducing the risk of a disruptive update. Try to update at least once a month.
* Check the [Release notes](/release-notes/) for breaking changes.
* Use [Environments](/source-control-environments/) to create a test version of your instance. Test the update there first.

## Automatic update

n8n automatically updates outdated Cloud instances. 

If you don't update you instance for 120 days, n8n emails you to warn you to update. After a further 30 days, n8n automatically updates your instance.
