# Workflow 2 – Generating reports

In this workflow, you will merge data from different sources, transform binary data, generate files, and send notifications about them. The final workflow should look like this:

<figure><img src="/_images/courses/level-two/chapter-five/workflow2.png" alt="" style="width:100%"><figcaption align = "center"><i>Workflow 2 for aggregating data and generating files</i></figcaption></figure>

To make things easier, let's split the workflow into three parts.

## Part 1 – Getting data from different sources

The first part of the workflow consists of five nodes:

<figure><img src="/_images/courses/level-two/chapter-five/workflow2_1.png" alt="" style="width:100%"><figcaption align = "center"><i>Workflow 1 – Getting data from different sources</i></figcaption></figure>

1. Use the [HTTP Request node](/integrations/core-nodes/n8n-nodes-base.httpRequest/) to get data from the API endpoint that stores company data. Configure the following node parameters:

      * **Authentication**: Header Auth
      * **URL**: The Dataset URL you received in the email when you signed up for this course.
      * **Options > Add Option > Split Into Items**: toggle to true.
      * **Headers > Add Header**:
          * **Name**: unique_id
          * **Value**: The unique ID you received in the email when you signed up for this course.

2. Use the [Airtable node](/integrations/nodes/n8n-nodes-base.airtable/) to list data from the `customers` table (where you updated the fields `region` and `subregion`).
3. Use the [Merge node](/integrations/core-nodes/n8n-nodes-base.merge/) to merge data from the Airtable and HTTP Request node, based on the common key `customer ID`.
4. Use the [Item Lists node](/integrations/core-nodes/n8n-nodes-base.itemLists/) to sort data by orderPrice in descending order.

!!! question "Quiz questions"

    * What is the name of the employee assigned to customer 1?
    * What is the order status of customer 6?
    * What is the highest order price?

## Part 2 – Generating file for regional sales

The second part of the workflow consists of five nodes:

<figure><img src="/_images/courses/level-two/chapter-five/workflow2_2.png" alt="" style="width:100%"><figcaption align = "center"><i>Workflow 2 – Generating file for regional sales</i></figcaption></figure>

1. Use the [IF node](/integrations/core-nodes/n8n-nodes-base.if/) to filter order from the region Americas.
2. Use the [Move Binary Data node](/integrations/core-nodes/n8n-nodes-base.moveBinaryData/) to transform the incoming data from JSON to binary format. Note that you need to convert all data.
3. Use the [Write Binary File node](/integrations/core-nodes/n8n-nodes-base.writeBinaryFile/) to generate a PDF file.
4. Use the [Gmail node](/integrations/nodes/n8n-nodes-base.gmail/) (or another email node) to send the PDF file via email to an address you have access to.
5. Use the [Discord node](/integrations/nodes/n8n-nodes-base.discord/) to send a message in the n8n Discord channel `#course-level-two` with the Text: "I sent the PDF via email. My ID:" followed by your ID.

!!! question "Quiz questions"

    * How many orders are assigned to the region Americas?
    * What is the total price of the orders in the region Americas?
    * How many items are returned by the *Write Binary File node*?

## Part 3 – Generating files for total sales

The third part of the workflow consists of seven nodes:

<figure><img src="/_images/courses/level-two/chapter-five/workflow2_3.png" alt="" style="width:100%"><figcaption align = "center"><i>Workflow 3 – Generating files for total sales</i></figcaption></figure>

1. Use the [Split In Batches node](/integrations/core-nodes/n8n-nodes-base.splitInBatches/) to split data from the Item Lists node into batches of 5.
2. Use the [Set node](/integrations/core-nodes/n8n-nodes-base.set/) to set four values, referenced with expressions from the previous node: `customerEmail`, `customerRegion`, `customerSince`, and `orderPrice`.
3. Use the [Date & Time node](/integrations/core-nodes/n8n-nodes-base.dateTime/) to change the date format of the field `customerSince` to the format MM/DD/YYYY.
4. Use the [Move Binary Data node](/integrations/core-nodes/n8n-nodes-base.moveBinaryData/) to transform the incoming data from JSON to binary format. Note that you need to convert all data.
5. Use the [Spreadsheet File node](/integrations/core-nodes/n8n-nodes-base.spreadsheetFile/) to create a spreadsheet with the file name set as the expression: `{{$runIndex > 0 ? 'file_low_orders':'file_high_orders'}}`.
6. Use the [Google Drive node](/integrations/nodes/n8n-nodes-base.googleDrive/) to upload the spreadsheet to Google Drive.
7. Use the [Discord node](/integrations/nodes/n8n-nodes-base.discord/) to send a message in the n8n Discord channel `#course-level-two` with the Text: <br/>
    "I uploaded the spreadsheet `{file name}`. My ID:" followed by your ID. <br/>

!!! question "Quiz questions"

    * What is the lowest order price in the first batch of items?
    * What is the formatted date of customer 7?
    * How many items are returned by the *Spreadsheet File node*?
