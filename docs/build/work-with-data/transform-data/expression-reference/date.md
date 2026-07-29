---
nodeTitle: Date
originalFilePath: data/expression-reference/date.md
originalUrl: 'https://docs.n8n.io/data/expression-reference/date'
url: >-
  https://docs.n8n.io/build/work-with-data/transform-data/expression-reference/date
layout:
  description:
    visible: false
---
# Date <a href="#date" id="date"></a>

## _`Date`_.**`toDateTime()`** <a href="#datetodatetime" id="datetodatetime"></a>

**Description:** Converts a JavaScript Date to a Luxon DateTime. The DateTime contains the same information, but is easier to manipulate.

**Syntax:** _`Date`_.toDateTime()

**Returns:** DateTime

**Source:**  Custom n8n functionality

**Examples:**

  ```javascript
  // date = new Date("2024-03-30T18:49")
  date.toDateTime().plus(5, 'days') //=> 2024-04-04T18:49
  ```

