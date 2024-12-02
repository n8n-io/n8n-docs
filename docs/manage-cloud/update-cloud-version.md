---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
description: How to update your n8n version on Cloud.
contentType: howto
---

# Update your Cloud version

n8n recommends regularly updating your Cloud version. Check the [Release notes](/release-notes/) to learn more about changes.

/// info
Only instance owners can upgrade n8n Cloud versions. Contact your instance owner if you don't have permission to update n8n Cloud.
///

1. [Log in to the n8n Cloud dashboard](https://app.n8n.cloud/manage){:target=_blank .external-link}
1. On your dashboard, select **Manage**.
1. Use the **n8n version** dropdown to select your preferred release version: 
	* Latest Stable: recommended for most users.
	* Latest Beta: get the newest n8n. This may be unstable.
1. Select **Save Changes** to restart your n8n instance and perform the update. 
1. In the confirmation modal, select **Confirm**.


## Best practices for updating

--8<-- "_snippets/manage-cloud/updating-best-practices.md"

## Automatic update

n8n automatically updates outdated Cloud instances. 

If you don't update you instance for 120 days, n8n emails you to warn you to update. After a further 30 days, n8n automatically updates your instance.
