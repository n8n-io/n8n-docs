# Number

## isEmpty()

* **Description:** Returns <code>false</code> for all numbers. Returns <code>true</code> for <code>null</code>.
* **Syntax:** number.isEmpty()
* **Returns:** Boolean
* **n8n or JavaScript method:** n8n
* **Examples:**

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

## round()

* **Description:** Returns the number rounded to the nearest whole number (or specified number of decimal places)
* **Syntax:** number.round(decimalPlaces?)
* **Returns:** Number
* **n8n or JavaScript method:** n8n
* **Parameters:**
  * `decimalPlaces` (Number) - optional - The number of decimal places to round to
* **Examples:**

  ```javascript
  // number = 1.256
  number.round() //=> 1
  ```

  ```javascript
  // number = 1.256
  number.round(1) //=> 1.3
  number.round(2) //=> 1.26
  ```

## floor()

* **Description:** Rounds the number down to the nearest whole number
* **Syntax:** number.floor()
* **Returns:** Number
* **n8n or JavaScript method:** n8n
* **Examples:**

  ```javascript
  // x = 1.234
  x.floor() //=> 1
  ```

## toBoolean()

* **Description:** Converts the number to a boolean value. <code>0</code> becomes <code>false</code>; everything else becomes <code>true</code>.
* **Syntax:** number.toBoolean()
* **n8n or JavaScript method:** n8n
* **Examples:**

  ```javascript
  // number = 12
  number.toBoolean() //=> true
  ```

  ```javascript
  // number = 0
  number.toBoolean() //=> false
  ```

## isOdd()

* **Description:** Returns <code>true</code> if the number is odd. Throws an error if the number isn’t a whole number.
* **Syntax:** number.isOdd()
* **Returns:** Boolean
* **n8n or JavaScript method:** n8n
* **Examples:**

  ```javascript
  // number = 33
  number.isOdd() //=> true
  ```

## format()

* **Description:** Returns a formatted string representing the number. Useful for formatting for a specific language or currency. The same as <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat"><code>Intl.NumberFormat()</code></a>.
* **Syntax:** number.format(locale?, options?)
* **Returns:** String
* **n8n or JavaScript method:** n8n
* **Parameters:**
  * `locale` (String) - optional - A <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locales_argument">locale tag</a> for formatting the number, for example, <code>fr-FR</code>, <code>en-GB</code>, <code>pr-BR</code>
  * `options` (Object) - optional - Configuration options for number formatting. <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat" target="_blank">More info</a>
* **Examples:**

  ```javascript
  // number = 123456.789;
  number.format('de-DE') //=> 123.456,789
  ```

  ```javascript
  // number = 123456.789;
  number.format('de-DE', {'style': 'currency', 'currency': 'EUR'}) //=> 123.456,79 €
  ```

## toLocaleString()

* **Description:** Returns a localised string representing the number, namely, in the language and format corresponding to its locale. Defaults to the system's locale if none specified.
* **Syntax:** number.toLocaleString(locales?, options?)
* **Returns:** String
* **n8n or JavaScript method:** JS
* **Parameters:**
  * `locales` (String|Array<String>) - optional - The locale to assign, for example, ‘en-GB’ for British English or ‘pt-BR’ for Brazilian Portuguese. See <a href="https://www.localeplanet.com/icu/">full list</a> (unofficial). Also accepts an array of locales. Defaults to the system locale if not specified.
  * `options` (Object) - optional - An object with <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#parameters">formatting options</a>
* **Examples:**

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

## isEven()

* **Description:** Returns <code>true</code> if the number is even. Throws an error if the number isn’t a whole number.
* **Syntax:** number.isEven()
* **Returns:** Boolean
* **n8n or JavaScript method:** n8n
* **Examples:**

  ```javascript
  // number = 33
  number.isEven() //=> false
  ```

## abs()

* **Description:** Returns the number’s absolute value, namely, removes any minus sign
* **Syntax:** number.abs()
* **Returns:** Number
* **n8n or JavaScript method:** n8n
* **Examples:**

  ```javascript
  // x = -1.7
  x.abs() //=> 1.7
  ```

## toString()

* **Description:** Converts the number to a simple textual representation. For more formatting options, see <code>toLocaleString()</code>.
* **Syntax:** number.toString(radix?)
* **Returns:** String
* **n8n or JavaScript method:** JS
* **Parameters:**
  * `radix` (Number) - optional - The base to use. Must be an integer between 2 and 36. for example, base <code>2</code> is binary and base <code>16</code> is hexadecimal.
* **Examples:**

  ```javascript
  // num = 500000.125
  num.toString() //=> '500000.125'
  ```

  ```javascript
  // num = 500000.125
  num.toString(16) //=> '7a120.2'
  ```

## isInteger()

* **Description:** Returns <code>true</code> if the number is a whole number
* **Syntax:** number.isInteger()
* **Returns:** Boolean
* **n8n or JavaScript method:** n8n
* **Examples:**

  ```javascript
  // number = 4
  number.isInteger() //=> true
  ```

  ```javascript
  // number = 4.12
  number.isInteger() //=> false
  ```

## ceil()

* **Description:** Rounds the number up to the next whole number
* **Syntax:** number.ceil()
* **Returns:** Number
* **n8n or JavaScript method:** n8n
* **Examples:**

  ```javascript
  // x = 1.234
  x.ceil() //=> 2
  ```

## toDateTime()

* **Description:** Converts a numerical timestamp into a DateTime. The format of the timestamp must be specified if it’s not in milliseconds. Uses the time zone in n8n (or in the workflow’s settings).
* **Syntax:** number.toDateTime(format?)
* **Returns:** DateTime
* **n8n or JavaScript method:** n8n
* **Parameters:**
  * `format` (String) - optional - The type of timestamp to convert. Options are <code>ms</code> (for Unix timestamp in milliseconds), <code>s</code> (for Unix timestamp in seconds) or <code>excel</code> (for days since 1900).
* **Examples:**

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

