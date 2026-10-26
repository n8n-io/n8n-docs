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

n8n recommends keeping your Cloud version up to date. In the **Updates** section of **Instance settings** in the n8n Cloud console, you choose which n8n version your instance runs, and control when and how automatic updates happen. Check the [Release notes](https://app.gitbook.com/s/hhM8Cox90Piiv0u0EgHM/) to learn about changes in each version.

{% hint style="info" %}
Only instance owners can change these settings. Contact your instance owner if you don't have permission to update n8n Cloud.
{% endhint %}

To open the settings:

1. Open the [Cloud console](use-the-cloud-console.md).
2. In the sidebar, select **Instance settings**. The **Updates** section is at the top of the page.

When you change a setting, a bar appears at the bottom of the page with the number of unsaved changes:

* If you changed the n8n version, select **Save and restart**. Your instance restarts and is unavailable for one to two minutes.
* If you only changed the release track, update cadence, or maintenance window, select **Save**. These settings apply without a restart.

Select **Discard all** to undo your unsaved changes.

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/KbKP88R2IFii1k97togq/" %}

## n8n version

The **n8n version** dropdown sets the version your instance runs. To compare versions before you change, select **Open changelog**.

To change the version:

1. Choose a version from the **n8n version** dropdown.
2. Select **Save and restart**.
3. If the new version is a major version or runs a database migration, n8n asks you to confirm. Read the warning, then select **Update and restart**. You can't roll back these updates to the previous version.

## Release track

The release track sets which n8n release stream your instance follows. n8n tests both tracks. They differ in how soon new releases reach your instance, and how long each release has run in production before it does:

* **Beta**: new releases delivered as soon as they're ready. Choose Beta to try the latest features first.
* **Stable**: a later, more proven patch of a release, cut after it's spent time on the Beta track. n8n recommends Stable for all mission-critical workloads.

You can switch between tracks at any time.

## Update cadence

The update cadence sets how often n8n upgrades your instance to a newer build. n8n upgrades every instance at least every two weeks, so security fixes reach everyone, whichever cadence you choose:

* **Every 2 weeks**: n8n upgrades your instance about every two weeks. Recommended for most instances.
* **Every new release**: upgrades to each new release as it ships, on average one release per day. Great for trying out new features.

## Maintenance window

The maintenance window sets when n8n can apply upgrades, so you can reduce disruption. Each upgrade takes one to two minutes of downtime. Times use your instance's time zone, shown in the setting's description.

* **Anytime**: n8n applies upgrades as soon as they're available.
* **Pick a window**: n8n only applies upgrades between the **Start time** and **End time** you set.

## Related resources

* [Use n8n Cloud](./)
* [Try free then choose a plan](start-your-free-trial.md)
* [Use the Cloud console](use-the-cloud-console.md)
* [Configure Cloud](configure-cloud/README.md)
* [Gateway credits](gateway-credits/README.md)
* [Assistant credits](assistant-credits/README.md)
* [Understand concurrency](understand-concurrency.md)
* [Download workflows](download-workflows.md)
