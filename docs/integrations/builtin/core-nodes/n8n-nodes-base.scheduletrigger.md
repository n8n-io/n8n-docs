---
title: Schedule Trigger node - n8n Documentation
description: Documentation for the Schedule Trigger node in n8n, a workflow automation platform. Includes guidance on usage, and links to examples.
---

# Schedule Trigger

Use the Schedule Trigger node run workflows at fixed intervals and times. This works in a similar way to the cron software utility in Unix-like systems.

!!! note "Cron node"
	The Schedule Trigger node replaces the Cron node from version 0.199.0 onwards. If you're using an older version of n8n, you can still view the [Cron node documentation](https://github.com/n8n-io/n8n-docs/blob/67935ad2528e2e30d7984ea917e4af2910a096ec/docs/integrations/builtin/core-nodes/n8n-nodes-base.cron.md){:target=_blank .external-link}.

!!! note "Keep in mind" 
	1. If a workflow uses the Schedule node as a trigger, make sure that you save and activate the workflow. 
	2. Set the timezone correctly for the n8n instance (or the workflow).


## Schedule your workflow

Select an interval in **Trigger Interval**. Once you select an interval, n8n displays more options to customize that interval.

### Example

In this example, schedule a workflow to run once a quarter, at the end of the quarter, at 09:00.

1. In **Trigger Interval**, select **Months**.
2. Change **Months Between Triggers** to `3`.
3. To run the workflow at the end of the month, change **Trigger at Day of Month** to `28`.
4. Change **Trigger at Hour** to **9am**. Leave **Trigger at Minute** as its default, `0`.

Note that the Schedule Trigger uses the workflow timezone if available. Otherwise it uses the n8n instance timezone. 

## Generate a custom cron expression

If you need a custom time setting, select **Trigger Interval** > **Custom (Cron)**.

To generate a cron expression, you can use [crontab guru](https://crontab.guru){:target=_blank .external-link}. Paste the cron expression that you generated using crontab guru in the **Expression** field in n8n.

### Examples

If you want to trigger your workflow every day at 04:08:30, enter the following in the **Cron Expression** field.
```
30 8 4 * * *
```

If you want to trigger your workflow every day at 04:08, enter the following in the **Cron Expression** field.
```
8 4 * * *
```

### Why there are six asterisks (*) in the cron expression?

The sixth asterisk in the cron expression represents seconds. Setting this is optional. The node will execute even if you don't set the value for seconds.

| * | * | * | * | * | * |
|---|---|---|---|---|---|
|second|minute|hour|day|week|month|

