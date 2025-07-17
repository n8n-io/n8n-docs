# Handling date and time data

The following recommendations make it easier to work with dates and times in n8n.

## Use the Date & Time node

The [Date & Time](/integrations/builtin/core-nodes/n8n-nodes-base.datetime.md) node can manipulate date and time data and convert between various formats.

This is a good choice if you want to perform high-level operations to change or create date fields in the formats that later nodes expect.

## Use Luxon dates instead of native JavaScript dates

n8n passes dates between nodes as strings, so you need to parse them. To make this easier, n8n uses a JavaScript library called [Luxon](https://github.com/moment/luxon/). n8n recommends using Luxon dates over native JavaScript dates (created with `new Date()`) in most cases.

/// warning | Don't mix native JavaScript and Luxon dates
While you can use both native JavaScript dates and Luxon dates in n8n, they aren't directly interoperable. It's best to [convert JavaScript dates to Luxon](#converting-from-javascript-dates) to avoid problems.
///

### Getting the current datetime or date

Use the [`$now` and `$today` Luxon objects](/code/builtin/date-time.md) to get the current time or day:

* `now`: a Luxon object containing the current timestamp. Equivalent to `DateTime.now()`.
* `today`: a Luxon object containing the current timestamp, rounded down to the day. Equivalent to `DateTime.now().set({ hour: 0, minute: 0, second: 0, millisecond: 0 })`.

Note that these variables can return different time formats when cast as a string:

=== "Expressions (JavaScript)"
	```javascript
	{{$now}}
	// n8n displays the ISO formatted timestamp
	// For example 2022-03-09T14:02:37.065+00:00
	{{"Today's date is " + $now}}
	// n8n displays "Today's date is <unix timestamp>"
	// For example "Today's date is 1646834498755"
	```

=== "Code node (JavaScript)"
	```javascript
	$now
	// n8n displays <ISO formatted timestamp>
	// For example 2022-03-09T14:00:25.058+00:00
	let rightNow = "Today's date is " + $now
	// n8n displays "Today's date is <unix timestamp>"
	// For example "Today's date is 1646834498755"
	```
=== "Code node (Python)"
	```python
	_now
	# n8n displays <ISO formatted timestamp>
	# For example 2022-03-09T14:00:25.058+00:00
	rightNow = "Today's date is " + str(_now)
	# n8n displays "Today's date is <unix timestamp>"
	# For example "Today's date is 1646834498755"
	```

### Converting from JavaScript dates

To convert a native JavaScript date to a Luxon date:

* In expressions, use the [`.toDateTime()` method](/code/builtin/data-transformation-functions/dates.md#date-toDateTime). For example, `(new Date()).ToDateTime()`.
* In the Code node, use `DateTime.fromJSDate()`. For example, `let luxondate = DateTime.fromJSDate(new Date())`.

### Parsing strings

To parse strings into Luxon dates, use Luxon's `fromISO()` or `fromFormat()` methods:

* Use `fromISO()` to create a Luxon date from an [ISO 8601-formatted string](https://moment.github.io/luxon/#/parsing?id=iso-8601), like `DateTime.fromISO('2024-12-31T00:00:00.0')`.
* Use `fromFormat()` to [specify the format](https://moment.github.io/luxon/#/parsing?id=ad-hoc-parsing) Luxon should use to parse the string, like `DateTime.fromFormat("31-12-2024", "dd-MM-yyyy")`.
