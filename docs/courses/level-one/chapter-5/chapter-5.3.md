---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: tutorial
---

# 3. Filtering Orders

In this step of the workflow you will learn how to filter data using conditional logic and how to use expressions in nodes using the If node.

To insert only processing orders into Airtable we need to filter our data by `orderStatus`. Basically, we want to tell the program that _if_ the `orderStatus` is processing, _then_ insert all records with this status into Airtable; _else_, for example, if the `orderStatus` isn't *processing*, calculate the sum of all orders with the other `orderStatus (booked)`.

This if-then-else command is conditional logic. In n8n workflows, conditional logic can be implemented with the [If node](/integrations/builtin/core-nodes/n8n-nodes-base.if/){:target="_blank" .external}, which splits a workflow conditionally based on comparison operations.

/// note | If vs. Switch
If you need to filter data on more than two conditional routes that are possible with the If node (true and false), use the [Switch node](/integrations/builtin/core-nodes/n8n-nodes-base.switch/){:target="_blank" .external}. The Switch node is similar to the If node, but supports multiple output routes.
///

## Remove the connection to the Airtable node

First, let's remove the connection between the HTTP Request node and the Airtable node:

1. Hover over the arrow connection the **HTTP Request** node and the **Airtable** node.
2. Select the trash icon to remove the connection.

## Configure the If node

With the connection to the Airtable node removed, add an If node connected to the HTTP Request node:

1. Select the **+** sign coming off the HTTP Request node.
2. Search for the If node.
3. Select it when it appears in the search.

For the If node, we'll use an expression.

/// note | Expressions
An expression is a string of characters and symbols in a programming language that represents a value depending upon its input. In n8n workflows, you can use expressions in a node to refer to another node for input data. In our example, the If node references the data output by the HTTP Request node.
///

In the If node window, configure the parameters:

- **Value 1**: `{{$json["orderStatus"]}}`
    1. To select this value, first hover over the value1 field.
    2. Select the **Expression** tab on the right side of the Value 1 field.
    3. Next, open the expression editor by selecting the link icon: 
    <figure><img src="/_images/courses/level-one/chapter-five/l1-c5-5-3-if-node-open-editor.png" alt="Opening the Expression Editor" style="width:100%"><figcaption align = "center"><i>Opening the Expression Editor</i></figcaption></figure>
    4. Now use the **Variable Selector** navigation to open **Current Node** > **Input Data** > **JSON**.
    5. Select **orderStatus**.
    <figure><img src="/_images/courses/level-one/chapter-five/l1-c5-5-3-if-node-expression-editor.png" alt="Expression Editor in the IF node" style="width:100%"><figcaption align = "center"><i>Expression Editor in the If node</i></figcaption></figure>
    6. Once the Expression is added, close the **Edit Expression** dialog.

- **Operation**: **String** > **is equal to**
- **Value 2**: processing

/// warning | Data Type
Make sure to select the correct data type (boolean, date & time, number, or string) when you select the **Operation**.
///

Select **Test step** to test the If node.

Your results should look like this:

<figure><img src="/_images/courses/level-one/chapter-five/l1-c5-5-3-if-node-output.png" alt="If node output" style="width:100%"><figcaption align = "center"><i>If node output</i></figcaption></figure>

Note that the orders with `orderStatus` equal to `processing` should show for the True Branch output, while the orders with `orderStatus` equal to `booked` should show in the False Branch output.

## Insert data into Airtable

Next, we want to insert this data into Airtable. Remember what Nathan said at the end of the [Inserting data into Airtable](/courses/level-one/chapter-5/chapter-5.2/) lesson?

> I actually need to insert only processing orders in the table...

Since Nathan only needs the `processing` orders in the table, we'll connect the Airtable node to the If node's `true` connector. 

In this case, since the Airtable node is already on our canvas, select the **HTTP Request** `true` connector and drag it to the Airtable node.

It's a good idea at this point to retest the Airtable node. Before you do, open your table in Airtable and delete all existing rows. Then open the Airtable node window in n8n and select **Test step**.

Review your data in Airtable to be sure your workflow only added the correct orders (those with orderStatus of `processing`).

At this stage, your workflow should look like this:

<figure><img src="/_images/courses/level-one/chapter-five/l1-c5-5-3-workflow-with-if-node.png" alt="Workflow with the If node" style="width:100%"><figcaption align = "center"><i>Workflow with the If node</i></figcaption></figure>

## What's next?

**Nathan 🙋**: This If node is really useful for filtering data! Now I have all the information about processing orders. I actually only need the `employeeName` and `orderID`, but I guess I can keep all the other fields just in case.

**You 👩‍🔧**: Actually, I wouldn't recommend doing that. Inserting more data requires more computational power, the data transfer is slower and takes longer, and takes up more storage resources in your table. In this particular case, 14 records with 5 features might not seem like a lot to make a significant difference, but if your business grows to thousands of records and tens of features, things add up and even one extra column can affect performance.

**Nathan 🙋**: Oh, that's good to know. Can you select only two fields from the processing orders?

**You 👩‍🔧**: Sure, I'll do that in the next step.
