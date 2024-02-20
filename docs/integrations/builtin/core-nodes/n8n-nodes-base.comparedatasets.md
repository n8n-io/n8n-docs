---
title: Compare Datasets
description: Documentation for the Compare Datasets node in n8n, a workflow automation platform. Includes guidance on usage, and links to examples.
contentType: integration
---

# Compare Datasets

The Compare Datasets node helps you compare data from two input streams.

/// note | Examples and templates
For usage examples and templates to help you get started, refer to n8n's [Compare Datasets integrations](https://n8n.io/integrations/compare-datasets/){:target=_blank .external-link} page.
///

## Usage

1. Decide which fields to compare. In **Input A Field**, enter the name of the field you want to use from input stream A. In **Input B Field**, enter the name of the field you want to use from input stream B. 
2. **Optional**: you can compare by multiple fields. Select **Add Fields to Match** to set up more comparisons.
3. Choose how to handle differences between the datasets. In **When There Are Differences**, select one of the following:
	* **Use Input A Version**
	* **Use Input B Version**
	* **Use a Mix of Versions**
	* **Include Both Versions**

## Understand item comparison

Item comparison is a two stage process:

1. n8n checks if the values of the fields you selected to compare match across both inputs.
2. If the fields to compare match, n8n then compares all fields within the items, to determine if the items are the same or different.


## Options

You can use additional options to refine your comparison or modify comparison behavior.

Select **Add Option**, then choose the option you want to use.

### Fields to Skip Comparing

Enter field names that you want to ignore. 

For example, if you compare the two datasets below using **person.language** as the **Fields to Match**, n8n returns them as different. If you add **person.name** to **Fields to Skip Comparing**, n8n returns them as matching.

```json
	// Input 1
	[
		{
			"person":
			{
				"name":	"Stefan",
				"language":	"de"
			}
		},
		{
			"person":
			{
				"name":	"Jim",
				"language":	"en"
			}
		},
		{
			"person":
			{
				"name":	"Hans",
				"language":	"de"
			}
		}
	]
	// Input 2
		[
		{
			"person":
			{
				"name":	"Sara",
				"language":	"de"
			}
		},
		{
			"person":
			{
				"name":	"Jane",
				"language":	"en"
			}
		},
		{
			"person":
			{
				"name":	"Harriet",
				"language":	"de"
			}
		}
	]
```

### Fuzzy Compare

Whether to tolerate type differences when comparing fields (enabled), or not (disabled, default). For example, when you enable this, n8n treats `"3"` and `3` as the same.

### Disable Dot Notation

Whether to disallow referencing child fields using `parent.child` in the field name (enabled), or allow it (disabled, default).

### Multiple Matches

Choose how to handle duplicate data. The default is **Include All Matches**. You can choose **Include First Match Only**.

For example, given these two datasets:
```json
	// Input 1
	[
		{
			"fruit": {
				"type": "apple",
				"color": "red"
			}
		},
				{
			"fruit": {
				"type": "apple",
				"color": "red"
			}
		},
				{
			"fruit": {
				"type": "banana",
				"color": "yellow"
			}
		}
	]
	// Input 2
	[
		{
			"fruit": {
				"type": "apple",
				"color": "red"
			}
		},
				{
			"fruit": {
				"type": "apple",
				"color": "red"
			}
		},
				{
			"fruit": {
				"type": "banana",
				"color": "yellow"
			}
		}
	]
```

n8n returns three items, in the **Same Branch** tab. The data is the same in both branches.

If you select **Include First Match Only**, n8n returns two items, in the **Same Branch** tab. The data is the same in both branches, but n8n only returns the first occurrence of the matching "apple" items.



## Understand the output

There are four output options:

* **In A only Branch**: data that occurs only in the first input.
* **Same Branch**: data that's the same in both inputs.
* **Different Branch**: data that's different between inputs.
* **In B only Branch**: data that occurs only in the second output.

## Related resources

View [example workflows and related content](https://n8n.io/integrations/compare-datasets/){:target=_blank .external-link} on n8n's website.

