# 2. Inserting Data into Airtable

In this step of the workflow you will learn how to insert the data received via the HTTP Request node into Airtable using the *Airtable* node.

At this point, your workflow should look like this:

<figure><img src="/_images/courses/level-one/chapter-two/Workflow-with-Airtable-node.png" alt="Workflow with the Airtable node" style="width:100%"><figcaption align = "center"><i>Workflow with the Airtable node</i></figcaption></figure>

If we are going to insert data into Airtable, we first need to set up a table there. To do this:

1. [Create an Airtable account](https://airtable.com/signup).
2. In your Airtable workspace add a new base from scratch and name it, for example, *beginner course*.

	<figure><img src="/_images/courses/level-one/chapter-two/Create-airtable-base.png" alt="Create an Airtable base" style="width:100%"><figcaption align = "center"><i>Create an Airtable base</i></figcaption></figure>

3. In the beginner course base you have by default a *Table 1* with four fields: *Name, Notes, Attachment, and Status*.
These fields are not relevant for us since they are not in our orders data set. This brings us to the next point: the names of the fields in Airtable have to match the names of the columns in the node result.
	- Replace the four default table fields with the five column names from the data set, selecting `Number` field type for orderID, customerID, and orderPrice, and `Single line text` for employeeName and orderStatus.
	- Delete the 3 blank rows created by default.
	- Also, rename the table from *Table 1* to *orders* to make it easier to identify.

Now your table should look like this:

<figure><img src="/_images/courses/level-one/chapter-two/Orders-table.png" alt="Orders table in Airtable" style="width:100%"><figcaption align = "center"><i>Orders table in Airtable</i></figcaption></figure>

Now that the table is prepared let’s return to the workflow in the Editor UI.

Add an ***Airtable node*** connected to the HTTP Request node.

!!! note " Spreadsheet nodes"
    You can replace the *Airtable* node with another spreadsheet app/service. For example, Doc² also has nodes for [*Google Sheets*](/integrations/nodes/n8n-nodes-base.googleSheets/) and [*Spreadsheet File*](/integrations/core-nodes/n8n-nodes-base.spreadsheetFile/).


In the *Airtable node* window, configure the following parameters:

- *Airtable API:*
	- *Name:* The name of your credentials (e.g. airtable_api)
	- *API Key:* Your [API key](/integrations/credentials/airtable/).
Adding credentials for Airtable is similar to the HTTP Request node you configured in the previous chapter. However, the process of obtaining an API key for Airtable (and other apps/services) is different.
- *Operation:* Append
This operation will append the new data to the table.
- *Base ID:* The ID of the beginner_course base.
To get the base Base ID, go to [Airtable's API page](https://airtable.com/api) and click on the base you want to use. The Base ID will be listed in the introduction.
- *Table:* orders

Now execute the *Airtable* node and you should get the following result:

<figure><img src="/_images/courses/level-one/chapter-two/Airtable-node.png" alt="Airtable node results" style="width:100%"><figcaption align = "center"><i>Airtable node results</i></figcaption></figure>

All 30 data records will now appear in the orders table:

<figure><img src="/_images/courses/level-one/chapter-two/Airtable-records.png" alt="Imported records in the orders table" style="width:100%"><figcaption align = "center"><i>Imported records in the orders table</i></figcaption></figure>

## What's next?

**Nathan 🙋**: Wow, this automation is really useful! But this inserts all collected data from the HTTP Request node into Airtable. Remember that I actually need to insert only processing orders in the table and calculate the price of booked orders?

**You 👩‍🔧**: Sure, no problem. As a next step, I'll use a new node to filter the orders based on their status.
