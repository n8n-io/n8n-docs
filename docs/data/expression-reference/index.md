# Expression Reference

These are some commonly used expressions. A more exhaustive list appears below.

| Category | Expression | Description |
|---|---|---|
| Access current input item data | `$json` | JSON data of the current item | 
| | `$json.fieldName` | Field of the current item |
| | `$binary` | Binary data of current item |
| Access previous node data | `$("NodeName").first()` | First item in a node |
| | `$("NodeName").item` | Linked item of a node. See [Item linking](/data/data-mapping/data-item-linking/index.md) for more information. |
| | `$("NodeName").all()` | All items of a node |
| | `$("NodeName").last()` | Last item of a node |
| Date/Time | `$now` | Current date and time | 
| | `$today` | Today's date | 
| | `$now.toFormat("yyyy-MM-dd")` | Format current date as a string |
| Conditionals | `$if(condition, "true", "false")` | Helper function that returns a value when a condition is true or false |
| | `condition ? true : false` | Ternary operator: returns one value if a condition is true, another if false |
| | `$ifEmpty(value, defaultValue)` | Helper function takes two parameters and tests the first to check if it's empty, then returns either the parameter (if not empty) or the second parameter (if the first is empty). The first parameter is empty if it's `undefined`, `null`, an empty string `''`, an array where `value.length` returns `false` , or an object where `Object.keys(value).length` returns `false`|
| String Methods | `text.toUpperCase()` | Convert to uppercase |
| | `text.toLowerCase()` | Convert to lowercase |
| | `text.includes("foo")` | Check if text contains search term |
| | `text.extractEmail()` | Extract email from text |
| Array Methods | `array.length` | Get array length |
| | `array.join(", ")` | Join array elements using a comma a separator |
| | `array.filter(x => x <= 20)` | Filter items of array based on the filtering condition |
| | `array.map(x => x.id)` | Transform items of an array |

Browse the tables below to find methods by the data type on which they act. Click a method name to read detailed documentation for it.

## Array

* [_`Array`_.**`append(elem1, elem2?, ..., elemN?)`**](array.md#arrayappend)

    Adds new elements to the end of the array. Similar to <code>push()</code>, but returns the modified array. Consider using spread syntax instead (see examples).

* [_`Array`_.**`average()`**](array.md#arrayaverage)

    Returns the average of the numbers in the array. Throws an error if there are any non-numbers.

* [_`Array`_.**`chunk(length)`**](array.md#arraychunk)

    Splits the array into an array of sub-arrays, each with the given length

* [_`Array`_.**`compact()`**](array.md#arraycompact)

    Removes any empty values from the array. <code>null</code>, <code>""</code> and <code>undefined</code> count as empty.

* [_`Array`_.**`concat(array2, array3?, ... arrayN?)`**](array.md#arrayconcat)

    Joins one or more arrays onto the end of the base array

* [_`Array`_.**`difference(otherArray)`**](array.md#arraydifference)

    Compares two arrays. Returns all elements in the base array that aren't present
in <code>otherArray</code>.

* [_`Array`_.**`filter(function(element, index?, array?), thisValue?)`**](array.md#arrayfilter)

    Returns an array with only the elements satisfying a condition. The condition is a function that returns <code>true</code> or <code>false</code>.

* [_`Array`_.**`find(function(element, index?, array?), thisValue?)`**](array.md#arrayfind)

    Returns the first element from the array that satisfies the provided condition. The condition is a function that returns <code>true</code> or <code>false</code>. Returns <code>undefined</code> if no matches are found.

If you need all matching elements, use <code>filter()</code>.

* [_`Array`_.**`first()`**](array.md#arrayfirst)

    Returns the first element of the array

* [_`Array`_.**`includes(element, start?)`**](array.md#arrayincludes)

    Returns <code>true</code> if the array contains the specified element

* [_`Array`_.**`indexOf(element, start?)`**](array.md#arrayindexof)

    Returns the position of the first matching element in the array, or -1 if the element isn’t found. Positions start at 0.

* [_`Array`_.**`intersection(otherArray)`**](array.md#arrayintersection)

    Compares two arrays. Returns all elements in the base array that are also present in the other array.

* [_`Array`_.**`isEmpty()`**](array.md#arrayisempty)

    Returns <code>true</code> if the array has no elements or is <code>null</code>

* [_`Array`_.**`isNotEmpty()`**](array.md#arrayisnotempty)

    Returns <code>true</code> if the array has at least one element

* [_`Array`_.**`join(separator?)`**](array.md#arrayjoin)

    Merges all elements of the array into a single string, with an optional separator between each element.

The opposite of <code>split()</code>.

* [_`Array`_.**`last()`**](array.md#arraylast)

    Returns the last element of the array

* [_`Array`_.**`length`**](array.md#arraylength)

    The number of elements in the array

* [_`Array`_.**`map(function(element, index?, array?), thisValue?)`**](array.md#arraymap)

    Creates a new array by applying a function to each element of the original array

* [_`Array`_.**`max()`**](array.md#arraymax)

    Returns the largest number in the array. Throws an error if there are any non-numbers.

* [_`Array`_.**`min()`**](array.md#arraymin)

    Returns the smallest number in the array. Throws an error if there are any non-numbers.

* [_`Array`_.**`pluck(fieldName1?, fieldName2?, …)`**](array.md#arraypluck)

    Returns an array containing the values of the given field(s) in each Object of the array. Ignores any array elements that aren’t Objects or don’t have a key matching the field name(s) provided.

* [_`Array`_.**`randomItem()`**](array.md#arrayrandomitem)

    Returns a randomly-chosen element from the array

* [_`Array`_.**`reduce(function(prevResult, currentElem, currentIndex?, array?), initResult)`**](array.md#arrayreduce)

    Reduces an array to a single value by applying a function to each element. The function combines the current element with the result of reducing the previous elements, producing a new result.

* [_`Array`_.**`removeDuplicates(keys?)`**](array.md#arrayremoveduplicates)

    Removes any re-occurring elements from the array

* [_`Array`_.**`renameKeys(from, to)`**](array.md#arrayrenamekeys)

    Changes all matching keys (field names) of any Objects in the array. Rename more than one key by
adding extra arguments, i.e. <code>from1, to1, from2, to2, ...</code>.

* [_`Array`_.**`reverse()`**](array.md#arrayreverse)

    Reverses the order of the elements in the array

* [_`Array`_.**`slice(start, end)`**](array.md#arrayslice)

    Returns a portion of the array, from the <code>start</code> index up to (but not including) the <code>end</code> index. Indexes start at 0.

* [_`Array`_.**`smartJoin(keyField, nameField)`**](array.md#arraysmartjoin)

    Creates a single Object from an array of Objects. Each Object in the array provides one field for the returned Object. Each Object in the array must contain a field with the key name and a field with the value.

* [_`Array`_.**`sort(compareFunction(a, b)?)`**](array.md#arraysort)

    Reorders the elements of the array. For sorting strings alphabetically, no parameter is required. For sorting numbers or Objects, see examples.

* [_`Array`_.**`sum()`**](array.md#arraysum)

    Returns the total of all the numbers in the array. Throws an error if there are any non-numbers.

* [_`Array`_.**`toJsonString()`**](array.md#arraytojsonstring)

    Converts the array to a JSON string. The same as JavaScript’s <code>JSON.stringify()</code>.

* [_`Array`_.**`toSpliced(start, deleteCount, elem1, ....., elemN)`**](array.md#arraytospliced)

    Adds and/or removes array elements at a given position. 

See also <code>slice()</code> and <code>append()</code>.

* [_`Array`_.**`toString()`**](array.md#arraytostring)

    Converts the array to a string, with values separated by commas. To use a different separator, use <code>join()</code> instead.

* [_`Array`_.**`union(otherArray)`**](array.md#arrayunion)

    Concatenates two arrays and then removes any duplicates

* [_`Array`_.**`unique()`**](array.md#arrayunique)

    Removes any duplicate elements from the array


## BinaryFile

* [`binaryFile`.**`directory`**](binaryfile.md#binaryfiledirectory)

    The path to the directory that the file is stored in. Useful for distinguishing between files with the same name in different directories. Not set if n8n is  configured to store files in its database. 

* [`binaryFile`.**`fileExtension`**](binaryfile.md#binaryfilefileextension)

    The suffix attached to the filename (e.g. <code>txt</code>)

* [`binaryFile`.**`fileName`**](binaryfile.md#binaryfilefilename)

    The name of the file, including extension

* [`binaryFile`.**`fileSize`**](binaryfile.md#binaryfilefilesize)

    A string representing the size of the file

* [`binaryFile`.**`fileType`**](binaryfile.md#binaryfilefiletype)

    A string representing the type of the file, e.g. <code>image</code>. Corresponds to the first part of the MIME type.

* [`binaryFile`.**`id`**](binaryfile.md#binaryfileid)

    The unique ID of the file. Used to identify the file when it is stored on disk or in a storage service such as S3.

* [`binaryFile`.**`mimeType`**](binaryfile.md#binaryfilemimetype)

    A string representing the format of the file’s contents, e.g. <code>image/jpeg</code>


## Boolean

* [_`Boolean`_.**`isEmpty()`**](boolean.md#booleanisempty)

    Returns <code>false</code> for all booleans. Returns <code>true</code> for <code>null</code>.

* [_`Boolean`_.**`toNumber()`**](boolean.md#booleantonumber)

    Converts <code>true</code> to 1 and <code>false</code> to 0

* [_`Boolean`_.**`toString()`**](boolean.md#booleantostring)

    Converts <code>true</code> to the string ‘true’ and <code>false</code> to the string ‘false’ 


## CustomData

* [`$execution.customData`.**`get(key)`**](customdata.md#executioncustomdataget)

    Returns the custom execution data stored under the given key. <a href="/workflows/executions/custom-executions-data/">More info</a>

* [`$execution.customData`.**`getAll()`**](customdata.md#executioncustomdatagetall)

    Returns all the key-value pairs of custom data that have been set in the current execution. <a href="/workflows/executions/custom-executions-data/">More info</a>

* [`$execution.customData`.**`set(key, value)`**](customdata.md#executioncustomdataset)

    Stores custom execution data under the key specified. Use this to easily filter executions by this data. <a href="/workflows/executions/custom-executions-data/">More info</a>

* [`$execution.customData`.**`setAll(obj)`**](customdata.md#executioncustomdatasetall)

    Sets multiple key-value pairs of  custom data for the execution. Use this to easily filter executions by this data. <a href="/workflows/executions/custom-executions-data/">More info</a>


## Date

* [_`Date`_.**`toDateTime()`**](date.md#datetodatetime)

    Converts a JavaScript Date to a Luxon DateTime. The DateTime contains the same information, but is easier to manipulate.


## DateTime

* [_`DateTime`_.**`day`**](datetime.md#datetimeday)

    The day of the month (1-31)

* [_`DateTime`_.**`diffTo(otherDateTime, unit)`**](datetime.md#datetimediffto)

    Returns the difference between two DateTimes, in the given unit(s)

* [_`DateTime`_.**`diffToNow(unit)`**](datetime.md#datetimedifftonow)

    Returns the difference between the current moment and the DateTime, in the given unit(s). For a textual representation, use <code>toRelative()</code> instead.

* [_`DateTime`_.**`endOf(unit, opts)`**](datetime.md#datetimeendof)

    Rounds the DateTime up to the end of one of its units, e.g. the end of the month

* [_`DateTime`_.**`equals(other)`**](datetime.md#datetimeequals)

    Returns <code>true</code> if the two DateTimes represent exactly the same moment and are in the same time zone. For a less strict comparison, use <code>hasSame()</code>.

* [_`DateTime`_.**`extract(unit?)`**](datetime.md#datetimeextract)

    Extracts a part of the date or time, e.g. the month, as a number. To extract textual names instead, see <code>format()</code>.

* [_`DateTime`_.**`format(fmt)`**](datetime.md#datetimeformat)

    Converts the DateTime to a string, using the format specified. <a href="https://moment.github.io/luxon/#/formatting?id=table-of-tokens">Formatting guide</a>. For common formats, <code>toLocaleString()</code> may be easier.

* [_`DateTime`_.**`hasSame(otherDateTime, unit)`**](datetime.md#datetimehassame)

    Returns <code>true</code> if the two DateTimes are the same, down to the unit specified. Time zones are ignored (only local times are compared), so use <code>toUTC()</code> first if needed.

* [_`DateTime`_.**`hour`**](datetime.md#datetimehour)

    The hour of the day (0-23)

* [_`DateTime`_.**`isBetween(date1, date2)`**](datetime.md#datetimeisbetween)

    Returns <code>true</code> if the DateTime lies between the two moments specified

* [_`DateTime`_.**`isInDST`**](datetime.md#datetimeisindst)

    Whether the DateTime is in daylight saving time

* [_`DateTime`_.**`locale`**](datetime.md#datetimelocale)

    The locale of a DateTime, such 'en-GB'. The locale is used when formatting the DateTime.

* [_`DateTime`_.**`millisecond`**](datetime.md#datetimemillisecond)

    The millisecond of the second (0-999)

* [_`DateTime`_.**`minus(n, unit?)`**](datetime.md#datetimeminus)

    Subtracts a given period of time from the DateTime

* [_`DateTime`_.**`minute`**](datetime.md#datetimeminute)

    The minute of the hour (0-59)

* [_`DateTime`_.**`month`**](datetime.md#datetimemonth)

    The month (1-12)

* [_`DateTime`_.**`monthLong`**](datetime.md#datetimemonthlong)

    The textual long month name, e.g. 'October'. Defaults to the system's locale if no locale has been specified.

* [_`DateTime`_.**`monthShort`**](datetime.md#datetimemonthshort)

    The textual abbreviated month name, e.g. 'Oct'. Defaults to the system's locale if no locale has been specified.

* [_`DateTime`_.**`plus(n, unit?)`**](datetime.md#datetimeplus)

    Adds a given period of time to the DateTime

* [_`DateTime`_.**`quarter`**](datetime.md#datetimequarter)

    The quarter of the year (1-4)

* [_`DateTime`_.**`second`**](datetime.md#datetimesecond)

    The second of the minute (0-59)

* [_`DateTime`_.**`set(values)`**](datetime.md#datetimeset)

    Assigns new values to specified units of the DateTime. To round a DateTime, see also <code>startOf()</code> and <code>endOf()</code>.

* [_`DateTime`_.**`setLocale(locale)`**](datetime.md#datetimesetlocale)

    Sets the locale, which determines the language and formatting for the DateTime. Useful when generating a textual representation of the DateTime, e.g. with <code>format()</code> or <code>toLocaleString()</code>.

* [_`DateTime`_.**`setZone(zone, opts)`**](datetime.md#datetimesetzone)

    Converts the DateTime to the given time zone. The DateTime still represents the same moment unless specified in the options. See also <code>toLocal()</code> and <code>toUTC()</code>.

* [_`DateTime`_.**`startOf(unit, opts)`**](datetime.md#datetimestartof)

    Rounds the DateTime down to the beginning of one of its units, e.g. the start of the month

* [_`DateTime`_.**`toISO(opts)`**](datetime.md#datetimetoiso)

    Returns an ISO 8601-compliant string representation of the DateTime

* [_`DateTime`_.**`toLocal()`**](datetime.md#datetimetolocal)

    Converts a DateTime to the workflow’s local time zone. The DateTime still represents the same moment unless specified in the parameters. The workflow’s time zone can be set in the workflow settings.

* [_`DateTime`_.**`toLocaleString(formatOpts)`**](datetime.md#datetimetolocalestring)

    Returns a localised string representing the DateTime, i.e. in the language and format corresponding to its locale. Defaults to the system's locale if none specified.

* [_`DateTime`_.**`toMillis()`**](datetime.md#datetimetomillis)

    Returns a Unix timestamp in milliseconds (the number elapsed since 1st Jan 1970)

* [_`DateTime`_.**`toRelative(options)`**](datetime.md#datetimetorelative)

    Returns a textual representation of the time relative to now, e.g. ‘in two days’. Rounds down by default.

* [_`DateTime`_.**`toSeconds()`**](datetime.md#datetimetoseconds)

    Returns a Unix timestamp in seconds (the number elapsed since 1st Jan 1970)

* [_`DateTime`_.**`toString()`**](datetime.md#datetimetostring)

    Returns a string representation of the DateTime. Similar to <code>toISO()</code>. For more formatting options, see <code>format()</code> or <code>toLocaleString()</code>.

* [_`DateTime`_.**`toUTC(offset, opts)`**](datetime.md#datetimetoutc)

    Converts a DateTime to the UTC time zone. The DateTime still represents the same moment unless specified in the parameters. Use <code>setZone()</code> to convert to other zones.

* [_`DateTime`_.**`weekday`**](datetime.md#datetimeweekday)

    The day of the week. 1 is Monday and 7 is Sunday.

* [_`DateTime`_.**`weekdayLong`**](datetime.md#datetimeweekdaylong)

    The textual long weekday name, e.g. 'Wednesday'. Defaults to the system's locale if no locale has been specified.

* [_`DateTime`_.**`weekdayShort`**](datetime.md#datetimeweekdayshort)

    The textual abbreviated weekday name, e.g. 'Wed'. Defaults to the system's locale if no locale has been specified.

* [_`DateTime`_.**`weekNumber`**](datetime.md#datetimeweeknumber)

    The week number of the year (1-52ish)

* [_`DateTime`_.**`year`**](datetime.md#datetimeyear)

    The year

* [_`DateTime`_.**`zone`**](datetime.md#datetimezone)

    The time zone associated with the DateTime


## ExecData

* [`$exec`.**`customData`**](execdata.md#execcustomdata)

    Set and get custom execution data (e.g. to filter executions by). You can also do this with the ‘Execution Data’ node. <a href="/workflows/executions/custom-executions-data/">More info</a>

* [`$exec`.**`id`**](execdata.md#execid)

    The ID of the current workflow execution

* [`$exec`.**`mode`**](execdata.md#execmode)

    Can be one of 3 values: either <code>test</code> (meaning the execution was triggered by clicking a button in n8n) or <code>production</code> (meaning the execution was triggered automatically). When running workflow tests, <code>evaluation</code> is used.

* [`$exec`.**`resumeFormUrl`**](execdata.md#execresumeformurl)

    The URL to access a form generated by the <a href="/integrations/builtin/core-nodes/n8n-nodes-base.wait/">’Wait’ node</a>.

* [`$exec`.**`resumeUrl`**](execdata.md#execresumeurl)

    The webhook URL to call to resume a workflow waiting at a <a href="/integrations/builtin/core-nodes/n8n-nodes-base.wait/">’Wait’ node</a>.


## HTTPResponse

* [`$response`.**`body`**](httpresponse.md#responsebody)

    The body of the response object from the last HTTP call. Only available in the ‘HTTP Request’ node

* [`$response`.**`headers`**](httpresponse.md#responseheaders)

    The headers returned by the last HTTP call. Only available in the ‘HTTP Request’ node.

* [`$response`.**`statusCode`**](httpresponse.md#responsestatuscode)

    The HTTP status code returned by the last HTTP call. Only available in the ‘HTTP Request’ node.

* [`$response`.**`statusMessage`**](httpresponse.md#responsestatusmessage)

    An optional message regarding the request status. Only available in the ‘HTTP Request’ node.


## Item

* [`$item`.**`binary`**](item.md#itembinary)

    Returns any binary data the item contains

* [`$item`.**`json`**](item.md#itemjson)

    Returns the JSON data the item contains. <a href="/data/data-structure/">More info</a>


## NodeInputData

* [`$input`.**`all(branchIndex?, runIndex?)`**](nodeinputdata.md#inputall)

    Returns an array of the current node’s input items

* [`$input`.**`first(branchIndex?, runIndex?)`**](nodeinputdata.md#inputfirst)

    Returns the current node’s first input item

* [`$input`.**`item`**](nodeinputdata.md#inputitem)

    Returns the input item currently being processed

* [`$input`.**`last(branchIndex?, runIndex?)`**](nodeinputdata.md#inputlast)

    Returns the current node’s last input item

* [`$input`.**`params`**](nodeinputdata.md#inputparams)

    The configuration settings of the current node. These are the parameters you fill out within the node when configuring it (e.g. its operation).


## NodeOutputData

* [`$()`.**`all(branchIndex?, runIndex?)`**](nodeoutputdata.md#all)

    Returns an array of the node’s output items

* [`$()`.**`first(branchIndex?, runIndex?)`**](nodeoutputdata.md#first)

    Returns the first item output by the node

* [`$()`.**`isExecuted`**](nodeoutputdata.md#isexecuted)

    Is <code>true</code> if the node has executed, <code>false</code> otherwise

* [`$()`.**`item`**](nodeoutputdata.md#item)

    Returns the matching item, i.e. the one used to produce the current item in the current node. <a href="/data/data-mapping/data-item-linking/">More info</a>

* [`$()`.**`itemMatching(currentItemIndex?)`**](nodeoutputdata.md#itemmatching)

    Returns the matching item, i.e. the one used to produce the item in the current node at the specified index. <a href="/data/data-mapping/data-item-linking/">More info</a>

* [`$()`.**`last(branchIndex?, runIndex?)`**](nodeoutputdata.md#last)

    Returns the last item output by the node

* [`$()`.**`params`**](nodeoutputdata.md#params)

    The configuration settings of the given node. These are the parameters you fill out within the node’s UI (e.g. its operation).


## Number

* [_`Number`_.**`abs()`**](number.md#numberabs)

    Returns the number’s absolute value, i.e. removes any minus sign

* [_`Number`_.**`ceil()`**](number.md#numberceil)

    Rounds the number up to the next whole number

* [_`Number`_.**`floor()`**](number.md#numberfloor)

    Rounds the number down to the nearest whole number

* [_`Number`_.**`format(locale?, options?)`**](number.md#numberformat)

    Returns a formatted string representing the number. Useful for formatting for a specific language or currency. The same as <a href=”https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat”><code>Intl.NumberFormat()</code></a>.

* [_`Number`_.**`isEmpty()`**](number.md#numberisempty)

    Returns <code>false</code> for all numbers. Returns <code>true</code> for <code>null</code>.

* [_`Number`_.**`isEven()`**](number.md#numberiseven)

    Returns <code>true</code> if the number is even. Throws an error if the number isn’t a whole number.

* [_`Number`_.**`isInteger()`**](number.md#numberisinteger)

    Returns <code>true</code> if the number is a whole number

* [_`Number`_.**`isOdd()`**](number.md#numberisodd)

    Returns <code>true</code> if the number is odd. Throws an error if the number isn’t a whole number.

* [_`Number`_.**`round(decimalPlaces?)`**](number.md#numberround)

    Returns the number rounded to the nearest whole number (or specified number of decimal places)

* [_`Number`_.**`toBoolean()`**](number.md#numbertoboolean)

    Converts the number to a boolean value. <code>0</code> becomes <code>false</code>; everything else becomes <code>true</code>.

* [_`Number`_.**`toDateTime(format?)`**](number.md#numbertodatetime)

    Converts a numerical timestamp into a DateTime. The format of the timestamp must be specified if it’s not in milliseconds. Uses the time zone in n8n (or in the workflow’s settings).

* [_`Number`_.**`toLocaleString(locales?, options?)`**](number.md#numbertolocalestring)

    Returns a localised string representing the number, i.e. in the language and format corresponding to its locale. Defaults to the system's locale if none specified.

* [_`Number`_.**`toString(radix?)`**](number.md#numbertostring)

    Converts the number to a simple textual representation. For more formatting options, see <code>toLocaleString()</code>.


## Object

* [_`Object`_.**`compact()`**](object.md#objectcompact)

    Removes all fields that have empty values, i.e. are <code>null</code> or <code>""</code>

* [_`Object`_.**`hasField(name)`**](object.md#objecthasfield)

    Returns <code>true</code> if there is a field called <code>name</code>. Only checks top-level keys. Comparison is case-sensitive.

* [_`Object`_.**`isEmpty()`**](object.md#objectisempty)

    Returns <code>true</code> if the Object has no keys (fields) set or is <code>null</code>

* [_`Object`_.**`isNotEmpty()`**](object.md#objectisnotempty)

    Returns <code>true</code> if the Object has at least one key (field) set

* [_`Object`_.**`keepFieldsContaining(value)`**](object.md#objectkeepfieldscontaining)

    Removes any fields whose values don’t at least partly match the given <code>value</code>. Comparison is case-sensitive. Fields that aren’t strings will always be removed.

* [_`Object`_.**`keys()`**](object.md#objectkeys)

    Returns an array with all the field names (keys) the object contains. The same as JavaScript’s <code>Object.keys(obj)</code>.

* [_`Object`_.**`merge(otherObject)`**](object.md#objectmerge)

    Merges the two Objects into a single one. If a key (field name) exists in both Objects, the value from the first (base) Object is used.

* [_`Object`_.**`removeField(key)`**](object.md#objectremovefield)

    Removes a field from the Object. The same as JavaScript’s <code>delete</code>.

* [_`Object`_.**`removeFieldsContaining(value)`**](object.md#objectremovefieldscontaining)

    Removes keys (fields) whose values at least partly match the given <code>value</code>. Comparison is case-sensitive. Fields that aren’t strings are always kept.

* [_`Object`_.**`toJsonString()`**](object.md#objecttojsonstring)

    Converts the Object to a JSON string. Similar to JavaScript’s <code>JSON.stringify()</code>.

* [_`Object`_.**`urlEncode()`**](object.md#objecturlencode)

    Generates a URL parameter string from the Object’s keys and values. Only top-level keys are supported.

* [_`Object`_.**`values()`**](object.md#objectvalues)

    Returns an array with all the values of the fields the Object contains. The same as JavaScript’s <code>Object.values(obj)</code>.


## PrevNodeData

* [**`name`**](prevnodedata.md#name)

    The name of the node that the current input came from. 

Always uses the current node’s first input connector if there is more than one (e.g. in the ‘Merge’ node).

* [**`outputIndex`**](prevnodedata.md#outputindex)

    The index of the output connector that the current input came from. Use this when the previous node had multiple outputs (such as an ‘If’ or ‘Switch’ node). 

Always uses the current node’s first input connector if there is more than one (e.g. in the ‘Merge’ node). 

* [**`runIndex`**](prevnodedata.md#runindex)

    The run of the previous node that generated the current input. 

Always uses the current node’s first input connector if there is more than one (e.g. in the ‘Merge’ node). 


## Root

* [**`$(nodeName)`**](root.md#)

    Returns the data of the specified node

* [**`$binary`**](root.md#binary)

    Returns any binary input data to the current node, for the current item. Shorthand for <code>$input.item.binary</code>.

* [**`$execution`**](root.md#execution)

    Retrieve or set metadata for the current execution

* [**`$fromAI(key, description?, type?, defaultValue?)`**](root.md#fromai)

    Use when a large language model should provide the value of a node parameter. Consider providing a description for better results.

* [**`$if(condition, valueIfTrue, valueIfFalse)`**](root.md#if)

    Returns one of two values depending on the <code>condition</code>. Similar to the <code>?</code> operator in JavaScript.

* [**`$ifEmpty(value, valueIfEmpty)`**](root.md#ifempty)

    Returns the first parameter if it isn’t empty, otherwise returns the second parameter. The following count as empty: <code>””</code>, <code>[]</code>, <code>{}</code>, <code>null</code>, <code>undefined</code>

* [**`$input`**](root.md#input)

    The input data of the current node

* [**`$itemIndex`**](root.md#itemindex)

    The position of the item currently being processed in the list of input items

* [**`$jmespath(obj, expression)`**](root.md#jmespath)

    Extracts data from an object (or array of objects) using a <a href=”/code/cookbook/jmespath/”>JMESPath</a> expression. Useful for querying complex, nested objects. Returns <code>undefined</code> if the expression is invalid.

* [**`$json`**](root.md#json)

    Returns the JSON input data to the current node, for the current item. Shorthand for <code>$input.item.json</code>. <a href="/data/data-structure/">More info</a>

* [**`$max(num1, num2, …, numN)`**](root.md#max)

    Returns the highest of the given numbers

* [**`$min(num1, num2, …, numN)`**](root.md#min)

    Returns the lowest of the given numbers

* [**`$nodeVersion`**](root.md#nodeversion)

    The version of the current node (as displayed at the bottom of the nodes’s settings pane)

* [**`$now`**](root.md#now)

    A DateTime representing the current moment. 

Uses the workflow’s time zone (which can be changed in the workflow settings).

* [**`$pageCount`**](root.md#pagecount)

    The number of results pages the node has fetched. Only available in the ‘HTTP Request’ node.

* [**`$parameter`**](root.md#parameter)

    The configuration settings of the current node. These are the parameters you fill out within the node’s UI (e.g. its operation).

* [**`$prevNode`**](root.md#prevnode)

    Information about the node that the current input came from. 

When in a ‘Merge’ node, always uses the first input connector.

* [**`$request`**](root.md#request)

    The request object sent during the last run of the node. Only available in the ‘HTTP Request’ node.

* [**`$response`**](root.md#response)

    The response returned by the last HTTP call. Only available in the ‘HTTP Request’ node.

* [**`$runIndex`**](root.md#runindex)

    The index of the current run of the current node execution. Starts at 0.

* [**`$secrets`**](root.md#secrets)

    The secrets from an <a href="/external-secrets/">external secrets vault</a>, if configured. Secret values are never displayed to the user. Only available in credential fields.

* [**`$today`**](root.md#today)

    A DateTime representing midnight at the start of the current day. 

Uses the instance’s time zone (unless overridden in the workflow’s settings).

* [**`$vars`**](root.md#vars)

    The <a href="/code/variables/">variables</a> available to the workflow

* [**`$workflow`**](root.md#workflow)

    Information about the current workflow


## String

* [_`String`_.**`base64Encode()`**](string.md#stringbase64decode)

    Converts plain text to a base64-encoded string

* [_`String`_.**`base64Encode()`**](string.md#stringbase64encode)

    Converts a base64-encoded string to plain text

* [_`String`_.**`concat(string1, string2?, ..., stringN?)`**](string.md#stringconcat)

    Joins one or more strings onto the end of the base string. Alternatively, use the <code>+</code> operator (see examples).

* [_`String`_.**`extractDomain()`**](string.md#stringextractdomain)

    If the string is an email address or URL, returns its domain (or <code>undefined</code> if nothing found). 

If the string also contains other content, try using <code>extractEmail()</code> or <code>extractUrl()</code> first.

* [_`String`_.**`extractEmail()`**](string.md#stringextractemail)

    Extracts the first email found in the string. Returns <code>undefined</code> if none is found.

* [_`String`_.**`extractUrl()`**](string.md#stringextracturl)

    Extracts the first URL found in the string. Returns <code>undefined</code> if none is found. Only recognizes full URLs, e.g. those starting with <code>http</code>.

* [_`String`_.**`extractUrlPath()`**](string.md#stringextracturlpath)

    Returns the part of a URL after the domain, or <code>undefined</code> if no URL found. 

If the string also contains other content, try using <code>extractUrl()</code> first.

* [_`String`_.**`hash(algo?)`**](string.md#stringhash)

    Returns the string hashed with the given algorithm. Defaults to md5 if not specified.

* [_`String`_.**`includes(searchString, start?)`**](string.md#stringincludes)

    Returns <code>true</code> if the string contains the <code>searchString</code>. Case-sensitive.

* [_`String`_.**`indexOf(searchString, start?)`**](string.md#stringindexof)

    Returns the index (position) of the first occurrence of <code>searchString</code> within the base string, or -1 if not found. Case-sensitive.

* [_`String`_.**`isDomain()`**](string.md#stringisdomain)

    Returns <code>true</code> if the string is a domain

* [_`String`_.**`isEmail()`**](string.md#stringisemail)

    Returns <code>true</code> if the string is an email

* [_`String`_.**`isEmpty()`**](string.md#stringisempty)

    Returns <code>true</code> if the string has no characters or is <code>null</code>

* [_`String`_.**`isNotEmpty()`**](string.md#stringisnotempty)

    Returns <code>true</code> if the string has at least one character

* [_`String`_.**`isNumeric()`**](string.md#stringisnumeric)

    Returns <code>true</code> if the string represents a number

* [_`String`_.**`isUrl()`**](string.md#stringisurl)

    Returns <code>true</code> if the string is a valid URL

* [_`String`_.**`length`**](string.md#stringlength)

    The number of characters in the string

* [_`String`_.**`match(regexp)`**](string.md#stringmatch)

    Matches the string against a <a href=”https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions”>regular expression</a>. Returns an array containing the first match, or all matches if the <code>g</code> flag is set in the regular expression. Returns <code>null</code> if no matches are found. 

For checking whether text is present, consider <code>includes()</code> instead.

* [_`String`_.**`parseJson()`**](string.md#stringparsejson)

    Returns the JavaScript Object or value represented by the string, or <code>undefined</code> if the string isn’t valid JSON. Single-quoted JSON is not supported.

* [_`String`_.**`quote(mark?)`**](string.md#stringquote)

    Wraps a string in quotation marks, and escapes any quotation marks already in the string. Useful when constructing JSON, SQL, etc.

* [_`String`_.**`removeMarkdown()`**](string.md#stringremovemarkdown)

    Removes any Markdown formatting from the string. Also removes HTML tags.

* [_`String`_.**`removeTags()`**](string.md#stringremovetags)

    Removes tags, such as HTML or XML, from the string

* [_`String`_.**`replace(pattern, replacement)`**](string.md#stringreplace)

    Returns a string with the first occurrence of <code>pattern</code> replaced by <code>replacement</code>. 

To replace all occurrences, use <code>replaceAll()</code> instead.

* [_`String`_.**`replaceAll(pattern, replacement)`**](string.md#stringreplaceall)

    Returns a string with all occurrences of <code>pattern</code> replaced by <code>replacement</code>

* [_`String`_.**`replaceSpecialChars()`**](string.md#stringreplacespecialchars)

    Replaces special characters in the string with the closest ASCII character

* [_`String`_.**`search(regexp)`**](string.md#stringsearch)

    Returns the index (position) of the first occurrence of a pattern within the string, or -1 if not found. The pattern is specified using a <a href=”https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions”>regular expression</a>. To use text instead, see <code>indexOf()</code>.

* [_`String`_.**`slice(start, end?)`**](string.md#stringslice)

    Extracts a fragment of the string at the given position. For more advanced extraction, see <code>match()</code>.

* [_`String`_.**`split(separator?, limit?)`**](string.md#stringsplit)

    Splits the string into an array of substrings. Each split is made at the <code>separator</code>, and the separator isn’t included in the output. 

The opposite of using <code>join()</code> on an array.

* [_`String`_.**`startsWith(searchString, start?)`**](string.md#stringstartswith)

    Returns <code>true</code> if the string starts with <code>searchString</code>. Case-sensitive.

* [_`String`_.**`substring(start, end?)`**](string.md#stringsubstring)

    Extracts a fragment of the string at the given position. For more advanced extraction, see <code>match()</code>.

* [_`String`_.**`toBoolean()`**](string.md#stringtoboolean)

    Converts the string to a boolean value. <code>0</code>, <code>false</code> and <code>no</code> resolve to <code>false</code>, everything else to <code>true</code>. Case-insensitive.

* [_`String`_.**`toDateTime()`**](string.md#stringtodatetime)

    Converts the string to a DateTime. Useful for further transformation. Supported formats for the string are ISO 8601, HTTP, RFC2822, SQL and Unix timestamp in milliseconds. 

To parse other formats, use <a href=”https://moment.github.io/luxon/api-docs/index.html#datetimefromformat”> <code>DateTime.fromFormat()</code></a>.

* [_`String`_.**`toJsonString()`**](string.md#stringtojsonstring)

    Prepares the string to be inserted into a JSON object. Escapes any quotes and special characters (e.g. new lines), and wraps the string in quotes.

The same as JavaScript’s <code>JSON.stringify()</code>.

* [_`String`_.**`toLowerCase()`**](string.md#stringtolowercase)

    Converts all letters in the string to lower case

* [_`String`_.**`toNumber()`**](string.md#stringtonumber)

    Converts a string representing a number to a number. Throws an error if the string doesn’t start with a valid number.

* [_`String`_.**`toSentenceCase()`**](string.md#stringtosentencecase)

    Changes the capitalization of the string to sentence case. The first letter of each sentence is capitalized and all others are lowercased.

* [_`String`_.**`toSnakeCase()`**](string.md#stringtosnakecase)

    Changes the format of the string to snake case. Spaces and dashes are replaced by <code>_</code>, symbols are removed and all letters are lowercased.

* [_`String`_.**`toTitleCase()`**](string.md#stringtotitlecase)

    Changes the capitalization of the string to title case. The first letter of each word is capitalized and the others left unchanged. Short prepositions and conjunctions aren’t capitalized (e.g. ‘a’, ‘the’).

* [_`String`_.**`toUpperCase()`**](string.md#stringtouppercase)

    Converts all letters in the string to upper case (capitals)

* [_`String`_.**`trim()`**](string.md#stringtrim)

    Removes whitespace from both ends of the string. Whitespace includes new lines, tabs, spaces, etc.

* [_`String`_.**`urlDecode(allChars?)`**](string.md#stringurldecode)

    Decodes a URL-encoded string. Replaces any character codes in the form of <code>%XX</code> with their corresponding characters.

* [_`String`_.**`urlEncode(allChars?)`**](string.md#stringurlencode)

    Encodes the string so that it can be used in a URL. Spaces and special characters are replaced with codes of the form <code>%XX</code>.


## WorkflowData

* [`$workflow`.**`active`**](workflowdata.md#workflowactive)

    Whether the workflow is active

* [`$workflow`.**`id`**](workflowdata.md#workflowid)

    The workflow ID. Can also be found in the workflow’s URL.

* [`$workflow`.**`name`**](workflowdata.md#workflowname)

    The name of the workflow, as shown at the top of the editor
