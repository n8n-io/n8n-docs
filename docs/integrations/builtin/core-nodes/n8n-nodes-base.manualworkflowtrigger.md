---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Manual Trigger node documentation
description: Learn how to use the Manual Trigger node in n8n. Follow technical documentation to integrate Manual Trigger node into your workflows.
contentType: integration
priority: critical
---

# Manual Trigger node

Use this node if you want to start a workflow by selecting **Test Workflow** and don't want any option for the workflow to run automatically.

Workflows always need a trigger, or start point. Most workflows start with a trigger node firing in response to an external event or the [Schedule Trigger](/integrations/builtin/core-nodes/n8n-nodes-base.scheduletrigger/) firing on a set schedule.

The Manual Trigger node serves as the workflow trigger for workflows that don't have an automatic trigger.

Use this trigger:

* To test your workflow before you add an automatic trigger of some kind.
* When you don't want the workflow to run automatically.

## Common issues

Here are some common errors and issues with the Manual Trigger node and steps to resolve or troubleshoot them.

<!-- vale off -->
### Only one 'Manual Trigger' node is allowed in a workflow
<!-- vale on -->

This error displays if you try to add a Manual Trigger node to a workflow which already includes a Manual Trigger node.

Remove your existing Manual Trigger or edit your workflow to connect that trigger to a different node.
