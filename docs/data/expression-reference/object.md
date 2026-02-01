# Object

## _`Object`_.**`compact()`**

**Description:** Removes all fields that have empty values, i.e. are <code>null</code> or <code>""</code>

**Syntax:** _`Object`_.compact()

**Returns:** Object

**Type:** n8n

**Examples:**

  ```javascript
  // obj = {'x':null, 'y':2, 'z':''}
  obj.compact() //=> {'y':2}
  ```

## _`Object`_.**`hasField()`**

**Description:** Returns <code>true</code> if there is a field called <code>name</code>. Only checks top-level keys. Comparison is case-sensitive.

**Syntax:** _`Object`_.hasField(name)

**Returns:** Boolean

**Type:** n8n

**Parameters:**
  * `name` (String) - The name of the key to search for

**Examples:**

  ```javascript
  // obj = {'name':'Nathan', 'age':42}
  obj.hasField('name') //=> true
  ```

  ```javascript
  // obj = {'name':'Nathan', 'age':42}
  obj.hasField('Name') //=> false
  obj.hasField('inventedField') //=> false
  ```

## _`Object`_.**`isEmpty()`**

**Description:** Returns <code>true</code> if the Object has no keys (fields) set or is <code>null</code>

**Syntax:** _`Object`_.isEmpty()

**Returns:** Boolean

**Type:** n8n

**Examples:**

  ```javascript
  // obj = {'name': 'Nathan'}
  obj.isEmpty() //=> false
  ```

  ```javascript
  // obj = {}
  obj.isEmpty() //=> true
  ```

## _`Object`_.**`isNotEmpty()`**

**Description:** Returns <code>true</code> if the Object has at least one key (field) set

**Syntax:** _`Object`_.isNotEmpty()

**Returns:** Boolean

**Type:** n8n

**Examples:**

  ```javascript
  // obj = {'name': 'Nathan'}
  obj.isNotEmpty() //=> true
  ```

  ```javascript
  // obj = {}
  obj.isNotEmpty() //=> false
  ```

## _`Object`_.**`keepFieldsContaining()`**

**Description:** Removes any fields whose values don’t at least partly match the given <code>value</code>. Comparison is case-sensitive. Fields that aren’t strings will always be removed.

**Syntax:** _`Object`_.keepFieldsContaining(value)

**Returns:** Object

**Type:** n8n

**Parameters:**
  * `value` (String) - The text that a value must contain in order to be kept

**Examples:**

  ```javascript
  // obj = {'name': 'Mr Nathan', 'city':'hanoi', age: 42 }
  obj.keepFieldsContaining('Nathan') //=> {'name': 'Mr Nathan'}
  ```

  ```javascript
  // obj = {'name': 'Mr Nathan', 'city':'hanoi', age: 42 }
  obj.keepFieldsContaining('nathan') //=> {}
  obj.keepFieldsContaining('han') //=> {'name': 'Mr Nathan', 'city':'hanoi'}
  ```

## _`Object`_.**`keys()`**

**Description:** Returns an array with all the field names (keys) the object contains. The same as JavaScript’s <code>Object.keys(obj)</code>.

**Syntax:** _`Object`_.keys()

**Returns:** Array<String>

**Type:** n8n

**Examples:**

  ```javascript
  // obj = {'name': 'Mr Nathan', age: 42 }
  obj.keys() //=> ['name', 'age']
  ```

## _`Object`_.**`merge()`**

**Description:** Merges the two Objects into a single one. If a key (field name) exists in both Objects, the value from the first (base) Object is used.

**Syntax:** _`Object`_.merge(otherObject)

**Returns:** Object

**Type:** n8n

**Parameters:**
  * `otherObject` (Object) - The Object to merge with the base Object.

**Examples:**

  ```javascript
  // obj1 = {'name':'Nathan', 'age': 42}
  // obj2 = {'name':'Jan', 'city': 'hanoi'}
  obj1.merge(obj2) //=> {'name':'Jan', 'city': 'hanoi', 'age':42}
  ```

## _`Object`_.**`removeField()`**

**Description:** Removes a field from the Object. The same as JavaScript’s <code>delete</code>.

**Syntax:** _`Object`_.removeField(key)

**Returns:** Object

**Type:** n8n

**Parameters:**
  * `key` (String) - The name of the field to remove

**Examples:**

  ```javascript
  // obj = {'name':'Nathan', 'city':'hanoi'}
  obj.removeField('name') //=> {'city':'hanoi'}
  ```

## _`Object`_.**`removeFieldsContaining()`**

**Description:** Removes keys (fields) whose values at least partly match the given <code>value</code>. Comparison is case-sensitive. Fields that aren’t strings are always kept.

**Syntax:** _`Object`_.removeFieldsContaining(value)

**Returns:** Object

**Type:** n8n

**Parameters:**
  * `value` (String) - The text that a value must contain in order to be removed

**Examples:**

  ```javascript
  // obj = {'name': 'Mr Nathan', 'city':'hanoi', age: 42}
  obj.removeFieldsContaining('Nathan') //=> {'city':'hanoi', age: 42}
  ```

  ```javascript
  // obj = {'name': 'Mr Nathan', 'city':'hanoi', age: 42}
  obj.removeFieldsContaining('han') //=> {age: 42}
  obj.removeFieldsContaining('nathan') //=> {'name': 'Mr Nathan', 'city':'hanoi', age: 42}
  ```

## _`Object`_.**`toJsonString()`**

**Description:** Converts the Object to a JSON string. Similar to JavaScript’s <code>JSON.stringify()</code>.

**Syntax:** _`Object`_.toJsonString()

**Returns:** String

**Type:** n8n

**Examples:**

  ```javascript
  // obj = {'name':'Nathan', age:42}
  obj.toJsonString() //=> '{"name":"Nathan","age":42}'
  
  ```

## _`Object`_.**`urlEncode()`**

**Description:** Generates a URL parameter string from the Object’s keys and values. Only top-level keys are supported.

**Syntax:** _`Object`_.urlEncode()

**Returns:** String

**Type:** n8n

**Examples:**

  ```javascript
  // obj = {'name':'Mr Nathan', 'city':'hanoi'}
  obj.urlEncode() //=> 'name=Mr+Nathan&city=hanoi'
  ```

## _`Object`_.**`values()`**

**Description:** Returns an array with all the values of the fields the Object contains. The same as JavaScript’s <code>Object.values(obj)</code>.

**Syntax:** _`Object`_.values()

**Returns:** Array<String>

**Type:** n8n

**Examples:**

  ```javascript
  // obj = {'name': 'Mr Nathan', age: 42 }
  obj.values() //=> ['Mr Nathan', 42]
  ```

