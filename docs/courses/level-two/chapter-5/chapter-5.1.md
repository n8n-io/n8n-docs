---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: tutorial
---

# Workflow 1: Merging data

Nathan's company stores its customer data in Airtable. This data contains information about the customers' ID, country, email, and join date, but lacks data about their respective region and subregion. You need to fill in these last two fields in order to create the reports for regional sales.

To accomplish this task, you first need to make a copy of this table in your Airtable account:

<iframe class="airtable-embed" src="https://airtable.com/embed/shrNX9tjPkVLABbNz?backgroundColor=orange&viewControls=on" frameborder="0" onmousewheel="" width="100%" height="533" style="background: transparent; border: 1px solid #ccc;"></iframe>

Next, build a small workflow that merges data from Airtable and a REST Countries API:

1. Use the [**Airtable node**](/integrations/builtin/app-nodes/n8n-nodes-base.airtable/) to list the data in the Airtable table named `customers`.
2. Use the [**HTTP Request node**](/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/) to get data from the REST Countries API: `https://restcountries.com/v3.1/all`. This will return data about world countries, split out into separate items.
3. Use the [**Merge node**](/integrations/builtin/core-nodes/n8n-nodes-base.merge/) to merge data from Airtable and the Countries API by country name, represented as `customerCountry` in Airtable and `name.common` in the Countries API, respectively.
4. Use another Airtable node to update the fields `region` and `subregion` in Airtable with the data from the Countries API.

The workflow should look like this:

<figure><img src="/_images/courses/level-two/chapter-five/workflow1.png" alt="Workflow 1 for merging data from Airtable and the Countries API" style="width:100%"><figcaption align = "center"><i>Workflow 1 for merging data from Airtable and the Countries API</i></figcaption></figure>


/// question | Quiz questions
* How many items does the **HTTP Request node** return?
* How many items does the **Merge node** return?
* How many unique regions are assigned in the customers table?
* What's the subregion assigned to the customerID 10?
///
