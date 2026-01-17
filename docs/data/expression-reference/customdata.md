# CustomData

## getAll()

* **Description:** Returns all the key-value pairs of custom data that have been set in the current execution. More info
* **Definition:** getAll()
* **Returns:** Object
* **Source:** n8n
* **Examples:**

  ```javascript
  $execution.customData.getAll() //=> {"user_email": "me@example.com", "id": 1234}
  ```

## setAll()

* **Description:** Sets multiple key-value pairs of  custom data for the execution. Use this to easily filter executions by this data. More info
* **Definition:** setAll(obj)
* **Source:** n8n
* **Parameters:**
  * `obj` (Object) - A JavaScript object containing key-value pairs of the data to set
* **Examples:**

  ```javascript
  $execution.customData.setAll({"user_email": "me@example.com", "id": 1234})
  ```

## set()

* **Description:** Stores custom execution data under the key specified. Use this to easily filter executions by this data. More info
* **Definition:** set(key, value)
* **Source:** n8n
* **Parameters:**
  * `key` (String) - The key (identifier) under which the data is stored
  * `value` (String) - The data to store
* **Examples:**

  ```javascript
  // Store the user's email, to easily retrieve all execs related to that user later
  $execution.customData.set("user_email", "me@example.com")
  ```

## get()

* **Description:** Returns the custom execution data stored under the given key. More info
* **Definition:** get(key)
* **Returns:** String
* **Source:** n8n
* **Parameters:**
  * `key` (String) - The key (identifier) under which the data is stored
* **Examples:**

  ```javascript
  // Get the user's email (which was previously stored)
  $execution.customData.get("user_email") //=> "me@example.com"
  ```

