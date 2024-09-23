---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Respond to Webhook
description: Documentation for the Respond to Webhook node in n8n, a workflow automation platform. Includes guidance on usage, and links to examples.
contentType: integration
priority: critical
---

# Respond to Webhook

Use the Respond to Webhook node to control the response to incoming webhooks. This node works with the [Webhook](/integrations/builtin/core-nodes/n8n-nodes-base.webhook/) node.

/// note | Runs once for the first data item
The Respond to Webhook node runs once, using the first incoming data item. Refer to [Return more than one data item](#return-more-than-one-data-item) for more information.
///

## How to use Respond to Webhook

To use the Respond to Webhook node:

1. Add a [Webhook](/integrations/builtin/core-nodes/n8n-nodes-base.webhook/) node as the trigger node for the workflow.
1. In the Webhook node, set **Respond** to **Using 'Respond to Webhook' node**.
1. Add the Respond to Webhook node anywhere in your workflow. If you want it to return data from other nodes, place it after those nodes.

## Node parameters

Configure the node behavior using these parameters.

### Respond With

Choose what data to send in the webhook response.

- **All Incoming Items**: Respond with all the JSON items from the input.
- **Binary**: Respond with a binary file defined in **Response Data Source**.
- **First Incoming Item**: Respond with the first incoming item's JSON.
- **JSON**: Respond with a JSON object defined in **Response Body**.
- **No Data**: No response payload.
- **Redirect**: Redirect to a URL set in **Redirect URL**.
- **Text**: Respond with text set in **Response Body**.

## Node options

Select **Add Option** to view and set the options.

- **Response Code**: Set the [response code](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status){:target=_blank .external-link} to use.
- **Response Headers**: Define the response headers to send.
- **Put Response in Field**: Available when you respond with **All Incoming Items** or **First Incoming Item**. Set the field name for the field containing the response data.

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'respond-to-webhook') ]]

## Workflow behavior

When using the Respond to Webhook node, workflows behave as follows:

- The workflow finishes without executing the Respond to Webhook node: it returns a standard message with a 200 status.
- The workflow errors before the first Respond to Webhook node executes: the workflow returns an error message with a 500 status.
- A second Respond to Webhook node executes after the first one: the workflow ignores it.
- A Respond to Webhook node executes but there was no webhook: the workflow ignores the Respond to Webhook node.

## Return more than one data item (deprecated)

/// note | Deprecated in 1.22.0
n8n 1.22.0 added support for returning all data items using the **All Incoming Items** option. n8n recommends upgrading to the latest version of n8n, instead of using the workarounds described in this section.
///

The Respond to Webhook node runs once, using the first incoming data item. This includes when using [expressions](/code/expressions/). You can't force looping using the Loop node: the workflow will run, but the webhook response will still only contain the results of the first execution. 

If you need to return more than one data item, choose one of these options:

- Instead of using the Respond to Webhook node, use the **When Last Node Finishes** option in **Respond** in the Webhook node. Use this when you want to return the final data that the workflow outputs.
- Use the [Aggregate](/integrations/builtin/core-nodes/n8n-nodes-base.aggregate/) node to turn multiple items into a single item before passing the data to the Respond to Webhook node. Set **Aggregate** to **All Item Data (Into a Single List)**.
