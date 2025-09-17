---
contentType: tutorial
---

# Understanding the data structure

In this chapter, you will learn about the data structure of n8n and how to use the [Code node](/integrations/builtin/core-nodes/n8n-nodes-base.code/index.md) to transform data and simulate node outputs.


## Data structure of n8n

In a basic sense, n8n nodes function as an Extract, Transform, Load (ETL) tool. The nodes allow you to access (extract) data from multiple disparate sources, modify (transform) that data in a particular way, and pass (load) it along to where it needs to be.

The data that moves along from node to node in your workflow must be in a format (structure) that can be recognized and interpreted by each node. In n8n, this required structure is an array of objects.

/// note | About array of objects
An array is a list of values. The array can be empty or contain several elements. Each element is stored at a position (index) in the list, starting at 0, and can be referenced by the index number. For example, in the array `["Leonardo", "Michelangelo", "Donatello", "Raphael"];` the element `Donatello` is stored at index 2.

An object stores key-value pairs, instead of values at numbered indexes as in arrays. The order of the pairs isn't important, as the values can be accessed by referencing the key name. For example, the object below contains two properties (`name` and `color`):

```json
{
	name: 'Michelangelo',
	color: 'blue',
}
```

An array of objects is an array that contains one or more objects. For example, the array `turtles` below contains four objects:

```javascript
var turtles = [
	{
		name: 'Michelangelo',
		color: 'orange',
	},
	{
		name: 'Donatello',
		color: 'purple',
	},
	{
		name: 'Raphael',
		color: 'red',
	},
	{
		name: 'Leonardo',
		color: 'blue',
	}
];
```

You can access the properties of an object using dot notation with the syntax `object.property`. For example, `turtles[1].color` gets the color of the second turtle.
///


Data sent from one node to another is sent as an array of JSON objects. The elements in this collection are called items.

<figure><img src="/_images/courses/level-two/chapter-one/explanation_items.png" alt="" style="width:100%"><figcaption align = "center"><i>Items</i></figcaption></figure>

An n8n node performs its action on each item of incoming data.

<figure><img src="/_images/flow-logic/looping/customer_datastore_node.png"><figcaption align = "center"><i>Items in the Customer Datastore node</i></figcaption></figure>


## Creating data sets with the Code node

Now that you are familiar with the n8n data structure, you can use it to create your own data sets or simulate node outputs. To do this, use the [Code node](/integrations/builtin/core-nodes/n8n-nodes-base.code/index.md) to write JavaScript code defining your array of objects with the following structure:

```javascript
return [
	{
		json: {
			apple: 'beets',
		}
	}
];
```

For example, the array of objects representing the Ninja turtles would look like this in the Code node:

<figure><img src="/_images/courses/level-two/chapter-one/exercise_function_notnested.png" alt="" style="width:100%"><figcaption align = "center"><i>Array of objects in the Code node</i></figcaption></figure>

/// warning | JSON objects
Notice that this array of objects contains an extra key: `json`. n8n expects you to wrap each object in an array in another object, with the key `json`.

<figure><img src="/_images/courses/level-two/chapter-one/explanation_datastructure.png" alt="" style="width:100%"><figcaption align = "center"><i>Illustration of data structure in n8n</i></figcaption></figure>

It's good practice to pass the data in the right structure used by n8n. But don't worry if you forget to add the `json` key to an item, n8n (version 0.166.0 and above) adds it automatically.
///

You can also have nested pairs, for example if you want to define a primary and a secondary color. In this case, you need to further wrap the key-value pairs in curly braces `{}`.

/// note | n8n data structure video
[This talk](https://www.youtube.com/watch?v=mQHT3Unn4tY) offers a more detailed explanation of data structure in n8n.

<iframe width="560" height="315" src="https://www.youtube.com/embed/mQHT3Unn4tY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
///


### Exercise

In a Code node, create an array of objects named `myContacts` that contains the properties `name` and `email`, and the `email` property is further split into `personal` and `work`.

??? note "Show me the solution"

	In the **Code node**, in the JavaScript Code field you have to write the following code:

	```javascript
	var myContacts = [
		{
			json: {
				name: 'Alice',
				email: {
					personal: 'alice@home.com',
					work: 'alice@wonderland.org'
				},
			}
		},
		{
			json: {
				name: 'Bob',
				email: {
					personal: 'bob@mail.com',
					work: 'contact@thebuilder.com'
					},
			}
		},
	];

	return myContacts;
	```

	When you execute the **Code node**, the result should look like this:

	<figure><img src="/_images/courses/level-two/chapter-one/exercise_function.png" alt="" style="width:100%"><figcaption align = "center"><i>Result of Code node</i></figcaption></figure>



## Referencing node data with the Code node

Just like you can use [expressions](/code/expressions.md) to reference data from other nodes, you can also use some [methods and variables](/code/builtin/overview.md) in the **Code node**.

Please make sure you read these pages before continuing to the next exercise.

### Exercise

Let's build on the previous exercise, in which you used the Code node to create a data set of two contacts with their names and emails. Now, connect a second Code node to the first one. In the new node, write code to create a new column named `workEmail` that references the work email of the first contact.

??? note "Show me the solution"
	In the **Code node**, in the JavaScript Code field you have to write the following code:

	```javascript
	let items = $input.all();
	items[0].json.workEmail = items[0].json.email['work'];
	return items;
	```

	When you execute the **Code node**, the result should look like this:

	<figure><img src="/_images/courses/level-two/chapter-one/exercise_function_reference.png" alt="" style="width:100%"><figcaption align = "center"><i>Code node reference</i></figcaption></figure>


## Transforming data

The incoming data from some nodes may have a different data structure than the one used in n8n. In this case, you need to [transform the data](/data/transforming-data.md), so that each item can be processed individually.

The two most common operations for data transformation are:

- Creating multiple items from one item
- Creating a single item from multiple items

There are several ways to transform data for the purposes mentioned above:

- Use n8n's [data transformation nodes](/data/index.md#data-transformation-nodes). Use these nodes to modify the structure of incoming data that contain lists (arrays) without needing to use JavaScript code in the **Code node**:
	- Use the [**Split Out node**](/integrations/builtin/core-nodes/n8n-nodes-base.splitout.md) to separate a single data item containing a list into multiple items.
	- Use the [**Aggregate node**](/integrations/builtin/core-nodes/n8n-nodes-base.aggregate.md) to take separate items, or portions of them, and group them together into individual items.
- Use the **Code node** to write JavaScript functions to modify the data structure of incoming data using the **Run Once for All Items** mode:
    - To create multiple items from a single item, you can use JavaScript code like this. This example assumes that the item has a key named `data` set to an array of items in the form of: `[{ "data": [{<item_1>}, {<item_2>}, ...] }]`:
	```javascript
	return $input.first().json.data.map(item => {
        return {
            json: item
        }
    });
	```
	- To create a single item from multiple items, you can use this JavaScript code:
	```javascript
    return [
    	{
        	json: {
        		data_object: $input.all().map(item => item.json)
        	}
        }
      ];
	```

These JavaScript examples assume your entire input is what you want to transform. As in the exercise above, you can also execute either operation on a specific field by identifying that in the items list, for example, if our workEmail example had multiple emails in a single field, we could run some code like this:
```javascript
let items = $input.all();
return items[0].json.workEmail.map(item => {
	return {
		json: item
	}
});
```

### Exercise

1. Use the **HTTP Request node** to make a GET request to the PokéAPI `https://pokeapi.co/api/v2/pokemon`. (This API requires no authentication).
2. Transform the data in the `results` field with the **Split Out node**.
3. Transform the data in the `results` field with the **Code node**.


??? note "Show me the solution"

	1. To get the pokemon from the PokéAPI, execute the **HTTP Request node** with the following parameters:
		- **Authentication**: None
		- **Request Method**: GET
		- **URL**: https://pokeapi.co/api/v2/pokemon
	2. To transform the data with the **Split Out node**, connect this node to the **HTTP Request node** and set the following parameters:
		- **Field To Split Out**: results
		- **Include**: No Other Fields
	3. To transform the data with the **Code node**, connect this node to the **HTTP Request node** and write the following code in the JavaScript Code field:
		```javascript
		let items = $input.all();
		return items[0].json.results.map(item => {
			return {
				json: item
			}
		});
		```
