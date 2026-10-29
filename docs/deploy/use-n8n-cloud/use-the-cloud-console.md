---
description: How to open and find your way around the n8n Cloud console, where instance owners manage their n8n Cloud instance, plan, and credits.
contentType: howto
nodeTitle: Use the Cloud console
originalFilePath: manage-cloud/cloud-admin-dashboard.md
originalUrl: 'https://docs.n8n.io/manage-cloud/cloud-admin-dashboard'
url: 'https://docs.n8n.io/deploy/use-n8n-cloud/use-the-cloud-console'
layout:
  description:
    visible: false
---

# Use the Cloud console

The n8n Cloud console at [app.n8n.cloud](https://app.n8n.cloud) is where the instance owner manages their n8n Cloud instance, plan, billing, and credits.

Only the instance owner can open the Cloud console. Other users on the instance work in the n8n editor and don't have access to it.

## Pages in the Cloud console

The left sidebar of the Cloud console has these pages:

* **Overview**: your instance's status, with **Open instance** to go to the editor. It also shows your plan, execution usage, credit balances, n8n version, latest backup, and recent activity.
* **Instance settings**: change your n8n version, release track, update cadence, and maintenance window. Set the time zone and which executions to save, and turn Gateway credits and verified community nodes on or off. You can also restart your instance and delete your account here.
* **Assistant credits**: check and top up the [Assistant credits](assistant-credits/README.md) that pay for n8n Assistant.
* **Gateway credits**: check and top up the [Gateway credits](gateway-credits/README.md) that pay for AI models and services in your workflows.
* **Billing**: see your current plan, change or cancel it, change your payment method, and view your transaction history.
* **Export**: [download your workflows](download-workflows.md) from a backup.

The **Assistant credits** and **Gateway credits** pages only appear if those features are available for your instance.

Select **Help & resources** at the bottom of the sidebar for links to the help center, documentation, community forum, and workflow templates.

## Open the Cloud console from n8n

1. Log in to your n8n instance as the instance owner.
1. In the left menu, select **Admin Panel**. n8n opens the Cloud console.

## Open the Cloud console with a magic link

You can sign in to the Cloud console with a magic link sent to your email. This works even if your instance is offline, for example because it can't start.

1. Go to [app.n8n.cloud/magic-link](https://app.n8n.cloud/magic-link).
1. In **Instance owner email**, enter the email address of the instance owner account.
1. Select **Send magic link**.
1. Open the email from n8n and select the link to sign in.

On the [app.n8n.cloud](https://app.n8n.cloud) sign-in page, you can also select **Don't know your instance name?**, then **Sign in to the Cloud console**, to reach the same page.

## Restart your instance

If your instance is offline or not responding, restart it from the Cloud console:

1. Open the Cloud console and select **Instance settings**.
1. Select **Restart** next to the instance status at the top of the page.
1. Select **Restart instance** to confirm.

Your instance is offline until the restart completes, and any running executions stop.

## Related resources

* [Use n8n Cloud](./)
* [Try free then choose a plan](start-your-free-trial.md)
* [Update your version](update-your-version.md)
* [Configure Cloud](configure-cloud/README.md)
* [Gateway credits](gateway-credits/README.md)
* [Assistant credits](assistant-credits/README.md)
* [Understand concurrency](understand-concurrency.md)
* [Download workflows](download-workflows.md)
