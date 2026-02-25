# Number

## _`Number`_.**`abs()`**

**Description:** Returns the number’s absolute value, i.e. removes any minus sign

**Syntax:** _`Number`_.abs()

**Returns:** Number

**Source:**  Custom n8n functionality

**Examples:**

  ```javascript
  // x = -1.7
  x.abs() //=> 1.7
  ```

## _`Number`_.**`ceil()`**

**Description:** Rounds the number up to the next whole number

**Syntax:** _`Number`_.ceil()

**Returns:** Number

**Source:**  Custom n8n functionality

**Examples:**

  ```javascript
  // x = 1.234
  x.ceil() //=> 2
  ```

## _`Number`_.**`floor()`**

**Description:** Rounds the number down to the nearest whole number

**Syntax:** _`Number`_.floor()

**Returns:** Number

**Source:**  Custom n8n functionality

**Examples:**

  ```javascript
  // x = 1.234
  x.floor() //=> 1
  ```

## _`Number`_.**`format()`**

**Description:** Returns a formatted string representing the number. Useful for formatting for a specific language or currency. The same as <a href=”https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat”><code>Intl.NumberFormat()</code></a>.

**Syntax:** _`Number`_.format(locale?, options?)

**Returns:** String

**Source:**  Custom n8n functionality

**Parameters:**

  * `locale` (String) - optional - A <a href=”https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locales_argument”>locale tag</a> for formatting the number, e.g. <code>fr-FR</code>, <code>en-GB</code>, <code>pr-BR</code>
  * `options` (Object) - optional - Configuration options for number formatting. <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat" target="_blank">More info</a>

**Examples:**

  ```javascript
  // number = 123456.789;
  number.format('de-DE') //=> 123.456,789
  ```

  ```javascript
  // number = 123456.789;
  number.format('de-DE', {'style': 'currency', 'currency': 'EUR'}) //=> 123.456,79 €
  ```

## _`Number`_.**`isEmpty()`**

**Description:** Returns <code>false</code> for all numbers. Returns <code>true</code> for <code>null</code>.

**Syntax:** _`Number`_.isEmpty()

**Returns:** Boolean

**Source:**  Custom n8n functionality

**Examples:**

  ```javascript
  // num = 10
  num.isEmpty() // => false
  ```

  ```javascript
  // num = 0
  num.isEmpty() // => false
  ```

  ```javascript
  // num = null
  num.isEmpty() // => true
  ```

## _`Number`_.**`isEven()`**

**Description:** Returns <code>true</code> if the number is even. Throws an error if the number isn’t a whole number.

**Syntax:** _`Number`_.isEven()

**Returns:** Boolean

**Source:**  Custom n8n functionality

**Examples:**

  ```javascript
  // number = 33
  number.isEven() //=> false
  ```

## _`Number`_.**`isInteger()`**

**Description:** Returns <code>true</code> if the number is a whole number

**Syntax:** _`Number`_.isInteger()

**Returns:** Boolean

**Source:**  Custom n8n functionality

**Examples:**

  ```javascript
  // number = 4
  number.isInteger() //=> true
  ```

  ```javascript
  // number = 4.12
  number.isInteger() //=> false
  ```

## _`Number`_.**`isOdd()`**

**Description:** Returns <code>true</code> if the number is odd. Throws an error if the number isn’t a whole number.

**Syntax:** _`Number`_.isOdd()

**Returns:** Boolean

**Source:**  Custom n8n functionality

**Examples:**

  ```javascript
  // number = 33
  number.isOdd() //=> true
  ```

## _`Number`_.**`round()`**

**Description:** Returns the number rounded to the nearest whole number (or specified number of decimal places)

**Syntax:** _`Number`_.round(decimalPlaces?)

**Returns:** Number

**Source:**  Custom n8n functionality

**Parameters:**

  * `decimalPlaces` (Number) - optional - The number of decimal places to round to

**Examples:**

  ```javascript
  // number = 1.256
  number.round() //=> 1
  ```

  ```javascript
  // number = 1.256
  number.round(1) //=> 1.3
  number.round(2) //=> 1.26
  ```

## _`Number`_.**`toBoolean()`**

**Description:** Converts the number to a boolean value. <code>0</code> becomes <code>false</code>; everything else becomes <code>true</code>.

**Syntax:** _`Number`_.toBoolean()

**Source:**  Custom n8n functionality

**Examples:**

  ```javascript
  // number = 12
  number.toBoolean() //=> true
  ```

  ```javascript
  // number = 0
  number.toBoolean() //=> false
  ```

## _`Number`_.**`toDateTime()`**

**Description:** Converts a numerical timestamp into a DateTime. The format of the timestamp must be specified if it’s not in milliseconds. Uses the time zone in n8n (or in the workflow’s settings).

**Syntax:** _`Number`_.toDateTime(format?)

**Returns:** DateTime

**Source:**  Custom n8n functionality

**Parameters:**

  * `format` (String) - optional - The type of timestamp to convert. Options are <code>ms</code> (for Unix timestamp in milliseconds), <code>s</code> (for Unix timestamp in seconds) or <code>excel</code> (for days since 1900).

**Examples:**

  ```javascript
  // ts = 1708695471
  ts.toDateTime('s') //=> 2024-02-23T14:37:51+01:00
  ```

  ```javascript
  // ts = 1708695471000
  ts.toDateTime('ms') //=> 2024-02-23T14:37:51+01:00
  ```

  ```javascript
  // ts = 45345
  ts.toDateTime('excel') //=> 2024-02-23T01:00:00+01:00
  ```

## _`Number`_.**`toLocaleString()`**

**Description:** Returns a localised string representing the number, i.e. in the language and format corresponding to its locale. Defaults to the system's locale if none specified.

**Syntax:** _`Number`_.toLocaleString(locales?, options?)

**Returns:** String

**Source:** JavaScript function

**Parameters:**

  * `locales` (String|Array<String>) - optional - The locale to assign, e.g. ‘en-GB’ for British English or ‘pt-BR’ for Brazilian Portuguese. See <a href=”https://www.localeplanet.com/icu/”>full list</a> (unofficial). Also accepts an array of locales. Defaults to the system locale if not specified.
  * `options` (Object) - optional - An object with <a href=”https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#parameters”>formatting options</a>

**Examples:**

  ```javascript
  // num = 500000.125
  num.toLocaleString() //=> '500,000.125' (if in US English locale)
  ```

  ```javascript
  // num = 500000.125
  num.toLocaleString('fr-FR') //=> '500 000,125'
  ```

  ```javascript
  // num = 500000.125
  num.toLocaleString('fr-FR', {style:'currency', currency:'EUR'}) //=> '500 000,13 €'
  ```

## _`Number`_.**`toString()`**

**Description:** Converts the number to a simple textual representation. For more formatting options, see <code>toLocaleString()</code>.

**Syntax:** _`Number`_.toString(radix?)

**Returns:** String

**Source:** JavaScript function

**Parameters:**

  * `radix` (Number) - optional - The base to use. Must be an integer between 2 and 36. E.g. base <code>2</code> is binary and base <code>16</code> is hexadecimal.

**Examples:**

  ```javascript
  // num = 500000.125
  num.toString() //=> '500000.125'
  ```

  ```javascript
  // num = 500000.125
  num.toString(16) //=> '7a120.2'
  ```

