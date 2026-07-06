---
title: Airtable node documentation
description: >-
  Learn how to use the Airtable node in n8n. Follow technical documentation to
  integrate Airtable node into your workflows.
contentType:
  - integration
  - reference
priority: high
nodeTitle: n8n-nodes-base.airtable
originalFilePath: integrations/builtin/app-nodes/n8n-nodes-base.airtable/index.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.airtable'
url: 'https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.airtable'
layout:
  description:
    visible: false
---

# Airtable node <a href="#airtable-node" id="airtable-node"></a>

Use the Airtable node to automate work in Airtable, and integrate Airtable with other applications. n8n has built-in support for a wide range of Airtable features, including creating, reading, listing, updating and deleting tables.

On this page, you'll find a list of operations the Airtable node supports and links to more resources.

{% hint style="info" %}
**Credentials**

Refer to [Airtable credentials](../../credentials/airtable.md) for guidance on setting up authentication.
{% endhint %}

## Operations <a href="#operations" id="operations"></a>

* Append the data to a table
* Delete data from a table
* List data from a table
* Read data from a table
* Update data in a table

## Templates and examples <a href="#templates-and-examples" id="templates-and-examples"></a>


[Browse n8n-nodes-base.airtable integration templates](https://n8n.io/integrations/airtable) or [search all templates](https://n8n.io/workflows/)

## Related resources <a href="#related-resources" id="related-resources"></a>

n8n provides a trigger node for Airtable. You can find the trigger node docs [here](../../trigger-nodes/n8n-nodes-base.airtabletrigger.md).

Refer to [Airtable's documentation](https://airtable.com/developers/web/api/introduction) for more information about the service.

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/96ifDzfcUuwOyYrubZUt/" %}


## Node reference <a href="#node-reference" id="node-reference"></a>

### Get the Record ID <a href="#get-the-record-id" id="get-the-record-id"></a>

To fetch data for a particular record, you need the Record ID. There are two ways to get the Record ID.

### Create a Record ID column in Airtable <a href="#create-a-record-id-column-in-airtable" id="create-a-record-id-column-in-airtable"></a>

To create a `Record ID` column in your table, refer to this [article](https://support.airtable.com/docs/finding-airtable-ids). You can then use this Record ID in your Airtable node.

### Use the List operation <a href="#use-the-list-operation" id="use-the-list-operation"></a>

To get the Record ID of your record, you can use the **List** operation of the Airtable node. This operation will return the Record ID along with the fields. You can then use this Record ID in your Airtable node.

### Filter records when using the List operation <a href="#filter-records-when-using-the-list-operation" id="filter-records-when-using-the-list-operation"></a>

To filter records from your Airtable base, use the **Filter By Formula** option. For example, if you want to return all the users that belong to the organization `n8n`, follow the steps mentioned below:

1. Select 'List' from the **Operation** dropdown list.
2. Enter the base ID and the table name in the **Base ID** and **Table** field, respectively.
3. Click on **Add Option** and select 'Filter By Formula' from the dropdown list.
4. Enter the following formula in the **Filter By Formula** field: `{Organization}='n8n'`.

Similarly, if you want to return all the users that don't belong to the organization `n8n`, use the following formula: `NOT({Organization}='n8n')`.

Refer to the Airtable [documentation](https://support.airtable.com/hc/en-us/articles/203255215-Formula-Field-Reference) to learn more about the formulas.

## Common issues <a href="#common-issues" id="common-issues"></a>

For common errors or issues and suggested resolution steps, refer to [Common Issues](common-issues.md).
