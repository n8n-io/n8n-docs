---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Model Selector node documentation
description: Learn how to use the Model selector node in n8n. Follow technical documentation to integrate Model Selector node into your workflows.
contentType: [integration, reference]
priority: high
---

# Model Selector

The Model Selector node is a node that allows to select one of the connected language model nodes based on defined conditions.

You can use this node to develop fall-back mechanisms in case of errors or using the most suitable model depending on the task at hand.

On this page, you'll find the node parameters for the Model Selector node, and links to more resources.

--8<-- "_snippets/integrations/builtin/cluster-nodes/sub-node-expression-resolution.md"

## Node parameters

### Number of Inputs

Defines the number of input connections that are available to connect Language Model nodes to.

### Rules

Each rule consists of the Model Input the node should use and one or several conditions. If the defined set of conditions is true the selected model input will be used, starting from the first input. If conditions for several models are fulfilled the node returns the first one.

#### Add conditions

Create comparison **Conditions** for your If node.

- Use the data type dropdown to select the data type and comparison operation type for your condition. For example, to filter for dates after a particular date, select **Date & Time > is after**.
- The fields and values to enter into the condition change based on the data type and comparison you select. Refer to [Available data type comparisons](#available-data-type-comparisons) for a full list of all comparisons by data type.

Select **Add condition** to create more conditions.

#### Combining conditions

You can choose to keep data:

* When it meets all conditions: Create two or more conditions and select **AND** in the dropdown between them.
* When it meets any of the conditions: Create two or more conditions and select **OR** in the dropdown between them.

## Related resources

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"
-
