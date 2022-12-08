# Memory-related errors

n8n does not restrict the amount of data each node can fetch and process. While this gives users a great amount of freedom, it can also lead to errors when workflow executions require more memory than available. This section explains how to identify and avoid such errors.

## Identifying out of memory situations

UI error messages like `Problem running workflow`, `Connection Lost`, or `503 Service Temporarily Unavailable` typically suggest that an n8n instance has become unavailable. The execution list would show an `Unknown` status for such executions.

When self-hosting n8n, you will typically also see error messages such as `Allocation failed - JavaScript heap out of memory` in your server logs. 

In many environments (including n8n cloud), n8n would restart automatically when encountering such an issue. However, when running n8n from the command line you might need to restart it manually in order to continue your work.

## Typical causes

Such problems occur when a workflow execution requires more memory than available to an n8n instance. Factors increasing the memory usage for a workflow execution include:

- Amount of [JSON data](/data/data-structure/)
- Size of binary data
- Number of nodes in a workflow
- Type of nodes in a workflow (the [Code](/integrations/builtin/core-nodes/n8n-nodes-base.code/) node and the older Function node can increase the memory consumption significantly)
- How the execution is triggered (manual executions increase memory consumption since an additional copy of data is held available for the UI)
- Additional workflows running at the same time

## Avoiding out of memory situations

When encountering an out of memory situation, there are essentially two options. Either increasing the amount of memory available to n8n or reducing the memory consumption.

### Increasing the available memory

When self-hosting n8n, increasing the amount of memory available to n8n would usually involve upgrading to a larger plan with the respective hosting provider. On n8n cloud it would involve upgrading to a larger plan.

### Reducing the memory consumption

This approach is more complex and will involve re-building the workflows causing the issue. The following section provides some general guidelines on how to reduce the memory consumption. Not all suggestions are applicable to all workflows.

1. Split the data processed into smaller chunks (for example instead of fetching 10,000 rows with each execution, process only 200 rows with each execution)
2. Avoid using the Code/Function node where possible
3. Avoid manual executions when processing larger amounts of data
4. Split the workflow up into sub-workflows and ensure each sub-workflow only returns a limited amount of data to its parent workflow

Splitting the workflow might seem counter-intuitive at first as it usually requires adding at least two additional nodes: the [Split In Batches](/integrations/builtin/core-nodes/n8n-nodes-base.splitinbatches/) to split up the items into smaller batches and the [Execute Workflow](/integrations/builtin/core-nodes/n8n-nodes-base.executeworkflow/) node to start the sub-workflow.

However, as long as your sub-workflow does the heavy lifting for each batch and then returns only a very small result set to the main workflow, the memory consumption will be significantly reduced. This is because the sub-workflow will only hold the data for the current batch in memory, after which the memory is freed again.
