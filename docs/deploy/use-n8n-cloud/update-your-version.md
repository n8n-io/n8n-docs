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

n8n recommends keeping your Cloud version up to date. From the **Updates & maintenance** settings you choose which n8n version your workspace runs, and control when and how automatic updates happen. Check the [Release notes](https://app.gitbook.com/s/hhM8Cox90Piiv0u0EgHM/) to learn about changes in each version.

{% hint style="info" %}
Only instance owners can change these settings. Contact your instance owner if you don't have permission to update n8n Cloud.
{% endhint %}

To open the settings:

1. [Log in to the n8n Cloud dashboard](https://app.n8n.cloud/manage).
2. Select **Manage**.
3. Select **Workspace** to open the **Updates & maintenance** section.

Changing the version triggers a 1 to 2 minute restart. The other maintenance settings apply without a restart. Select **Save changes** to apply your changes.

## n8n version

The **n8n version** dropdown sets the version your workspace runs. Choose a version, then select **Change version** to apply it. To compare versions before you change, select **Open changelog**.

## Release track

The release track sets which n8n release stream your workspace follows. n8n tests both tracks. They differ in how soon new releases reach your workspace, and how long each release has run in production before it does:

* **Beta**: new releases delivered as soon as they're ready. Choose Beta to try the latest features first.
* **Stable**: a later, more proven patch of a release, cut after it's spent time on the Beta track. n8n recommends Stable for all mission-critical workloads.

You can switch between tracks at any time.

## Update cadence

The update cadence sets how often n8n upgrades your workspace to a newer build. n8n always applies security and stability updates automatically, whichever cadence you choose:

* **Security & stability**: upgrades about every two weeks. Recommended for most workspaces.
* **Every new release**: upgrades to each new release as it ships, on average one release per day. Great for trying out new features.

## Maintenance window

The maintenance window sets when n8n can apply upgrades, so you can reduce disruption. Times use the timezone shown above the setting.

* **Upgrade anytime**: n8n applies upgrades as soon as they're available.
* **Pick a window**: n8n only applies upgrades during the time range you set.

