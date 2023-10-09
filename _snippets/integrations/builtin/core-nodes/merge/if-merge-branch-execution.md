!!! info "0.236.0 and below"
	n8n removed this execution behavior in version 1.0. This section applies to workflows using the **v0 (legacy)** workflow execution order. By default, this is all workflows built before version 1.0. You can change the execution order in your [workflow settings](/workflows/settings/).

If you add a Merge node to a workflow containing an If node, it can result in both output branches of the If node executing.

The Merge node is triggered by one branch, then goes and executes the other branch.

For example, in the screenshot below there's a workflow containing a Edit Fields node, If node, and Merge node. The standard If node behavior is to execute one branch (in the screenshot, this is the **true** output). However, due to the Merge node, both branches execute, despite the If node not sending any data down the **false** branch.

![Screenshot of a simple workflow. The workflow has an Edit Fields node, followed by an If node. It ends with a Merge node.](/_images/integrations/builtin/core-nodes/merge/if-merge-node.png)

<!-- TODO: remove once v1 is mature -->
