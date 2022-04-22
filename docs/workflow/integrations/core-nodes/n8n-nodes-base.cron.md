# Cron

The Cron node is useful to schedule the workflows to run periodically at fixed dates, times, or intervals. This works in a similar way to the [cron](https://en.wikipedia.org/wiki/Cron) software utility in Unix-like systems. This core node is a Trigger node.

!!! note " Keep in mind"
    1. If a workflow is using the Cron node as a trigger, make sure that you save and activate the workflow.
2. Make sure that the timezone is set correctly for the Doc² instance (or the workflow).



## Node Reference

You can configure the node by clicking on the *Add Cron Time* button under the *Trigger Times* section. There are a couple of different options available for the *Mode* field in the form of a dropdownlist.

- Mode
    - Every Minute
    - Every Hour
    - Every Day
    - Every Week
    - Every Month
    - Every X
    - Custom

The 'Every X' option allows you to specify the workflow to be triggered every x minutes or hours. You can specify x by entering a number in the *Value* field. The 'Custom' option allows you to enter a custom [cron expression](https://en.wikipedia.org/wiki/Cron#CRON_expression) in the *Cron Expression* field.

## FAQs

### How to generate a custom Cron expression?

To generate a Cron expression, you can use [crontab guru](https://crontab.guru). Paste the Cron expression that you generated using crontab guru in the ***Cron Expression*** field in Workflow².

### Why there are six asterisks (*) in the Cron Expression?

The sixth asterisk in the Cron Expression represents seconds. Setting this is optional. The node will execute even if you don't set the value for seconds.

| * | * | * | * | * | * |
|---|---|---|---|---|---|
|second|minute|hour|day|week|month|

If you want to trigger your workflow, for example, every day at 04:08:30, enter the following in the ***Cron Expression*** field.
```
30 8 4 * * *
```

If you want to trigger your workflow, for example, every day at 04:08, enter the following in the ***Cron Expression*** field.
```
8 4 * * *
```




