---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Let AI specify tool parameters with `$fromAI()`
description: Understand how n8n's `$fromAI()` function works and how to use it to dynamically populate parameters for AI app tools.
contentType: explanation
tags:
  - $fromAI
  - $fromAI()
  - fromAI
  - fromAI()
hide:
  - tags
---

# Let AI specify tool parameters with `$fromAI()`

When configuring [app node](/integrations/builtin/app-nodes/) tools connected to the Tools Agent, you can use the `$fromAI()` function to dynamically populate parameter values using the AI model. The AI model will fill in appropriate data given the context from the task and information from other connected tools.

## How the `$fromAI()` function works

The `$fromAI()` function uses AI to dynamically fill in parameters for tools connected to the [Tools AI agent](/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/tools-agent/).  You can use the `$fromAI()` function in expressions within [app nodes](/integrations/builtin/app-nodes/) (like [Gmail](/integrations/builtin/app-nodes/n8n-nodes-base.gmail/), [Notion](/integrations/builtin/app-nodes/n8n-nodes-base.notion/), or [Slack](/integrations/builtin/app-nodes/n8n-nodes-base.slack/)) connected to a tool node.

/// note | Only for the Node Tools
The `$fromAI()` function is only available for [app node](/integrations/builtin/app-nodes/) tools connected to the Tools Agent. It isn't possible to use the `$fromAI()` function with the [Call n8n Workflow](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolworkflow/), [Code](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolcode/), [HTTP Request](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolhttprequest/), or [other cluster sub-nodes](/integrations/builtin/cluster-nodes/sub-nodes/).
///

To use the `$fromAI()` function, call it with the required `key` parameter:

```javascript
{{ $fromAI('email') }}
```

The `key` parameter and other arguments to the `$fromAI()` function aren't references to existing values. Instead, think of these arguments as hints that the AI model will use to populate the right data.

For instance, if you choose a key called `email`, the AI Model will look for an email address in its context, other tools, and input data. In chat workflows, it may ask the user for an email address if it can't find one elsewhere. You can optionally pass other parameters like `description` to give extra context to the AI model.

## Parameters

The `$fromAI()` function accepts the following parameters:

<!-- vale off -->

| Parameter | Type | Required? | Description |
| --------- | ---- | --------- | ----------- |
| `key` | string | :white_check_mark: | A string representing the key or name of the argument. This must be between 1 and 64 characters in length and can only contain lowercase letters, uppercase letters, numbers, underscores, and hyphens. |
| `description` | string | :x: | A string describing the argument. |
| `type` | string | :x: | A string specifying the data type. Can be string, number, boolean, or json (defaults to string). |
| `defaultValue` | any | :x: | The default value to use for the argument. |

<!-- vale on -->

## Examples

As an example, you could use the following `$fromAI()` expression to dynamically populate a field with a name:

```javascript
$fromAI("name", "The commenter's name", "string", "Jane Doe")
```

If you don't need the optional parameters, you could simplify this as:

```javascript
$fromAI("name")
```

To dynamically populate the number of items you have in stock, you could use a `$fromAI()` expression like this:

```javascript
$fromAI("numItemsInStock", "Number of items in stock", "number", 5)
```

## Templates

You can see the `$fromAI()` function in action in the following templates:

* [Angie, Personal AI Assistant with Telegram Voice and Text](https://n8n.io/workflows/2462-angie-personal-ai-assistant-with-telegram-voice-and-text/)
* [Automate Customer Support Issue Resolution using AI Text Classifier](https://n8n.io/workflows/2468-automate-customer-support-issue-resolution-using-ai-text-classifier/)
* [Scale Deal Flow with a Pitch Deck AI Vision, Chatbot and QDrant Vector Store](https://n8n.io/workflows/2464-scale-deal-flow-with-a-pitch-deck-ai-vision-chatbot-and-qdrant-vector-store/)
