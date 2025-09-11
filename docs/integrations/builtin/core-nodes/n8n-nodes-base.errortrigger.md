---
title: Error Trigger node documentation
description: Learn how to use the Error Trigger node in n8n. Follow technical documentation to integrate Error Trigger node into your workflows.
contentType: [integration, reference]
priority: medium
---

# Error Trigger node

You can use the Error Trigger node to create error workflows. When another linked workflow fails, this node gets details about the failed workflow and the errors, and runs the error workflow.

## Usage

--8<-- "_snippets/flow-logic/create-set-error-workflow.md"


Note the following:

* If a workflow uses the Error Trigger node, you don't have to activate the workflow.
* If a workflow contains the Error Trigger node, by default, the workflow uses itself as the error workflow.
* You can't test error workflows when running workflows manually. The Error Trigger only runs when an automatic workflow errors.

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'error-trigger') ]]

## Related resources

You can use the [Stop And Error](/integrations/builtin/core-nodes/n8n-nodes-base.stopanderror.md) node to send custom messages to the Error Trigger.

Read more about [Error workflows](/flow-logic/error-handling.md) in n8n workflows. 

## Error data

--8<-- "_snippets/integrations/builtin/core-nodes/error-trigger/error-data.md"

