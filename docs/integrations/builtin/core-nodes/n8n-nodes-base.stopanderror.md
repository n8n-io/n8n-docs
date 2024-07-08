---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Stop And Error
description: Documentation for the Stop And Error node in n8n, a workflow automation platform. Includes guidance on usage, and links to examples.
contentType: integration
---

# Stop And Error

Use the Stop And Error node to display custom error messages, cause executions to fail under certain conditions, and send custom error information to error workflows.

/// note | Examples and templates
For usage examples and templates to help you get started, refer to n8n's [Stop and Error integrations](https://n8n.io/integrations/stop-and-error/){:target=_blank .external-link} page.
///

## Operations

* Error Message
* Error Object

## Node parameters

Both operations include one node parameter, the **Error Type**. Use this parameter to select the type of error to throw. Choose between the two operations: **Error Message** and **Error Object**.

The other parameters depend on which operation you select.

### Error Message parameters

The Error Message Error Type adds one parameter, the **Error Message** field. Enter the message you'd like to throw.

### Error Object parameters

The Error Object Error Type adds one parameter, the **Error Object**. Enter a JSON object that contains the error properties you'd like to throw.

## Related resources

You can use the Stop And Error node with the [Error trigger](/integrations/builtin/core-nodes/n8n-nodes-base.errortrigger/) node.

Read more about [Error workflows](/flow-logic/error-handling/) in n8n workflows.

