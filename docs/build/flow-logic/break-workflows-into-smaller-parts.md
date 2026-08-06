---
contentType: howto
description: >-
  Call workflows from other workflows, and split large workflows into smaller
  components.
nodeTitle: Break workflows into smaller parts
originalFilePath: flow-logic/subworkflows.md
originalUrl: 'https://docs.n8n.io/flow-logic/subworkflows'
url: 'https://docs.n8n.io/build/flow-logic/break-workflows-into-smaller-parts'
layout:
  description:
    visible: false
---

# Sub-workflows <a href="#sub-workflows" id="sub-workflows"></a>

You can call one workflow from another workflow. This allows you to build modular, microservice-like workflows. It can also help if your workflow grows large enough to encounter [memory issues](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/configure-n8n/scaling/fix-memory-issues). Creating sub-workflows uses the [Execute Workflow](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes/n8n-nodes-base.executeworkflow) and [Execute Sub-workflow Trigger](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes/n8n-nodes-base.executeworkflowtrigger) nodes.

Sub-wokflow executions don't count towards your plan's monthly execution or active workflow limits.

## Set up and use a sub-workflow <a href="#set-up-and-use-a-sub-workflow" id="set-up-and-use-a-sub-workflow"></a>

This section walks through setting up both the parent workflow and sub-workflow.

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/wlwT5JcWyWTecnDN6aul/" %}

## How data passes between workflows <a href="#how-data-passes-between-workflows" id="how-data-passes-between-workflows"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/edKlUxnfiRMq38CujuFv/" %}

## Sub-workflow conversion <a href="#sub-workflow-conversion" id="sub-workflow-conversion"></a>

See [sub-workflow conversion](convert-to-sub-workflows.md) for how to divide your existing workflows into sub-workflows.
