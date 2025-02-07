---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Schedule Trigger node common issues 
description: Documentation for common issues and questions in the Schedule Trigger node in n8n, a workflow automation platform. Includes details of the issue and suggested solutions.
contentType: [integration, reference]
priority: critical
---

# Schedule Trigger node common issues

Here are some common errors and issues with the [Schedule Trigger node](/integrations/builtin/core-nodes/n8n-nodes-base.scheduletrigger/index.md) and steps to resolve or troubleshoot them.

## Invalid cron expression

This error occurs when you set **Trigger Interval** to **Custom (Cron)** and n8n doesn't understand your cron expression. This may mean that there is a mistake in your cron expression or that you're using an incompatible syntax.

To debug, check that the following:

* That your cron expression follows the syntax used in the [cron examples](/integrations/builtin/core-nodes/n8n-nodes-base.scheduletrigger/index.md#custom-cron-interval)
* That your cron expression (after removing the [seconds column](/integrations/builtin/core-nodes/n8n-nodes-base.scheduletrigger/index.md#why-there-are-six-asterisks-in-the-cron-expression)) validates on [crontab guru](https://crontab.guru/)

## Scheduled workflows run at the wrong time

If the Schedule Trigger node runs at the wrong time, it may mean that you need to adjust the time zone n8n uses.

### Adjust the timezone globally

If you're using [n8n Cloud](/manage-cloud/overview.md), follow the instructions on the [set the Cloud instance timezone](/manage-cloud/set-cloud-timezone.md) page to ensure that n8n executes in sync with your local time.

If you're [self hosting](/hosting/index.md), set your global timezone using the [`GENERIC_TIMEZONE` environment variable](/hosting/configuration/environment-variables/timezone-localization.md).

### Adjust the timezone for an individual workflow

To set the timezone for an individual workflow:

1. Open the workflow on the canvas.
1. Select the <span class="inline-image">![three dots menu](/_images/common-icons/three-dots-horizontal.png)</span> **Three dots icon** in the upper-right corner.
1. Select **Settings**.
1. Change the **Timezone** setting.
1. Select **Save**.
