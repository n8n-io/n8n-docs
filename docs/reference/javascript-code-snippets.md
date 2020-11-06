# JavaScript Code Snippets

In n8n, you can write custom JavaScript code snippets to add, remove, and update the data you receive from a node. You can also use code snippets to modify the data structure of the data returned by a node.

::: tip 💡 Keep in mind
We are using Set node for illustrating expressions here. However, you can use the code snippets as an expression in any node. To do that, click on the gears icon next to a field and click on ***Add Expression***.
:::

For each section, we'll share code snippets that can be used in the function node as well as the expressions. You can read more about [Expressions](../nodes/expressions.md) and adding code snippets to the [Function](../nodes/nodes-library/core-nodes/Function/README.md) node in our documentation.

[[toc]]


## Date and Time

The JavaScript [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) object is a built-in object that stores the date and time. It provides several methods for managing and formatting the date. 

It's important to keep in mind that while the time value at the heart of a Date object is UTC, the basic methods to fetch the date and time or its components all work in the local time zone and offset. For example, `new Date().toISOString()` would show the time in UTC but `new Date().getHours()` would show the time in your local time zone.

**Note:** The outputs below either show the date and time when this documentation was created or are relative to it. The date and time will be different for you.


### 1. Get current timestamp

To use the built-in methods for managing and formatting date in JavaScript, you have to create a date object. The `Date()` constructor returns the date and time in the [ISO](https://en.wikipedia.org/wiki/ISO_8601) format. The `toISOString()` method converts the object to a string. To get the current timestamp use the following snippet.

#### Function node

```js
const today = new Date().toISOString();

items[0].json.today = today;
return items;
```

The output will be similar to the following.

```js
[
  {
    "today": "2020-10-13T09:35:42.588Z" 
  }
]
```

#### Expression editor

```js
{{new Date()}}
```

The expression would resolve to something similar to the following.

```js
2020-10-13T09:39:12.939Z
```

### 2. Get date

Use the `getDate()` method to get today's date.

#### Function node
```js
const today = new Date();
const date = today.getDate();

items[0].json.today_date = date;
return items;
```

The output will be similar to the following.

```js
[
  {
    "today_date": 13
  }
]
```

#### Expression editor

```js
{{new Date().getDate()}}
```

The expression would resolve to something similar to the following.

```js
13
```

### 3. Get month

In JavaScript, the month is 0-indexed. For example, January has index 0, February has index 1, and so on. Use the `getMonth()` method to get the month.

#### Function node
```js
const today = new Date();
const month = today.getMonth()+1;

items[0].json.month = month;
return items;
```

The output will be similar to the following.

```js
[
  {
    "month": 10 
  }
]
```

#### Expression editor

```js
{{new Date().getMonth()+1}}
```

The expression would resolve to something similar to the following.

```js
10
```


### 4. Get first and last days of the last month

Use the following snippet to get the first and last days of the last month.

#### Function node
```js
const today = new Date();

const current_month = today.getMonth();
const year = today.getFullYear()

const first_day_last_month = new Date(year, current_month-1, 1).toISOString();
const last_day_last_month = new Date(year, current_month, 1).toISOString();

items[0].json.first_day_last_month = first_day_last_month;
items[0].json.last_day_last_month = last_day_last_month;
return items;
```

The output will be similar to the following.

```js
[
  {
    "first_day_last_month": "2020-08-31T22:00:00.000Z",
    "last_day_last_month": "2020-09-30T22:00:00.000Z" 
  }
]
```

#### Expression editor

First day of the last month

```js
{{new Date(new Date().getFullYear(), new Date().getMonth()-1, 1).toISOString()}}
```

Last day of the last month

```js
{{new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString()}}
```

The expression would resolve to something similar to the following.

```js
// First day of the last month
2020-08-31T22:00:00.000Z

// Last day of the last month
2020-09-30T22:00:00.000Z
```

## Workflow Data

You can use the `$workflow` variable to get information about the current workflow in n8n. Please note that you'll have to save your workflow to obtain its name and ID.

### 1. Get workflow ID

#### Function node

```js
const workflowId = $workflow.id;

items[0].json.workflowId = workflowId;
return items;
```

The output will be similar to the following.

```js
[
  {
    "workflowId": "225"
  }
]
```

In case you haven't saved your workflow, this will be the output.

```js
[
  {
  }
]
```

#### Expression editor

```js
{{$workflow.id}}
```

The expression would resolve to something similar to the following.

```js
225
```

In case you haven't saved your workflow, this would resolve to something similar to the following.

```js
[not found]
```

### 2. Get workflow name

#### Function node

```js
const workflowName = $workflow.name;

items[0].json.workflowName = workflowName;
return items;
```

The output will be similar to the following.

```js
[
  {
    "workflowName": "A name for my workflow"
  }
]
```

In case you haven't saved your workflow, this will be the output.

```js
[
  {
    "workflowName": ""
  }
]
```

#### Expression editor

```js
{{$workflow.name}}
```

The expression would resolve to something similar to the following.

```js
A name for my workflow
```

In case you haven't saved your workflow, this wouldn't resolve to anything.

### 3. Get workflow status

`$workflow.active` returns a boolean value. You can convert it to a string by using the `toString()` method.

#### Function node

```js
const isActive = $workflow.active;

items[0].json.isActive = isActive;
return items;
```

The output will be similar to the following.

```js
[
  {
    "isActive": false
  }
]
```

#### Expression editor

```js
{{$workflow.active}}
```

The expression would resolve to something similar to the following.

```js
false
```

## Modify data Structure

You might want to convert the structure of the incoming data. You can use the Function node to change the data structure of the incoming data. Please note that you might have to make some changes to the code based on your data. To know more about the data structure in n8n, please refer the [Data Structure documentation](./data/data-structure.md). 

### 1. Create multiple JSON items from an array

If the data structure of the incoming data is similar to the below code snippet. 

```js
[
  [
    {
      "data": "item-1",
    },
    {
      "data": "item-2",
    },
    {
      "data": "item-3",
    }
  ]
]
```
You can use the following code snippet to convert the array to multiple JSON items.

```js
return items[0].json.map(item => {
  return {
    json: item
    }
  }
});
```

The output will be similar to the following.

```js
[
  {
    "data": "item-1"
  },
  {
    "data": "item-2"
  },
  {
    "data": "item-3"
  }
]
```

You can also use this [example workflow](https://n8n.io/workflows/766).

### 2. Create an array of objects

If the data structure of the incoming data is similar to the below code snippet.

```js
[
  {
    "item": "item-1"
  },
  {
    "item": "item-2"
  },
  {
    "item": "item-3"
  }
]
```

You can use the following code snippet to create an array of objects.

```js
 return [
  {
    json: {
      data_object: $items().map(item => item.json)
    }
  }
]
```

The output will be similar to the following.

```js
[
  {
    data_object: [
      {
        "item": "item-1"
      },
      {
        "item": "item-2"
      },
      {
        "item": "item-3"
      }
    ]
  }
]
```
You can also use this [example workflow](https://n8n.io/workflows/767).

### 3. Split binary data into individual items

If you receive multiple binary files from a node, you can split the binary data into individual items using the following code snippet.

```js
return Object.keys(items[0].binary).map(key => {
  return {
    json: {},
    binary: {
      data: items[0].binary[key],
    }
  }
});
```
