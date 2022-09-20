# Merge

Use the Merge node to combine data from two streams, once data of both streams is available.

!!! note "Major changes in 0.194.0"
		This node was overhauled in n8n 0.194.0. This document reflects the latest version of the node. If you're using an older version of n8n, you can find the previous version of this document [here](https://github.com/n8n-io/n8n-docs/blob/4ff688642cc9ee7ca7d00987847bf4e4515da59d/docs/integrations/builtin/core-nodes/n8n-nodes-base.merge.md){:target=_blank .external-link}.

## Merge mode

You can specify how the Merge node should combine data from different branches. The following options are available:

### Append

Combines data from both inputs. The output contains items from Input 1, followed by all items from Input 2.

### Merge by fields

Compare items by field values. Enter the fields you want to compare in **Fields to Match**.

n8n's default behavior is to keep matching items. You can change this using the **Output Type** setting:

* Keep matches: merge items that match.
* Keep non-matches: merge items that don't match.
* Enrich Input 1: keep all data from Input 1, and add matching data from Input 2.
* Enrich Input 2: leep all data from Input 2, and add matching data from Input 1.

### Merge by position

Combine items based on their order. The item at index 0 in Input 1 merges with the item at index 0 in Input 2, and so on.

#### Inputs with different numbers of items

If there are more items in one input than the other, the default behavior is to leave out the items without a match. Choose **Add Option** > **Include Any Unpaired Items** to keep the unmatched items.

#### Field value clashes

--8<-- "_snippets/integrations/builtin/core-nodes/merge/field-value-clash.md"

### Multiplex

Output all possible item combinations, while merging fields with the same name.

#### Field value clashes

--8<-- "_snippets/integrations/builtin/core-nodes/merge/field-value-clash.md"

### Choose branch

Choose which input to keep. This option always waits until the data from both inputs is available. You can keep the data from Input 1 or Input 2, or you can output a single empty item. The node outputs the data from the chosen input, without changing it.

## Merging branches with uneven numbers of items

The items passed into Input 1 of the Merge node will take precedence. For example, if the Merge node receives five items in Input 1 and 10 items in Input 2, it only processes five items. The remaining five items from Input 2 aren't processed.

## Branch execution with If and Merge nodes

--8<-- "_snippets/integrations/builtin/core-nodes/merge/if-merge-branch-execution.md"


## Try it out

Create a simple workflow with some example input data to try out the Merge node.

### Set up sample data using the Function nodes

1. Add a Function node to the canvas and connect it to the Start node.
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
3. Add a second Function node, and connect it to the Start node.
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

Add the Merge node. Connect the first Function node to **Input 1**, and the second Function node to **Input 2**. Run the workflow to load data into the Merge node.

The final workflow should look like the following image.

![Simple merge workflow with two function nodes](/_images/integrations/builtin/core-nodes/merge/workflow.png)

Now try different options in **Mode** to see how it affects the output data.

#### Append

Select **Mode** > **Append**, then select **Execute node**.

Output data in table view:

![Append mode output](/_images/integrations/builtin/core-nodes/merge/append-mode.png)

Output data in JSON view:

```json
[
  {
    "name": "Stefan",
    "language": "de"
  },
  {
    "name": "Jim",
    "language": "en"
  },
  {
    "name": "Hans",
    "language": "de"
  },
  {
    "greeting": "Hello",
    "language": "en"
  },
  {
    "greeting": "Hallo",
    "language": "de"
  }
]
```

#### Merge by fields

You can merge these two data inputs so that each person gets the correct greeting for their language.

1. Select **Mode** > **Merge By Fields**.
2. In both **Input 1 Field** and **Input 2 Field**, enter `language`. This tells n8n to combine the data by matching the values in the `language` field in each data set.
3. Select **Execute node**.

Output in table view:

![Merge by Fields mode output](/_images/integrations/builtin/core-nodes/merge/merge-by-fields-mode.png)

Output in JSON view:

```json
[
  {
    "name": "Stefan",
    "language": "de",
    "greeting": "Hallo"
  },
  {
    "name": "Jim",
    "language": "en",
    "greeting": "Hello"
  },
  {
    "name": "Hans",
    "language": "de",
    "greeting": "Hallo"
  }
]
```

#### Merge by position

Select **Mode** > **Merge By Position**, then select **Execute node**.

Default output in table view:

![Merge by Position mode output](/_images/integrations/builtin/core-nodes/merge/merge-by-position-mode-default.png)

Default output in JSON view:

```json
[
  {
    "name": "Stefan",
    "language": "en",
    "greeting": "Hello"
  },
  {
    "name": "Jim",
    "language": "de",
    "greeting": "Hallo"
  }
]
```

##### Keep unpaired items

If you want to keep all items, select **Add Option** > **Include Any Unpaired Items**, then enable **Include Any Unpaired Items**.

Output with unpaired items in table view:

![Merge by Position mode with unpaired items output](/_images/integrations/builtin/core-nodes/merge/merge-by-position-include-unpaired.png)

Output with unpaired items in JSON view:

```json
[
  {
    "name": "Stefan",
    "language": "en",
    "greeting": "Hello"
  },
  {
    "name": "Jim",
    "language": "de",
    "greeting": "Hallo"
  },
  {
    "name": "Hans",
    "language": "de"
  }
]
```

#### Multiplex

Select **Mode** > **Multiplex**, then select **Execute node**.

Output in table view:

![Merge by Multiplex mode output](/_images/integrations/builtin/core-nodes/merge/multiplex-mode.png)

Output in JSON view:

```json
[
  {
    "name": "Stefan",
    "language": "en",
    "greeting": "Hello"
  },
  {
    "name": "Stefan",
    "language": "de",
    "greeting": "Hallo"
  },
  {
    "name": "Jim",
    "language": "en",
    "greeting": "Hello"
  },
  {
    "name": "Jim",
    "language": "de",
    "greeting": "Hallo"
  },
  {
    "name": "Hans",
    "language": "en",
    "greeting": "Hello"
  },
  {
    "name": "Hans",
    "language": "de",
    "greeting": "Hallo"
  }
]
```



