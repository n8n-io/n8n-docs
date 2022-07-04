# Item Lists

The Item Lists node simplifies working with returned data that contain lists (arrays), enabling you to easily modify the structure for further processing without the need to use [Function](/workflow/integrations/core-nodes/workflow-nodes-base.function/) nodes and write custom JavaScript.

## Operations

The Item Lists node enables you to perform the following operations:

* *Split Out Items*: Create separate items from a list of data within an item.
* *Aggregate Items*: Merge multiple items into a single new item.
* *Remove Duplicates*: Remove extraneous items.
* *Sort*: Change the ordering of items.
* *Limit*: Remove items beyond a defined maximum number.

!!! note ""
    Usually, you shouldn't use expressions for fields that expect a `key` value (for example, **Field to Split Out**). Expressions usually return values, not keys.


### Split Out Items

This operation is useful if your data contains a list of items, for example a list of customers, and you want to split them so that you have an item for each customer.

![Split Out Items output](/_images/integrations/core-nodes/itemlists/split_out.png)

When using the *Split Out Items* operation, configure the following parameters and options:

* *Field to Split Out*: The field containing the list you want to separate out into individual items (e.g. `Name` in the example here). **Must be plaintext and not an expression.**
* *Include*: Select if any other fields from the input data should be kept with each new individual item. You can select:
    * *No Other Fields*
    * *All Other Fields*
    * *Selected Other Fields*: When selected, a *Fields to Include* field is displayed. Enter a comma separated list of desired fields.
* *Disable Dot Notation*: When disabled, child fields (in the format `parent.child`) cannot be referenced.
* *Destination Field Name*: Optionally set the field name under which to put the new split contents.

### Aggregate Items

The Aggregate Items operations is useful when you want to take many separate items, or just particular portions of them, and group them together into individual items. For example, the image below shows customer names and email addresses being grouped into individual items from a series of individual customer records that contained many other details.

![Aggregate Items output](/_images/integrations/core-nodes/itemlists/aggregate.png)

When using the *Aggregate Items* operation, configure the following parameters and options:

* *Field To Aggregate*: The name of the field in the input data to be aggregated together.
* *Rename Field*: Enable this toggle to enter a field name for the aggregated output data. When aggregating multiple fields you must provide new output field names, **multiple fields cannot be left undefined**.
* *Output Field Name*: Displayed only when *Rename Field* is enabled. The field name for the aggregated output data.
* *Disable Dot Notation*: When disabled, child fields (in the format `parent.child`) cannot be referenced.
* *Preserve Aggregated Lists*: If enabled, fields to aggregate that are lists will output a list of lists (rather than being merged into a single list).

### Remove Duplicates

There are many situations where you can end up with duplicate data, a user creating multiple accounts, a customer submitting the same order multiple time, etc. When working with large datasets it becomes more difficult to easily spot and remove these items. 

The Remove Duplicates operation allows you to identify those items that are identical across all fields or only a desired subset of fields.

![Remove Duplicate Items output](/_images/integrations/core-nodes/itemlists/duplicates.png)

When using the *Remove Duplicates* operation, configure the following parameters and options:

* *Compare*: Provide which fields of the input data should be compared to check if they are the same. The following options are available:
  * *All Fields*: Compares all fields of the input data.
  * *All Fields Except*: Enter which input data fields should be excluded from the comparison. Multiple values can be provided separated by commas.
  * *Selected Fields*: Enter which input data fields should be included in the comparison. Multiple values can be provided separated by commas.
* *Disable Dot Notation*: When disabled, child fields (in the format `parent.child`) cannot be referenced.

### Sort

The Sort operation allows you to organize lists of in a desired ordering, or generate a random selection if desired (i.e. assign tasks to users randomly).

!!! note " Keep in mind"
    The Sort operation uses the default JavaScript operation where the elements to be sorted are converted into strings and their values compared. See [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) to learn more.


![Sort Items output](/_images/integrations/core-nodes/itemlists/sort.png)

When using the *Sort* operation, configure the following parameters and options:

* *Type*: Use the dropdown to select how you want to input the sorting. The following options are available:
  * *Simple*: When you selected, you can use the **Add Field To Sort By* button to input the desired fields, and select whether *Ascending* or *Descending* order is desired.
  * *Random*: Select to create a random order in the list.
  * *Code*: When selected, displays a code input field where you can enter custom JavaScript code to perform the sort operation.

### Limit

If you want to keep and process only a specific number of items from your incoming data, the Limit operation allows you to select the desired number of items to keep and whether they should be taken from the beginning or end of the data (e.g. take the 5 highest priority tickets, the oldest order, etc.).

![Limit Items output](/_images/integrations/core-nodes/itemlists/limit.png)

When using the *Limit* operation, configure the following parameters and options:

* *Max Items*: Enter the maximum number of items that should be kept. If the input data contains more than this value, items will be removed.
* *Keep*: When items must be removed, select if the input items at the beginning or end are kept.
