---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
description: Insights
contentType: howto
---

# Insights

/// info | Feature availability
The insights summary banner showing activity from the last 7 days is available to all plans. The Insights dashboard is only available on Pro (with limited date ranges) and Enterprise plans. 
///

Insights gives instance owners and admins visibility into how workflows are performing over time. This feature is split into three parts:

- Insights summary banner - showing key metrics across your istance over the last 7 days at the top of the overview space
- Insights dsahboard - a more detailed visual breakdown with per-workflow metrics and historical comparisons
- Workflow ROI - For each workflow, you can set the number of minutes saved eaech time a workflow has a production execution. 


## Insights summary banner

A number of metrics are collected for both the insights summary banner and dashboard. They include:

- Total production executions (This does not include sub-workflow executions or manual executions)
- Total failed production executions
- Production execution failure rate
- Time saved (Where set on at least one or more active workflows)
- Run time average (This will include wait time from any wait nodes)

## Insights dashboard

For those on the Pro and Enterprise plans, an addntional Insights section can be accessed from the side navigation. Each metric from the summary banner is also clickable, taking you to the corresponding chart.

The insights dashboard also has a table showing individual insights from each workflow including total production executions, failed production executions, failure rate, time saved and run time average. 

## Insights time periods

Currently the insights summary banner and dashboard will always show a rolling 7 day window with a comparison of the previous period to show any increase/decreases for each metric.

## Disable metrics collection for insights

It's possible to disable the insights feature and metrics collection by setting the environment variable `N8N_DISABLED_MODULES['insights']`