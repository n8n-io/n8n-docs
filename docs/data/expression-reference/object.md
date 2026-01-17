# Object

## removeField()

* **Description:** Removes a field from the Object. The same as JavaScript’s `delete`.
* **Definition:** removeField(key)
* **Returns:** Object
* **Source:** n8n
* **Parameters:**
  * `key` (String) - The name of the field to remove
* **Examples:**

  ```javascript
  // obj = {'name':'Nathan', 'city':'hanoi'}
  obj.removeField('name') //=> {'city':'hanoi'}
  ```

## values()

* **Description:** Returns an array with all the values of the fields the Object contains. The same as JavaScript’s `Object.values(obj)`.
* **Definition:** values()
* **Returns:** Array<String>
* **Source:** n8n
* **Examples:**

  ```javascript
  // obj = {'name': 'Mr Nathan', age: 42 }
  obj.values() //=> ['Mr Nathan', 42]
  ```

## urlEncode()

* **Description:** Generates a URL parameter string from the Object’s keys and values. Only top-level keys are supported.
* **Definition:** urlEncode()
* **Returns:** String
* **Source:** n8n
* **Examples:**

  ```javascript
  // obj = {'name':'Mr Nathan', 'city':'hanoi'}
  obj.urlEncode() //=> 'name=Mr+Nathan&city=hanoi'
  ```

## keys()

* **Description:** Returns an array with all the field names (keys) the object contains. The same as JavaScript’s `Object.keys(obj)`.
* **Definition:** keys()
* **Returns:** Array<String>
* **Source:** n8n
* **Examples:**

  ```javascript
  // obj = {'name': 'Mr Nathan', age: 42 }
  obj.keys() //=> ['name', 'age']
  ```

## isEmpty()

* **Description:** Returns `true` if the Object has no keys (fields) set or is `null`
* **Definition:** isEmpty()
* **Returns:** Boolean
* **Source:** n8n
* **Examples:**

  ```javascript
  // obj = {'name': 'Nathan'}
  obj.isEmpty() //=> false
  ```

  ```javascript
  // obj = {}
  obj.isEmpty() //=> true
  ```

## keepFieldsContaining()

* **Description:** Removes any fields whose values don’t at least partly match the given `value`. Comparison is case-sensitive. Fields that aren’t strings will always be removed.
* **Definition:** keepFieldsContaining(value)
* **Returns:** Object
* **Source:** n8n
* **Parameters:**
  * `value` (String) - The text that a value must contain in order to be kept
* **Examples:**

  ```javascript
  // obj = {'name': 'Mr Nathan', 'city':'hanoi', age: 42 }
  obj.keepFieldsContaining('Nathan') //=> {'name': 'Mr Nathan'}
  ```

  ```javascript
  // obj = {'name': 'Mr Nathan', 'city':'hanoi', age: 42 }
  obj.keepFieldsContaining('nathan') //=> {}
  obj.keepFieldsContaining('han') //=> {'name': 'Mr Nathan', 'city':'hanoi'}
  ```

## removeFieldsContaining()

* **Description:** Removes keys (fields) whose values at least partly match the given `value`. Comparison is case-sensitive. Fields that aren’t strings are always kept.
* **Definition:** removeFieldsContaining(value)
* **Returns:** Object
* **Source:** n8n
* **Parameters:**
  * `value` (String) - The text that a value must contain in order to be removed
* **Examples:**

  ```javascript
  // obj = {'name': 'Mr Nathan', 'city':'hanoi', age: 42}
  obj.removeFieldsContaining('Nathan') //=> {'city':'hanoi', age: 42}
  ```

  ```javascript
  // obj = {'name': 'Mr Nathan', 'city':'hanoi', age: 42}
  obj.removeFieldsContaining('han') //=> {age: 42}
  obj.removeFieldsContaining('nathan') //=> {'name': 'Mr Nathan', 'city':'hanoi', age: 42}
  ```

## isNotEmpty()

* **Description:** Returns `true` if the Object has at least one key (field) set
* **Definition:** isNotEmpty()
* **Returns:** Boolean
* **Source:** n8n
* **Examples:**

  ```javascript
  // obj = {'name': 'Nathan'}
  obj.isNotEmpty() //=> true
  ```

  ```javascript
  // obj = {}
  obj.isNotEmpty() //=> false
  ```

## compact()

* **Description:** Removes all fields that have empty values, i.e. are `null` or `""`
* **Definition:** compact()
* **Returns:** Object
* **Source:** n8n
* **Examples:**

  ```javascript
  // obj = {'x':null, 'y':2, 'z':''}
  obj.compact() //=> {'y':2}
  ```

## merge()

* **Description:** Merges the two Objects into a single one. If a key (field name) exists in both Objects, the value from the first (base) Object is used.
* **Definition:** merge(otherObject)
* **Returns:** Object
* **Source:** n8n
* **Parameters:**
  * `otherObject` (Object) - The Object to merge with the base Object.
* **Examples:**

  ```javascript
  // obj1 = {'name':'Nathan', 'age': 42}
  // obj2 = {'name':'Jan', 'city': 'hanoi'}
  obj1.merge(obj2) //=> {'name':'Jan', 'city': 'hanoi', 'age':42}
  ```

## toJsonString()

* **Description:** Converts the Object to a JSON string. Similar to JavaScript’s `JSON.stringify()`.
* **Definition:** toJsonString()
* **Returns:** String
* **Source:** n8n
* **Examples:**

  ```javascript
  // obj = {'name':'Nathan', age:42}
  obj.toJsonString() //=> '{"name":"Nathan","age":42}'
  
  ```

## hasField()

* **Description:** Returns `true` if there is a field called `name`. Only checks top-level keys. Comparison is case-sensitive.
* **Definition:** hasField(name)
* **Returns:** Boolean
* **Source:** n8n
* **Parameters:**
  * `name` (String) - The name of the key to search for
* **Examples:**

  ```javascript
  // obj = {'name':'Nathan', 'age':42}
  obj.hasField('name') //=> true
  ```

  ```javascript
  // obj = {'name':'Nathan', 'age':42}
  obj.hasField('Name') //=> false
  obj.hasField('inventedField') //=> false
  ```

