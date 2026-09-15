---
nodeTitle: Boolean
originalFilePath: data/expression-reference/boolean.md
originalUrl: 'https://docs.n8n.io/data/expression-reference/boolean'
url: >-
  https://docs.n8n.io/build/work-with-data/transform-data/expression-reference/boolean
layout:
  description:
    visible: false
---
# Boolean <a href="#boolean" id="boolean"></a>

## _`Boolean`_.**`isEmpty()`** <a href="#booleanisempty" id="booleanisempty"></a>

**Description:** Returns <code>true</code> if the boolean is <code>false</code>, <code>null</code>, or <code>undefined</code>. Returns <code>false</code> if the boolean is <code>true</code>.

{% hint style="warning" %}
`isEmpty()` isn't a null check. On a boolean it treats `false` as empty, so `{{ $json.flag.isEmpty() }}` returns `true` for both a missing field and a field set to `false`. To test only for a missing value, compare directly, for example `{{ $json.flag === null }}`, or use the **exists** operator in the **If** node.
{% endhint %}

**Syntax:** _`Boolean`_.isEmpty()

**Returns:** Boolean

**Source:**  Custom n8n functionality

**Examples:**

  ```javascript
  // bool = true
  bool.isEmpty() // => false
  ```

  ```javascript
  // bool = false
  bool.isEmpty() // => true
  ```

  ```javascript
  // bool = null
  bool.isEmpty() // => true
  ```

## _`Boolean`_.**`toNumber()`** <a href="#booleantonumber" id="booleantonumber"></a>

**Description:** Converts <code>true</code> to 1 and <code>false</code> to 0

**Syntax:** _`Boolean`_.toNumber()

**Returns:** Number

**Source:**  Custom n8n functionality

**Examples:**

  ```javascript
  true.toNumber() //=> 1
  ```

  ```javascript
  false.toNumber() //=> 0
  ```

## _`Boolean`_.**`toString()`** <a href="#booleantostring" id="booleantostring"></a>

**Description:** Converts <code>true</code> to the string ‘true’ and <code>false</code> to the string ‘false’ 

**Syntax:** _`Boolean`_.toString()

**Returns:** String

**Source:** JavaScript function

**Examples:**

  ```javascript
  // bool = true
  bool.toString() //=> 'true'
  ```

  ```javascript
  // bool = false
  bool.toString() //=> 'false'
  ```

