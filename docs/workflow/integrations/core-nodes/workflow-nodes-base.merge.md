# Merge

The Merge node is useful to merge data of multiple streams, once data of both streams is available.

## Node Reference

### Mode

!!! note " Keep in mind"
    The items passed into Input 1 of the Merge node will take precedence. For example, if 5 items are received in Input 1 and 10 items are received in Input 2, the Merge node will only process 5 items. The remaining 5 items from Input 2 will not be processed.


You can specify how data of branches should be merged. The following options are available:

- ***Append:*** Combines data of both inputs. The output will contain items of input 1 and input 2.
- ***Keep Key Matches:*** Keeps data of input 1 if it finds a match with data of input 2.
- ***Merge By Index:*** Merges data of both the inputs. The output will contain the data of input 1 merged with the data of input 2. The merge occurs based on the index of the items. For example, the first item of input 1 will be merged with the first item of input 2.
- ***Merge By Key:*** Merges data of both the inputs. The output will contain the data of input 1 merged with the data of input 2. The merge occurs depending on a defined key.
- ***Multiples:*** Merges each value of one input with each value of the other input. The output will contain (m*n) items where (m) and (n) are lengths of the inputs.
- ***Pass-through:*** Passes through the data of one input. The output will contain items of the defined input.
- ***Remove Key Matches:*** Keeps the data of input 1 if it does not find a match with the data of input 2.
- ***Wait:*** Waits till the data of both the inputs is available. It will then output a single empty item.

### Additional Fields
- ***Property Input 1:*** The name of the property which decides which items of input 1 to merge. This field is displayed when 'Keep Key Matches', 'Merge By Key', or 'Remove Key Matches' is selected in the ***Mode*** dropdown list.
- ***Property Input 2:*** The name of the property which decides which items of input 2 to merge. This field is displayed when 'Keep Key Matches', 'Merge By Key', or 'Remove Key Matches' is selected in the ***Mode*** dropdown list.
- ***Join:*** Use this to specify how many items the output should contain if inputs contain different amount of items. This field is displayed when 'Merge By Index' is selected in the ***Mode*** dropdown list. You can select from the following options.
    - ***Inner Join:*** Merges as many items as both the inputs contains. For example, if input 1 contains 3 items and input 2 contains 3 items, the output will contain 3 items.
    - ***Left Join:*** Merges as many items as the first input contains. For example, if input 1 contains 3 items and input 2 contains 5 items, the output will contain 3 items.
    - ***Outer Join:*** Merges as many items as input contains with most items. For example, if input 1 contains 3 items and input 2 contains 5 items, the output will contain 5 items.
- ***Overwrite:*** Select when to overwrite the values from Input1 with values from Input 2. This field is displayed when 'Merge By Key' is selected from the ***Mode*** dropdown list. You can select from the following options.
    - ***Always:*** Always overwrites everything.
    - ***If Blank:*** Overwrites only values of 'null', 'undefined' or the empty strings.
    - ***If Missing:*** Only adds values which do not exist yet.
- ***Output Data:*** Defines which input data should be used as the output of the node. This field is displayed when 'Pass-through' is selected from the ***Mode*** dropdown list. You can select from the following options.
    - ***Input 1***
    - ***Input 2***

## Example Usage

This workflow allows you to merge greetings for the users based on their associated language using the Merge node. You can also find the [workflow](https://n8n.io/workflows/655) on Workflow².io. This example usage workflow uses the following nodes.
- [Start](/workflow/integrations/core-nodes/workflow-nodes-base.start/)
- [Funtion](/workflow/integrations/core-nodes/workflow-nodes-base.function/)
- [Merge]()

The final workflow should look like the following image.

![A workflow with the HTML Extract node](/_images/integrations/core-nodes/merge/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.


### 2. Function node

1. Paste the following JavaScript code snippet in the ***Function*** field.
```js
return [
  {
    json: {
      name: 'Stefan',
      language: 'de',
    }
  },
  {
    json: {
      name: 'Jim',
      language: 'en',
    }
  },
  {
    json: {
      name: 'Hans',
      language: 'de',
    }
  }
];
```
2. Click on ***Execute Node*** to run the node.

![Generate users information using the Function node](/_images/integrations/core-nodes/merge/function_node.png)


### 3. Function1 node

1. Paste the following JavaScript code snippet in the ***Function*** field.
```js
return [
  {
    json: {
      greeting: 'Hallo',
      language: 'de',
    }
  },
  {
    json: {
      greeting: 'Hello',
      language: 'en',
    }
  }
];
```
2. Click on ***Execute Node*** to run the node.


![Generate greetings information using the Function node](/_images/integrations/core-nodes/merge/function1_node.png)


### 4. Merge node (mergeByKey)

1. Select 'Merge By Key' from the ***Mode*** dropdown list.
2. Enter `language` in the ***Property Input 1*** field.
3. Enter `language` in the ***Property Input 2*** field.
4. Click on ***Execute Node*** to run the node.


![Merge user information and greetings information using the Merge node](/_images/integrations/core-nodes/merge/merge_node.png)





