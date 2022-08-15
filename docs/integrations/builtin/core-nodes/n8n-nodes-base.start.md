# Start

The start node is the first node in a workflow. It exists by default when you create a new workflow and looks like the following image.

![A new workflow with the Start node](/_images/integrations/builtin/core-nodes/start/workflow.png)

In case there is no Trigger node in the workflow, the workflow always starts from the Start node. The Start node cannot be deleted. Even if a workflow contains a Trigger node, there would still be a Start node.


## FAQs

### When is it necessary to use the Start node?

When using the *Execute Workflow* node in workflow A to execute workflow B, the *Start* node will act as the trigger node in workflow B. The second node in workflow B needs to be connected to the Start node for the workflow to execute correctly.




