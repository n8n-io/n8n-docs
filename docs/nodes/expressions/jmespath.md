# Query JSON with JMESPath

[JMESPath](https://jmespath.org/) is a query language for JSON, allowing you to extract and transform elements from a JSON document. For full details of how to use JMESPath, refer to the [JMESPath documentation](https://jmespath.org/tutorial.html).

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

JMESPath projections allow you to do operations in n8n expressions that would usually be impossible.

Given this JSON:

::: v-pre
```js
{
  "people": [
    {"first": "James", "last": "d"},
    {"first": "Jacob", "last": "e"},
    {"first": "Jayden", "last": "f"},
    {"missing": "different"}
  ],
  "foo": {"bar": "baz"}
}
```
:::

Retrieve a list of all the first names:

::: v-pre
```js
people[*].first
```
:::