# Array

## _`Array`_.**`append()`**

**Description:** Adds new elements to the end of the array. Similar to <code>push()</code>, but returns the modified array. Consider using spread syntax instead (see examples).

**Syntax:** _`Array`_.append(elem1, elem2?, ..., elemN?)

**Returns:** Array

**Source:**  Custom n8n functionality

**Parameters:**

  * `elem1` (any) - The first element to append
  * `elem2` (any) - optional - The second element to append
  * `elemN` (any) - optional - The Nth element to append

**Examples:**

  ```javascript
  // arr = ['forget', 'me']
  arr.append('not') //=> arr = ['forget', 'me', 'not']
  ```

  ```javascript
  // arr = [9, 0, 2]
  arr.append(1, 0) //=> [9, 0, 2, 1, 0]
  
  // Consider using spread syntax instead
  [...arr, 1, 0]  //=> [9, 0, 2, 1, 0]
  ```

## _`Array`_.**`average()`**

**Description:** Returns the average of the numbers in the array. Throws an error if there are any non-numbers.

**Syntax:** _`Array`_.average()

**Returns:** Number

**Source:**  Custom n8n functionality

**Examples:**

  ```javascript
  // arr = [12, 1, 5]
  arr.average() //=> 6
  ```

## _`Array`_.**`chunk()`**

**Description:** Splits the array into an array of sub-arrays, each with the given length

**Syntax:** _`Array`_.chunk(length)

**Returns:** Array

**Source:**  Custom n8n functionality

**Parameters:**

  * `length` (Number) - The number of elements in each chunk

**Examples:**

  ```javascript
  // arr = [1, 2, 3, 4, 5, 6]
  arr.chunk(2) //=> [ [1,2], [3,4], [5,6] ]
  ```

## _`Array`_.**`compact()`**

**Description:** Removes any empty values from the array. <code>null</code>, <code>""</code> and <code>undefined</code> count as empty.

**Syntax:** _`Array`_.compact()

**Returns:** Array

**Source:**  Custom n8n functionality

**Examples:**

  ```javascript
  // arr = [2, null, 1, ""]
  arr.compact() //=> [2, 1]
  ```

## _`Array`_.**`concat()`**

**Description:** Joins one or more arrays onto the end of the base array

**Syntax:** _`Array`_.concat(array2, array3?, ... arrayN?)

**Returns:** Array

**Source:** JavaScript function

**Parameters:**

  * `array2` (Array) - The first array to be joined on the end of the base array
  * `array3` (Array) - optional - The second array to be joined on to the end of the base array
  * `arrayN` (Array) - optional - The Nth array to be joined on to the end of the base array

**Examples:**

  ```javascript
  // arr1 = ['Nathan', 'Jan']
  arr1.concat(['Steve', 'Bill']) // ['Nathan', 'Jan', 'Steve', 'Bill']
  ```

  ```javascript
  // arr1 = [5, 4]
  // arr2 = [100, 101]
  // arr3 = ['a', 'b']
  arr1.concat(arr2, arr3) // [5, 4, 100, 101, 'a', 'b']
  ```

## _`Array`_.**`difference()`**

**Description:** Compares two arrays. Returns all elements in the base array that aren't present
in <code>otherArray</code>.

**Syntax:** _`Array`_.difference(otherArray)

**Returns:** Array

**Source:**  Custom n8n functionality

**Parameters:**

  * `otherArray` (Array) - The array to compare to the base array

**Examples:**

  ```javascript
  // arr = [1, 2, 3]
  arr.difference([2, 3]) //=> [1]
  ```

## _`Array`_.**`filter()`**

**Description:** Returns an array with only the elements satisfying a condition. The condition is a function that returns <code>true</code> or <code>false</code>.

**Syntax:** _`Array`_.filter(function(element, index?, array?), thisValue?)

**Returns:** Array

**Source:** JavaScript function

**Parameters:**

  * `function()` (function) - A function to run for each array element. If it returns <code>true</code>, the element will be kept. Consider using <a href=”https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions”>arrow function notation</a> to save space.
  * `element` (any) - The value of the current element
  * `index` (Number) - optional - The position of the current element in the array (starting at 0)
  * `array` (Array) - optional - The array being processed. Rarely needed.
  * `thisValue` (any) - optional - A value passed to the function as its <code>this</code> value. Rarely needed.

**Examples:**

  ```javascript
  // Keep ages over 18 (using arrow function notation):
  // ages = [12, 33, 16, 40]
  ages.filter(age => (age > 18)) //=> [33, 40]
  ```

  ```javascript
  // Keep names under 5 letters long (using arrow function notation):
  // names = ['Nathan', 'Bob', 'Sebastian']
  ages.filter(age => (age.length < 5)) //=> ["Bob"]
  
  // Or using traditional function notation:
  ages.filter(function(age){return age.length < 5}) //=> ["Bob"]
  ```

  ```javascript
  // Keep numbers at odd indexes
  // nums = [1, 7, 3, 10, 5]
  ages.filter((num, index) => {return index%2 != 0}) //=> [7, 10]
  ```

## _`Array`_.**`find()`**

**Description:** Returns the first element from the array that satisfies the provided condition. The condition is a function that returns <code>true</code> or <code>false</code>. Returns <code>undefined</code> if no matches are found.

If you need all matching elements, use <code>filter()</code>.

**Syntax:** _`Array`_.find(function(element, index?, array?), thisValue?)

**Returns:** any

**Source:** JavaScript function

**Parameters:**

  * `function()` (function) - A function to run for each array element. As soon as it returns <code>true</code>, that element will be returned. Consider using <a href=”https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions”>arrow function notation</a> to save space.
  * `element` (any) - The value of the current element
  * `index` (Number) - optional - The position of the current element in the array (starting at 0)
  * `array` (Array) - optional - The array of the current element. Rarely needed.
  * `thisValue` (any) - optional - A value passed to the function as its <code>this</code> value. Rarely needed.

**Examples:**

  ```javascript
  // Find first age over 18 (using arrow function notation):
  // ages = [12, 33, 16, 40]
  ages.find(age => (age > 18)) //=> 33
  ```

  ```javascript
  // Find first name under 5 letters long (using arrow function notation):
  // names = ['Nathan', 'Bob', 'Sebastian']
  ages.find(age => (age.length < 5)) //=> 'Bob'
  
  // Or using traditional function notation:
  ages.find(function(age){return age.length < 5}) //=> 'Bob'
  ```

## _`Array`_.**`first()`**

**Description:** Returns the first element of the array

**Syntax:** _`Array`_.first()

**Returns:** any

**Source:**  Custom n8n functionality

**Examples:**

  ```javascript
  // arr = ['quick', 'brown', 'fox']
  arr.first() //=> 'quick'
  ```

## _`Array`_.**`includes()`**

**Description:** Returns <code>true</code> if the array contains the specified element

**Syntax:** _`Array`_.includes(element, start?)

**Returns:** Boolean

**Source:** JavaScript function

**Parameters:**

  * `element` (any) - The value to search the array for
  * `start` (Number) - optional - The index to start looking from

**Examples:**

  ```javascript
  // names = ["Bob", "Bill", "Nat"];
  names.includes("Nat") //=> true
  names.includes("Nathan") //=> false
  ```

## _`Array`_.**`indexOf()`**

**Description:** Returns the position of the first matching element in the array, or -1 if the element isn’t found. Positions start at 0.

**Syntax:** _`Array`_.indexOf(element, start?)

**Returns:** Number

**Source:** JavaScript function

**Parameters:**

  * `element` (any) - The value to look for
  * `start` (Number) - optional - The index to start looking from

**Examples:**

  ```javascript
  // names = ["Bob", "Bill", "Nat"];
  names.indexOf("Nat") //=> 2
  ```

  ```javascript
  // names = ["Bob", "Bill", "Nat"];
  names.indexOf("Nathan") //=> -1
  ```

## _`Array`_.**`intersection()`**

**Description:** Compares two arrays. Returns all elements in the base array that are also present in the other array.

**Syntax:** _`Array`_.intersection(otherArray)

**Returns:** Array

**Source:**  Custom n8n functionality

**Parameters:**

  * `otherArray` (Array) - The array to compare to the base array

**Examples:**

  ```javascript
  // arr = [1, 2]
  arr.intersection([2, 3]) //=> [2]
  ```

## _`Array`_.**`isEmpty()`**

**Description:** Returns <code>true</code> if the array has no elements or is <code>null</code>

**Syntax:** _`Array`_.isEmpty()

**Returns:** Boolean

**Source:**  Custom n8n functionality

**Examples:**

  ```javascript
  // arr = []
  arr.isEmpty() //=> true
  ```

  ```javascript
  // arr = ['quick', 'brown', 'fox']
  arr.isEmpty() //=> false
  ```

## _`Array`_.**`isNotEmpty()`**

**Description:** Returns <code>true</code> if the array has at least one element

**Syntax:** _`Array`_.isNotEmpty()

**Returns:** Boolean

**Source:**  Custom n8n functionality

**Examples:**

  ```javascript
  // arr = ['quick', 'brown', 'fox']
  arr.isNotEmpty() //=> true
  ```

  ```javascript
  // arr = []
  arr.isNotEmpty() //=> false
  ```

## _`Array`_.**`join()`**

**Description:** Merges all elements of the array into a single string, with an optional separator between each element.

The opposite of <code>split()</code>.

**Syntax:** _`Array`_.join(separator?)

**Returns:** String

**Source:** JavaScript function

**Parameters:**

  * `separator` (String) - optional - The character(s) to insert between each element

**Examples:**

  ```javascript
  // arr = ['Wind', 'Water', 'Fire']
  a.join(" + ") //=> 'Wind + Water + Fire'
  ```

  ```javascript
  // arr = ['Wind', 'Water', 'Fire']
  a.join() //=> 'Wind,Water,Fire'
  a.join("") //=> 'WindWaterFire'
  ```

## _`Array`_.**`last()`**

**Description:** Returns the last element of the array

**Syntax:** _`Array`_.last()

**Returns:** any

**Source:**  Custom n8n functionality

**Examples:**

  ```javascript
  // arr = ['quick', 'brown', 'fox']
  arr.last() //=> 'fox'
  
  ```

## _`Array`_.**`length`**

**Description:** The number of elements in the array

**Syntax:** _`Array`_.length

**Returns:** Number

**Source:** JavaScript function

**Examples:**

  ```javascript
  // names = ["Bob", "Bill", "Nat"];
  names.length //=> 3
  ```

## _`Array`_.**`map()`**

**Description:** Creates a new array by applying a function to each element of the original array

**Syntax:** _`Array`_.map(function(element, index?, array?), thisValue?)

**Returns:** Array

**Source:** JavaScript function

**Parameters:**

  * `function()` (function) - A function to run for each array element. In the new array, the output of this function takes the place of the element. Consider using <a href=”https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions”>arrow function notation</a> to save space.
  * `element` (any) - The value of the current element
  * `index` (Number) - optional - The position of the current element in the array (starting at 0)
  * `array` (Array) - optional - The array of the current element. Rarely needed.
  * `thisValue` (any) - optional - A value passed to the function as its <code>this</code> value. Rarely needed.

**Examples:**

  ```javascript
  // Double all numbers (using arrow function notation):
  // nums = [12, 33, 16]
  nums.map(num => num*2) //=> [24, 66, 32]
  ```

  ```javascript
  // Convert elements to uppercase (using arrow function notation):
  // words = ['hello', 'old', 'chap']
  words.map(word => word.toUpperCase()) //=> ['HELLO', 'OLD', 'CHAP']]
  
  // Or using traditional function notation:
  words.map(function(word){return word.toUpperCase()}) //=> ['HELLO', 'OLD', 'CHAP']]
  ```

## _`Array`_.**`max()`**

**Description:** Returns the largest number in the array. Throws an error if there are any non-numbers.

**Syntax:** _`Array`_.max()

**Returns:** Number

**Source:**  Custom n8n functionality

**Examples:**

  ```javascript
  // arr = [1, 12, 5]
  arr.max() //=> 12
  
  ```

## _`Array`_.**`min()`**

**Description:** Returns the smallest number in the array. Throws an error if there are any non-numbers.

**Syntax:** _`Array`_.min()

**Returns:** Number

**Source:**  Custom n8n functionality

**Examples:**

  ```javascript
  // arr = [12, 1, 5]
  arr.min() //=> 1
  ```

## _`Array`_.**`pluck()`**

**Description:** Returns an array containing the values of the given field(s) in each Object of the array. Ignores any array elements that aren’t Objects or don’t have a key matching the field name(s) provided.

**Syntax:** _`Array`_.pluck(fieldName1?, fieldName2?, …)

**Returns:** Array

**Source:**  Custom n8n functionality

**Parameters:**

  * `fieldName1` (String) - optional - The first key to retrieve the value of
  * `fieldName2` (String) - optional - The second key to retrieve the value of

**Examples:**

  ```javascript
  // arr = [{'name':'Nathan','age':42},{'name':'Jan','city':'Berlin'}]
  arr.pluck('name') //=> ["Nathan", "Jan"]
  ```

  ```javascript
  // arr = [{'name':'Nathan','age':42},{'name':'Jan','city':'Berlin'}]
  arr.pluck('age') //=> [42]
  ```

## _`Array`_.**`randomItem()`**

**Description:** Returns a randomly-chosen element from the array

**Syntax:** _`Array`_.randomItem()

**Returns:** any

**Source:**  Custom n8n functionality

**Examples:**

  ```javascript
  // arr = ['quick', 'brown', 'fox']
  arr.randomItem() //=> 'brown'
  arr.randomItem() //=> 'quick'
  ```

## _`Array`_.**`reduce()`**

**Description:** Reduces an array to a single value by applying a function to each element. The function combines the current element with the result of reducing the previous elements, producing a new result.

**Syntax:** _`Array`_.reduce(function(prevResult, currentElem, currentIndex?, array?), initResult)

**Source:** JavaScript function

**Parameters:**

  * `function()` (function) - A function to run for each array element. Takes the accumulated result and the current element, and returns a new accumulated result. Consider using <a href=”https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions”>arrow function notation</a> to save space.
  * `prevResult` (any) - The accumulated result from applying the function to previous elements. When processing the first element, it’s set to <code>initResult</code> (or the first array element if not specified).
  * `currentElem` (any) - The value in the array currently being processed
  * `currentIndex` (Number) - optional - The position of the current element in the array (starting at 0)
  * `array` (Array) - optional - The array being processed. Rarely needed.
  * `initResult` (any) - optional - The initial value of the prevResult, used when calling the function on the first array element. When not specified it’s set to the first array element, and the first function call is on the second array element instead of the first.

**Examples:**

  ```javascript
  // Sum numbers (using arrow function notation):
  // nums = [12, 33, 16]
  nums.reduce((result, num) => (result+num), 0) //=> 61
  ```

  ```javascript
  // Join letters and uppercase (using arrow function notation):
  // chars = ['a', 'b', 'c']
  chars.reduce((result, char) => (result+char.toUpperCase()), '') //=> 'ABC'
  
  // Or using traditional function notation:
  chars.reduce(function(result, char){return result+char.toUpperCase()}, '') //=> 'ABC'
  ```

## _`Array`_.**`removeDuplicates()`**

**Description:** Removes any re-occurring elements from the array

**Syntax:** _`Array`_.removeDuplicates(keys?)

**Returns:** Array

**Source:**  Custom n8n functionality

**Parameters:**

  * `keys` (String) - optional - For use on arrays of Objects. A key, or comma-separated list of keys to restrict the check to. If omitted, all keys are checked.

**Examples:**

  ```javascript
  // arr = ['quick', 'brown', 'quick']
  arr.removeDuplicates() //=> ['quick', 'brown']
  ```

## _`Array`_.**`renameKeys()`**

**Description:** Changes all matching keys (field names) of any Objects in the array. Rename more than one key by
adding extra arguments, i.e. <code>from1, to1, from2, to2, ...</code>.

**Syntax:** _`Array`_.renameKeys(from, to)

**Returns:** Array

**Source:**  Custom n8n functionality

**Parameters:**

  * `from` (String) - The key to rename
  * `to` (String) - The new key name

**Examples:**

  ```javascript
  // arr = [{'name':'bob'},{'name':'meg'}]
  arr.renameKeys('name', 'x') //=> [{"x": "bob"},{"x": "meg"}]]
  ```

## _`Array`_.**`reverse()`**

**Description:** Reverses the order of the elements in the array

**Syntax:** _`Array`_.reverse()

**Returns:** Array

**Source:** JavaScript function

**Examples:**

  ```javascript
  // arr = ['dog', 'bites', 'man']
  arr.reverse() //=> ['man', 'bites', 'dog']
  ```

## _`Array`_.**`slice()`**

**Description:** Returns a portion of the array, from the <code>start</code> index up to (but not including) the <code>end</code> index. Indexes start at 0.

**Syntax:** _`Array`_.slice(start, end)

**Returns:** Array

**Source:** JavaScript function

**Parameters:**

  * `start` (Number) - optional - The position to start from. Positions start at 0. Negative numbers count back from the end of the array.
  * `end` (Number) - optional - The position to select up to. The element at the end position is not included. Negative numbers select from the end of the array. If omitted, will extract to the end of the array.

**Examples:**

  ```javascript
  // arr = [1, 2, 3, 4, 5]
  arr.slice(2, 4) //=> [3, 4]
  ```

  ```javascript
  // arr = [1, 2, 3, 4, 5]
  arr.slice(2) //=> [3, 4, 5]
  ```

  ```javascript
  // arr = [1, 2, 3, 4, 5]
  arr.slice(-2) //=> [4, 5]
  ```

## _`Array`_.**`smartJoin()`**

**Description:** Creates a single Object from an array of Objects. Each Object in the array provides one field for the returned Object. Each Object in the array must contain a field with the key name and a field with the value.

**Syntax:** _`Array`_.smartJoin(keyField, nameField)

**Returns:** Object

**Source:**  Custom n8n functionality

**Parameters:**

  * `keyField` (String) - The field in each Object containing the key name
  * `nameField` (String) - The field in each Object containing the value

**Examples:**

  ```javascript
  // arr => [{'field':'age','value':2},{'field':'city','value':'Berlin'}]
  arr.smartJoin('field','value') //=> {"age": 2, "city": "Berlin"}
  ```

## _`Array`_.**`sort()`**

**Description:** Reorders the elements of the array. For sorting strings alphabetically, no parameter is required. For sorting numbers or Objects, see examples.

**Syntax:** _`Array`_.sort(compareFunction(a, b)?)

**Returns:** Array

**Source:** JavaScript function

**Parameters:**

  * `compareFunction` (function) - optional - A function to compare two array elements and return a number indicating which one comes first:
<b>Return < 0</b>: <code>a</code> comes before <code>b</code>
<b>Return 0</b>: <code>a</code> and <code>b</code> are equal (leave order unchanged)
<b>Return > 0</b>: <code>b</code> comes before <code>a</code>

If no function is specified, converts all values to strings and compares their character codes.
  * `a` (any) - The first element to compare in the function
  * `b` (any) - The second element to compare in the function

**Examples:**

  ```javascript
  // No need for a param when sorting strings
  // arr = ['d', 'a', 'c', 'b']
  arr.sort() //=> ['a', 'b', 'c', 'd']
  ```

  ```javascript
  // To sort numbers, you must use a function
  // arr = [4, 2, 1, 3]
  arr.sort((a, b) => (a - b)) //=> [1, 2, 3, 4]
  
  // Or using traditional function notation:
  arr.sort(function(a, b){return a - b}) //=> [1, 2, 3, 4]
  ```

  ```javascript
  // Sort in reverse alphabetical order
  // arr = ['d', 'a', 'c', 'b']
  arr.sort((a, b) => b.localeCompare(a)) //=> ['d', 'c', 'b', 'a']
  ```

  ```javascript
  // Sort array of objects by a property
  // arr = [{name:'Zak'}, {name:'Abe'}, {name:'Bob'}]
  arr.sort((a, b) => a.name.localeCompare(b.name)) //=> [{name:'Abe'}, {name:'Bob'}, {name:'Zak'}]
  ```

## _`Array`_.**`sum()`**

**Description:** Returns the total of all the numbers in the array. Throws an error if there are any non-numbers.

**Syntax:** _`Array`_.sum()

**Returns:** Number

**Source:**  Custom n8n functionality

**Examples:**

  ```javascript
  // arr = [12, 1, 5]
  arr.sum() //=> 18
  ```

## _`Array`_.**`toJsonString()`**

**Description:** Converts the array to a JSON string. The same as JavaScript’s <code>JSON.stringify()</code>.

**Syntax:** _`Array`_.toJsonString()

**Returns:** String

**Source:**  Custom n8n functionality

**Examples:**

  ```javascript
  // obj = ['quick', 'brown', 'fox']
  obj.toJsonString() //=> '["quick","brown","fox"]'
  ```

## _`Array`_.**`toSpliced()`**

**Description:** Adds and/or removes array elements at a given position. 

See also <code>slice()</code> and <code>append()</code>.

**Syntax:** _`Array`_.toSpliced(start, deleteCount, elem1, ....., elemN)

**Returns:** Array

**Source:** JavaScript function

**Parameters:**

  * `start` (Number) - The index (position) to add or remove elements at.  New elements are inserted before the element at this index. A negative index counts back from the end of the array. 
  * `deleteCount` (Number) - optional - The number of elements to remove. If omitted, removes all elements from the <code>start</code> index onwards.
  * `elem1` (any) - optional - The first new element to be added
  * `elem2` (any) - optional - The second new element to be added
  * `elemN` (any) - optional - The Nth new element to be added

**Examples:**

  ```javascript
  // Insert element at index 1
  // months = ['Jan', 'Mar']
  months.toSpliced(1, 0, "Feb") // ['Jan', 'Feb', 'Mar']
  ```

  ```javascript
  // Delete 2 elements starting at index 1
  // arr = ["don't", "make", "me", "do", "this"]
  arr.toSpliced(1, 2) // ["don't", "do", "this"]
  ```

  ```javascript
  // Replace 2 elements starting at index 1
  // arr = ["don't", "be", "evil"]
  arr.toSpliced(1, 2, 'eat', 'slugs') // ["don't", "eat", "slugs"]
  ```

## _`Array`_.**`toString()`**

**Description:** Converts the array to a string, with values separated by commas. To use a different separator, use <code>join()</code> instead.

**Syntax:** _`Array`_.toString()

**Returns:** String

**Source:** JavaScript function

**Examples:**

  ```javascript
  // words = ['make', 'my', 'day']
  words.toString() //=> 'make,my,day'
  ```

## _`Array`_.**`union()`**

**Description:** Concatenates two arrays and then removes any duplicates

**Syntax:** _`Array`_.union(otherArray)

**Returns:** Array

**Source:**  Custom n8n functionality

**Parameters:**

  * `otherArray` (Array) - The array to union with the base array

**Examples:**

  ```javascript
  // arr = [1, 2]
  arr.union([2, 3]) //=> [1, 2, 3]
  
  ```

## _`Array`_.**`unique()`**

**Description:** Removes any duplicate elements from the array

**Syntax:** _`Array`_.unique()

**Returns:** Array

**Source:**  Custom n8n functionality

**Examples:**

  ```javascript
  // arr = ['quick', 'brown', 'quick']
  arr.unique() //=> ['quick', 'brown']
  ```

