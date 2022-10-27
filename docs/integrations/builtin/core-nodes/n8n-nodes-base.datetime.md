# Date & Time

The Date & Time node is used to manipulate date and time data and convert it to different formats.

!!! note "Keep in mind"
    Make sure that the timezone is set correctly for the n8n instance (or the workflow).


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

- Options
	- *From Format* field: Allows you to specify the format of the input values. Refer to the [FAQs](#what-values-can-i-use-in-the-from-format-field) to learn about the possible vaules.
	- *From Timezone* field: Allows you to specify the timezone of the input values, for input timezones that are different from n8n's system clock.
	- *To Timezone* field: Allows you to specify the timezone that the input values have to be converted to.


## Example Usage

This workflow allows you to convert a date from one format to another using the Date & Time node. You can also find the [workflow](https://n8n.io/workflows/575) on the website. This example usage workflow would use the following two nodes.
- [Start](/integrations/builtin/core-nodes/n8n-nodes-base.start/)
- [Date & Time]()


The final workflow should look like the following image.

![A workflow with the Date & Time node](/_images/integrations/builtin/core-nodes/datetime/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Date & Time node

1. Enter the date that you want to convert in the *Value* field.
2. Click on the *Add Option* dropdown.
3. Click on the *From Format* option, and enter the format of the input date.
4. Select the format you want to convert it to from the *To Format* dropdown list.
5. Click on *Execute Node* to run the workflow.

## FAQs

### What values can I use in the From Format field?

You can use the following values in the ***From Format*** field:

| Input | Example | Description |
|-------|---------|-------------|
|X | 1616108400 | Unix timestamp |
|x | 1616108400000 | Unix ms timestamp |
| DD-MM-YYYY | 19-03-2021 | Date, month, and year separated by `-` |
| DD/MM/YYYY | 19/03/2021 | Date, month, and year separated by `/` |
| DD.MM.YYYY | 19.03.2021 | Date, month, and year separated by `.` |
| DD.MM.YYYY HH\:mm\:ss | 19.03.2021 08:00:00 | Date, month, year, hours, minutes, and seconds|
| MM/DD/YYYY | 03/19/2021 | Month, date, and year separated by `/` |
| MM-DD-YYYY | 03-19-2021 | Month, date, and year separated by `-` |
| MM.DD.YYYY | 03.19.2021 | Month, date, and year separated by `.` |
| MM/DD/YYYY HH\:mm\:ss | 03/19/2021 08:00:00 | Month, date, year, hours, minutes, and seconds |
| YYYY/MM/DD | 2021/03/19 | Year, month, and date separated by `/` |
| YYYY-MM-DD | 2021-03-19 | Year, month, and date separated by `-` |
| YYYY.MM.DD | 2021.03.19 | Year, month, and date separated by `.` |
| YYYY/MM/DD HH\:mm\:ss | 2021/03/19 08:00:00 | Year, month, date, hours, minutes, and seconds |
| MMMM DD YYYY | March 03 2021 | Month, date, and year |
| MMMM DD YYYY HH\:mm\:ss | March 03 2021 08:00:00 | Month, date, year, hours, minutes, and seconds |
| DD MMMM YYYY | 03 March 2021 | Date, month, and year |
| DD MMMM YYYY HH\:mm\:ss | 03 March 2021 08:00:00 | Date, month, year, hours, minutes, and seconds |
