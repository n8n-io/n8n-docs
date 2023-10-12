---
description: Methods for working with date and time.
contentType: reference
---

# Built-in date and time methods

Methods for working with date and time. 

!!! note "Python support"
	You can use Python in the Code node. It isn't available in expressions.

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

n8n passes dates between nodes as strings, so you need to parse them. Luxon helps you do this. Refer to [Date and time with Luxon](/code/luxon/) for more information.

n8n provides built-in convenience functions to support data transformation in expressions for dates. Refer to [Data transformation functions | Dates](/code/builtin/data-transformation-functions/dates/) for more information.
