

# code/ai-code.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: AI coding
description: Use GPT to generate code in the Code node.
contentType: explanation
---

# AI coding with GPT

Not available on self-hosted.  

Python isn't supported.
///

## Use AI in the Code node

--8<-- "_snippets/code/ai-how-to.md"

## Usage limits

During the trial phase there are no usage limits. If n8n makes the feature permanent, there may be usage limits as part of your pricing tier.

## Feature limits

The ChatGPT implementation in n8n has the following limitations:

* The AI writes code that manipulates data from the n8n workflow. You can't ask it to pull in data from other sources.
* The AI doesn't know your data, just the schema, so you need to tell it things like how to find the data you want to extract, or how to check for null.
* Nodes before the Code node must execute and deliver data to the Code node before you run your AI query.
* Doesn't work with large incoming data schemas.
* May have issues if there are a lot of nodes before the code node.

## Writing good prompts

<!-- vale off -->

Writing good prompts increases the chance of getting useful code back.

Some general tips:

* Provide examples: if possible, give a sample expected output. This helps the AI to better understand the transformation or logic you’re aiming for.
* Describe the processing steps: if there are specific processing steps or logic that should apply to the data, list them in sequence. For example: "First, filter out all users under 18. Then, sort the remaining users by their last name."
* Avoid ambiguities: while the AI understands various instructions, being clear and direct ensures you get the most accurate code. Instead of saying "Get the older users," you might say "Filter users who are 60 years and above."
* Be clear about what you expect as the output. Do you want the data transformed, filtered, aggregated, or sorted? Provide as much detail as possible.

And some n8n-specific guidance:

* Think about the input data: make sure ChatGPT knows which pieces of the data you want to access, and what the incoming data represents. You may need to tell ChatGPT about the availability of n8n's built-in methods and variables.
* Declare interactions between nodes: if your logic involves data from multiple nodes, specify how they should interact. "Merge the output of 'Node A' with 'Node B' based on the 'userID' property". if you prefer data to come from certain nodes or to ignore others, be clear: "Only consider data from the 'Purchases' node and ignore the 'Refunds' node."
* Ensure the output is compatible with n8n. Refer to [Data structure](/data/data-structure.md) for more information on the data structure n8n requires.

### Example prompts

These examples show a range of possible prompts and tasks.

#### Example 1: Find a piece of data inside a second dataset

To try the example yourself, [download the example workflow](/_workflows/ai-code/find-a-piece-of-data.json) and import it into n8n.

In the third Code node, enter this prompt:

> The slack data contains only one item. The input data represents all Notion users. Sometimes the person property that holds the email can be null. I want to find the notionId of the Slack user and return it.

Take a look at the code the AI generates.

This is the JavaScript you need:

```js
const slackUser = $("Mock Slack").all()[0];
const notionUsers = $input.all();
const slackUserEmail = slackUser.json.email;

const notionUser = notionUsers.find(
  (user) => user.json.person && user.json.person.email === slackUserEmail
);

return notionUser ? [{ json: { notionId: notionUser.json.id } }] : [];
```

#### Example 2: Data transformation

To try the example yourself, [download the example workflow](/_workflows/ai-code/data-transformation.json) and import it into n8n.

In the **Join items** Code node, enter this prompt:

> Return a single line of text that has all usernames listed with a comma. Each username should be enquoted with a double quotation mark.

Take a look at the code the AI generates.

This is the JavaScript you need:

```js
const items = $input.all();
const usernames = items.map((item) => `"${item.json.username}"`);
const result = usernames.join(", ");
return [{ json: { usernames: result } }];
```

#### Example 3: Summarize data and create a Slack message

To try the example yourself, [download the example workflow](/_workflows/ai-code/summarize-data.json) and import it into n8n.

In the **Summarize** Code node, enter this prompt:

> Create a markdown text for Slack that counts how many ideas, features and bugs have been submitted. The type of submission is saved in the property_type field. A feature has the property "Feature", a bug has the property "Bug" and an idea has the property "Bug". Also, list the five top submissions by vote in that message. Use "<url|text>" as markdown for links.

Take a look at the code the AI generates.

This is the JavaScript you need:

```js
const submissions = $input.all();

// Count the number of ideas, features, and bugs
let ideaCount = 0;
let featureCount = 0;
let bugCount = 0;

submissions.forEach((submission) => {
  switch (submission.json.property_type[0]) {
    case "Idea":
      ideaCount++;
      break;
    case "Feature":
      featureCount++;
      break;
    case "Bug":
      bugCount++;
      break;
  }
});

// Sort submissions by votes and take the top 5
const topSubmissions = submissions
  .sort((a, b) => b.json.property_votes - a.json.property_votes)
  .slice(0, 5);

let topSubmissionText = "";
topSubmissions.forEach((submission) => {
  topSubmissionText += `<${submission.json.url}|${submission.json.name}> with ${submission.json.property_votes} votes\n`;
});

// Construct the Slack message
const slackMessage = `*Summary of Submissions*\n
Ideas: ${ideaCount}\n
Features: ${featureCount}\n
Bugs: ${bugCount}\n
Top 5 Submissions:\n
${topSubmissionText}`;

return [{ json: { slackMessage } }];
```

<!-- vale on -->

### Reference incoming node data explicitly

If your incoming data contains nested fields, using dot notation to reference them can help the AI understand what data you want.

!["Screenshot of an n8n code node, highlighting how to reference data with dot notation in an AI query"](/_images/code/ai-code/reference-data-dot-notation.png)

To try the example yourself, [download the example workflow](/_workflows/ai-code/reference-incoming-data-explicitly.json) and import it into n8n.

In the second Code node, enter this prompt:

> The data in "Mock data" represents a list of people. For each person, return a new item containing personal_info.first_name and work_info.job_title.

This is the JavaScript you need:

```js
const items = $input.all();
const newItems = items.map((item) => {
  const firstName = item.json.personal_info.first_name;
  const jobTitle = item.json.work_info.job_title;
  return {
    json: {
      firstName,
      jobTitle,
    },
  };
});
return newItems;
```

### Related resources

Pluralsight offer a short guide on [How to use ChatGPT to write code](https://www.pluralsight.com/blog/software-development/how-use-chatgpt-programming-coding){:target=_blank .external-link}, which includes example prompts.



## Fixing the code

The AI-generated code may work without any changes, but you may have to edit it. You need to be aware of n8n's [Data structure](/data/data-structure.md). You may also find n8n's built-in methods and variables useful.


# code/builtin/convenience.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
description: n8n provides these methods to make it easier to perform common tasks in expressions.
contentType: reference
hide:
  - toc
---

# Convenience methods

n8n provides these methods to make it easier to perform common tasks in [expressions](/glossary.md#expression-n8n).

/// note | Python support
You can use Python in the Code node. It isn't available in expressions.
///

=== "JavaScript"
	| Method | Description | Available in Code node? |
	| ------ | ----------- | :---------------------: |
	| `$evaluateExpression(expression: string, itemIndex?: number)` | Evaluates a string as an expression. If you don't provide `itemIndex`, n8n uses the data from item 0 in the Code node. | :white_check_mark: |
	| `$ifEmpty(value, defaultValue)` | The `$ifEmpty()` function takes two parameters, tests the first to check if it's empty, then returns either the parameter (if not empty) or the second parameter (if the first is empty). The first parameter is empty if it's:<ul><li>`undefined`</li><li>`null`</li><li>An empty string `''`</li><li>An array where `value.length` returns `false`</li><li>An object where `Object.keys(value).length` returns `false`</li></ul> | :white_check_mark: |
	| `$if()` | The `$if()` function takes three parameters: a condition, the value to return if true, and the value to return if false. | :x: | 
	| `$max()` | Returns the highest of the provided numbers. | :x: |
	| `$min()` | Returns the lowest of the provided numbers. | :x: |
=== "Python"
	| Method | Description |
	| ------ | ----------- | 
	| `_evaluateExpression(expression: string, itemIndex?: number)` | Evaluates a string as an expression. If you don't provide `itemIndex`, n8n uses the data from item 0 in the Code node. |
	| `_ifEmpty(value, defaultValue)` | The `_ifEmpty()` function takes two parameters, tests the first to check if it's empty, then returns either the parameter (if not empty) or the second parameter (if the first is empty). The first parameter is empty if it's:<ul><li>`undefined`</li><li>`null`</li><li>An empty string `''`</li><li>An array where `value.length` returns `false`</li><li>An object where `Object.keys(value).length` returns `false`</li></ul> | :white_check_mark: |


# code/builtin/current-node-input.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
description: Methods for working with the input of the current node.
contentType: reference
hide:
  - toc
---

# Current node input

Methods for working with the input of the current node. Some methods and variables aren't available in the Code node.

/// note | Python support
You can use Python in the Code node. It isn't available in expressions.
///
=== "JavaScript"
	| Method | Description | Available in Code node? |
	| ------ | ----------- | :-------------------------: |
	| `$binary` | Shorthand for `$input.item.binary`. Incoming binary data from a node | :x: |
	| `$input.item` | The input item of the current node that's being processed. Refer to [Item linking](/data/data-mapping/data-item-linking/index.md) for more information on paired items and item linking. | :white_check_mark: |
	| `$input.all()` | All input items in current node. | :white_check_mark: |
	| `$input.first()` | First input item in current node. | :white_check_mark: |
	| `$input.last()` | Last input item in current node. | :white_check_mark: |
	| `$input.params` | Object containing the query settings of the previous node. This includes data such as the operation it ran, result limits, and so on.  | :white_check_mark: |
	| `$json` | Shorthand for `$input.item.json`. Incoming JSON data from a node. Refer to [Data structure](/data/data-structure.md) for information on item structure. | :white_check_mark: (when running once for each item) |
	| `$input.context.noItemsLeft` | Boolean. Only available when working with the Loop Over Items node. Provides information about what's happening in the node. Use this to determine whether the node is still processing items. | :white_check_mark: |
=== "Python"
	| Method | Description | 
	| ------ | ----------- | 
	| `_input.item` | The input item of the current node that's being processed. Refer to [Item linking](/data/data-mapping/data-item-linking/index.md) for more information on paired items and item linking. | 
	| `_input.all()` | All input items in current node. | 
	| `_input.first()` | First input item in current node. | 
	| `_input.last()` | Last input item in current node. | 
	| `_input.params` | Object containing the query settings of the previous node. This includes data such as the operation it ran, result limits, and so on.  | 
	| `_json` | Shorthand for `_input.item.json`. Incoming JSON data from a node. Refer to [Data structure](/data/data-structure.md) for information on item structure. Available when you set **Mode** to **Run Once for Each Item**. | 
	| `_input.context.noItemsLeft` | Boolean. Only available when working with the Loop Over Items node. Provides information about what's happening in the node. Use this to determine whether the node is still processing items. | 


# code/builtin/data-transformation-functions/arrays.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Data transformation functions for arrays
description: A reference document listing built-in convenience functions to support data transformation in expressions for arrays.
contentType: reference
---

# Arrays

A reference document listing built-in convenience functions to support data transformation in [expressions](/glossary.md#expression-n8n) for arrays.

/// note | JavaScript in expressions
You can use any JavaScript in expressions. Refer to [Expressions](/code/expressions.md) for more information.
///
[[% import "_macros/data-functions.html" as dataFunctions %]]

[[% for func in df_array %]]
[[ dataFunctions.dataFunctions("array", func.funcName, func.returns, func.description, func.args, func.examples ) ]]
[[% endfor %]]


# code/builtin/data-transformation-functions/booleans.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Data transformation functions for booleans
description: A reference document listing built-in convenience functions to support data transformation in expressions for booleans.
contentType: reference
---

# Booleans

A reference document listing built-in convenience functions to support data transformation in [expressions](/glossary.md#expression-n8n) for arrays.

/// note | JavaScript in expressions
You can use any JavaScript in expressions. Refer to [Expressions](/code/expressions.md) for more information.
///
[[% import "_macros/data-functions.html" as dataFunctions %]]

[[% for func in df_boolean %]]
[[ dataFunctions.dataFunctions("boolean", func.funcName, func.returns, func.description, func.args, func.examples ) ]]
[[% endfor %]]


# code/builtin/data-transformation-functions/dates.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Data transformation functions for dates
description: A reference document listing built-in convenience functions to support data transformation in expressions for dates.
contentType: reference
---

# Dates

A reference document listing built-in convenience functions to support data transformation in [expressions](/glossary.md#expression-n8n) for dates.

/// note | JavaScript in expressions
You can use any JavaScript in expressions. Refer to [Expressions](/code/expressions.md) for more information.
///
[[% import "_macros/data-functions.html" as dataFunctions %]]

[[% for func in df_date %]]
[[ dataFunctions.dataFunctions("date", func.funcName, func.returns, func.description, func.args, func.examples ) ]]
[[% endfor %]]


# code/builtin/data-transformation-functions/index.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Data transformation functions
description: Introduction to data transformation functions for expressions.
contentType: overview
---

# Data transformation functions

Data transformation functions are helper functions to make data transformation easier in [expressions](/glossary.md#expression-n8n).

/// note | JavaScript in expressions
You can use any JavaScript in expressions. Refer to [Expressions](/code/expressions.md) for more information.
///
For a list of available functions, refer to the page for your data type:

* [Arrays](/code/builtin/data-transformation-functions/arrays.md)
* [Dates](/code/builtin/data-transformation-functions/dates.md)
* [Numbers](/code/builtin/data-transformation-functions/numbers.md)
* [Objects](/code/builtin/data-transformation-functions/objects.md)
* [Strings](/code/builtin/data-transformation-functions/strings.md)

## Usage

Data transformation functions are available in the expressions editor.

The syntax is:

```js
{{ dataItem.function() }}
```

For example, to check if a string is an email:

```js
{{ "example@example.com".isEmail() }}

// Returns true
```


# code/builtin/data-transformation-functions/numbers.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Data transformation functions for numbers
description: A reference document listing built-in convenience functions to support data transformation in expressions for numbers.
contentType: reference
---

# Numbers

A reference document listing built-in convenience functions to support data transformation in [expressions](/glossary.md#expression-n8n) for numbers.

/// note | JavaScript in expressions
You can use any JavaScript in expressions. Refer to [Expressions](/code/expressions.md) for more information.
///
[[% import "_macros/data-functions.html" as dataFunctions %]]

[[% for func in df_number %]]
[[ dataFunctions.dataFunctions("number", func.funcName, func.returns, func.description, func.args, func.examples ) ]]
[[% endfor %]]


# code/builtin/data-transformation-functions/objects.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Data transformation functions for objects
description: A reference document listing built-in convenience functions to support data transformation in expressions for objects.
contentType: reference
---

# Objects

A reference document listing built-in convenience functions to support data transformation in expressions for objects.

/// note | JavaScript in expressions
You can use any JavaScript in expressions. Refer to [Expressions](/code/expressions.md) for more information.
///
[[% import "_macros/data-functions.html" as dataFunctions %]]

[[% for func in df_object %]]
[[ dataFunctions.dataFunctions("object", func.funcName, func.returns, func.description, func.args, func.examples ) ]]
[[% endfor %]]


# code/builtin/data-transformation-functions/strings.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Data transformation functions for strings
description: A reference document listing built-in convenience functions to support data transformation in expressions for strings.
contentType: reference
---

# Strings

A reference document listing built-in convenience functions to support data transformation in [expressions](/glossary.md#expression-n8n) for strings.

/// note | JavaScript in expressions
You can use any JavaScript in expressions. Refer to [Expressions](/code/expressions.md) for more information.
///
[[% import "_macros/data-functions.html" as dataFunctions %]]

[[% for func in df_string %]]
[[ dataFunctions.dataFunctions("string", func.funcName, func.returns, func.description, func.args, func.examples ) ]]
[[% endfor %]]


# code/builtin/date-time.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
description: Methods for working with date and time.
contentType: reference
hide:
  - toc
---

# Built-in date and time methods

Methods for working with date and time. 

/// note | Python support
You can use Python in the Code node. It isn't available in expressions.
///
=== "JavaScript"
	| Method | Description | Available in Code node? |
	| ------ | ----------- | :-------------------------: |
	| `$now` | A Luxon object containing the current timestamp. Equivalent to `DateTime.now()`. | :white_check_mark: |
	| `$today` | A Luxon object containing the current timestamp, rounded down to the day. Equivalent to `DateTime.now().set({ hour: 0, minute: 0, second: 0, millisecond: 0 })`. | :white_check_mark: |
=== "Python"
	| Method | Description | 
	| ------ | ----------- | 
	| `_now` | A Luxon object containing the current timestamp. Equivalent to `DateTime.now()`. | 
	| `_today` | A Luxon object containing the current timestamp, rounded down to the day. Equivalent to `DateTime.now().set({ hour: 0, minute: 0, second: 0, millisecond: 0 })`. | 

n8n passes dates between nodes as strings, so you need to parse them. Luxon helps you do this. Refer to [Date and time with Luxon](/code/cookbook/luxon.md) for more information.

n8n provides built-in convenience functions to support data transformation in expressions for dates. Refer to [Data transformation functions | Dates](/code/builtin/data-transformation-functions/dates.md) for more information.


# code/builtin/http-node-variables.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
description: n8n provides these methods to make it easier to perform common tasks in expressions.
contentType: reference
hide:
  - toc
---

# HTTP node variables

Variables for working with HTTP node requests and responses when using pagination.

Refer to [HTTP Request](/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/index.md) for guidance on using the HTTP node, including configuring pagination.

Refer to [HTTP Request node cookbook | Pagination](/code/cookbook/http-node/pagination.md) for example pagination configurations.

/// note | HTTP node only
These variables are for use in expressions in the HTTP node. You can't use them in other nodes.
///
--8<-- "_snippets/integrations/builtin/core-nodes/http/pagination-variables.md"


# code/builtin/jmespath.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
description: A method for working with the JMESPath library in n8n.
contentType: reference
hide:
  - toc
---

# JMESPath method

This is an n8n-provided method for working with the [JMESPath](/code/cookbook/jmespath.md) library.

/// note | Python support
You can use Python in the Code node. It isn't available in expressions.
///
=== "JavaScript"
	| Method | Description | Available in Code node? |
	| ------ | ----------- | :-------------------------: |
	| `$jmespath()` | Perform a search on a JSON object using JMESPath. | :white_check_mark: |
=== "Python"
	| Method | Description | 
	| ------ | ----------- | 
	| `_jmespath()` | Perform a search on a JSON object using JMESPath. | 


# code/builtin/langchain-methods.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
description: n8n provides these methods to make it easier to perform common tasks in the LangChain Code node.
contentType: reference
hide:
  - toc
---
# LangChain Code node methods

n8n provides these methods to make it easier to perform common tasks in the [LangChain Code node](/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.code.md).

/// note | LangChain Code node only
These variables are for use in expressions in the LangChain Code node. You can't use them in other nodes.
///

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-root-nodes/langchaincode/builtin-methods.md"


# code/builtin/n8n-metadata.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
description: Methods for working with n8n metadata.
contentType: reference
hide:
  - toc
---

# n8n metadata

Methods for working with n8n metadata.

This includes:

* Access to n8n environment variables for self-hosted n8n.
* Metadata about workflows, executions, and nodes.
* Information about instance [Variables](/code/variables.md) and [External secrets](/external-secrets.md).

/// note | Python support
You can use Python in the Code node. It isn't available in expressions.
///
=== "JavaScript"
	| Method | Description | Available in Code node? |
	| ------ | ----------- | :-------------------------: |
	| `$env` | Contains n8n instance configuration [environment variables](/hosting/configuration/environment-variables/index.md). | :white_check_mark: |
	| `$execution.customData` | Set and get custom execution data. Refer to [Custom executions data](/workflows/executions/custom-executions-data.md) for more information. | :white_check_mark: | 
	| `$execution.id` | The unique ID of the current workflow execution. | :white_check_mark: |
	| `$execution.mode` | Whether the execution was triggered automatically, or by manually running the workflow. Possible values are `test` and `production`. | :white_check_mark: |
	| `$execution.resumeUrl` | The webhook URL to call to resume a workflow waiting at a [Wait node](/integrations/builtin/core-nodes/n8n-nodes-base.wait.md). | :white_check_mark: |
	| `$getWorkflowStaticData(type)` | View an [example](/code/cookbook/builtin/get-workflow-static-data.md). Static data doesn't persist when testing workflows. The workflow must be active and called by a trigger or webhook to save static data. This gives access to the static workflow data. | :white_check_mark: |
	| `$("<node-name>").isExecuted` | Check whether a node has already executed. | :white_check_mark: |
	| `$itemIndex` | The index of an item in a list of items. | :x: |
	| `$nodeVersion` | Get the version of the current node. | :white_check_mark: |
	| `$prevNode.name` | The name of the node that the current input came from. When using the Merge node, note that `$prevNode` always uses the first input connector. | :white_check_mark: |
	| `$prevNode.outputIndex` | The index of the output connector that the current input came from. Use this when the previous node had multiple outputs (such as an If or Switch node).  When using the Merge node, note that `$prevNode` always uses the first input connector. | :white_check_mark: |
	| `$prevNode.runIndex` | The run of the previous node that generated the current input. When using the Merge node, note that `$prevNode` always uses the first input connector. | :white_check_mark: |
	| `$runIndex` | How many times n8n has executed the current node. Zero-based (the first run is 0, the second is 1, and so on). | :white_check_mark: |
	| `$secrets` | Contains information about your [External secrets](/external-secrets.md) setup. | :white_check_mark: |
	| `$vars` | Contains the [Variables](/code/variables.md) available in the active environment. | :white_check_mark: |
	| `$version` | The node version. | :x: |
	| `$workflow.active` | Whether the workflow is active (true) or not (false). | :white_check_mark: |
	| `$workflow.id` | The workflow ID. | :white_check_mark: |
	| `$workflow.name` | The workflow name. | :white_check_mark: |
=== "Python"
	| Method | Description |
	| ------ | ----------- |
	| `_env` | Contains n8n instance configuration [environment variables](/hosting/configuration/environment-variables/index.md). |
	| `_execution.customData` | Set and get custom execution data. Refer to [Custom executions data](/workflows/executions/custom-executions-data.md) for more information. | 
	| `_execution.id` | The unique ID of the current workflow execution. | 
	| `_execution.mode` | Whether the execution was triggered automatically, or by manually running the workflow. Possible values are `test` and `production`. | 
	| `_execution.resumeUrl` | The webhook URL to call to resume a workflow waiting at a [Wait node](/integrations/builtin/core-nodes/n8n-nodes-base.wait.md). |
	| `_getWorkflowStaticData(type)` | View an [example](/code/cookbook/builtin/get-workflow-static-data.md). Static data doesn't persist when testing workflows. The workflow must be active and called by a trigger or webhook to save static data. This gives access to the static workflow data. |
	| `_("<node-name>").isExecuted` | Check whether a node has already executed. |
	| `_nodeVersion` | Get the version of the current node. | :white_check_mark: |
	| `_prevNode.name` | The name of the node that the current input came from. When using the Merge node, note that `_prevNode` always uses the first input connector. | 
	| `_prevNode.outputIndex` | The index of the output connector that the current input came from. Use this when the previous node had multiple outputs (such as an If or Switch node).  When using the Merge node, note that `_prevNode` always uses the first input connector. | 
	| `_prevNode.runIndex` | The run of the previous node that generated the current input. When using the Merge node, note that `_prevNode` always uses the first input connector. |
	| `_runIndex` | How many times n8n has executed the current node. Zero-based (the first run is 0, the second is 1, and so on). |
	| `_secrets` | Contains information about your [External secrets](/external-secrets.md) setup. | 
	| `_vars` | Contains the [Variables](/code/variables.md) available in the active environment. | 
	| `_workflow.active` | Whether the workflow is active (true) or not (false). |
	| `_workflow.id` | The workflow ID. | 
	| `_workflow.name` | The workflow name. |


# code/builtin/output-other-nodes.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
description: Methods for working with the output of other nodes.
contentType: reference
hide:
  - toc
---

# Output of other nodes

Methods for working with the output of other nodes. Some methods and variables aren't available in the Code node.

/// note | Python support
You can use Python in the Code node. It isn't available in expressions.
///
=== "JavaScript"
	| Method | Description | Available in Code node? |
	| ------ | ----------- | :-------------------------: |
	| `$("<node-name>").all(branchIndex?, runIndex?)` | Returns all items from a given node. If `branchIndex` isn't given it will default to the output that connects `node-name` with the node where you use the expression or code. | :white_check_mark: |
	| `$("<node-name>").first(branchIndex?, runIndex?)` | The first item output by the given node. If `branchIndex` isn't given it will default to the output that connects `node-name` with the node where you use the expression or code. | :white_check_mark: |
	| `$("<node-name>").last(branchIndex?, runIndex?)` | The last item output by the given node. If `branchIndex` isn't given it will default to the output that connects `node-name` with the node where you use the expression or code. | :white_check_mark: |
	| `$("<node-name>").item` | The linked item. This is the item in the specified node used to produce the current item. Refer to [Item linking](/data/data-mapping/data-item-linking/index.md) for more information on item linking. | :x: |
	| `$("<node-name>").params` | Object containing the query settings of the given node. This includes data such as the operation it ran, result limits, and so on. | :white_check_mark: |
	| `$("<node-name>").context` | Boolean. Only available when working with the Loop Over Items node. Provides information about what's happening in the node. Use this to determine whether the node is still processing items. | :white_check_mark: |
	| `$("<node-name>").itemMatching(currentNodeInputIndex)` | Use instead of `$("<node-name>").item` in the Code node if you need to trace back from an input item. | :white_check_mark: |
=== "Python"
	| Method | Description | Available in Code node? |
	| ------ | ----------- | :-------------------------: |
	| `_("<node-name>").all(branchIndex?, runIndex?)` | Returns all items from a given node. If `branchIndex` isn't given it will default to the output that connects`node-name` with the node where you use the expression or code. | :white_check_mark: |
	| `_("<node-name>").first(branchIndex?, runIndex?)` | The first item output by the given node. If `branchIndex` isn't given it will default to the output that connects`node-name` with the node where you use the expression or code. | :white_check_mark: |
	| `_("<node-name>").last(branchIndex?, runIndex?)` | The last item output by the given node. If `branchIndex` isn't given it will default to the output that connects`node-name` with the node where you use the expression or code. | :white_check_mark: |
	| `_("<node-name>").item` | The linked item. This is the item in the specified node used to produce the current item. Refer to [Item linking](/data/data-mapping/data-item-linking/index.md) for more information on item linking. | :x: |
	| `_("<node-name>").params` | Object containing the query settings of the given node. This includes data such as the operation it ran, result limits, and so on. | :white_check_mark: |
	| `_("<node-name>").context` | Boolean. Only available when working with the Loop Over Items node. Provides information about what's happening in the node. Use this to determine whether the node is still processing items. | :white_check_mark: |
	| `_("<node-name>").itemMatching(currentNodeInputIndex)` | Use instead of `_("<node-name>").item` in the Code node if you need to trace back from an input item. Refer to [Retrieve linked items from earlier in the workflow](/code/cookbook/builtin/itemmatching.md) for an example. | :white_check_mark: |


# code/builtin/overview.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
description: n8n's built-in custom methods and variables.
contentType: overview
---

# Built-in methods and variables

n8n provides built-in methods and variables for working with data and accessing n8n data. This section provides a reference of available methods and variables for use in [expressions](/glossary.md#expression-n8n), with a short description. 

/// note | Availability in the expressions editor and the Code node
Some methods and variables aren't available in the Code node. These aren't in the documentation.

All data transformation functions are only available in the expressions editor.
///		


The [Cookbook](/code/index.md) contains examples for some common tasks, including some [Code node only](/code/cookbook/code-node/index.md) functions.

[[% import "_macros/section-toc.html" as sectionToc %]]

[[ sectionToc.sectionToc(page) ]]


# code/code-node.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: [integration, reference]
tags:
  - code node
  - code
hide:
  - tags
---

# Using the Code node

--8<-- "_snippets/integrations/builtin/core-nodes/code-node.md"


# code/cookbook/builtin/all.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: reference
---

# `("<node-name>").all(branchIndex?: number, runIndex?: number)`

This gives access to all the items of the current or parent nodes. If you don't supply any parameters, it returns all the items of the current node.

## Getting items

=== "JavaScript"
	```js
	// Returns all the items of the given node and current run
	let allItems = $("<node-name>").all();

	// Returns all items the node "IF" outputs (index: 0 which is Output "true" of its most recent run)
	let allItems = $("IF").all();

	// Returns all items the node "IF" outputs (index: 0 which is Output "true" of the same run as current node)
	let allItems = $("IF").all(0, $runIndex);

	// Returns all items the node "IF" outputs (index: 1 which is Output "false" of run 0 which is the first run)
	let allItems = $("IF").all(1, 0);
	```
=== "Python"
	```python
	# Returns all the items of the given node and current run
	allItems = _("<node-name>").all();

	# Returns all items the node "IF" outputs (index: 0 which is Output "true" of its most recent run)
	allItems = _("IF").all();

	# Returns all items the node "IF" outputs (index: 0 which is Output "true" of the same run as current node)
	allItems = _("IF").all(0, _runIndex);

	# Returns all items the node "IF" outputs (index: 1 which is Output "false" of run 0 which is the first run)
	allItems = _("IF").all(1, 0);
	```

## Accessing item data

Get all items output by a previous node, and log out the data they contain:

=== "JavaScript"
	```typescript
	previousNodeData = $("<node-name>").all();
	for(let i=0; i<previousNodeData.length; i++) {
		console.log(previousNodeData[i].json);
	}
	```
=== "Python"
	```python
	previousNodeData = _("<node-name>").all();
	for item in previousNodeData:
		# item is of type <class 'pyodide.ffi.JsProxy'>
		# You need to convert it to a Dict
  		itemDict = item.json.to_py()
  		print(itemDict)
	```


# code/cookbook/builtin/execution.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: reference
---

# `execution`

## `execution.id`

Contains the unique ID of the current workflow execution.

=== "JavaScript"
	```js
	let executionId = $execution.id;
	```
=== "Python"
	```python
	executionId = _execution.id
	```

## `execution.resumeUrl`

The webhook URL to call to resume a [waiting](/integrations/builtin/core-nodes/n8n-nodes-base.wait.md) workflow.

See the [Wait > On webhook call](/integrations/builtin/core-nodes/n8n-nodes-base.wait.md#on-webhook-call) documentation to learn more.

## `execution.customData`

This is only available in the Code node.

=== "JavaScript"
	```js
	// Set a single piece of custom execution data
	$execution.customData.set("key", "value");

	// Set the custom execution data object
	$execution.customData.setAll({"key1": "value1", "key2": "value2"})

	// Access the current state of the object during the execution
	var customData = $execution.customData.getAll()

	// Access a specific value set during this execution
	var customData = $execution.customData.get("key")
	```
=== "Python"
	```python
	# Set a single piece of custom execution data
	_execution.customData.set("key", "value");

	# Set the custom execution data object
	_execution.customData.setAll({"key1": "value1", "key2": "value2"})

	# Access the current state of the object during the execution
	customData = _execution.customData.getAll()

	# Access a specific value set during this execution
	customData = _execution.customData.get("key")
	```

Refer to [Custom executions data](/workflows/executions/custom-executions-data.md) for more information.


# code/cookbook/builtin/get-workflow-static-data.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
tags:
  - "static data"
  - "global variables"
hide:
  - tags
contentType: reference
---

# `getWorkflowStaticData(type)`

This gives access to the static workflow data.

/// note | Experimental feature
- Static data isn't available when testing workflows. The workflow must be active and called by a [trigger](/glossary.md#trigger-node-n8n) or webhook to save static data.
- This feature may behave unreliably under high-frequency workflow executions.
///
You can save data directly in the workflow. This data should be small.

As an example: you can save a timestamp of the last item processed from
an RSS feed or database. It will always return an object. Properties can then read, delete or
set on that object. When the workflow execution succeeds, n8n checks automatically if the data
has changed and saves it, if necessary.

There are two types of static data, global and node. Global static data is the
same in the whole workflow. Every node in the workflow can access it. The node static data is unique to the node. Only the node that set it can retrieve it again.

Example with global data:

=== "JavaScript"
	```javascript
	// Get the global workflow static data
	const workflowStaticData = $getWorkflowStaticData('global');

	// Access its data
	const lastExecution = workflowStaticData.lastExecution;

	// Update its data
	workflowStaticData.lastExecution = new Date().getTime();

	// Delete data
	delete workflowStaticData.lastExecution;
	```
=== "Python"
	```python
	# Get the global workflow static data
	workflowStaticData = _getWorkflowStaticData('global')

	# Access its data
	lastExecution = workflowStaticData.lastExecution

	# Update its data
	workflowStaticData.lastExecution = new Date().getTime()

	# Delete data
	delete workflowStaticData.lastExecution
	```

Example with node data:

=== "JavaScript"
	```js
	// Get the static data of the node
	const nodeStaticData = $getWorkflowStaticData('node');

	// Access its data
	const lastExecution = nodeStaticData.lastExecution;

	// Update its data
	nodeStaticData.lastExecution = new Date().getTime();

	// Delete data
	delete nodeStaticData.lastExecution;
	```
=== "Python"
	```python
	# Get the static data of the node
	nodeStaticData = _getWorkflowStaticData('node')

	# Access its data
	lastExecution = nodeStaticData.lastExecution

	# Update its data
	nodeStaticData.lastExecution = new Date().getTime()

	# Delete data
	delete nodeStaticData.lastExecution
	```

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ workflowDemo("https://api.n8n.io/workflows/templates/2538") ]]


# code/cookbook/builtin/index.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: overview
---

# Examples using n8n's built-in methods and variables

n8n provides built-in methods and variables for working with data and accessing n8n data. This section provides usage examples.

[[% import "_macros/section-toc.html" as sectionToc %]]

[[ sectionToc.sectionToc(page) ]]

## Related resources

* [Built-in methods and variables reference](/code/builtin/overview.md)
* [Expressions](/code/expressions.md)
* [Code node](/code/code-node.md)


# code/cookbook/builtin/itemmatching.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
description: How to use `("<node-name>").itemMatching(currentNodeinputIndex)`
contentType: howto
---

# Retrieve linked items from earlier in the workflow

Every item in a node's input data links back to the items used in previous nodes to generate it. This is useful if you need to retrieve linked items from further back than the immediate previous node.

To access the linked items from earlier in the workflow, use `("<node-name>").itemMatching(currentNodeinputIndex)`.


For example, consider a workflow that does the following:

1. The Customer Datastore node generates example data:
	```json
	[
		{
			"id": "23423532",
			"name": "Jay Gatsby",
			"email": "gatsby@west-egg.com",
			"notes": "Keeps asking about a green light??",
			"country": "US",
			"created": "1925-04-10"
		},
		{
			"id": "23423533",
			"name": "José Arcadio Buendía",
			"email": "jab@macondo.co",
			"notes": "Lots of people named after him. Very confusing",
			"country": "CO",
			"created": "1967-05-05"
		},
		...
    ]
	```
2. The Edit Fields node simplifies this data:
	```json
	[
		{
			"name": "Jay Gatsby"
		},
		{
			"name": "José Arcadio Buendía"
		},
        ...
	]
	```
3. The Code node restore the email address to the correct person:
	```json
	[
		{
			"name": "Jay Gatsby",
			"restoreEmail": "gatsby@west-egg.com"
		},
		{
			"name": "José Arcadio Buendía",
			"restoreEmail": "jab@macondo.co"
		},
		...
	]
	```

The Code node does this using the following code:

=== "JavaScript"
	```js
	for(let i=0; i<$input.all().length; i++) {
  		$input.all()[i].json.restoreEmail = $('Customer Datastore (n8n training)').itemMatching(i).json.email;
	}
	return $input.all();
	```
=== "Python"
	```python
	for i,item in enumerate(_input.all()):
  		_input.all()[i].json.restoreEmail = _('Customer Datastore (n8n training)').itemMatching(i).json.email

	return _input.all();
	```

You can view and download the example workflow from [n8n website | itemMatchin usage example ](https://n8n.io/workflows/1966-itemmatching-usage-example/){:target=_blank .external-link}.


# code/cookbook/builtin/vars.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
description: Access your environment's custom variables.
contentType: reference
---

# `vars`

/// info | Feature availability
* Available on Self-hosted Enterprise and Pro and Enterprise Cloud plans.
* You need access to the n8n instance owner account to create variables.
///	

`vars` contains all [Variables](/code/variables.md) for the active environment. It's read-only: you can access variables using `vars`, but must set them using the UI.

=== "JavaScript"
	```js
	// Access a variable
	$vars.<variable-name>
	```
=== "Python"
	```python
	# Access a variable
	_vars.<variable-name>
	```

/// note | `vars` and `env`
`vars` gives access to user-created variables. It's part of the [Environments](/source-control-environments/index.md) feature. `env` gives access to the [configuration environment variables](/hosting/configuration/environment-variables/index.md) for your n8n instance. 
///


# code/cookbook/code-node/console-log.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
description: How to use console.log() or print()
contentType: howto
---

# Output to the browser console with `console.log()` or `print()` in the Code node

You can use `console.log()` or `print()` in the Code node to help when writing and debugging your code.

For help opening your browser console, refer to [this guide by Balsamiq](https://balsamiq.com/support/faqs/browserconsole/){:target=_blank .external-link}.

## console.log (JavaScript)

For technical information on `console.log()`, refer to the [MDN developer docs](https://developer.mozilla.org/en-US/docs/Web/API/Console/log){:target=_blank .external-link}.

For example, copy the following code into a Code node, then open your console and run the node:

```js
let a = "apple";
console.log(a);
```

## print (Python)

For technical information on `print()`, refer to the [Real Python's guide](https://realpython.com/python-print/){:target=_blank .external-link}.

For example, set your Code node **Language** to **Python**, copy the following code into the node, then open your console and run the node:

```python
a = "apple"
print(a)
```

### Handling an output of `[object Object]`

If the console displays `[object Object]` when you print, check the data type, then convert it as needed.

To check the data type:

```python
print(type(myData))
```

#### JsProxy

If `type()` outputs `<class 'pyodide.ffi.JsProxy'>`, you need to convert the JsProxy to a native Python object using `to_py()`. This occurs when working with data in the n8n node data structure, such as node inputs and outputs. For example, if you want to print the data from a previous node in the workflow:

```python
previousNodeData = _("<node-name>").all();
for item in previousNodeData:
	# item is of type <class 'pyodide.ffi.JsProxy'>
	# You need to convert it to a Dict
	itemDict = item.json.to_py()
	print(itemDict)
```

Refer to the Pyodide documentation on [JsProxy](https://pyodide.org/en/stable/usage/api/python-api/ffi.html#pyodide.ffi.JsProxy){:target=_blank .external-link} for more information on this class.










# code/cookbook/code-node/get-binary-data-buffer.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: howto
---

# Get the binary data buffer

The binary data buffer contains all the binary file data processed by a workflow. You need to access it if you want to perform operations on the binary data, such as:

* Manipulating the data: for example, adding column headers to a CSV file.
* Using the data in calculations: for example, calculating a hash value based on it.
* Complex HTTP requests: for example, combining file upload with sending other data formats.

/// note | Not available in Python
`getBinaryDataBuffer()` isn't supported when using Python.
///
You can access the buffer using n8n's `getBinaryDataBuffer()` function:


```js
/* 
* itemIndex: number. The index of the item in the input data.
* binaryPropertyName: string. The name of the binary property. 
* The default in the Read/Write File From Disk node is 'data'. 
*/
let binaryDataBufferItem = await this.helpers.getBinaryDataBuffer(itemIndex, binaryPropertyName);
```

For example:

```js
let binaryDataBufferItem = await this.helpers.getBinaryDataBuffer(0, 'data');
// Returns the data in the binary buffer for the first input item
```


You should always use the `getBinaryDataBuffer()` function, and avoid using older methods of directly accessing the buffer, such as targeting it with expressions like `items[0].binary.data.data`.


# code/cookbook/code-node/index.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
description: Code examples you can use in the Code node.
contentType: overview
---

# Code node cookbook

This section contains examples and recipes for tasks you can do with the Code node.

[[% import "_macros/section-toc.html" as sectionToc %]]

[[ sectionToc.sectionToc(page) ]]

## Related resources

* [Built-in methods and variables reference](/code/builtin/overview.md)
* [Code node](/code/code-node.md)


# code/cookbook/code-node/number-items-last-node.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: howto
---

# Get number of items returned by the previous node

To get the number of items returned by the previous node:

=== "JavaScript"

	```js
	if (Object.keys(items[0].json).length === 0) {
	return [
		{
			json: {
				results: 0,
			}
		}
	]
	}
	return [
		{
			json: {
				results: items.length,
			}
		}
	];
	```

	The output will be similar to the following.

	```json
	[
		{
			"results": 8
		}
	]
	```
=== "Python"
	```python
	if len(items[0].json) == 0:
		return [
			{
				"json": {
					"results": 0,
				}
			}
		]
	else:
		return [
			{
				"json": {
					"results": items.length,
				}
			}
		]
	```
	The output will be similar to the following.

	```json
	[
		{
			"results": 8
		}
	]
	```


# code/cookbook/expressions/check-incoming-data.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: howto
---

# Check incoming data

At times, you may want to check the incoming data. If the incoming data doesn't match a condition, you may want to return a different value. For example, you want to check if a variable from the previous node is empty and return a string if it's empty. Use the following code snippet to return `not found` if the variable is empty.

```javascript
{{$json["variable_name"]? $json["variable_name"] :"not found"}}
```

The above expression uses the ternary operator. You can learn more about the ternary operator [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator).

As an alternative, you can use the [nullish coalescing operator (??)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing) or the [logical or operator (||)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_OR):

```javascript
{{ $x ?? "default value" }}
{{ $x || "default value" }}
```

In either of the above two cases, the value of `$x` will be used if it's set to a non-null, non-false value. The string `default value` is the fallback value.


# code/cookbook/expressions/common-issues.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Expressions common issues
description: Documentation for common issues and questions related to expressions in n8n, a workflow automation platform. Includes details of the issue and suggested solutions.
contentType: howto
---

# Expressions common issues

Here are some common errors and issues related to [expressions](/code/expressions.md) and steps to resolve or troubleshoot them.

## The 'JSON Output' in item 0 contains invalid JSON

This error occurs when you use JSON mode but don't provide a valid JSON object. Depending on the problem with the JSON object, the error sometimes display as `The 'JSON Output' in item 0 does not contain a valid JSON object`.

To resolve this, make sure that the code you provide is valid JSON:

- Check the JSON with a [JSON validator](https://jsonlint.com/).
- Check that your JSON object doesn't reference undefined input data. This may occur if the incoming data doesn't always include the same fields.

## Can't get data for expression

This error occurs when n8n can't retrieve the data referenced by an expression. Often, this happens when the preceding node hasn't been run yet.

Another variation of this may appear as `Referenced node is unexecuted`.  In that case, the full text of this error will tell you the exact node that isn't executing in this format:

> An expression references the node '&lt;node-name&gt;', but it hasn’t been executed yet. Either change the expression, or re-wire your workflow to make sure that node executes first.
> 

To begin troubleshooting, test the workflow up to the named node.

For nodes that use JavaScript or other custom code, you can check if a previous node has executed before trying to use its value by checking the following:

```javascript
$("<node-name>").isExecuted
```

As an example, this JSON references the parameters of the input data. This error will display if you test this step without connecting it to another node:

```javascript
{
  "my_field_1": {{ $input.params }}
}
```

## Invalid syntax

This error occurs when you use an expression that has a syntax error.

For example, the expression in this JSON includes a trailing period, which results in an invalid syntax error:

```jsx
{
  "my_field_1": "value",
  "my_field_2": {{ $('If').item.json. }}
}

```

To resolve this error, check your [expression syntax](https://www.notion.so/code/expressions/) to make sure they follow the expected format.


# code/cookbook/expressions/index.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
description: Code examples you can use in expressions.
contentType: overview
---

# Expressions cookbook

This section contains examples and recipes for tasks you can do with [expressions](/glossary.md#expression-n8n).

/// note | Python support
You can use Python in the Code node. It isn't available in expressions.
///
[[% import "_macros/section-toc.html" as sectionToc %]]

[[ sectionToc.sectionToc(page) ]]

## Related resources

* [Built-in methods and variables reference](/code/builtin/overview.md)
* [Expressions](/code/expressions.md)


# code/cookbook/http-node/index.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: overview
---

# Examples using n8n's HTTP Request node

The HTTP Request node is one of the most versatile nodes in n8n. Use this node to make HTTP requests to query data from any app or service with a REST API.

Refer to [HTTP Request](/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/index.md) for information on node settings.

[[% import "_macros/section-toc.html" as sectionToc %]]

[[ sectionToc.sectionToc(page) ]]

## Related resources

* [HTTP Request](/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/index.md)
* [Built-in methods and variables reference](/code/builtin/overview.md)
* [Expressions](/code/expressions.md)


# code/cookbook/http-node/pagination.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
description: Pagination examples for the HTTP Request node.
contentType: howto
---

# Pagination in the HTTP Request node

The HTTP Request node supports pagination. This page provides some example configurations, including using the [HTTP node variables](/code/builtin/http-node-variables.md).

Refer to [HTTP Request](/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/index.md) for more information on the node.

--8<-- "_snippets/integrations/builtin/core-nodes/http/pagination-api-differences.md"


## Enable pagination

In the HTTP Request node, select **Add Option** > **Pagination**.

## Use a URL from the response to get the next page using `$response`

If the API returns the URL of the next page in its response:

1. Set **Pagination Mode** to **Response Contains Next URL**. n8n displays the parameters for this option.
1. In **Next URL**, use an [expression](/glossary.md#expression-n8n) to set the URL. The exact expression depends on the data returned by your API. For example, if the API includes a parameter called `next-page` in the response body:
	```javascript
	{{ $response.body["next-page"] }}
	```

## Get the next page by number using `$pageCount`

If the API you're using supports targeting a specific page by number:

1. Set **Pagination Mode** to **Update a Parameter in Each Request**.
1. Set **Type** to **Query**.
1. Enter the **Name** of the query parameter. This depends on your API and is usually described in its documentation. For example, some APIs use a query parameter named `page` to set the page. So **Name** would be `page`.
1. Hover over **Value** and toggle **Expression** on.
1. Enter `{{ $pageCount + 1 }}`

`$pageCount` is the number of pages the HTTP Request node has fetched. It starts at zero. Most API pagination counts from one (the first page is page one). This means that adding `+1` to `$pageCount` means the node fetches page one on its first loop, page two on its second, and so on.

## Navigate pagination through body parameters

If the API you're using allows you to paginate through the body parameters:

1. Set the HTTP Request Method to **POST**
1. Set **Pagination Mode** to **Update a Parameter in Each Request**.
1. Select **Body** in the **Type** parameter.
1. Enter the **Name** of the body parameter. This depends on the API you're using. `page` is a common key name.
1. Hover over **Value** and toggle **Expression** on.
1. Enter `{{ $pageCount + 1 }}`

## Set the page size in the query

If the API you're using supports choosing the page size in the query:

1. Select **Send Query Parameters** in main node parameters (this is the parameters you see when you first open the node, not the settings within options).
1. Enter the **Name** of the query parameter. This depends on your API. For example, a lot of APIs use a query parameter named `limit` to set page size. So **Name** would be `limit`.
1. In **Value**, enter your page size.




# code/cookbook/jmespath.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Query JSON with JMESPath
description: n8n supports the JMESPath library, to simplify working with JSON formatted data.
contentType: howto
---

# Query JSON with JMESPath

[JMESPath](https://jmespath.org/){:target=_blank .external-link} is a query language for JSON that you can use to extract and transform elements from a JSON document. For full details of how to use JMESPath, refer to the [JMESPath documentation](https://jmespath.org/tutorial.html){:target=_blank .external-link}.


## The `jmespath()` method

n8n provides a custom method, `jmespath()`. Use this method to perform a search on a JSON object using the JMESPath query language.

The basic syntax is: 

=== "JavaScript"
	```js
	$jmespath(object, searchString)
	```
=== "Python"
	```python
	_jmespath(object, searchString)
	```


To help understand what the method does, here is the equivalent longer JavaScript:


```js
var jmespath = require('jmespath');
jmespath.search(object, searchString);
```

/// note | Expressions must be single-line
The longer code example doesn't work in Expressions, as they must be single-line.
///

`object` is a JSON object, such as the output of a previous node. `searchString` is an expression written in the JMESPath query language. The [JMESPath Specification](https://jmespath.org/specification.html#jmespath-specification){:target=_blank .external-link} provides a list of supported expressions, while their [Tutorial](https://jmespath.org/tutorial.html) and [Examples](https://jmespath.org/examples.html){:target=_blank .external-link} provide interactive examples.

/// warning | Search parameter order
The examples in the [JMESPath Specification](https://jmespath.org/specification.html#jmespath-specification){:target=_blank .external-link} follow the pattern `search(searchString, object)`. The [JMESPath JavaScript library](https://github.com/jmespath/jmespath.js/){:target=_blank .external-link}, which n8n uses, supports `search(object, searchString)` instead. This means that when using examples from the JMESPath documentation, you may need to change the order of the search function parameters.
///

## Common tasks

This section provides examples for some common operations. More examples, and detailed guidance, are available in [JMESPath's own documentation](https://jmespath.org/tutorial.html){:target=_blank .external-link}.

When trying out these examples, you need to set the Code node **Mode** to **Run Once for Each Item**.

### Apply a JMESPath expression to a collection of elements with projections

From the [JMESPath projections documentation](https://jmespath.org/tutorial.html#projections){:target=_blank .external-link}:

> Projections are one of the key features of JMESPath. Use it to apply an expression to a collection of elements. JMESPath supports five kinds of projections:
> 
> * List Projections
> * Slice Projections
> * Object Projections
> * Flatten Projections
> * Filter Projections

The following example shows basic usage of list, slice, and object projections. Refer to the [JMESPath projections documentation](https://jmespath.org/tutorial.html#projections){:target=_blank .external-link} for detailed explanations of each projection type, and more examples.

Given this JSON from a webhook node:


```js
[
  {
    "headers": {
      "host": "n8n.instance.address",
      ...
    },
    "params": {},
    "query": {},
    "body": {
      "people": [
        {
          "first": "James",
          "last": "Green"
        },
        {
          "first": "Jacob",
          "last": "Jones"
        },
        {
          "first": "Jayden",
          "last": "Smith"
        }
      ],
      "dogs": {
        "Fido": {
          "color": "brown",
          "age": 7
        },
        "Spot": {
          "color": "black and white",
          "age": 5
        }
      }
    }
  }
]

```


Retrieve a [list](https://jmespath.org/tutorial.html#list-and-slice-projections){:target=_blank .external-link} of all the people's first names:

=== "Expressions (JavaScript)"

	```js
	{{$jmespath($json.body.people, "[*].first" )}}
	// Returns ["James", "Jacob", "Jayden"]
	```

=== "Code node (JavaScript)"

	```js
	let firstNames = $jmespath($json.body.people, "[*].first" )
	return {firstNames};
	/* Returns:
	[
		{
			"firstNames": [
				"James",
				"Jacob",
				"Jayden"
			]
		}
	]
	*/
	```
=== "Code node (Python)"
	```python
	firstNames = _jmespath(_json.body.people, "[*].first" )
	return {"firstNames":firstNames}
	"""
	Returns:
	[
	 	{
			"firstNames": [
				"James",
				"Jacob",
				"Jayden"
			]
		}
	]
	"""
	```

Get a [slice](https://jmespath.org/tutorial.html#list-and-slice-projections){:target=_blank .external-link} of the first names:

=== "Expressions (JavaScript)"

	```js
	{{$jmespath($json.body.people, "[:2].first")}}
	// Returns ["James", "Jacob"]
	```

=== "Code node (JavaScript)"
	```js
	let firstTwoNames = $jmespath($json.body.people, "[:2].first");
	return {firstTwoNames};
	/* Returns:
	[
		{
			"firstNames": [
				"James",
				"Jacob",
				"Jayden"
			]
		}
	]
	*/
	```
=== "Code node (Python)"
	```python
	firstTwoNames = _jmespath(_json.body.people, "[:2].first" )
	return {"firstTwoNames":firstTwoNames}
	"""
	Returns:
	[
  		{
			"firstTwoNames": [
			"James",
			"Jacob"
			]
		}
	]
	"""
	```

Get a list of the dogs' ages using [object projections](https://jmespath.org/tutorial.html#object-projections){:target=_blank .external-link}:

=== "Expressions (JavaScript)"

	```js
	{{$jmespath($json.body.dogs, "*.age")}}
	// Returns [7,5]
	```

=== "Code node (JavaScript)"
	```js
	let dogsAges = $jmespath($json.body.dogs, "*.age");
	return {dogsAges};
	/* Returns:
	[
		{
			"dogsAges": [
				7,
				5
			]
		}
	]
	*/
	```
=== "Code node (Python)"
	```python
	dogsAges = _jmespath(_json.body.dogs, "*.age")
	return {"dogsAges": dogsAges}
	"""
	Returns:
	[
		{
			"dogsAges": [
				7,
				5
			]
		}
	]
	"""
	```

### Select multiple elements and create a new list or object

Use [Multiselect](https://jmespath.org/tutorial.html#multiselect){:target=_blank .external-link} to select elements from a JSON object and combine them into a new list or object.

Given this JSON from a webhook node:


```js
[
  {
    "headers": {
      "host": "n8n.instance.address",
      ...
    },
    "params": {},
    "query": {},
    "body": {
      "people": [
        {
          "first": "James",
          "last": "Green"
        },
        {
          "first": "Jacob",
          "last": "Jones"
        },
        {
          "first": "Jayden",
          "last": "Smith"
        }
      ],
      "dogs": {
        "Fido": {
          "color": "brown",
          "age": 7
        },
        "Spot": {
          "color": "black and white",
          "age": 5
        }
      }
    }
  }
]

```

<!-- vale off -->
Use multiselect list to get the first and last names and create new lists containing both names:
<!-- vale on -->
=== "Expressions (JavaScript)"

	[[% raw %]]
	```js
	{{$jmespath($json.body.people, "[].[first, last]")}}
	// Returns [["James","Green"],["Jacob","Jones"],["Jayden","Smith"]]
	```
	[[% endraw %]]

=== "Code node (JavaScript)"

	```js
	let newList = $jmespath($json.body.people, "[].[first, last]");
	return {newList};
	/* Returns:
	[
		{
			"newList": [
				[
					"James",
					"Green"
				],
				[
					"Jacob",
					"Jones"
				],
				[
					"Jayden",
					"Smith"
				]
			]
		}
	]
	*/
	```
=== "Code node (Python)"
	```python
	newList = _jmespath(_json.body.people, "[].[first, last]")
	return {"newList":newList}
	"""
	Returns:
	[
		{
			"newList": [
				[
					"James",
					"Green"
				],
				[
					"Jacob",
					"Jones"
				],
				[
					"Jayden",
					"Smith"
				]
			]
		}
	]
	"""
	```

### An alternative to arrow functions in expressions

For example, generate some input data by returning the below code from the Code node:

```js
return[
  {
    "json": {      
      "num_categories": "0",
      "num_products": "45",
      "category_id": 5529735,
      "parent_id": 1407340,
      "pos_enabled": 1,
      "pos_favorite": 0,
      "name": "HP",
      "description": "",
      "image": ""
    }
  },
  {
    "json": {
      "num_categories": "0",
      "num_products": "86",
      "category_id": 5529740,
      "parent_id": 1407340,
      "pos_enabled": 1,
      "pos_favorite": 0,
      "name": "Lenovo",
      "description": "",
      "image": ""
    }
  }  
]
```

You could do a search like "find the item with the name Lenovo and tell me their category ID."

```js
{{ $jmespath($("Code").all(), "[?json.name=='Lenovo'].json.category_id") }}
```


# code/cookbook/luxon.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Date and time with Luxon
description: Use Luxon to work with date and time in n8n.
contentType: howto
---

# Date and time with Luxon

[Luxon](https://github.com/moment/luxon/){:target=_blank .external-link} is a JavaScript library that makes it easier to work with date and time. For full details of how to use Luxon, refer to [Luxon's documentation](https://moment.github.io/luxon/#/?id=luxon){:target=_blank .external-link}. 

n8n passes dates between nodes as strings, so you need to parse them. Luxon makes this easier.

/// note | Python support
Luxon is a JavaScript library. The two convenience [variables](#variables) created by n8n are available when using Python in the Code node, but their functionality is limited:

* You can't perform Luxon operations on these variables. For example, there is no Python equivalent for `$today.minus(...)`.
* The generic Luxon functionality, such as [Convert date string to Luxon](#convert-date-string-to-luxon), isn't available for Python users.
///	


## Variables

n8n uses Luxon to provide two custom variables:

- `now`: a Luxon object containing the current timestamp. Equivalent to `DateTime.now()`.
- `today`: a Luxon object containing the current timestamp, rounded down to the day. Equivalent to `DateTime.now().set({ hour: 0, minute: 0, second: 0, millisecond: 0 })`.

Note that these variables can return different time formats when cast as a string. This is the same behavior as Luxon's `DateTime.now()`.

=== "Expressions (JavaScript)"

	``` js
	{{$now}}
	// n8n displays the ISO formatted timestamp
	// For example 2022-03-09T14:02:37.065+00:00
	{{"Today's date is " + $now}}
	// n8n displays "Today's date is <unix timestamp>"
	// For example "Today's date is 1646834498755"
	```

=== "Code node (JavaScript)"

	``` js
	$now
	// n8n displays <ISO formatted timestamp>
	// For example 2022-03-09T14:00:25.058+00:00
	let rightNow = "Today's date is " + $now
	// n8n displays "Today's date is <unix timestamp>"
	// For example "Today's date is 1646834498755"
	```
=== "Code node (Python)"
	``` python
	_now
	# n8n displays <ISO formatted timestamp>
	# For example 2022-03-09T14:00:25.058+00:00
	rightNow = "Today's date is " + str(_now)
	# n8n displays "Today's date is <unix timestamp>"
	# For example "Today's date is 1646834498755"
	```

n8n provides built-in convenience functions to support data transformation in expressions for dates. Refer to [Data transformation functions | Dates](/code/builtin/data-transformation-functions/dates.md) for more information.

## Date and time behavior in n8n

Be aware of the following:

* In a workflow, n8n converts dates and times to strings between nodes. Keep this in mind when doing arithmetic on dates and times from other nodes.
* With vanilla JavaScript, you can convert a string to a date with `new Date('2019-06-23')`. In Luxon, you must use a function explicitly stating the format, such as `DateTime.fromISO('2019-06-23')` or `DateTime.fromFormat("23-06-2019", "dd-MM-yyyy")`.

## Setting the timezone in n8n

Luxon uses the n8n timezone. This value is either:

* Default: `America/New York`
* A custom timezone for your n8n instance, set using the `GENERIC_TIMEZONE` environment variable.
* A custom timezone for an individual workflow, configured in workflow settings.

## Common tasks

This section provides examples for some common operations. More examples, and detailed guidance, are available in [Luxon's own documentation](https://moment.github.io/luxon/#/?id=luxon){:target="_blank" .external-link}.


### Convert date string to Luxon

You can convert date strings and other date formats to a Luxon DateTime object. You can convert from standard formats and from arbitrary strings.

/// note | A difference between Luxon DateTime and JavaScript Date
With vanilla JavaScript, you can convert a string to a date with `new Date('2019-06-23')`. In Luxon, you must use a function explicitly stating the format, such as `DateTime.fromISO('2019-06-23')` or `DateTime.fromFormat("23-06-2019", "dd-MM-yyyy")`.
///
#### If you have a date in a supported standard technical format: 

Most dates use `fromISO()`. This creates a Luxon DateTime from an ISO 8601 string. For example:

=== "Expressions (JavaScript)"

	```js
	{{DateTime.fromISO('2019-06-23T00:00:00.00')}}
	```

=== "Code node (JavaScript)"

	```js
	let luxonDateTime = DateTime.fromISO('2019-06-23T00:00:00.00')
	```


Luxon's API documentation has more information on [fromISO](https://moment.github.io/luxon/api-docs/index.html#datetimefromiso){:target="_blank" .external-link}.

Luxon provides functions to handle conversions for a range of formats. Refer to Luxon's guide to [Parsing technical formats](https://moment.github.io/luxon/#/parsing?id=parsing-technical-formats) for details.

#### If you have a date as a string that doesn't use a standard format: 

Use Luxon's [Ad-hoc parsing](https://moment.github.io/luxon/#/parsing?id=ad-hoc-parsing){:target="_blank" .external-link}. To do this, use the `fromFormat()` function, providing the string and a set of [tokens](https://moment.github.io/luxon/#/parsing?id=table-of-tokens){:target="_blank" .external-link} that describe the format.

For example, you have n8n's founding date, 23rd June 2019, formatted as `23-06-2019`. You want to turn this into a Luxon object:

=== "Expressions (JavaScript)"

	```js
	{{DateTime.fromFormat("23-06-2019", "dd-MM-yyyy")}}
	```

=== "Code node (JavaScript)"

	```js
	let newFormat = DateTime.fromFormat("23-06-2019", "dd-MM-yyyy")
	```

When using ad-hoc parsing, note Luxon's warning about [Limitations](https://moment.github.io/luxon/#/parsing?id=limitations){:target="_blank" .external-link}. If you see unexpected results, try their [Debugging](https://moment.github.io/luxon/#/parsing?id=debugging){:target="_blank" .external-link} guide.

### Get n days from today

Get a number of days before or after today. 

=== "Expressions (JavaScript)"

	For example, you want to set a field to always show the date seven days before the current date.

	In the expressions editor, enter:


	``` js
	{{$today.minus({days: 7})}}
	```

	On the 23rd June 2019, this returns `[Object: "2019-06-16T00:00:00.000+00:00"]`.

	This example uses n8n's custom variable `$today` for convenience. It's the equivalent of `DateTime.now().set({ hour: 0, minute: 0, second: 0, millisecond: 0 }).minus({days: 7})`.

=== "Code node (JavaScript)"

	For example, you want a variable containing the date seven days before the current date.

	In the code editor, enter:

	``` js
	let sevenDaysAgo = $today.minus({days: 7})
	```

	On the 23rd June 2019, this returns `[Object: "2019-06-16T00:00:00.000+00:00"]`.

	This example uses n8n's custom variable `$today` for convenience. It's the equivalent of `DateTime.now().set({ hour: 0, minute: 0, second: 0, millisecond: 0 }).minus({days: 7})`.

For more detailed information and examples, refer to:

* Luxon's [guide to math](https://moment.github.io/luxon/#/math)
* Their API documentation on [DateTime plus](https://moment.github.io/luxon/api-docs/index.html#datetimeplus) and [DateTime minus](https://moment.github.io/luxon/api-docs/index.html#datetimeminus)

### Create human-readable dates

In [Get n days from today](#get-n-days-from-today), the example gets the date seven days before the current date, and returns it as `[Object: "yyyy-mm-dd-T00:00:00.000+00:00"]` (for expressions) or `yyyy-mm-dd-T00:00:00.000+00:00` (in the Code node). To make this more readable, you can use Luxon's formatting functions.

For example, you want the field containing the date to be formatted as DD/MM/YYYY, so that on the 23rd June 2019, it returns `23/06/2019`.

This expression gets the date seven days before today, and converts it to the DD/MM/YYYY format.

=== "Expressions (JavaScript)"

	```js
	{{$today.minus({days: 7}).toLocaleString()}}
	```

=== "Code node (JavaScript)"

	```js
	let readableSevenDaysAgo = $today.minus({days: 7}).toLocaleString()
	```

You can alter the format. For example:

=== "Expressions (JavaScript)"

	```js
	{{$today.minus({days: 7}).toLocaleString({month: 'long', day: 'numeric', year: 'numeric'})}}
	```

	On 23rd June 2019, this returns "16 June 2019".

=== "Code node (JavaScript)"

	```js
	let readableSevenDaysAgo = $today.minus({days: 7}).toLocaleString({month: 'long', day: 'numeric', year: 'numeric'})
	```

	On 23rd June 2019, this returns "16 June 2019".

Refer to Luxon's guide on [toLocaleString (strings for humans)](https://moment.github.io/luxon/#/formatting?id=tolocalestring-strings-for-humans){:target="_blank" .external-link} for more information.


### Get the time between two dates

To get the time between two dates, use Luxon's diffs feature. This subtracts one date from another and returns a duration.

For example, get the number of months between two dates:

=== "Expressions (JavaScript)"

	```js
	{{DateTime.fromISO('2019-06-23').diff(DateTime.fromISO('2019-05-23'), 'months').toObject()}}
	```

	This returns `[Object: {"months":1}]`.

=== "Code node (JavaScript)"

	```js
	let monthsBetweenDates = DateTime.fromISO('2019-06-23').diff(DateTime.fromISO('2019-05-23'), 'months').toObject()
	```

	This returns `{"months":1}`.

Refer to Luxon's [Diffs](https://moment.github.io/luxon/#/math?id=diffs){:target=_blank .external-link} for more information.

### A longer example: How many days to Christmas?

This example brings together several Luxon features, uses JMESPath, and does some basic string manipulation. 

The scenario: you want a countdown to 25th December. Every day, it should tell you the number of days remaining to Christmas. You don't want to update it for next year - it needs to seamlessly work for every year.

=== "Expressions (JavaScript)"

	```js
	{{"There are " + $today.diff(DateTime.fromISO($today.year + '-12-25'), 'days').toObject().days.toString().substring(1) + " days to Christmas!"}}
	```

	This outputs `"There are <number of days> days to Christmas!"`. For example, on 9th March, it outputs "There are 291 days to Christmas!".

	A detailed explanation of what the expression does:

	* `{{`: indicates the start of the expression.
	* `"There are "`: a string. 
	* `+`: used to join two strings.
	* `$today.diff()`: This is similar to the example in [Get the time between two dates](#get-the-time-between-two-dates), but it uses n8n's custom `$today` variable.
	* `DateTime.fromISO($today.year + '-12-25'), 'days'`: this part gets the current year using `$today.year`, turns it into an ISO string along with the month and date, and then takes the whole ISO string and converts it to a Luxon DateTime data structure. It also tells Luxon that you want the duration in days.
	* `toObject()` turns the result of diff() into a more usable object. At this point, the expression returns `[Object: {"days":-<number-of-days>}]`. For example, on 9th March, `[Object: {"days":-291}]`.
	* `.days` uses JMESPath syntax to retrieve just the number of days from the object. For more information on using JMESPath with n8n, refer to our [JMESpath](/code/cookbook/jmespath.md) documentation. This gives you the number of days to Christmas, as a negative number.
	* `.toString().substring(1)` turns the number into a string and removes the `-`.
	* `+ " days to Christmas!"`: another string, with a `+` to join it to the previous string.
	* `}}`: indicates the end of the expression.

=== "Code node (JavaScript)"

	```js
	let daysToChristmas = "There are " + $today.diff(DateTime.fromISO($today.year + '-12-25'), 'days').toObject().days.toString().substring(1) + " days to Christmas!";
	```

	This outputs `"There are <number of days> days to Christmas!"`. For example, on 9th March, it outputs "There are 291 days to Christmas!".

	A detailed explanation of what the code does:

	* `"There are "`: a string. 
	* `+`: used to join two strings.
	* `$today.diff()`: This is similar to the example in [Get the time between two dates](#get-the-time-between-two-dates), but it uses n8n's custom `$today` variable.
	* `DateTime.fromISO($today.year + '-12-25'), 'days'`: this part gets the current year using `$today.year`, turns it into an ISO string along with the month and date, and then takes the whole ISO string and converts it to a Luxon DateTime data structure. It also tells Luxon that you want the duration in days.
	* `toObject()` turns the result of diff() into a more usable object. At this point, the expression returns `[Object: {"days":-<number-of-days>}]`. For example, on 9th March, `[Object: {"days":-291}]`.
	* `.days` uses JMESPath syntax to retrieve just the number of days from the object. For more information on using JMESPath with n8n, refer to our [JMESpath](/code/cookbook/jmespath.md) documentation. This gives you the number of days to Christmas, as a negative number.
	* `.toString().substring(1)` turns the number into a string and removes the `-`.
	* `+ " days to Christmas!"`: another string, with a `+` to join it to the previous string.


# code/expressions.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: howto
---

# Expressions

Expressions are a powerful feature implemented in all n8n nodes. They allow node parameters to be set dynamically based on data from:

- Previous node executions
- The workflow
- Your n8n environment

You can also execute JavaScript within an expression, making this a convenient and easy way to manipulate data into useful parameter values without writing extensive extra code.

n8n created and uses a templating language called [Tournament](https://github.com/n8n-io/tournament){:target=_blank .external-link}, and extends it with [custom methods and variables](/code/builtin/overview.md) and [data transformation functions](/code/builtin/data-transformation-functions/index.md). These features make it easier to perform common tasks like getting data from other nodes or accessing workflow metadata.

n8n additionally supports two libraries:

- [Luxon](https://github.com/moment/luxon/){:target=_blank .external-link}, for working with dates and time.
- [JMESPath](https://jmespath.org/){:target=_blank .external-link}, for querying JSON.

/// note | Data in n8n
When writing expressions, it's helpful to understand data structure and behavior in n8n. Refer to [Data](/data/index.md) for more information on working with data in your workflows.
///

## Writing expressions

To use an expression to set a parameter value:

1. Hover over the parameter where you want to use an expression.
2. Select **Expressions** in the **Fixed/Expression** toggle.
3. Write your expression in the parameter, or select **Open expression editor** <span class="inline-image">![Open expressions editor icon](/_images/common-icons/open-expression-editor.png){.off-glb}</span> to open the expressions editor. If you use the expressions editor, you can browse the available data in the **Variable selector**. All expressions have the format `{{ your expression here }}`.


### Example: Get data from webhook body

Consider the following scenario: you have a webhook trigger that receives data through the webhook body. You want to extract some of that data for use in the workflow.

Your webhook data looks similar to this:


```json
[
  {
    "headers": {
      "host": "n8n.instance.address",
      ...
    },
    "params": {},
    "query": {},
    "body": {
      "name": "Jim",
      "age": 30,
      "city": "New York"
    }
  }
]
```


In the next node in the workflow, you want to get just the value of `city`. You can use the following expression:


```js
{{$json.body.city}}
```

This expression:

1. Accesses the incoming JSON-formatted data using n8n's custom `$json` variable.
2. Finds the value of `city` (in this example, "New York"). Note that this example uses JMESPath syntax to query the JSON data. You can also write this expression as `{{$json['body']['city']}}`.


### Example: Writing longer JavaScript

An expression contains one line of JavaScript. This means you cannot do things like variable assignments or multiple standalone operations.

To understand the limitations of JavaScript in expressions, and start thinking about workarounds, look at the following two pieces of code. Both code examples use the Luxon date and time library to find the time between two dates in months, and encloses the code in handlebar brackets, like an expression.

However, the first example isn't a valid n8n expression:

```js
// This example is split over multiple lines for readability
// It's still invalid when formatted as a single line
{{
  function example() {
    let end = DateTime.fromISO('2017-03-13');
    let start = DateTime.fromISO('2017-02-13');
    let diffInMonths = end.diff(start, 'months');
    return diffInMonths.toObject();
  }
  example();
}}
```

While the second example is valid:

```js
{{DateTime.fromISO('2017-03-13').diff(DateTime.fromISO('2017-02-13'), 'months').toObject()}}
```

## Common issues

For common errors or issues with expressions and suggested resolution steps, refer to [Common Issues](/code/cookbook/expressions/common-issues.md).


# code/index.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Code in n8n Documentation and Guides
description: Access documentation and guides on using code and expressions in n8n and other developer resources.
contentType: overview
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

	Use this do things like [Create an API endpoint](https://n8n.io/workflows/1750-creating-an-api-endpoint/){:target=_blank .external-link}.

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

	You can build custom nodes, install them on your n8n instance, and publish them to [npm](https://www.npmjs.com/){:target=_blank .external-link}.

	[:octicons-arrow-right-24: Creating nodes](/integrations/creating-nodes/overview.md)

</div>


# code/variables.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4

description: Custom variables allow you to store and reuse values in n8n workflows.
contentType: howto
---

# Custom variables

/// info | Feature availability
* Available on Self-hosted Enterprise and Pro Cloud plans.
* You need access to the n8n instance owner account to create and edit variables. All users can use existing variables.

Available in version 0.225.0 and above.
///	

Custom variables are read-only variables that you can use to store and reuse values in n8n workflows. 

/// warning | Variables are shared
When you create a variable, it's available to everyone on your n8n instance.
///

## Create variables

To create a new variable:

1. On the **Variables** page, select **Add Variable**.
2. Enter a **Key** and **Value**. The maximum key length is 50 characters, and the maximum value length is 220 characters. n8n limits the characters you can use in the key and value to lowercase and uppercase letters, numbers, and underscores (`A-Z`, `a-z`, `0-9`, `_`).
3. Select **Save**. The variable is now available for use in all workflows in the n8n instance.

## Edit and delete variables

To edit or delete a variable:

1. On the **Variables** page, hover over the variable you want to change.
2. Select **Edit** or **Delete**.

## Use variables in workflows

You can access variables in the Code node and in [expressions](/glossary.md#expression-n8n):

```javascript
// Access a variable
$vars.<variable-name>
```

All variables are strings.

During workflow execution, n8n replaces the variables with the variable value. If the variable has no value, n8n treats its value as `undefined`. Workflows don't automatically fail in this case.

Variables are read-only. You must use the UI to change the values. If you need to set and access custom data within your workflow, use [Workflow static data](/code/cookbook/builtin/get-workflow-static-data.md).
