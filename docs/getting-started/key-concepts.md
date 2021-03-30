# Key Concepts

## Expression
An expression is a string of characters and symbols in a programming language that represents a value depending upon its input.
n8n uses [expressions](../nodes/expressions.md) extensively when a [node](#Node) is referring to another node for input.


## Item
Data sent from one node to another is sent as an array of JSON objects. Each element in this collection is called an **Item**. A node performs its action on each item of incoming data.

## Function
A function is a block of code designed to perform a certain task. In n8n, you can write custom [JavaScript code snippets](../reference/javascript-code-snippets.md) to add, remove, and update the data you receive from a node.

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


## Data
Data represents units of information that are collected by and transmitted through nodes. For "basic usage" it is not necessarily needed to understand how the data that gets passed from one node to another is structured. However, it becomes important if you want to:

 - create your own node
 - write custom expressions
 - use the Function or Function Item node
 - you want to get the most out of n8n

### Data Structure
In n8n, all the data that is passed between nodes is an array of objects. It has the following structure:

```json
[
	{
		// Each item has to contain a "json" property. But it can be an empty object like {}.
		// Any kind of JSON data is allowed. So arrays and the data being deeply nested is fine.
		json: { // The actual data n8n operates on (required)
			// This data is only an example it could be any kind of JSON data
			jsonKeyName: 'keyValue',
			anotherJsonKey: {
				lowerLevelJsonKey: 1
			}
		},
		// Binary data of item. The most items in n8n do not contain any (optional)
		binary: {
			// The key-name "binaryKeyName" is only an example. Any kind of key-name is possible.
			binaryKeyName: {
				data: '....', // Base64 encoded binary data (required)
				mimeType: 'image/png', // Optional but should be set if possible (optional)
				fileExtension: 'png', // Optional but should be set if possible (optional)
				fileName: 'example.png', // Optional but should be set if possible (optional)
			}
		}
	},
	...
]
```

### Data Flow

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

## Error Workflow

For each workflow, an optional "Error Workflow" can be set. It gets executed in case the execution of the workflow fails. That makes it possible to, for instance, inform the user via Email or Slack if something goes wrong. The same "Error Workflow" can be set on multiple workflows.

The only difference between a regular workflow and an "Error Workflow" is that it contains an "Error Trigger" node. So it is important to make sure that this node gets created before setting a workflow as "Error Workflow".

The "Error Trigger" node will trigger in case the execution fails and receives information about it. The data looks like this:

```json
[
	{
		"execution": {
			"id": "231",
			"url": "https://n8n.example.com/execution/231",
			"retryOf": "34",
			"error": {
				"message": "Example Error Message",
				"stack": "Stacktrace"
			},
			"lastNodeExecuted": "Node With Error",
			"mode": "manual"
		},
		"workflow": {
			"id": "1",
			"name": "Example Workflow"
		}
	}
]

```

All information is always present except:
- **execution.id**: Only present when the execution gets saved in the database
- **execution.url**: Only present when the execution gets saved in the database
- **execution.retryOf**: Only present when the execution is a retry of a previously failed execution

An "Error Workflow" can be set in the Workflow Settings which can be accessed by pressing the "Workflow" button in the menu on the on the left side. The last option is "Settings". In the window that appears, the "Error Workflow" can be selected via the Dropdown "Error Workflow".


## Security

By default, n8n can be accessed by everybody. This is okay if you only have it running
locally but if you deploy it on a server which is accessible from the web, you have
to make sure that n8n is protected.

### Basic Auth

Right now we have very basic protection in place using basic-auth. It can be activated
by setting the following environment variables:

```bash
export N8N_BASIC_AUTH_ACTIVE=true
export N8N_BASIC_AUTH_USER=<USER>
export N8N_BASIC_AUTH_PASSWORD=<PASSWORD>
```

### JWT

There is also limited support for JWT based authentication. If enabled, n8n will verify the token with the provided JSON Web Key Set URI. It can be configured through the following environment variables:

```bash
export N8N_JWT_AUTH_ACTIVE=true
export N8N_JWT_AUTH_HEADER=<HEADER>
export N8N_JWKS_URI=<URI>
```
Keep in mind that there is currently no built-in way of passing down the Token in the request, so to use JWT you have to have the token in the request manually.

## Scalability
Scalability refers to the ability of a system or tool (like n8n workflows) to increase in size and functionality based on the user's demands. 

With [n8n@0.108.0](./changelog.md#n8n-0-108-0) we have released a few important updates to make n8n more scalable and reliable. Read more about scaling n8n [here](../reference/scaling-n8n.md).
