---
title: Code in n8n Documentation and Guides
description: >-
  Access documentation and guides on using code and expressions in n8n and other
  developer resources.
contentType: overview
hide:
  - feedback
  - kapaButton
nodeTitle: Code in n8n
originalFilePath: code/index.md
originalUrl: 'https://docs.n8n.io/code'
url: 'https://docs.n8n.io/build/'
layout:
  description:
    visible: false
---

# Code in n8n <a href="#code-in-n8n" id="code-in-n8n"></a>

n8n is a low-code tool. This means you can do a lot without code, then add code when needed.

## In this section

* [Using the Code node](using-the-code-node.md): add JavaScript or Python code to your workflow.
* [Get coding help from AI](get-coding-help-from-ai.md): use GPT to generate code in the Code node.
* [Use built-in shortcuts](use-built-in-shortcuts.md): reference for n8n's built-in methods and variables for use in expressions and code.
* [Define custom variables](define-custom-variables.md): store and reuse values across your workflows.
* [Cookbook](cookbook/README.md): examples and recipes for common coding tasks.

## Code in your workflows <a href="#code-in-your-workflows" id="code-in-your-workflows"></a>

There are two places in your workflows where you can use code:

<div class="grid-cards-vertical cards" markdown>

- __Expressions__

	Use expressions[^1] to transform [data](../work-with-data/README.md) in your nodes. You can use JavaScript in expressions, as well as n8n's [Built-in methods and variables](use-built-in-shortcuts.md).

	[→ Expressions](../work-with-data/expressions-versus-data-nodes.md)

- __Code node__

	Use the Code node to add JavaScript or Python to your workflow.

	[→ Code node](using-the-code-node.md)

</div>


## Other technical resources <a href="#other-technical-resources" id="other-technical-resources"></a>

These are features that are relevant to technical users.

### Technical nodes <a href="#technical-nodes" id="technical-nodes"></a>

n8n provides core nodes, which simplify adding key functionality such as API requests, webhooks, scheduling, and file handling.

<div class="grid-cards-vertical cards" markdown>

- __Write a backend__

	The [HTTP Request](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes/n8n-nodes-base.httprequest), [Webhook](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes/n8n-nodes-base.webhook), and [Code](using-the-code-node.md) nodes help you make API calls, respond to webhooks, and write any JavaScript in your workflow.

	Use this do things like [Create an API endpoint](https://n8n.io/workflows/1750-creating-an-api-endpoint/).

	[→ Core nodes](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes)

- __Represent complex logic__

	You can build complex flows, using nodes like [If](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes/n8n-nodes-base.if), [Switch](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes/n8n-nodes-base.switch), and [Merge](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes/n8n-nodes-base.merge) nodes. 

	[→ Flow logic](../flow-logic/README.md)

</div>

### Other developer resources <a href="#other-developer-resources" id="other-developer-resources"></a>

<div class="grid-cards-vertical cards" markdown>

- __The n8n API__

	n8n provides an API, where you can programmatically perform many of the same tasks as you can in the GUI. There's an [n8n API node](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes/n8n-nodes-base.n8n) to access the API in your workflows.

	[→ API](https://app.gitbook.com/s/r7wKI4I1BgdBCuq5Cvcx/n8n-api)

- __Self-host__

	You can self-host n8n. This keeps your data on your own infrastructure.

	[→ Hosting](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n)

- __Build your own nodes__

	You can build custom nodes, install them on your n8n instance, and publish them to [npm](https://www.npmjs.com/).

	[→ Creating nodes](https://app.gitbook.com/s/r7wKI4I1BgdBCuq5Cvcx/create-nodes/overview)

</div>

[^1]: In n8n, expressions allow you to populate node parameters dynamically by executing JavaScript code. Instead of providing a static value, you can use the n8n expression syntax to define the value using data from previous nodes, other workflows, or your n8n environment.

## Related resources

* [Build](../)
* [Understand workflows](../understand-workflows/README.md)
* [Build and manage agents](../build-and-manage-agents.md)
* [Ways of building workflows](../ways-of-building-workflows/README.md)
* [Manage workflows](../manage-workflows/README.md)
* [Flow logic](../flow-logic/README.md)
* [Work with data](../work-with-data/README.md)
* [Integrate AI](../integrate-ai/README.md)
* [Keyboard shortcuts](../keyboard-shortcuts.md)
