

# data/binary-data.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Binary data
description: Understand and use binary data in n8n.
contentType: overview
tags:
  - binary data
hide:
  - tags
---

# Binary data

Binary data is any file-type data, such as image files or documents.

This page collects resources relating to binary data in n8n.

## Working with binary data in your workflows

You can process binary data in n8n workflows. n8n provides nodes to help you work with binary data. You can also use code.

### Nodes

There are three key nodes dedicated to handling binary data files:

- [Read/Write Files from Disk](/integrations/builtin/core-nodes/n8n-nodes-base.readwritefile.md) to read and write files from/to the machine where n8n is running.
- [Convert to File](/integrations/builtin/core-nodes/n8n-nodes-base.converttofile.md) to take input data and output it as a file.
- [Extract From File](/integrations/builtin/core-nodes/n8n-nodes-base.extractfromfile.md) to get data from a binary format and convert it to JSON.

There are separate nodes for working with XML and HTML data:

* [HTML](/integrations/builtin/core-nodes/n8n-nodes-base.html.md)
* [XML](/integrations/builtin/core-nodes/n8n-nodes-base.xml.md)

And nodes for performing common tasks:

* [Compression](/integrations/builtin/core-nodes/n8n-nodes-base.compression.md)
* [Edit Image](/integrations/builtin/core-nodes/n8n-nodes-base.editimage.md)
* [FTP](/integrations/builtin/core-nodes/n8n-nodes-base.ftp.md)

You can trigger a workflow based on changes to a local file using the [Local File trigger](/integrations/builtin/core-nodes/n8n-nodes-base.localfiletrigger.md).

To split or concatenate binary data items, use the [data transformation nodes](/data/index.md#data-transformation-nodes).

### Code

You can use the [Code node](/code/code-node.md) to manipulate binary data in your workflows. For example, [Get the binary data buffer](/code/cookbook/code-node/get-binary-data-buffer.md): get the binary data available in your workflow.


## Configure binary data mode when self-hosting

You can configure how your self-hosted n8n instance handles binary data using the [Binary data environment variables](/hosting/configuration/environment-variables/binary-data.md). This includes tasks such as setting the storage path and choosing how to store binary data.

Your configuration affects how well n8n scales: [Scaling | Binary data filesystem mode](/hosting/scaling/binary-data.md).

Reading and writing binary files can have security implications. If you want to disable reading and writing binary data, use the `NODES_EXCLUDE` environment variable. Refer to [Environment variables | Nodes](/hosting/configuration/environment-variables/nodes.md) for more information.


# data/code.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: explanation
---

# Processing data with code

## Function

A function is a block of code designed to perform a certain task. In n8n, you can write custom JavaScript or Python code snippets to add, remove, and update the data you receive from a node.

The [Code](/integrations/builtin/core-nodes/n8n-nodes-base.code/index.md) node gives you access to the incoming data and you can manipulate it. With this node you can create any function you want using JavaScript code.


# data/data-editing.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: howto
---

# Data editing

n8n allows you to edit [pinned data](/data/data-pinning.md). This means you can check different scenarios without setting up each scenario and sending the relevant data from your external system. It makes it easier to test edge cases.

/// note | For development only
Data editing isn't available for production workflow executions. It's a feature to help test workflows during development.
///
## Edit output data

To edit output data:

1. Run the node to load data.
2. In the **OUTPUT** view, select **JSON** to switch to JSON view.
3. Select **Edit** <span class="inline-image">![Edit data icon](/_images/data/data-pinning/edit-data.png){.off-glb}</span>.
4. Edit your data.
5. Select **Save**. n8n saves your data changes and pins your data.

## Use data from previous executions

You can copy data from nodes in previous workflow executions:

1. Open the left menu.
2. Select **Executions**.
3. Browse the workflow executions list to find the one with the data you want to copy.
4. Select **Open Past Execution** <span class="inline-image">![Open past execution icon](/_images/data/data-pinning/open-execution.png){.off-glb}</span>.
5. Double click the node whose data you want to copy.
6. If it's table layout, select **JSON** to switch to JSON view.
7. There are two ways to copy the JSON:
  1. Select the JSON you want by highlighting it, like selecting text. Then use `ctrl` + `c` to copy it.
  2. Select the JSON you want to copy by clicking on a parameter. Then:
    1. Hover over the JSON. n8n displays the **Copy** <span class="inline-image">![Copy data icon](/_images/data/data-pinning/copy-data.png){.off-glb}</span> button.
    2. Select **Copy** <span class="inline-image">![Copy data icon](/_images/data/data-pinning/copy-data.png){.off-glb}</span>.
    3. You can choose what to copy:
        * **Copy Item Path** and **Copy Parameter Path** gives you expressions that access parts of the JSON.
        * **Copy Value**: copies the entire selected JSON.
8. Return to the workflow you're working on:  
    1. Open the left menu.
    2. Select **Workflows**.
    3. Select **Open**.
    4. Select the workflow you want to open.
9. Open the node where you want to use the copied data.
10. If there is no data, run the node to load data.
11. In the **OUTPUT** view, select **JSON** to switch to JSON view. 
12. Select **Edit** <span class="inline-image">![Edit data icon](/_images/data/data-pinning/edit-data.png){.off-glb}</span>.
15. Paste in the data from the previous execution.
16. Select **Save**. n8n saves your data changes and pins your data.


# data/data-filtering.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: howto
---

# Data filtering

/// info | Feature availability
Available on Cloud Pro and Enterprise plans.
///

Search and filter data in the node **INPUT** and **OUTPUT** panels. Use this to check your node's data.

To search:

1. In a node, select **Search** <span class="inline-image">![Search icon](/_images/common-icons/search.png){.off-glb}</span> in the **INPUT** or **OUTPUT** panel.
1. Enter your search term.

n8n filters as you type your search, displaying the objects or rows containing the term.

Filtering is purely visual: n8n doesn't change or delete data. The filter resets when you close and reopen the node.


# data/data-flow-nodes.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Data flow within nodes
description: How nodes process data items.
contentType: explanation
---

# Data flow within nodes

--8<-- "_snippets/flow-logic/data-flow-nodes.md"


# data/data-mapping/data-item-linking/index.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: overview
---

# Data item linking

An item is a single piece of data. Nodes receive one or more items, operate on them, and output new items. Each item links back to previous items. 

You need to understand this behavior if you're:

* Building a programmatic-style node that implements complex behaviors with its input and output data.
* Using the Code node or expressions editor to access data from earlier items in the workflow. 
* Using the Code node for complex behaviors with input and output data.

This section provides:

* A conceptual overview of [Item linking concepts](/data/data-mapping/data-item-linking/item-linking-concepts.md). 
* Information on [Item linking for node creators](/data/data-mapping/data-item-linking/item-linking-node-building.md).
* Support for end users who need to [Work with the data path](/data/data-mapping/data-item-linking/item-linking-code-node.md) to retrieve item data from previous nodes, and link items when using the Code node.
* Guidance on troubleshooting [Errors](/data/data-mapping/data-item-linking/item-linking-errors.md).




# data/data-mapping/data-item-linking/item-linking-code-node.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: howto
---

# Item linking in the Code node
--8<-- "_snippets/data/data-mapping/item-linking-code-node.md"




# data/data-mapping/data-item-linking/item-linking-concepts.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: explanation
---

# Item linking concepts

Each output item created by a node includes metadata that links them to the input item (or items) that the node used to generate them. This creates a chain of items that you can work back along to access previous items. This can be complicated to understand, especially if the node splits or merges data. You need to understand item linking when building your own programmatic nodes, or in some scenarios using the Code node. 

This document provides a conceptual overview of this feature. For usage details, refer to:

* [Item linking for node creators](/data/data-mapping/data-item-linking/item-linking-node-building.md), for details on how to handle item linking when building a node.
* [Item linking in the Code node](/data/data-mapping/data-item-linking/item-linking-code-node.md), to learn how to handle item linking in the Code node.
* [Item linking errors](/data/data-mapping/data-item-linking/item-linking-errors.md), to understand the errors you may encounter in the editor UI.

## n8n's automatic item linking

If a node doesn't control how to link input items to output items, n8n tries to guess how to link the items automatically:

* Single input, single output: the output links to the input.
* Single input, multiple outputs: all outputs link to that input.
* Multiple inputs and outputs:
	* If you keep the input items, but change the order (or remove some but keep others), n8n can automatically add the correct linked item information.
	* If the number of inputs and outputs is equal, n8n links the items in order. This means that output-1 links to input-1, output-2 to input-2, and so on.
	* If the number isn't equal, or you create completely new items, n8n can't automatically link items.

If n8n can't link items automatically, and the node doesn't handle the item linking, n8n displays an error. Refer to [Item linking errors](/data/data-mapping/data-item-linking/item-linking-errors.md) for more information.

## Item linking example

![A diagram showing the threads linking multiple items back through a workflow](/_images/data/data-mapping/data-item-linking/item-linking-multiple-lines.png)

In this example, it's possible for n8n to link an item in one node back several steps, despite the item order changing. This means the node that sorts movies alphabetically can access information about the linked item in the node that gets famous movie actors.

The methods for accessing linked items are different depending on whether you're using the UI, expressions, or the code node. Explore the following resources:

* [Mapping in the UI](/data/data-mapping/data-mapping-ui.md)
* [Mapping in the expressions editor](/data/data-mapping/data-mapping-expressions.md)
* [Item linking in the Code node](/data/data-mapping/data-item-linking/item-linking-code-node.md)
* [Item linking errors](/data/data-mapping/data-item-linking/item-linking-errors.md)






# data/data-mapping/data-item-linking/item-linking-errors.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: reference
---

# Item linking errors

In n8n you can reference data from any previous node. This doesn't have to be the node just before: it can be any previous node in the chain. When referencing nodes further back, you use the expression syntax `$(node_name).item`. 

<figure markdown>
![A diagram showing the threads linking multiple items back through a workflow](/_images/data/data-mapping/data-item-linking/item-linking-multiple-lines.png)
<figcaption markdown>Diagram of threads for different items. Due to the item linking, you can get the actor for each movie using `$('Get famous movie actors').item`.</figcaption>
</figure>

Since the previous node can have multiple items in it, n8n needs to know which one to use. When using `.item`, n8n figures this out for you behind the scenes. Refer to [Item linking concepts](/data/data-mapping/data-item-linking/item-linking-concepts.md) for detailed information on how this works.

`.item` fails if information is missing. To figure out which item to use, n8n maintains a thread back through the workflow's nodes for each item. For a given item, this thread tells n8n which items in previous nodes generated it. To find the matching item in a given previous node, n8n follows this thread back until it reaches the node in question.

When using `.item`, n8n displays an error when:

- The thread is broken
- The thread points to more than one item in the previous node (as it's unclear which one to use)

To solve these errors, you can either avoid using `.item`, or fix the root cause.

You can avoid `.item` by using `.first()`, `.last()` or `.all()[index]` instead. They require you to know the position of the item that you’re targeting within the target node's output items. Refer to [Built in methods and variables | Output of other nodes](/code/builtin/output-other-nodes.md) for more detail on these methods.

The fix for the root cause depends on the exact error.

### Fix for 'Info for expressions missing from previous node'

If you see this error message:

> ERROR: Info for expression missing from previous node

There's a node in the chain that doesn't return pairing information. The solution here depends on the type of the previous node:

- Code nodes: make sure you return which input items the node used to produce each output item. Refer to [Item linking in the code node](/data/data-mapping/data-item-linking/item-linking-code-node.md) for more information.
- Custom or community nodes: the node creator needs to update the node to return which input items it uses to produce each output item. Refer to [Item linking for node creators](/data/data-mapping/data-item-linking/item-linking-node-building.md) for more information.

### Fix for 'Multiple matching items for expression'

This is the error message:

> ERROR: Multiple matching items for expression

Sometimes n8n uses multiple items to create a single item. Examples include the Summarize, Aggregate, and Merge nodes. These nodes can combine information from multiple items.

When you use `.item` and there are multiple possible matches, n8n doesn't know which one to use. To solve this you can either:

- Use `.first()`, `.last()` or `.all()[index]` instead. Refer to [Built in methods and variables | Output of other nodes](/code/builtin/output-other-nodes.md) for more detail on these methods.
- Reference a different node that contains the same information, but doesn't have multiple matching items.


# data/data-mapping/data-item-linking/item-linking-node-building.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: howto
---

# Item linking for node creators

--8<-- "_snippets/data/data-mapping/item-linking-node-creators.md"


# data/data-mapping/data-mapping-expressions.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: howto
---

# Mapping in the expressions editor

These examples show how to access linked items in the expressions editor. Refer to [expressions](/code/expressions.md) for more information on expressions, including built in variables and methods.

For information on errors with mapping and linking items, refer to [Item linking errors](/data/data-mapping/data-item-linking/item-linking-errors.md).

## Access the linked item in a previous node's output

When you use this, n8n works back up the item linking chain, to find the parent item in the given node.

```js
// Returns the linked item
{{$("<node-name>").item}}
```

As a longer example, consider a scenario where a node earlier in the workflow has the following output data:

```json
[
  {
    "id": "23423532",
    "name": "Jay Gatsby",
  },
  {
    "id": "23423533",
    "name": "José Arcadio Buendía",
  },
  {
    "id": "23423534",
    "name": "Max Sendak",
  },
  {
    "id": "23423535",
    "name": "Zaphod Beeblebrox",
  },
  {
    "id": "23423536",
    "name": "Edmund Pevensie",
  }
]
```

To extract the name, use the following expression:

```js
{{$("<node-name>").item.json.name}}
```


### Access the linked item in the current node's input

In this case, the item linking is within the node: find the input item that the node links to an output item.

```js
// Returns the linked item
{{$input.item}}
```

As a longer example, consider a scenario where the current node has the following input data:

```json
[
  {
    "id": "23423532",
    "name": "Jay Gatsby",
  },
  {
    "id": "23423533",
    "name": "José Arcadio Buendía",
  },
  {
    "id": "23423534",
    "name": "Max Sendak",
  },
  {
    "id": "23423535",
    "name": "Zaphod Beeblebrox",
  },
  {
    "id": "23423536",
    "name": "Edmund Pevensie",
  }
]
```

To extract the name, you'd normally use drag-and-drop [Data mapping](/data/data-mapping/index.md), but you could also write the following expression:

```js
{{$input.item.json.name}}
```


# data/data-mapping/data-mapping-ui.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: howto
---

# Mapping in the UI

Data mapping means referencing data from previous nodes. It doesn't include changing (transforming) data, just referencing it.

You can map data in the following ways:

* Using the expressions editor.
* By dragging and dropping data from the **INPUT** into parameters. This generates the expression for you.

For information on errors with mapping and linking items, refer to [Item linking errors](/data/data-mapping/data-item-linking/item-linking-errors.md).

## How to drag and drop data

1. Run your workflow to load data.
2. Open the node where you need to map data.
3. You can map in table, JSON, and schema view:
	* In table view: click and hold a table heading to map top level data, or a field in the table to map nested data.
	* In JSON view: click and hold a key. 
	* In schema view: click and hold a key.
4. Drag the item into the field where you want to use the data.

### Understand what you're mapping with drag and drop

Data mapping maps the key path, and loads the key's value into the field. For example, given the following data:

```js
[
	{
		"fruit": "apples",
		"color": "green"
	}
]
```

You can map `fruit` by dragging and dropping **fruit** from the **INPUT** into the field where you want to use its value. This creates an expression, `{{ $json.fruit }}`. When the node iterates over input items, the value of the field becomes the value of `fruit` for each item.

### Understand nested data

Given the following data:

```js
[
  {
    "name": "First item",
    "nested": {
      "example-number-field": 1,
      "example-string-field": "apples"
    }
  },
  {
    "name": "Second item",
    "nested": {
      "example-number-field": 2,
      "example-string-field": "oranges"
    }
  }
]
```

n8n displays it in table form like this:

!["Screenshot of a table in the INPUT panel. It includes a top level field named "nested." This field contains nested data, which is indicated in bold."](/_images/data/data-mapping/nested-data.png)



# data/data-mapping/index.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: overview
---

# Data mapping

Data mapping means referencing data from previous nodes. 

This section contains guidance on:

* Mapping data in most scenarios: [Data mapping in the UI](/data/data-mapping/data-mapping-ui.md) and [Data mapping in expression](/data/data-mapping/data-mapping-expressions.md)
* How to handle [item linking](/data/data-mapping/data-item-linking/index.md) when using the Code node or building your own nodes. 


# data/data-mocking.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Data mocking
description: Ways to mock data in your n8n workflow.
contentType: howto
---

# Data mocking

Data mocking is simulating or faking data. It's useful when developing a workflow. By mocking data, you can:

- Avoid making repeated calls to your data source. This saves time and costs.
- Work with a small, predictable dataset during initial development.
- Avoid the risk of overwriting live data: in the early stages of building your workflow, you don't need to connect your real data source.


## Mocking with real data using data pinning

Using [data pinning](/data/data-pinning.md), you load real data into your workflow, then pin it in the output panel of a node. Using this approach you have realistic data, with only one call to your data source. You can [edit pinned data](/data/data-editing.md).

Use this approach when you need to configure your workflow to handle the exact data structure and parameters provided by your data source.

--8<-- "_snippets/data/how-to-pin-data.md"


## Generate custom data using the Code or Edit Fields nodes

You can create a custom dataset in your workflow using either the [Code node](/integrations/builtin/core-nodes/n8n-nodes-base.code/index.md) or the [Edit Fields (Set) node](/integrations/builtin/core-nodes/n8n-nodes-base.set.md).

In the Code node, you can create any data set you want, and return it as the node output. In the Edit Fields node, select **Add fields** to add your custom data.

The Edit Fields node is a good choice for small tests. To create more complex datasets, use the Code node.

## Output a sample data set from the Customer Datastore node

The Customer Datastore node provides a fake dataset to work with. Add and execute the node to explore the data.

Use this approach if you need some test data when exploring n8n, and you don't have a real use-case to work with.


# data/data-pinning.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: howto
---

# Data pinning

You can 'pin' data during workflow development. Data pinning means saving the output data of a node, and using the saved data instead of fetching fresh data in future workflow executions. 

You can use this when working with data from external sources to avoid having to repeat requests to the external system. This can save time and resources:

* If your workflow relies on an external system to trigger it, such as a webhook call, being able to pin data means you don't need to use the external system every time you test the workflow.
* If the external resource has data or usage limits, pinning data during tests avoids consuming your resource limits.
* You can fetch and pin the data you want to test, then have confidence that the data is consistent in all your workflow tests.

You can only pin data for nodes that have a single main output ("error" outputs don't count for this purpose).

/// note | For development only
Data pinning isn't available for production workflow executions. It's a feature to help test workflows during development.
///

## Pin data

--8<-- "_snippets/data/how-to-pin-data.md"

## Unpin data

When data pinning is active, a banner appears at the top of the node's output panel indicating that n8n has pinned the data. To unpin data and fetch fresh data on the next execution, select the **Unpin** link in the banner.


# data/data-structure.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: explanation
---

# Data structure

In n8n, all data passed between nodes is an array of objects. It has the following structure:

```json
[
	{
		// For most data:
		// Wrap each item in another object, with the key 'json'
		"json": {
			// Example data
			"apple": "beets",
			"carrot": {
				"dill": 1
			}
		},
		// For binary data:
		// Wrap each item in another object, with the key 'binary'
		"binary": {
			// Example data
			"apple-picture": {
				"data": "....", // Base64 encoded binary data (required)
				"mimeType": "image/png", // Best practice to set if possible (optional)
				"fileExtension": "png", // Best practice to set if possible (optional)
				"fileName": "example.png", // Best practice to set if possible (optional)
			}
		}
	},
]
```

/// note | Skipping the `json` key and array syntax
From 0.166.0 on, when using the Function node or Code node, n8n automatically adds the `json` key if it's missing. It also automatically wraps your items in an array (`[]`) if needed. This is only the case when using the Function or Code nodes. When building your own nodes, you must still make sure the node returns data with the `json` key.
///
## Data item processing

--8<-- "_snippets/flow-logic/data-flow-nodes.md"




# data/index.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: overview
---

# Data

Data is the information that n8n nodes receive and process. For basic usage of n8n you don't need to understand data structures and manipulation. However, it becomes important if you want to:

 - Create your own node
 - Write custom [expressions](/glossary.md#expression-n8n)
 - Use the Function or Function Item node

This section covers: 

* [Data structure](/data/data-structure.md)
* [Data flow within nodes](/data/data-flow-nodes.md)
* [Transforming data](/data/transforming-data.md)
* [Process data using code](/data/code.md)
* [Pinning](/data/data-pinning.md) and [editing](/data/data-editing.md) data during workflow development.
* [Data mapping](/data/data-mapping/index.md) and [Item linking](/data/data-mapping/data-item-linking/index.md): how data items link to each other.

## Related resources

### Data transformation nodes

n8n provides a collection of nodes to transform data:

* [Aggregate](/integrations/builtin/core-nodes/n8n-nodes-base.aggregate.md): take separate items, or portions of them, and group them together into individual items.
* [Limit](/integrations/builtin/core-nodes/n8n-nodes-base.aggregate.md): remove items beyond a defined maximum number.
* [Remove Duplicates](/integrations/builtin/core-nodes/n8n-nodes-base.removeduplicates/index.md): identify and delete items that are identical across all fields or a subset of fields.
* [Sort](/integrations/builtin/core-nodes/n8n-nodes-base.sort.md): organize lists of in a desired ordering, or generate a random selection.
* [Split Out](/integrations/builtin/core-nodes/n8n-nodes-base.splitout.md): separate a single data item containing a list into multiple items.
* [Summarize](/integrations/builtin/core-nodes/n8n-nodes-base.summarize.md): aggregate items together, in a manner similar to Excel pivot tables. 


# data/schema-preview.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Schema preview
description: 
contentType: overview
---

# Schema Preview

Schema Preview exposes expected schema data from the previous node in the Node Editor without the user having to provide credentials or execute the node. This makes it possible to construct workflows without having to provide credentials in advance. The preview doesn't include mock data, but it does expose the expected fields, making it possible to select and incorporate them into the input of subsequent nodes.

## Using the preview 

1. There must be a node with Schema Preview available in your workflow.
1. When clicking on the details of the next node in the sequence, the Schema Preview data will show up in the Node Editor where schema data would typically be exposed.
1. Use data from the Schema Preview just as you would other schemas - drag and drop fields as input into your node parameters and settings.


# data/transforming-data.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: explanation
---

# Transforming data

n8n uses a predefined [data structure](/data/data-structure.md) that allows all nodes to process incoming data correctly.

Your incoming data may have a different data structure, in which case you will need to transform it to allow each item to be processed individually.

For example, the image below shows the output of an [HTTP Request](/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/index.md) node that returns data incompatible with n8n's data structure. The node returns the data and displays that only one item was returned.

![HTTP Request node output](/_images/data/transforming-data/HTTPRequest_output.png)

To transform this kind of structure into the n8n data structure you can use the data transformation nodes:

* [Aggregate](/integrations/builtin/core-nodes/n8n-nodes-base.aggregate.md): take separate items, or portions of them, and group them together into individual items.
* [Limit](/integrations/builtin/core-nodes/n8n-nodes-base.limit.md): remove items beyond a defined maximum number.
* [Remove Duplicates](/integrations/builtin/core-nodes/n8n-nodes-base.removeduplicates/index.md): identify and delete items that are identical across all fields or a subset of fields.
* [Sort](/integrations/builtin/core-nodes/n8n-nodes-base.sort.md): organize lists of in a desired ordering, or generate a random selection.
* [Split Out](/integrations/builtin/core-nodes/n8n-nodes-base.splitout.md): separate a single data item containing a list into multiple items.
* [Summarize](/integrations/builtin/core-nodes/n8n-nodes-base.summarize.md): aggregate items together, in a manner similar to Excel pivot tables. 

    
