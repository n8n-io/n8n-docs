# Boolean

## toNumber()

* **Description:** Converts <code>true</code> to 1 and <code>false</code> to 0
* **Syntax:** bool.toNumber()
* **Returns:** Number
* **n8n or JavaScript method:** n8n
* **Examples:**

  ```javascript
  true.toNumber() //=> 1
  ```

  ```javascript
  false.toNumber() //=> 0
  ```

## isEmpty()

* **Description:** Returns <code>false</code> for all booleans. Returns <code>true</code> for <code>null</code>.
* **Syntax:** bool.isEmpty()
* **Returns:** Boolean
* **n8n or JavaScript method:** n8n
* **Examples:**

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

## toString()

* **Description:** Converts <code>true</code> to the string ‘true’ and <code>false</code> to the string ‘false’ 
* **Syntax:** bool.toString()
* **Returns:** String
* **n8n or JavaScript method:** JS
* **Examples:**

  ```javascript
  // bool = true
  bool.toString() //=> 'true'
  ```

  ```javascript
  // bool = false
  bool.toString() //=> 'false'
  ```

