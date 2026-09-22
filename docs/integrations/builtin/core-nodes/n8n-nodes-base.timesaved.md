---
description: >-
  Learn how to use the Track Time Saved node in n8n to record how much time a
  workflow saves on each execution.
layout:
  description:
    visible: false
---

# Track Time Saved node

Use the Track Time Saved node to record how many minutes a workflow saves, based on the path an execution actually takes. n8n adds up every Track Time Saved node that runs during an execution and reports the total in [Insights](https://app.gitbook.com/s/wMJrGrimpx3PxCJpUswm/observe-and-log/track-usage-with-insights).

Use this node when different paths through a workflow save different amounts of time. If every execution saves the same amount, set a fixed value on the workflow instead and you don't need this node.

{% hint style="info" %}
**Set the workflow to Dynamic first**

This node only counts if the workflow's **Estimated time saved** setting is set to **Dynamic**. See [Setting the time saved by a workflow](https://app.gitbook.com/s/wMJrGrimpx3PxCJpUswm/observe-and-log/track-usage-with-insights#setting-the-time-saved-by-a-workflow).
{% endhint %}

## Node parameters

* **Calculation Mode**: Choose how n8n counts the minutes:
  * **Once For All Items**: Counts **Minutes Saved** once, no matter how many items reach the node.
  * **Per Item**: Multiplies **Minutes Saved** by the number of input items.
* **Minutes Saved**: The number of minutes this step saves. Whole minutes, zero or more.

## How n8n calculates the total

n8n adds up every Track Time Saved node that executes during a production run. Nodes on a branch that doesn't execute don't count, which is what makes the total reflect the path taken.

You can place more than one Track Time Saved node in the same workflow. n8n sums their values for that execution.

## Limitations

* Time saved is only tracked on parent workflows. Time saved inside a sub-workflow isn't counted.
* Error workflow executions don't contribute to time saved, even though n8n includes them in the other Insights metrics.

## Related resources

* [Track usage with Insights](https://app.gitbook.com/s/wMJrGrimpx3PxCJpUswm/observe-and-log/track-usage-with-insights): the Insights dashboard and the workflow-level time saved setting.
* [Workflow settings](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/manage-workflows/configure-workflow-settings): where you set **Estimated time saved**.
