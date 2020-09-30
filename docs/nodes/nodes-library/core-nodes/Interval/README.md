---
permalink: /nodes/n8n-nodes-base.interval
description: Learn how to use the Interval node in n8n
---

# Interval

The Interval node is used to trigger the workflow to run in regular intervals of time. This node is a Trigger node.

::: tip 💡 Keep in mind
If a workflow is using the Interval node as a trigger, make sure that you save and activate the workflow.
:::

The Interval node has two fields:
1. *Interval* field: This is a numerical field where you can specify the interval after which the workflow should get triggered again.
2. *Unit* field: This is a dropdown list which allows you to select a unit for the value that was provided for the *Interval* field. This field offers the following options for its dropdown list:
    - Seconds
    - Minutes
    - Hours

![A workflow with the Interval node](./workflow.png)
