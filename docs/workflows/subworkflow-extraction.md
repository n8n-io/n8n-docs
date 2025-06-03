---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Sub-workflow Extraction
description: Select nodes in your workflow and extract them into a sub-workflow.
contentType: howto
---

# Sub-workflow Extraction

/// info | Feature availability
Available on all plans from n8n version 1.97.0.
///

Use sub-workflow extraction to refactor your workflows into reusable parts. Expressions referencing other nodes are automatically updated and added as parameters in the [Execute Workflow Trigger](/integrations/builtin/core-nodes/n8n-nodes-base.executeworkflowtrigger.md) node.

See [sub-workflows](/flow-logic/subworkflows.md) for a general introduction to the concept.

## How to

Select nodes in the canvas, right-click the canvas background and click `Extract to sub-workflow`.

## Valid selections

Not all selections are valid sub-workflows. The selection needs to be continuous and must connect to the rest of the workflow from at most one start node and one end node in the selection, since this is how our sub-workflows work when you call them. 

In other terms, the selection needs to fulfil these conditions:

- No triggers are selected 
- At most one node has incoming connection from nodes outside the selection. That node has at most one input branch, and no incoming connections from nodes selected for extraction.
- At most one node has outgoing connections to nodes outside of the selection. That node has at most one output branch, and no outgoing connections to nodes selected for extraction.
- All nodes between two selected nodes are also selected

## Limitations and shortcomings

Sub-workflow extraction will keep most workflows functional, but this is not guaranteed.
There are also a few cosmetic limitations you should be aware of.

- We cannot determine the types of the referenced expressions. You'll need to update these on the `ExecuteWorkflowTrigger` and the `Set/Edit Fields` called `Return` we add at the start and end of the created sub-workflow. (The `Return` node is omitted if no outputs are needed.)
- While we support most ways of accessing node data, the `$('nodeName').itemMatching(index)` function is only supported with numeric argument values, not general code.
- Other accessors like `first()`, `last()` and `all()` will add post-fixes like `myVariableName_firstItem` to the determined workflow parameter names to avoid confusion with your inputs not changing.
- `$('nodeName').all()` is turned into `$('nodeName').first().json.nodeName_all` as there is no other way to provide the output of `all()` to a sub-workflow. This means that we'll transfer all data for each row, which may lead to a lot more stored data. You can likely find a better solution for your specific case here.
- Handling of sub-nodes like AI Tools is currently limited. You'll want to select them all, and may need to duplicate any nodes shared with other AI Agents before extraction.
- New workflows are created with execution order `v1` regardless of the parent workflow's settings - this can be changed back in the settings.
