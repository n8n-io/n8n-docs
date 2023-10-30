---
title: Schedule trigger
description: Documentation for the Schedule trigger node in n8n, a workflow automation platform. Includes guidance on usage, and links to examples.
contentType: integration
---

# Schedule trigger

Use the Schedule trigger node run workflows at fixed intervals and times. This works in a similar way to the Cron software utility in Unix-like systems.


!!! note "You must activate the workflow" 
	If a workflow uses the Schedule node as a trigger, make sure that you save and activate the workflow. 

--8<-- "_snippets/integrations/builtin/core-nodes/schedule/timezone-settings.md"


## Schedule your workflow

Select an interval in **Trigger Interval**. n8n displays options for the selected interval.

### Example

In this example, schedule a workflow to run once a quarter, at the end of the quarter, at 09:00.

1. In **Trigger Interval**, select **Months**.
2. Change **Months Between Triggers** to `3`.
3. To run the workflow at the end of the month, change **Trigger at Day of Month** to `28`.
4. Change **Trigger at Hour** to **9am**. Leave **Trigger at Minute** as its default, `0`.

Note that the Schedule trigger uses the workflow timezone if available. Otherwise it uses the n8n instance timezone. 

## Generate a custom Cron expression

If you need a custom time setting, select **Trigger Interval** > **Custom (Cron)**.

To generate a Cron expression, you can use [crontab guru](https://crontab.guru){:target=_blank .external-link}. Paste the Cron expression that you generated using crontab guru in the **Expression** field in n8n.

### Examples

If you want to trigger your workflow every day at 04:08:30, enter the following in the **Cron Expression** field.
```
30 8 4 * * *
```

If you want to trigger your workflow every day at 04:08, enter the following in the **Cron Expression** field.
```
8 4 * * *
```

### Why there are six asterisks in the Cron expression

The sixth asterisk in the Cron expression represents seconds. Setting this is optional. The node will execute even if you don't set the value for seconds.

| * | * | * | * | * | * |
|---|---|---|---|---|---|
|second|minute|hour|day|week|month|

