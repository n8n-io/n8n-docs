# Overview

There are two places in n8n where you need to use code:

* In [expressions](/code-examples/expressions/), for example programmatically setting the value of a field based on incoming data.
* In the [function node](/integrations/builtin/core-nodes/n8n-nodes-base.function/), when you need to add JavaScript to your workflow.

This section covers:

* Expressions:
    * [Introduction to expressions in n8n](/code-examples/expressions/).
    * Built in [methods](/code-examples/expressions/methods/) and [variables](/code-examples/expressions/variables/).
    * Supported libraries: [Luxon](/code-examples/expressions/luxon/) (for data and time) and [JMESPath](/code-examples/expressions/jmespath/) (for working with JSON).
* JavaScript:
    * [Introduction to JavaScript in n8n](/code-examples/javascript-functions/).
    * Built in [methods](/code-examples/javascript-functions/methods/) and [variables](/code-examples/javascript-functions/variables/).
    * [Checking incoming data](/code-examples/javascript-functions/check-incoming-data/).
    * [Get the number of items returned by the last node](/code-examples/javascript-functions/number-items-last-node/).