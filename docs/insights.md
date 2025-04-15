---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
description: Insights
contentType: howto
---

# Insights

/// info | Feature availability
The insights summary banner displays activity from the last 7 days for all plans. The Insights dashboard is only available on Pro (with limited date ranges) and Enterprise plans. 
///

Insights gives instance owners and admins visibility into how workflows perform over time. This feature consists of three parts:

- Insights summary banner - showing key metrics across your istance over the last 7 days at the top of the overview space
- [**Insights dashboard**](#insights-dashboard): a more detailed visual breakdown with per-workflow metrics and historical comparisons
- **Workflow ROI**: For each workflow, you can set the number of minutes saved for each production execution.


## Insights summary banner

n8n collects several metrics for both the insights summary banner and dashboard. They include:

- Total production executions (not including sub-workflow executions or manual executions)
- Total failed production executions
- Production execution failure rate
- Time saved (when set on at least one or more active workflows)
- Run time average (including wait time from any wait nodes)

## Insights dashboard

Those on the Pro and Enterprise plans can access an addiitional **Insights** section from the side navigation. Each metric from the summary banner is also clickable, taking you to the corresponding chart.

The insights dashboard also has a table showing individual insights from each workflow including total production executions, failed production executions, failure rate, time saved, and run time average. 

## Insights time periods

Currently, the insights summary banner and dashboard always shows a rolling 7 day window with a comparison to the previous period to show increases or decreases for each metric.

## Disable metrics collection for insights

It's possible to disable the insights feature and metrics collection by setting the environment variable `N8N_DISABLED_MODULES['insights']`