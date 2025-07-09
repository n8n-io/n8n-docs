<!-- vale off -->
# How n8n structures data

To use n8n effectively, it's important to understand the structure that uses to represent and transfer data throughout your workflows.

## Items: the basic building block

n8n's execution model is designed around processing **items**. An [item](/glossary.md#item-n8n) is a bundle of related data represented by a JSON object.

Here is an example of an item:

```json
{ // (1)!
  "name": "Jane Doe", // (2)!
  "age": 43, // (3)!
  "position": "engineer",
  "emails": { // (4)!
    "work": "jane@great-company.com",
    "personal": "jane.doe@example.com"
  }
}
```

1. This JSON object represents a single item.
2. The item's data is defined with JSON properties — key-value pairs.
3. Items can encode data using native JSON data types.
4. Items can include nested data structures to represent more complex information.

In comparison to a relational database or a spreadsheet, an item is akin to a single row in a table. Similarly, each of its properties define a name, value, and data type like a table column and cell.

## Groups of items

n8n workflows and the nodes within them process groups of items. These are represented in the n8n UI as an array of items, which is appropriately called `items`:

![n8n items](/_images/courses/level-two/chapter-one/explanation_items.png)

Here is an example of an items array:

```json
[ // (1)!
  { // (2)!
    "name": "Jane Doe",
    "age": 43,
    "position": "engineer",
    "emails": {
      "work": "jane@great-company.com",
      "personal": "jane.doe@example.com"
    }
  },
  { // (3)!
    "name": "Pedro Nguyen",
    "age": 26,
    "position": "accountant",
    "emails": {
      "work": "pedro@great-company.com",
      "personal": "pnguyen@some-email.com"
    }
  }
]
```

1. You can access the array of items in expressions as `.items`.
2. This is the first item in the items array.
3. This is the second item.

To continue the earlier analogy, you can think of these structures as database or spreadsheet tables, each of which can contain multiple rows of data.

This array of items is the data format that nodes expect as input and produce as output.

## The underlying structure

The n8n UI simplifies the data when displaying items. The actual data passed between nodes wraps each item's properties within a nested JSON object called `json`:

```json
[
  { // (1)!
    "json": { // (2)!
      "name": "Jane Doe",
      "age": 43,
      "position": "engineer",
      "emails": {
        "work": "jane@great-company.com",
        "personal": "jane.doe@example.com"
      }
    }
  },
  { // (3)!
    "json": {
      "name": "Pedro Nguyen",
      "age": 26,
      "position": "accountant",
      "emails": {
        "work": "pedro@great-company.com",
        "personal": "pnguyen@some-email.com"
      }
    }
  }
]
```

1. This is the first item.
2. n8n hides this `json` layer when displaying items in input and output panels.
3. This is the second item.

A more complete illustration of the earlier `items` array might look like this:

![Illustration of data structure in n8n](/_images/courses/level-two/chapter-one/explanation_datastructure.png)

By putting the item's properties in the `json` object, n8n can also bundle other information like metadata and binary data alongside the item's primary data:

```json
[
  { // (1)!
    "json": {
      "name": "Jane Doe",
      "age": 43,
      "position": "engineer",
      "emails": {
        "work": "jane@great-company.com",
        "personal": "jane.doe@example.com"
      }
    },
    "binary": { // (2)!
      . . .
    },
    "pairedItem": { // (3)!
      "item": 0
    }
  },
  {
    . . .
  }
]
```

1. The item encapsulates the item's properties, as well as any binary data and metadata.
2. Learn more about how n8n manages [binary data](/new-data/binary-data.md).
3. n8n uses `pairedItem` metadata to [track which input items generated each item](/new-data/item-linking/concepts.md).

Not all items will include these same sibling keys. You won't have to worry about this extra layer of nesting during normal processing, but you might need to be aware of these when performing [manual data linking](/new-data/item-linking/concepts.md) or working with [binary data](/new-data/binary-data.md).

## How workflows process data

When building workflows, you connect the output of one node to the input of the next.

These workflow connections determine:

* **Data flow**: A connection between two nodes passes data from one node's output to another node's input.
* **Execution control**: Once a node finishes executing, n8n follows the connection to execute the next node in the chain. In cases where the workflow branches, the [execution order](/flow-logic/execution-order.md) determines which branch executes first.

By default, nodes perform their actions on each of the items they receive as input in sequence, similar to how a `for` loop works in many programming languages. This means that you don't typically have to add any looping constructs to your workflow to process the multiple items.

If you open a node on the canvas, the **Input pane** displays the items a node receives as input and, after executing, the **Output pane** shows the items it will pass on to nodes that follow. In either pane, you can switch between JSON, schema, and table view and also see the total number of items in each category.

![Items in the Customer Datastore node](/_images/flow-logic/looping/customer_datastore_node.png)

While nodes primarily operate on their input data, they also have access to the output of all nodes in the chain leading back to the initial trigger node. These are accessible through the input panel and can be referenced using expressions.

<!--

## Referencing items with expressions

You can find out how to reference node data generally in the [reference data]() page. This section includes some basic examples of how to reference the `items` array, individual items, and data properties using expressions.

| Description                                                     | Expression                                                                                |
|-----------------------------------------------------------------|-------------------------------------------------------------------------------------------|
| Reference the entire input `items` array.                       | `$input.all()`                                                                            |
| Reference an individual item in the array by index.             | `$input.all()[0]` (to reference the first item)                                           |
| Reference the individual input item linked to the current item. | `$input.item`                                                                             |
| Reference an individual item's list of properties.              | By index: `$input.all()[0]`<br>For the current item: `$input.item.json` or simply `$json` |

-->
