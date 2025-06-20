---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Model Selector
description: Learn how to use the Model selector node in n8n. Follow technical documentation to integrate Model Selector node into your workflows.
contentType: [integration, reference]
priority: high
---

# Model Selector

The Model Selector node dynamically selects one of the connected language model nodes based on defined conditions during workflow execution. This enables implementing fallback mechanisms for error handling or choosing the optimal model for specific tasks.

This page covers node parameters for the Model Selector node and includes links to related resources.

--8<-- "_snippets/integrations/builtin/cluster-nodes/sub-node-expression-resolution.md"

## Node parameters

### Number of Inputs
Specifies the number of input connections available for connecting language model nodes.

### Rules
Each rule defines which Model Input to use when specified conditions match. The node evaluates rules sequentially, starting from the first input. When multiple conditions match, the node returns the first matching model.

#### Add conditions
Create comparison conditions to control model selection:

- Select the appropriate data type and comparison operation from the dropdown (for example, **Date & Time > is after** for date-based filtering)
- Configure the required fields and values based on your selected data type and comparison. See [Available data type comparisons](#available-data-type-comparisons) for the complete list of comparisons by data type
- Select **Add condition** to create conditions

#### Combining conditions
Control when data meets your criteria:

* **All conditions must be met**: Create multiple conditions and select **AND** between them
* **Any condition can be met**: Create multiple conditions and select **OR** between them

--8<-- "_snippets/integrations/builtin/core-nodes/data-types.md"

## Related resources

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"
