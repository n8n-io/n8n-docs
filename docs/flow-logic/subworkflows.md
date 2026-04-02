---
contentType: howto
description: Call workflows from other workflows, and split large workflows into smaller components.
---

# Sub-workflows

You can call one workflow from another workflow. This allows you to build modular, microservice-like workflows. It can also help if your workflow grows large enough to encounter [memory issues](/hosting/scaling/memory-errors.md). Creating sub-workflows uses the [Execute Workflow](/integrations/builtin/core-nodes/n8n-nodes-base.executeworkflow.md) and [Execute Sub-workflow Trigger](/integrations/builtin/core-nodes/n8n-nodes-base.executeworkflowtrigger.md) nodes.

Sub-wokflow executions don't count towards your plan's monthly execution or active workflow limits.

## Set up and use a sub-workflow

This section walks through setting up both the parent workflow and sub-workflow.

--8<-- "_snippets/flow-logic/subworkflow-usage.md"

## How data passes between workflows

--8<-- "_snippets/flow-logic/subworkflow-data-flow.md"

## Sub-workflow conversion

See [sub-workflow conversion](/workflows/subworkflow-conversion.md) for how to divide your existing workflows into sub-workflows.
