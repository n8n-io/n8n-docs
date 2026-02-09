# Root

## **`$()`**

**Description:** Returns the data of the specified node

**Syntax:** $(nodeName)

**Returns:** NodeData

**Type:** n8n

**Parameters:**

  * `nodeName` (String) - The name of the node to retrieve  data for

## **`$binary`**

**Description:** Returns any binary input data to the current node, for the current item. Shorthand for <code>$input.item.binary</code>.

**Syntax:** **`$binary`**

**Returns:** Array<BinaryFile>

**Type:** n8n

## **`$execution`**

**Description:** Retrieve or set metadata for the current execution

**Syntax:** **`$execution`**

**Returns:** ExecData

**Type:** n8n

## **`$fromAI()`**

**Description:** Use when a large language model should provide the value of a node parameter. Consider providing a description for better results.

**Syntax:** $fromAI(key, description?, type?, defaultValue?)

**Returns:** any

**Type:** n8n

**Parameters:**

  * `key` (String) - The name of the field to fetch. May only contain letters, numbers, underscores and hyphens.
  * `description` (String) - optional - Use to give the model more context on exactly what it should return
  * `type` (String) - optional - The type of the value to return. One of <code>string</code>, <code>number</code>,  <code>boolean</code>, <code>json</code>, <code>date</code>, <code>datetime</code>. Defaults to <code>string</code>.
  * `defaultValue` (any) - optional - A value to use if the model doesn’t return the key

**Examples:**

  ```javascript
  // Ask the model to provide a name, and use it here
  $fromAI('name')
  ```

  ```javascript
  // Ask the model to provide the age of the person (as a number with a default value of 18), and use it here
  $fromAI('age', 'The age of the person', 'number', 18)
  ```

  ```javascript
  // Ask the model to provide a boolean signifying whether the person is a student (with default value false), and use it here
  $fromAI('isStudent', 'Is the person a student', 'boolean', false)
  ```

## **`$if()`**

**Description:** Returns one of two values depending on the <code>condition</code>. Similar to the <code>?</code> operator in JavaScript.

**Syntax:** $if(condition, valueIfTrue, valueIfFalse)

**Returns:** any

**Type:** n8n

**Parameters:**

  * `condition` (Boolean) - The check to make. Should evaluate to either <code>true</code> or <code>false</code>
  * `valueIfTrue` (any) - The value to return if the condition is true
  * `valueIfFalse` (any) - The value to return if the condition is false

**Examples:**

  ```javascript
  // Return "Good day" if time is before 5pm, otherwise "Good evening"
  $if($now.hour < 17, "Good day", "Good evening")
  ```

  ```javascript
  // $if() calls can be combined:
  // Return "Good morning" if time is before 10am, "Good day" it's before 5pm, otherwise "Good evening"
  $if($now.hour < 10, "Good morning", $if($now.hour < 17, "Good day", "Good evening"))
  ```

## **`$ifEmpty()`**

**Description:** Returns the first parameter if it isn’t empty, otherwise returns the second parameter. The following count as empty: <code>””</code>, <code>[]</code>, <code>{}</code>, <code>null</code>, <code>undefined</code>

**Syntax:** $ifEmpty(value, valueIfEmpty)

**Returns:** any

**Type:** n8n

**Parameters:**

  * `value` (any) - The value to return, provided it isn’t empty
  * `valueIfEmpty` (any) - What to return if <code>value</code> is empty

**Examples:**

  ```javascript
  "Hi " + $ifEmpty(name, "there") // e.g. "Hi Nathan" or "Hi there"
  ```

## **`$input`**

**Description:** The input data of the current node

**Syntax:** **`$input`**

**Returns:** NodeData

**Type:** n8n

## **`$itemIndex`**

**Description:** The position of the item currently being processed in the list of input items

**Syntax:** **`$itemIndex`**

**Returns:** Number

**Type:** n8n

## **`$jmespath()`**

**Description:** Extracts data from an object (or array of objects) using a <a href=”/code/cookbook/jmespath/”>JMESPath</a> expression. Useful for querying complex, nested objects. Returns <code>undefined</code> if the expression is invalid.

**Syntax:** $jmespath(obj, expression)

**Returns:** any

**Type:** n8n

**Parameters:**

  * `obj` (Object|Array) - The Object or array of Objects to retrieve data from
  * `expression` (String) - A <a href=”https://jmespath.org/examples.html”>JMESPath expression</a> defining the data to retrieve from the object

**Examples:**

  ```javascript
  data = {
    "people": [
      {
        "age": 20,
        "other": "foo",
        "name": "Bob"
      },
      {
        "age": 25,
        "other": "bar",
        "name": "Fred"
      },
      {
        "age": 30,
        "other": "baz",
        "name": "George"
      }
    ]
  }
  
  // Get all names, in an array
  {{ $jmespath(data, '[*].name') }} //=> ["Bob", "Fred", "George"]
  
  // Get the names and ages of everyone under 20
  $jmespath(data, '[?age > `20`].[name, age]') //=> [ ["Fred",25], ["George",30] ]
  
  // Get the name of the first person under 20
  $jmespath($json.people, '[?age > `20`].name | [0]') //=> Fred
  ```

  ```javascript
  data = {
      "reservations": [
        {
          "id": 1,
          "guests": [
            {
              "name": "Nathan",
              "requirements": {
                "room": "double",
                "meal": "vegetarian"
              }
            },
            {
              "name": "Meg",
              "requirements": {
                "room": "single"
              }
            }
          ]
        },
        {
          "id": 2,
          "guests": [
            {
              "name": "Lex",
              "requirements": {
                "room": "double"
              }
            }
          ]
        }
      ]
    }
  
  // Get the names of all the guests in each reservation that require a double room
  $jmespath(data, 'reservations[].guests[?requirements.room==`double`].name')
  ```

## **`$json`**

**Description:** Returns the JSON input data to the current node, for the current item. Shorthand for <code>$input.item.json</code>. <a href="/data/data-structure/">More info</a>

**Syntax:** **`$json`**

**Returns:** Object

**Type:** n8n

## **`$max()`**

**Description:** Returns the highest of the given numbers

**Syntax:** $max(num1, num2, …, numN)

**Returns:** Number

**Type:** n8n

**Parameters:**

  * `num1` (Number) - The first number to compare
  * `num2` (Number) - The second number to compare

## **`$min()`**

**Description:** Returns the lowest of the given numbers

**Syntax:** $min(num1, num2, …, numN)

**Returns:** Number

**Type:** n8n

**Parameters:**

  * `num1` (Number) - The first number to compare
  * `num2` (Number) - The second number to compare

## **`$nodeVersion`**

**Description:** The version of the current node (as displayed at the bottom of the nodes’s settings pane)

**Syntax:** **`$nodeVersion`**

**Returns:** String

**Type:** n8n

## **`$now`**

**Description:** A DateTime representing the current moment. 

Uses the workflow’s time zone (which can be changed in the workflow settings).

**Syntax:** **`$now`**

**Returns:** DateTime

**Type:** n8n

## **`$pageCount`**

**Description:** The number of results pages the node has fetched. Only available in the ‘HTTP Request’ node.

**Syntax:** **`$pageCount`**

**Returns:** Number

**Type:** n8n

## **`$parameter`**

**Description:** The configuration settings of the current node. These are the parameters you fill out within the node’s UI (e.g. its operation).

**Syntax:** **`$parameter`**

**Returns:** NodeParams

**Type:** n8n

## **`$prevNode`**

**Description:** Information about the node that the current input came from. 

When in a ‘Merge’ node, always uses the first input connector.

**Syntax:** **`$prevNode`**

**Returns:** PrevNodeData

**Type:** n8n

## **`$request`**

**Description:** The request object sent during the last run of the node. Only available in the ‘HTTP Request’ node.

**Syntax:** **`$request`**

**Returns:** Object

**Type:** n8n

## **`$response`**

**Description:** The response returned by the last HTTP call. Only available in the ‘HTTP Request’ node.

**Syntax:** **`$response`**

**Returns:** HTTPResponse

**Type:** n8n

## **`$runIndex`**

**Description:** The index of the current run of the current node execution. Starts at 0.

**Syntax:** **`$runIndex`**

**Returns:** Number

**Type:** n8n

## **`$secrets`**

**Description:** The secrets from an <a href="/external-secrets/">external secrets vault</a>, if configured. Secret values are never displayed to the user. Only available in credential fields.

**Syntax:** **`$secrets`**

**Returns:** Object

**Type:** n8n

## **`$today`**

**Description:** A DateTime representing midnight at the start of the current day. 

Uses the instance’s time zone (unless overridden in the workflow’s settings).

**Syntax:** **`$today`**

**Returns:** DateTime

**Type:** n8n

## **`$vars`**

**Description:** The <a href="/code/variables/">variables</a> available to the workflow

**Syntax:** **`$vars`**

**Returns:** Object

**Type:** n8n

## **`$workflow`**

**Description:** Information about the current workflow

**Syntax:** **`$workflow`**

**Returns:** WorkflowData

**Type:** n8n

