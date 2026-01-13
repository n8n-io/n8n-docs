# DateTime

## isBetween()

* **Description:** Returns `true` if the DateTime lies between the two moments specified
* **Definition:** isBetween(date1, date2)
* **Returns:** Boolean
* **Source:** n8n
* **Parameters:**
  * `date1` (String|DateTime) - The moment that the base DateTime must be after. Can be an ISO date string or a Luxon DateTime.
  * `date2` (String|DateTime) - The moment that the base DateTime must be before. Can be an ISO date string or a Luxon DateTime.
* **Examples:**

  ```javascript
  // dt = "2024-03-30T18:49".toDateTime()
  dt.isBetween('2020-06-01', '2025-06-01') //=> true
  ```

  ```javascript
  // dt = "2024-03-30T18:49".toDateTime()
  dt.isBetween('2020', $now) //=> true
  ```

## weekdayShort

* **Description:** The textual abbreviated weekday name, e.g. 'Wed'. Defaults to the system's locale if no locale has been specified.
* **Definition:** weekdayShort
* **Returns:** String
* **Source:** Luxon
* **Examples:**

  ```javascript
  // dt = "2024-03-30T18:49".toDateTime()
  dt.weekdayShort //=> 'Sat'
  ```

  ```javascript
  // dt = "2024-03-30T18:49".toDateTime()
  dt.setLocale('fr-FR').weekdayShort //=> 'sam.'
  ```

## format()

* **Description:** Converts the DateTime to a string, using the format specified. Formatting guide. For common formats, `toLocaleString()` may be easier.
* **Definition:** format(fmt)
* **Returns:** String
* **Source:** n8n
* **Parameters:**
  * `fmt` (String) - The <a href="https://moment.github.io/luxon/#/formatting?id=table-of-tokens">format</a> of the string to return 
* **Examples:**

  ```javascript
  // dt = "2024-04-30T18:49".toDateTime()
  dt.format('dd/LL/yyyy') //=> '30/04/2024'
  ```

  ```javascript
  // dt = "2024-04-30T18:49".toDateTime()
  dt.format('dd LLL yy') //=> '30 Apr 24'
  dt.setLocale('fr').format('dd LLL yyyy') //=> '30 avr. 2024'
  dt.format("HH 'hours and' mm 'minutes'") //=> '18 hours and 49 minutes'
  ```

## toISO()

* **Description:** Returns an ISO 8601-compliant string representation of the DateTime
* **Definition:** toISO(opts)
* **Returns:** String
* **Source:** Luxon
* **Parameters:**
  * `opts ` (Object) - optional - Configuration options. See <a href=”https://moment.github.io/luxon/api-docs/index.html#datetimetoiso”>Luxon docs</a> for more info.
* **Examples:**

  ```javascript
  $now.toISO() //=> 2024-04-05T18:44:55.525+02:00
  ```

## plus()

* **Description:** Adds a given period of time to the DateTime
* **Definition:** plus(n, unit?)
* **Returns:** DateTime
* **Source:** n8n
* **Parameters:**
  * `n` (Number|Object) - The number of units to add. Or use a Luxon <a href=”https://moment.github.io/luxon/api-docs/index.html#duration”>Duration</a> object to add multiple units at once.
  * `unit` (String) - optional - The units of the number. One of: <code>years</code>, <code>months</code>, <code>weeks</code>, <code>days</code>, <code>hours</code>, <code>minutes</code>, <code>seconds</code>, <code>milliseconds</code>
* **Examples:**

  ```javascript
  // dt = "2024-03-30T18:49".toDateTime()
  dt.plus(7, 'days') //=> 2024-04-06T18:49
  ```

  ```javascript
  // dt = "2024-03-30T18:49".toDateTime()
  dt.plus(4, 'years') //=> 2028-03-30T18:49
  ```

## isInDST

* **Description:** Whether the DateTime is in daylight saving time
* **Definition:** isInDST
* **Returns:** Boolean
* **Source:** Luxon

## zone

* **Description:** The time zone associated with the DateTime
* **Definition:** zone
* **Returns:** Object
* **Source:** Luxon
* **Examples:**

  ```javascript
  $now.zone //=> {"zoneName": "Europe/Berlin", "valid": true}
  ```

## toMillis()

* **Description:** Returns a Unix timestamp in milliseconds (the number elapsed since 1st Jan 1970)
* **Definition:** toMillis()
* **Returns:** Number
* **Source:** Luxon
* **Examples:**

  ```javascript
  $now.toMillis() //=> 1712334324677
  ```

## weekNumber

* **Description:** The week number of the year (1-52ish)
* **Definition:** weekNumber
* **Returns:** Number
* **Source:** Luxon
* **Examples:**

  ```javascript
  // dt = "2024-03-30T18:49".toDateTime()
  dt.weekNumber //=> 13
  ```

## month

* **Description:** The month (1-12)
* **Definition:** month
* **Returns:** Number
* **Source:** Luxon
* **Examples:**

  ```javascript
  // dt = "2024-03-30T18:49".toDateTime()
  dt.month //=> 3
  ```

## toSeconds()

* **Description:** Returns a Unix timestamp in seconds (the number elapsed since 1st Jan 1970)
* **Definition:** toSeconds()
* **Returns:** Number
* **Source:** Luxon
* **Examples:**

  ```javascript
  $now.toSeconds() //=> 1712334442.372
  ```

## toString()

* **Description:** Returns a string representation of the DateTime. Similar to `toISO()`. For more formatting options, see `format()` or `toLocaleString()`.
* **Definition:** toString()
* **Returns:** string
* **Source:** Luxon
* **Examples:**

  ```javascript
  $now.toString() //=> 2024-04-05T18:44:55.525+02:00
  ```

## toLocaleString()

* **Description:** Returns a localised string representing the DateTime, i.e. in the language and format corresponding to its locale. Defaults to the system's locale if none specified.
* **Definition:** toLocaleString(formatOpts)
* **Returns:** String
* **Source:** Luxon
* **Parameters:**
  * `formatOpts ` (Object) - optional - Configuration options for the rendering. See <a href=”https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#parameters”>Intl.DateTimeFormat</a> for a full list. Defaults to rendering a short date.
  * ` ` ()
* **Examples:**

  ```javascript
  $now.toLocaleString() //=> '4/30/2024'
  $now.toLocaleString({'dateStyle':'medium', 'timeStyle':'short'}) //=> 'Apr 30, 2024, 10:00 PM'
  // (if in US English locale)
  ```

  ```javascript
  $now.setLocale('de-DE').toLocaleString() //=> '30.4.2024'
  ```

  ```javascript
  $now.toLocaleString({'dateStyle':'short'}) //=> '4/30/2024'
  $now.toLocaleString({'dateStyle':'medium'}) //=> 'Apr 30, 2024'
  $now.toLocaleString({'dateStyle':'long'}) //=> 'April 30, 2024'
  $now.toLocaleString({'dateStyle':'full'}) //=> 'Tuesday, April 30, 2024'
  // (if in US English locale)
  ```

  ```javascript
  $now.toLocaleString({'year':'numeric', 'month':'numeric', 'day':'numeric'}) //=> '4/30/2024'
  $now.toLocaleString({'year':'2-digit', 'month':'2-digit', 'day':'2-digit'}) //=> '04/30/24'
  $now.toLocaleString({'month':'short', 'weekday':'short', 'day':'numeric'}) //=> 'Tue, Apr 30'
  $now.toLocaleString({'month':'long', 'weekday':'long', 'day':'numeric'}) //=> 'Tuesday, April 30'
  // (if in US English locale)
  ```

  ```javascript
  $now.toLocaleString({'timeStyle':'short'}) //=> '10:00 PM'
  $now.toLocaleString({'timeStyle':'medium'}) //=> '10:00:58 PM'
  $now.toLocaleString({'timeStyle':'long'}) //=> '10:00:58 PM GMT+2'
  $now.toLocaleString({'timeStyle':'full'}) //=> '10:00:58 PM Central European Summer Time'
  // (if in US English locale)
  ```

  ```javascript
  $now.toLocaleString({'hour':'numeric', 'minute':'numeric', hourCycle:'h24'}) //=> '22:00'
  $now.toLocaleString({'hour':'2-digit', 'minute':'2-digit', hourCycle:'h12'}) //=> '10:00 PM'
  // (if in US English locale)
  ```

## millisecond

* **Description:** The millisecond of the second (0-999)
* **Definition:** millisecond
* **Returns:** Number
* **Source:** Luxon
* **Examples:**

  ```javascript
  // dt = "2024-03-30T18:49:07.234".toDateTime()
  dt.millisecond //=> 234
  ```

## weekdayLong

* **Description:** The textual long weekday name, e.g. 'Wednesday'. Defaults to the system's locale if no locale has been specified.
* **Definition:** weekdayLong
* **Returns:** String
* **Source:** Luxon
* **Examples:**

  ```javascript
  // dt = "2024-03-30T18:49".toDateTime()
  dt.weekdayLong //=> 'Saturday'
  ```

  ```javascript
  // dt = "2024-03-30T18:49".toDateTime()
  dt.setLocale('de-DE').weekdayLong //=> 'Samstag'
  ```

## monthLong

* **Description:** The textual long month name, e.g. 'October'. Defaults to the system's locale if no locale has been specified.
* **Definition:** monthLong
* **Returns:** String
* **Source:** Luxon
* **Examples:**

  ```javascript
  // dt = "2024-03-30T18:49".toDateTime()
  dt.monthLong //=> 'March'
  ```

  ```javascript
  // dt = "2024-03-30T18:49".toDateTime()
  dt.setLocale('de-DE').monthLong //=> 'März'
  ```

## second

* **Description:** The second of the minute (0-59)
* **Definition:** second
* **Returns:** Number
* **Source:** Luxon
* **Examples:**

  ```javascript
  // dt = "2024-03-30T18:49:07.234".toDateTime()
  dt.second //=> 7
  ```

## year

* **Description:** The year
* **Definition:** year
* **Returns:** Number
* **Source:** Luxon
* **Examples:**

  ```javascript
  // dt = "2024-03-30T18:49".toDateTime()
  dt.year //=> 2024
  ```

## diffToNow()

* **Description:** Returns the difference between the current moment and the DateTime, in the given unit(s). For a textual representation, use `toRelative()` instead.
* **Definition:** diffToNow(unit)
* **Returns:** Number
* **Source:** n8n
* **Parameters:**
  * `unit ` (String|Array<String>) - optional - The unit, or array of units, to return the result in. Possible values: <code>years</code>, <code>months</code>, <code>weeks</code>, <code>days</code>, <code>hours</code>, <code>minutes</code>, <code>seconds</code>, <code>milliseconds</code>.
  * ` ` ()
  * ` ` ()
* **Examples:**

  ```javascript
  // dt = "2023-03-30T18:49:07.234".toDateTime()
  dt.diffToNow('days') //=> 371.9
  ```

  ```javascript
  // dt = "2023-03-30T18:49:07.234".toDateTime()
  dt.diffToNow(['months', 'days']) //=> {"months":12, "days":5.9}
  ```

  ```javascript
  Note: should support both day and days, etc.
  ```

## set()

* **Description:** Assigns new values to specified units of the DateTime. To round a DateTime, see also `startOf()` and `endOf()`.
* **Definition:** set(values)
* **Returns:** DateTime
* **Source:** Luxon
* **Parameters:**
  * `values ` (Object) - An object containing the units to set and corresponding values to assign. Possible keys are <code>year</code>, <code>month</code>, <code>day</code>, <code>hour</code>, <code>minute</code>, <code>second</code> and <code>millsecond</code>.
* **Examples:**

  ```javascript
  // dt = "2024-03-30T18:49".toDateTime()
  dt.set({year:1982, month:10}) //=> 1982-10-20T18:49
  ```

## hour

* **Description:** The hour of the day (0-23)
* **Definition:** hour
* **Returns:** Number
* **Source:** Luxon
* **Examples:**

  ```javascript
  // dt = "2024-03-30T18:49".toDateTime()
  dt.hour //=> 18
  ```

## equals()

* **Description:** Returns `true` if the two DateTimes represent exactly the same moment and are in the same time zone. For a less strict comparison, use `hasSame()`.
* **Definition:** equals(other)
* **Returns:** Boolean
* **Source:** Luxon
* **Parameters:**
  * `other ` (DateTime) - The other DateTime to compare
* **Examples:**

  ```javascript
  // dt1 = "2024-03-20T18:49+01:00".toDateTime()
  // dt2 = "2024-03-20T19:49+02:00".toDateTime()
  dt1.equals(dt2) //=> false
  ```

## monthShort

* **Description:** The textual abbreviated month name, e.g. 'Oct'. Defaults to the system's locale if no locale has been specified.
* **Definition:** monthShort
* **Returns:** String
* **Source:** Luxon
* **Examples:**

  ```javascript
  // dt = "2024-03-30T18:49".toDateTime()
  dt.monthShort //=> 'Mar'
  ```

  ```javascript
  // dt = "2024-03-30T18:49".toDateTime()
  dt.setLocale('de-DE').monthShort //=> 'Mär'
  ```

## setLocale()

* **Description:** Sets the locale, which determines the language and formatting for the DateTime. Useful when generating a textual representation of the DateTime, e.g. with `format()` or `toLocaleString()`.
* **Definition:** setLocale(locale)
* **Returns:** DateTime
* **Source:** Luxon
* **Parameters:**
  * `locale ` (String) - The locale to assign, e.g. ‘en-GB’ for British English or ‘pt-BR’ for Brazilian Portuguese. <a href=”https://www.localeplanet.com/icu/”>List</a> (unofficial)
* **Examples:**

  ```javascript
  $now.setLocale('de-DE').toLocaleString({'dateStyle':'long'}) //=> 5. Oktober 2024
  ```

  ```javascript
  $now.setLocale('fr-FR').toLocaleString({'dateStyle':'long'}) //=> 5 octobre 2024
  ```

## endOf()

* **Description:** Rounds the DateTime up to the end of one of its units, e.g. the end of the month
* **Definition:** endOf(unit, opts)
* **Returns:** DateTime
* **Source:** Luxon
* **Parameters:**
  * `unit ` (String) - The unit to round to the end of. Can be <code>year</code>, <code>quarter</code>, <code>month</code>, <code>week</code>, <code>day</code>, <code>hour</code>, <code>minute</code>, <code>second</code>, or <code>millisecond</code>.
  * `opts ` (Object) - optional - Object with options that affect the output. Possible properties:
<code>useLocaleWeeks</code> (boolean): Whether to use the locale when calculating the start of the week. Defaults to false.
* **Examples:**

  ```javascript
  // dt = "2024-03-20T18:49".toDateTime()
  dt.endOf('month') //=> 2024-03-31T23:59
  ```

## locale

* **Description:** The locale of a DateTime, such 'en-GB'. The locale is used when formatting the DateTime.
* **Definition:** locale
* **Returns:** String
* **Source:** Luxon
* **Examples:**

  ```javascript
  $now.locale //=> 'en-US'
  ```

## quarter

* **Description:** The quarter of the year (1-4)
* **Definition:** quarter
* **Returns:** Number
* **Source:** Luxon
* **Examples:**

  ```javascript
  // dt = "2024-03-30T18:49".toDateTime()
  dt.quarter //=> 1
  ```

## startOf()

* **Description:** Rounds the DateTime down to the beginning of one of its units, e.g. the start of the month
* **Definition:** startOf(unit, opts)
* **Returns:** DateTime
* **Source:** Luxon
* **Parameters:**
  * `unit ` (String) - The unit to round to the beginning of. One of <code>year</code>, <code>quarter</code>, <code>month</code>, <code>week</code>, <code>day</code>, <code>hour</code>, <code>minute</code>, <code>second</code>, or <code>millisecond</code>.
  * `opts ` (Object) - optional - Object with options that affect the output. Possible properties:
<code>useLocaleWeeks</code> (boolean): Whether to use the locale when calculating the start of the week. Defaults to false.
* **Examples:**

  ```javascript
  // dt = "2024-03-20T18:49".toDateTime()
  dt.startOf('month') //=> 2024-03-01T00:00
  ```

## hasSame()

* **Description:** Returns `true` if the two DateTimes are the same, down to the unit specified. Time zones are ignored (only local times are compared), so use `toUTC()` first if needed.
* **Definition:** hasSame(otherDateTime, unit)
* **Returns:** Boolean
* **Source:** Luxon
* **Parameters:**
  * `otherDateTime ` (DateTime) - The other DateTime to compare
  * `unit ` (String) - The unit of time to check sameness down to. One of <code>year</code>, <code>quarter</code>, <code>month</code>, <code>week</code>, <code>day</code>, <code>hour</code>, <code>minute</code>, <code>second</code>, or <code>millisecond</code>.
  * ` ` ()
* **Examples:**

  ```javascript
  // dt1 = "2024-03-20".toDateTime()
  // dt2 = "2024-03-18".toDateTime()
  dt1.hasSame(dt2, 'month') //=> true
  ```

  ```javascript
  // dt1 = "1982-03-20".toDateTime()
  // dt2 = "2024-03-18".toDateTime()
  dt1.hasSame(dt2, 'month') //=> false
  ```

## day

* **Description:** The day of the month (1-31)
* **Definition:** day
* **Returns:** Number
* **Source:** Luxon
* **Examples:**

  ```javascript
  // dt = "2024-03-30T18:49".toDateTime()
  dt.day //=> 30
  ```

## minute

* **Description:** The minute of the hour (0-59)
* **Definition:** minute
* **Returns:** Number
* **Source:** Luxon
* **Examples:**

  ```javascript
  // dt = "2024-03-30T18:49".toDateTime()
  dt.minute //=> 49
  ```

## toLocal()

* **Description:** Converts a DateTime to the workflow’s local time zone. The DateTime still represents the same moment unless specified in the parameters. The workflow’s time zone can be set in the workflow settings.
* **Definition:** toLocal()
* **Returns:** DateTime
* **Source:** Luxon
* **Examples:**

  ```javascript
  // dt = "2024-01-01T00:00:00.000Z".toDateTime()
  dt.toLocal() //=> 2024-01-01T01:00:00.000+01:00, if time zone is Europe/Berlin
  ```

## toRelative()

* **Description:** Returns a textual representation of the time relative to now, e.g. ‘in two days’. Rounds down by default.
* **Definition:** toRelative(options)
* **Returns:** String
* **Source:** Luxon
* **Parameters:**
  * `options ` (Object) - optional - Options that affect the output. Possible properties:
<code>unit</code> = the unit to default to (<code>years</code>, <code>months</code>, <code>days</code>, etc.).
<code>locale</code> = the language and formatting to use (e.g. <code>de</code>, <code>fr</code>)
* **Examples:**

  ```javascript
  $now.plus(1, 'day').toRelative() //=> "in 1 day"
  ```

  ```javascript
  $now.plus(1, 'day').toRelative({unit:'hours'}) //=> "in 24 hours"
  ```

  ```javascript
  $now.plus(1, 'day').toRelative({locale:'es'}) //=> "dentro de 1 día"
  ```

## extract()

* **Description:** Extracts a part of the date or time, e.g. the month, as a number. To extract textual names instead, see `format()`.
* **Definition:** extract(unit?)
* **Returns:** Number
* **Source:** n8n
* **Parameters:**
  * `unit` (String) - optional - The part of the date or time to return. One of: <code>year</code>, <code>month</code>, <code>week</code>, <code>day</code>, <code>hour</code>, <code>minute</code>, <code>second</code>
* **Examples:**

  ```javascript
  // dt = "2024-03-30T18:49".toDateTime()
  dt.extract('month') //=> 3
  ```

  ```javascript
  // dt = "2024-03-30T18:49".toDateTime()
  dt.extract('hour') //=> 18
  ```

## minus()

* **Description:** Subtracts a given period of time from the DateTime
* **Definition:** minus(n, unit?)
* **Returns:** DateTime
* **Source:** n8n
* **Parameters:**
  * `n` (Number|Object) - The number of units to subtract. Or use a Luxon <a href=”https://moment.github.io/luxon/api-docs/index.html#duration”>Duration</a> object to subtract multiple units at once.
  * `unit` (String) - optional - The units of the number. One of: <code>years</code>, <code>months</code>, <code>weeks</code>, <code>days</code>, <code>hours</code>, <code>minutes</code>, <code>seconds</code>, <code>milliseconds</code>
* **Examples:**

  ```javascript
  // dt = "2024-03-30T18:49".toDateTime()
  dt.minus(7, 'days') //=> 2024-03-23T18:49
  ```

  ```javascript
  // dt = "2024-03-30T18:49".toDateTime()
  dt.minus(4, 'years') //=> 2020-04-30T18:49
  ```

## weekday

* **Description:** The day of the week. 1 is Monday and 7 is Sunday.
* **Definition:** weekday
* **Returns:** Number
* **Source:** Luxon
* **Examples:**

  ```javascript
  // dt = "2024-03-30T18:49".toDateTime()
  dt.weekday //=> 6
  ```

## setZone()

* **Description:** Converts the DateTime to the given time zone. The DateTime still represents the same moment unless specified in the options. See also `toLocal()` and `toUTC()`.
* **Definition:** setZone(zone, opts)
* **Returns:** DateTime
* **Source:** Luxon
* **Parameters:**
  * `zone ` (String) - optional - A zone identifier, either in the format ‘America/New_York’, 'UTC+3', or the strings 'local' or 'utc'
  * `opts ` (Object) - optional - Options that affect the output. Possible properties:
<code>keepCalendarTime</code> (boolean): Whether to keep the time the same and only change the offset. Defaults to false.
* **Examples:**

  ```javascript
  // dt = "2024-01-01T00:00:00.000+02:00".toDateTime()
  dt.setZone('America/Buenos_aires') //=> 2023-12-31T19:00:00.000-03:00
  ```

  ```javascript
  // dt = "2024-01-01T00:00:00.000+02:00".toDateTime()
  dt.setZone('UTC+7') //=> 2024-01-01T05:00:00.000+07:00
  ```

## toUTC()

* **Description:** Converts a DateTime to the UTC time zone. The DateTime still represents the same moment unless specified in the parameters. Use `setZone()` to convert to other zones.
* **Definition:** toUTC(offset, opts)
* **Returns:** DateTime
* **Source:** Luxon
* **Parameters:**
  * `offset ` (Number) - optional - An offset from UTC in minutes
  * `opts ` (Object) - optional - Object with options that affect the output. Possible properties:
<code>keepCalendarTime</code> (boolean): Whether to keep the time the same and only change the offset. Defaults to false.
* **Examples:**

  ```javascript
  // dt = "2024-01-01T00:00:00.000+02:00".toDateTime()
  dt.toUTC() //=> 2023-12-31T22:00:00.000Z
  ```

## diffTo()

* **Description:** Returns the difference between two DateTimes, in the given unit(s)
* **Definition:** diffTo(otherDateTime, unit)
* **Returns:** Number
* **Source:** n8n
* **Parameters:**
  * `otherDateTime ` (String|DateTime) - The moment to subtract the base DateTime from. Can be an ISO date string or a Luxon DateTime.
  * `unit ` (String|Array<String>) - optional - The unit, or array of units, to return the result in. Possible values: <code>years</code>, <code>months</code>, <code>weeks</code>, <code>days</code>, <code>hours</code>, <code>minutes</code>, <code>seconds</code>, <code>milliseconds</code>.
  * ` ` ()
* **Examples:**

  ```javascript
  // dt1 = "2024-03-30T18:49:07.234".toDateTime()
  dt1.diffTo('2025-01-01', 'days') //=> 276.21
  ```

  ```javascript
  // dt1 = "2024-03-30T18:49:07.234".toDateTime()
  // dt2 = "2025-01-01T00:00:00.000".toDateTime()
  dt1.diffTo(dt2, ['months', 'days']) //=> {'months':, 'days':}
  ```

  ```javascript
  Note: should support both day and days, etc.
  ```

