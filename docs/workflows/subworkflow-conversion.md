---
title: Sub-workflow conversion
description: Select nodes in your workflow and convert them into a sub-workflow.
contentType: howto
---

# Sub-workflow conversion

/// info | Feature availability
Available on all plans from n8n version 1.97.0.
///

Use sub-workflow conversion to refactor your workflows into reusable parts. Expressions referencing other nodes are automatically updated and added as parameters in the [Execute Workflow Trigger](/integrations/builtin/core-nodes/n8n-nodes-base.executeworkflowtrigger.md) node.

See [sub-workflows](/flow-logic/subworkflows.md) for a general introduction to the concept.

## Selecting nodes for a sub-workflow

To convert part of a workflow to a sub-workflow, you must select the nodes in the original workflow that you want to convert.

Do this by selecting a group of valid nodes. The selection must be continuous and must connect to the rest of the workflow from at most one start node and one end node. The selection must fulfill these conditions:

- Must not include trigger nodes.
- Only a single node in the selection can have incoming connections from nodes *outside* of the selection.
	- That node can have multiple incoming connections, but only a single input *branch* (which means it can't be a [Merge node](/integrations/builtin/core-nodes/n8n-nodes-base.merge.md) for example).
	- That node can't have incoming connections from other nodes in the selection.
- Only a single node in the selection can have outgoing connections to nodes *outside* of the selection.
	- That node can have multiple outgoing connections, but only a single output branch (it can't be an [If node](/integrations/builtin/core-nodes/n8n-nodes-base.if.md) for example).
	- That node can't have outgoing connections to other nodes in the selection.
- The selection must include all nodes between the input and output nodes.

## How to convert part of a workflow to a sub-workflow

Select the desired nodes on the canvas. Right-click the canvas background and select **Convert to sub-workflow**.

## Things to keep in mind

Most sub-workflow conversions work without issues, but there are some caveats and limitations to keep in mind:

* **You must set type constraints for input and output manually**: By default, sub-workflow input and output allow all types. You can set expected types in sub-workflow's [Execute Sub-workflow Trigger node](/integrations/builtin/core-nodes/n8n-nodes-base.executeworkflowtrigger.md) and [Edit Fields (set) node](/integrations/builtin/core-nodes/n8n-nodes-base.set.md) (labeled as **Return** and only included if the sub-workflow has outputs).
* **Limited support for AI nodes**: When dealing with sub-nodes like AI tools, you must select them all and may need to duplicate any nodes shared with other AI Agents before conversion.
- **Uses v1 execution ordering:** New workflows use [`v1` execution ordering](/flow-logic/execution-order.md) regardless of the parent workflow's settings - you can change this back in the settings.
* **Accessor functions like `first()`, `last()`, and `all()` require extra care**: Expressions using these functions don't always translate cleanly to a sub-workflow context. n8n may transform them to try to preserve their functionality, but you should check that they work as intended in their new context.

	/// note | Sub-node parameter suffixes
	n8n adds suffixes like `_firstItem`, `_lastItem`, and `_allItems` to variable names accessed by these functions. This helps preserve information about the original expression, since item ordering may be different in the sub-workflow context.
	///

<!-- vale Vale.Spelling = NO -->
* **The `itemMatching` function requires a fixed index**: You can't use expressions for the index value when using the [`itemMatching` function](/code/builtin/output-other-nodes.md). You must pass it a fixed number.
<!-- vale Vale.Spelling = YES -->
