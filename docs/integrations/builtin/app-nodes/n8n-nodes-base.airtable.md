---
title: Airtable
description: Documentation for the Airtable node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
contentType: integration
---

# Airtable

Use the Airtable node to automate work in Airtable, and integrate Airtable with other applications. n8n has built-in support for a wide range of Airtable features, including creating, reading, listing, updating and deleting tables.

On this page, you'll find a list of operations the Airtable node supports and links to more resources.

!!! note "Credentials"
	Refer to [Airtable credentials](/integrations/builtin/credentials/airtable/) for guidance on setting up authentication. 

!!! note "Examples and templates"
	For usage examples and templates to help you get started, take a look at n8n's [Airtable integrations](https://n8n.io/integrations/airtable/){:target="_blank" .external-link} list.



## Operations

* Append the data to a table
* Delete data from a table
* List data from a table
* Read data from a table
* Update data in a table


## Related resources

n8n provides a trigger node for Airtable. You can find the trigger node docs [here](/integrations/builtin/trigger-nodes/n8n-nodes-base.airtabletrigger/).

View [example workflows and related content](https://n8n.io/integrations/airtable/){:target=_blank .external-link} on n8n's website.

Refer to [Airtable's documentation](https://airtable.com/developers/web/api/introduction){:target=_blank .external-link} for more information about the service.


## Node reference

### Get the Record ID

To fetch data for a particular record, you need the Record ID. There are two ways to get the Record ID.

### Create a Record ID column in Airtable

To create a `Record ID` column in your table, refer to this [article](https://support.airtable.com/hc/en-us/articles/360051564873-Record-ID). You can then use this Record ID in your Airtable node.

### Use the List operation

To get the Record ID of your record, you can use the **List** operation of the Airtable node. This operation will return the Record ID along with the fields. You can then use this Record ID in your Airtable node.

### Filter records when using the List operation

To filter records from your Airtable base, use the **Filter By Formula** option. For example, if you want to return all the users that belong to the organization `n8n`, follow the steps mentioned below:
1. Select 'List' from the **Operation** dropdown list.
2. Enter the base ID and the table name in the **Base ID** and **Table** field, respectively.
3. Click on **Add Option** and select 'Filter By Formula' from the dropdown list.
4. Enter the following formula in the **Filter By Formula** field: `{Organization}='n8n'`.

Similarly, if you want to return all the users that don't belong to the organization `n8n`, use the following formula: `NOT({Organization}='n8n')`.

Refer to the Airtable [documentation](https://support.airtable.com/hc/en-us/articles/203255215-Formula-Field-Reference){:target=_balnk .external-link} to learn more about the formulas.






