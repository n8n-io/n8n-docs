# Boolean

## toNumber()

* **Description:** Converts `true` to 1 and `false` to 0
* **Definition:** toNumber()
* **Returns:** Number
* **Source:** n8n
* **Examples:**

  ```javascript
  true.toNumber() //=> 1
  ```

  ```javascript
  false.toNumber() //=> 0
  ```

## isEmpty()

* **Description:** Returns `false` for all booleans. Returns `true` for `null`.
* **Definition:** isEmpty()
* **Returns:** Boolean
* **Source:** n8n
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

* **Description:** Converts `true` to the string ‘true’ and `false` to the string ‘false’ 
* **Definition:** toString()
* **Returns:** String
* **Source:** JS
* **Examples:**

  ```javascript
  // bool = true
  bool.toString() //=> 'true'
  ```

  ```javascript
  // bool = false
  bool.toString() //=> 'false'
  ```

