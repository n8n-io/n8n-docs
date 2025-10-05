---
title: Query JSON with JMESPath
description: n8n supports the JMESPath library, to simplify working with JSON formatted data.
contentType: howto
---

# Query JSON with JMESPath

[JMESPath](https://jmespath.org/) is a query language for JSON that you can use to extract and transform elements from a JSON document. For full details of how to use JMESPath, refer to the [JMESPath documentation](https://jmespath.org/tutorial.html).


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

`object` is a JSON object, such as the output of a previous node. `searchString` is an expression written in the JMESPath query language. The [JMESPath Specification](https://jmespath.org/specification.html#jmespath-specification) provides a list of supported expressions, while their [Tutorial](https://jmespath.org/tutorial.html) and [Examples](https://jmespath.org/examples.html) provide interactive examples.

/// warning | Search parameter order
The examples in the [JMESPath Specification](https://jmespath.org/specification.html#jmespath-specification) follow the pattern `search(searchString, object)`. The [JMESPath JavaScript library](https://github.com/jmespath/jmespath.js/), which n8n uses, supports `search(object, searchString)` instead. This means that when using examples from the JMESPath documentation, you may need to change the order of the search function parameters.
///

## Common tasks

This section provides examples for some common operations. More examples, and detailed guidance, are available in [JMESPath's own documentation](https://jmespath.org/tutorial.html).

When trying out these examples, you need to set the Code node **Mode** to **Run Once for Each Item**.

### Apply a JMESPath expression to a collection of elements with projections

From the [JMESPath projections documentation](https://jmespath.org/tutorial.html#projections):

> Projections are one of the key features of JMESPath. Use it to apply an expression to a collection of elements. JMESPath supports five kinds of projections:
> 
> * List Projections
> * Slice Projections
> * Object Projections
> * Flatten Projections
> * Filter Projections

The following example shows basic usage of list, slice, and object projections. Refer to the [JMESPath projections documentation](https://jmespath.org/tutorial.html#projections) for detailed explanations of each projection type, and more examples.

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


Retrieve a [list](https://jmespath.org/tutorial.html#list-and-slice-projections) of all the people's first names:

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

Get a [slice](https://jmespath.org/tutorial.html#list-and-slice-projections) of the first names:

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

Get a list of the dogs' ages using [object projections](https://jmespath.org/tutorial.html#object-projections):

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

Use [Multiselect](https://jmespath.org/tutorial.html#multiselect) to select elements from a JSON object and combine them into a new list or object.

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
