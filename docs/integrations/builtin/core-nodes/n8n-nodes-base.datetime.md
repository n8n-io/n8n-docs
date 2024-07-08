---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Date & Time
description: Documentation for the Date & Time node in n8n, a workflow automation platform. Includes guidance on usage, and links to examples.
contentType: integration
---

# Date & Time

The Date & Time node manipulates date and time data and convert it to different formats.

/// note | Examples and templates
For usage examples and templates to help you get started, refer to n8n's [Date & Time integrations](https://n8n.io/integrations/date-and-time/){:target=_blank .external-link} list.
///
--8<-- "_snippets/integrations/builtin/core-nodes/schedule/timezone-settings.md"

/// note | Date and time in other nodes
You can work with data and time in the Code node, and in expressions in any node. n8n supports Luxon to help work with date and time in JavaScript. Refer to [Date and time with Luxon](/code/cookbook/luxon/) for more information.
///

## Operations

* Add to a Date
* Extract Part of a Date
* Format a Date
* Get Current Date
* Get Time Between Dates
* Round a Date
* Subtract From a Date

## Node parameters

The node parameters depend on the **Operation** you select.

### Add to a Date parameters

* **Date to Add To**: Enter the date you want to change.
* **Time Unit to Add**: Select the time unit for the **Duration** parameter.
* **Duration**: Enter the number of time units to add to the date.
* **Output Field Name**: Enter the name of the field to output the new date to.

### Extract Part of a Date parameters

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

### Format a Date parameters

* **Date**: Enter the date you want to format.
* **Format**: Select the format you want to change the date to. Choose from:
    * **Custom Format**: Enter your own custom format using Luxon's [special tokens](https://moment.github.io/luxon/#/formatting?id=table-of-tokens){:target=_blank .external-link}. Tokens are case-sensitive.
    * **MM/DD/YYYY**: For `4 September 1986`, this formats the date as `09/04/1986`.
    * **YYYY/MM/DD**: For `4 September 1986`, this formats the date as `1986/09/04`.
    * **MMMM DD YYYY**: For `4 September 1986`, this formats the date as `September 04 1986`.
    * **MM-DD-YYYY**: For `4 September 1986`, this formats the date as `09-04-1986`.
    * **YYYY-MM-DD**: For `4 September 1986`, this formats the date as `1986-09-04`.
* **Output Field Name**: Enter the name of the field to output the formatted date to.

### Get Current Date parameters

* **Include Current Time**: Choose whether to include the current time (turned on) or to set the time to midnight (turned off).
* **Output Field Name**: Enter the name of the field to output the current date to.

### Get Time Between Dates parameters

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

### Round a Date parameters

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

### Subtract From a Date parameters

* **Date to Subtract From**: Enter the date you'd like to subtract from.
* **Time Unit to Subtract**: Select the unit for the **Duration** amount you want to subtract.
* **Duration**: Enter the amount of the time units you want to subtract from the **Date to Subtract From**.
* **Output Field Name**: Enter the name of the field to output the rounded date to.

## Node options

All operations include the option to **Include Input Fields**. If you'd like to include all of the input fields in the output, turn this option on. If turned off, only the **Output Field Name** and its contents are output.

Some operations include more options; refer to the sections below for information on those.

### Format a Date options

The Format a Date operation includes the **Include Input Fields** option as well as these options:

* **From Date Format**: If the node isn't recognizing the **Date** format correctly, enter the format for that **Date** here so the node can process it properly. Use Luxon's [special tokens](https://moment.github.io/luxon/#/formatting?id=table-of-tokens){:target=_blank .external-link} to enter the format. Tokens are case-sensitive
* **Use Workflow Timezone**: Whether to use the input's time zone (turned off) or the workflow's timezone (turned on).

### Get Current Date options

The Get Current Date operation includes the **Include Input Fields** option as well as a **Timezone** option. Use the **Timezone** option to set the timezone to use. If left blank, the node usees the n8n instance's timezone.

/// note | +00:00 timezone
Use `GMT` for +00:00 timezone.
///

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

## Related resources

View [example workflows and related content](https://n8n.io/integrations/date-and-time/){:target=_blank .external-link} on n8n's website.

The Date & Time node uses [Luxon](https://moment.github.io/luxon){:target=_blank .external-link}. You can also use Luxon in the [Code](/code/code-node/) node and [expressions](/code/expressions/). Refer to [Date and time with Luxon](/code/cookbook/luxon/) for more information.

### Supported date formats

n8n supports all date formats [supported by Luxon](https://moment.github.io/luxon/#/formatting?id=table-of-tokens){:target=_blank .external-link}. Tokens are case-sensitive.
