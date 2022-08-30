# Overview

There are two places in n8n where you need to use code:

* In [expressions](/code-examples/expressions/), for example programmatically setting the value of a field based on incoming data.
* In the [function node](/integrations/builtin/core-nodes/n8n-nodes-base.function/), when you need to add JavaScript to your workflow.

This section covers:

* Built-in [methods](/code-examples/methods/) and [variables](/code-examples/variables/).
* Expressions examples:
    * [Introduction to expressions in n8n](/code-examples/expressions/).
    * Supported libraries: [Luxon](/code-examples/expressions/luxon/) (for data and time) and [JMESPath](/code-examples/expressions/jmespath/) (for working with JSON).
* JavaScript examples:
    * [Introduction to JavaScript in n8n](/code-examples/javascript-functions/).
	* Supported libraries: [Luxon](/code-examples/javascript-functions/luxon/) (for data and time) and [JMESPath](/code-examples/javascript-functions/jmespath/) (for working with JSON).
    * [Checking incoming data](/code-examples/javascript-functions/check-incoming-data/).
    * [Get the number of items returned by the last node](/code-examples/javascript-functions/number-items-last-node/).
	* Working with binary data: [Get the binary data buffer](/code-examples/javascript-functions/get-binary-data-buffer/) and [Split binary file data into individual items](/code-examples/javascript-functions/split-binary-file-data/).
