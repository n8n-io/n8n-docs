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

You need some understanding of [Data](/data/) in n8n, including [Data structure](/data/data-structure/) and [Data flow within nodes](/data/data-flow-nodes/).

When building your logic, you'll use n8n's [Core nodes](/integrations/builtin/core-nodes/), including:

* Splitting: [IF](/integrations/builtin/core-nodes/n8n-nodes-base.if/) and [Switch](/integrations/builtin/core-nodes/n8n-nodes-base.switch/).
* Merging: [Merge](/integrations/builtin/core-nodes/n8n-nodes-base.merge/), [Compare Datasets](/integrations/builtin/core-nodes/n8n-nodes-base.comparedatasets/), and [Code](/integrations/builtin/core-nodes/n8n-nodes-base.code/).
* Looping: [IF](/integrations/builtin/core-nodes/n8n-nodes-base.if/) and [Split In Batches](/integrations/builtin/core-nodes/n8n-nodes-base.splitinbatches/).
* Waiting: [Wait](/integrations/builtin/core-nodes/n8n-nodes-base.wait/).
* Creating sub-workflows: [Execute Workflow](/integrations/builtin/core-nodes/n8n-nodes-base.executeworkflow/) and [Execute Workflow Trigger](/integrations/builtin/core-nodes/n8n-nodes-base.executeworkflowtrigger/).
* Error handling: [Stop And Error](/integrations/builtin/core-nodes/n8n-nodes-base.stopanderror/) and [Error Trigger](/integrations/builtin/core-nodes/n8n-nodes-base.errortrigger/).
