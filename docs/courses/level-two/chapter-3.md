# Merging and splitting data

In this chapter, you will learn how to merge and split data, and in what cases it might be useful to perform these operations.


## Merging data

In some cases, you might need to merge (combine) and process data from different sources.

Merging (combining) data can involve:
- Creating one data set from multiple sources.
- Synchronizing data between multiple systems. For example, removing duplicate data, or updating data in one system when it changes in another.

:::tip :open_book: One-way vs. two-way sync
In a **one-way sync**, data is synchronized in one direction. One system serves as the single source of truth. When information changes in that main system, it automatically changes in the secondary system; but if information changes in the secondary system, the changes are not reflected in the main system.

In a **two-way sync**, data is synchronized in both directions (between both systems). When information changes in either of the two systems, it automatically changes in the other one as well. 

[This blog tutorial](https://n8n.io/blog/how-to-sync-data-between-two-systems/) explains how to sync data one-way and two-way between two CRMs.
:::

In n8n, you can merge data from two different nodes using the [***Merge node***](https://docs.n8n.io/nodes/n8n-nodes-base.merge/), which provides four merging modes:

- Append
- Keep Key Matches :key:
- Merge By Index
- Merge By Key :key:
- Multiples
- Pass-through
- Remove Key Matches :key:
- Wait

Notice that three of these modes require a **key** :key: (Merge By Key, Keep Key Matches, Remove Key Matches). This key represents a common property between the two data sources, based on which the data can be merged. In the *Merge node*, they are called `Property Input 1` and `Property Input 2`.

<figure><img src="./course_images/explanation_mergePropertyInput.png" alt="" style="width:100%"><figcaption align = "center"><i>Property Input fields in the Merge node</i></figcaption></figure>

:::warning :warning: **Property Input in dot notation**
If you want to reference nested values in the *Merge node* parameters `Property Input 1` and `Property Input 2`, you need to enter the property key in dot-notation format (as text, not as an expression).
:::

### Exercise

Add a *Merge node* that takes Input 1 from a *Customer Datastore node* and Input 2 from a *Function node*.

In the *Customer Datastore node*, run the operation Get All People.

In the *Function node*, create an array of two objects with three properties: `name`, `language`, and `country`, where the property `country` has two sub-properties `code` and `name`. Fill out the values of these properties with the information of two characters from the *Customer Database*. For example, Jay Gatsby's language would be English and country name would be United States.

In the *Merge node*, try out different merge modes.

<details>
<summary>Show me the solution</summary>

The workflow for this exercise looks like this:

<figure><img src="./course_images/exercise_merge.png" alt="" style="width:100%"><figcaption align = "center"><i>Workflow exercise for merging data</i></figcaption></figure>

If you merge data with the option *Keep Key Matches* using the country code as the common key, the result should look like this:

<figure><img src="./course_images/exercise_merge_kkm.png" alt="" style="width:100%"><figcaption align = "center"><i>Output of Merge node with option to keep key matches</i></figcaption></figure>

</details>

## Looping

In some cases, you might need to perform the same operation on each element of an array / each data item (for example sending a message to every contact in your address book). In technical terms, you need to **iterate** through the data (with **loops**).

[//]: #TODO: "Include explanations and illustrations of for vs. while loops"


n8n handles this repetitive processing automatically, as the nodes run once for each item, so you don't need to build loops into your workflows. However, there are some [exceptions of nodes and operations for which you need to build a loop into your workflow](https://docs.n8n.io/getting-started/key-concepts/looping.html#node-exceptions).

To [create a loop in an n8n workflow](https://docs.n8n.io/getting-started/key-concepts/looping.html#using-loops-in-n8n), you need to connect the output of one node to the input of a previous node, and add an *IF node* to check when to stop the loop.

[//]: #TODO: "Add workflow example / exercise"

## Splitting data in batches

If you need to process large incoming data, execute the *Function node* multiple times, or avoid API rate limits, it's best to split the data into batches (groups) and process these batches. You can do this with the [***Split in Batches node***](https://docs.n8n.io/nodes/n8n-nodes-base.splitInBatches/). This node splits input data into a specified batch size and, with each iteration, returns a predefined amount of data.

:::warning :bulb: The Split In Batches node stops executing after all the incoming items get divided into batches and passed on to the next node in the workflow, so it is not necessary to add an *IF node* to stop the loop.
:::

### Exercise

Build a workflow that reads the RSS feed from Medium and dev.to. The workflow should consist of three nodes:
- a *Function node* that returns the URLs of the RSS feeds of Medium (`https://medium.com/feed/n8n-io`) and dev.to (`https://dev.to/feed/n8n`)
- a *Split In Batches node* with `Batch Size: 1`, that takes in the inputs from the *Function node* and *RSS node* and iterates over the items.
- an *RSS Read node* that gets the URL of the Medium RSS feed, passed as an expression: `{{$node["SplitInBatches"].json["url"]}}`. The *RSS Read node* is one of the exception nodes which processes only the first item it receives, so the *Split in Batches node* is necessary for iterating over multiple items.

<details>
<summary>Show me the solution</summary>

The workflow for this exercise looks like this:

<figure><img src="./course_images/exercise_splitInBatches.png" alt="" style="width:100%"><figcaption align = "center"><i>Workflow for getting RSS feeds from two blogs</i></figcaption></figure>

To check the configuration of the nodes, you can copy-paste the JSON code of the workflow:

```json
{
  "nodes": [
    {
      "parameters": {
        "functionCode": "return [\n  {\n    json: {\n      url: 'https://medium.com/feed/n8n-io',\n    }\n  },\n  {\n    json: {\n      url: 'https://dev.to/feed/n8n',\n    }\n  }\n];"
      },
      "name": "Function",
      "type": "n8n-nodes-base.function",
      "position": [
        480,
        1880
      ],
      "typeVersion": 1
    },
    {
      "parameters": {
        "url": "={{$node[\"SplitInBatches\"].json[\"url\"]}}"
      },
      "name": "RSS Feed Read",
      "type": "n8n-nodes-base.rssFeedRead",
      "position": [
        880,
        1880
      ],
      "typeVersion": 1
    },
    {
      "parameters": {
        "batchSize": 1,
        "options": {}
      },
      "name": "SplitInBatches",
      "type": "n8n-nodes-base.splitInBatches",
      "position": [
        680,
        1880
      ],
      "typeVersion": 1
    }
  ],
  "connections": {
    "Function": {
      "main": [
        [
          {
            "node": "SplitInBatches",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "RSS Feed Read": {
      "main": [
        [
          {
            "node": "SplitInBatches",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "SplitInBatches": {
      "main": [
        [
          {
            "node": "RSS Feed Read",
            "type": "main",
            "index": 0
          }
        ]
      ]
    }
  }
}
```
</details>