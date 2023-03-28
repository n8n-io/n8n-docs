---
title: Error Trigger node - n8n Documentation
description: Documentation for the Error Trigger node in n8n, a workflow automation platform. Includes guidance on usage, and links to examples.
---

# Error Trigger

You can use the Error Trigger node to create error workflows. When another linked workflow fails, this node gets details about the failed workflow and the errors, and runs the error workflow.

## Usage

--8<-- "_snippets/flow-logic/create-set-error-workflow.md"


Note the following:

* If a workflow uses the Error Trigger node, you don't have to activate the workflow.
* If a workflow contains the Error Trigger node, by default, the workflow uses itself as the error workflow.
* You can't test error workflows when running workflows manually. The Error Trigger only runs when an automatic workflow errors.

## Related resources

You can use the [Stop And Error](/integrations/builtin/core-nodes/n8n-nodes-base.stopanderror/) node to send custom messages to the Error Trigger.

Read more about [Error workflows](/flow-logic/error-handling/error-workflows/) in n8n workflows.

