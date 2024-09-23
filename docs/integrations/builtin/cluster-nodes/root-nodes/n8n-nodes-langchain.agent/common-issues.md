---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: AI Agent node Common Issues 
description: Documentation for common issues and questions in the AI Agent node in n8n, a workflow automation platform. Includes details of the issue and suggested solutions.
contentType: integration
priority: critical
---

# AI Agent node common issues

Here are some common errors and issues with the [AI Agent node](/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/) and steps to resolve or troubleshoot them.

## Internal error: 400 Invalid value for 'content'

A full error message might look like this:

```
Internal error
Error: 400 Invalid value for 'content': expected a string, got null.
<stack-trace>
```

This error can occur if the **Prompt** input contains a null value.

You might see this in one of two scenarios:

1. When you've set the **Prompt** to **Define below** and have an expression in your **Text** that isn't generating a value.
    * To resolve, make sure your expressions reference valid fields and that they resolve to valid input rather than null.
2. When you've set the **Prompt** to **Take from previous node automatically** and the incoming data has null values.
    * To resolve, remove any null values from the `chatInput` field of the input node.

## Error in sub-node Window Buffer Memory

This error displays when n8n runs into an issue with the [Window Buffer Memory](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.memorybufferwindow/) sub-node.

It most often occurs when your workflow or the workflow template you copied uses an older version of the Window Buffer Memory node.

Try removing the Window Buffer Memory node from your workflow and re-adding it, which will guarantee you're using the latest version of the node.
