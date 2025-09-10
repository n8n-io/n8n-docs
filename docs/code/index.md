---
title: Code in n8n Documentation and Guides
description: Access documentation and guides on using code and expressions in n8n and other developer resources.
contentType: overview
hide:
  - feedback
  - kapaButton
---

# Code in n8n

n8n is a low-code tool. This means you can do a lot without code, then add code when needed.

## Code in your workflows

There are two places in your workflows where you can use code:

<div class="grid-cards-vertical cards" markdown>

- __Expressions__

	Use [expressions](/glossary.md#expression-n8n) to transform [data](/data/index.md) in your nodes. You can use JavaScript in expressions, as well as n8n's [Built-in methods and variables](/code/builtin/overview.md) and [Data transformation functions](/code/builtin/data-transformation-functions/index.md).

	[:octicons-arrow-right-24: Expressions](/code/expressions.md)

- __Code node__

	Use the Code node to add JavaScript or Python to your workflow.

	[:octicons-arrow-right-24: Code node](/code/code-node.md)

</div>


## Other technical resources

These are features that are relevant to technical users.

### Technical nodes

n8n provides core nodes, which simplify adding key functionality such as API requests, webhooks, scheduling, and file handling.

<div class="grid-cards-vertical cards" markdown>

- __Write a backend__

	The [HTTP Request](/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/index.md), [Webhook](/integrations/builtin/core-nodes/n8n-nodes-base.webhook/index.md), and [Code](/code/code-node.md) nodes help you make API calls, respond to webhooks, and write any JavaScript in your workflow.

	Use this do things like [Create an API endpoint](https://n8n.io/workflows/1750-creating-an-api-endpoint/).

	[:octicons-arrow-right-24: Core nodes](/integrations/builtin/core-nodes/index.md)

- __Represent complex logic__

	You can build complex flows, using nodes like [If](/integrations/builtin/core-nodes/n8n-nodes-base.if.md), [Switch](/integrations/builtin/core-nodes/n8n-nodes-base.switch.md), and [Merge](/integrations/builtin/core-nodes/n8n-nodes-base.merge.md) nodes. 

	[:octicons-arrow-right-24: Flow logic](/flow-logic/index.md)

</div>

### Other developer resources

<div class="grid-cards-vertical cards" markdown>

- __The n8n API__

	n8n provides an API, where you can programmatically perform many of the same tasks as you can in the GUI. There's an [n8n API node](/integrations/builtin/core-nodes/n8n-nodes-base.n8n.md) to access the API in your workflows.

	[:octicons-arrow-right-24: API](/api/index.md)

- __Self-host__

	You can self-host n8n. This keeps your data on your own infrastructure.

	[:octicons-arrow-right-24: Hosting](/hosting/index.md)

- __Build your own nodes__

	You can build custom nodes, install them on your n8n instance, and publish them to [npm](https://www.npmjs.com/).

	[:octicons-arrow-right-24: Creating nodes](/integrations/creating-nodes/overview.md)

</div>
