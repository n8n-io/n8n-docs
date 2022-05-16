# Workflow 2 – Generating reports

In this workflow, you will merge data from different sources, transform binary data, generate files, and send notifications about them. The final workflow should look like this:

<figure><img src="/_images/courses/level-two/chapter-five/workflow2.png" alt="" style="width:100%"><figcaption align = "center"><i>Workflow 2 for aggregating data and generating files</i></figcaption></figure>

To make things easier, let's split the workflow into three parts.

## Part 1 – Getting data from different sources

The first part of the workflow consists of five nodes:

<figure><img src="/_images/courses/level-two/chapter-five/workflow2_1.png" alt="" style="width:100%"><figcaption align = "center"><i>Workflow 1 – Getting data from different sources</i></figcaption></figure>

1. Use the [HTTP Request node](/integrations/core-nodes/n8n-nodes-base.httpRequest/){:target="_blank"} to get data from the API endpoint that stores company data. Configure the following node parameters:

      * **Authentication**: Header Auth
      * **URL**: The Dataset URL you received in the email when you signed up for this course.
      * **Options > Add Option > Split Into Items**: toggle to true.
      * **Headers > Add Header**:
          * **Name**: unique_id
          * **Value**: The unique ID you received in the email when you signed up for this course.

2. Use the [Airtable node](/integrations/nodes/n8n-nodes-base.airtable/){:target="_blank"} to list data from the `customers` table (where you updated the fields `region` and `subregion`).
3. Use the [Merge node](/integrations/core-nodes/n8n-nodes-base.merge/){:target="_blank"} to merge data from the Airtable and HTTP Request node, based on the common key `customer ID`.
4. Use the [Item Lists node](/integrations/core-nodes/n8n-nodes-base.itemLists/){:target="_blank"} to sort data by orderPrice in descending order.

!!! question "Quiz questions"

    * What is the name of the employee assigned to customer 1?
    * What is the order status of customer 6?
    * What is the highest order price?

## Part 2 – Generating file for regional sales

The second part of the workflow consists of five nodes:

<figure><img src="/_images/courses/level-two/chapter-five/workflow2_2.png" alt="" style="width:100%"><figcaption align = "center"><i>Workflow 2 – Generating file for regional sales</i></figcaption></figure>

1. Use the [IF node](/integrations/core-nodes/n8n-nodes-base.if/){:target="_blank"} to filter order from the region Americas.
2. Use the [Move Binary Data node](/integrations/core-nodes/n8n-nodes-base.moveBinaryData/){:target="_blank"} to transform the incoming data from JSON to binary format. Note that you need to convert all data.
3. Use the [Write Binary File node](/integrations/core-nodes/n8n-nodes-base.writeBinaryFile/){:target="_blank"} to create and store files with the orders information. In the File Name field, use an expression to include the oder id in the file name, like this: `report_orderID{oder_id}.json` (you need to replace the `{order id}` with the reference the Move Binary Data node).
4. Use the [Gmail node](/integrations/nodes/n8n-nodes-base.gmail/){:target="_blank"} (or another email node) to send the files via email to an address you have access to. Note that you need to add an attachment with the data property.
5. Use the [Discord node](/integrations/nodes/n8n-nodes-base.discord/){:target="_blank"} to send a message in the n8n Discord channel `#course-level-two`. In the node, configure the following parameters:
    * Webhook URL: The webhook URL you received in the email when you signed up for this course.
    * Text: "I sent the file via email with the label ID `{label ID}` and wrote the binary file `{file name}`. My ID: " followed by your ID. <br/> Note that you need to replace the text in curly braces `{}` with expressions that reference the data from the nodes.

!!! question "Quiz questions"

    * How many orders are assigned to the region Americas?
    * What is the total price of the orders in the region Americas?
    * How many items are returned by the *Write Binary File node*?

## Part 3 – Generating files for total sales

The third part of the workflow consists of seven nodes:

<figure><img src="/_images/courses/level-two/chapter-five/workflow2_3.png" alt="" style="width:100%"><figcaption align = "center"><i>Workflow 3 – Generating files for total sales</i></figcaption></figure>

1. Use the [Split In Batches node](/integrations/core-nodes/n8n-nodes-base.splitInBatches/){:target="_blank"} to split data from the Item Lists node into batches of 5.
2. Use the [Set node](/integrations/core-nodes/n8n-nodes-base.set/){:target="_blank"} to set four values, referenced with expressions from the previous node: `customerEmail`, `customerRegion`, `customerSince`, and `orderPrice`.
3. Use the [Date & Time node](/integrations/core-nodes/n8n-nodes-base.dateTime/){:target="_blank"} to change the date format of the field `customerSince` to the format MM/DD/YYYY.
4. Use the [Spreadsheet File node](/integrations/core-nodes/n8n-nodes-base.spreadsheetFile/){:target="_blank"} to create a CSV spreadsheet with the file name set as the expression: `{{$runIndex > 0 ? 'file_low_orders':'file_high_orders'}}`.
5. Use the [Discord node](/integrations/nodes/n8n-nodes-base.discord/){:target="_blank"} to send a message in the n8n Discord channel `#course-level-two`. In the node, configure the following parameters:
    * Webhook URL: The webhook URL you received in the email when you signed up for this course.
    * Text: "I created the spreadsheet `{file name}`. My ID:" followed by your ID. <br/> The `{file name}` should be an expression that references data from the Spreadsheet File node.<br/>

!!! question "Quiz questions"

    * What is the lowest order price in the first batch of items?
    * What is the formatted date of customer 7?
    * How many items are returned by the *Spreadsheet File node*?
