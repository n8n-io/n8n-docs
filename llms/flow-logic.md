

# flow-logic/error-handling.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: howto
description: How to handle execution errors.
---

# Error handling

When designing your flow logic, it's a good practice to consider potential errors, and set up methods to handle them gracefully. With an error workflow, you can control how n8n responds to a workflow execution failure.

/// note | Investigating errors
To investigate failed executions, you can:

* Review your [Executions](/workflows/executions/index.md), for a [single workflow](/workflows/executions/single-workflow-executions.md) or [all workflows you have access to](/workflows/executions/all-executions.md). You can [load data from previous execution](/workflows/executions/debug.md) into your current workflow.
* Enable [Log streaming](/log-streaming.md).
///

## Create and set an error workflow

For each workflow, you can set an error workflow in **Workflow Settings**. It runs if an execution fails. This means you can, for example, send email or Slack alerts when a workflow execution errors. The error workflow must start with the [Error Trigger](/integrations/builtin/core-nodes/n8n-nodes-base.errortrigger.md).

You can use the same error workflow for multiple workflows.

--8<-- "_snippets/flow-logic/create-set-error-workflow.md"

## Error data

--8<-- "_snippets/integrations/builtin/core-nodes/error-trigger/error-data.md"

## Cause a workflow execution failure using Stop And Error

When you create and set an error workflow, n8n runs it when an execution fails. Usually, this is due to things like errors in node settings, or the workflow running out of memory.

You can add the [Stop And Error](/integrations/builtin/core-nodes/n8n-nodes-base.stopanderror.md) node to your workflow to force executions to fail under your chosen circumstances, and trigger the error workflow.


# flow-logic/execution-order.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Execution order in multi-branch workflows
description: How n8n decides the node execution order in multi-branch workflows.
contentType: explanation
---

# Execution order in multi-branch workflows

n8n's node execution order depends on the version of n8n you're using:

* For workflows created before version 1.0: n8n executes the first node of each branch, then the second node of each branch, and so on.
* For workflows created in version 1.0 and above: executes each branch in turn, completing one branch before starting another. n8n orders the branches based on their position on the [canvas](/glossary.md#canvas-n8n), from topmost to bottommost. If two branches are at the same height, the leftmost branch executes first.

You can change the execution order in your [workflow settings](/workflows/settings.md).



# flow-logic/index.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Flow logic
description: How to represent logic in n8n workflows.
contentType: overview
---

# Flow logic

n8n allows you to represent complex logic in your workflows.

[[% import "_macros/section-toc.html" as sectionToc %]]

This section covers:

[[ sectionToc.sectionToc(page) ]]

## Related sections

You need some understanding of [Data](/data/index.md) in n8n, including [Data structure](/data/data-structure.md) and [Data flow within nodes](/data/data-flow-nodes.md).

When building your logic, you'll use n8n's [Core nodes](/integrations/builtin/core-nodes/index.md), including:

* Splitting: [IF](/integrations/builtin/core-nodes/n8n-nodes-base.if.md) and [Switch](/integrations/builtin/core-nodes/n8n-nodes-base.switch.md).
* Merging: [Merge](/integrations/builtin/core-nodes/n8n-nodes-base.merge.md), [Compare Datasets](/integrations/builtin/core-nodes/n8n-nodes-base.comparedatasets.md), and [Code](/integrations/builtin/core-nodes/n8n-nodes-base.code/index.md).
* Looping: [IF](/integrations/builtin/core-nodes/n8n-nodes-base.if.md) and [Loop Over Items](/integrations/builtin/core-nodes/n8n-nodes-base.splitinbatches.md).
* Waiting: [Wait](/integrations/builtin/core-nodes/n8n-nodes-base.wait.md).
* Creating sub-workflows: [Execute Workflow](/integrations/builtin/core-nodes/n8n-nodes-base.executeworkflow.md) and [Execute Workflow Trigger](/integrations/builtin/core-nodes/n8n-nodes-base.executeworkflowtrigger.md).
* Error handling: [Stop And Error](/integrations/builtin/core-nodes/n8n-nodes-base.stopanderror.md) and [Error Trigger](/integrations/builtin/core-nodes/n8n-nodes-base.errortrigger.md).


# flow-logic/looping.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: howto
---

# Looping in n8n

Looping is useful when you want to process multiple items or perform an action repeatedly, such as sending a message to every contact in your address book. n8n handles this repetitive processing automatically, meaning you don't need to specifically build loops into your workflows. There are [some nodes](#node-exceptions) where this isn't true.

## Using loops in n8n

n8n nodes take any number of items as input, process these items, and output the results. You can think of each item as a single data point, or a single row in the output table of a node.

![The Customer Datastore node output](/_images/flow-logic/looping/customer_datastore_node.png)

Nodes usually run once for each item. For example, if you wanted to send the name and notes of the customers in the Customer Datastore node as a message on Slack, you would:

1. Connect the Slack node to the Customer Datastore node.
2. Configure the parameters.
3. Execute the node. 

You would receive five messages: one for each item.

This is how you can process multiple items without having to explicitly connect nodes in a loop.

### Executing nodes once

For situations where you don't want a node to process all received items, for example sending a Slack message only to the first customer, you can do so by toggling the **Execute Once** parameter in the **Settings** tab of that node This setting is helpful when the incoming data contains multiple items and you want to only process the first one. 


## Creating loops

n8n typically handles the iteration for all incoming items. However, there are certain scenarios where you will have to create a loop to iterate through all items. Refer to [Node exceptions](#node-exceptions) for a list of nodes that don't automatically iterate over all incoming items.

### Loop until a condition is met

To create a loop in an n8n workflow, connect the output of one node to the input of a previous node. Add an [IF](/integrations/builtin/core-nodes/n8n-nodes-base.if.md) node to check when to stop the loop. 

Here is an [example workflow](https://n8n.io/workflows/1130) that implements a loop with an `IF` node:

![Editor UI view of sample workflow](/_images/flow-logic/looping/example_workflow.png)

### Loop until all items are processed

Use the [Loop Over Items](/integrations/builtin/core-nodes/n8n-nodes-base.splitinbatches.md) node when you want to loop until all items are processed. To process each item individually, set **Batch Size** to `1`.

You can batch the data in groups and process these batches. This approach is useful for avoiding API rate limits when processing large incoming data or when you want to process a specific group of returned items.

The Loop Over Items node stops executing after all the incoming items get divided into batches and passed on to the next node in the workflow so it's not necessary to add an IF node to stop the loop.

## Node exceptions

Nodes and operations where you need to design a loop into your workflow:

* [CrateDB](/integrations/builtin/app-nodes/n8n-nodes-base.cratedb.md) executes once for `insert` and `update`.
* [Code](/integrations/builtin/core-nodes/n8n-nodes-base.code/index.md) node in **Run Once for All Items** mode: processes all the items based on the entered code snippet.
* [Execute Workflow](/integrations/builtin/core-nodes/n8n-nodes-base.executeworkflow.md) node in **Run Once for All Items** mode.
* [HTTP Request](/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/index.md): you must handle pagination yourself. If your API call returns paginated results you must create a loop to fetch one page at a time.
* [Microsoft SQL](/integrations/builtin/app-nodes/n8n-nodes-base.microsoftsql.md) executes once for `insert`, `update`, and `delete`.
* [MongoDB](/integrations/builtin/app-nodes/n8n-nodes-base.mongodb.md) executes once for `insert` and `update`.
* [QuestDB](/integrations/builtin/app-nodes/n8n-nodes-base.questdb.md) executes once for `insert`.
* [Redis](/integrations/builtin/app-nodes/n8n-nodes-base.redis.md):
	* Info: this operation executes only once, regardless of the number of items in the incoming data.
* [RSS Read](/integrations/builtin/core-nodes/n8n-nodes-base.rssfeedread.md) executes once for the requested URL.
* [TimescaleDB](/integrations/builtin/app-nodes/n8n-nodes-base.timescaledb.md) executes once for `insert` and `update`.


# flow-logic/merging.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: howto
description: Merge data streams in you n8n workflows.
---

# Merging data

Merging brings multiple data streams together. You can achieve this using different nodes depending on your workflow requirements.

- Merge data from different data streams or nodes: Use the [Merge](/integrations/builtin/core-nodes/n8n-nodes-base.merge.md) node to combine data from various sources into one.
- Merge data from multiple node executions: Use the [Code](/integrations/builtin/core-nodes/n8n-nodes-base.code/index.md) node for complex scenarios where you need to merge data from multiple executions of a node or multiple nodes. 
- Compare and merge data: Use the [Compare Datasets](/integrations/builtin/core-nodes/n8n-nodes-base.comparedatasets.md) node to compare, merge, and output data streams based on the comparison.

Explore each method in more detail in the sections below.

## Merge data from different data streams

If your workflow [splits](/flow-logic/splitting.md), you combine the separate streams back into one stream.

Here's an [example workflow](https://n8n.io/workflows/1747-joining-different-datasets/) showing different types of merging: appending data sets, keeping only new items, and keeping only existing items. The [Merge node](/integrations/builtin/core-nodes/n8n-nodes-base.merge.md) documentation contains details on each of the merge operations.

[[ workflowDemo("https://api.n8n.io/workflows/templates/1747") ]]

## Merge data from different nodes

You can use the Merge node to combine data from two previous nodes, even if the workflow hasn't split into separate data streams. This can be useful if you want to generate a single dataset from the data generated by multiple nodes.

<figure markdown="span">
![Merging data from two previous nodes. The diagram shows three nodes lined up sequentially. The first node is labeled Fetch data, the second is labeled Modify data, and the third is labeled Merge: append both data sets. Arrows connect nodes 1 to 2, 2 to 3, and 1 to 3.](/_images/flow-logic/merging/merge-node-data.png)
<figcaption>Merging data from two previous nodes</figcaption>
</figure>

## Merge data from multiple node executions

Use the Code node to merge data from multiple node executions. This is useful in some [Looping](/flow-logic/looping.md) scenarios.

/// note | Node executions and workflow executions
This section describes merging data from multiple node executions. This is when a node executes multiple times during a single workflow execution. 
///
Refer to this [example workflow](https://n8n.io/workflows/1814-merge-multiple-runs-into-one/){:target=_blank .external-link} using Loop Over Items and Wait to artificially create multiple executions.

[[ workflowDemo("https://api.n8n.io/workflows/templates/1814") ]]

## Compare, merge, and split again

The [Compare Datasets](/integrations/builtin/core-nodes/n8n-nodes-base.comparedatasets.md) node compares data streams before merging them. It outputs up to four different data streams.

Refer to this [example workflow](https://n8n.io/workflows/1943-comparing-data-with-the-compare-datasets-node/){:target=_blank .external-link} for an example.

[[ workflowDemo("https://api.n8n.io/workflows/templates/1943") ]]

# flow-logic/splitting.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
description: Split workflows into multiple paths using If and Switch
contentType: howto
---

# Splitting workflows with conditional nodes

Splitting uses the [IF](/integrations/builtin/core-nodes/n8n-nodes-base.if.md) or [Switch](/integrations/builtin/core-nodes/n8n-nodes-base.switch.md) nodes. It turns a single-branch workflow into a multi-branch workflow. This is a key piece of representing complex logic in n8n.

Compare these workflows:

!["Diagram representing two workflows. One has three steps and follows a linear process, with a user submitting a bug, and the workflow emailing a support team. The second workflow starts the same way, but then splits depending on whether the user marked the issue as urgent. It then splits again depending on the user's support plan"](/_images/flow-logic/splitting/single-multi-branch-workflow.png)

This is the power of splitting and conditional nodes in n8n.

Refer to the [IF](/integrations/builtin/core-nodes/n8n-nodes-base.if.md) or [Switch](/integrations/builtin/core-nodes/n8n-nodes-base.switch.md) documentation for usage details.


# flow-logic/subworkflows.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: howto
description: Call workflows from other workflows, and split large workflows into smaller components.
---

# Sub-workflows

You can call one workflow from another workflow. This allows you to build modular, microservice-like workflows. It can also help if your workflow grows large enough to encounter [memory issues](/hosting/scaling/memory-errors.md). Creating sub-workflows uses the [Execute Workflow](/integrations/builtin/core-nodes/n8n-nodes-base.executeworkflow.md) and [Execute Sub-workflow Trigger](/integrations/builtin/core-nodes/n8n-nodes-base.executeworkflowtrigger.md) nodes.

## Set up and use a sub-workflow

This section walks through setting up both the parent workflow and sub-workflow.

--8<-- "_snippets/flow-logic/subworkflow-usage.md"

## How data passes between workflows

--8<-- "_snippets/flow-logic/subworkflow-data-flow.md"


# flow-logic/waiting.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Waiting
description: How to make your workflow execution wait.
contentType: howto
---

# Waiting

Waiting allows you to pause a workflow mid-execution, then resume where the workflow left off, with the same data. This is useful if you need to rate limit your calls to a service, or wait for an external event to complete. You can wait for a specified duration, or until a webhook fires.

Making a workflow wait uses the [Wait](/integrations/builtin/core-nodes/n8n-nodes-base.wait.md) node. Refer to the node documentation for usage details.

n8n provides a workflow template with a basic example of [Rate limiting and waiting for external events](https://n8n.io/workflows/1749-rate-limiting-and-waiting-for-external-events/){:target=_blank .external-link}.
