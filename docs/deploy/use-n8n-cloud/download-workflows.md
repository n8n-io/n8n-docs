---
title: Download workflows
description: How to download workflows from an n8n Cloud backup in the n8n Cloud console.
contentType: howto
nodeTitle: Download workflows
originalFilePath: manage-cloud/download-workflows.md
originalUrl: 'https://docs.n8n.io/manage-cloud/download-workflows'
url: 'https://docs.n8n.io/deploy/use-n8n-cloud/download-workflows'
layout:
  description:
    visible: false
---

# Download workflows <a href="#download-workflows" id="download-workflows"></a>

n8n Cloud instance owners can download their workflows from an n8n Cloud backup in the [n8n Cloud console](use-the-cloud-console.md). n8n creates backups automatically. They contain workflows only, never credentials.

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/KbKP88R2IFii1k97togq/" %}

## How to download workflows <a href="#how-to-download-workflows" id="how-to-download-workflows"></a>

1. Open the [Cloud console](use-the-cloud-console.md).
1. In the sidebar, select **Export**. n8n opens the **Data export** page.
1. In **Workflow backups**, use the **Backup** dropdown to choose which backup to export. If only one backup exists, n8n shows it instead of a dropdown.
1. Select **Download workflows**. The export opens in a new tab.

The **Latest backup** card on the **Overview** page shows when n8n created your most recent backup. Select **Download** on that card to go to the **Export** page.

If your instance is new or has been offline for a long time, it might not have any backups yet. In that case, the **Export** page shows **No backups available yet**.

Workflow export isn't available yet for instances that n8n hosts on PostgreSQL. For these instances, the **Export** page shows **Export is unavailable for this instance**, with a link to create a support ticket so n8n support can export your workflows.

## Accessing workflows after your free trial <a href="#accessing-workflows-after-your-free-trial" id="accessing-workflows-after-your-free-trial"></a>

You have **90 days** to download your workflows after your free trial ends. After that, all workflows will be **permanently deleted** and are unrecoverable.

## Related resources

* [Use n8n Cloud](./)
* [Try free then choose a plan](start-your-free-trial.md)
* [Use the Cloud console](use-the-cloud-console.md)
* [Update your version](update-your-version.md)
* [Configure Cloud](configure-cloud/README.md)
* [Gateway credits](gateway-credits/README.md)
* [Assistant credits](assistant-credits/README.md)
* [Understand concurrency](understand-concurrency.md)
