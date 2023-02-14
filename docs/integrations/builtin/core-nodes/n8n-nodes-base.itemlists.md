# Item Lists

The Item Lists node simplifies working with returned data that contain lists (arrays), enabling you to change the structure for further processing without the need to use [Code](/integrations/builtin/core-nodes/n8n-nodes-base.code/) nodes or write custom JavaScript.

## Operations

The Item Lists node enables you to perform the following operations:

* Split Out Items: create separate items from a list of data within an item.
* Aggregate Items: merge multiple items into a single new item.
* Remove Duplicates: remove extraneous items.
* Sort: change the ordering of items.
* Limit: remove items beyond a defined maximum number.


### Split Out Items

This operation is useful if your data contains a list of items, for example a list of customers, and you want to split them so that you have an item for each customer.

When using the Split Out Items operation, configure the following parameters and options:

* **Field to Split Out**: the field containing the list you want to separate out into individual items. Must be plain text and not an expression.
* **Include**: select if  you want n8n to keep any other fields from the input data with each new individual item. You can select:
    * **No Other Fields**
    * **All Other Fields**
    * **Selected Other Fields**: when selected, n8n displays **Fields to Include**. Enter a comma separated list of desired fields.
	* **Options** > **Add Field**: use this to add more optional settings, including:
		* **Disable Dot Notation**: when disabled, you can't reference child fields (in the format `parent.child`).	
		* **Destination Field Name**: optionally set the field name under which to put the new split contents.

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

!!! note "Array sort behavior
    The Sort operation uses the default JavaScript operation where the elements to be sorted are converted into strings and their values compared. Refer to [Mozilla's guide to Array sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort){:target=_blank .external-link} to learn more.


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

## Related resources

View [example workflows and related content](https://n8n.io/integrations/item-lists/){:target=_blank .external-link} on n8n's website.
