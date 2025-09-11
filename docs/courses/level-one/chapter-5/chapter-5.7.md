---
contentType: tutorial
---

<!-- vale from-microsoft.We = NO -->
<!-- vale from-microsoft.FirstPerson = NO -->
# 7. Scheduling the Workflow

In this step of the workflow, you will learn how to schedule your workflow so that it runs automatically at a set time/interval using the Schedule Trigger node. After this step, your workflow should look like this:

[[ workflowDemo("file:////courses/level-one/finished.json") ]]

The workflow you've built so far executes only when you click on **Execute Workflow**. But Nathan needs it to run automatically every Monday morning. You can do this with the [Schedule Trigger](/integrations/builtin/core-nodes/n8n-nodes-base.scheduletrigger/index.md), which allows you to schedule workflows to run periodically at fixed dates, times, or intervals.

To achieve this, we'll remove the Manual Trigger node we started with and replace it with a Schedule Trigger node instead.

## Remove the Manual Trigger node

First, let's remove the Manual Trigger node:

1. Select the Manual Trigger node connected to your HTTP Request node.
2. Select the trash can icon to delete.

This removes the Manual Trigger node and you'll see an "Add first step" option.

## Add the Schedule Trigger node

1. Open the nodes panel and search for **Schedule Trigger**.
2. Select it when it appears in the search results.

In the Schedule Trigger node window, configure these parameters:

- **Trigger Interval**: Select **Weeks**.
- **Weeks Between Triggers**: Enter `1`.
- **Trigger on weekdays**: Select **Monday** (and remove **Sunday** if added by default).
- **Trigger at Hour**: Select **9am**.
- **Trigger at Minute**: Enter `0`.

Your Schedule Trigger node should look like this:

<figure><img src="/_images/courses/level-one/chapter-five/l1-c5-5-7-schedule-trigger-node.png" alt="Schedule Trigger Node" style="width:100%"><figcaption align = "center"><i>Schedule Trigger Node</i></figcaption></figure>

/// warning | Keep in mind
To ensure accurate scheduling with the Schedule Trigger node, be sure to set the correct timezone for your [n8n instance](/manage-cloud/set-cloud-timezone.md) or the [workflow's settings](/workflows/settings.md). The Schedule Trigger node will use the workflow's timezone if it's set; it will fall back to the n8n instance's timezone if it's not.
///

## Connect the Schedule Trigger node

Return to the canvas and connect your Schedule Trigger node to the HTTP Request node by dragging the arrow from it to the HTTP Request node.

Your full workflow should look like this:

[[ workflowDemo("file:////courses/level-one/finished.json") ]]

## What's next?

**You 👩‍🔧**: That was it for the workflow! I've added and configured all necessary nodes. Now every time you click on **Execute workflow**, n8n will execute all the nodes: getting, filtering, calculating, and transferring the sales data.

**Nathan 🙋**: This is just what I needed! My workflow will run automatically every Monday morning, correct?

**You 👩‍🔧**: Not so fast. To do that, you need to activate your workflow. I'll do this in the next step and show you how to interpret the execution log.
<!-- vale from-microsoft.We = YES -->
