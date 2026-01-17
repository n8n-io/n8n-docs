# Array

## compact()

* **Description:** Removes any empty values from the array. `null`, `""` and `undefined` count as empty.
* **Definition:** compact()
* **Returns:** Array
* **Source:** n8n
* **Examples:**

  ```javascript
  // arr = [2, null, 1, ""]
  arr.compact() //=> [2, 1]
  ```

## removeDuplicates()

* **Description:** Removes any re-occurring elements from the array
* **Definition:** removeDuplicates(keys?)
* **Returns:** Array
* **Source:** n8n
* **Parameters:**
  * `keys` (String) - optional - For use on arrays of Objects. A key, or comma-separated list of keys to restrict the check to. If omitted, all keys are checked.
* **Examples:**

  ```javascript
  // arr = ['quick', 'brown', 'quick']
  arr.removeDuplicates() //=> ['quick', 'brown']
  ```

## pluck()

* **Description:** Returns an array containing the values of the given field(s) in each Object of the array. Ignores any array elements that aren’t Objects or don’t have a key matching the field name(s) provided.
* **Definition:** pluck(fieldName1?, fieldName2?, …)
* **Returns:** Array
* **Source:** n8n
* **Parameters:**
  * `fieldName1` (String) - optional - The first key to retrieve the value of
  * `fieldName2` (String) - optional - The second key to retrieve the value of
* **Examples:**

  ```javascript
  // arr = [{'name':'Nathan','age':42},{'name':'Jan','city':'Berlin'}]
  arr.pluck('name') //=> ["Nathan", "Jan"]
  ```

  ```javascript
  // arr = [{'name':'Nathan','age':42},{'name':'Jan','city':'Berlin'}]
  arr.pluck('age') //=> [42]
  ```

## sort()

* **Description:** Reorders the elements of the array. For sorting strings alphabetically, no parameter is required. For sorting numbers or Objects, see examples.
* **Definition:** sort(compareFunction(a, b)?)
* **Returns:** Array
* **Source:** JS
* **Parameters:**
  * `compareFunction` (function) - optional - A function to compare two array elements and return a number indicating which one comes first:
<b>Return < 0</b>: <code>a</code> comes before <code>b</code>
<b>Return 0</b>: <code>a</code> and <code>b</code> are equal (leave order unchanged)
<b>Return > 0</b>: <code>b</code> comes before <code>a</code>

If no function is specified, converts all values to strings and compares their character codes.
  * `a` (any) - The first element to compare in the function
  * `b` (any) - The second element to compare in the function
* **Examples:**

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

## first()

* **Description:** Returns the first element of the array
* **Definition:** first()
* **Returns:** any
* **Source:** n8n
* **Examples:**

  ```javascript
  // arr = ['quick', 'brown', 'fox']
  arr.first() //=> 'quick'
  ```

## reverse()

* **Description:** Reverses the order of the elements in the array
* **Definition:** reverse()
* **Returns:** Array
* **Source:** JS
* **Examples:**

  ```javascript
  // arr = ['dog', 'bites', 'man']
  arr.reverse() //=> ['man', 'bites', 'dog']
  ```

## min()

* **Description:** Returns the smallest number in the array. Throws an error if there are any non-numbers.
* **Definition:** min()
* **Returns:** Number
* **Source:** n8n
* **Examples:**

  ```javascript
  // arr = [12, 1, 5]
  arr.min() //=> 1
  ```

## max()

* **Description:** Returns the largest number in the array. Throws an error if there are any non-numbers.
* **Definition:** max()
* **Returns:** Number
* **Source:** n8n
* **Examples:**

  ```javascript
  // arr = [1, 12, 5]
  arr.max() //=> 12
  
  ```

## unique()

* **Description:** Removes any duplicate elements from the array
* **Definition:** unique()
* **Returns:** Array
* **Source:** n8n
* **Examples:**

  ```javascript
  // arr = ['quick', 'brown', 'quick']
  arr.unique() //=> ['quick', 'brown']
  ```

## union()

* **Description:** Concatenates two arrays and then removes any duplicates
* **Definition:** union(otherArray)
* **Returns:** Array
* **Source:** n8n
* **Parameters:**
  * `otherArray` (Array) - The array to union with the base array
* **Examples:**

  ```javascript
  // arr = [1, 2]
  arr.union([2, 3]) //=> [1, 2, 3]
  
  ```

## sum()

* **Description:** Returns the total of all the numbers in the array. Throws an error if there are any non-numbers.
* **Definition:** sum()
* **Returns:** Number
* **Source:** n8n
* **Examples:**

  ```javascript
  // arr = [12, 1, 5]
  arr.sum() //=> 18
  ```

## difference()

* **Description:** Compares two arrays. Returns all elements in the base array that aren't present
in `otherArray`.
* **Definition:** difference(otherArray)
* **Returns:** Array
* **Source:** n8n
* **Parameters:**
  * `otherArray` (Array) - The array to compare to the base array
* **Examples:**

  ```javascript
  // arr = [1, 2, 3]
  arr.difference([2, 3]) //=> [1]
  ```

## renameKeys()

* **Description:** Changes all matching keys (field names) of any Objects in the array. Rename more than one key by
adding extra arguments, i.e. `from1, to1, from2, to2, ...`.
* **Definition:** renameKeys(from, to)
* **Returns:** Array
* **Source:** n8n
* **Parameters:**
  * `from` (String) - The key to rename
  * `to` (String) - The new key name
* **Examples:**

  ```javascript
  // arr = [{'name':'bob'},{'name':'meg'}]
  arr.renameKeys('name', 'x') //=> [{"x": "bob"},{"x": "meg"}]]
  ```

## reduce()

* **Description:** Reduces an array to a single value by applying a function to each element. The function combines the current element with the result of reducing the previous elements, producing a new result.
* **Definition:** reduce(function(prevResult, currentElem, currentIndex?, array?), initResult)
* **Source:** JS
* **Parameters:**
  * `function()` (function) - A function to run for each array element. Takes the accumulated result and the current element, and returns a new accumulated result. Consider using <a href=”https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions”>arrow function notation</a> to save space.
  * `prevResult` (any) - The accumulated result from applying the function to previous elements. When processing the first element, it’s set to <code>initResult</code> (or the first array element if not specified).
  * `currentElem` (any) - The value in the array currently being processed
  * `currentIndex` (Number) - optional - The position of the current element in the array (starting at 0)
  * `array` (Array) - optional - The array being processed. Rarely needed.
  * `initResult` (any) - optional - The initial value of the prevResult, used when calling the function on the first array element. When not specified it’s set to the first array element, and the first function call is on the second array element instead of the first.
* **Examples:**

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

## map()

* **Description:** Creates a new array by applying a function to each element of the original array
* **Definition:** map(function(element, index?, array?), thisValue?)
* **Returns:** Array
* **Source:** JS
* **Parameters:**
  * `function()` (function) - A function to run for each array element. In the new array, the output of this function takes the place of the element. Consider using <a href=”https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions”>arrow function notation</a> to save space.
  * `element` (any) - The value of the current element
  * `index` (Number) - optional - The position of the current element in the array (starting at 0)
  * `array` (Array) - optional - The array of the current element. Rarely needed.
  * `thisValue` (any) - optional - A value passed to the function as its <code>this</code> value. Rarely needed.
* **Examples:**

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

## length

* **Description:** The number of elements in the array
* **Definition:** length
* **Returns:** Number
* **Source:** JS
* **Examples:**

  ```javascript
  // names = ["Bob", "Bill", "Nat"];
  names.length //=> 3
  ```

## toJsonString()

* **Description:** Converts the array to a JSON string. The same as JavaScript’s `JSON.stringify()`.
* **Definition:** toJsonString()
* **Returns:** String
* **Source:** n8n
* **Examples:**

  ```javascript
  // obj = ['quick', 'brown', 'fox']
  obj.toJsonString() //=> '["quick","brown","fox"]'
  ```

## toString()

* **Description:** Converts the array to a string, with values separated by commas. To use a different separator, use `join()` instead.
* **Definition:** toString()
* **Returns:** String
* **Source:** JS
* **Examples:**

  ```javascript
  // words = ['make', 'my', 'day']
  words.toString() //=> 'make,my,day'
  ```

## find()

* **Description:** Returns the first element from the array that satisfies the provided condition. The condition is a function that returns `true` or `false`. Returns `undefined` if no matches are found.

If you need all matching elements, use `filter()`.
* **Definition:** find(function(element, index?, array?), thisValue?)
* **Returns:** any
* **Source:** JS
* **Parameters:**
  * `function()` (function) - A function to run for each array element. As soon as it returns <code>true</code>, that element will be returned. Consider using <a href=”https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions”>arrow function notation</a> to save space.
  * `element` (any) - The value of the current element
  * `index` (Number) - optional - The position of the current element in the array (starting at 0)
  * `array` (Array) - optional - The array of the current element. Rarely needed.
  * `thisValue` (any) - optional - A value passed to the function as its <code>this</code> value. Rarely needed.
* **Examples:**

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

## isNotEmpty()

* **Description:** Returns `true` if the array has at least one element
* **Definition:** isNotEmpty()
* **Returns:** Boolean
* **Source:** n8n
* **Examples:**

  ```javascript
  // arr = ['quick', 'brown', 'fox']
  arr.isNotEmpty() //=> true
  ```

  ```javascript
  // arr = []
  arr.isNotEmpty() //=> false
  ```

## indexOf()

* **Description:** Returns the position of the first matching element in the array, or -1 if the element isn’t found. Positions start at 0.
* **Definition:** indexOf(element, start?)
* **Returns:** Number
* **Source:** JS
* **Parameters:**
  * `element` (any) - The value to look for
  * `start` (Number) - optional - The index to start looking from
* **Examples:**

  ```javascript
  // names = ["Bob", "Bill", "Nat"];
  names.indexOf("Nat") //=> 2
  ```

  ```javascript
  // names = ["Bob", "Bill", "Nat"];
  names.indexOf("Nathan") //=> -1
  ```

## isEmpty()

* **Description:** Returns `true` if the array has no elements or is `null`
* **Definition:** isEmpty()
* **Returns:** Boolean
* **Source:** n8n
* **Examples:**

  ```javascript
  // arr = []
  arr.isEmpty() //=> true
  ```

  ```javascript
  // arr = ['quick', 'brown', 'fox']
  arr.isEmpty() //=> false
  ```

## toSpliced()

* **Description:** Adds and/or removes array elements at a given position. 

See also `slice()` and `append()`.
* **Definition:** toSpliced(start, deleteCount, elem1, ....., elemN)
* **Returns:** Array
* **Source:** JS
* **Parameters:**
  * `start` (Number) - The index (position) to add or remove elements at.  New elements are inserted before the element at this index. A negative index counts back from the end of the array. 
  * `deleteCount` (Number) - optional - The number of elements to remove. If omitted, removes all elements from the <code>start</code> index onwards.
  * `elem1` (any) - optional - The first new element to be added
  * `elem2` (any) - optional - The second new element to be added
  * `elemN` (any) - optional - The Nth new element to be added
* **Examples:**

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

## last()

* **Description:** Returns the last element of the array
* **Definition:** last()
* **Returns:** any
* **Source:** n8n
* **Examples:**

  ```javascript
  // arr = ['quick', 'brown', 'fox']
  arr.last() //=> 'fox'
  
  ```

## join()

* **Description:** Merges all elements of the array into a single string, with an optional separator between each element.

The opposite of `split()`.
* **Definition:** join(separator?)
* **Returns:** String
* **Source:** JS
* **Parameters:**
  * `separator` (String) - optional - The character(s) to insert between each element
* **Examples:**

  ```javascript
  // arr = ['Wind', 'Water', 'Fire']
  a.join(" + ") //=> 'Wind + Water + Fire'
  ```

  ```javascript
  // arr = ['Wind', 'Water', 'Fire']
  a.join() //=> 'Wind,Water,Fire'
  a.join("") //=> 'WindWaterFire'
  ```

## intersection()

* **Description:** Compares two arrays. Returns all elements in the base array that are also present in the other array.
* **Definition:** intersection(otherArray)
* **Returns:** Array
* **Source:** n8n
* **Parameters:**
  * `otherArray` (Array) - The array to compare to the base array
* **Examples:**

  ```javascript
  // arr = [1, 2]
  arr.intersection([2, 3]) //=> [2]
  ```

## average()

* **Description:** Returns the average of the numbers in the array. Throws an error if there are any non-numbers.
* **Definition:** average()
* **Returns:** Number
* **Source:** n8n
* **Examples:**

  ```javascript
  // arr = [12, 1, 5]
  arr.average() //=> 6
  ```

## slice()

* **Description:** Returns a portion of the array, from the `start` index up to (but not including) the `end` index. Indexes start at 0.
* **Definition:** slice(start, end)
* **Returns:** Array
* **Source:** JS
* **Parameters:**
  * `start` (Number) - optional - The position to start from. Positions start at 0. Negative numbers count back from the end of the array.
  * `end` (Number) - optional - The position to select up to. The element at the end position is not included. Negative numbers select from the end of the array. If omitted, will extract to the end of the array.
* **Examples:**

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

## filter()

* **Description:** Returns an array with only the elements satisfying a condition. The condition is a function that returns `true` or `false`.
* **Definition:** filter(function(element, index?, array?), thisValue?)
* **Returns:** Array
* **Source:** JS
* **Parameters:**
  * `function()` (function) - A function to run for each array element. If it returns <code>true</code>, the element will be kept. Consider using <a href=”https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions”>arrow function notation</a> to save space.
  * `element` (any) - The value of the current element
  * `index` (Number) - optional - The position of the current element in the array (starting at 0)
  * `array` (Array) - optional - The array being processed. Rarely needed.
  * `thisValue` (any) - optional - A value passed to the function as its <code>this</code> value. Rarely needed.
* **Examples:**

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
  nums.filter((num, index) => {return index%2 != 0}) //=> [7, 10]
  ```

## concat()

* **Description:** Joins one or more arrays onto the end of the base array
* **Definition:** concat(array2, array3?, ... arrayN?)
* **Returns:** Array
* **Source:** JS
* **Parameters:**
  * `array2` (Array) - The first array to be joined on the end of the base array
  * `array3` (Array) - optional - The second array to be joined on to the end of the base array
  * `arrayN` (Array) - optional - The Nth array to be joined on to the end of the base array
* **Examples:**

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

## randomItem()

* **Description:** Returns a randomly-chosen element from the array
* **Definition:** randomItem()
* **Returns:** any
* **Source:** n8n
* **Examples:**

  ```javascript
  // arr = ['quick', 'brown', 'fox']
  arr.randomItem() //=> 'brown'
  arr.randomItem() //=> 'quick'
  ```

## chunk()

* **Description:** Splits the array into an array of sub-arrays, each with the given length
* **Definition:** chunk(length)
* **Returns:** Array
* **Source:** n8n
* **Parameters:**
  * `length` (Number) - The number of elements in each chunk
* **Examples:**

  ```javascript
  // arr = [1, 2, 3, 4, 5, 6]
  arr.chunk(2) //=> [ [1,2], [3,4], [5,6] ]
  ```

## includes()

* **Description:** Returns `true` if the array contains the specified element
* **Definition:** includes(element, start?)
* **Returns:** Boolean
* **Source:** JS
* **Parameters:**
  * `element` (any) - The value to search the array for
  * `start` (Number) - optional - The index to start looking from
* **Examples:**

  ```javascript
  // names = ["Bob", "Bill", "Nat"];
  names.includes("Nat") //=> true
  names.includes("Nathan") //=> false
  ```

## append()

* **Description:** Adds new elements to the end of the array. Similar to `push()`, but returns the modified array. Consider using spread syntax instead (see examples).
* **Definition:** append(elem1, elem2?, ..., elemN?)
* **Returns:** Array
* **Source:** n8n
* **Parameters:**
  * `elem1` (any) - The first element to append
  * `elem2` (any) - optional - The second element to append
  * `elemN` (any) - optional - The Nth element to append
* **Examples:**

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

## smartJoin()

* **Description:** Creates a single Object from an array of Objects. Each Object in the array provides one field for the returned Object. Each Object in the array must contain a field with the key name and a field with the value.
* **Definition:** smartJoin(keyField, nameField)
* **Returns:** Object
* **Source:** n8n
* **Parameters:**
  * `keyField` (String) - The field in each Object containing the key name
  * `nameField` (String) - The field in each Object containing the value
* **Examples:**

  ```javascript
  // arr => [{'field':'age','value':2},{'field':'city','value':'Berlin'}]
  arr.smartJoin('field','value') //=> {"age": 2, "city": "Berlin"}
  ```

