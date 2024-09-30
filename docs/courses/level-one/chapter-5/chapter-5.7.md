---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: tutorial
---

# 7. Scheduling the Workflow

In this step of the workflow, you will learn how to schedule your workflow so that it runs automatically at a set time/interval using the Schedule Trigger node.

The workflow you've built so far executes only when you click on **Test Workflow**. But Nathan needs it to run automatically every Monday morning. You can do this with the [Schedule Trigger](/integrations/builtin/core-nodes/n8n-nodes-base.scheduletrigger/), which allows you to schedule workflows to run periodically at fixed dates, times, or intervals.

To achieve this, we'll remove the Manual Trigger node we started with and replace it with a Schedule Trigger node instead.

## Remove the Manual Trigger node

First, let's remove the Manual Trigger node:

1. Select the Manual Trigger node connected to your HTTP Request node.
2. Select the trash can icon to delete.

The Manual Trigger node will be removed and you'll see an "Add first step" option.

## Add the Schedule Trigger node

1. Open the nodes panel and search for **Schedule Trigger**.
2. Select it when it appears in the search results.

In the Schedule Trigger node window, configure these parameters:

- **Trigger Interval**: Select **Weeks**.
- **Weeks Between Triggers**: Enter `1`.
- **Trigger on weekdays**: Select **Monday** (and remove **Sunday** if it was automatically added).
- **Trigger at Hour**: Select **9am**.
- **Trigger at Minute**: Enter `0`.

Your Schedule Trigger node should look like this:

<figure><img src="/_images/courses/level-one/chapter-five/l1-c5-5-7-schedule-trigger-node.png" alt="Schedule Trigger Node" style="width:100%"><figcaption align = "center"><i>Schedule Trigger Node</i></figcaption></figure>

/// warning | Keep in mind
To ensure accurate scheduling with the Schedule Trigger node, be sure the timezone is set correctly for your [n8n instance](/manage-cloud/set-cloud-timezone/) or the [workflow's settings](/workflows/settings/). The Schedule Trigger node will use the workflow's timezone if it's set; it will fall back to the n8n instance's timezone if it's not.
///

## Connect the Schedule Trigger node

Return to the canvas and connect your Schedule Trigger node to the HTTP Request node by dragging the arrow from it to the HTTP Request node.

Your full workflow should look like this:

<figure><img src="/_images/courses/level-one/chapter-five/l1-c5-5-7-inactivated-workflow.png" alt="Full workflow" style="width:100%"><figcaption align = "center"><i>Full workflow</i></figcaption></figure>

## What's next?

**You 👩‍🔧**: That was it for the workflow! I've added and configured all necessary nodes. Now every time you click on **Test workflow**, all nodes will be executed: getting, filtering, calculating, and transferring the sales data.

**Nathan 🙋**: This is just what I needed! My workflow will run automatically every Monday morning, correct?

**You 👩‍🔧**: Not so fast. To do that, you need to activate your workflow. I'll do this in the next step and show you how to interpret the execution log.
