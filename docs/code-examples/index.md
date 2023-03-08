---
description: Use code in your n8n workflows, and view other developer resources.
---

# Code in n8n

n8n is a low-code tool. This means you can do a lot without code, then add code when needed.

## JavaScript in your workflows

There are two places in n8n where you can use code.

<div class="grid-cards-vertical cards" markdown>

- __Expressions__

	Use expressions to transform data in your nodes. You can use JavaScript in expressions, as well as n8n's built-in methods and variables.

	[:octicons-arrow-right-24: Expressions](/code-examples/expressions/)

- __Code node__

	The Code node allows you to add JavaScript to your workflow.

	[:octicons-arrow-right-24: Expressions](/code-examples/code-node/)

</div>

This section of the documentation covers:

* Built-in [methods and variables](/code-examples/methods-variables-reference/).
* Expressions examples:
    * [Introduction to expressions in n8n](/code-examples/expressions/).
    * Supported libraries: [Luxon](/code-examples/expressions/luxon/) (for data and time) and [JMESPath](/code-examples/expressions/jmespath/) (for working with JSON).
* JavaScript examples:
    * [Introduction to JavaScript in n8n](/code-examples/javascript-functions/).
	* Supported libraries: [Luxon](/code-examples/javascript-functions/luxon/) (for data and time) and [JMESPath](/code-examples/javascript-functions/jmespath/) (for working with JSON).
    * [Checking incoming data](/code-examples/javascript-functions/check-incoming-data/).
    * [Get the number of items returned by the last node](/code-examples/javascript-functions/number-items-last-node/).
	* Working with binary data: [Get the binary data buffer](/code-examples/javascript-functions/get-binary-data-buffer/) and [Split binary file data into individual items](/code-examples/javascript-functions/split-binary-file-data/).
* Using the [Code node](code-examples/code-node/).


## Other developer resources

<div class="grid-cards-vertical cards" markdown>

- __The n8n API__

	n8n provides an API, allowing you to programmatically perform many of the same tasks as you can in the GUI. There's an [n8n API node](/integrations/builtin/core-nodes/n8n-nodes-base.n8n/) to access the API in your workflows.

	[:octicons-arrow-right-24: API](/api/)

- __Self-host__

	You can self-host n8n. This keeps your data on your own infrastructure.

	[:octicons-arrow-right-24: Hosting](/hosting/)

</div>
