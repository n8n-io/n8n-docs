---
title: Start
description: Documentation for the Start node in n8n, a workflow automation platform. Includes guidance on usage, and links to examples.
contentType: integration
---
<!-- vale off -->
# Start

/// warning | Deprecated
The Start node was removed from n8n in 0.199.0. It's still available in legacy workflows.
///
The start node is the first node in a workflow. It exists by default when you create a new workflow and looks like the following image.

![A new workflow with the Start node](/_images/integrations/builtin/core-nodes/start/workflow.png)

In case there is no trigger node in the workflow, the workflow always starts from the Start node. The Start node can't be deleted. Even if a workflow contains a trigger node, there would still be a Start node.

/// note | Examples and templates
For usage examples and templates to help you get started, refer to n8n's [Start integrations](https://n8n.io/integrations/start/){:target=_blank .external-link} page.
///

## FAQs

### When is it necessary to use the Start node?

When using the *Execute Workflow* node in workflow A to execute workflow B, the *Start* node will act as the trigger node in workflow B. The second node in workflow B needs to be connected to the Start node for the workflow to execute correctly.

<!-- vale on -->



