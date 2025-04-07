---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: "workflows"
description: n8n workflows explanation.
contentType: explanation
---

In n8n, a workflow is simply a sequence of steps, each of which represents some operation which fetches, stores, evaluates or processes data. These steps are represented by n8n **nodes**, which can represent various operations like retrieving information from services, manipulating data, or sending notifications.

!["Screenshot of the completed workflow"](/_images/try-it-out/tutorial-first.png)

For guides on how to create, manage, share and use workflows, please see the [using n8n documentation](/workflows/index.md).

## More about workflows

This section explains in a little more detail the different elements and operations of a workflow

When you [create a new workflow], the first thing you need to decide is what is going to activate it. All workflows require a node from which they start. In n8n this is known as a "trigger node". This is a special node (it even has a distinguishing icon '⚡︎' and a slightly different shape) which acts as the starting point for the workflow. Every workflow