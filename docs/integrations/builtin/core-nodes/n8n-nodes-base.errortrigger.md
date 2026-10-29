---
title: Error Trigger node documentation
description: >-
  Learn how to use the Error Trigger node in n8n. Follow technical documentation
  to integrate Error Trigger node into your workflows.
contentType:
  - integration
  - reference
priority: medium
nodeTitle: Error Trigger node documentation
originalFilePath: integrations/builtin/core-nodes/n8n-nodes-base.errortrigger.md
originalUrl: >-
  https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.errortrigger
url: >-
  https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.errortrigger
layout:
  description:
    visible: false
---

# Error Trigger node <a href="#error-trigger-node" id="error-trigger-node"></a>

You can use the Error Trigger node to create error workflows. When another linked workflow fails, this node gets details about the failed workflow and the errors, and runs the error workflow.

## Usage <a href="#usage" id="usage"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/odStQfuU7M0KPowwye9k/" %}


Note the following:

* If a workflow uses the Error Trigger node, you don't have to publish the workflow.
* If a workflow contains the Error Trigger node, by default, the workflow uses itself as the error workflow.
* You can't test error workflows when running workflows manually. The Error Trigger only runs when an automatic workflow errors.

## Templates and examples <a href="#templates-and-examples" id="templates-and-examples"></a>


[Browse Error Trigger node documentation integration templates](https://n8n.io/integrations/error-trigger) or [search all templates](https://n8n.io/workflows/)

## Related resources <a href="#related-resources" id="related-resources"></a>

You can use the [Stop And Error](n8n-nodes-base.stopanderror.md) node to send custom messages to the Error Trigger.

Read more about [Error workflows](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/flow-logic/handle-errors-gracefully) in n8n workflows. 

## Error data <a href="#error-data" id="error-data"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/rAiMowL1bA7C4GcH8FyS/" %}

