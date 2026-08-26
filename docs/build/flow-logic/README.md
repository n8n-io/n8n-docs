---
title: Flow logic
description: How to represent logic in n8n workflows.
contentType: overview
nodeTitle: Flow logic
originalFilePath: flow-logic/index.md
originalUrl: 'https://docs.n8n.io/flow-logic'
url: 'https://docs.n8n.io/build/'
layout:
  description:
    visible: false
---

# Flow logic <a href="#flow-logic" id="flow-logic"></a>

n8n allows you to represent complex logic in your workflows.

## In this section <a href="#in-this-section" id="in-this-section"></a>

* [Split with conditionals](split-with-conditionals.md): route items down different branches with the IF and Switch nodes.
* [Merge data](merge-data.md): combine multiple data streams back into one.
* [Loop](loop.md): repeat an action until a condition is met, or until all items are processed.
* [Wait](wait.md): pause a workflow's execution and resume it later.
* [Understand execution order](understand-execution-order.md): learn how n8n decides which branch runs first in a multi-branch workflow.
* [Break workflows into smaller parts](break-workflows-into-smaller-parts.md): call one workflow from another to build modular, microservice-like workflows.
* [Convert to sub-workflows](convert-to-sub-workflows.md): turn part of an existing workflow into a reusable sub-workflow.
* [Handle errors gracefully](handle-errors-gracefully.md): set up an error workflow to respond to execution failures.

## Related sections <a href="#related-sections" id="related-sections"></a>

You need some understanding of [Data](../work-with-data/overview.md) in n8n, including [Data structure](../work-with-data/understand-n8ns-data-structure.md) and [Data flow within nodes](../work-with-data/understand-n8ns-data-structure.md#how-data-flows-within-nodes).

When building your logic, you'll use n8n's [Core nodes](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes), including:

* Splitting: [IF](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes/n8n-nodes-base.if) and [Switch](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes/n8n-nodes-base.switch).
* Merging: [Merge](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes/n8n-nodes-base.merge), [Compare Datasets](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes/n8n-nodes-base.comparedatasets), and [Code](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes/n8n-nodes-base.code).
* Looping: [IF](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes/n8n-nodes-base.if) and [Loop Over Items](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes/n8n-nodes-base.splitinbatches).
* Waiting: [Wait](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes/n8n-nodes-base.wait).
* Creating sub-workflows: [Execute Workflow](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes/n8n-nodes-base.executeworkflow) and [Execute Workflow Trigger](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes/n8n-nodes-base.executeworkflowtrigger).
* Error handling: [Stop And Error](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes/n8n-nodes-base.stopanderror) and [Error Trigger](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes/n8n-nodes-base.errortrigger).
