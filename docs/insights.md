---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
description: Insights
contentType: explanation
---

# Insights

Insights gives instance owners and admins visibility into how workflows perform over time. This feature consists of three parts:

- [**Insights summary banner**](#insights-summary-banner): Shows key metrics about your instance from the last 7 days at the top of the overview space.
- [**Insights dashboard**](#insights-dashboard): A more detailed visual breakdown with per-workflow metrics and historical comparisons.
- [**Time saved (Workflow ROI)**](#setting-time-saved-on-a-workflow): For each workflow, you can set the number of minutes saved for each production execution.

/// info | Feature availability
The insights summary banner displays activity from the last 7 days for all plans. The insights dashboard is only available on Pro (with limited date ranges) and Enterprise plans. 
///

## Insights summary banner

n8n collects several metrics for both the insights summary banner and dashboard. They include:

- Total production executions (not including sub-workflow executions or manual executions)
- Total failed production executions
- Production execution failure rate
- Time saved (when set on at least one or more active workflows)
- Run time average (including wait time from any wait nodes)

## Insights dashboard

Those on the Pro and Enterprise plans can access the **Insights** section from the side navigation. Each metric from the summary banner is also clickable, taking you to the corresponding chart.

The insights dashboard also has a table showing individual insights from each workflow including total production executions, failed production executions, failure rate, time saved, and run time average. 

## Insights time periods

By default, the insights summary banner and dashboard shows a rolling 7 day window with a comparison to the previous period to show increases or decreases for each metric. Once on the dashboard, additional date ranges are available on paid plans:

- Pro: 7 and 14 days
- Enterprise: 24 hours, 7 days, 14 days, 30 days, 90 days, 6 months, 1 year

## Setting time saved on a workflow
For each workflow, you can set a figure in minutes for how much time a workflow saves each time it runs. This can be configured by navigating to the workflow, clicking on the three dots menu in the top right and selecting settings. There you will see an "Estimated time saved" input. Update as required and save. 

This is intended to be a calculation of how much time is saved automating a process vs the manual effort to complete the same task or process. Once this is set, we calculate the amount of time saved, based on the number of production executions and display this in the summary banner and dashboard for the selected time period.

## Disable or configure insights metrics collection

If you self-host n8n, you can disable or configure insights and metrics collection using [environment variables](/hosting/configuration/environment-variables/insights.md).

## Insights FAQs

1. **Which executions are included in the insights banner and dashboard?**
Currently, we only collect production executions (e.g those from active workflows triggered on a schedule or a webhook) from the main (parent) workflow. This means that we do not count manual (test) executions or executions from sub-workflows or error workflows.

2. **Do insights include historical executions if I'm updating from a version before it was available?**
The data collection for insights only starts happening once you update to the first supported version (1.89.0). This means we only report on executions from that point forward and you will not see execution data included in insights prior to that.
