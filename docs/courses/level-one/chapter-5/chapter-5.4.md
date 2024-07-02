---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: tutorial
---

# 4. Setting Values for Processing Orders

In this step of the workflow, you will learn how to select and set data before transferring it to Airtable using the Edit Fields (Set) node.

The next step in Nathan's workflow is to insert the `employeeName` and `orderID` of all `processing` orders into Airtable.

For this, you need to use the [Edit Fields (Set) node](/integrations/builtin/core-nodes/n8n-nodes-base.set/), which allows you to select and set the data you want to transfer from one app/service to another.

/// note | Edit Fields node
The Edit Fields node can set completely new data as well as overwrite data that already exists. This node is crucial in workflows which expect incoming data from previous nodes, such as when inserting values into spreadsheets or databases.
///

## Disconnect the Airtable node

In your workflow, disconnect the Airtable node** from the **If node in the same way we disconnected it in the [Filtering Orders](/courses/level-one/chapter-5/chapter-5.3/) lesson.

## Configure the Edit Fields node

Now add a new Edit Fields (Set) node** attached to the **If node's `true` connector by selecting the **+** icon with that connector and searching for **Edit Fields**.

With the Edit Fields node window open, configure these parameters:

- Ensure **Mode** is set to **Manual Mapping**.
- While you can use the **Expression editor** we used in the [Filtering Orders](/courses/level-one/chapter-5/chapter-5.3/) lesson, this time, let's drag the fields from the **Input** into the **Fields to Set**:
    - Drag **orderID** as the first field.
    - Drag **employeeName** as the second field.
- Ensure that **Include Other Input Fields** is set to false.

Select **Test step**. You should see the following results:

<figure><img src="/_images/courses/level-one/chapter-five/l1-c5-4-set-node.png" alt="Edit Fields (Set) node" style="width:100%"><figcaption align = "center"><i>Edit Fields (Set) node</i></figcaption></figure>

## Add data to Airtable

Next, let's insert these values into Airtable:

1. Go to your Airtable account.
2. Add a new table called `processingOrders`. You can add this table to your existing workspace/table if you choose.
3. Add two columns to this table:
    - `orderID`: Number
    - `employeeName`: Single line text
    
    ///note | Reminder
    If you get stuck, refer back to the [Inserting data into Airtable](/courses/level-one/chapter-5/chapter-5.2/) lesson.
    ///
  
4. Be sure to delete the three empty rows in the new table!
5. With the new table created, update the Airtable node configuration to point to this new `processingOrders` table instead of the `orders` table.
6. Connect the Edit Fields node** connector to the **Airtable node.
7. Test your Airtable node to be sure it inserts records into the new `processingOrders` table.

At this stage, your workflow should now look like this:

<figure><img src="/_images/courses/level-one/chapter-five/l1-c5-4-workflow-with-set-node.png" alt="Workflow with the Edit Fields node" style="width:100%"><figcaption align = "center"><i>Workflow with the Edit Fields node</i></figcaption></figure>

## What's next?

**Nathan 🙋**: You've already automated half of my work! Now I still need to calculate the booked orders for my colleagues. Can that be automated as well?

**You 👩‍🔧**: Yes! In the next step, I'll use some JavaScript code in a node to calculate the booked orders.
