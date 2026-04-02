---
title: Loop Over Items (Split in Batches)
description: Documentation for the Loop Over Items node in n8n, a workflow automation platform. Includes guidance on usage, and links to examples.
contentType: [integration, reference]
priority: critical
---

# Loop Over Items

The Loop Over Items node helps you loop through data when needed.

The node saves the original incoming data, and with each iteration, returns a predefined amount of data through the **loop** output.

When the node execution completes, it combines all of the processed data and returns it through the **done** output.

## When to use the Loop Over Items node

By default, n8n nodes are designed to process a list of input items (with some exceptions, detailed below). Depending on what you're trying to achieve, you often don't need the Loop Over Items node in your workflow. You can learn more about how n8n processes multiple items on the [looping in n8n](/flow-logic/looping.md) page.

These links highlight some of the cases where the Loop Over Items node can be useful:

* [Loop until all items are processed](/flow-logic/looping.md#loop-until-all-items-are-processed): describes how the Loop Over Items node differs from normal item processing and when you might want to incorporate this node.
* [Node exceptions](/flow-logic/looping.md#node-exceptions): outlines specific cases and nodes where you may need to use the Loop Over Items node to manually build looping logic.
* [Avoiding rate limiting](/integrations/builtin/rate-limits.md): demonstrates how to batch API requests to avoid rate limits from other services.

## Node parameters

### Batch Size

Enter the number of items to return with each call.

## Node options

### Reset

If turned on, the node will reset with the current input-data newly initialized with each loop. Use this when you want the Loop Over Items node to treat incoming data as a new set of data instead of a continuation of previous items.

For example, you can use the Loop Over Items node with the reset option and an [If node](/integrations/builtin/core-nodes/n8n-nodes-base.if.md) to query a paginated service when you don't know how many pages you need in advance. The loop queries pages one at a time, performs any processing, and increments the page number. The loop reset ensures the loop recognizes each iteration as a new set of data. The If node evaluates an exit condition to decide whether to perform another iteration or not.

/// warning | Include a valid termination condition
For workflows like the example described above, it's critical to include a valid termination condition for the loop. If your termination condition never matches, your workflow execution will get stuck in an infinite loop.
///

When enabled, you can adjust the reset conditions by switching the parameter representation from **Fixed** to **Expression**. The results of your expression evaluation determine when the node will reset item processing.

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'split-in-batches') ]]

### Read RSS feed from two different sources

This workflow allows you to read an RSS feed from two different sources using the Loop Over Items node. You need the Loop Over Items node in the workflow as the RSS Feed Read node only processes the first item it receives. You can also find the [workflow](https://n8n.io/workflows/687-read-rss-feed-from-two-different-sources/) on n8n.io.

The example walks through building the workflow, but assumes you are already familiar with n8n. To build your first workflow, including learning how to add nodes to a workflow, refer to [Try it out](/try-it-out/index.md).

The final workflow looks like this:

[[ workflowDemo("file:///integrations/builtin/core-nodes/n8n-nodes-base.splitinbatches/rss-feed-example.json") ]]

Copy the workflow file above and paste into your instance, or manually build it by following these steps:

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
7. Select **Execute Workflow**. This runs the workflow to load data into the RSS Feed Read node.
8. Configure RSS Feed Read: map `url` from the input to the **URL** field. You can do this by dragging and dropping from the **INPUT** panel, or using this expression: `{{ $json.url }}`.
9. Select **Execute Workflow** to run the workflow and see the resulting data.

### Check that the node has processed all items

To check if the node still has items to process, use the following expression: `{{$("Loop Over Items").context["noItemsLeft"]}}`. This expression returns a boolean value. If the node still has data to process, the expression returns `false`, otherwise it returns `true`.

### Get the current running index of the node

To get the current running index of the node, use the following expression: `{{$("Loop Over Items").context["currentRunIndex"];}}`.

