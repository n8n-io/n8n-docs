# Date and time with Luxon

[Luxon](https://github.com/moment/luxon/) is a JavaScript library that makes it easier to work with date and time. For full details of how to use Luxon, refer to [Luxon's documentation](https://moment.github.io/luxon/#/?id=luxon). 

## Variables

n8n uses Luxon to provide two custom variables:

- `$now`: a Luxon object containing the current timestamp. Equivalent to `DateTime.now()`.
- `$today`: a Luxon object containing the current timestamp, rounded down to the day. Equivalent to `DateTime.now().set({ hour: 0, minute: 0, second: 0, millisecond: 0 })`.

Note that these variables can return different time formats when cast as a string. This is the same behavior as Luxon's `DateTime.now()`.


``` js
{{$now}}
// Returns [Object: "<ISO formatted timestamp>"]
// For example [Object: "2022-03-09T14:00:25.058+00:00"]
{{$now.toString()}}
// Returns the ISO formatted timestamp
// For example 2022-03-09T14:02:37.065+00:00
{{"Today's date is " + $now}}
// Returns "Today's date is <unix timestamp>"
// For example "Today's date is 1646834498755"
```

## Setting the timezone in n8n

Luxon uses the n8n timezone. This value is either:

* Default: `America/New York`
* A custom timezone for your n8n instance, set using the `GENERIC_TIMEZONE` environment variable.
* A custome timezone for an individual workflow, configured in workflow settings.

## Common tasks

This section provides examples for some common operations. Many more examples, and detailed guidance, are available in [Luxon's own documentation](https://moment.github.io/luxon/#/?id=luxon).

### Get n days from today

Get a number of days before or after today. 

For example, you want to set a field to always show the date seven days before the current date.

In the expressions editor, enter:


``` js
{{$today.minus({days: 7})}}
```

On the 23rd June 2019, this returns `[Object: "2019-06-16T00:00:00.000+00:00"]`.

This example uses n8n's custom variable `$today` for convenience. It is the equivalent of `DateTime.now().set({ hour: 0, minute: 0, second: 0, millisecond: 0 }).minus({days: 7})`.


For more detailed information and examples, refer to:

* Luxon's [guide to math](https://moment.github.io/luxon/#/math)
* Their API documentation on [DateTime plus](https://moment.github.io/luxon/api-docs/index.html#datetimeplus) and [DateTime minus](https://moment.github.io/luxon/api-docs/index.html#datetimeminus)

### Create human-readable dates

In [Get n days from today](#get-n-days-from-today), the example gets the date seven days before the current date, and returns it as `[Object: "yyyy-mm-dd-T00:00:00.000+00:00"]`. To make this more readable, you can use Luxon's formatting functions.

For example, you want the field containing the date to be formatted as DD/MM/YYYY.

This expression gets the date seven days before today, and converts it to the DD/MM/YYYY format. So on the 23rd June 2019, it returns 23/06/2019:

```js
{{$today.minus({days: 7}).toLocaleString()}}
```

You can alter the format. For example:

```js
{{$today.minus({days: 7}).toLocaleString({month: 'long', day: 'numeric', year: 'numeric'})}}
```

On 23rd June 2019, this returns "16 June 2019".

Refer to Luxon's guide on [toLocaleString (strings for humans)](https://moment.github.io/luxon/#/formatting?id=tolocalestring-strings-for-humans) for more information.

### Convert date string to Luxon

You can convert date strings and other date formats to a Luxon DateTime object. You can convert from standard formats and from arbitrary strings.

If you have a date in a supported standard technical format: 

Luxon provides functions to handle the conversion. Refer to Luxon's guide to [Parsing technical formats](https://moment.github.io/luxon/#/parsing?id=parsing-technical-formats) for details.

If you have a date as a string that does not use a standard format: 

Use Luxon's [Ad-hoc parsing](https://moment.github.io/luxon/#/parsing?id=ad-hoc-parsing). To do this, use the `fromFormat()` function, providing the string and a set of [tokens](https://moment.github.io/luxon/#/parsing?id=table-of-tokens) that describe the format.

For example, you have n8n's founding date, 23rd June 2019, formatted as '23-06-2019'. You want to turn this into a Luxon object:

```js
{{DateTime.fromFormat("23-06-2019", "dd-MM-yyyy")}}
```

When using ad-hoc parsing, note Luxon's warning about [Limitations](https://moment.github.io/luxon/#/parsing?id=limitations). If you see unexpected results, try their [Debugging](https://moment.github.io/luxon/#/parsing?id=debugging) guide.


### Get the time between two dates

To get the time between two dates, use Luxon's diffs feature. This subtracts one date from another and returns a duration.

For example, get the number of months between two dates:

```js
{{DateTime.fromISO('201-06-23').diff(DateTime.fromISO('2019-05-23'), 'months').toObject()}}
```

This returns `[Object: {"months":1}]`.

Refer to Luxon's [Diffs](https://moment.github.io/luxon/#/math?id=diffs) for more information.

### A longer example: how many days to Christmas?

This example brings together several Luxon features, uses JMESPath, and does some basic string manipulation. 

The scenario: you want a countdown to 25th December. Every day, it should tell you the number of days remaining to Christmas. You don't want to update it for next year - it needs to seamelessly work for every year.

```js
{{"There are " + $today.diff(DateTime.fromISO($today.year + '-12-25'), 'days').toObject().days.toString().substring(1) + " days to Christmas!"}}
```

This outputs `"There are <number of days> days to Christmas!"`. For example, on 9th March, it outputs "There are 291 days to Christmas!".

A detailed explanation of what the expression does:

* `{{`: indicates the start of the expression.
* `"There are "`: a string. 
* `+`: used to join two strings.
* `$today.diff()`: This is similar to the example in [Get the time between two dates](#get-the-time-between-two-dates), but it uses n8n's custom `$today` variable.
* `DateTime.fromISO($today.year + '-12-25'), 'days'`: this part gets the current year using `$today.year`, turns it into an ISO string along with the month and date, and then takes the whole ISO string and converts it to a Luxon DateTime data structure. It also tells Luxon that you want the duration in days.
* `toObject()` turns the result of diff() into a more usable object. At this point, the expression returns `[Object: {"days":-<number-of-days>}]`. For example, on 9th March, `[Object: {"days":-291}]`.
* `.days` uses JMESPath syntax to retrieve just the number of days from the object. For more information on using JMESPath with n8n, refer to our [JMESpath](/code-examples/expressions/jmespath/) documentation. This gives you the number of days to Christmas, as a negative number.
* `.toString().substring(1)` turns the number into a string and removes the `-`.
* `+ " days to Christmas!"`: another string, with a `+` to join it to the previous string.
* `}}`: indicates the end of the expression.






