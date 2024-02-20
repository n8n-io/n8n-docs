---
title: Activation trigger
description: Documentation for the Activation trigger node in n8n, a workflow automation platform. Includes guidance on usage, and links to examples.
contentType: integration
---

# Activation trigger

The Activation trigger node gets triggered when an event gets fired by n8n or a workflow.

/// warning
The Activation trigger node has been deprecated. It has been replaced by two new nodes - the [n8n trigger](/integrations/builtin/core-nodes/n8n-nodes-base.n8ntrigger/) and the [Workflow trigger](/integrations/builtin/core-nodes/n8n-nodes-base.workflowtrigger/) node. For more details, check out the entry in the [breaking changes](https://github.com/n8n-io/n8n/blob/master/packages/cli/BREAKING-CHANGES.md#01170) page.
///

/// note | Examples and templates
For usage examples and templates to help you get started, refer to n8n's [Activation trigger integrations](https://n8n.io/integrations/activation-trigger/){:target=_blank .external-link} page.
///

/// note | Keep in mind
If you want to use the Activation trigger node for a workflow, add the node to the workflow. You don't have to create a separate workflow.
///

The Activation trigger node gets triggered for the workflow that it gets added to. The Activation trigger node can be used to trigger a workflow to notify the state of the workflow.

## Node Reference

- Events
    - ***Activation:*** Run when the workflow gets activated
    - ***Start:*** Run when n8n starts or restarts
    - ***Update:*** Run when the workflow gets saved while it's active


