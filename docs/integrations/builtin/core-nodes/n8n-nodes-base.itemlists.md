---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Item Lists
description: Documentation for the Item Lists node in n8n, a workflow automation platform. Includes guidance on usage, and links to examples.
contentType: integration
---

# Item Lists

/// warning | Removed in 1.21.0
n8n removed the Item Lists node in version 1.21.0. Use the following nodes instead:

* [Aggregate](/integrations/builtin/core-nodes/n8n-nodes-base.aggregate/): take separate items, or portions of them, and group them together into individual items.
* [Limit](/integrations/builtin/core-nodes/n8n-nodes-base.aggregate/): remove items beyond a defined maximum number.
* [Remove Duplicates](/integrations/builtin/core-nodes/n8n-nodes-base.removeduplicates/): identify items that are identical across all fields or a subset of fields.
* [Sort](/integrations/builtin/core-nodes/n8n-nodes-base.sort/): organize lists of in a desired ordering, or generate a random selection.
* [Split Out](/integrations/builtin/core-nodes/n8n-nodes-base.splitout/): separate a single data item containing a list into multiple items.
* [Summarize](/integrations/builtin/core-nodes/n8n-nodes-base.summarize/): aggregate items together, in a manner similar to Excel pivot tables. 
///

The Item Lists node simplifies working with returned data that contain lists (arrays), enabling you to change the structure for further processing without the need to use [Code](/integrations/builtin/core-nodes/n8n-nodes-base.code/) nodes or write custom JavaScript.

## Operations

The Item Lists node enables you to perform the following operations:

* Concatenate Items: merge multiple items into a single new item.
* Limit: remove items beyond a defined maximum number.
* Remove Duplicates: remove extraneous items.
* Sort: change the ordering of items.
* Split Out Items: create separate items from a list of data within an item.
* Summarize: aggregate items together. Similar to a pivot table.

### Split Out Items

This operation is useful if your data contains a list of items, for example a list of customers, and you want to split them so that you have an item for each customer.

When using the Split Out Items operation, configure the following parameters and options:

* **Field to Split Out**: the field containing the list you want to separate out into individual items.
	* If working with file inputs, use `$binary` in an expression to set the field to split out.
* **Include**: select if  you want n8n to keep any other fields from the input data with each new individual item. You can select:
    * **No Other Fields**
    * **All Other Fields**
    * **Selected Other Fields**: when selected, n8n displays **Fields to Include**. Enter a comma separated list of desired fields.
	* **Options** > **Add Field**: use this to add more optional settings, including:
		* **Disable Dot Notation**: when disabled, you can't reference child fields (in the format `parent.child`).	
		* **Destination Field Name**: optionally set the field name under which to put the new split contents.
		* **Include Binary**: include binary data (files) from the input in the new output.

### Concatenate Items

The Concatenate Items operations is useful when you want to take separate items, or portions of them, and group them together into individual items.

When using the Concatenate Items operation, configure the following parameters and options:

* **Aggregate**: choose whether to aggregate **Individual Fields** or **All Item Data**.
* If you choose **Individual Fields**, you can then set:
	* **Field To Aggregate**: the name of the field in the input data to be aggregated together.
	* **Rename Field**: enable this toggle to enter a field name for the aggregated output data. When aggregating multiple fields you must provide new output field names. You can't leave multiple fields undefined.
	* **Output Field Name**: displayed when you enable **Rename Field**. The field name for the aggregated output data.
	* **Options** > **Add Field**: use this to add more optional settings, including:
		* **Disable Dot Notation**: when disabled, you can't reference child fields (in the format `parent.child`).
		* **Include Binaries**: include binary data (files) from the input in the new output.
* If you choose **All Item Data**, you can then set:
	* **Put Output in Field**: the name of the output field.
	* **Include**: choose from **All fields**, **Specified Fields**, or **All Fields Except**.


### Remove Duplicates

There are situations where you can end up with duplicate data, such as a user creating multiple accounts, or a customer submitting the same order multiple times. When working with large datasets it becomes more difficult to spot and remove these items. 

The Remove Duplicates operation allows you to identify those items that are identical across all fields or a subset of fields.

When using the Remove Duplicates operation, configure the following parameters and options:

* **Compare**: specify which fields of the input data n8n should compare to check if they're the same. The following options are available:
  * **All Fields**: compares all fields of the input data.
  * **All Fields Except**: enter which input data fields n8n should exclude from the comparison. You can provide multiple values separated by commas.
  * **Selected Fields**: enter which input data fields n8n should include in the comparison. You can provide multiple values separated by commas.
* If you choose **All Fields Except** or **Selected Fields**, n8n displays **Options** > **Add Field**. Use this to add more optional settings, including:
	* **Disable Dot Notation**: when disabled, you can't reference child fields (in the format `parent.child`).

### Sort

The Sort operation allows you to organize lists of in a desired ordering, or generate a random selection.

/// note | Array sort behavior
The Sort operation uses the default JavaScript operation where the elements to be sorted are converted into strings and their values compared. Refer to [Mozilla's guide to Array sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort){:target=_blank .external-link} to learn more.
///


When using the Sort operation, configure the following parameters and options:

* **Type**: use the dropdown to select how you want to input the sorting. The following options are available:
  * **Simple**: when you selected, you can use the **Add Field To Sort By** button to input the fields, and select whether to use **Ascending** or **Descending** order.
  * **Random**: select to create a random order in the list.
  * **Code**: when selected, displays a code input field where you can enter custom JavaScript code to perform the sort operation.
* **Options** > **Add Field**: use this to add more optional settings, including:
	* **Disable Dot Notation**: when disabled, you can't reference child fields (in the format `parent.child`).

### Limit

If you want to keep and process a specific number of items from your incoming data, the Limit operation allows you to select the number of items to keep and whether n8n should take them from the beginning or end of the data.

When using the Limit operation, configure the following parameters and options:

* **Max Items**: enter the maximum number of items that n8n should keep. If the input data contains more than this value, n8n removes the items.
* **Keep**: when items must be removed, select if n8n keeps the input items at the beginning or end.

### Summarize

Aggregate items together, in a manner similar to Excel pivot tables.

When using the Summarize operation, configure the following parameters and options:

* **Fields to Summarize**: 
	* To combine values, select an **Aggregation** method, and enter a **Field** name.
	* To split values, enter a field name or list of names in **Fields to Split By**.
* **Options** > **Add Field**: use this to add more optional settings, including:
	* **Disable Dot Notation**: when disabled, you can't reference child fields (in the format `parent.child`).
	* **Each Split in a Separate Item**: splitting generates a separate output item for each split out field.
	* **All Splits in a Single Item**: splitting generates a single item, which lists the split out fields.

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'item-lists') ]]
