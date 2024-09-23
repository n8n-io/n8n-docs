---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Loop Over Items (Split in Batches)
description: Documentation for the Loop Over Items node in n8n, a workflow automation platform. Includes guidance on usage, and links to examples.
contentType: integration
priority: critical
---

# Loop Over Items

The Loop Over Items node helps you loop through data.

The node saves the original incoming data, and with each iteration, returns a predefined amount of data through the **loop** output.

When the node execution completes, it combines all the data and returns it through the **done** output.

## Node parameters

### Batch Size

Enter the number of items to return with each call.

## Node options

### Reset

If turned on, the node will reset with the current input-data newly initialized with each loop.

/// note | Check if you need this node
n8n automatically processes incoming items. You may not need the Loop Over Items node in your workflow. To learn more about how n8n handles multiple items, refer to the documentation on [Looping in n8n](/flow-logic/looping/).
///

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'split-in-batches') ]]

### Read RSS feed from two different sources

This workflow allows you to read an RSS feed from two different sources using the Loop Over Items node. You need the Loop Over Items node in the workflow as the RSS Feed Read node only processes the first item it receives. You can also find the [workflow](https://n8n.io/workflows/687-read-rss-feed-from-two-different-sources/){:target=_blank .external-link} on n8n.io.

The example walks through building the workflow, but assumes you are already familiar with n8n. To build your first workflow, including learning how to add nodes to a workflow, refer to [Try it out](/try-it-out/).

The final workflow looks like this:

![A workflow with the Loop Over Items node](/_images/integrations/builtin/core-nodes/splitinbatches/workflow.png)

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
4. Add the Loop Over Items node.
5. Configure Loop Over Items: set the batch size to `1` in the **Batch Size** field.
6. Add the RSS Feed Read node.
7. Select **Test Workflow**. This runs the workflow to load data into the RSS Feed Read node.
8. Configure RSS Feed Read: map `url` from the input to the **URL** field. You can do this by dragging and dropping from the **INPUT** panel, or using this expression: `{{ $json.url }}`.
9. Select **Test Workflow** to run the workflow and see the resulting data.

### Check that the node has processed all items

To check if the node still has items to process, use the following expression: `{{$node["Loop Over Items"].context["noItemsLeft"]}}`. This expression returns a boolean value. If the node still has data to process, the expression returns `false`, otherwise it returns `true`.

### Get the current running index of the node

To get the current running index of the node, use the following expression: `{{$node["Loop Over Items"].context["currentRunIndex"];}}`.

