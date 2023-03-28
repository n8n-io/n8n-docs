---
title: Execute Workflow Trigger node - n8n Documentation
description: Documentation for the Execute Workflow Trigger node in n8n, a workflow automation platform. Includes guidance on usage, and links to examples.
---

# Execute Workflow Trigger

Use this node to start a workflow in response to another workflow. It should be the first node in the workflow.

n8n allows you to call workflows from other workflows. This is useful if you want to:

* Reuse a workflow: for example, you could have multiple workflows pulling and processing data from different sources, then have all those workflows call a single workflow that generates a report.
* Break large workflows into smaller components.

This node runs in response to a call from the [Execute Workflow](/integrations/builtin/core-nodes/n8n-nodes-base.executeworkflow/) node.

