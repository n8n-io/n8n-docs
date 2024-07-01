---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: howto
description: Call workflows from other workflows, and split large workflows into smaller components.
---

# Sub-workflows

You can call one workflow from another workflow. This allows you to build modular, microservice-like workflows. It can also help if your workflow grows large enough to encounter [memory issues](/hosting/scaling/memory-errors/). Creating sub-workflows uses the [Execute Workflow](/integrations/builtin/core-nodes/n8n-nodes-base.executeworkflow/) and [Execute Workflow Trigger](/integrations/builtin/core-nodes/n8n-nodes-base.executeworkflowtrigger/) nodes.

## Set up and use a sub-workflow

This section walks through setting up both the parent workflow and sub-workflow.

--8<-- "_snippets/flow-logic/subworkflow-usage.md"

## How data passes between workflows

--8<-- "_snippets/flow-logic/subworkflow-data-flow.md"
