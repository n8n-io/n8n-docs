---
contentType: reference
---

# Expression reference

## Array

| Name | Description | Returns | Parameters | Source |
| --- | --- | --- | --- | --- |
| compact() | Removes any empty values from the array. `null`, `""` and `undefined` count as empty. | Array |  | n8n |
| removeDuplicates() | Removes any re-occurring elements from the array | Array | **keys** (String) _optional_ - For use on arrays of Objects. A key, or comma-separated list of keys to restrict the check to. If omitted, all keys are checked. | n8n |
| pluck() | Returns an array containing the values of the given field(s) in each Object of the array. Ignores any array elements that aren’t Objects or don’t have a key matching the field name(s) provided. | Array | **fieldName1** (String) _optional_ - The first key to retrieve the value of<br><br>**fieldName2** (String) _optional_ - The second key to retrieve the value of | n8n |
| sort() | sort(compareFunction(a, b)?) | Reorders the elements of the array. For sorting strings alphabetically, no parameter is required. For sorting numbers or Objects, see examples. | Array | **compareFunction** (function) _optional_ - A function to compare two array elements and return a number indicating which one comes first:<br /><b>Return < 0</b>: <code>a</code> comes before <code>b</code><br /><b>Return 0</b>: <code>a</code> and <code>b</code> are equal (leave order unchanged)<br /><b>Return > 0</b>: <code>b</code> comes before <code>a</code><br />If no function is specified, converts all values to strings and compares their character codes.<br><br>**a** (any) - The first element to compare in the function<br><br>**b** (any) - The second element to compare in the function | JS |
| first() | Returns the first element of the array | any |  | n8n |
| reverse() | Reverses the order of the elements in the array | Array |  | JS |
| min() | Returns the smallest number in the array. Throws an error if there are any non-numbers. | Number |  | n8n |
| max() | Returns the largest number in the array. Throws an error if there are any non-numbers. | Number |  | n8n |
| unique() | Removes any duplicate elements from the array | Array |  | n8n |
| union() | Concatenates two arrays and then removes any duplicates | Array | **otherArray** (Array) - The array to union with the base array | n8n |
| sum() | Returns the total of all the numbers in the array. Throws an error if there are any non-numbers. | Number |  | n8n |
| difference() | Compares two arrays. Returns all elements in the base array that aren't present in `otherArray`. | Array | **otherArray** (Array) - The array to compare to the base array | n8n |
| renameKeys() | Changes all matching keys (field names) of any Objects in the array. Rename more than one key by adding extra arguments, i.e. `from1, to1, from2, to2, ...`. | Array | **from** (String) - The key to rename<br><br>**to** (String) - The new key name | n8n |
| reduce() | Reduces an array to a single value by applying a function to each element. The function combines the current element with the result of reducing the previous elements, producing a new result. |  | **function()** (function) - A function to run for each array element. Takes the accumulated result and the current element, and returns a new accumulated result. Consider using <a href=”https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions”>arrow function notation</a> to save space.<br><br>**prevResult** (any) - The accumulated result from applying the function to previous elements. When processing the first element, it’s set to <code>initResult</code> (or the first array element if not specified).<br><br>**currentElem** (any) - The value in the array currently being processed<br><br>**currentIndex** (Number) _optional_ - The position of the current element in the array (starting at 0)<br><br>**array** (Array) _optional_ - The array being processed. Rarely needed.<br><br>**initResult** (any) _optional_ - The initial value of the prevResult, used when calling the function on the first array element. When not specified it’s set to the first array element, and the first function call is on the second array element instead of the first. | JS |
| map() | Creates a new array by applying a function to each element of the original array | Array | **function()** (function) - A function to run for each array element. In the new array, the output of this function takes the place of the element. Consider using <a href=”https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions”>arrow function notation</a> to save space.<br><br>**element** (any) - The value of the current element<br><br>**index** (Number) _optional_ - The position of the current element in the array (starting at 0)<br><br>**array** (Array) _optional_ - The array of the current element. Rarely needed.<br><br>**thisValue** (any) _optional_ - A value passed to the function as its <code>this</code> value. Rarely needed. Default: `undefined` | JS |
| length | The number of elements in the array | Number |  | JS |
| toJsonString() | Converts the array to a JSON string. The same as JavaScript’s `JSON.stringify()`. | String |  | n8n |
| toString() | Converts the array to a string, with values separated by commas. To use a different separator, use `join()` instead. | String |  | JS |
| find() | Returns the first element from the array that satisfies the provided condition. The condition is a function that returns `true` or `false`. Returns `undefined` if no matches are found.  If you need all matching elements, use `filter()`. | any | **function()** (function) - A function to run for each array element. As soon as it returns <code>true</code>, that element will be returned. Consider using <a href=”https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions”>arrow function notation</a> to save space.<br><br>**element** (any) - The value of the current element<br><br>**index** (Number) _optional_ - The position of the current element in the array (starting at 0)<br><br>**array** (Array) _optional_ - The array of the current element. Rarely needed.<br><br>**thisValue** (any) _optional_ - A value passed to the function as its <code>this</code> value. Rarely needed. Default: `undefined` | JS |
| isNotEmpty() | Returns `true` if the array has at least one element | Boolean |  | n8n |
| indexOf() | Returns the position of the first matching element in the array, or -1 if the element isn’t found. Positions start at 0. | Number | **element** (any) - The value to look for<br><br>**start** (Number) _optional_ - The index to start looking from Default: `0` | JS |
| isEmpty() | Returns `true` if the array has no elements or is `null` | Boolean |  | n8n |
| toSpliced() | Adds and/or removes array elements at a given position.   See also `slice()` and `append()`. | Array | **start** (Number) - The index (position) to add or remove elements at.  New elements are inserted before the element at this index. A negative index counts back from the end of the array. <br><br>**deleteCount** (Number) _optional_ - The number of elements to remove. If omitted, removes all elements from the <code>start</code> index onwards.<br><br>**elem1** (any) _optional_ - The first new element to be added<br><br>**elem2** (any) _optional_ - The second new element to be added<br><br>**elemN** (any) _optional_ - The Nth new element to be added | JS |
| last() | Returns the last element of the array | any |  | n8n |
| join() | Merges all elements of the array into a single string, with an optional separator between each element.  The opposite of `split()`. | String | **separator** (String) _optional_ - The character(s) to insert between each element Default: `comma (<code>,</code>)` | JS |
| intersection() | Compares two arrays. Returns all elements in the base array that are also present in the other array. | Array | **otherArray** (Array) - The array to compare to the base array | n8n |
| average() | Returns the average of the numbers in the array. Throws an error if there are any non-numbers. | Number |  | n8n |
| slice() | Returns a portion of the array, from the `start` index up to (but not including) the `end` index. Indexes start at 0. | Array | **start** (Number) _optional_ - The position to start from. Positions start at 0. Negative numbers count back from the end of the array. Default: `0`<br><br>**end** (Number) _optional_ - The position to select up to. The element at the end position is not included. Negative numbers select from the end of the array. If omitted, will extract to the end of the array. | JS |
| filter() | Returns an array with only the elements satisfying a condition. The condition is a function that returns `true` or `false`. | Array | **function()** (function) - A function to run for each array element. If it returns <code>true</code>, the element will be kept. Consider using <a href=”https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions”>arrow function notation</a> to save space.<br><br>**element** (any) - The value of the current element<br><br>**index** (Number) _optional_ - The position of the current element in the array (starting at 0)<br><br>**array** (Array) _optional_ - The array being processed. Rarely needed.<br><br>**thisValue** (any) _optional_ - A value passed to the function as its <code>this</code> value. Rarely needed. Default: `undefined` | JS |
| concat() | Joins one or more arrays onto the end of the base array | Array | **array2** (Array) - The first array to be joined on the end of the base array<br><br>**array3** (Array) _optional_ - The second array to be joined on to the end of the base array Default: `[]`<br><br>**arrayN** (Array) _optional_ - The Nth array to be joined on to the end of the base array Default: `[]` | JS |
| randomItem() | Returns a randomly-chosen element from the array | any |  | n8n |
| chunk() | Splits the array into an array of sub-arrays, each with the given length | Array | **length** (Number) - The number of elements in each chunk | n8n |
| includes() | Returns `true` if the array contains the specified element | Boolean | **element** (any) - The value to search the array for<br><br>**start** (Number) _optional_ - The index to start looking from Default: `0` | JS |
| append() | Adds new elements to the end of the array. Similar to `push()`, but returns the modified array. Consider using spread syntax instead (see examples). | Array | **elem1** (any) - The first element to append<br><br>**elem2** (any) _optional_ - The second element to append<br><br>**elemN** (any) _optional_ - The Nth element to append | n8n |
| smartJoin() | Creates a single Object from an array of Objects. Each Object in the array provides one field for the returned Object. Each Object in the array must contain a field with the key name and a field with the value. | Object | **keyField** (String) - The field in each Object containing the key name<br><br>**nameField** (String) - The field in each Object containing the value | n8n |

## BinaryFile

| Name | Description | Returns | Parameters | Source |
| --- | --- | --- | --- | --- |
| fileType | A string representing the type of the file, e.g. `image`. Corresponds to the first part of the MIME type. | String |  | n8n |
| mimeType | A string representing the format of the file’s contents, e.g. `image/jpeg` | String |  | n8n |
| fileName | The name of the file, including extension | String |  | n8n |
| fileSize | A string representing the size of the file | String |  | n8n |
| id | The unique ID of the file. Used to identify the file when it is stored on disk or in a storage service such as S3. | String |  | n8n |
| fileExtension | The suffix attached to the filename (e.g. `txt`) | String |  | n8n |
| directory | The path to the directory that the file is stored in. Useful for distinguishing between files with the same name in different directories. Not set if n8n is  configured to store files in its database.  | String |  | n8n |

## Boolean

| Name | Description | Returns | Parameters | Source |
| --- | --- | --- | --- | --- |
| toNumber() | Converts `true` to 1 and `false` to 0 | Number |  | n8n |
| isEmpty() | Returns `false` for all booleans. Returns `true` for `null`. | Boolean |  | n8n |
| toString() | Converts `true` to the string ‘true’ and `false` to the string ‘false’  | String |  | JS |

## CustomData

| Name | Description | Returns | Parameters | Source |
| --- | --- | --- | --- | --- |
| getAll() | Returns all the key-value pairs of custom data that have been set in the current execution. <a href="/workflows/executions/custom-executions-data/">More info</a> | Object |  | n8n |
| setAll() | Sets multiple key-value pairs of  custom data for the execution. Use this to easily filter executions by this data. <a href="/workflows/executions/custom-executions-data/">More info</a> |  | **obj** (Object) - A JavaScript object containing key-value pairs of the data to set | n8n |
| set() | Stores custom execution data under the key specified. Use this to easily filter executions by this data. <a href="/workflows/executions/custom-executions-data/">More info</a> |  | **key** (String) - The key (identifier) under which the data is stored<br><br>**value** (String) - The data to store | n8n |
| get() | Returns the custom execution data stored under the given key. <a href="/workflows/executions/custom-executions-data/">More info</a> | String | **key** (String) - The key (identifier) under which the data is stored | n8n |

## Date

| Name | Description | Returns | Parameters | Source |
| --- | --- | --- | --- | --- |
| toDateTime() | Converts a JavaScript Date to a Luxon DateTime. The DateTime contains the same information, but is easier to manipulate. | DateTime |  | n8n |

## DateTime

| Name | Description | Returns | Parameters | Source |
| --- | --- | --- | --- | --- |
| isBetween() | Returns `true` if the DateTime lies between the two moments specified | Boolean | **date1** (String|DateTime) - The moment that the base DateTime must be after. Can be an ISO date string or a Luxon DateTime.<br><br>**date2** (String|DateTime) - The moment that the base DateTime must be before. Can be an ISO date string or a Luxon DateTime. | n8n |
| weekdayShort | The textual abbreviated weekday name, e.g. 'Wed'. Defaults to the system's locale if no locale has been specified. | String |  | Luxon |
| format() | Converts the DateTime to a string, using the format specified. <a href="https://moment.github.io/luxon/#/formatting?id=table-of-tokens">Formatting guide</a>. For common formats, `toLocaleString()` may be easier. | String | **fmt** (String) - The <a href="https://moment.github.io/luxon/#/formatting?id=table-of-tokens">format</a> of the string to return  | n8n |
| toISO() | Returns an ISO 8601-compliant string representation of the DateTime | String | **opts ** (Object) _optional_ - Configuration options. See <a href=”https://moment.github.io/luxon/api-docs/index.html#datetimetoiso”>Luxon docs</a> for more info. Default: `{}` | Luxon |
| plus() | Adds a given period of time to the DateTime | DateTime | **n** (Number|Object) - The number of units to add. Or use a Luxon <a href=”https://moment.github.io/luxon/api-docs/index.html#duration”>Duration</a> object to add multiple units at once.<br><br>**unit** (String) _optional_ - The units of the number. One of: <code>years</code>, <code>months</code>, <code>weeks</code>, <code>days</code>, <code>hours</code>, <code>minutes</code>, <code>seconds</code>, <code>milliseconds</code> Default: `milliseconds` | n8n |
| isInDST | Whether the DateTime is in daylight saving time | Boolean |  | Luxon |
| zone | The time zone associated with the DateTime | Object |  | Luxon |
| toMillis() | Returns a Unix timestamp in milliseconds (the number elapsed since 1st Jan 1970) | Number |  | Luxon |
| weekNumber | The week number of the year (1-52ish) | Number |  | Luxon |
| month | The month (1-12) | Number |  | Luxon |
| toSeconds() | Returns a Unix timestamp in seconds (the number elapsed since 1st Jan 1970) | Number |  | Luxon |
| toString() | Returns a string representation of the DateTime. Similar to `toISO()`. For more formatting options, see `format()` or `toLocaleString()`. | string |  | Luxon |
| toLocaleString() | Returns a localised string representing the DateTime, i.e. in the language and format corresponding to its locale. Defaults to the system's locale if none specified. | String | **formatOpts ** (Object) _optional_ - Configuration options for the rendering. See <a href=”https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#parameters”>Intl.DateTimeFormat</a> for a full list. Defaults to rendering a short date.<br><br>** ** () | Luxon |
| millisecond | The millisecond of the second (0-999) | Number |  | Luxon |
| weekdayLong | The textual long weekday name, e.g. 'Wednesday'. Defaults to the system's locale if no locale has been specified. | String |  | Luxon |
| monthLong | The textual long month name, e.g. 'October'. Defaults to the system's locale if no locale has been specified. | String |  | Luxon |
| second | The second of the minute (0-59) | Number |  | Luxon |
| year | The year | Number |  | Luxon |
| diffToNow() | Returns the difference between the current moment and the DateTime, in the given unit(s). For a textual representation, use `toRelative()` instead. | Number | **unit ** (String|Array<String>) _optional_ - The unit, or array of units, to return the result in. Possible values: <code>years</code>, <code>months</code>, <code>weeks</code>, <code>days</code>, <code>hours</code>, <code>minutes</code>, <code>seconds</code>, <code>milliseconds</code>. Default: `days`<br><br>** ** ()<br><br>** ** () | n8n |
| set() | Assigns new values to specified units of the DateTime. To round a DateTime, see also `startOf()` and `endOf()`. | DateTime | **values ** (Object) - An object containing the units to set and corresponding values to assign. Possible keys are <code>year</code>, <code>month</code>, <code>day</code>, <code>hour</code>, <code>minute</code>, <code>second</code> and <code>millsecond</code>. | Luxon |
| hour | The hour of the day (0-23) | Number |  | Luxon |
| equals() | Returns `true` if the two DateTimes represent exactly the same moment and are in the same time zone. For a less strict comparison, use `hasSame()`. | Boolean | **other ** (DateTime) - The other DateTime to compare | Luxon |
| monthShort | The textual abbreviated month name, e.g. 'Oct'. Defaults to the system's locale if no locale has been specified. | String |  | Luxon |
| setLocale() | Sets the locale, which determines the language and formatting for the DateTime. Useful when generating a textual representation of the DateTime, e.g. with `format()` or `toLocaleString()`. | DateTime | **locale ** (String) - The locale to assign, e.g. ‘en-GB’ for British English or ‘pt-BR’ for Brazilian Portuguese. <a href=”https://www.localeplanet.com/icu/”>List</a> (unofficial) | Luxon |
| endOf() | Rounds the DateTime up to the end of one of its units, e.g. the end of the month | DateTime | **unit ** (String) - The unit to round to the end of. Can be <code>year</code>, <code>quarter</code>, <code>month</code>, <code>week</code>, <code>day</code>, <code>hour</code>, <code>minute</code>, <code>second</code>, or <code>millisecond</code>.<br><br>**opts ** (Object) _optional_ - Object with options that affect the output. Possible properties:
<code>useLocaleWeeks</code> (boolean): Whether to use the locale when calculating the start of the week. Defaults to false. Default: `{}` | Luxon |
| locale | The locale of a DateTime, such 'en-GB'. The locale is used when formatting the DateTime. | String |  | Luxon |
| quarter | The quarter of the year (1-4) | Number |  | Luxon |
| startOf() | Rounds the DateTime down to the beginning of one of its units, e.g. the start of the month | DateTime | **unit ** (String) - The unit to round to the beginning of. One of <code>year</code>, <code>quarter</code>, <code>month</code>, <code>week</code>, <code>day</code>, <code>hour</code>, <code>minute</code>, <code>second</code>, or <code>millisecond</code>.<br><br>**opts ** (Object) _optional_ - Object with options that affect the output. Possible properties:
<code>useLocaleWeeks</code> (boolean): Whether to use the locale when calculating the start of the week. Defaults to false. Default: `{}` | Luxon |
| hasSame() | Returns `true` if the two DateTimes are the same, down to the unit specified. Time zones are ignored (only local times are compared), so use `toUTC()` first if needed. | Boolean | **otherDateTime ** (DateTime) - The other DateTime to compare<br><br>**unit ** (String) - The unit of time to check sameness down to. One of <code>year</code>, <code>quarter</code>, <code>month</code>, <code>week</code>, <code>day</code>, <code>hour</code>, <code>minute</code>, <code>second</code>, or <code>millisecond</code>.<br><br>** ** () | Luxon |
| day | The day of the month (1-31) | Number |  | Luxon |
| minute | The minute of the hour (0-59) | Number |  | Luxon |
| toLocal() | Converts a DateTime to the workflow’s local time zone. The DateTime still represents the same moment unless specified in the parameters. The workflow’s time zone can be set in the workflow settings. | DateTime |  | Luxon |
| toRelative() | Returns a textual representation of the time relative to now, e.g. ‘in two days’. Rounds down by default. | String | **options ** (Object) _optional_ - Options that affect the output. Possible properties:
<code>unit</code> = the unit to default to (<code>years</code>, <code>months</code>, <code>days</code>, etc.).
<code>locale</code> = the language and formatting to use (e.g. <code>de</code>, <code>fr</code>) Default: `{}` | Luxon |
| extract() | Extracts a part of the date or time, e.g. the month, as a number. To extract textual names instead, see `format()`. | Number | **unit** (String) _optional_ - The part of the date or time to return. One of: <code>year</code>, <code>month</code>, <code>week</code>, <code>day</code>, <code>hour</code>, <code>minute</code>, <code>second</code> Default: `week` | n8n |
| minus() | Subtracts a given period of time from the DateTime | DateTime | **n** (Number|Object) - The number of units to subtract. Or use a Luxon <a href=”https://moment.github.io/luxon/api-docs/index.html#duration”>Duration</a> object to subtract multiple units at once.<br><br>**unit** (String) _optional_ - The units of the number. One of: <code>years</code>, <code>months</code>, <code>weeks</code>, <code>days</code>, <code>hours</code>, <code>minutes</code>, <code>seconds</code>, <code>milliseconds</code> Default: `milliseconds` | n8n |
| weekday | The day of the week. 1 is Monday and 7 is Sunday. | Number |  | Luxon |
| setZone() | Converts the DateTime to the given time zone. The DateTime still represents the same moment unless specified in the options. See also `toLocal()` and `toUTC()`. | DateTime | **zone ** (String) _optional_ - A zone identifier, either in the format ‘America/New_York’, 'UTC+3', or the strings 'local' or 'utc' Default: `local`<br><br>**opts ** (Object) _optional_ - Options that affect the output. Possible properties:
<code>keepCalendarTime</code> (boolean): Whether to keep the time the same and only change the offset. Defaults to false. Default: `{}` | Luxon |
| toUTC() | Converts a DateTime to the UTC time zone. The DateTime still represents the same moment unless specified in the parameters. Use `setZone()` to convert to other zones. | DateTime | **offset ** (Number) _optional_ - An offset from UTC in minutes Default: `0`<br><br>**opts ** (Object) _optional_ - Object with options that affect the output. Possible properties:
<code>keepCalendarTime</code> (boolean): Whether to keep the time the same and only change the offset. Defaults to false. Default: `{}` | Luxon |
| diffTo() | Returns the difference between two DateTimes, in the given unit(s) | Number | **otherDateTime ** (String|DateTime) - The moment to subtract the base DateTime from. Can be an ISO date string or a Luxon DateTime.<br><br>**unit ** (String|Array<String>) _optional_ - The unit, or array of units, to return the result in. Possible values: <code>years</code>, <code>months</code>, <code>weeks</code>, <code>days</code>, <code>hours</code>, <code>minutes</code>, <code>seconds</code>, <code>milliseconds</code>. Default: `days`<br><br>** ** () | n8n |

## ExecData

| Name | Description | Returns | Parameters | Source |
| --- | --- | --- | --- | --- |
| resumeUrl | The webhook URL to call to resume a workflow waiting at a <a href="/integrations/builtin/core-nodes/n8n-nodes-base.wait/">’Wait’ node</a>. | String |  | n8n |
| customData | Set and get custom execution data (e.g. to filter executions by). You can also do this with the ‘Execution Data’ node. <a href="/workflows/executions/custom-executions-data/">More info</a> | CustomData |  | n8n |
| resumeFormUrl | The URL to access a form generated by the <a href="/integrations/builtin/core-nodes/n8n-nodes-base.wait/">’Wait’ node</a>. | String |  | n8n |
| mode | Can be one of 3 values: either `test` (meaning the execution was triggered by clicking a button in n8n) or `production` (meaning the execution was triggered automatically). When running workflow tests, `evaluation` is used. | String |  | n8n |
| id | The ID of the current workflow execution | String |  | n8n |

## HTTPResponse

| Name | Description | Returns | Parameters | Source |
| --- | --- | --- | --- | --- |
| body | The body of the response object from the last HTTP call. Only available in the ‘HTTP Request’ node | Object |  | n8n |
| statusCode | The HTTP status code returned by the last HTTP call. Only available in the ‘HTTP Request’ node. | Number |  | n8n |
| headers | The headers returned by the last HTTP call. Only available in the ‘HTTP Request’ node. | Object |  | n8n |
| statusMessage | An optional message regarding the request status. Only available in the ‘HTTP Request’ node. | String |  | n8n |

## Item

| Name | Description | Returns | Parameters | Source |
| --- | --- | --- | --- | --- |
| binary | Returns any binary data the item contains | Array<BinaryFile> |  | n8n |
| json | Returns the JSON data the item contains. <a href="/data/data-structure/">More info</a> | Object |  | n8n |

## NodeInputData

| Name | Description | Returns | Parameters | Source |
| --- | --- | --- | --- | --- |
| item | Returns the input item currently being processed | Item |  | n8n |
| all() | Returns an array of the current node’s input items | Array<Item> | **branchIndex** (Number) _optional_ - The output branch index of the node to use. Defaults to the first branch (index 0) Default: `0`<br><br>**runIndex** (Number) _optional_ - The run of the node to use. Defaults to the first run (index 0) Default: `0` | n8n |
| params | The configuration settings of the current node. These are the parameters you fill out within the node when configuring it (e.g. its operation). | NodeParams |  | n8n |
| first() | Returns the current node’s first input item | Item | **branchIndex** (Number) _optional_ - The output branch index of the node to use. Defaults to the first branch (index 0) Default: `0`<br><br>**runIndex** (Number) _optional_ - The run of the node to use. Defaults to the first run (index 0) Default: `0` | n8n |
| last() | Returns the current node’s last input item | Item | **branchIndex** (Number) _optional_ - The output branch index of the node to use. Defaults to the first branch (index 0) Default: `0`<br><br>**runIndex** (Number) _optional_ - The run of the node to use. Defaults to the first run (index 0) Default: `0` | n8n |

## NodeOutputData

| Name | Description | Returns | Parameters | Source |
| --- | --- | --- | --- | --- |
| first() | Returns the first item output by the node | Item | **branchIndex** (Number) _optional_ - The output branch of the node to use. Defaults to the first branch (index 0) Default: `0`<br><br>**runIndex** (Number) _optional_ - The run of the node to use. Defaults to the first run (index 0) Default: `0` | n8n |
| last() | Returns the last item output by the node | Item | **branchIndex** (Number) _optional_ - The output branch of the node to use. Defaults to the first branch (index 0) Default: `0`<br><br>**runIndex** (Number) _optional_ - The run of the node to use. Defaults to the first run (index 0) Default: `0` | n8n |
| itemMatching() | Returns the matching item, i.e. the one used to produce the item in the current node at the specified index. <a href="/data/data-mapping/data-item-linking/">More info</a> | Item | **currentItemIndex** (Number) - The index of the item in the current node to be matched with. | n8n |
| item | Returns the matching item, i.e. the one used to produce the current item in the current node. <a href="/data/data-mapping/data-item-linking/">More info</a> | Item |  | n8n |
| all() | Returns an array of the node’s output items | Array<Item> | **branchIndex** (Number) _optional_ - The output branch of the node to use. Defaults to the first branch (index 0) Default: `0`<br><br>**runIndex** (Number) _optional_ - The run of the node to use. Defaults to the first run (index 0) Default: `0` | n8n |
| isExecuted | Is `true` if the node has executed, `false` otherwise | Boolean |  | n8n |
| params | The configuration settings of the given node. These are the parameters you fill out within the node’s UI (e.g. its operation). | NodeParams |  | n8n |

## Number

| Name | Description | Returns | Parameters | Source |
| --- | --- | --- | --- | --- |
| isEmpty() | Returns `false` for all numbers. Returns `true` for `null`. | Boolean |  | n8n |
| round() | Returns the number rounded to the nearest whole number (or specified number of decimal places) | Number | **decimalPlaces** (Number) _optional_ - The number of decimal places to round to Default: `0` | n8n |
| floor() | Rounds the number down to the nearest whole number | Number |  | n8n |
| toBoolean() | Converts the number to a boolean value. `0` becomes `false`; everything else becomes `true`. |  |  | n8n |
| isOdd() | Returns `true` if the number is odd. Throws an error if the number isn’t a whole number. | Boolean |  | n8n |
| format() | Returns a formatted string representing the number. Useful for formatting for a specific language or currency. The same as <a href=”https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat”>`Intl.NumberFormat()`</a>. | String | **locale** (String) _optional_ - A <a href=”https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locales_argument”>locale tag</a> for formatting the number, e.g. <code>fr-FR</code>, <code>en-GB</code>, <code>pr-BR</code> Default: `en-US`<br><br>**options** (Object) _optional_ - Configuration options for number formatting. <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat" target="_blank">More info</a> Default: `{}` | n8n |
| toLocaleString() | Returns a localised string representing the number, i.e. in the language and format corresponding to its locale. Defaults to the system's locale if none specified. | String | **locales** (String|Array<String>) _optional_ - The locale to assign, e.g. ‘en-GB’ for British English or ‘pt-BR’ for Brazilian Portuguese. See <a href=”https://www.localeplanet.com/icu/”>full list</a> (unofficial). Also accepts an array of locales. Defaults to the system locale if not specified.<br><br>**options** (Object) _optional_ - An object with <a href=”https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#parameters”>formatting options</a> Default: `{}` | JS |
| isEven() | Returns `true` if the number is even. Throws an error if the number isn’t a whole number. | Boolean |  | n8n |
| abs() | Returns the number’s absolute value, i.e. removes any minus sign | Number |  | n8n |
| toString() | Converts the number to a simple textual representation. For more formatting options, see `toLocaleString()`. | String | **radix** (Number) _optional_ - The base to use. Must be an integer between 2 and 36. E.g. base <code>2</code> is binary and base <code>16</code> is hexadecimal. Default: `10` | JS |
| isInteger() | Returns `true` if the number is a whole number | Boolean |  | n8n |
| ceil() | Rounds the number up to the next whole number | Number |  | n8n |
| toDateTime() | Converts a numerical timestamp into a DateTime. The format of the timestamp must be specified if it’s not in milliseconds. Uses the time zone in n8n (or in the workflow’s settings). | DateTime | **format** (String) _optional_ - The type of timestamp to convert. Options are <code>ms</code> (for Unix timestamp in milliseconds), <code>s</code> (for Unix timestamp in seconds) or <code>excel</code> (for days since 1900). Default: `ms` | n8n |

## Object

| Name | Description | Returns | Parameters | Source |
| --- | --- | --- | --- | --- |
| removeField() | Removes a field from the Object. The same as JavaScript’s `delete`. | Object | **key** (String) - The name of the field to remove | n8n |
| values() | Returns an array with all the values of the fields the Object contains. The same as JavaScript’s `Object.values(obj)`. | Array<String> |  | n8n |
| urlEncode() | Generates a URL parameter string from the Object’s keys and values. Only top-level keys are supported. | String |  | n8n |
| keys() | Returns an array with all the field names (keys) the object contains. The same as JavaScript’s `Object.keys(obj)`. | Array<String> |  | n8n |
| isEmpty() | Returns `true` if the Object has no keys (fields) set or is `null` | Boolean |  | n8n |
| keepFieldsContaining() | Removes any fields whose values don’t at least partly match the given `value`. Comparison is case-sensitive. Fields that aren’t strings will always be removed. | Object | **value** (String) - The text that a value must contain in order to be kept | n8n |
| removeFieldsContaining() | Removes keys (fields) whose values at least partly match the given `value`. Comparison is case-sensitive. Fields that aren’t strings are always kept. | Object | **value** (String) - The text that a value must contain in order to be removed | n8n |
| isNotEmpty() | Returns `true` if the Object has at least one key (field) set | Boolean |  | n8n |
| compact() | Removes all fields that have empty values, i.e. are `null` or `""` | Object |  | n8n |
| merge() | Merges the two Objects into a single one. If a key (field name) exists in both Objects, the value from the first (base) Object is used. | Object | **otherObject** (Object) - The Object to merge with the base Object. | n8n |
| toJsonString() | Converts the Object to a JSON string. Similar to JavaScript’s `JSON.stringify()`. | String |  | n8n |
| hasField() | Returns `true` if there is a field called `name`. Only checks top-level keys. Comparison is case-sensitive. | Boolean | **name** (String) - The name of the key to search for | n8n |

## PrevNodeData

| Name | Description | Returns | Parameters | Source |
| --- | --- | --- | --- | --- |
| outputIndex | The index of the output connector that the current input came from. Use this when the previous node had multiple outputs (such as an ‘If’ or ‘Switch’ node).   Always uses the current node’s first input connector if there is more than one (e.g. in the ‘Merge’ node).  | Number |  | n8n |
| name | The name of the node that the current input came from.   Always uses the current node’s first input connector if there is more than one (e.g. in the ‘Merge’ node). | String |  | n8n |
| runIndex | The run of the previous node that generated the current input.   Always uses the current node’s first input connector if there is more than one (e.g. in the ‘Merge’ node).  | Number |  | n8n |

## Root

| Name | Description | Returns | Parameters | Source |
| --- | --- | --- | --- | --- |
| $runIndex | The index of the current run of the current node execution. Starts at 0. | Number |  | n8n |
| $binary | Returns any binary input data to the current node, for the current item. Shorthand for `$input.item.binary`. | Array<BinaryFile> |  | n8n |
| $workflow | Information about the current workflow | WorkflowData |  | n8n |
| $fromAI() | Use when a large language model should provide the value of a node parameter. Consider providing a description for better results. | any | **key** (String) - The name of the field to fetch. May only contain letters, numbers, underscores and hyphens.<br><br>**description** (String) _optional_ - Use to give the model more context on exactly what it should return<br><br>**type** (String) _optional_ - The type of the value to return. One of <code>string</code>, <code>number</code>,  <code>boolean</code>, <code>json</code>, <code>date</code>, <code>datetime</code>. Defaults to <code>string</code>. Default: `string`<br><br>**defaultValue** (any) _optional_ - A value to use if the model doesn’t return the key | n8n |
| $secrets | The secrets from an <a href="/external-secrets/">external secrets vault</a>, if configured. Secret values are never displayed to the user. Only available in credential fields. | Object |  | n8n |
| $itemIndex | The position of the item currently being processed in the list of input items | Number |  | n8n |
| $() | Returns the data of the specified node | NodeData | **nodeName** (String) - The name of the node to retrieve  data for | n8n |
| $vars | The <a href="/code/variables/">variables</a> available to the workflow | Object |  | n8n |
| $pageCount | The number of results pages the node has fetched. Only available in the ‘HTTP Request’ node. | Number |  | n8n |
| $response | The response returned by the last HTTP call. Only available in the ‘HTTP Request’ node. | HTTPResponse |  | n8n |
| $parameter | The configuration settings of the current node. These are the parameters you fill out within the node’s UI (e.g. its operation). | NodeParams |  | n8n |
| $input | The input data of the current node | NodeData |  | n8n |
| $if() | Returns one of two values depending on the `condition`. Similar to the `?` operator in JavaScript. | any | **condition** (Boolean) - The check to make. Should evaluate to either <code>true</code> or <code>false</code><br><br>**valueIfTrue** (any) - The value to return if the condition is true<br><br>**valueIfFalse** (any) - The value to return if the condition is false | n8n |
| $execution | Retrieve or set metadata for the current execution | ExecData |  | n8n |
| $now | A DateTime representing the current moment.   Uses the workflow’s time zone (which can be changed in the workflow settings). | DateTime |  | n8n |
| $jmespath() | Extracts data from an object (or array of objects) using a <a href=”/code/cookbook/jmespath/”>JMESPath</a> expression. Useful for querying complex, nested objects. Returns `undefined` if the expression is invalid. | any | **obj** (Object|Array) - The Object or array of Objects to retrieve data from<br><br>**expression** (String) - A <a href=”https://jmespath.org/examples.html”>JMESPath expression</a> defining the data to retrieve from the object | n8n |
| $ifEmpty() | Returns the first parameter if it isn’t empty, otherwise returns the second parameter. The following count as empty: `””`, `[]`, `{}`, `null`, `undefined` | any | **value** (any) - The value to return, provided it isn’t empty<br><br>**valueIfEmpty** (any) - What to return if <code>value</code> is empty | n8n |
| $prevNode | Information about the node that the current input came from.   When in a ‘Merge’ node, always uses the first input connector. | PrevNodeData |  | n8n |
| $nodeVersion | The version of the current node (as displayed at the bottom of the nodes’s settings pane) | String |  | n8n |
| $max() | Returns the highest of the given numbers | Number | **num1** (Number) - The first number to compare<br><br>**num2** (Number) - The second number to compare | n8n |
| $min() | Returns the lowest of the given numbers | Number | **num1** (Number) - The first number to compare<br><br>**num2** (Number) - The second number to compare | n8n |
| $request | The request object sent during the last run of the node. Only available in the ‘HTTP Request’ node. | Object |  | n8n |
| $json | Returns the JSON input data to the current node, for the current item. Shorthand for `$input.item.json`. <a href="/data/data-structure/">More info</a> | Object |  | n8n |
| $today | A DateTime representing midnight at the start of the current day.   Uses the instance’s time zone (unless overridden in the workflow’s settings). | DateTime |  | n8n |

## String

| Name | Description | Returns | Parameters | Source |
| --- | --- | --- | --- | --- |
| match() | Matches the string against a <a href=”https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions”>regular expression</a>. Returns an array containing the first match, or all matches if the `g` flag is set in the regular expression. Returns `null` if no matches are found.   For checking whether text is present, consider `includes()` instead. | Array | **regexp** (RegExp) - A <a href=”https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions”>regular expression</a> with the pattern to look for. Will look for multiple matches if the <code>g</code> flag is present (see examples). | JS |
| extractEmail() | Extracts the first email found in the string. Returns `undefined` if none is found. | String |  | n8n |
| extractDomain() | If the string is an email address or URL, returns its domain (or `undefined` if nothing found).   If the string also contains other content, try using `extractEmail()` or `extractUrl()` first. | String |  | n8n |
| indexOf() | Returns the index (position) of the first occurrence of `searchString` within the base string, or -1 if not found. Case-sensitive. | Number | **searchString** (String) - The text to search for<br><br>**start** (Number) _optional_ - The position (index) to start searching from Default: `0` | JS |
| isDomain() | Returns `true` if the string is a domain | Boolean |  | n8n |
| toBoolean() | Converts the string to a boolean value. `0`, `false` and `no` resolve to `false`, everything else to `true`. Case-insensitive. | Boolean |  | n8n |
| toLowerCase() | Converts all letters in the string to lower case | String |  | JS |
| toJsonString() | Prepares the string to be inserted into a JSON object. Escapes any quotes and special characters (e.g. new lines), and wraps the string in quotes.  The same as JavaScript’s `JSON.stringify()`. | String |  | n8n |
| toSentenceCase() | Changes the capitalization of the string to sentence case. The first letter of each sentence is capitalized and all others are lowercased. | String |  | n8n |
| toSnakeCase() | Changes the format of the string to snake case. Spaces and dashes are replaced by `_`, symbols are removed and all letters are lowercased. | String |  | n8n |
| removeTags() | Removes tags, such as HTML or XML, from the string | String |  | n8n |
| isNumeric() | Returns `true` if the string represents a number | Boolean |  | n8n |
| removeMarkdown() | Removes any Markdown formatting from the string. Also removes HTML tags. | String |  | n8n |
| search() | Returns the index (position) of the first occurrence of a pattern within the string, or -1 if not found. The pattern is specified using a <a href=”https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions”>regular expression</a>. To use text instead, see `indexOf()`. | Number | **regexp** (RegExp) - A <a href=”https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions”>regular expression</a> with the pattern to look for | JS |
| extractUrl() | Extracts the first URL found in the string. Returns `undefined` if none is found. Only recognizes full URLs, e.g. those starting with `http`. | String |  | n8n |
| base64Encode() | Converts a base64-encoded string to plain text | String |  | n8n |
| includes() | Returns `true` if the string contains the `searchString`. Case-sensitive. | Boolean | **searchString** (String) - The text to search for<br><br>**start** (Number) _optional_ - The position (index) to start searching from Default: `0` | JS |
| quote() | Wraps a string in quotation marks, and escapes any quotation marks already in the string. Useful when constructing JSON, SQL, etc. | String | **mark** (String) _optional_ - The type of quotation mark to use Default: `"` | n8n |
| toUpperCase() | Converts all letters in the string to upper case (capitals) |  |  | JS |
| toDateTime() | Converts the string to a DateTime. Useful for further transformation. Supported formats for the string are ISO 8601, HTTP, RFC2822, SQL and Unix timestamp in milliseconds.   To parse other formats, use <a href=”https://moment.github.io/luxon/api-docs/index.html#datetimefromformat”> `DateTime.fromFormat()`</a>. | DateTime |  | n8n |
| isUrl() | Returns `true` if the string is a valid URL | Boolean |  | n8n |
| toTitleCase() | Changes the capitalization of the string to title case. The first letter of each word is capitalized and the others left unchanged. Short prepositions and conjunctions aren’t capitalized (e.g. ‘a’, ‘the’). | String |  | n8n |
| replace() | Returns a string with the first occurrence of `pattern` replaced by `replacement`.   To replace all occurrences, use `replaceAll()` instead. | String | **pattern** (String|RegExp) - The pattern in the string to replace. Can be a string to match or a <a href=”https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions”>regular expression</a>.<br><br>**replacement** (String) - The new text to replace with | JS |
| trim() | Removes whitespace from both ends of the string. Whitespace includes new lines, tabs, spaces, etc. | String |  | JS |
| extractUrlPath() | Returns the part of a URL after the domain, or `undefined` if no URL found.   If the string also contains other content, try using `extractUrl()` first. | String |  | n8n |
| isNotEmpty() | Returns `true` if the string has at least one character | Boolean |  | n8n |
| startsWith() | Returns `true` if the string starts with `searchString`. Case-sensitive. | Boolean | **searchString** (String) - The text to check against the start of the base string<br><br>**start** (Number) _optional_ - The position (index) to start searching from Default: `0` | JS |
| replaceAll() | Returns a string with all occurrences of `pattern` replaced by `replacement` | String | **pattern** (String|RegExp) - The pattern in the string to replace. Can be a string to match or a <a href=”https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions”>regular expression</a>.<br><br>**replacement** (String|function) - The new text to replace with. Can be a string or a function that returns a string (see examples). | JS |
| length | The number of characters in the string | Number |  | JS |
| urlDecode() | Decodes a URL-encoded string. Replaces any character codes in the form of `%XX` with their corresponding characters. | String | **allChars** (Boolean) _optional_ - Whether to decode characters that are part of the URI syntax (e.g. <code>=</code>, <code>?</code>) Default: `false` | n8n |
| replaceSpecialChars() | Replaces special characters in the string with the closest ASCII character | String |  | n8n |
| parseJson() | Returns the JavaScript Object or value represented by the string, or `undefined` if the string isn’t valid JSON. Single-quoted JSON is not supported. | any |  | n8n |
| substring() | Extracts a fragment of the string at the given position. For more advanced extraction, see `match()`. | String | **start** (Number) - The position to start from. Positions start at 0.<br><br>**end** (String) _optional_ - The position to select up to. The character at the end position is not included. If omitted, will extract to the end of the string. | JS |
| urlEncode() | Encodes the string so that it can be used in a URL. Spaces and special characters are replaced with codes of the form `%XX`. | String | **allChars** (Boolean) _optional_ - Whether to encode characters that are part of the URI syntax (e.g. <code>=</code>, <code>?</code>) Default: `false` | n8n |
| base64Decode() | Converts a base64-encoded string to plain text | String |  | n8n |
| isEmpty() | Returns `true` if the string has no characters or is `null` | Boolean |  | n8n |
| concat() | Joins one or more strings onto the end of the base string. Alternatively, use the `+` operator (see examples). | String | **string1** (String) - The first string to append<br><br>**string2** (String) _optional_ - The second string to append<br><br>**stringN** (String) _optional_ - The Nth string to append | JS |
| toNumber() | Converts a string representing a number to a number. Throws an error if the string doesn’t start with a valid number. | Number |  | n8n |
| split() | Splits the string into an array of substrings. Each split is made at the `separator`, and the separator isn’t included in the output.   The opposite of using `join()` on an array. | Array | **separator** (String) _optional_ - The string (or regular expression) to use for splitting. If omitted, an array with the original string is returned.<br><br>**limit** (Number) _optional_ - The max number of array elements to return. Returns all elements if omitted. | JS |
| isEmail() | Returns `true` if the string is an email | Boolean |  | n8n |
| slice() | Extracts a fragment of the string at the given position. For more advanced extraction, see `match()`. | String | **start** (Number) - The position to start from. Positions start at 0. Negative numbers count back from the end of the string.<br><br>**end** (String) _optional_ - The position to select up to. The character at the end position is not included. Negative numbers select from the end of the string. If omitted, will extract to the end of the string. | JS |
| hash() | Returns the string hashed with the given algorithm. Defaults to md5 if not specified. | String | **algo** (String) _optional_ - The hashing algorithm to use. One of <code>md5</code>, <code>base64</code>, <code>sha1</code>, <code>sha224</code>, <code>sha256</code>, <code>sha384</code>, <code>sha512</code>, <code>sha3</code>, <code>ripemd160</code>
         Default: `md5` | n8n |

## WorkflowData

| Name | Description | Returns | Parameters | Source |
| --- | --- | --- | --- | --- |
| active | Whether the workflow is active | Boolean |  | n8n |
| name | The name of the workflow, as shown at the top of the editor | String |  | n8n |
| id | The workflow ID. Can also be found in the workflow’s URL. | String |  | n8n |
