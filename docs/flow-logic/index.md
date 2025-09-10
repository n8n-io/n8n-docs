---
title: Flow logic
description: How to represent logic in n8n workflows.
contentType: overview
---

# Flow logic

n8n allows you to represent complex logic in your workflows.

[[% import "_macros/section-toc.html" as sectionToc %]]

This section covers:

[[ sectionToc.sectionToc(page) ]]

## Related sections

You need some understanding of [Data](/data/index.md) in n8n, including [Data structure](/data/data-structure.md) and [Data flow within nodes](/data/data-flow-nodes.md).

When building your logic, you'll use n8n's [Core nodes](/integrations/builtin/core-nodes/index.md), including:

* Splitting: [IF](/integrations/builtin/core-nodes/n8n-nodes-base.if.md) and [Switch](/integrations/builtin/core-nodes/n8n-nodes-base.switch.md).
* Merging: [Merge](/integrations/builtin/core-nodes/n8n-nodes-base.merge.md), [Compare Datasets](/integrations/builtin/core-nodes/n8n-nodes-base.comparedatasets.md), and [Code](/integrations/builtin/core-nodes/n8n-nodes-base.code/index.md).
* Looping: [IF](/integrations/builtin/core-nodes/n8n-nodes-base.if.md) and [Loop Over Items](/integrations/builtin/core-nodes/n8n-nodes-base.splitinbatches.md).
* Waiting: [Wait](/integrations/builtin/core-nodes/n8n-nodes-base.wait.md).
* Creating sub-workflows: [Execute Workflow](/integrations/builtin/core-nodes/n8n-nodes-base.executeworkflow.md) and [Execute Workflow Trigger](/integrations/builtin/core-nodes/n8n-nodes-base.executeworkflowtrigger.md).
* Error handling: [Stop And Error](/integrations/builtin/core-nodes/n8n-nodes-base.stopanderror.md) and [Error Trigger](/integrations/builtin/core-nodes/n8n-nodes-base.errortrigger.md).
