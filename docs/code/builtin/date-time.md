---
description: Methods for working with date and time.
contentType: reference
hide:
  - toc
---

# Built-in date and time methods

Methods for working with date and time. 

/// note | Python support
You can use Python in the Code node. It isn't available in expressions.
///
=== "JavaScript"
	| Method | Description | Available in Code node? |
	| ------ | ----------- | :-------------------------: |
	| `$now` | A Luxon object containing the current timestamp. Equivalent to `DateTime.now()`. | :white_check_mark: |
	| `$today` | A Luxon object containing the current timestamp, rounded down to the day. Equivalent to `DateTime.now().set({ hour: 0, minute: 0, second: 0, millisecond: 0 })`. | :white_check_mark: |
=== "Python"
	| Method | Description | 
	| ------ | ----------- | 
	| `_now` | A Luxon object containing the current timestamp. Equivalent to `DateTime.now()`. | 
	| `_today` | A Luxon object containing the current timestamp, rounded down to the day. Equivalent to `DateTime.now().set({ hour: 0, minute: 0, second: 0, millisecond: 0 })`. | 

/// warning | Don't mix native JavaScript and Luxon dates
While you can use both native JavaScript dates and Luxon dates in n8n, they aren't directly interoperable. It's best to [convert JavaScript dates to Luxon](/code/cookbook/luxon.md#convert-javascript-dates-to-luxon) to avoid problems.
///

n8n provides built-in convenience functions to support data transformation in expressions for dates. Refer to [Data transformation functions | Dates](/code/builtin/data-transformation-functions/dates.md) for more information.
