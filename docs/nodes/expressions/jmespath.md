# Query JSON with JMESPath

[JMESPath](https://jmespath.org/) is a query language for JSON, allowing you to extract and transform elements from a JSON document. For full details of how to use JMESPath, refer to the [JMESPath documentation](https://jmespath.org/tutorial.html).

## The `$jmespath()` method

n8n provides a custom method, `$jmespath()`, for use in expressions. It allows you to perform a search on a JSON object using the JMESPath query language.

The basic syntax is: 

::: v-pre
```js
$jmespath(object, searchString)
```
:::

To help understand what the method does, here is the equivalent JavaScript. Note that you must use the custom method, not the JavaScript approach, because expressions must be single-line:

::: v-pre
```js
var jmespath = require('jmespath');
jmespath.search(object, searchString);
```
:::

`object` is a JSON object, such as the output of a previous node. `searchString` is an expression written in the JMESPath query language. The [JMESPath Specification](https://jmespath.org/specification.html#jmespath-specification) provides a list of supported expressions, while their [Tutorial](https://jmespath.org/tutorial.html) and [Examples](https://jmespath.org/examples.html) provide interactive examples.

::: warning Search parameter order
The examples in the [JMESPath Specification](https://jmespath.org/specification.html#jmespath-specification) follow the pattern `search(searchString, obj)`. The [JMESPath JavaScript library](https://github.com/jmespath/jmespath.js/), which n8n uses, supports `search(obj, searchString)` instead. This means that when using examples from the JMESPath documentation, you may need to change the order of the search function parameters.
:::

## Common tasks

This section provides examples for some common operations. Many more examples, and detailed guidance, are available in [JMESPath's own documentation](https://jmespath.org/tutorial.html).

### A shorter way to write basic operations

JMESPath provides a shorter and more readable way to write basic JSON queries. 

Consider the following scenario: you have a webhook trigger that receives data through the webhook body. You want to extract some of that data for use in the workflow.

Your webhook data looks similar to this:

:::v-pre
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
      "city": "New York",
      "dogs": ["Fido", "Spot"]
    }
  }
]
```
:::

Extract the city:

::: v-pre
```js
// With JMESPath
{{$json.body.city}}
// Without JMESPath
{{$json['body']['city']}}
```
:::


Get the first dog in `dogs[]`:

::: v-pre
```js
// With JMESPath
{{$json.body.dogs[0]}}
// Without JMESPath
{{$json['body']['dogs'][0]}}
```

### Apply a JMESPath expression to a collection of elements with projections

From the [JMESPath projections documentation](https://jmespath.org/tutorial.html#projections):

> Projections are one of the key features of JMESPath. It allows you to apply an expression to a collection of elements. There are five kinds of projections:
> 
> * List Projections
> * Slice Projections
> * Object Projections
> * Flatten Projections
> * Filter Projections



Given this JSON from a webhook node:

::: v-pre
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
      {
        "people": [
          {"first": "James", "last": "Green"},
          {"first": "Jacob", "last": "Jones"},
          {"first": "Jayden", "last": "Smith"},
          {"missing": "different"}
        ],
        "dogs": {
          {"name": "Fido", "color": "brown"},
          {"name": "Spot", "color": "black and white"}
        }
      }
    }
  }
]

```
:::

Retrieve a [list](https://jmespath.org/tutorial.html#list-and-slice-projections) of all the people's first names:

::: v-pre
```js
{{$jmespath($json.body.people, "[*].first" )}}
// Returns

```
:::

Get a [slice](https://jmespath.org/tutorial.html#list-and-slice-projections) of the first names:

::: v-pre
```js
{{$jmespath($json.body.people, "[:2].first")}}
// Returns
```

Get a list of the dogs' ages using [object projections](https://jmespath.org/tutorial.html#object-projections):

::: v-pre
```js
{{$jmespath($json.body.dogs, "*.age")}}
```
:::