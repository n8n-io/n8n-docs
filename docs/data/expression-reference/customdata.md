# CustomData

## `$execution.customData`.**`get()`**

**Description:** Returns the custom execution data stored under the given key. <a href="/workflows/executions/custom-executions-data/">More info</a>

**Syntax:** `$execution.customData`.get(key)

**Returns:** String

**Type:** n8n

**Parameters:**
  * `key` (String) - The key (identifier) under which the data is stored

**Examples:**

  ```javascript
  // Get the user's email (which was previously stored)
  $execution.customData.get("user_email") //=> "me@example.com"
  ```

## `$execution.customData`.**`getAll()`**

**Description:** Returns all the key-value pairs of custom data that have been set in the current execution. <a href="/workflows/executions/custom-executions-data/">More info</a>

**Syntax:** `$execution.customData`.getAll()

**Returns:** Object

**Type:** n8n

**Examples:**

  ```javascript
  $execution.customData.getAll() //=> {"user_email": "me@example.com", "id": 1234}
  ```

## `$execution.customData`.**`set()`**

**Description:** Stores custom execution data under the key specified. Use this to easily filter executions by this data. <a href="/workflows/executions/custom-executions-data/">More info</a>

**Syntax:** `$execution.customData`.set(key, value)

**Type:** n8n

**Parameters:**
  * `key` (String) - The key (identifier) under which the data is stored
  * `value` (String) - The data to store

**Examples:**

  ```javascript
  // Store the user's email, to easily retrieve all execs related to that user later
  $execution.customData.set("user_email", "me@example.com")
  ```

## `$execution.customData`.**`setAll()`**

**Description:** Sets multiple key-value pairs of  custom data for the execution. Use this to easily filter executions by this data. <a href="/workflows/executions/custom-executions-data/">More info</a>

**Syntax:** `$execution.customData`.setAll(obj)

**Type:** n8n

**Parameters:**
  * `obj` (Object) - A JavaScript object containing key-value pairs of the data to set

**Examples:**

  ```javascript
  $execution.customData.setAll({"user_email": "me@example.com", "id": 1234})
  ```

