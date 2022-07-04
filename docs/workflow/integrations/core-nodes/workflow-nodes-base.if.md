# IF

The IF node is used to split a workflow conditionally based on comparison operations.

## Node Reference

You can add comparison conditions using the ***Add Condition*** dropdown. Conditions can be created based on the data type, the available comparison operations vary for each data type.

**Boolean**
- Equal
- Not Equal


**Number**
- Smaller
- Smaller Equal
- Equal
- Not Equal
- Larger
- Larger Equal
- Is Empty


**String**
- Contains
- Equal
- Not Contains
- Not Equal
- Regex
- Is Empty


You can choose to split a workflow when any of the specified conditions are met, or only when all the specified conditions are met using the options in the ***Combine*** dropdown list.


## Example Usage

This workflow executes two different *Set* nodes based on the output given by an *IF* node. You can also find the [workflow](https://n8n.io/workflows/581) on Workflow².io. This example usage workflow would use the following nodes.
- [Start](/workflow/integrations/core-nodes/workflow-nodes-base.start/)
- [Function](/workflow/integrations/core-nodes/workflow-nodes-base.function/)
- [IF]()
- [Set](/workflow/integrations/core-nodes/workflow-nodes-base.set/)


The final workflow should look like the following image.

![A workflow with the IF node](/_images/integrations/core-nodes/if/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.


### 2. Function node

1. Enter the following code in the ***Function*** field.
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
2. Click on ***Execute Node*** to run the workflow.

![Using the Function node to send data to the IF node](/_images/integrations/core-nodes/if/function_node.png)


### 3. IF node


1. Click on the ***Add Condition*** button and select 'Number' from the dropdown list.
2. Click on the gears icon next to the ***Value 1*** field and click on ***Add Expression***.
3. Select the following in the ***Variable Selector*** section: Nodes > Function > Output Data > JSON > id. You can also add the following expression: `{{$node["Function"].json["id"]}}`.
4. From the ***Operation*** dropdown list, select 'Equal'.
5. Click on ***Execute Node*** to run the workflow.


![Using the IF node to conditionally execute based on the input](/_images/integrations/core-nodes/if/if_node.png)


### 4. Set node (for 'true' condition)

1. Create a *Set* node connected to the 'true' output of the IF node.
2. Click on the ***Add Value*** button and select 'String' from the dropdown list.
3. Enter `name` in the ***Name*** field.
4. Enter `n8n` in the ***Value*** field.
5. Click on ***Execute Node*** to run the workflow.

**Note:** Notice that only the id with the value 0 made its way to this *Set* node.

![Using the Set node to set a value when the condition is true](/_images/integrations/core-nodes/if/set_node.png)


### 5. Set1 node (for 'false' condition)

1. Create a *Set* node connected to the 'false' output of the IF node.
2. Click on the ***Add Value*** button and select 'String' from the dropdown list.
3. Enter `name` in the ***Name*** field.
4. Enter `nodemation` in the ***Value*** field.
5. Click on ***Execute Node*** to run the workflow.

**Note:** Notice that only the id with the value 1 made its way to this *Set* node.

![Using the Set node to set a value when the condition is false](/_images/integrations/core-nodes/if/set1_node.png)




