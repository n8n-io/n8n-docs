---
title: Loop Over Items (Split in Batches)
description: >-
  Documentation for the Loop Over Items node in n8n, a workflow automation
  platform. Includes guidance on usage, and links to examples.
contentType:
  - integration
  - reference
priority: critical
nodeTitle: Loop Over Items (Split in Batches)
originalFilePath: integrations/builtin/core-nodes/n8n-nodes-base.splitinbatches.md
originalUrl: >-
  https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.splitinbatches
url: >-
  https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.splitinbatches
layout:
  description:
    visible: false
---

# Loop Over Items <a href="#loop-over-items" id="loop-over-items"></a>

The Loop Over Items node helps you loop through data when needed.

The node saves the original incoming data, and with each iteration, returns a predefined amount of data through the **loop** output.

When the node execution completes, it combines all of the processed data and returns it through the **done** output.

## When to use the Loop Over Items node <a href="#when-to-use-the-loop-over-items-node" id="when-to-use-the-loop-over-items-node"></a>

By default, n8n nodes are designed to process a list of input items (with some exceptions, detailed below). Depending on what you're trying to achieve, you often don't need the Loop Over Items node in your workflow. You can learn more about how n8n processes multiple items on the [looping in n8n](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/flow-logic/loop) page.

These links highlight some of the cases where the Loop Over Items node can be useful:

* [Loop until all items are processed](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/flow-logic/loop#loop-until-all-items-are-processed): describes how the Loop Over Items node differs from normal item processing and when you might want to incorporate this node.
* [Node exceptions](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/flow-logic/loop#node-exceptions): outlines specific cases and nodes where you may need to use the Loop Over Items node to manually build looping logic.
* [Avoiding rate limiting](../handle-rate-limits.md): demonstrates how to batch API requests to avoid rate limits from other services.

## Node parameters <a href="#node-parameters" id="node-parameters"></a>

### Batch Size <a href="#batch-size" id="batch-size"></a>

Enter the number of items to return with each call.

## Node options <a href="#node-options" id="node-options"></a>

### Reset <a href="#reset" id="reset"></a>

If turned on, the node will reset with the current input-data newly initialized with each loop. Use this when you want the Loop Over Items node to treat incoming data as a new set of data instead of a continuation of previous items.

For example, you can use the Loop Over Items node with the reset option and an [If node](n8n-nodes-base.if.md) to query a paginated service when you don't know how many pages you need in advance. The loop queries pages one at a time, performs any processing, and increments the page number. The loop reset ensures the loop recognizes each iteration as a new set of data. The If node evaluates an exit condition to decide whether to perform another iteration or not.

{% hint style="warning" %}
**Include a valid termination condition**

For workflows like the example described above, it's critical to include a valid termination condition for the loop. If your termination condition never matches, your workflow execution will get stuck in an infinite loop.
{% endhint %}

When enabled, you can adjust the reset conditions by switching the parameter representation from **Fixed** to **Expression**. The results of your expression evaluation determine when the node will reset item processing.

## Templates and examples <a href="#templates-and-examples" id="templates-and-examples"></a>


[Browse Loop Over Items (Split in Batches) integration templates](https://n8n.io/integrations/split-in-batches) or [search all templates](https://n8n.io/workflows/)

### Read RSS feed from two different sources <a href="#read-rss-feed-from-two-different-sources" id="read-rss-feed-from-two-different-sources"></a>

This workflow allows you to read an RSS feed from two different sources using the Loop Over Items node. You need the Loop Over Items node in the workflow as the RSS Feed Read node only processes the first item it receives. You can also find the [workflow](https://n8n.io/workflows/687-read-rss-feed-from-two-different-sources/) on n8n.io.

The example walks through building the workflow, but assumes you are already familiar with n8n. To build your first workflow, including learning how to add nodes to a workflow, refer to [Try it out](/try-it-out/index.md).

The final workflow looks like this:

{% @n8n-blocks/n8n-workflow-demo content="%7B%0A%20%20%22nodes%22%3A%20%5B%0A%20%20%20%20%7B%0A%20%20%20%20%20%20%22parameters%22%3A%20%7B%7D%2C%0A%20%20%20%20%20%20%22type%22%3A%20%22n8n-nodes-base.manualTrigger%22%2C%0A%20%20%20%20%20%20%22typeVersion%22%3A%201%2C%0A%20%20%20%20%20%20%22position%22%3A%20%5B%0A%20%20%20%20%20%20%20%200%2C%0A%20%20%20%20%20%20%20%200%0A%20%20%20%20%20%20%5D%2C%0A%20%20%20%20%20%20%22id%22%3A%20%22e6e1cfe6-eff1-48bd-b21c-6ba83d4244d9%22%2C%0A%20%20%20%20%20%20%22name%22%3A%20%22When%20clicking%20%E2%80%98Execute%20workflow%E2%80%99%22%0A%20%20%20%20%7D%2C%0A%20%20%20%20%7B%0A%20%20%20%20%20%20%22parameters%22%3A%20%7B%0A%20%20%20%20%20%20%20%20%22jsCode%22%3A%20%22return%20%5B%5Cn%5Ct%7B%5Cn%5Ct%5Ctjson%3A%20%7B%5Cn%5Ct%5Ct%5Cturl%3A%20%27https%3A%2F%2Fmedium.com%2Ffeed%2Fn8n-io%27%2C%5Cn%5Ct%5Ct%7D%5Cn%5Ct%7D%2C%5Cn%5Ct%7B%5Cn%5Ct%5Ctjson%3A%20%7B%5Cn%5Ct%5Ct%5Cturl%3A%20%27https%3A%2F%2Fdev.to%2Ffeed%2Fn8n%27%2C%5Cn%5Ct%5Ct%7D%5Cn%5Ct%7D%5Cn%5D%3B%22%0A%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%22type%22%3A%20%22n8n-nodes-base.code%22%2C%0A%20%20%20%20%20%20%22typeVersion%22%3A%202%2C%0A%20%20%20%20%20%20%22position%22%3A%20%5B%0A%20%20%20%20%20%20%20%20220%2C%0A%20%20%20%20%20%20%20%200%0A%20%20%20%20%20%20%5D%2C%0A%20%20%20%20%20%20%22id%22%3A%20%22137f1128-45b6-4bc4-a9fb-8660baa652a9%22%2C%0A%20%20%20%20%20%20%22name%22%3A%20%22Code%22%0A%20%20%20%20%7D%2C%0A%20%20%20%20%7B%0A%20%20%20%20%20%20%22parameters%22%3A%20%7B%0A%20%20%20%20%20%20%20%20%22options%22%3A%20%7B%7D%0A%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%22type%22%3A%20%22n8n-nodes-base.splitInBatches%22%2C%0A%20%20%20%20%20%20%22typeVersion%22%3A%203%2C%0A%20%20%20%20%20%20%22position%22%3A%20%5B%0A%20%20%20%20%20%20%20%20440%2C%0A%20%20%20%20%20%20%20%200%0A%20%20%20%20%20%20%5D%2C%0A%20%20%20%20%20%20%22id%22%3A%20%223449a953-49c2-4a36-ba3d-cbc0573f3f6c%22%2C%0A%20%20%20%20%20%20%22name%22%3A%20%22Loop%20Over%20Items%22%0A%20%20%20%20%7D%2C%0A%20%20%20%20%7B%0A%20%20%20%20%20%20%22parameters%22%3A%20%7B%0A%20%20%20%20%20%20%20%20%22url%22%3A%20%22%3D%7B%7B%20%24json.url%20%7D%7D%22%2C%0A%20%20%20%20%20%20%20%20%22options%22%3A%20%7B%7D%0A%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%22type%22%3A%20%22n8n-nodes-base.rssFeedRead%22%2C%0A%20%20%20%20%20%20%22typeVersion%22%3A%201.1%2C%0A%20%20%20%20%20%20%22position%22%3A%20%5B%0A%20%20%20%20%20%20%20%20660%2C%0A%20%20%20%20%20%20%20%20100%0A%20%20%20%20%20%20%5D%2C%0A%20%20%20%20%20%20%22id%22%3A%20%22cc2e59d7-0a9b-4640-8052-d8f7f8d8c9fe%22%2C%0A%20%20%20%20%20%20%22name%22%3A%20%22RSS%20Read%22%0A%20%20%20%20%7D%0A%20%20%5D%2C%0A%20%20%22connections%22%3A%20%7B%0A%20%20%20%20%22When%20clicking%20%E2%80%98Execute%20workflow%E2%80%99%22%3A%20%7B%0A%20%20%20%20%20%20%22main%22%3A%20%5B%0A%20%20%20%20%20%20%20%20%5B%0A%20%20%20%20%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%22node%22%3A%20%22Code%22%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%22type%22%3A%20%22main%22%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%22index%22%3A%200%0A%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%5D%0A%20%20%20%20%20%20%5D%0A%20%20%20%20%7D%2C%0A%20%20%20%20%22Code%22%3A%20%7B%0A%20%20%20%20%20%20%22main%22%3A%20%5B%0A%20%20%20%20%20%20%20%20%5B%0A%20%20%20%20%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%22node%22%3A%20%22Loop%20Over%20Items%22%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%22type%22%3A%20%22main%22%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%22index%22%3A%200%0A%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%5D%0A%20%20%20%20%20%20%5D%0A%20%20%20%20%7D%2C%0A%20%20%20%20%22Loop%20Over%20Items%22%3A%20%7B%0A%20%20%20%20%20%20%22main%22%3A%20%5B%0A%20%20%20%20%20%20%20%20%5B%5D%2C%0A%20%20%20%20%20%20%20%20%5B%0A%20%20%20%20%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%22node%22%3A%20%22RSS%20Read%22%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%22type%22%3A%20%22main%22%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%22index%22%3A%200%0A%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%5D%0A%20%20%20%20%20%20%5D%0A%20%20%20%20%7D%2C%0A%20%20%20%20%22RSS%20Read%22%3A%20%7B%0A%20%20%20%20%20%20%22main%22%3A%20%5B%0A%20%20%20%20%20%20%20%20%5B%0A%20%20%20%20%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%22node%22%3A%20%22Loop%20Over%20Items%22%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%22type%22%3A%20%22main%22%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%22index%22%3A%200%0A%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%5D%0A%20%20%20%20%20%20%5D%0A%20%20%20%20%7D%0A%20%20%7D%2C%0A%20%20%22pinData%22%3A%20%7B%7D%2C%0A%20%20%22meta%22%3A%20%7B%0A%20%20%20%20%22instanceId%22%3A%20%22cb484ba7b742928a2048bf8829668bed5b5ad9787579adea888f05980292a4a7%22%0A%20%20%7D%0A%7D%0A" url="https://raw.githubusercontent.com/n8n-io/n8n-docs/refs/heads/main/docs/_workflows/integrations/builtin/core-nodes/n8n-nodes-base.splitinbatches/rss-feed-example.json" %}

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

### Check that the node has processed all items <a href="#check-that-the-node-has-processed-all-items" id="check-that-the-node-has-processed-all-items"></a>

To check if the node still has items to process, use the following expression: `{{$("Loop Over Items").context["noItemsLeft"]}}`. This expression returns a boolean value. If the node still has data to process, the expression returns `false`, otherwise it returns `true`.

### Get the current running index of the node <a href="#get-the-current-running-index-of-the-node" id="get-the-current-running-index-of-the-node"></a>

To get the current running index of the node, use the following expression: `{{$("Loop Over Items").context["currentRunIndex"];}}`.

