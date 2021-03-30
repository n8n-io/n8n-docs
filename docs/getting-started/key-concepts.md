# Key Concepts

## Expression
A string of characters and symbols in a programming language that represents a value depending upon its input.

n8n uses [expressions](../nodes/expressions.md) extensively when a [node](#Node) is referring to another node for input.

## Items
Data sent from one node to another is sent as an array of JSON objects. Each element in this collection is called an **Item**. A node performs its action on each item of incoming data.

## Functions

A function is a block of code designed to perform a certain task. In the context of n8n workflows, you can write functions in JavaScript to add functionality to nodes and workflows. 

The [Function](../nodes/nodes-library/core-nodes/Function/README.md) and the [Function Item](../nodes/nodes-library/core-nodes/FunctionItem/README.md) are the most powerful nodes in n8n. With these, almost everything can be done if you know how to write JavaScript code. Both nodes work very similarly: They give you access to the incoming data
and you can manipulate it.

The difference is that the code of the **Function node** gets executed only once. The node receives the full items (JSON and binary data) as an array and expects an array of items as a return value. The items returned can be totally different from the incoming ones. So it is not only possible to remove and edit existing items, but also to add or return totally new ones.

On the other hand, the code of the **Function Item node** gets executed once for every item. The node receives one item at a time as input and also just the JSON data. As a return value, it expects the JSON data of one single item. That makes it possible to add, remove, and edit JSON properties of items, but it is not possible to add new or remove existing items. Accessing and changing binary data is only possible via the methods `getBinaryData` and `setBinaryData`.

Both the Function node and Function Item node support promises. So instead of returning the item or items directly, it is also possible to return a promise which resolves accordingly.

Here is a comparative overview of the Function and Function Item nodes:

| Data to access          | Function               | FunctionItem     |
| :-------------------------- | :--------------------- | :--------------- |
| JSON data                   | items\[_index_\].json    | item             |
| Binary data                 | items\[_index_\].binary  | getBinaryData()  |


## Data Flow

Nodes do not only process one "item", they process multiple ones. So if the Trello node is set to "Create-Card" and it has an expression set for "Name" to be set depending on "name" property, it will create a card for each item, always choosing the name-property-value of the current one.

This data would, for example, create two boards. One named "test1" the other one named "test2":

```json
[
	{
		name: "test1"
	},
	{
		name: "test2"
	}
]
```