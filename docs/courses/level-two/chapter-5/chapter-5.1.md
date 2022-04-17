# Workflow 1 – Merging data

The company's customer data is stored in Airtable. It contains information about the customers' *ID*, *country*, *email*, and *join date*, but lacks data about their respective *region* and *subregion*. You need to fill in these last two fields in order to create the reports for regional sales.

To accomplish this task, you first need to make a copy of this [customers table](https://airtable.com/shrZBXHXWvQ57LHuX) in your Airtable account.

<iframe class="airtable-embed" src="https://airtable.com/embed/shrNX9tjPkVLABbNz?backgroundColor=orange&viewControls=on" frameborder="0" onmousewheel="" width="100%" height="533" style="background: transparent; border: 1px solid #ccc;"></iframe>

Next, you have to build a small workflow that merges data from Airtable and a REST API.

1. Use the [*Cron node*](/integrations/core-nodes/n8n-nodes-base.cron/) to trigger the workflow on the 1st of every month at 10:00.
2. Use the [*Airtable node*](/integrations/nodes/n8n-nodes-base.airtable/) to list the data in the Airtable table named `customers`.
3. use the [*HTTP Request node*](/integrations/core-nodes/n8n-nodes-base.httpRequest/) to get data from the REST Countries API: `https://restcountries.com/v3.1/all`. This will return data about world countries. Note that the incoming data needs to be split into items.
4. Use the [*Merge node*](/integrations/core-nodes/n8n-nodes-base.merge/) to merge data from Airtable and the Countries API by country name (the common key), represented as `customerCountry` in Airtable and `name.common` in the Countries API, respectively.
5. Use the *Airtable node* to update the fields *region* and *subregion* in Airtable with the data from the Countries API.

The workflow should look like this:

<figure><img src="/_images/courses/level-two/chapter-five/workflow1.png" alt="" style="width:100%"><figcaption align = "center"><i>Workflow 1 for merging data from Airtable and the Countries API</i></figcaption></figure>


!!! question "Quiz questions"

    * How many items does the *HTTP Request node* return?
    * How many items does the *Merge node* return?
    * How many unique regions are assigned in the customers table?
    * What is the subregion assigned to the customerID 10?
