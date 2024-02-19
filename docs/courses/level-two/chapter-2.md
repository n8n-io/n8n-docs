---
contentType: tutorial
---

# Processing different data types

In this chapter, you will learn how to process different types of data using [n8n core nodes](/workflows/components/nodes/).


## HTML and XML data

You're most likely familiar with HTML and XML.

/// note | HTML vs. XML
HTML is a markup language used to describe the structure and semantics of a web page. XML looks similar to HTML, but the tag names are different, as they describe the kind of data they hold.
///
If you need to process HTML or XML data in your n8n workflows, use the [HTML node](/integrations/builtin/core-nodes/n8n-nodes-base.html/) or [XML node](/integrations/builtin/core-nodes/n8n-nodes-base.xml/).

Use the HTML node to extract HTML content of a webpage, by referencing CSS selectors. This is useful if you want to collect structured information from a website (web-scraping).

### Exercise

Let's get the title of the latest n8n blog post. Use the HTTP Request node to make a GET request to the URL `https://blog.n8n.io/`. Then, connect an HTML node and configure it to extract the title of the first post on the page.

??? note "Show me the solution"

	Configure the HTTP Request node with the following parameters:

	- Authentication: None
	- Request Method: GET
	- URL: https://blog.n8n.io/

	The result should look like this:

	<figure><img src="/_images/courses/level-two/chapter-two/exercise_html_httprequestnode.png" alt="" style="width:100%"><figcaption align = "center"><i>Result of HTTP Request node</i></figcaption></figure>

	Connect an HTML node to the HTTP Request node and configure the former's parameters:

	* Operation: Extract HTML Content
	* Source Data: JSON
	* JSON Property: data
	* Extraction Values:  
		* Key: title
		* CSS Selector: .item-title  a
		* Return Value: HTML

	You can add more values to extract more data.

	The result should look like this:

	<figure><img src="/_images/courses/level-two/chapter-two/exercise_html_htmlextractnode.png" alt="" style="width:100%"><figcaption align = "center"><i>Result of HTML Extract node</i></figcaption></figure>
	</details>


Use the XML node to convert XML to JSON and JSON to XML. This operation is useful if you work with different web services that use either XML or JSON, and need to get and submit data between them in the two formats.

### Exercise

In a previous exercise, you used an HTTP Request node to make a request to an API. Now, use the XML node to convert the JSON output to XML.

??? note "Show me the solution"

	Get data from the Quotable API using the HTTP Request node and connect an XML node to it with the following parameters:

	- Mode: **JSON to XML**
	- Property name: **data**

	The result should look like this:

	<figure><img src="/_images/courses/level-two/chapter-two/exercise_html_xmlnode_table.png" alt="" style="width:100%"><figcaption align = "center"><i>XML node (JSON to XML) – Table View</i></figcaption></figure>

	To transform data the other way around, select the mode **XML to JSON**.


## Date, time, and interval data

Date and time data types include `DATE`, `TIME`, `DATETIME`, `TIMESTAMP`, and `YEAR`. The dates and times can be passed in different formats, for example:
<!-- vale off -->
- `DATE`: March 29 2022, 29-03-2022, 2022/03/29 
- `TIME`: 08:30:00, 8:30, 20:30
- `DATETIME`: 2022/03/29 08:30:00
- `TIMESTAMP`: 1616108400 (Unix timestamp), 1616108400000 (Unix ms timestamp)
- `YEAR`: 2022, 22
<!-- vale on -->
If you need to convert date and time data to different formats, and calculate dates, use the [Date & Time node](/integrations/builtin/core-nodes/n8n-nodes-base.datetime/).

You can also schedule workflows to run at a specific time, interval, or duration, using the [Schedule Trigger](/integrations/builtin/core-nodes/n8n-nodes-base.scheduletrigger/) node.


In some cases, you might need to pause the workflow execution. This might be necessary, for example, if you know that a service doesn't process the data instantly or it's generally slower, so you don't want the incomplete data to be passed to the next node. In this case, you can use the [Wait node](/integrations/builtin/core-nodes/n8n-nodes-base.wait/) after the node that you want to delay. The Wait node pauses the workflow execution and resumes it at a specific time, after a time interval, or on a webhook call.


### Exercise

Build a workflow that adds five days to an input date. Then, if the calculated date occurred after 1959, the workflow waits 1 minute before [setting](/integrations/builtin/core-nodes/n8n-nodes-base.set/) the calculated date as a value. The workflow should be triggered every 30 minutes.

??? note "Show me the solution"

	You can build this workflow using the data from the *Customer Datastore node*, the three nodes for managing date and time, an *IF node* for conditional routing, and a *Set node* for setting the new calculated date. You can add a [Manual Trigger node](/integrations/builtin/core-nodes/n8n-nodes-base.manualworkflowtrigger/) too for easy testing during development. The workflow looks like this:

	<figure><img src="/_images/courses/level-two/chapter-two/exercise_datetime.png" alt="" style="width:100%"><figcaption align = "center"><i>Workflow for transforming dates</i></figcaption></figure>

	To check the configuration of each node, you can copy the JSON code of this workflow and paste it in your Editor UI.

	```json
	{
	"meta": {
		"templateCredsSetupCompleted": true,
		"instanceId": "cb484ba7b742928a2048bf8829668bed5b5ad9787579adea888f05980292a4a7"
	},
	"nodes": [
		{
		"parameters": {},
		"id": "c2c4509b-c4d4-4e95-bd7d-039734954b68",
		"name": "When clicking \"Test workflow\"",
		"type": "n8n-nodes-base.manualTrigger",
		"typeVersion": 1,
		"position": [
			260,
			2080
		]
		},
		{
		"parameters": {
			"action": "calculate",
			"value": "={{$json[\"created\"]}}",
			"duration": 5,
			"dataPropertyName": "new-date",
			"options": {}
		},
		"name": "Date & Time",
		"type": "n8n-nodes-base.dateTime",
		"typeVersion": 1,
		"position": [
			660,
			2160
		],
		"id": "61b56e39-021f-4ad0-b72c-697978c4f384"
		},
		{
		"parameters": {
			"unit": "minutes"
		},
		"name": "Wait",
		"type": "n8n-nodes-base.wait",
		"typeVersion": 1,
		"position": [
			1040,
			2160
		],
		"webhookId": "d17effb8-ad90-4a74-bb88-daa3d3d18583",
		"id": "842b788f-c236-4c67-bad0-155de7ef1be4"
		},
		{
		"parameters": {
			"conditions": {
			"dateTime": [
				{
				"value1": "={{$json[\"new-date\"]}}",
				"value2": "1960-01-01T00:00:00"
				}
			]
			}
		},
		"name": "IF",
		"type": "n8n-nodes-base.if",
		"typeVersion": 1,
		"position": [
			840,
			2160
		],
		"id": "ce788b41-ba4c-41cd-85da-6bf23baa76aa"
		},
		{
		"parameters": {
			"values": {
			"string": [
				{
				"name": "outputValue",
				"value": "={{ $('IF').item.json['new-date'] }}"
				}
			]
			},
			"options": {}
		},
		"name": "Set",
		"type": "n8n-nodes-base.set",
		"typeVersion": 1,
		"position": [
			1220,
			2160
		],
		"id": "df3e455c-5c5e-42af-ad5c-a9bb6869a921"
		},
		{
		"parameters": {
			"operation": "getAllPeople",
			"returnAll": true
		},
		"name": "Customer Datastore",
		"type": "n8n-nodes-base.n8nTrainingCustomerDatastore",
		"typeVersion": 1,
		"position": [
			480,
			2160
		],
		"id": "1f3573f7-1586-4e9a-9cbf-9eb7c7475b27"
		},
		{
		"parameters": {
			"rule": {
			"interval": [
				{
				"field": "minutes",
				"minutesInterval": 30
				}
			]
			}
		},
		"id": "c3ce4d5e-524b-4806-9c25-43892113b5eb",
		"name": "Schedule Trigger",
		"type": "n8n-nodes-base.scheduleTrigger",
		"typeVersion": 1.1,
		"position": [
			260,
			2260
		]
		}
	],
	"connections": {
		"When clicking \"Test workflow\"": {
		"main": [
			[
			{
				"node": "Customer Datastore",
				"type": "main",
				"index": 0
			}
			]
		]
		},
		"Date & Time": {
		"main": [
			[
			{
				"node": "IF",
				"type": "main",
				"index": 0
			}
			]
		]
		},
		"Wait": {
		"main": [
			[
			{
				"node": "Set",
				"type": "main",
				"index": 0
			}
			]
		]
		},
		"IF": {
		"main": [
			[
			{
				"node": "Wait",
				"type": "main",
				"index": 0
			}
			]
		]
		},
		"Customer Datastore": {
		"main": [
			[
			{
				"node": "Date & Time",
				"type": "main",
				"index": 0
			}
			]
		]
		},
		"Schedule Trigger": {
		"main": [
			[
			{
				"node": "Customer Datastore",
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


## Binary data

Up to now, you have mainly worked with text data. But what if you want to process data that's not text? For example, images or PDF files. This is binary data, as it's represented in the binary numeral system. In this form, binary data doesn't offer you useful information, so it needs to be converted into a readable form.

In n8n, you can process binary data with the following nodes:

- [HTTP Request](/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/) to request and send files from/to web resources and APIs.
- [Read/Write Files from Disk](/integrations/builtin/core-nodes/n8n-nodes-base.filesreadwrite/) to read and write files from/to the machine where n8n is running.
- [Convert to File](/integrations/builtin/core-nodes/n8n-nodes-base.converttofile/) to take input data and output it as a file.
- [Extract From File](/integrations/builtin/core-nodes/n8n-nodes-base.extractfromfile/) to get data from a binary format and convert it to JSON.

/// note | Reading and writing files is only available on self-hosted n8n
Reading and writing files to disk isn't available on n8n Cloud. You'll read and write to the machine where you installed n8n. If you run n8n in Docker, your command runs in the n8n container and not the Docker host. The Read/Write Files From Disk node looks for files relative to the n8n install path. n8n recommends using absolute file paths to prevent any errors.
///

To read or write a binary file, you need to write the path (location) of the file in the node's `File(s) Selector` parameter (for the Read operation), or in the node's `File Path and Name` parameter (for the Write operation).

/// warning | Naming the right path
The file path looks slightly different depending on how you are running n8n:

- npm: `~/my_file.json`
- n8n cloud / Docker: `/tmp/my_file.json`
///



### Exercise

Make an HTTP request to get this PDF file: `https://media.kaspersky.com/pdf/Kaspersky_Lab_Whitepaper_Anti_blocker.pdf.` Then, use the Extract From File node to convert the file from binary to JSON.

??? note "Show me the solution"

	In the HTTP Request node, you should see the PDF file, like this:

	<figure><img src="/_images/courses/level-two/chapter-two/exercise_binarydata_httprequest_file.png" alt="" style="width:100%"><figcaption align = "center"><i>HTTP Request node to get PDF</i></figcaption></figure>

	When you convert the PDF from binary to JSON Extract From File node, the result should look like this:

	<figure><img src="/_images/courses/level-two/chapter-two/exercise_binarydata_movedata_btoj.png" alt="" style="width:100%"><figcaption align = "center"><i>Extract From File node</i></figcaption></figure>

	To check the configuration of the nodes, you can copy-paste the JSON code of the workflow:

	```json
	{
		"name": "Binary to JSON",
		"nodes": [
			{
			"parameters": {},
			"id": "78639a25-b69a-4b9c-84e0-69e045bed1a3",
			"name": "When clicking \"Execute Workflow\"",
			"type": "n8n-nodes-base.manualTrigger",
			"typeVersion": 1,
			"position": [
				480,
				520
			]
			},
			{
			"parameters": {
				"url": "https://media.kaspersky.com/pdf/Kaspersky_Lab_Whitepaper_Anti_blocker.pdf",
				"options": {}
			},
			"id": "a11310df-1287-4e9a-b993-baa6bd4265a6",
			"name": "HTTP Request",
			"type": "n8n-nodes-base.httpRequest",
			"typeVersion": 4.1,
			"position": [
				700,
				520
			]
			},
			{
			"parameters": {
				"operation": "pdf",
				"options": {}
			},
			"id": "88697b6b-fb02-4c3d-a715-750d60413e9f",
			"name": "Extract From File",
			"type": "n8n-nodes-base.extractFromFile",
			"typeVersion": 1,
			"position": [
				920,
				520
			]
			}
		],
		"pinData": {},
		"connections": {
			"When clicking \"Execute Workflow\"": {
			"main": [
				[
				{
					"node": "HTTP Request",
					"type": "main",
					"index": 0
				}
				]
			]
			},
			"HTTP Request": {
			"main": [
				[
				{
					"node": "Extract From File",
					"type": "main",
					"index": 0
				}
				]
			]
			}
		}
	}
	```



### Exercise

Make an HTTP request to the Poetry DB API `https://poetrydb.org/random/1` and convert the returned data from JSON to binary using the Convert to File node. Then, write the new binary file data to the machine where n8n is running. Finally, to check that it worked out, read the generated binary file from the machine referencing it with an expression in the node.

??? note "Show me the solution"

	The workflow for this exercise looks like this:

	<figure><img src="/_images/courses/level-two/chapter-two/exercise_binarydata.png" alt="" style="width:100%"><figcaption align = "center"><i>Workflow for moving JSON to binary data</i></figcaption></figure>

	To check the configuration of the nodes, you can copy-paste the JSON code of the workflow:

	```json
	{
		"name": "JSON to file and Read-Write",
		"nodes": [
			{
			"parameters": {},
			"id": "78639a25-b69a-4b9c-84e0-69e045bed1a3",
			"name": "When clicking \"Execute Workflow\"",
			"type": "n8n-nodes-base.manualTrigger",
			"typeVersion": 1,
			"position": [
				480,
				520
			]
			},
			{
			"parameters": {
				"url": "https://poetrydb.org/random/1",
				"options": {}
			},
			"id": "a11310df-1287-4e9a-b993-baa6bd4265a6",
			"name": "HTTP Request",
			"type": "n8n-nodes-base.httpRequest",
			"typeVersion": 4.1,
			"position": [
				680,
				520
			]
			},
			{
			"parameters": {
				"operation": "toJson",
				"options": {}
			},
			"id": "06be18f6-f193-48e2-a8d9-35f4779d8324",
			"name": "Convert to File",
			"type": "n8n-nodes-base.convertToFile",
			"typeVersion": 1,
			"position": [
				880,
				520
			]
			},
			{
			"parameters": {
				"operation": "write",
				"fileName": "/tmp/poetrydb.json",
				"options": {}
			},
			"id": "f2048e5d-fa8f-4708-b15a-d07de359f2e5",
			"name": "Read/Write Files from Disk",
			"type": "n8n-nodes-base.readWriteFile",
			"typeVersion": 1,
			"position": [
				1080,
				520
			]
			},
			{
			"parameters": {
				"fileSelector": "={{ $json.fileName }}",
				"options": {}
			},
			"id": "d630906c-09d4-49f4-ba14-416c0f4de1c8",
			"name": "Read/Write Files from Disk1",
			"type": "n8n-nodes-base.readWriteFile",
			"typeVersion": 1,
			"position": [
				1280,
				520
			]
			}
		],
		"pinData": {},
		"connections": {
			"When clicking \"Execute Workflow\"": {
			"main": [
				[
				{
					"node": "HTTP Request",
					"type": "main",
					"index": 0
				}
				]
			]
			},
			"HTTP Request": {
			"main": [
				[
				{
					"node": "Convert to File",
					"type": "main",
					"index": 0
				}
				]
			]
			},
			"Convert to File": {
			"main": [
				[
				{
					"node": "Read/Write Files from Disk",
					"type": "main",
					"index": 0
				}
				]
			]
			},
			"Read/Write Files from Disk": {
			"main": [
				[
				{
					"node": "Read/Write Files from Disk1",
					"type": "main",
					"index": 0
				}
				]
			]
			}
		}
	}
	```
