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

## Related sections <a href="#related-sections" id="related-sections"></a>

You need some understanding of [Data](../work-with-data/overview.md) in n8n, including [Data structure](../work-with-data/understand-n8ns-data-structure.md) and [Data flow within nodes](../work-with-data/understand-n8ns-data-structure.md#how-data-flows-within-nodes).

When building your logic, you'll use n8n's [Core nodes](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes), including:

* Splitting: [IF](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes/n8n-nodes-base.if) and [Switch](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes/n8n-nodes-base.switch).
* Merging: [Merge](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes/n8n-nodes-base.merge), [Compare Datasets](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes/n8n-nodes-base.comparedatasets), and [Code](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes/n8n-nodes-base.code).
* Looping: [IF](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes/n8n-nodes-base.if) and [Loop Over Items](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes/n8n-nodes-base.splitinbatches).
* Waiting: [Wait](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes/n8n-nodes-base.wait).
* Creating sub-workflows: [Execute Workflow](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes/n8n-nodes-base.executeworkflow) and [Execute Workflow Trigger](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes/n8n-nodes-base.executeworkflowtrigger).
* Error handling: [Stop And Error](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes/n8n-nodes-base.stopanderror) and [Error Trigger](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes/n8n-nodes-base.errortrigger).
