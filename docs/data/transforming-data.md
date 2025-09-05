<!-- vale off -->
# Transforming data in n8n

Data transformation allows you to change the number, composition, and structure of items as data moves through your workflow. For example, you can transform data to make it more more consistent, flatten complex nesting, add, edit, or remove properties.

This is especially useful for shaping new data entering your workflow from external sources like APIs, webhook events, and binary files to conform to [n8n's expected data structure]().

For example, the image below shows the output of an [HTTP Request](/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/index.md) node that returns data that doesn't conform to n8n's expected data structure. The node shows that only one item was returned, but that item contains the actual data items you want to work with:

![HTTP Request node output](/_images/data/transforming-data/HTTPRequest_output.png)

## Ways of transforming data

You can transform data in n8n using a number of different mechanisms. The following sections introduce them, ordered from the least technically involved to the most.

### Dedicated data transformation nodes

n8n provides a number of nodes meant to make transforming data simple. These can manipulate data to make it easier for other nodes to process them, split larger items into pieces, remove layers of data, edit existing content, etc.

* [Aggregate](/integrations/builtin/core-nodes/n8n-nodes-base.aggregate.md): take separate items, or portions of them, and group them together into individual items.
* [Edit Fields (Set)](/integrations/builtin/core-nodes/n8n-nodes-base.set.md): add or overwrite existing item data.
* [Limit](/integrations/builtin/core-nodes/n8n-nodes-base.limit.md): remove items beyond a defined maximum number.
* [Remove Duplicates](/integrations/builtin/core-nodes/n8n-nodes-base.removeduplicates/index.md): identify and delete items that are identical across all fields or a subset of fields.
* [Sort](/integrations/builtin/core-nodes/n8n-nodes-base.sort.md): organize lists of in a desired ordering, or generate a random selection.
* [Split Out](/integrations/builtin/core-nodes/n8n-nodes-base.splitout.md): separate a single data item containing a list into multiple items.
* [Summarize](/integrations/builtin/core-nodes/n8n-nodes-base.summarize.md): aggregate items together, in a manner similar to Excel pivot tables. 

### Expressions

Expressions also play a role in transforming data. They can be used to set dynamic parameter values based on your existing data and can transform data using [many functions and operators](/code/builtin/data-transformation-functions/index.md).


You call data transformation function inside of functions using the dot notation:

```js
{{ {{ dataItem.function() }}
```

For example, to check if a string is an email:

```js
{{ "example@example.com".isEmail() }}

// Returns true
```

The following pages contain functions for working with various types of data:

* [Arrays](/code/builtin/data-transformation-functions/arrays.md)
* [Dates](/code/builtin/data-transformation-functions/dates.md)
* [Numbers](/code/builtin/data-transformation-functions/numbers.md)
* [Objects](/code/builtin/data-transformation-functions/objects.md)
* [Strings](/code/builtin/data-transformation-functions/strings.md)

Visit the [referencing data](/data/referencing-data/index.md) section to learn more about referencing data with expressions.

### The Code node

The [Code node](/integrations/builtin/core-nodes/n8n-nodes-base.code/index.md) allows you to perform generic, flexible data manipulation with JavaScript or Python in an editor window. You can access all of the input data you'd reference with expressions, using a complete programming language. You just need to return data in the [expected format]() and may need to [manually link items]() so n8n can follow item lineage correctly.

This is the most powerful and flexible option, but also requires the most technical knowledge and time to implement. Use this if there isn't an obvious way to transform your data with existing nodes or if the operations you want to perform are easier for you to express in code.
