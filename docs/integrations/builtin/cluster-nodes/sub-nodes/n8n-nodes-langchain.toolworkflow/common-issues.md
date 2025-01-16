---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Custom n8n Workflow Tool node common issues
description: Documentation for common issues and questions in the Custom n8n Workflow Tool node in n8n, a workflow automation platform. Includes details of the issue and suggested solutions.
contentType: integration
priority: high
---

# Custom n8n Workflow Tool node common issues

Here are some common errors and issues with the [Custom n8n Workflow Tool node](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolworkflow/) and steps to resolve or troubleshoot them.

## Processing parameters

The Custom n8n Workflow Tool node is a sub-node. Sub-nodes behave differently than other nodes when processing multiple items using expressions.

Most nodes, including root nodes, take any number of items as input, process these items, and output the results. You can use expressions to refer to input items, and the node resolves the expression for each item in turn. For example, given an input of five name values, the expression `{{ $json.name }}` resolves to each name in turn.

In sub-nodes, the expression always resolves to the first item. For example, given an input of five name values, the expression `{{ $json.name }}` always resolves to the first name.

## Passing AI generated data to called workflows

The Custom n8n Workflow Tool node 

* When using the Custom n8n Workflow Tool to pass AI generated data
* Do not use output parsers except for final output
* The agent can only provide a single dynamic argument to the tool
* You need to pass a stringified object if you want to provide more. An example:

> Slack tool for internal team communication: Discussions, updates, and coordination.
> 
> IMPORTANT: The `action_input` should be a single stringifed JSON object. Following the below schema:
> ```json
> {{
>   "$ref": "#/definitions/slackToolSchema",
>   "definitions": {{
>     "slackToolSchema": {{
>       "type": "object",
>       "properties": {{
>         "method": {{
>           "type": "string",
>           "enum": [
>             "POST",
>             "GET"
>           ]
>         }},
>         "channelName": {{
>           "type": "string"
>         }},
>         "message": {{
>           "type": "string"
>         }},
>         "threadId": {{
>           "type": "string",
>           "description": "Optional Thread Identifier for Replies"
>         }},
>         "startDate": {{
>           "type": "string",
>           "format": "date-time",
>           "description": "Optional start date and time for filtering messages"
>         }},
>         "endDate": {{
>           "type": "string",
>           "format": "date-time",
>           "description": "Optional end date and time for filtering messages"
>         }}
>       }},
>       "required": [
>         "method",
>         "channelName",
>         "message"
>       ],
>       "additionalProperties": false
>     }}
>   }},
>   "required": [
>     "query"
>   ],
>   "additionalProperties": false
>   "$schema": "http://json-schema.org/draft-07/schema#"
> }}
> ```
> 
> Do not send the RAW object; make sure to stringify it before sending it.

* There may be a `ERROR: Single '}' in the template.` error due to clashes with Langchain's expression language. You can escape the	curly brackets by using double curly brackets in the template (`}}` instead of `}`).

* This might be made a bit obsolete by the **Specify Input Schema** option. This could be its own entry though maybe.

## Passing chat history to called workflows

Sometimes it's helpful to use the Custom n8n Workflow Tool node to pass more context to the called workflow than the most recent chat message. 

* In the sub-workflow, use the Chat Memory Manager node to pull the history using the session ID.
