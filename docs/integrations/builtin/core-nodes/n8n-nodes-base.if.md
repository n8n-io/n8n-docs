---
title: If
description: Documentation for the If node in n8n, a workflow automation platform. Includes guidance on usage, and links to examples.
tags:
  - if
  - if node
  - If
  - If node
hide:
  - tags
search:
  boost: 5
---

# If

Use the If node to split a workflow conditionally based on comparison operations.

!!! note "Examples and templates"
	For usage examples and templates to help you get started, refer to n8n's [If integrations](https://n8n.io/integrations/if/){:target=_blank .external-link} list.

## Add conditions

Add comparison conditions using the **Add Condition** dropdown. The available comparison operations vary for each data type.

**Boolean:**

- Equal
- Not Equal

**Date & Time:**

- Occurred After
- Occurred Before


**Number:**

- Smaller
- Smaller or Equal
- Equal
- Not Equal
- Larger
- Larger or Equal
- Is Empty
- Is Not Empty


**String:**

- Contains
- Not Contains
- Ends With
- Not Ends With
- Equal
- Not Equal
- Regex Match
- Regex Not Match
- Starts With
- Not Starts With
- Is Empty
- Is Not Empty

## Match any or match all

You can choose to split a workflow when the data meets any of the conditions, or all of the conditions, by setting **Combine** to **ANY** or **ALL**.

## Branch execution with If and Merge nodes

--8<-- "_snippets/integrations/builtin/core-nodes/merge/if-merge-branch-execution.md"

## Example Usage

This workflow executes two different *Set* nodes based on the output given by an *IF* node. You can also find the [workflow](https://n8n.io/workflows/581) on n8n.io. This example usage workflow would use the following nodes.

- [Start](/integrations/builtin/core-nodes/n8n-nodes-base.start/)
- [Code](/integrations/builtin/core-nodes/n8n-nodes-base.code/)
- [IF]()
- [Set](/integrations/builtin/core-nodes/n8n-nodes-base.set/)


The final workflow should look like the following image.

![A workflow with the IF node](/_images/integrations/builtin/core-nodes/if/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.


### 2. Code node

1. Enter the following code:
```
return [
  {
    json: {
      id: 0,
    }
  },
  {
    json: {
      id: 1,
    }
  }
];
```
2. Click on **Execute Node** to run the workflow.

![Using the Code node to send data to the IF node](/_images/integrations/builtin/core-nodes/if/function_node.png)


### 3. IF node


1. Click on the **Add Condition** button and select 'Number' from the dropdown list.
2. Click on the gears icon next to the **Value 1** field and click on **Add Expression**.
3. Select the following in the **Variable Selector** section: Nodes > Function > Output Data > JSON > ID. You can also add the following expression: `{{$node["Function"].json["id"]}}`.
4. From the **Operation** dropdown list, select 'Equal'.
5. Click on **Execute Node** to run the workflow.


![Using the IF node to conditionally execute based on the input](/_images/integrations/builtin/core-nodes/if/if_node.png)


### 4. Set node (for 'true' condition)

1. Create a Set node connected to the 'true' output of the IF node.
2. Click on the **Add Value** button and select 'String' from the dropdown list.
3. Enter `name` in the **Name** field.
4. Enter `n8n` in the **Value** field.
5. Click on **Execute Node** to run the workflow.

**Note:** Notice that only the ID with the value 0 made its way to this Set node.

![Using the Set node to set a value when the condition is true](/_images/integrations/builtin/core-nodes/if/set_node.png)


### 5. Set1 node (for 'false' condition)

1. Create a *Set* node connected to the 'false' output of the IF node.
2. Click on the **Add Value** button and select 'String' from the dropdown list.
3. Enter `name` in the **Name** field.
4. Enter `nodemation` in the **Value** field.
5. Click on **Execute Node** to run the workflow.

**Note:** Notice that only the ID with the value 1 made its way to this *Set* node.

![Using the Set node to set a value when the condition is false](/_images/integrations/builtin/core-nodes/if/set1_node.png)





