---
description: Use code in your n8n workflows, and view other developer resources.
contentType: overview
---

# Code in n8n

n8n is a low-code tool. This means you can do a lot without code, then add code when needed.

## Code in your workflows

There are two places in your workflows where you can use code:

<div class="grid-cards-vertical cards" markdown>

- __Expressions__

	Use expressions to transform [data](/data/) in your nodes. You can use JavaScript in expressions, as well as n8n's [Built-in methods and variables](/code/builtin/) and [Data transformation functions](/code/builtin/data-transformation-functions/).

	[:octicons-arrow-right-24: Expressions](/code/expressions/)

- __Code node__

	The Code node allows you to add JavaScript or Python to your workflow.

	[:octicons-arrow-right-24: Code node](/code/code-node/)

</div>


## Other technical resources

These are features that are relevant to technical users.

### Technical nodes

n8n provides core nodes, which simplify adding key functionality such as API requests, webhooks, scheduling, and file handling.

<div class="grid-cards-vertical cards" markdown>

- __Write a backend__

	The [HTTP Request](/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/), [Webhook](/integrations/builtin/core-nodes/n8n-nodes-base.webhook/), and [Code](/code/code-node/) nodes help you make API calls, respond to webhooks, and write any JavaScript in your workflow.

	This allows you to do things like [Create an API endpoint](https://n8n.io/workflows/1750-creating-an-api-endpoint/){:target=_blank .external-link}.

	[:octicons-arrow-right-24: Core nodes](/integrations/builtin/core-nodes/)

- __Represent complex logic__

	You can build complex flows, using nodes like [If](/integrations/builtin/core-nodes/n8n-nodes-base.if/), [Switch](/integrations/builtin/core-nodes/n8n-nodes-base.switch/), and [Merge](/integrations/builtin/core-nodes/n8n-nodes-base.merge/) nodes. 

	[:octicons-arrow-right-24: Flow logic](/flow-logic/)

</div>

### Other developer resources

<div class="grid-cards-vertical cards" markdown>

- __The n8n API__

	n8n provides an API, allowing you to programmatically perform many of the same tasks as you can in the GUI. There's an [n8n API node](/integrations/builtin/core-nodes/n8n-nodes-base.n8n/) to access the API in your workflows.

	[:octicons-arrow-right-24: API](/api/)

- __Self-host__

	You can self-host n8n. This keeps your data on your own infrastructure.

	[:octicons-arrow-right-24: Hosting](/hosting/)

- __Build your own nodes__

	You can build custom nodes, install them on your n8n instance, and publish them to [npm](https://www.npmjs.com/){:target=_blank .external-link}.

	[:octicons-arrow-right-24: Creating nodes](/integrations/creating-nodes/)

</div>
