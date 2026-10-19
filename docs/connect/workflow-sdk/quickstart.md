---
description: >-
  Write an n8n workflow as TypeScript code, check it with the n8n MCP
  server, and create it on your instance.
contentType: tutorial
layout:
  description:
    visible: false
---

# Create your first workflow from code

In this tutorial you write a workflow file with the [Workflow SDK](README.md), check it with `validate_workflow`, and save it to your instance with `create_workflow_from_code`.

{% hint style="info" %}
**Prompt for coding agents**

Connect to the n8n MCP server, call `get_workflow_sdk_reference`, then write a Workflow SDK file for the workflow described below. Call `validate_workflow` with the full code, fix every error the `hint` points to, then call `create_workflow_from_code` and return the workflow URL.
{% endhint %}

### What you will need

* An n8n instance with [MCP access enabled](../connect-to-n8n-mcp-server.md#enabling-mcp-access) and an MCP client connected to it. The [client connection examples](../connect-to-n8n-mcp-server/mcp-client-examples.md) cover Claude Code, Claude Desktop, and Cursor.
* No local install. The instance parses the code.

### What you will learn

* The shape of a Workflow SDK file.
* How to check code before you create a workflow.
* How to add a branch.

{% stepper %}
{% step %}

## Write the workflow file

Create `github-stars.ts` with this content. It has a manual trigger, one HTTP Request node, and one Edit Fields (Set) node:

```javascript
import { workflow, node, trigger, expr } from '@n8n/workflow-sdk';

const start = trigger({
  type: 'n8n-nodes-base.manualTrigger',
  version: 1,
  config: { name: 'Start' }
});

const fetchRepo = node({
  type: 'n8n-nodes-base.httpRequest',
  version: 4.3,
  config: {
    name: 'Fetch repository',
    parameters: { method: 'GET', url: 'https://api.github.com/repos/n8n-io/n8n' }
  }
});

const keepStars = node({
  type: 'n8n-nodes-base.set',
  version: 3.4,
  config: {
    name: 'Keep stars',
    parameters: {
      mode: 'manual',
      includeOtherFields: false,
      assignments: {
        assignments: [
          { id: 'stars', name: 'stars', value: expr('{{ $json.stargazers_count }}'), type: 'number' }
        ]
      }
    }
  }
});

export default workflow('github-stars', 'GitHub stars')
  .add(start)
  .to(fetchRepo)
  .to(keepStars);
```

Three rules to keep in mind:

* Declare every node first, then compose the workflow at the end.
* Use the node type id and the `version` the editor uses. `search_nodes` and `get_node_types` on the MCP server return them.
* Wrap expressions in `expr()`. The text inside is the same as in the editor.
{% endstep %}

{% step %}

## Check the code

Ask your MCP client to call `validate_workflow` with the full file as the `code` parameter. A valid file returns:

```json
{ "valid": true, "nodeCount": 3 }
```

If `valid` is `false`, the response has an `errors` list and often a `hint`. Fix what the hint says and run the tool again. Common causes are a missing `export default`, a wrong node `version`, or a parameter that the node doesn't have.
{% endstep %}

{% step %}

## Create the workflow

Call `create_workflow_from_code` with the same `code`. The response has the `workflowId` and a `url`. Open the URL, run the workflow once from the editor, and check that the Keep stars node outputs a `stars` field.

The tool assigns credentials it finds on the instance to nodes that need them. It skips HTTP Request nodes, so set a credential on that node by hand if the API you call needs one.
{% endstep %}

{% step %}

## Add a branch

Replace the Keep stars node with an If node that routes popular repositories one way and the rest another way. Every If condition needs `options`, `conditions`, and `combinator`:

```javascript
import { workflow, node, trigger, ifElse, expr } from '@n8n/workflow-sdk';

const isPopular = ifElse({
  version: 2.2,
  config: {
    name: 'Is popular?',
    parameters: {
      conditions: {
        options: { caseSensitive: true, leftValue: '', typeValidation: 'strict' },
        conditions: [
          { leftValue: expr('{{ $json.stargazers_count }}'), operator: { type: 'number', operation: 'gt' }, rightValue: 100000 }
        ],
        combinator: 'and'
      }
    }
  }
});

export default workflow('github-stars', 'GitHub stars')
  .add(start)
  .to(fetchRepo)
  .to(isPopular
    .onTrue(markPopular)
    .onFalse(markNotPopular));
```

`markPopular` and `markNotPopular` are two Edit Fields nodes declared like Keep stars. Each branch is a complete path: chain more nodes inside `.onTrue()` or `.onFalse()` with `.to()`.

To change the workflow you created, call `update_workflow` with the workflow id and the new code instead of creating a second workflow.
{% endstep %}
{% endstepper %}

## Next steps

* Read the full reference your instance serves: call `get_workflow_sdk_reference` on the [n8n MCP server](../connect-to-n8n-mcp-server/mcp-server-tools-reference.md#workflow-builder). The `patterns` section has complete examples for loops, parallel branches, multiple triggers, and AI agents.
* Call `get_workflow_best_practices` with `technique: "list"` to see the use cases with a guide, such as chatbots, scheduling, and data extraction.
* Set up your coding agent with [Build with AI](build-with-ai.md).
