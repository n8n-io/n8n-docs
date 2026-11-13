---
title: Stop And Error
description: >-
  Documentation for the Stop And Error node in n8n, a workflow automation
  platform. Includes guidance on usage, and links to examples.
contentType:
  - integration
  - reference
priority: high
nodeTitle: Stop And Error
originalFilePath: integrations/builtin/core-nodes/n8n-nodes-base.stopanderror.md
originalUrl: >-
  https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.stopanderror
url: >-
  https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.stopanderror
layout:
  description:
    visible: false
---

# Stop And Error <a href="#stop-and-error" id="stop-and-error"></a>

Use the Stop And Error node to display custom error messages, cause executions to fail under certain conditions, and send custom error information to error workflows.

## Operations <a href="#operations" id="operations"></a>

* Error Message
* Error Object

## Node parameters <a href="#node-parameters" id="node-parameters"></a>

Both operations include one node parameter, the **Error Type**. Use this parameter to select the type of error to throw. Choose between the two operations: **Error Message** and **Error Object**.

The other parameters depend on which operation you select.

### Error Message parameters <a href="#error-message-parameters" id="error-message-parameters"></a>

The Error Message Error Type adds one parameter, the **Error Message** field. Enter the message you'd like to throw.

### Error Object parameters <a href="#error-object-parameters" id="error-object-parameters"></a>

The Error Object Error Type adds one parameter, the **Error Object**. Enter a JSON object that contains the error properties you'd like to throw.

## Templates and examples <a href="#templates-and-examples" id="templates-and-examples"></a>


[Browse Stop And Error integration templates](https://n8n.io/integrations/stop-and-error) or [search all templates](https://n8n.io/workflows/)

## Related resources <a href="#related-resources" id="related-resources"></a>

You can use the Stop And Error node with the [Error trigger](n8n-nodes-base.errortrigger.md) node.

Read more about [Error workflows](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/flow-logic/handle-errors-gracefully) in n8n workflows.

