---
contentType: tutorial
---

# Merging and splitting data

In this chapter, you will learn how to merge and split data, and in what cases it might be useful to perform these operations.


## Merging data

In some cases, you might need to merge (combine) and process data from different sources.

Merging data can involve:

- Creating one data set from multiple sources.
- Synchronizing data between multiple systems. For example, removing duplicate data, or updating data in one system when it changes in another.

/// note | One-way vs. two-way sync
In a one-way sync, data is synchronized in one direction. One system serves as the single source of truth. When information changes in that main system, it automatically changes in the secondary system; but if information changes in the secondary system, the changes aren't reflected in the main system.

In a two-way sync, data is synchronized in both directions (between both systems). When information changes in either of the two systems, it automatically changes in the other one as well.

[This blog tutorial](https://n8n.io/blog/how-to-sync-data-between-two-systems/) explains how to sync data one-way and two-way between two CRMs.
///


In n8n, you can merge data from two different nodes using the [Merge node](/integrations/builtin/core-nodes/n8n-nodes-base.merge/){:target="_blank" .external}, which provides several merging modes:

- Combine (Merge by Fields, Merge by Position and Multiplex)
- Append
- Choose Branch

Notice that Combine/Merge by Fields mode requires a key. This key represents a common property between the two data sources, based on which the data can be merged. In the Merge node, they're called `Input 1 Field` and `Input 2 Field`.

<figure><img src="/_images/courses/level-two/chapter-three/explanation_mergepropertyinput.png" alt="" style="width:100%"><figcaption align = "center"><i>Property Input fields in the Merge node</i></figcaption></figure>

/// warning | Property Input in dot notation
If you want to reference nested values in the *Merge node* parameters `Input 1 Field` and `Input 2 Field`, you need to enter the property key in dot-notation format (as text, not as an expression).
///

/// note
You can also find the Merge node under the alias Join. This might be more intuitive if you're familiar with SQL joins.
///

### Exercise

Build a workflow that merges data from the Customer Datastore node and Code node.

* Add a Merge node that takes Input 1 from a Customer Datastore node and Input 2 from a Code node.
* In the Customer Datastore node, run the operation Get All People.
* In the Code node, create an array of two objects with three properties: `name`, `language`, and `country`, where the property `country` has two sub-properties `code` and `name`. Fill out the values of these properties with the information of two characters from the Customer Database. For example, Jay Gatsby's language would be English and country name would be United States.
* In the Merge node, try out different merge modes.

??? note "Show me the solution"

	The workflow for this exercise looks like this:

	<figure><img src="/_images/courses/level-two/chapter-three/exercise_merge.png" alt="" style="width:100%"><figcaption align = "center"><i>Workflow exercise for merging data</i></figcaption></figure>

	If you merge data with the option *Keep Key Matches* using the country code as the common key, the result should look like this:

	<figure><img src="/_images/courses/level-two/chapter-three/exercise_merge_kkm.png" alt="" style="width:100%"><figcaption align = "center"><i>Output of Merge node with option to keep key matches</i></figcaption></figure>

	To check the configuration of the nodes, you can copy-paste the JSON code of the workflow:

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
		"name": "When clicking \"Test workflow\"",
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
		"When clicking \"Test workflow\"": {
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

In some cases, you might need to perform the same operation on each element of an array / each data item (for example sending a message to every contact in your address book). In technical terms, you need to iterate through the data (with loops).


n8n handles this repetitive processing automatically, as the nodes run once for each item, so you don't need to build loops into your workflows. However, there are some [exceptions of nodes and operations](/flow-logic/looping/#node-exceptions){:target="_blank" .external} for which you need to build a loop into your workflow.

To [create a loop in an n8n workflow](/flow-logic/looping/#using-loops-in-n8n){:target="_blank" .external}, you need to connect the output of one node to the input of a previous node, and add an IF node to check when to stop the loop.

## Splitting data in batches

If you need to process large incoming data, execute the Code node multiple times, or avoid API rate limits, it's best to split the data into batches (groups) and process these batches. You can do this with the [Loop Over Items node](/integrations/builtin/core-nodes/n8n-nodes-base.splitinbatches/){:target="_blank" .external}. This node splits input data into a specified batch size and, with each iteration, returns a predefined amount of data.

/// warning | Execution of Loop Over Items node
The Loop Over Items node stops executing after all the incoming items get divided into batches and passed on to the next node in the workflow, so it's not necessary to add an IF node to stop the loop.
///

### Exercise

Build a workflow that reads the RSS feed from Medium and dev.to. The workflow should consist of three nodes:

- A Code node that returns the URLs of the RSS feeds of Medium (`https://medium.com/feed/n8n-io`) and dev.to (`https://dev.to/feed/n8n`)
- A Loop Over Items node with `Batch Size: 1`, that takes in the inputs from the Code node and RSS node and iterates over the items.
- An RSS Read node that gets the URL of the Medium RSS feed, passed as an expression: `{{$node["SplitInBatches"].json["url"]}}`. The RSS Read node is one of the exception nodes which processes only the first item it receives, so the Loop Over Items node is necessary for iterating over multiple items.

??? note "Show me the solution"

	The workflow for this exercise looks like this:

	<figure><img src="/_images/courses/level-two/chapter-three/exercise_splitinbatches.png" alt="" style="width:100%"><figcaption align = "center"><i>Workflow for getting RSS feeds from two blogs</i></figcaption></figure>

	To check the configuration of the nodes, you can copy-paste the JSON code of the workflow:

	```json
	{
	"meta": {
		"templateCredsSetupCompleted": true,
		"instanceId": "cb484ba7b742928a2048bf8829668bed5b5ad9787579adea888f05980292a4a7"
	},
	"nodes": [
		{
		"parameters": {
			"jsCode": "return [\n  {\n    url: 'https://medium.com/feed/n8n-io'\n  },\n  {\n    url: 'https://dev.to/feed/n8n'\n  }\n]"
		},
		"name": "Code",
		"type": "n8n-nodes-base.code",
		"position": [
			1040,
			620
		],
		"typeVersion": 1,
		"id": "185f7192-e865-41ca-8fbb-8028b2b0a144"
		},
		{
		"parameters": {
			"url": "={{$node[\"SplitInBatches\"].json[\"url\"]}}",
			"options": {}
		},
		"name": "RSS Feed Read",
		"type": "n8n-nodes-base.rssFeedRead",
		"position": [
			1440,
			620
		],
		"typeVersion": 1,
		"id": "8554f602-f845-49d4-8557-594b3828f94c"
		},
		{
		"parameters": {
			"batchSize": 1,
			"options": {}
		},
		"name": "SplitInBatches",
		"type": "n8n-nodes-base.splitInBatches",
		"position": [
			1240,
			620
		],
		"typeVersion": 1,
		"id": "0e0b14e3-45d4-4782-9e71-c92201b214e8"
		},
		{
		"parameters": {},
		"id": "3472e42c-05ac-4cdf-89b7-0c3e6a9a667a",
		"name": "When clicking \"Test workflow\"",
		"type": "n8n-nodes-base.manualTrigger",
		"typeVersion": 1,
		"position": [
			840,
			620
		]
		}
	],
	"connections": {
		"Code": {
		"main": [
			[
			{
				"node": "SplitInBatches",
				"type": "main",
				"index": 0
			}
			]
		]
		},
		"RSS Feed Read": {
		"main": [
			[
			{
				"node": "SplitInBatches",
				"type": "main",
				"index": 0
			}
			]
		]
		},
		"SplitInBatches": {
		"main": [
			[
			{
				"node": "RSS Feed Read",
				"type": "main",
				"index": 0
			}
			]
		]
		},
		"When clicking \"Test workflow\"": {
		"main": [
			[
			{
				"node": "Code",
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
