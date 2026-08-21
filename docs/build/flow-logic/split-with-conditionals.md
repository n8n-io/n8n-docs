---
description: Split workflows into multiple paths using If and Switch
contentType: howto
nodeTitle: Split with conditionals
originalFilePath: flow-logic/splitting.md
originalUrl: 'https://docs.n8n.io/flow-logic/splitting'
url: 'https://docs.n8n.io/build/flow-logic/split-with-conditionals'
layout:
  description:
    visible: false
---

# Splitting workflows with conditional nodes <a href="#splitting-workflows-with-conditional-nodes" id="splitting-workflows-with-conditional-nodes"></a>

Splitting uses the [IF](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes/n8n-nodes-base.if) or [Switch](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes/n8n-nodes-base.switch) nodes. It turns a single-branch workflow into a multi-branch workflow. This is a key piece of representing complex logic in n8n.

Compare these workflows:

![Diagram comparing a linear bug-report workflow with one that branches by urgency and support plan](../.gitbook/assets/single-multi-branch-workflow.png)

The first workflow is linear: a user submits a bug and the workflow emails support. The second workflow starts the same way but splits depending on whether the user marked the issue urgent, then splits again by the user's support plan.

This is the power of splitting and conditional nodes in n8n.

Refer to the [IF](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes/n8n-nodes-base.if) or [Switch](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes/n8n-nodes-base.switch) documentation for usage details.
