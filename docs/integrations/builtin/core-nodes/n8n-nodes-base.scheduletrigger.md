---
title: Schedule trigger
description: Documentation for the Schedule trigger node in n8n, a workflow automation platform. Includes guidance on usage, and links to examples.
contentType: integration
---

# Schedule trigger

Use the Schedule trigger node run workflows at fixed intervals and times. This works in a similar way to the Cron software utility in Unix-like systems.

/// note | Examples and templates
For usage examples and templates to help you get started, refer to n8n's [Schedule Trigger integrations](https://n8n.io/integrations/schedule-trigger/){:target=_blank .external-link} page.
///

/// note | You must activate the workflow"
If a workflow uses the Schedule node as a trigger, make sure that you save and activate the workflow. 
///

--8<-- "_snippets/integrations/builtin/core-nodes/schedule/timezone-settings.md"


## Schedule your workflow

Select an interval in **Trigger Interval**. n8n displays options for the selected interval.

## Generate a custom Cron expression

If you need a custom time setting, select **Trigger Interval** > **Custom (Cron)**.

To generate a Cron expression, you can use [crontab guru](https://crontab.guru){:target=_blank .external-link}. Paste the Cron expression that you generated using crontab guru in the **Expression** field in n8n.

### Why there are six asterisks in the Cron expression

The sixth asterisk in the Cron expression represents seconds. Setting this is optional. The node will execute even if you don't set the value for seconds.

| * | * | * | * | * | * |
|---|---|---|---|---|---|
|second|minute|hour|day|week|month|

