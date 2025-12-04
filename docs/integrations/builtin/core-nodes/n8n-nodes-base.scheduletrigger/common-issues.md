---
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
1. Select the <span class="n8n-inline-image">![three dots menu](/_images/common-icons/three-dots-horizontal.png)</span> **Three dots icon** in the upper-right corner.
1. Select **Settings**.
1. Change the **Timezone** setting.
1. Select **Save**.

### Variables not working as expected

While variables can be used in the scheduled trigger, their values only get evaluated when the workflow is published. After publishing the workflow, you can alter a variable's value in the settings but it won't change how often the workflow runs. To work around this, you must stop and then publish a new version of the workflow to apply the updated variable value.

### Changing the trigger interval

You can update the scheduled trigger interval at any time but it only gets updated when the workflow is published. If you change the trigger interval after the workflow is active, the changes won't take effect until you stop and then publish a new version of the workflow.

Also, the schedule begins from the time when you publish the workflow. For example, if you had originally set a schedule of every 1 hour and it should execute at 12:00, if you changed it to a 2 hour schedule and publish a new version of the workflow at 11:30, the next execution will be at 13:30, 2 hours from when you published it.
