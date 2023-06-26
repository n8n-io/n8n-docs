---
title: Split In Batches
description: Documentation for the Split In Batches node in n8n, a workflow automation platform. Includes guidance on usage, and links to examples.
---

# Split In Batches

The Split In Batches node helps you loop through data.

The node saves the original incoming data, and with each iteration, returns a predefined amount of data through the **loop** output.

When the node execution completes, it combines all the data and returns it through the **done** output.

!!! note "Examples and templates"
	For usage examples and templates to help you get started, refer to n8n's [Split In Batches integrations](https://n8n.io/integrations/split-in-batches/){:target=_blank .external-link} list.

## Node reference

- **Batch Size**: the number of items to return with each call.
- **Options**:
    - **Reset:** if set to true, the node will reset.

!!! note "Check if you need this node"
    n8n automatically processes incoming items. You may not need the SplitInBatches node in your workflow. To learn more about how n8n handles multiple items, refer to the documentation on [Looping in n8n](/flow-logic/looping/).


## Example usage: Read RSS feed from two different sources

This workflow allows you to read an RSS feed from two different sources using the Split In Batches node. You need the Split in Batches node in the workflow as the RSS Feed Read node only processes the first item it receives. You can also find the [workflow](https://n8n.io/workflows/687){:target=_blank .external-link} on n8n.io.

The example walks through building the workflow, but assumes you are already familiar with n8n. To build your first workflow, including learning how to add nodes to a workflow, refer to [Try it out](/try-it-out/).

The final workflow looks like this:

![A workflow with the Split In Batches node](/_images/integrations/builtin/core-nodes/splitinbatches/workflow.png)

1. Add the manual trigger.
2. Add the Code node.
3. Copy this code into the Code node:
	```js
	return [
		{
			json: {
				url: 'https://medium.com/feed/n8n-io',
			}
		},
		{
			json: {
				url: 'https://dev.to/feed/n8n',
			}
		}
	];
	```
4. Add the SplitInBatches node.
5. Configure SplitInBatches: set the batch size to `1` in the **Batch Size** field.
6. Add the RSS Feed Read node.
7. Select **Execute Workflow**. This runs the workflow to load data into the RSS Feed Read node.
8. Configure RSS Feed Read: map `url` from the input to the **URL** field. You can do this by dragging and dropping from the **INPUT** panel, or using this expression: `{{ $json.url }}`.
9. Select **Execute Workflow** to run the workflow and see the resulting data.


## Check that the node has processed all items

To check if the node still has items to process, use the following expression: `{{ $node["Example Split In Batches"].context["done"] }}`. This expression returns a boolean value. If the node still has data to process, the expression returns `false`, otherwise it returns `true`.

This workflow gives an example of how to use this to handle a double loop:

!["Screenshot of workflow"](/_images/integrations/builtin/core-nodes/splitinbatches/context-done.png)

To try the example, copy the workflow JSON and paste it into a new workflow in your n8n instance.

??? Details "View and copy workflow JSON"
		{
			"name": "new looping",
			"nodes": [
				{
					"parameters": {},
					"id": "8995a8f8-9389-4af4-816e-8f65ecbe35bf",
					"name": "When clicking \"Execute Workflow\"",
					"type": "n8n-nodes-base.manualTrigger",
					"typeVersion": 1,
					"position": [
						-400,
						480
					]
				},
				{
					"parameters": {
						"batchSize": 1,
						"options": {}
					},
					"id": "ee352704-79bc-4ef0-a10e-0720c793bad6",
					"name": "Split In Batches 1",
					"type": "n8n-nodes-base.splitInBatches",
					"typeVersion": 2,
					"position": [
						100,
						480
					]
				},
				{
					"parameters": {
						"batchSize": 1,
						"options": {
							"reset": "={{ $node[\"Split In Batches 1_2\"].context[\"done\"] }}"
						}
					},
					"id": "4b4bf98f-6160-4012-8efb-01bff9841d61",
					"name": "Split In Batches 1_2",
					"type": "n8n-nodes-base.splitInBatches",
					"typeVersion": 2,
					"position": [
						720,
						540
					]
				},
				{
					"parameters": {
						"jsCode": "return [\n  {\n    key: '0'\n  },\n  {\n    key: '1'\n  }\n];"
					},
					"id": "79872500-12f6-4e30-bb4a-bade0cbf0045",
					"name": "Mock Data 1",
					"type": "n8n-nodes-base.code",
					"typeVersion": 1,
					"position": [
						-120,
						480
					]
				},
				{
					"parameters": {
						"jsCode": "return [\n  {\n    key: '10_' + $runIndex\n  },\n  {\n    key: '11_' + $runIndex\n  },\n  {\n    key: '12_' + $runIndex\n  },\n  {\n    key: '13_' + $runIndex\n  },\n  {\n    key: '14_' + $runIndex\n  },\n];"
					},
					"id": "3cc46b21-9991-46d6-bb78-628dfbed5d0d",
					"name": "Mock Data 1_2",
					"type": "n8n-nodes-base.code",
					"typeVersion": 1,
					"position": [
						460,
						460
					]
				},
				{
					"parameters": {},
					"id": "f63a6ee3-e519-4c76-80fb-851567a77d95",
					"name": "Some Operation 1",
					"type": "n8n-nodes-base.noOp",
					"typeVersion": 1,
					"position": [
						980,
						520
					]
				},
				{
					"parameters": {},
					"id": "6c4e22c9-9255-4c60-8b7d-dd3e6809266c",
					"name": "Final Result",
					"type": "n8n-nodes-base.noOp",
					"typeVersion": 1,
					"position": [
						420,
						860
					]
				},
				{
					"parameters": {
						"content": "## Uses context[\"done\"]\n\nThis node uses `{{ $node[\"Split In Batches 1_2\"].context[\"done\"] }}` to reset the loop.",
						"height": 481
					},
					"id": "be457cd1-3994-4972-9eec-59911393423b",
					"name": "Sticky Note",
					"type": "n8n-nodes-base.stickyNote",
					"typeVersion": 1,
					"position": [
						660,
						246
					]
				}
			],
			"pinData": {},
			"connections": {
				"When clicking \"Execute Workflow\"": {
					"main": [
						[
							{
								"node": "Mock Data 1",
								"type": "main",
								"index": 0
							}
						]
					]
				},
				"Split In Batches 1": {
					"main": [
						[
							{
								"node": "Mock Data 1_2",
								"type": "main",
								"index": 0
							}
						],
						[
							{
								"node": "Final Result",
								"type": "main",
								"index": 0
							}
						]
					]
				},
				"Split In Batches 1_2": {
					"main": [
						[
							{
								"node": "Some Operation 1",
								"type": "main",
								"index": 0
							}
						],
						[
							{
								"node": "Split In Batches 1",
								"type": "main",
								"index": 0
							}
						]
					]
				},
				"Mock Data 1": {
					"main": [
						[
							{
								"node": "Split In Batches 1",
								"type": "main",
								"index": 0
							}
						]
					]
				},
				"Mock Data 1_2": {
					"main": [
						[
							{
								"node": "Split In Batches 1_2",
								"type": "main",
								"index": 0
							}
						]
					]
				},
				"Some Operation 1": {
					"main": [
						[
							{
								"node": "Split In Batches 1_2",
								"type": "main",
								"index": 0
							}
						]
					]
				}
			},
			"active": false,
			"settings": {},
			"versionId": "7cedf088-56ad-45a1-8a38-ba0d07ffd3da",
			"id": "tJfiMTf9MajB63tE",
			"meta": {
				"instanceId": "bd0e051174def82b88b5cd547222662900558d74b239c4048ea0f6b7ed61c642"
			},
			"tags": []
		}

## Get the current running index of the node

To get the current running index of the node, use the following expression: `{{$node["SplitInBatches"].context["currentRunIndex"];}}`.



