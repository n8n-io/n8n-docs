---
contentType: tutorial
---

# 7. Scheduling the Workflow

In this step of the workflow you will learn how to schedule your workflow so that it runs automatically at a set time/interval using the Schedule Trigger Node.

The workflow you've built so far executes only when you click on _Execute Workflow_. But Nathan needs it to run automatically every Monday morning. You can do this with the [Schedule Trigger](/integrations/builtin/core-nodes/n8n-nodes-base.scheduletrigger/){:target="_blank" .external}, which allows you to schedule workflows to run periodically at fixed dates, times, or intervals.

In your workflow, add the Schedule trigger node, and configure its parameters:

* _Trigger Interval:_ Every Week
* _Weeks Between Triggers:_ 1
* _Trigger on weekdays:_ Monday
* _Trigger at Hour:_ 9am
* _Trigger at Minute:_ 0

<figure><img src="/_images/courses/level-one/chapter-five/l1-c5-5-7-schedule-trigger-node.png" alt="Schedule Trigger Node" style="width:100%"><figcaption align = "center"><i>Schedule Trigger Node</i></figcaption></figure>

/// warning | Keep in mind
To ensure accurate scheduling with the Schedule Trigger Node, be sure the timezone is set correctly for your n8n instance (or the workflow).
///

## What's next?

**You 👩‍🔧**: That was it for the workflow! I've added and configured all necessary nodes. Now every time you click on Execute Workflow, all nodes will be executed: getting, filtering, calculating, and transferring the sales data.

**Nathan 🙋**: This is just what I needed! So now my workflow will run automatically every Monday morning?

**You 👩‍🔧**: Not so fast. To do that, you need to activate your workflow. I'll do this in the next step and show you how to interpret the execution log.
