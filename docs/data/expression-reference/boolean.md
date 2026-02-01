# Boolean

## _`Boolean`_.**`isEmpty()`**

**Description:** Returns <code>false</code> for all booleans. Returns <code>true</code> for <code>null</code>.

**Syntax:** _`Boolean`_.isEmpty()

**Returns:** Boolean

**Type:** n8n

**Examples:**

  ```javascript
  // bool = true
  bool.isEmpty() // => false
  ```

  ```javascript
  // bool = false
  bool.isEmpty() // => false
  ```

  ```javascript
  // bool = null
  bool.isEmpty() // => true
  ```

## _`Boolean`_.**`toNumber()`**

**Description:** Converts <code>true</code> to 1 and <code>false</code> to 0

**Syntax:** _`Boolean`_.toNumber()

**Returns:** Number

**Type:** n8n

**Examples:**

  ```javascript
  true.toNumber() //=> 1
  ```

  ```javascript
  false.toNumber() //=> 0
  ```

## _`Boolean`_.**`toString()`**

**Description:** Converts <code>true</code> to the string ‘true’ and <code>false</code> to the string ‘false’ 

**Syntax:** _`Boolean`_.toString()

**Returns:** String

**Type:** JS

**Examples:**

  ```javascript
  // bool = true
  bool.toString() //=> 'true'
  ```

  ```javascript
  // bool = false
  bool.toString() //=> 'false'
  ```

