---
description: Insights
contentType: explanation
nodeTitle: Track usage with Insights
originalFilePath: insights.md
originalUrl: 'https://docs.n8n.io/insights'
url: 'https://docs.n8n.io/administer/observe-and-log/track-usage-with-insights'
layout:
  description:
    visible: false
---

# Insights <a href="#insights" id="insights"></a>

Insights gives instance owners and admins visibility into how workflows perform over time. This feature consists of three parts:

- [**Insights summary banner**](#insights-summary-banner): Shows key metrics about your instance from the last 7 days at the top of the **Overview** space.
- [**Insights dashboard**](#insights-dashboard): A more detailed visual breakdown with per-workflow metrics and historical comparisons.
- [**Time saved (Workflow ROI)**](#setting-the-time-saved-by-a-workflow): For each workflow, you can choose to set a fixed amount of time saved per workflow, or dynamically calculate time saved based on the execution path taken on a specific workflow.

{% hint style="info" %}
**Feature availability**

The insights summary banner displays activity from the last 7 days for all plans. The insights dashboard is only available on Pro, Business, and Enterprise plans.
{% endhint %}

## Insights summary banner <a href="#insights-summary-banner" id="insights-summary-banner"></a>

n8n collects several metrics for both the insights summary banner and dashboard. They include:

- Total production executions (not including sub-workflow executions or manual executions)
- Total failed production executions
- Production execution failure rate
- Time saved (when set on at least one or more active workflows)
- Run time average (including wait time from any wait nodes)

## Insights dashboard <a href="#insights-dashboard" id="insights-dashboard"></a>

Access the **Insights** section from the side navigation. Each metric from the summary banner is also clickable, taking you to the corresponding chart.

The insights dashboard also has a table showing individual insights from each workflow including total production executions, failed production executions, failure rate, time saved, and run time average. 

## Insights time periods <a href="#insights-time-periods" id="insights-time-periods"></a>

By default, the insights summary banner and dashboard show a rolling 7 day window with a comparison to the previous period to identify increases or decreases for each metric. On the dashboard, paid plans also display data for other date ranges:

- Pro: 7 and 14 days
- Business: 24 hours, 7 days, 14 days, 30 days.
- Enterprise: 24 hours, 7 days, 14 days, 30 days, 90 days, 6 months, 1 year

## Setting the time saved by a workflow <a href="#setting-the-time-saved-by-a-workflow" id="setting-the-time-saved-by-a-workflow"></a>

For each workflow, you can track how much time it saves you. This setting helps you calculate how much time automating a process saves over time vs the manual effort to complete the same task or process. 

Once configured, n8n calculates the amount of time the workflow saves you based on the number of production executions and displays it on the summary banner and insights dashboard.

You can choose between two methods for calculating time saved:

### Fixed time saved <a href="#fixed-time-saved" id="fixed-time-saved"></a>

With fixed time saved, you set a single time value that applies to every production execution of the workflow, regardless of which path the execution takes.

To configure fixed time saved:

1. Navigate to the workflow
2. Select the three dots menu in the top right and select **Settings**
3. In the **Estimated time saved** dropdown, select **Fixed**
4. Enter the number of minutes of work each execution saves
5. Save your settings

### Dynamic time saved <a href="#dynamic-time-saved" id="dynamic-time-saved"></a>

Dynamic time saved calculates time savings based on the actual execution path taken, accounting for workflows where different execution paths save different amounts of time.

To configure dynamic time saved:

1. Navigate to the workflow
2. Select the three dots menu in the top right and select **Settings**
3. In the **Estimated time saved** dropdown, select **Dynamic**
4. Save your settings
5. Add **Time Saved** nodes to your workflow at the points where time is saved
6. For each Time Saved node, configure:
   - **Time saved**: The amount of time saved (in minutes)
   - **Calculation mode**: Choose whether to calculate the time saved once for all items in an execution, or per item which will multiply minutes saved by the total number of input items

When you use dynamic time saved, n8n adds up the time from all Time Saved nodes that execute during a workflow run to calculate the total time saved for that execution.

{% hint style="info" %}
**Subworkflow support**

Time saved tracking currently only works on parent workflows. Time saved from subworkflows isn't currently supported, with plans to support this in a future release.
{% endhint %}

## Disable or configure insights metrics collection <a href="#disable-or-configure-insights-metrics-collection" id="disable-or-configure-insights-metrics-collection"></a>

If you self-host n8n, you can disable or configure insights and metrics collection using [environment variables](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/configure-n8n/basic-configuration/use-environment-variables/insights).

By default, n8n keeps compacted insights data for 365 days (`N8N_INSIGHTS_MAX_AGE_DAYS`). n8n caps retention at 730 days (two years); use a lower number for a shorter window. To turn off insights collection entirely, set `N8N_DISABLED_MODULES=insights` (refer to the [environment variables page](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/configure-n8n/basic-configuration/use-environment-variables/insights)).

{% hint style="info" %}
**Self-host upgrade**

In older versions, pruning could follow license-driven defaults (commonly 180 days). `N8N_INSIGHTS_MAX_AGE_DAYS` now controls pruning (default 365). Set `N8N_INSIGHTS_MAX_AGE_DAYS=180` if you want a retention window like that previous default.
{% endhint %}

n8n stores recent insights at one-hour granularity, then compacts older data into day-level and week-level summaries. Use [Insights environment variables](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/configure-n8n/basic-configuration/use-environment-variables/insights) to control compaction timing, batch limits, runtime, and delays.

Raising those thresholds above the defaults keeps finer detail longer. That adds more rows to `insights_by_period` and uses more database space than extending `N8N_INSIGHTS_MAX_AGE_DAYS` alone. Increase `N8N_INSIGHTS_MAX_AGE_DAYS` first if you only need a longer retention window.

## Insights FAQs <a href="#insights-faqs" id="insights-faqs"></a>


### Which executions do n8n use to calculate the values in the insights banner and dashboard? <a href="#which-executions-do-n8n-use-to-calculate-the-values-in-the-insights-banner-and-dashboard" id="which-executions-do-n8n-use-to-calculate-the-values-in-the-insights-banner-and-dashboard"></a>

n8n insights only collects data from production executions (for example, those from active workflows triggered on a schedule or a webhook) from the main (parent) workflow. This means that it doesn't count manual (test) executions or executions from sub-workflows or error workflows.

### Does n8n use historic execution data when upgrading to a version with insights? <a href="#does-n8n-use-historic-execution-data-when-upgrading-to-a-version-with-insights" id="does-n8n-use-historic-execution-data-when-upgrading-to-a-version-with-insights"></a>

n8n only starts collecting data for insights once you update to the first supported version (1.89.0). This means it only reports on executions from that point forward and you won't see execution data in insights from prior periods.
