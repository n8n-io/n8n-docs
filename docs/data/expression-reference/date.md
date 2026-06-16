# Date

## _`Date`_.**`toDateTime()`**

**Description:** Converts a JavaScript Date to a Luxon DateTime. The DateTime contains the same information, but is easier to manipulate.

**Syntax:** _`Date`_.toDateTime()

**Returns:** DateTime

**Source:**  Custom n8n functionality

**Examples:**

  ```javascript
  // date = new Date("2024-03-30T18:49")
  date.toDateTime().plus(5, 'days') //=> 2024-04-04T18:49
  ```

