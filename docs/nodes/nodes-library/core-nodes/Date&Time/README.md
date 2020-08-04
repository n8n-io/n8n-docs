---
permalink: /nodes/n8n-nodes-base.dateTime
---

# Date & Time

The Date & Time node is used to manipulate date and time data and convert it between formats.

::: tip 💡 Keep in mind
1. Make sure that the timezone is set correctly for the n8n instance (or the workflow).
:::

## Node Reference

- Action
	- Convert a date to a different format

You can specify the format that the date has to be converted to from the *To Format* dropdown list.

- To Format
	- MM/DD/YYYY
	- YYYY/MM/DD
	- MMMM DD YYYY
	- MM-DD-YYYY
	- YYYY-MM-DD
	- Unix Timestamp
	- Unix Ms Timestamp

You can also specify a custom format by setting the *Custom Format* toggle to 'On'.

**Options**
- **From Format**: Allows you to specify the format of the input values.
- **From Timezone**: Allows you to specify the timezone of the input values, for input timezones that are different from n8n's system clock.
- **To Timezone**: Allows you to specify the timezone that the input values have to be converted to.


## Example Usage

This workflow allows you to convert a date from one format to another using the Date & Time node. You can also find the [workflow](https://n8n.io/workflows/575) on the website. This example usage workflow would use the following two nodes.
- [Start](../../core-nodes/Start/README.md)
- [Date & Time]()


The final workflow should look like the following image.

![A workflow with the Date & Time node](./workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Date & Time node

1. Enter the date that you want to convert in the *Value* field.
2. Click on the *Add Option* dropdown, click on the *From Format* option, and enter the format of the input date.
3. Select the format you want to convert it to from the _To Format_ dropdown list.
4. Click on *Execute Node* to run the workflow.
