### Branch execution with If and Merge nodes

If you add a Merge node to a workflow containing an If node, it can result in both output branches of the If node executing.

For example, in the screenshot below there's a workflow containing a Set node, If node, and Merge node. The standard If node behavior is to execute one branch (in the screenshot, this is the **true** output). However, due to the Merge node, both branches execute, despite the If node not sending any data down the **false** branch.

![Screenshot of a simple workflow. The workflow has a Set node, followed by an If node. It ends with a Merge node.](/_images/integrations/builtin/core-nodes/merge/if-merge-node.png)