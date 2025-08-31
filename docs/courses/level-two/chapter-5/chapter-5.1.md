---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: tutorial
---

# Workflow 1: Merging data

Nathan's company stores its customer data in Airtable. This data contains information about the customers' ID, country, email, and join date, but lacks data about their respective region and subregion. You need to fill in these last two fields in order to create the reports for regional sales.

To accomplish this task, you first need to make a copy of this table in your Airtable account:

<iframe class="airtable-embed" src="https://airtable.com/embed/shrNX9tjPkVLABbNz?backgroundColor=orange&viewControls=on" frameborder="0" onmousewheel="" width="100%" height="533" style="background: transparent; border: 1px solid #ccc;"></iframe>

When setting up your Airtable, ensure that the `customerSince` column is configured as a Date type field with the **Include time** option enabled. Without this setting, you may encounter errors in step 4 when updating the table.

Next, build a small workflow that merges data from Airtable and a REST Countries API:

1. Use the [**Airtable node**](/integrations/builtin/app-nodes/n8n-nodes-base.airtable/index.md) to list the data in the Airtable table named `customers`.
2. Use the [**HTTP Request node**](/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/index.md) to get data from the REST Countries API: `https://restcountries.com/v3.1/all`, and send the query parameter name `fields` with the value `name,region,subregion`. This will return data about world countries, split out into separate items.
3. Use the [**Merge node**](/integrations/builtin/core-nodes/n8n-nodes-base.merge.md) to merge data from Airtable and the Countries API by country name, represented as `customerCountry` in Airtable and `name.common` in the Countries API, respectively.
4. Use another Airtable node to update the fields `region` and `subregion` in Airtable with the data from the Countries API.

## Create a new workflow

Open your Editor UI and create a new workflow using one of the following commands:

- Press ++ctrl+alt+n++ or ++cmd+option+n++ on your keyboard.
- Open the left menu, navigate to **Workflows**, and select **Add workflow**.

/// note | No node for that service?
The HTTP Request node is one of the most versatile nodes, allowing you to make HTTP requests to query data from apps and services. You can use it to access data from apps or services that don't have a dedicated node in n8n.
///

## Add an Airtable node

Add an Airtable node and connect it.

In the node panel:

1. Search for Airtable.
2. Select **Search a record** from the **Record Actions** search results.

This will add the Airtable node to your canvas and open the node details window.

In the Airtable node window, configure the following parameters:

- **Credential to connect with**:
    - Select **Create new credential**.
    - Keep the default option **Connect using: Access Token** selected.
    - **Access token**: Follow the instructions on the [Airtable credential](/integrations/builtin/credentials/airtable.md) page to create your token. Use the recommended scopes and add access to your beginners course base. Save the credential and close the Credential window when you're finished.
- **Resource**: Record.
- **Operation**: Search. This operation will search records in the existing table.
- **Base**: Select your base from the list.
- **Table**: Customers.

## Test the Airtable node

Once you've finished configuring the Airtable node, execute it by selecting **Execute step**. This might take a moment to process, but you can follow the progress by viewing the base in Airtable.

Your results should look like this:

<figure><img src="/_images/courses/level-two/chapter-five/l2-c5-1-airtable-search-node.png" alt="Airtable node results" style="width:100%"><figcaption align="center"><i>Airtable node results</i></figcaption></figure>

## Add an HTTP Request node

Add an HTTP Request node and connect it.

In the node panel:

1. Search for HTTP Request.

In the HTTP Request node window, configure the following parameters:

- **Method**: GET
- **URL**: https://restcountries.com/v3.1/all
- **Authentication**: None
- **Send Query Parameters**: Set toggle to On
    - **Set Query Parameters**:
        - **Name**: fields
        - **Value**: name,region,subregion

## Test the HTTP Request node

Once you've finished configuring the HTTP Request node, execute it by selecting **Execute step**.

Your results should look like this:

<figure><img src="/_images/courses/level-two/chapter-five/l2-c5-1-http-node.png" alt="HTTP Request node results" style="width:100%"><figcaption align="center"><i>HTTP Request node results</i></figcaption></figure>

## Add a Merge node

Add a Merge node and connect it.

In the node panel:

1. Search for Merge.

In the Merge node window, configure the following parameters:

- **Mode**: Combine
- **Combine By**: Matching Fields
- **Fields To Match Have Different Names**: Set toggle to On
- **Fields to Match**: Toggle On
    - **Input 1 Field**: customerCountry
    - **Input 2 Field**: name.common

## Test the Merge node

Once you've finished configuring the Merge node, execute it by selecting **Execute step**.

Your results should look like this:

<figure><img src="/_images/courses/level-two/chapter-five/l2-c5-1-merge-node.png" alt="Merge node results" style="width:100%"><figcaption align="center"><i>Merge node results</i></figcaption></figure>

## Final Workflow

The workflow should look like this:

<figure><img src="/_images/courses/level-two/chapter-five/workflow1.png" alt="Workflow 1 for merging data from Airtable and the Countries API" style="width:100%"><figcaption align="center"><i>Workflow 1 for merging data from Airtable and the Countries API</i></figcaption></figure>


/// question | Quiz questions
* How many items does the **HTTP Request node** return?
* How many items does the **Merge node** return?
* How many unique regions are assigned in the customers table?
* What's the subregion assigned to the customerID 10?
///
