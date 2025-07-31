* Split the data processed into smaller chunks. For example, instead of fetching 10,000 rows with each execution, process 200 rows with each execution.
* Avoid using the Code node where possible.
* Avoid manual executions when processing larger amounts of data.
* Split the workflow up into sub-workflows and ensure each sub-workflow returns a limited amount of data to its parent workflow.

Splitting the workflow might seem counter-intuitive at first as it usually requires adding at least two more nodes: the [Loop Over Items](/integrations/builtin/core-nodes/n8n-nodes-base.splitinbatches.md) node to split up the items into smaller batches and the [Execute Workflow](/integrations/builtin/core-nodes/n8n-nodes-base.executeworkflow.md) node to start the sub-workflow.

However, as long as your sub-workflow does the heavy lifting for each batch and then returns only a small result set to the main workflow, this reduces memory consumption. This is because the sub-workflow only holds the data for the current batch in memory, after which the memory is free again.
