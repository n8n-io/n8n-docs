---
permalink: /nodes/n8n-nodes-base.cron
description: Learn how to use the Cron node in n8n
---

# Cron

The Cron node is useful to schedule the workflows to run periodically at fixed dates, times, or intervals. This works in a similar way to the [cron](https://en.wikipedia.org/wiki/Cron) software utility in Unix-like systems. This core node is a Trigger node.

::: tip 💡 Keep in mind
1. If a workflow is using the Cron node as a trigger, make sure that you save and activate the workflow.
2. Make sure that the timezone is set correctly for the n8n instance (or the workflow).
:::

You can find the example usage of the Cron node in the [Create Your First Workflow](../../../../getting-started/create-your-first-workflow/create-your-first-workflow/README.md) guide.


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

To generate a Cron expression, you can use [crontab guru](https://crontab.guru). Paste the Cron expression that you generated using crontab guru in the ***Cron Expression*** field in n8n.

## Further Reading

- [Automate Designs with Bannerbear and n8n](https://medium.com/n8n-io/automate-designs-with-bannerbear-and-n8n-2b64c94b54db)
- [Creating scheduled text affirmations with n8n 🤟](https://medium.com/n8n-io/creating-scheduled-text-affirmations-with-n8n-1c4189efae19)
- [Database Monitoring and Alerting with n8n 📡](https://medium.com/n8n-io/database-monitoring-and-alerting-with-n8n-f5082df7bdb2)
- [How to host virtual coffee breaks with n8n ☕️](https://n8n.io/blog/how-to-host-virtual-coffee-breaks-with-n8n/)
- [Tracking Time Spent in Meetings With Google Calendar, Twilio, and n8n 🗓](https://medium.com/n8n-io/tracking-time-spent-in-meetings-with-google-calendar-twilio-and-n8n-a5d00f77da8c)
