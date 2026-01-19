# Expression Reference

These are some commonly used expressions. A more exhaustive list appears below.

| Category | Expression |
|---|---|
| Access current data | `$json` |
| | `$json.fieldName` |
| | `$binary` |
| Node Access | `$("NodeName").first()` |
| | `$("NodeName").all()` |
| | `$("NodeName").last()` |
| | `$("NodeName").item` |
| Date/Time | `$now` |
| | `$today` |
| | `$now.toFormat("yyyy-MM-dd")` |
| Conditionals | `condition ? "yes" : "no"` |
| | `$if(condition, "true", "false")` |
| String Methods | `text.toUpperCase()` |
| | `text.toLowerCase()` |
| | `text.includes("search")` |
| | `text.extractEmail()` |
| Array Methods | `array.length` |
| | `array.filter(x => x > 5)` |
| | `array.map(x => x.name)` |
| | `array.join(", ")` |

Browse the tables below to find methods by the data type on which they act. Click a method name to read detailed documentation for it.

## Array

| Name | Description |
| --- | --- |
| [compact()](array.md#compact) | Removes any empty values from the array. `null`, `""` and `undefined` count as empty. |
| [removeDuplicates(keys?)](array.md#removeduplicates) | Removes any re-occurring elements from the array |
| [pluck(fieldName1?, fieldName2?, …)](array.md#pluck) | Returns an array containing the values of the given field(s) in each Object of the array. Ignores any array elements that aren’t Objects or don’t have a key matching the field name(s) provided. |
| [sort(compareFunction(a, b)?)](array.md#sort) | Reorders the elements of the array. For sorting strings alphabetically, no parameter is required. For sorting numbers or Objects, see examples. |
| [first()](array.md#first) | Returns the first element of the array |
| [reverse()](array.md#reverse) | Reverses the order of the elements in the array |
| [min()](array.md#min) | Returns the smallest number in the array. Throws an error if there are any non-numbers. |
| [max()](array.md#max) | Returns the largest number in the array. Throws an error if there are any non-numbers. |
| [unique()](array.md#unique) | Removes any duplicate elements from the array |
| [union(otherArray)](array.md#union) | Concatenates two arrays and then removes any duplicates |
| [sum()](array.md#sum) | Returns the total of all the numbers in the array. Throws an error if there are any non-numbers. |
| [difference(otherArray)](array.md#difference) | Compares two arrays. Returns all elements in the base array that aren't present in `otherArray`. |
| [renameKeys(from, to)](array.md#renamekeys) | Changes all matching keys (field names) of any Objects in the array. Rename more than one key by adding extra arguments, namely,  `from1, to1, from2, to2, ...`. |
| [reduce(function(), initResult)](array.md#reduce) | Reduces an array to a single value by applying a function to each element. The function combines the current element with the result of reducing the previous elements, producing a new result. |
| [map(function(), thisValue?)](array.md#map) | Creates a new array by applying a function to each element of the original array |
| [length](array.md#length) | The number of elements in the array |
| [toJsonString()](array.md#tojsonstring) | Converts the array to a JSON string. The same as JavaScript’s `JSON.stringify()`. |
| [toString()](array.md#tostring) | Converts the array to a string, with values separated by commas. To use a different separator, use `join()` instead. |
| [find(function(), thisValue?)](array.md#find) | Returns the first element from the array that satisfies the provided condition. The condition is a function that returns `true` or `false`. Returns `undefined` if no matches are found. If you need all matching elements, use `filter()`. |
| [isNotEmpty()](array.md#isnotempty) | Returns `true` if the array has at least one element |
| [indexOf(element, start?)](array.md#indexof) | Returns the position of the first matching element in the array, or `-1` if the element isn’t found. Positions start at 0. |
| [isEmpty()](array.md#isempty) | Returns `true` if the array has no elements or is `null` |
| [toSpliced(start, deleteCount, elem1...elemN)](array.md#tospliced) | Adds and/or removes array elements at a given position. See also `slice()` and `append()`. |
| [last()](array.md#last) | Returns the last element of the array |
| [join(separator?)](array.md#join) | Merges all elements of the array into a single string, with an optional separator between each element. The opposite of `split()`. |
| [intersection(otherArray)](array.md#intersection) | Compares two arrays. Returns all elements in the base array that are also present in the other array. |
| [average()](array.md#average) | Returns the average of the numbers in the array. Throws an error if there are any non-numbers. |
| [slice(start, end)](array.md#slice) | Returns a portion of the array, from the `start` index up to (but not including) the `end` index. Indexes start at 0. |
| [filter(function(), thisValue?)](array.md#filter) | Returns an array with only the elements satisfying a condition. The condition is a function that returns `true` or `false`. |
| [concat(array2, array3?, ... arrayN?)](array.md#concat) | Joins one or more arrays onto the end of the base array |
| [randomItem()](array.md#randomitem) | Returns a randomly-chosen element from the array |
| [chunk(length)](array.md#chunk) | Splits the array into an array of sub-arrays, each with the given length |
| [includes(element, start?)](array.md#includes) | Returns `true` if the array contains the specified element |
| [append(elem1, elem2?, ..., elemN?)](array.md#append) | Adds new elements to the end of the array. Similar to `push()`, but returns the modified array. Consider using spread syntax instead (see examples). |
| [smartJoin(keyField, nameField)](array.md#smartjoin) | Creates a single Object from an array of Objects. Each Object in the array provides one field for the returned Object. Each Object in the array must contain a field with the key name and a field with the value. |

## BinaryFile

| Name | Description |
| --- | --- |
| [fileType](binaryfile.md#filetype) | A string representing the type of the file, for example, `image`. Corresponds to the first part of the MIME type. |
| [mimeType](binaryfile.md#mimetype) | A string representing the format of the file’s contents, for example, `image/jpeg` |
| [fileName](binaryfile.md#filename) | The name of the file, including extension |
| [fileSize](binaryfile.md#filesize) | A string representing the size of the file |
| [id](binaryfile.md#id) | The unique ID of the file. Used to identify the file when it's stored on disk or in a storage service such as S3. |
| [fileExtension](binaryfile.md#fileextension) | The suffix attached to the filename (for example, `txt`) |
| [directory](binaryfile.md#directory) | The path to the directory that the file is stored in. Useful for distinguishing between files with the same name in different directories. Not set if n8n is configured to store files in its database. |

## Boolean

| Name | Description |
| --- | --- |
| [toNumber()](boolean.md#tonumber) | Converts `true` to 1 and `false` to 0 |
| [isEmpty()](boolean.md#isempty) | Returns `false` for all booleans. Returns `true` for `null`. |
| [toString()](boolean.md#tostring) | Converts `true` to the string ‘true’ and `false` to the string ‘false’ |

## CustomData

| Name | Description |
| --- | --- |
| [getAll()](customdata.md#getall) | Returns all the key-value pairs of custom data that have been set in the current execution. <a href="/workflows/executions/custom-executions-data/">More info</a> |
| [setAll(obj)](customdata.md#setall) | Sets multiple key-value pairs of custom data for the execution. Use this to easily filter executions by this data. <a href="/workflows/executions/custom-executions-data/">More info</a> |
| [set(key, value)](customdata.md#set) | Stores custom execution data under the key specified. Use this to easily filter executions by this data. <a href="/workflows/executions/custom-executions-data/">More info</a> |
| [get(key)](customdata.md#get) | Returns the custom execution data stored under the given key. <a href="/workflows/executions/custom-executions-data/">More info</a> |

## Date

| Name | Description |
| --- | --- |
| [toDateTime()](date.md#todatetime) | Converts a JavaScript Date to a Luxon DateTime. The DateTime contains the same information, but is easier to manipulate. |

## DateTime

| Name | Description |
| --- | --- |
| [isBetween(date1, date2)](datetime.md#isbetween) | Returns `true` if the DateTime lies between the two moments specified |
| [weekdayShort](datetime.md#weekdayshort) | The textual abbreviated weekday name, for example, 'Wed'. Defaults to the system's locale if no locale has been specified. |
| [format(fmt)](datetime.md#format) | Converts the DateTime to a string, using the format specified. <a href="https://moment.github.io/luxon/#/formatting?id=table-of-tokens">Formatting guide</a>. For common formats, `toLocaleString()` may be easier. |
| [toISO(opts)](datetime.md#toiso) | Returns an ISO 8601-compliant string representation of the DateTime |
| [plus(n, unit?)](datetime.md#plus) | Adds a given period of time to the DateTime |
| [isInDST](datetime.md#isindst) | Whether the DateTime is in daylight saving time |
| [zone](datetime.md#zone) | The time zone associated with the DateTime |
| [toMillis()](datetime.md#tomillis) | Returns a Unix timestamp in milliseconds (the number elapsed since 1st Jan 1970) |
| [weekNumber](datetime.md#weeknumber) | The week number of the year (1-52ish) |
| [month](datetime.md#month) | The month (1-12) |
| [toSeconds()](datetime.md#toseconds) | Returns a Unix timestamp in seconds (the number elapsed since 1st Jan 1970) |
| [toString()](datetime.md#tostring) | Returns a string representation of the DateTime. Similar to `toISO()`. For more formatting options, see `format()` or `toLocaleString()`. |
| [toLocaleString(formatOpts)](datetime.md#tolocalestring) | Returns a localised string representing the DateTime, namely,  in the language and format corresponding to its locale. Defaults to the system's locale if none specified. |
| [millisecond](datetime.md#millisecond) | The millisecond of the second (0-999) |
| [weekdayLong](datetime.md#weekdaylong) | The textual long weekday name, for example, 'Wednesday'. Defaults to the system's locale if no locale has been specified. |
| [monthLong](datetime.md#monthlong) | The textual long month name, for example, 'October'. Defaults to the system's locale if no locale has been specified. |
| [second](datetime.md#second) | The second of the minute (0-59) |
| [year](datetime.md#year) | The year |
| [diffToNow(unit)](datetime.md#difftonow) | Returns the difference between the current moment and the DateTime, in the given unit(s). For a textual representation, use `toRelative()` instead. |
| [set(values)](datetime.md#set) | Assigns new values to specified units of the DateTime. To round a DateTime, see also `startOf()` and `endOf()`. |
| [hour](datetime.md#hour) | The hour of the day (0-23) |
| [equals(other)](datetime.md#equals) | Returns `true` if the two DateTimes represent exactly the same moment and are in the same time zone. For a less strict comparison, use `hasSame()`. |
| [monthShort](datetime.md#monthshort) | The textual abbreviated month name, for example, 'Oct'. Defaults to the system's locale if no locale has been specified. |
| [setLocale(locale)](datetime.md#setlocale) | Sets the locale, which determines the language and formatting for the DateTime. Useful when generating a textual representation of the DateTime, for example, with `format()` or `toLocaleString()`. |
| [endOf(unit, opts)](datetime.md#endof) | Rounds the DateTime up to the end of one of its units, for example, the end of the month |
| [locale](datetime.md#locale) | The locale of a DateTime, such 'en-GB'. The locale is used when formatting the DateTime. |
| [quarter](datetime.md#quarter) | The quarter of the year (1-4) |
| [startOf(unit, opts)](datetime.md#startof) | Rounds the DateTime down to the beginning of one of its units, for example, the start of the month |
| [hasSame(otherDateTime, unit)](datetime.md#hassame) | Returns `true` if the two DateTimes are the same, down to the unit specified. Time zones are ignored (only local times are compared), so use `toUTC()` first if needed. |
| [day](datetime.md#day) | The day of the month (1-31) |
| [minute](datetime.md#minute) | The minute of the hour (0-59) |
| [toLocal()](datetime.md#tolocal) | Converts a DateTime to the workflow’s local time zone. The DateTime still represents the same moment unless specified in the parameters. The workflow’s time zone can be set in the workflow settings. |
| [toRelative(options)](datetime.md#torelative) | Returns a textual representation of the time relative to now, for example, ‘in two days’. Rounds down by default. |
| [extract(unit?)](datetime.md#extract) | Extracts a part of the date or time, for example, the month, as a number. To extract textual names instead, see `format()`. |
| [minus(n, unit?)](datetime.md#minus) | Subtracts a given period of time from the DateTime |
| [weekday](datetime.md#weekday) | The day of the week. 1 is Monday and 7 is Sunday. |
| [setZone(zone, opts)](datetime.md#setzone) | Converts the DateTime to the given time zone. The DateTime still represents the same moment unless specified in the options. See also `toLocal()` and `toUTC()`. |
| [toUTC(offset, opts)](datetime.md#toutc) | Converts a DateTime to the UTC time zone. The DateTime still represents the same moment unless specified in the parameters. Use `setZone()` to convert to other zones. |
| [diffTo(otherDateTime, unit)](datetime.md#diffto) | Returns the difference between two DateTimes, in the given unit(s) |

## ExecData

| Name | Description |
| --- | --- |
| [resumeUrl](execdata.md#resumeurl) | The webhook URL to call to resume a workflow waiting at a <a href="/integrations/builtin/core-nodes/n8n-nodes-base.wait/">’Wait’ node</a>. |
| [customData](execdata.md#customdata) | Set and get custom execution data (for example, to filter executions by). You can also do this with the ‘Execution Data’ node. <a href="/workflows/executions/custom-executions-data/">More info</a> |
| [resumeFormUrl](execdata.md#resumeformurl) | The URL to access a form generated by the <a href="/integrations/builtin/core-nodes/n8n-nodes-base.wait/">’Wait’ node</a>. |
| [mode](execdata.md#mode) | Can be one of 3 values: either `test` (meaning the execution was triggered by clicking a button in n8n) or `production` (meaning the execution was triggered automatically). When running workflow tests, `evaluation` is used. |
| [id](execdata.md#id) | The ID of the current workflow execution |

## HTTPResponse

| Name | Description |
| --- | --- |
| [body](httpresponse.md#body) | The body of the response object from the last HTTP call. Only available in the ‘HTTP Request’ node |
| [statusCode](httpresponse.md#statuscode) | The HTTP status code returned by the last HTTP call. Only available in the ‘HTTP Request’ node. |
| [headers](httpresponse.md#headers) | The headers returned by the last HTTP call. Only available in the ‘HTTP Request’ node. |
| [statusMessage](httpresponse.md#statusmessage) | An optional message regarding the request status. Only available in the ‘HTTP Request’ node. |

## Item

| Name | Description |
| --- | --- |
| [binary](item.md#binary) | Returns any binary data the item contains |
| [json](item.md#json) | Returns the JSON data the item contains. <a href="/data/data-structure/">More info</a> |

## NodeInputData

| Name | Description |
| --- | --- |
| [item](nodeinputdata.md#item) | Returns the input item currently being processed |
| [all(branchIndex?, runIndex?)](nodeinputdata.md#all) | Returns an array of the current node’s input items |
| [params](nodeinputdata.md#params) | The configuration settings of the current node. These are the parameters you fill out within the node when configuring it (for example, its operation). |
| [first(branchIndex?, runIndex?)](nodeinputdata.md#first) | Returns the current node’s first input item |
| [last(branchIndex?, runIndex?)](nodeinputdata.md#last) | Returns the current node’s last input item |

## NodeOutputData

| Name | Description |
| --- | --- |
| [first(branchIndex?, runIndex?)](nodeoutputdata.md#first) | Returns the first item output by the node |
| [last(branchIndex?, runIndex?)](nodeoutputdata.md#last) | Returns the last item output by the node |
| [itemMatching(currentItemIndex?)](nodeoutputdata.md#itemmatching) | Returns the matching item, namely,  the one used to produce the item in the current node at the specified index. <a href="/data/data-mapping/data-item-linking/">More info</a> |
| [item](nodeoutputdata.md#item) | Returns the matching item, namely,  the one used to produce the current item in the current node. <a href="/data/data-mapping/data-item-linking/">More info</a> |
| [all(branchIndex?, runIndex?)](nodeoutputdata.md#all) | Returns an array of the node’s output items |
| [isExecuted](nodeoutputdata.md#isexecuted) | Is `true` if the node has executed, `false` otherwise |
| [params](nodeoutputdata.md#params) | The configuration settings of the given node. These are the parameters you fill out within the node’s UI (for example, its operation). |

## Number

| Name | Description |
| --- | --- |
| [isEmpty()](number.md#isempty) | Returns `false` for all numbers. Returns `true` for `null`. |
| [round(decimalPlaces?)](number.md#round) | Returns the number rounded to the nearest whole number (or specified number of decimal places) |
| [floor()](number.md#floor) | Rounds the number down to the nearest whole number |
| [toBoolean()](number.md#toboolean) | Converts the number to a boolean value. `0` becomes `false`; everything else becomes `true`. |
| [isOdd()](number.md#isodd) | Returns `true` if the number is odd. Throws an error if the number isn’t a whole number. |
| [format(locale?, options?)](number.md#format) | Returns a formatted string representing the number. Useful for formatting for a specific language or currency. The same as <a href=”https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat”>`Intl.NumberFormat()`</a>. |
| [toLocaleString(locales?, options?)](number.md#tolocalestring) | Returns a localised string representing the number, namely,  in the language and format corresponding to its locale. Defaults to the system's locale if none specified. |
| [isEven()](number.md#iseven) | Returns `true` if the number is even. Throws an error if the number isn’t a whole number. |
| [abs()](number.md#abs) | Returns the number’s absolute value, namely,  removes any minus sign |
| [toString(radix?)](number.md#tostring) | Converts the number to a simple textual representation. For more formatting options, see `toLocaleString()`. |
| [isInteger()](number.md#isinteger) | Returns `true` if the number is a whole number |
| [ceil()](number.md#ceil) | Rounds the number up to the next whole number |
| [toDateTime(format?)](number.md#todatetime) | Converts a numerical timestamp into a DateTime. The format of the timestamp must be specified if it’s not in milliseconds. Uses the time zone in n8n (or in the workflow’s settings). |

## Object

| Name | Description |
| --- | --- |
| [removeField(key)](object.md#removefield) | Removes a field from the Object. The same as JavaScript’s `delete`. |
| [values()](object.md#values) | Returns an array with all the values of the fields the Object contains. The same as JavaScript’s `Object.values(obj)`. |
| [urlEncode()](object.md#urlencode) | Generates a URL parameter string from the Object’s keys and values. Only top-level keys are supported. |
| [keys()](object.md#keys) | Returns an array with all the field names (keys) the object contains. The same as JavaScript’s `Object.keys(obj)`. |
| [isEmpty()](object.md#isempty) | Returns `true` if the Object has no keys (fields) set or is `null` |
| [keepFieldsContaining(value)](object.md#keepfieldscontaining) | Removes any fields whose values don’t at least partly match the given `value`. Comparison is case-sensitive. Fields that aren’t strings will always be removed. |
| [removeFieldsContaining(value)](object.md#removefieldscontaining) | Removes keys (fields) whose values at least partly match the given `value`. Comparison is case-sensitive. Fields that aren’t strings are always kept. |
| [isNotEmpty()](object.md#isnotempty) | Returns `true` if the Object has at least one key (field) set |
| [compact()](object.md#compact) | Removes all fields that have empty values, namely,  are `null` or `""` |
| [merge(otherObject)](object.md#merge) | Merges the two Objects into a single one. If a key (field name) exists in both Objects, the value from the first (base) Object is used. |
| [toJsonString()](object.md#tojsonstring) | Converts the Object to a JSON string. Similar to JavaScript’s `JSON.stringify()`. |
| [hasField(name)](object.md#hasfield) | Returns `true` if there is a field called `name`. Only checks top-level keys. Comparison is case-sensitive. |

## PrevNodeData

| Name | Description |
| --- | --- |
| [outputIndex](prevnodedata.md#outputindex) | The index of the output connector that the current input came from. Use this when the previous node had multiple outputs (such as an ‘If’ or ‘Switch’ node). Always uses the current node’s first input connector if there is more than one (for example, in the ‘Merge’ node). |
| [name](prevnodedata.md#name) | The name of the node that the current input came from. Always uses the current node’s first input connector if there is more than one (for example, in the ‘Merge’ node). |
| [runIndex](prevnodedata.md#runindex) | The run of the previous node that generated the current input. Always uses the current node’s first input connector if there is more than one (for example, in the ‘Merge’ node). |

## Root

| Name | Description |
| --- | --- |
| [$runIndex](root.md#runindex) | The index of the current run of the current node execution. Starts at 0. |
| [$binary](root.md#binary) | Returns any binary input data to the current node, for the current item. Shorthand for `$input.item.binary`. |
| [$workflow](root.md#workflow) | Information about the current workflow |
| [$fromAI(key, description?, type?, defaultValue?)](root.md#fromai) | Use when a large language model should provide the value of a node parameter. Consider providing a description for better results. |
| [$secrets](root.md#secrets) | The secrets from an <a href="/external-secrets/">external secrets vault</a>, if configured. Secret values are never displayed to the user. Only available in credential fields. |
| [$itemIndex](root.md#itemindex) | The position of the item currently being processed in the list of input items |
| [$(nodeName)](root.md#) | Returns the data of the specified node |
| [$vars](root.md#vars) | The <a href="/code/variables/">variables</a> available to the workflow |
| [$pageCount](root.md#pagecount) | The number of results pages the node has fetched. Only available in the ‘HTTP Request’ node. |
| [$response](root.md#response) | The response returned by the last HTTP call. Only available in the ‘HTTP Request’ node. |
| [$parameter](root.md#parameter) | The configuration settings of the current node. These are the parameters you fill out within the node’s UI (for example, its operation). |
| [$input](root.md#input) | The input data of the current node |
| [$if(condition, valueIfTrue, valueIfFalse)](root.md#if) | Returns one of two values depending on the `condition`. Similar to the `?` operator in JavaScript. |
| [$execution](root.md#execution) | Retrieve or set metadata for the current execution |
| [$now](root.md#now) | A DateTime representing the current moment. Uses the workflow’s time zone (which can be changed in the workflow settings). |
| [$jmespath(obj, expression)](root.md#jmespath) | Extracts data from an object (or array of objects) using a <a href="/code/cookbook/jmespath/">JMESPath</a> expression. Useful for querying complex, nested objects. Returns `undefined` if the expression is invalid. |
| [$ifEmpty(value, valueIfEmpty)](root.md#ifempty) | Returns the first parameter if it isn’t empty, otherwise returns the second parameter. The following count as empty: `””`, `[]`, `{}`, `null`, `undefined` |
| [$prevNode](root.md#prevnode) | Information about the node that the current input came from. When in a ‘Merge’ node, always uses the first input connector. |
| [$nodeVersion](root.md#nodeversion) | The version of the current node (as displayed at the bottom of the nodes’s settings pane) |
| [$max(num1, num2, …, numN)](root.md#max) | Returns the highest of the given numbers |
| [$min(num1, num2, …, numN)](root.md#min) | Returns the lowest of the given numbers |
| [$request](root.md#request) | The request object sent during the last run of the node. Only available in the ‘HTTP Request’ node. |
| [$json](root.md#json) | Returns the JSON input data to the current node, for the current item. Shorthand for `$input.item.json`. <a href="/data/data-structure/">More info</a> |
| [$today](root.md#today) | A DateTime representing midnight at the start of the current day. Uses the instance’s time zone (unless overridden in the workflow’s settings). |

## String

| Name | Description |
| --- | --- |
| [match(regexp)](string.md#match) | Matches the string against a <a href=”https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions”>regular expression</a>. Returns an array containing the first match, or all matches if the `g` flag is set in the regular expression. Returns `null` if no matches are found. For checking whether text is present, consider `includes()` instead. |
| [extractEmail()](string.md#extractemail) | Extracts the first email found in the string. Returns `undefined` if none is found. |
| [extractDomain()](string.md#extractdomain) | If the string is an email address or URL, returns its domain (or `undefined` if nothing found). If the string also contains other content, try using `extractEmail()` or `extractUrl()` first. |
| [indexOf(searchString, start?)](string.md#indexof) | Returns the index (position) of the first occurrence of `searchString` within the base string, or `-1` if not found. Case-sensitive. |
| [isDomain()](string.md#isdomain) | Returns `true` if the string is a domain |
| [toBoolean()](string.md#toboolean) | Converts the string to a boolean value. `0`, `false` and `no` resolve to `false`, everything else to `true`. Case-insensitive. |
| [toLowerCase()](string.md#tolowercase) | Converts all letters in the string to lower case |
| [toJsonString()](string.md#tojsonstring) | Prepares the string to be inserted into a JSON object. Escapes any quotes and special characters (for example, new lines), and wraps the string in quotes. The same as JavaScript’s `JSON.stringify()`. |
| [toSentenceCase()](string.md#tosentencecase) | Changes the capitalization of the string to sentence case. The first letter of each sentence is capitalized and all others are lowercased. |
| [toSnakeCase()](string.md#tosnakecase) | Changes the format of the string to snake case. Spaces and dashes are replaced by `_`, symbols are removed and all letters are lowercased. |
| [removeTags()](string.md#removetags) | Removes tags, such as HTML or XML, from the string |
| [isNumeric()](string.md#isnumeric) | Returns `true` if the string represents a number |
| [removeMarkdown()](string.md#removemarkdown) | Removes any Markdown formatting from the string. Also removes HTML tags. |
| [search(regexp)](string.md#search) | Returns the index (position) of the first occurrence of a pattern within the string, or `-1` if not found. The pattern is specified using a <a href=”https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions”>regular expression</a>. To use text instead, see `indexOf()`. |
| [extractUrl()](string.md#extracturl) | Extracts the first URL found in the string. Returns `undefined` if none is found. Only recognizes full URLs, for example, those starting with `http`. |
| [base64Encode()](string.md#base64encode) | Converts a base64-encoded string to plain text |
| [includes(searchString, start?)](string.md#includes) | Returns `true` if the string contains the `searchString`. Case-sensitive. |
| [quote(mark?)](string.md#quote) | Wraps a string in quotation marks, and escapes any quotation marks already in the string. Useful when constructing JSON, SQL, etc. |
| [toUpperCase()](string.md#touppercase) | Converts all letters in the string to upper case (capitals) |
| [toDateTime()](string.md#todatetime) | Converts the string to a DateTime. Useful for further transformation. Supported formats for the string are ISO 8601, HTTP, RFC2822, SQL and Unix timestamp in milliseconds. To parse other formats, use <a href=”https://moment.github.io/luxon/api-docs/index.html#datetimefromformat”> `DateTime.fromFormat()`</a>. |
| [isUrl()](string.md#isurl) | Returns `true` if the string is a valid URL |
| [toTitleCase()](string.md#totitlecase) | Changes the capitalization of the string to title case. The first letter of each word is capitalized and the others left unchanged. Short prepositions and conjunctions aren’t capitalized (for example, ‘a’, ‘the’). |
| [replace(pattern, replacement)](string.md#replace) | Returns a string with the first occurrence of `pattern` replaced by `replacement`. To replace all occurrences, use `replaceAll()` instead. |
| [trim()](string.md#trim) | Removes whitespace from both ends of the string. Whitespace includes new lines, tabs, spaces, etc. |
| [extractUrlPath()](string.md#extracturlpath) | Returns the part of a URL after the domain, or `undefined` if no URL found. If the string also contains other content, try using `extractUrl()` first. |
| [isNotEmpty()](string.md#isnotempty) | Returns `true` if the string has at least one character |
| [startsWith(searchString, start?)](string.md#startswith) | Returns `true` if the string starts with `searchString`. Case-sensitive. |
| [replaceAll(pattern, replacement)](string.md#replaceall) | Returns a string with all occurrences of `pattern` replaced by `replacement` |
| [length](string.md#length) | The number of characters in the string |
| [urlDecode(allChars?)](string.md#urldecode) | Decodes a URL-encoded string. Replaces any character codes in the form of `%XX` with their corresponding characters. |
| [replaceSpecialChars()](string.md#replacespecialchars) | Replaces special characters in the string with the closest ASCII character |
| [parseJson()](string.md#parsejson) | Returns the JavaScript Object or value represented by the string, or `undefined` if the string isn’t valid JSON. Single-quoted JSON isn't supported. |
| [substring(start, end?)](string.md#substring) | Extracts a fragment of the string at the given position. For more advanced extraction, see `match()`. |
| [urlEncode(allChars?)](string.md#urlencode) | Encodes the string so that it can be used in a URL. Spaces and special characters are replaced with codes of the form `%XX`. |
| [base64Encode()](string.md#base64decode) | Converts plain text to a base64-encoded string |
| [isEmpty()](string.md#isempty) | Returns `true` if the string has no characters or is `null` |
| [concat(string1, string2?, ..., stringN?)](string.md#concat) | Joins one or more strings onto the end of the base string. Alternatively, use the `+` operator (see examples). |
| [toNumber()](string.md#tonumber) | Converts a string representing a number to a number. Throws an error if the string doesn’t start with a valid number. |
| [split(separator?, limit?)](string.md#split) | Splits the string into an array of substrings. Each split's made at the `separator`, and the separator isn’t included in the output. The opposite of using `join()` on an array. |
| [isEmail()](string.md#isemail) | Returns `true` if the string is an email |
| [slice(start, end?)](string.md#slice) | Extracts a fragment of the string at the given position. For more advanced extraction, see `match()`. |
| [hash(algo?)](string.md#hash) | Returns the string hashed with the given algorithm. Defaults to md5 if not specified. |

## WorkflowData

| Name | Description |
| --- | --- |
| [active](workflowdata.md#active) | Whether the workflow is active |
| [name](workflowdata.md#name) | The name of the workflow, as shown at the top of the editor |
| [id](workflowdata.md#id) | The workflow ID. Can also be found in the workflow’s URL. |
