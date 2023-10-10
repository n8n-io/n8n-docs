---
title: Query JSON with JMESPath
description: n8n supports the JMESPath library, to simplify working with JSON formatted data.
contentType: howto
---

# Query JSON with JMESPath

[JMESPath](https://jmespath.org/){:target=_blank .external-link} is a query language for JSON, allowing you to extract and transform elements from a JSON document. For full details of how to use JMESPath, refer to the [JMESPath documentation](https://jmespath.org/tutorial.html){:target=_blank .external-link}.

## The `$jmespath()` method

n8n provides a custom method, `$jmespath()`. It allows you to perform a search on a JSON object using the JMESPath query language.

The basic syntax is: 


```js
$jmespath(object, searchString)
```


To help understand what the method does, here is the equivalent longer JavaScript:


```js
var jmespath = require('jmespath');
jmespath.search(object, searchString);
```

!!! note "Expressions must be single-line"
	The longer code example doesn't work in Expressions, as they must be single-line.


`object` is a JSON object, such as the output of a previous node. `searchString` is an expression written in the JMESPath query language. The [JMESPath Specification](https://jmespath.org/specification.html#jmespath-specification){:target=_blank .external-link} provides a list of supported expressions, while their [Tutorial](https://jmespath.org/tutorial.html) and [Examples](https://jmespath.org/examples.html){:target=_blank .external-link} provide interactive examples.

!!! warning "Search parameter order"
    The examples in the [JMESPath Specification](https://jmespath.org/specification.html#jmespath-specification){:target=_blank .external-link} follow the pattern `search(searchString, object)`. The [JMESPath JavaScript library](https://github.com/jmespath/jmespath.js/){:target=_blank .external-link}, which n8n uses, supports `search(object, searchString)` instead. This means that when using examples from the JMESPath documentation, you may need to change the order of the search function parameters.


## Common tasks

This section provides examples for some common operations. More examples, and detailed guidance, are available in [JMESPath's own documentation](https://jmespath.org/tutorial.html){:target=_blank .external-link}.

### Apply a JMESPath expression to a collection of elements with projections

From the [JMESPath projections documentation](https://jmespath.org/tutorial.html#projections){:target=_blank .external-link}:

> Projections are one of the key features of JMESPath. It allows you to apply an expression to a collection of elements. JMESPath supports five kinds of projections:
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

=== "Expressions"

	```js
	{{$jmespath($json.body.people, "[*].first" )}}
	// Returns ["James", "Jacob", "Jayden"]
	```

=== "Code node"

	```js
	$jmespath($json.body.people, "[*].first" )
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

Get a [slice](https://jmespath.org/tutorial.html#list-and-slice-projections){:target=_blank .external-link} of the first names:

=== "Expressions"

	```js
	{{$jmespath($json.body.people, "[:2].first")}}
	// Returns ["James", "Jacob"]
	```

=== "Code node"
	```js
	$jmespath($json.body.people, "[:2].first")
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

Get a list of the dogs' ages using [object projections](https://jmespath.org/tutorial.html#object-projections){:target=_blank .external-link}:

=== "Expressions"

	```js
	{{$jmespath($json.body.dogs, "*.age")}}
	// Returns [7,5]
	```

=== "Code node"
	```js
	$jmespath($json.body.dogs, "*.age")
	/* Returns:
	[
		7,
		5
	]
	*/
```

### Select multiple elements and create a new list or object

[Multiselect](https://jmespath.org/tutorial.html#multiselect){:target=_blank .external-link} allows you to select elements from a JSON object and combine them into a new list or object.

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


Use multiselect list to get the first and last names and create new lists containing both names:

=== "Expressions"

	[[% raw %]]
	```js
	{{$jmespath($json.body.people, "[].[first, last]")}}
	// Returns [["James","Green"],["Jacob","Jones"],["Jayden","Smith"]]
	```
	[[% endraw %]]

=== "Code node"

	```js
	$jmespath($json.body.people, "[].[first, last]")
	/* Returns:
	[
	{
		"fullNames": [
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

### An alternative to arrow functions

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
