---
contentType: howto
nodeTitle: Update your version
originalFilePath: manage-cloud/update-cloud-version.md
originalUrl: https://docs.n8n.io/manage-cloud/update-cloud-version
url: https://docs.n8n.io/deploy/use-n8n-cloud/update-your-version
description: How to update your n8n version on Cloud.
layout:
  width: default
  title:
    visible: true
  description:
    visible: false
  tableOfContents:
    visible: true
  outline:
    visible: true
  pagination:
    visible: true
  metadata:
    visible: true
  tags:
    visible: true
  actions:
    visible: true
---

# Update your version

n8n recommends regularly updating your Cloud version. Check the [Release notes](https://app.gitbook.com/s/hhM8Cox90Piiv0u0EgHM/) to learn more about changes.

{% hint style="info" %}
Only instance owners can upgrade n8n Cloud versions. Contact your instance owner if you don't have permission to update n8n Cloud.
{% endhint %}

1. [Log in to the n8n Cloud dashboard](https://app.n8n.cloud/manage)
2. On your dashboard, select **Manage**.
3. Use the **n8n version** dropdown to select your preferred release version:
   * Latest Stable: recommended for most users.
   * Latest Beta: get the newest n8n. This may be unstable.
4. Select **Save Changes** to restart your n8n instance and perform the update.
5. In the confirmation modal, select **Confirm**.

## Best practices for updating <a href="#best-practices-for-updating" id="best-practices-for-updating"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/n9aq4wdObipxIDqh83Fc/" %}

## Automatic update <a href="#automatic-update" id="automatic-update"></a>

n8n automatically updates outdated Cloud instances.

If you don't update you instance for 120 days, n8n emails you to warn you to update. After a further 30 days, n8n automatically updates your instance.
