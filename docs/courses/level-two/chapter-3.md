---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: tutorial
---

# Merging and splitting data

In this chapter, you will learn how to merge and split data, and in what cases it might be useful to perform these operations.


## Merging data

In some cases, you might need to merge (combine) and process data from different sources.

Merging data can involve:

- Creating one data set from multiple sources.
- Synchronizing data between multiple systems. This could include removing duplicate data or updating data in one system when it changes in another.

/// note | One-way vs. two-way sync
In a one-way sync, data is synchronized in one direction. One system serves as the single source of truth. When information changes in that main system, it automatically changes in the secondary system; but if information changes in the secondary system, the changes aren't reflected in the main system.

In a two-way sync, data is synchronized in both directions (between both systems). When information changes in either of the two systems, it automatically changes in the other one as well.

[This blog tutorial](https://blog.n8n.io/how-to-sync-data-between-two-systems/) explains how to sync data one-way and two-way between two CRMs.
///


In n8n, you can merge data from two different nodes using the [Merge node](/integrations/builtin/core-nodes/n8n-nodes-base.merge.md){:target="_blank"}, which provides several merging options:

- [Append](/integrations/builtin/core-nodes/n8n-nodes-base.merge.md#append){:target="_blank"}
- [Combine](/integrations/builtin/core-nodes/n8n-nodes-base.merge.md#combine){:target="_blank"}
	- [Merge by Fields](/integrations/builtin/core-nodes/n8n-nodes-base.merge.md#combine-by-matching-fields){:target="_blank"}: requires input fields to match on
	- [Merge by Position](/integrations/builtin/core-nodes/n8n-nodes-base.merge.md#combine-by-position){:target="_blank"}
	- [Combine all possible combinations](/integrations/builtin/core-nodes/n8n-nodes-base.merge.md#combine-by-all-possible-combinations){:target="_blank"}
- [Choose Branch](/integrations/builtin/core-nodes/n8n-nodes-base.merge.md#choose-branch){:target="_blank"}

Notice that Combine > Merge by Fields requires you enter input fields to match on. These fields should contain identical values between the data sources so n8n can properly match data together. In the **Merge node**, they're called `Input 1 Field` and `Input 2 Field`.

<figure><img src="/_images/courses/level-two/chapter-three/explanation_mergepropertyinput.png" alt="Property Input fields in the Merge node" style="width:100%"><figcaption align = "center"><i>Property Input fields in the Merge node</i></figcaption></figure>

/// warning | Property Input in dot notation
If you want to reference nested values in the **Merge node** parameters `Input 1 Field` and `Input 2 Field`, you need to enter the property key in dot-notation format (as text, not as an expression).
///

/// note
You can also find the **Merge node** under the alias Join. This might be more intuitive if you're familiar with SQL joins.
///

### Merge Exercise

Build a workflow that merges data from the Customer Datastore node and Code node.

1. Add a **Merge node** that takes `Input 1` from a **Customer Datastore node** and `Input 2` from a **Code node**.
2. In the **Customer Datastore node**, run the operation **Get All People**.
3. In the **Code node**, create an array of two objects with three properties: `name`, `language`, and `country`, where the property `country` has two sub-properties `code` and `name`.
	- Fill out the values of these properties with the information of two characters from the Customer Database.
	- For example, Jay Gatsby's language is English and country name is United States.
4. In the **Merge node**, try out different merge options.

??? note "Show me the solution"

	The workflow for this exercise looks like this:

	<figure><img src="/_images/courses/level-two/chapter-three/exercise_merge.png" alt="Workflow exercise for merging data" style="width:100%"><figcaption align = "center"><i>Workflow exercise for merging data</i></figcaption></figure>

	If you merge data with the option **Keep Matches** using the name as the input fields to match, the result should look like this (note this example only contains Jay Gatsby; yours might look different depending on which characters you selected):

	<figure><img src="/_images/courses/level-two/chapter-three/exercise_merge_kkm.png" alt="Output of Merge node with option to keep matches" style="width:100%"><figcaption align = "center"><i>Output of Merge node with option to keep matches</i></figcaption></figure>

	To check the configuration of the nodes, you can copy the JSON workflow code below and paste it into your Editor UI:

	```json
	{
	"meta": {
		"templateCredsSetupCompleted": true,
		"instanceId": "cb484ba7b742928a2048bf8829668bed5b5ad9787579adea888f05980292a4a7"
	},
	"nodes": [
		{
		"parameters": {
			"mode": "combine",
			"mergeByFields": {
			"values": [
				{
				"field1": "name",
				"field2": "name"
				}
			]
			},
			"options": {}
		},
		"id": "578365f3-26dd-4fa6-9858-f0a5fdfc413b",
		"name": "Merge",
		"type": "n8n-nodes-base.merge",
		"typeVersion": 2.1,
		"position": [
			720,
			580
		]
		},
		{
		"parameters": {},
		"id": "71aa5aad-afdf-4f8a-bca0-34450eee8acc",
		"name": "When clicking \"Execute workflow\"",
		"type": "n8n-nodes-base.manualTrigger",
		"typeVersion": 1,
		"position": [
			260,
			560
		]
		},
		{
		"parameters": {
			"operation": "getAllPeople"
		},
		"id": "497174fe-3cab-4160-8103-78b44efd038d",
		"name": "Customer Datastore (n8n training)",
		"type": "n8n-nodes-base.n8nTrainingCustomerDatastore",
		"typeVersion": 1,
		"position": [
			500,
			460
		]
		},
		{
		"parameters": {
			"jsCode": "return [\n  {\n    'name': 'Jay Gatsby',\n    'language': 'English',\n    'country': {\n      'code': 'US',\n      'name': 'United States'\n    }\n    \n  }\n  \n];"
		},
		"id": "387e8a1e-e796-4f05-8e75-7ce25c786c5f",
		"name": "Code",
		"type": "n8n-nodes-base.code",
		"typeVersion": 2,
		"position": [
			500,
			720
		]
		}
	],
	"connections": {
		"When clicking \"Execute workflow\"": {
		"main": [
			[
			{
				"node": "Customer Datastore (n8n training)",
				"type": "main",
				"index": 0
			},
			{
				"node": "Code",
				"type": "main",
				"index": 0
			}
			]
		]
		},
		"Customer Datastore (n8n training)": {
		"main": [
			[
			{
				"node": "Merge",
				"type": "main",
				"index": 0
			}
			]
		]
		},
		"Code": {
		"main": [
			[
			{
				"node": "Merge",
				"type": "main",
				"index": 1
			}
			]
		]
		}
	},
	"pinData": {}
	}
	```


## Looping

In some cases, you might need to perform the same operation on each element of an array or each data item (for example sending a message to every contact in your address book). In technical terms, you need to iterate through the data (with loops).

n8n generally handles this repetitive processing automatically, as the nodes run once for each item, so you don't need to build loops into your workflows.

However, there are some [exceptions of nodes and operations](/flow-logic/looping.md#node-exceptions){:target="_blank"} that will require you to build a loop into your workflow.

To [create a loop in an n8n workflow](/flow-logic/looping.md#using-loops-in-n8n){:target="_blank"}, you need to connect the output of one node to the input of a previous node, and add an **If node** to check when to stop the loop.

## Splitting data in batches

If you need to process large volumes of incoming data, execute the **Code node** multiple times, or avoid API rate limits, it's best to split the data into batches (groups) and process these batches.

For these processes, use the [**Loop Over Items node**](/integrations/builtin/core-nodes/n8n-nodes-base.splitinbatches.md){:target="_blank"}. This node splits input data into a specified batch size and, with each iteration, returns a predefined amount of data.

/// warning | Execution of Loop Over Items node
The **Loop Over Items node** stops executing after all the incoming items get divided into batches and passed on to the next node in the workflow, so it's not necessary to add an **If node** to stop the loop.
///

### Loop/Batch Exercise

Build a workflow that reads the RSS feed from Medium and dev.to. The workflow should consist of three nodes:

1. A **Code node** that returns the URLs of the RSS feeds of Medium (`https://medium.com/feed/n8n-io`) and dev.to (`https://dev.to/feed/n8n`).
2. A **Loop Over Items node** with `Batch Size: 1`, that takes in the inputs from the **Code node** and **RSS Read node** and iterates over the items.
3. An **RSS Read node** that gets the URL of the Medium RSS feed, passed as an expression: `{{ $json.url }}`.
	- The **RSS Read node** is one of the [exception nodes](/flow-logic/looping.md#node-exceptions){:target="_blank"} which processes only the first item it receives, so the **Loop Over Items node** is necessary for iterating over multiple items.

??? note "Show me the solution"

	1. Add a **Code Node**. You can format the code in several ways, one way is:
		- Set **Mode** to `Run Once for All Items`.
		- Set **Language** to `JavaScript`.
		- Copy the code below and paste it into the JavaScript Code editor:
			```javascript
			let urls = [
				{
					json: {
					url: 'https://medium.com/feed/n8n-io'
					}
				},
				{
				json: {
					url: 'https://dev.to/feed/n8n'
					} 
				}
			]
			return urls;
			```
	2. Add a **Loop Over Items node** connected to the **Code node**.
		- Set **Batch Size** to `1`.
	3. The **Loop Over Items node** automatically adds a node called "Replace Me". Replace that node with an **RSS Read node**.
		- Set the **URL** to use the url from the Code Node: `{{ $json.url }}`.
	
	The workflow for this exercise looks like this:

	<figure><img src="/_images/courses/level-two/chapter-three/exercise_splitinbatches.png" alt="Workflow for getting RSS feeds from two blogs" style="width:100%"><figcaption align = "center"><i>Workflow for getting RSS feeds from two blogs</i></figcaption></figure>

	To check the configuration of the nodes, you can copy the JSON workflow code below and paste it into your Editor UI:

	```json
	{
	"meta": {
		"templateCredsSetupCompleted": true,
		"instanceId": "cb484ba7b742928a2048bf8829668bed5b5ad9787579adea888f05980292a4a7"
	},
	"nodes": [
		{
		"parameters": {},
		"id": "ed8dc090-ae8c-4db6-a93b-0fa873015c25",
		"name": "When clicking \"Execute workflow\"",
		"type": "n8n-nodes-base.manualTrigger",
		"typeVersion": 1,
		"position": [
			460,
			460
		]
		},
		{
		"parameters": {
			"jsCode": "let urls = [\n  {\n    json: {\n      url: 'https://medium.com/feed/n8n-io'\n    }\n  },\n  {\n   json: {\n     url: 'https://dev.to/feed/n8n'\n   } \n  }\n]\n\nreturn urls;"
		},
		"id": "1df2a9bf-f970-4e04-b906-92dbbc9e8d3a",
		"name": "Code",
		"type": "n8n-nodes-base.code",
		"typeVersion": 2,
		"position": [
			680,
			460
		]
		},
		{
		"parameters": {
			"options": {}
		},
		"id": "3cce249a-0eab-42e2-90e3-dbdf3684e012",
		"name": "Loop Over Items",
		"type": "n8n-nodes-base.splitInBatches",
		"typeVersion": 3,
		"position": [
			900,
			460
		]
		},
		{
		"parameters": {
			"url": "={{ $json.url }}",
			"options": {}
		},
		"id": "50e1c1dc-9a5d-42d3-b7c0-accc31636aa6",
		"name": "RSS Read",
		"type": "n8n-nodes-base.rssFeedRead",
		"typeVersion": 1,
		"position": [
			1120,
			460
		]
		}
	],
	"connections": {
		"When clicking \"Execute workflow\"": {
		"main": [
			[
			{
				"node": "Code",
				"type": "main",
				"index": 0
			}
			]
		]
		},
		"Code": {
		"main": [
			[
			{
				"node": "Loop Over Items",
				"type": "main",
				"index": 0
			}
			]
		]
		},
		"Loop Over Items": {
		"main": [
			null,
			[
			{
				"node": "RSS Read",
				"type": "main",
				"index": 0
			}
			]
		]
		},
		"RSS Read": {
		"main": [
			[
			{
				"node": "Loop Over Items",
				"type": "main",
				"index": 0
			}
			]
		]
		}
	},
	"pinData": {}
	}
	```
