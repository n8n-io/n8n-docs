---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
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

## How to convert sub-workflows

Select the desired nodes on the canvas. Right-click the canvas background and select **Convert to sub-workflow**.

## Valid selections

Not all selections are valid sub-workflows.

The selection must be continuous and must connect to the rest of the workflow from at most one start node and one end node in the selection, since this is how sub-workflows work when you call them. 

In other words, the selection must fulfill these conditions:

- Doesn't include trigger nodes.
- Selection input criteria:
	- Only a single node in the selection can have incoming connections from nodes *outside* of the selection.
	- That node can have multiple incoming connections, but only a single input *branch* (which means it can't be a [Merge node](/integrations/builtin/core-nodes/n8n-nodes-base.merge.md) for example).
	- That node can't have incoming connections from other nodes in the selection.
- Selection output criteria:
	- Only a single node in the selection can have outgoing connections to nodes *outside* of the selection.
	- That node can have multiple outgoing connections, but only a single output branch (it can't be an [If node](/integrations/builtin/core-nodes/n8n-nodes-base.if.md) for example).
	- That node can't have outgoing connections to other nodes in the selection.
- All nodes between the two selected nodes are also selected.

## Limitations and shortcomings

Sub-workflow conversion keeps most workflows functional, but this isn't guaranteed.
There are also some cosmetic limitations you should be aware of:

### Determining the types of referenced expressions

n8n can't determine the types of referenced expressions.

You'll need to update these in the [Execute Sub-workflow Trigger node](/integrations/builtin/core-nodes/n8n-nodes-base.executeworkflowtrigger.md) at the start of the sub-workflow and the [Edit Fields (set) node](/integrations/builtin/core-nodes/n8n-nodes-base.set.md) (named **Return**) added to the end of the sub-workflow (n8n only includes the **Return** node if the sub-workflow includes outputs) to set the appropriate type.

### `$(nodeName').itemMatching(index)` only works with numbers

While sub-workflows support most ways of accessing node data, the `$('nodeName').itemMatching(index)` function only works with numeric argument values, not general code.

### The `first()`, `last()`, and `all()` methods are replaced with post-fix versions

When converting a selection to a sub-workflow, accessors like `first()`, `last()`, and `all()` in expressions can't be moved to the sub-workflow without additional changes.

are replaced by an alternative post-fix format. This happens when the original expression within the selection refers to nodes outside of the selection. The expressio The sub-workflow won't have access to the item ordering from the parent workflow that 

* `$('someNode').item.json.variable_name` ->
	* A variable called `variable_name` is set in the Execute sub-workflow node to `$('someNode').item.json.variable_name`
	* Expression in sub-workflow: `$('Start').item.json.variable_name`
* `$('someNode').first().json.variable_name` ->
	* A variable called `variable_name_firstItem` is set in the Execute sub-workflow node to `$('someNode').first().json.variable_name`
	* Expression in sub-workflow: `$('Start').first().json.variable_name_firstItem`
* `$('someNode').last().json.variable_name` ->
	* A variable called `variable_name_lastItem` is set in the Execute sub-workflow node to `$('someNode').last().json.variable_name`
	* Expression in sub-workflow: `$('Start').last().json.variable_name_lastItem`
* `$('someNode').all()[0].json.variable_name` ->
	* A variable called `variable_name_allItems` is set in the Execute sub-workflow node to `$('someNode').all()[0].json.variable_name`
	* Expression in sub-workflow: `$('Start').last().json.variable_name_lastItem`



are replaced with an alternative post-fixed formats in expressions in the selection that previously 
o avoid confusion between item ordering between the parent and sub-workflow. For example, when converting a selection that that looks like `myVariableName_firstItem`. This means that if you have a  to the determined workflow parameter names to avoid confusion with your inputs not changing.
- **Swaps `$('nodeName').all()` with `$('nodeName').first().json.nodeName_all`:** n8n turns all cases of `$('nodeName').all()` into `$('nodeName').first().json.nodeName_all` as this is the only way to provide the output of `all()` to a sub-workflow. This means that n8n transfers all data for each row, which may lead to a lot more stored data. It's possible that you can find a better solution for your specific use case.
- **Limited support for sub-nodes:** n8n has support for handling sub-nodes like AI Tools. You need to select them all, and may need to duplicate any nodes shared with other AI Agents before conversion.
- **Uses v1 execution ordering:** New workflows use [`v1` execution ordering](/flow-logic/execution-order.md) regardless of the parent workflow's settings - you can change this back in the settings.







- **n8n can't determine the types of referenced expressions:** You'll need to update these in the [Execute Sub-workflow Trigger node](/integrations/builtin/core-nodes/n8n-nodes-base.executeworkflowtrigger.md) at the start of the sub-workflow and the [Edit Fields (set) node](/integrations/builtin/core-nodes/n8n-nodes-base.set.md) (named **Return**) added to the end of the sub-workflow (n8n only includes the **Return** node if the sub-workflow includes outputs).
- **`$('nodeName').itemMatching(index)` only works with numbers:** While sub-workflows support most ways of accessing node data, the `$('nodeName').itemMatching(index)` function only works with numeric argument values, not general code.
- **Swaps `first()`, `last()`, and `all()` with post-fix versions:** Other accessors like `first()`, `last()` and `all()` are converted into a post-fix format to avoid confusion between item ordering between the parent and sub-workflow. For example, when converting a selection that that looks like `myVariableName_firstItem`. This means that if you have a  to the determined workflow parameter names to avoid confusion with your inputs not changing.
- **Swaps `$('nodeName').all()` with `$('nodeName').first().json.nodeName_all`:** n8n turns all cases of `$('nodeName').all()` into `$('nodeName').first().json.nodeName_all` as this is the only way to provide the output of `all()` to a sub-workflow. This means that n8n transfers all data for each row, which may lead to a lot more stored data. It's possible that you can find a better solution for your specific use case.
- **Limited support for sub-nodes:** n8n has support for handling sub-nodes like AI Tools. You need to select them all, and may need to duplicate any nodes shared with other AI Agents before conversion.
- **Uses v1 execution ordering:** New workflows use [`v1` execution ordering](/flow-logic/execution-order.md) regardless of the parent workflow's settings - you can change this back in the settings.
