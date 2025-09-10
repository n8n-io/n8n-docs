---
title: Airtable node documentation
description: Learn how to use the Airtable node in n8n. Follow technical documentation to integrate Airtable node into your workflows.
contentType: [integration, reference]
priority: high
---

# Airtable node

Use the Airtable node to automate work in Airtable, and integrate Airtable with other applications. n8n has built-in support for a wide range of Airtable features, including creating, reading, listing, updating and deleting tables.

On this page, you'll find a list of operations the Airtable node supports and links to more resources.

/// note | Credentials
Refer to [Airtable credentials](/integrations/builtin/credentials/airtable.md) for guidance on setting up authentication. 
///

## Operations

* Append the data to a table
* Delete data from a table
* List data from a table
* Read data from a table
* Update data in a table

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'airtable') ]]

## Related resources

n8n provides a trigger node for Airtable. You can find the trigger node docs [here](/integrations/builtin/trigger-nodes/n8n-nodes-base.airtabletrigger.md).

Refer to [Airtable's documentation](https://airtable.com/developers/web/api/introduction) for more information about the service.

--8<-- "_snippets/integrations/builtin/app-nodes/operation-not-supported.md"


## Node reference

### Get the Record ID

To fetch data for a particular record, you need the Record ID. There are two ways to get the Record ID.

### Create a Record ID column in Airtable

To create a `Record ID` column in your table, refer to this [article](https://support.airtable.com/docs/finding-airtable-ids). You can then use this Record ID in your Airtable node.

### Use the List operation

To get the Record ID of your record, you can use the **List** operation of the Airtable node. This operation will return the Record ID along with the fields. You can then use this Record ID in your Airtable node.

### Filter records when using the List operation

To filter records from your Airtable base, use the **Filter By Formula** option. For example, if you want to return all the users that belong to the organization `n8n`, follow the steps mentioned below:

1. Select 'List' from the **Operation** dropdown list.
2. Enter the base ID and the table name in the **Base ID** and **Table** field, respectively.
3. Click on **Add Option** and select 'Filter By Formula' from the dropdown list.
4. Enter the following formula in the **Filter By Formula** field: `{Organization}='n8n'`.

Similarly, if you want to return all the users that don't belong to the organization `n8n`, use the following formula: `NOT({Organization}='n8n')`.

Refer to the Airtable [documentation](https://support.airtable.com/hc/en-us/articles/203255215-Formula-Field-Reference) to learn more about the formulas.

## Common issues

For common errors or issues and suggested resolution steps, refer to [Common Issues](/integrations/builtin/app-nodes/n8n-nodes-base.airtable/common-issues.md).
