---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Merge
description: Documentation for the Merge node in n8n, a workflow automation platform. Includes guidance on usage, and links to examples.
contentType: integration
priority: critical
---

# Merge

Use the Merge node to combine data from multiple streams, once data of all streams is available.

/// note | Major changes in 0.194.0
The n8n team overhauled this node in n8n 0.194.0. This document reflects the latest version of the node. If you're using an older version of n8n, you can find the previous version of this document [here](https://github.com/n8n-io/n8n-docs/blob/4ff688642cc9ee7ca7d00987847bf4e4515da59d/docs/integrations/builtin/core-nodes/n8n-nodes-base.merge.md){:target=_blank .external-link}.
///

/// note | Minor changes in 1.49.0
n8n version 1.49.0 introduced the option to add more than two inputs. Older versions only support up to two inputs. If you're running an older version and want to combine multiple inputs in these versions, use the [Code node](https://deploy-preview-2225--n8n-docs.netlify.app/code/code-node/).

The **Mode > SQL Query** feature was also added in n8n version 1.49.0 and isn't available in older versions.
///

## Node parameters

You can specify how the Merge node should combine data from different data streams by choosing a **Mode**: 

### Append

Keep data from all inputs. Choose a **Number of Inputs** to output items of each input, one after another. The node waits for the execution of all connected inputs. 

<figure markdown="span">
![Sample Append mode inputs and output. Two separate data sources are on the left, one with items A, B, C and one with items D, E, F. The final data source combines both and lists A, B, C, D, E, F.](/_images/integrations/builtin/core-nodes/merge/append-diagram.png)
<figcaption>Append mode inputs and output</figcaption>
</figure>

### Combine

Combine data from two inputs. Select an option in **Combine By** to determine how you want to merge the input data.

#### Matching Fields

Compare items by field values. Enter the fields you want to compare in **Fields to Match**. 

n8n's default behavior is to keep matching items. You can change this using the **Output Type** setting:

* **Keep Matches**: Merge items that match. This is like an inner join.
* **Keep Non-Matches**: Merge items that don't match.
* **Keep Everything**: Merge items together that do match and include items that don't match. This is like an outer join.
* **Enrich Input 1**: Keep all data from Input 1, and add matching data from Input 2. This is like a left join.
* **Enrich Input 2**: Keep all data from Input 2, and add matching data from Input 1. This is like a right join.

<figure markdown="span">
![Sample Combine mode inputs and output. Two separate data sources are on the left. The final data source combines these data sources by matching fields.](/_images/integrations/builtin/core-nodes/merge/merge-by-field-diagram.png)
<figcaption>Combine by Matching Fields mode inputs and output</figcaption>
</figure>


#### Position

Combine items based on their order. The item at index 0 in Input 1 merges with the item at index 0 in Input 2, and so on.

<figure markdown="span">
![Sample Combine mode inputs and output. Two separate data sources are on the left. The final data source combines these data sources by index position.](/_images/integrations/builtin/core-nodes/merge/merge-by-position-diagram.png)
<figcaption>Combine by Position mode inputs and output</figcaption>
</figure>


#### All Possible Combinations

Output all possible item combinations, while merging fields with the same name.

<figure markdown="span">
![Sample Combine mode inputs and output. Two separate data sources are on the left. The final data source combines these data sources by all possible combinations.](/_images/integrations/builtin/core-nodes/merge/multiplex-diagram.png)
<figcaption>Combine by All Possible Combinations mode inputs and output</figcaption>
</figure>

#### Combine mode options

When merging data by **Mode > Combine**, you can set these **Options**:

* **Clash Handling**: Choose how to merge when data streams clash, or when there are sub-fields. Refer to [Clash handling](#clash-handling) for details.
* **Fuzzy Compare**: Whether to tolerate type differences when comparing fields (enabled), or not (disabled, default). For example, when you enable this, n8n treats `"3"` and `3` as the same.
* **Disable Dot Notation**: This prevents accessing child fields using `parent.child` in the field name.
* **Multiple Matches**: Choose how n8n handles multiple matches when comparing data streams.
    * **Include All Matches**: Output multiple items if there are multiple matches, one for each match.
    * **Include First Match Only**: Keep the first item per match and discard the remaining multiple matches.
* **Include Any Unpaired Items**: Choose whether to keep or discard unpaired items when merging by position. The default behavior is to leave out the items without a match. 

##### Clash Handling

--8<-- "_snippets/integrations/builtin/core-nodes/merge/field-value-clash.md"

### SQL Query

Write a custom SQL Query to merge the data. 

Example: 
```sql
SELECT * FROM input1 LEFT JOIN input2 ON input1.name = input2.id
```

Data from previous nodes are available as tables and you can use them in the SQL query as input1, input2, input3, and so on, based on their order. Refer to [AlaSQL GitHub page](https://github.com/alasql/alasql/wiki/Supported-SQL-statements){:target=_blank .external-link} for a full list of supported SQL statements. 

### Choose Branch

Choose which input to keep. This option always waits until the data from both inputs is available. You can choose to **Output**:

* The **Input 1 Data**
* The **Input 2 Data**
* **A Single, Empty Item**

The node outputs the data from the chosen input, without changing it.

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'merge') ]]

## Merging data streams with uneven numbers of items

The items passed into Input 1 of the Merge node will take precedence. For example, if the Merge node receives five items in Input 1 and 10 items in Input 2, it only processes five items. The remaining five items from Input 2 aren't processed.

## Branch execution with If and Merge nodes

--8<-- "_snippets/integrations/builtin/core-nodes/merge/if-merge-branch-execution.md"


## Try it out: A step by step example

Create a workflow with some example input data to try out the Merge node.

### Set up sample data using the Code nodes

1. Add a Code node to the canvas and connect it to the Start node.
2. Paste the following JavaScript code snippet in the **JavaScript Code** field:
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
3. Add a second Code node, and connect it to the Start node.
4. Paste the following JavaScript code snippet in the **JavaScript Code** field:
```js
return [
	  {
    json: {
      greeting: 'Hello',
      language: 'en',
    }
  },
  {
    json: {
      greeting: 'Hallo',
      language: 'de',
    }
  }
];
```

### Try out different merge modes

Add the Merge node. Connect the first Code node to **Input 1**, and the second Code node to **Input 2**. Run the workflow to load data into the Merge node.

The final workflow should look like this:

[[ workflowDemo("https://api.n8n.io/workflows/templates/655") ]]

Now try different options in **Mode** to see how it affects the output data.

#### Append

Select **Mode** > **Append**, then select **Test step**.

Your output in table view should look like this:
<!-- vale off -->
| **name** | **language** | **greeting** |
| --- | --- | --- |
| Stefan | de |  |
| Jim | en |  |
| Hans | de |  |
|   | en | Hello |
|   | de | Hallo |
<!-- vale on -->

#### Combine by Matching Fields

You can merge these two data inputs so that each person gets the correct greeting for their language.

1. Select **Mode** > **Combine**.
2. Select **Combine by** > **Matching Fields**.
3. In both **Input 1 Field** and **Input 2 Field**, enter `language`. This tells n8n to combine the data by matching the values in the `language` field in each data set.
4. Select **Test step**.

Your output in table view should look like this:
<!-- vale off -->

| **name** | **language** | **greeting** |
| --- | --- | --- |
| Stefan | de | Hallo |
| Jim | en | Hello  |
| Hans | de | Hallo |
<!-- vale on -->

#### Combine by Position

Select **Mode** > **Combine**, **Combine by** > **Position**, then select **Test step**.

Your output in table view should look like this:
<!-- vale off -->
| **name** | **language** | **greeting** |
| --- | --- | --- |
| Stefan | en | Hello |
| Jim | de | Hallo  |
<!-- vale on -->

##### Keep unpaired items

If you want to keep all items, select **Add Option** > **Include Any Unpaired Items**, then turn on **Include Any Unpaired Items**.

Your output in table view should look like this:
<!-- vale off -->
| **name** | **language** | **greeting** |
| --- | --- | --- |
| Stefan | en | Hello |
| Jim | de | Hallo  |
| Hans | de |  |
<!-- vale on -->

#### Combine by All Possible Combinations 

Select **Mode** > **Combine**, **Combine by** > **All Possible Combinations**, then select **Test step**.

Your output in table view should look like this:
<!-- vale off -->
| **name** | **language** | **greeting** |
| --- | --- | --- |
| Stefan | en | Hello |
| Stefan | de | Hallo |
| Jim | en | Hello  |
| Jim | de | Hallo |
| Hans | en | Hello |
| Hans | de | Hallo |
<!-- vale on -->
