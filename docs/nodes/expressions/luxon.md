# Date and time with Luxon

[Luxon](https://github.com/moment/luxon/) is a JavaScript library that makes it easier to work with date and time. For full details of how to use Luxon, refer to [Luxon's documentation](https://moment.github.io/luxon/#/?id=luxon). 

## Variables

n8n uses Luxon to provide two custom variables:

`$now`: [TODO - currently something like this: $now: the current timestamp, in UNIX format or ISO format, depending on how you use it. In most cases it is in UNIX format, but if you use it by itself, it returns an ISO-formatted date.]
`$today`: [TODO - currently something like this: $today: the current timestamp rounded down to today's date, in UNIX format or ISO format, depending on how you use it. In most cases it is in UNIX format, but if you use it by itself, it returns an ISO-formatted date.]

## Common tasks

This section provides examples for some common operations. Many more examples, and detailed guidance, is available in [Luxon's own documentation](https://moment.github.io/luxon/#/?id=luxon).

### Get n days from today

Get a number of days before or after today. 

For example, you want to set a field to always show the date seven days before the current date.

In the expressions editor, enter:

::: v-pre
```js
{{$today.minus({days: 7})}}
```

On the 9th March 2022, this returns `[Object: "2022-03-02T00:00:00.000+00:00"]`.

This example uses n8n's custom variable `$today` for convenience. It is the equivalent of `DateTime.now().set({ hour: 0, minute: 0, second: 0, millisecond: 0 }).minus({days: 7})`.
:::

For more detailed information and examples, refer to:

* Luxon's [guide to math](https://moment.github.io/luxon/#/math)
* Their API documentation on [DateTime plus](https://moment.github.io/luxon/api-docs/index.html#datetimeplus) and [DateTime minus](https://moment.github.io/luxon/api-docs/index.html#datetimeminus)

### Create human-readable dates

In [Get n days from today](#get-n-days-from-today), the example gets the date seven days before the current date, and returns it as `[Object: "yyyy-mm-dd-T00:00:00.000+00:00"]`. To make this more readable, you can use Luxon's formatting functions.

For example, you want the field containing the date to be formatted as DD/MM/YYYY.

This expression gets the date seven days before today, and converts it to the DD/MM/YYYY format. So on the 9th March, it returns 02/03/2022:

```js
{{$today.minus({days: 7}).toLocaleString()}}
```

You can alter the format. For example:

```js
{{$today.minus({days: 7}).toLocaleString({month: 'long', day: 'numeric', year: 'numeric'})}}
```

On 9th March, this returns "2 March 2022".

For more detailed information and examples, refer to Luxon's guide on [toLocaleString (strings for humans)](https://moment.github.io/luxon/#/formatting?id=tolocalestring-strings-for-humans).

### Get the time between two dates

To get the time between two dates, use Luxon's diffs.

There is a basic example in the Luxon documentation. This creates two DateTimes, `end` and `start`, then finds out how many months there are between them:

```js
var end = DateTime.fromISO('2017-03-13');
var start = DateTime.fromISO('2017-02-13');

var diffInMonths = end.diff(start, 'months');
diffInMonths.toObject();
// returns { months:1 }
```

You cannot use this example exactly as it is in the n8n expressions editor. However, you can rewrite it


{{DateTime.fromISO('2017-03-13').diff(DateTime.fromISO('2017-02-13'), 'months').toObject()}}

For example, you want to find out how many months it is from now until Christmas.





