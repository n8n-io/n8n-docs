# JavaScript Cheatsheet

In n8n, you can write custom JavaScript code snippets to add, remove, and update the data you receive from a node. You can also use code snippets to modify the data structure.

## Date and Time

The JavaScript [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) object is a built-in object that stores the date and time. It provides several methods for managing and formatting the date.

### 1. Get current time

To use the built-in methods for managing and formatting date in JavaScript, you have to create a date object.

To get today's date use the following snippet

```js
const today = new Date();

// Output
"2020-10-09T09:45:36.593Z"
```

### 2. Get Date

Use the `getDate()` method to get the date.

```js
const today = new Date();
const date = today.getDate();

// Output
9
```

### 3. Get Month

In JavaScript, the month is 0-indexed. For example, January has index 0, February has index 1, and so on. Use the `getMonth()` method to get the month.

```js
const today = new Date();
const month = today.getMonth();

// Output
9 // 0-index
```

```js
const today = new Date();
const month = today.getMonth();
const months = ['Jan', 'Feb', 'March', 'April','May', 'June', 'July', 'Aug', 'Sep', 'Oct','Nov','Dec'];
const currMonth = months[month];

// Output
'Oct'
```

### 4. Perform calculations

You can perform calculations on the data object to get the required date or time.

```js
const today = new Date();
const yesterday = new Date(new Date(today).getTime()-(1*24*60*60*1000))
const tomorrow = new Date(new Date(today).getTime()+(1*24*60*60*1000))

// Output
"2020-10-09T09:45:36.593Z" // today
"2020-10-08T09:45:36.593Z" // yesterday
"2020-10-10T09:45:36.593Z" // tomorrow
```