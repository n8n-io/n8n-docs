---
contentType: howto
---

# Merging data streams

Merging allows you to bring multiple data streams together.

Merging data from different branches or nodes uses the [Merge](/integrations/builtin/core-nodes/n8n-nodes-base.merge/) node. To merge data from multiple node executions, use the [Code](/integrations/builtin/core-nodes/n8n-nodes-base.code/) node.


## Merge data from different branches

https://n8n.io/workflows/1747-joining-different-datasets/

## Merge data from different nodes

## Merge data from multiple node executions

Use the Code node to merge data from multiple node executions. This is useful in some [Looping](/flow-logic/looping/) scenarios.

!!! note "Node executions and workflow executions"
	This section describes merging data from multiple node executions. This is when a node executes multiple times during a single workflow execution. 

[Example workflow](https://n8n.io/workflows/1160-merge-data-for-multiple-executions/){:target=_blank .external-link}  with an RSS feed use case, and [another example workflow](https://n8n.io/workflows/1814-merge-multiple-runs-into-one/){:target=_blank .external-link} using Split In Batches and Wait to artifically create multiple executions.

## Compare and merge

The [Compare Datasets](/integrations/builtin/core-nodes/n8n-nodes-base.comparedatasets/) node compares data streams before merging them.
