---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Date & Time
description: Documentation for the Date & Time node in n8n, a workflow automation platform. Includes guidance on usage, and links to examples.
contentType: [integration, reference]
priority: high
---

# Date & Time

The Date & Time node manipulates date and time data and convert it to different formats.

--8<-- "_snippets/integrations/builtin/core-nodes/schedule/timezone-settings.md"

/// note | Date and time in other nodes
You can work with data and time in the Code node, and in expressions in any node. n8n supports Luxon to help work with date and time in JavaScript. Refer to [Date and time with Luxon](/code/cookbook/luxon.md) for more information.
///

## Operations

* **Add to a Date**: Add a specified amount of time to a date.
* **Extract Part of a Date**: Extract part of a date, such as the year, month, or day.
* **Format a Date**: Transform a date's format to a new format using preset options or a custom expression.
* **Get Current Date**: Get the current date and choose whether to include the current time or not. Useful for triggering other flows and conditional logic.
* **Get Time Between Dates**: Calculate the amount of time in specific units between two dates.
* **Round a Date**: Round a date up or down to the nearest unit of your choice, such as month, day, or hour.
* **Subtract From a Date**: Subtract a specified amount of time from a date.

Refer to the sections below for parameters and options specific to each operation.

## Add to a Date

Configure the node for this operation using these parameters:

* **Date to Add To**: Enter the date you want to change.
* **Time Unit to Add**: Select the time unit for the **Duration** parameter.
* **Duration**: Enter the number of time units to add to the date.
* **Output Field Name**: Enter the name of the field to output the new date to.

### Add to a Date options

This operation has one option: **Include Input Fields**. If you'd like to include all of the input fields in the output, turn this option on. If turned off, only the **Output Field Name** and its contents are output.

## Extract Part of a Date

Configure the node for this operation using these parameters:

* **Date**: Enter the date you want to round or extract part of.
* **Part**: Select the part of the date you want to extract. Choose from:
    * **Year**
    * **Month**
    * **Week**
    * **Day**
    * **Hour**
    * **Minute**
    * **Second**
* **Output Field Name**: Enter the name of the field to output the extracted date part to.

### Extract Part of a Date options

This operation has one option: **Include Input Fields**. If you'd like to include all of the input fields in the output, turn this option on. If turned off, only the **Output Field Name** and its contents are output.

## Format a Date

Configure the node for this operation using these parameters:

* **Date**: Enter the date you want to format.
* **Format**: Select the format you want to change the date to. Choose from:
    * **Custom Format**: Enter your own custom format using Luxon's [special tokens](https://moment.github.io/luxon/#/formatting?id=table-of-tokens){:target=_blank .external-link}. Tokens are case-sensitive.
    * **MM/DD/YYYY**: For `4 September 1986`, this formats the date as `09/04/1986`.
    * **YYYY/MM/DD**: For `4 September 1986`, this formats the date as `1986/09/04`.
    * **MMMM DD YYYY**: For `4 September 1986`, this formats the date as `September 04 1986`.
    * **MM-DD-YYYY**: For `4 September 1986`, this formats the date as `09-04-1986`.
    * **YYYY-MM-DD**: For `4 September 1986`, this formats the date as `1986-09-04`.
* **Output Field Name**: Enter the name of the field to output the formatted date to.

### Format a Date options

This operation includes these options:

* **Include Input Fields**: If you'd like to include all of the input fields in the output, turn this option on. If turned off, only the **Output Field Name** and its contents are output.
* **From Date Format**: If the node isn't recognizing the **Date** format correctly, enter the format for that **Date** here so the node can process it properly. Use Luxon's [special tokens](https://moment.github.io/luxon/#/formatting?id=table-of-tokens){:target=_blank .external-link} to enter the format. Tokens are case-sensitive
* **Use Workflow Timezone**: Whether to use the input's time zone (turned off) or the workflow's timezone (turned on).

## Get Current Date

Configure the node for this operation using these parameters:

* **Include Current Time**: Choose whether to include the current time (turned on) or to set the time to midnight (turned off).
* **Output Field Name**: Enter the name of the field to output the current date to.

### Get Current Date options

This operation includes these options:

* **Include Input Fields**: If you'd like to include all of the input fields in the output, turn this option on. If turned off, only the **Output Field Name** and its contents are output.
* **Timezone**: Set the timezone to use. If left blank, the node uses the n8n instance's timezone.

/// note | +00:00 timezone
Use `GMT` for +00:00 timezone.
///

## Get Time Between Dates

Configure the node for this operation using these parameters:

* **Start Date**: Enter the earlier date you want to compare.
* **End Date**: Enter the later date you want to compare.
* **Units**: Select the units you want to calculate the time between. You can include multiple units. Choose from:
    * **Year**
    * **Month**
    * **Week**
    * **Day**
    * **Hour**
    * **Minute**
    * **Second**
    * **Millisecond**
* **Output Field Name**: Enter the name of the field to output the calculated time between to.

### Get Time Between Dates options

The Get Time Between Dates operation includes the **Include Input Fields** option as well as an **Output as ISO String** option. If you leave this option off, each unit you selected will return its own time difference calculation, for example:

    timeDifference
    years : 1
    months : 3
    days : 13

If you turn on the **Output as ISO String** option, the node formats the output as a single ISO duration string, for example: `P1Y3M13D`.

ISO duration format displays a format as `P<n>Y<n>M<n>DT<n>H<n>M<n>S`. `<n>` is the number for the unit after it.

* P = period (duration). It begins all ISO duration strings.
* Y = years
* M = months
* W = weeks
* D = days
* T = delineator between dates and times, used to avoid confusion between months and minutes
* H = hours
* M = minutes
* S = seconds

Milliseconds don't get their own unit, but instead are decimal seconds. For example, 2.1 milliseconds is `0.0021S`.

## Round a Date

Configure the node for this operation using these parameters:

* **Date**: Enter the date you'd like to round.
* **Mode**: Choose whether to **Round Down** or **Round Up**.
* **To Nearest**: Select the unit you'd like to round to. Choose from:
    * **Year**
    * **Month**
    * **Week**
    * **Day**
    * **Hour**
    * **Minute**
    * **Second**
* **Output Field Name**: Enter the name of the field to output the rounded date to.

### Round a Date options

This operation has one option: **Include Input Fields**. If you'd like to include all of the input fields in the output, turn this option on. If turned off, only the **Output Field Name** and its contents are output.

## Subtract From a Date

Configure the node for this operation using these parameters:

* **Date to Subtract From**: Enter the date you'd like to subtract from.
* **Time Unit to Subtract**: Select the unit for the **Duration** amount you want to subtract.
* **Duration**: Enter the amount of the time units you want to subtract from the **Date to Subtract From**.
* **Output Field Name**: Enter the name of the field to output the rounded date to.

### Subtract From a Date options

This operation has one option: **Include Input Fields**. If you'd like to include all of the input fields in the output, turn this option on. If turned off, only the **Output Field Name** and its contents are output.

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'date-and-time') ]]

## Related resources

The Date & Time node uses [Luxon](https://moment.github.io/luxon){:target=_blank .external-link}. You can also use Luxon in the [Code](/code/code-node.md) node and [expressions](/code/expressions.md). Refer to [Date and time with Luxon](/code/cookbook/luxon.md) for more information.

### Supported date formats

n8n supports all date formats [supported by Luxon](https://moment.github.io/luxon/#/formatting?id=table-of-tokens){:target=_blank .external-link}. Tokens are case-sensitive.
