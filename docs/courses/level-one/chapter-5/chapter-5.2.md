---
contentType: tutorial
---

<!-- vale from-microsoft.We = NO -->
<!-- vale from-microsoft.FirstPerson = NO -->
# 2. Inserting data into Airtable

In this step of the workflow, you will learn how to insert the data received from the HTTP Request node into Airtable using the [Airtable node](/integrations/builtin/app-nodes/n8n-nodes-base.airtable/index.md).

/// note | Spreadsheet nodes
You can replace the Airtable node with another spreadsheet app/service. For example, n8n also has a node for [**Google Sheets**](/integrations/builtin/app-nodes/n8n-nodes-base.googlesheets/index.md).
///

After this step, your workflow should look like this:

[[ workflowDemo("file:////courses/level-one/chapter-5/chapter-5.2.json") ]]

## Configure your table

If we're going to insert data into Airtable, we first need to set up a table there. To do this:

1. [Create an Airtable account](https://airtable.com/signup).
2. In your Airtable workspace add a new base from scratch and name it, for example, *beginner course*.

	<figure><img src="/_images/courses/level-one/chapter-five/l1-c5-2-create-airtable-base.png" alt="Create an Airtable base" style="width:100%"><figcaption align = "center"><i>Create an Airtable base</i></figcaption></figure>

3. In the beginner course base, by default, you have a table called **Table 1** with four fields: `Name`, `Notes`, `Assignee`, and `Status`.  These fields aren't relevant for us since they aren't in our "orders" data set. This brings us to the next point: the names of the fields in Airtable have to match the names of the columns in the node result. Prepare the table by doing the following:

	* Rename the table from **Table 1** to **orders** to make it easier to identify.
	* Delete the 3 blank records created by default.
	* Delete the `Notes`, `Assignee`, and `Status` fields.
	* Edit the `Name` field (the primary field) to read `orderID`, with the **Number** field type.
	* Add the rest of the fields, and their field types, using the table below as a reference:

	 | Field name     | Field type       |
	 |----------------|------------------|
	 | `orderID`      | Number           |
	 | `customerID`   | Number           |
	 | `employeeName` | Single line text |
	 | `orderPrice`   | Number           |
	 | `orderStatus`  | Single line text |


Now your table should look like this:

<figure><img src="/_images/courses/level-one/chapter-five/l1-c5-2-orders-table.png" alt="Orders table in Airtable" style="width:100%"><figcaption align = "center"><i>Orders table in Airtable</i></figcaption></figure>

Now that the table is ready, let's return to the workflow in the n8n Editor UI.

## Add an Airtable node to the HTTP Request node

Add an Airtable node connected to the HTTP Request node.

///note | Remember
You can add a node connected to an existing node by selecting the **+** icon next to the existing node.
///

In the node panel:

1. Search for Airtable.
2. Select **Create a record** from the **Record Actions** search results.

This will add the Airtable node to your canvas and open the node details window.

In the Airtable node window, configure the following parameters:

- **Credential to connect with**:
	- Select **Create new credential**.
	- Keep the default option **Connect using: Access Token** selected.
	- **Access token**: Follow the instructions from the [Airtable credential](/integrations/builtin/credentials/airtable.md) page to create your token. Use the recommended scopes and add access to your beginners course base. Save the credential and close the Credential window when you're finished.
- **Resource**: Record.
- **Operation**: Create. This operation will create new records in the table.
- **Base**: You can pick your base from a list (for example, beginner course).
- **Table**: orders.
- **Mapping Column Mode**: Map automatically. In this mode, the incoming data fields must have the same as the columns in Airtable.

## Test the Airtable node

Once you've finished configuring the Airtable node, execute it by selecting **Execute step**. This might take a moment to process, but you can follow the progress by viewing the base in Airtable.

Your results should look like this:

<figure><img src="/_images/courses/level-one/chapter-five/l1-c5-2-airtable-node.png" alt="Airtable node results" style="width:100%"><figcaption align = "center"><i>Airtable node results</i></figcaption></figure>

All 30 data records will now appear in the orders table in Airtable:

<figure><img src="/_images/courses/level-one/chapter-five/l1-c5-2-airtable-records.png" alt="Imported records in the orders table" style="width:100%"><figcaption align = "center"><i>Imported records in the orders table</i></figcaption></figure>

## What's next?

**Nathan 🙋**: Wow, this automation is already so useful! But this inserts all collected data from the HTTP Request node into Airtable. Remember that I actually need to insert only processing orders in the table and calculate the price of booked orders?

**You 👩‍🔧**: Sure, no problem. As a next step, I'll use a new node to filter the orders based on their status.
