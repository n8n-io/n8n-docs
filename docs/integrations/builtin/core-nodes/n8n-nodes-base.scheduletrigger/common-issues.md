---
title: Schedule Trigger node common issues
contentType:
  - integration
  - reference
priority: critical
nodeTitle: Schedule Trigger node common issues
originalFilePath: >-
  integrations/builtin/core-nodes/n8n-nodes-base.scheduletrigger/common-issues.md
originalUrl: >-
  https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.scheduletrigger/common-issues
url: >-
  https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.scheduletrigger/common-issues
description: >-
  Documentation for common issues and questions in the Schedule Trigger node in
  n8n, a workflow automation platform. Includes details of the issue and
  suggested solutions.
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

# Common issues

Here are some common errors and issues with the [Schedule Trigger node](./) and steps to resolve or troubleshoot them.

## Invalid cron expression <a href="#invalid-cron-expression" id="invalid-cron-expression"></a>

This error occurs when you set **Trigger Interval** to **Custom (Cron)** and n8n doesn't understand your cron expression. This may mean that there is a mistake in your cron expression or that you're using an incompatible syntax.

To debug, check that the following:

* That your cron expression follows the syntax used in the [cron examples](./#custom-cron-interval)
* That your cron expression (after removing the [seconds column](./#why-there-are-six-asterisks-in-the-cron-expression)) validates on [crontab guru](https://crontab.guru/)

## Scheduled workflows run at the wrong time <a href="#scheduled-workflows-run-at-the-wrong-time" id="scheduled-workflows-run-at-the-wrong-time"></a>

If the Schedule Trigger node runs at the wrong time, it may mean that you need to adjust the time zone n8n uses.

### Adjust the timezone globally <a href="#adjust-the-timezone-globally" id="adjust-the-timezone-globally"></a>

If you're using [n8n Cloud](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/use-n8n-cloud), follow the instructions on the [set the Cloud instance timezone](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/use-n8n-cloud/configure-cloud/set-your-timezone) page to ensure that n8n executes in sync with your local time.

If you're [self hosting](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n), set your global timezone using the [`GENERIC_TIMEZONE` environment variable](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/configure-n8n/basic-configuration/use-environment-variables/timezone-and-localization).

### Adjust the timezone for an individual workflow <a href="#adjust-the-timezone-for-an-individual-workflow" id="adjust-the-timezone-for-an-individual-workflow"></a>

To set the timezone for an individual workflow:

1. Open the workflow on the canvas.
2. Select the <img src="../../../.gitbook/assets/three-dots-horizontal (2).png" alt="three dots menu" data-size="line"> **Three dots icon** in the upper-right corner.
3. Select **Settings**.
4. Change the **Timezone** setting.
5. Select **Save**.

### Variables not working as expected <a href="#variables-not-working-as-expected" id="variables-not-working-as-expected"></a>

While variables can be used in the scheduled trigger, their values only get evaluated when the workflow is published. After publishing the workflow, you can alter a variable's value in the settings but it won't change how often the workflow runs. To work around this, you must stop and then publish a new version of the workflow to apply the updated variable value.

### Changing the trigger interval <a href="#changing-the-trigger-interval" id="changing-the-trigger-interval"></a>

You can update the scheduled trigger interval at any time but it only gets updated when the workflow is published. If you change the trigger interval after the workflow is active, the changes won't take effect until you stop and then publish a new version of the workflow.

Also, the schedule begins from the time when you publish the workflow. For example, if you had originally set a schedule of every 1 hour and it should execute at 12:00, if you changed it to a 2 hour schedule and publish a new version of the workflow at 11:30, the next execution will be at 13:30, 2 hours from when you published it.
