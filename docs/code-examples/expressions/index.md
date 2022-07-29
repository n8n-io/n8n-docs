# Expressions

Expressions allow you to set node parameters dynamically based on data from:

- Previous nodes
- The workflow
- Your n8n environment


n8n uses the [riot-tmpl](https://github.com/riot/tmpl) templating language, and extends it with custom methods and variables. 

You can execute JavaScript within an expression. 

n8n supports two libraries that make common tasks easier:

- [Luxon](https://github.com/moment/luxon/), for working with data and time.
- [JMESPath](https://jmespath.org/), for querying JSON.


## Writing expressions


To use an expression to set a parameter value:

1. Select **Parameter options** for the parameter where you want to use an expression.
2. Select **Add expression**.
3. Write your expression in the expression editor. You can browse some of the available data in the **Variable selector**. All expressions have the format `{{ your expression here }}`.


### Example: get data from webhook body

Consider the following scenario: you have a webhook trigger that receives data through the webhook body. You want to extract some of that data for use in the workflow.

Your webhook data looks similar to this:


```json
[
  {
    "headers": {
      "host": "n8n.instance.address",
      ...
    },
    "params": {},
    "query": {},
    "body": {
      "name": "Jim",
      "age": 30,
      "city": "New York"
    }
  }
]
```


In the next node in the workflow, you want to get just the value of `city`. You can use the following expression:


```js
{{$json.body.city}}
```

This expression:

1. Accesses the incoming JSON-formatted data using n8n's custom `$json` variable.
2. Finds the value of `city` (in this example, "New York"). Note that this example uses JMESPath syntax to query the JSON data. You can also write this expression as `{{$json['body']['city']}}`.


### Example: writing longer JavaScript

An expression contains one line of JavaScript. This means you can'd do things like variable assignments or multiple standalone operations.

To understand the limitations of JavaScript in expressions, and start thinking about workarounds, look at the following two pieces of code. Both code examples use the Luxon date and time library to find the time between two dates in months, and encloses the code in handlebar brackets, like an expression. 

However, the first example isn't a valid n8n expression:


```js
// This example is split over multiple lines for readability
// It is still invalid when formatted as a single line
{{
  function example() {
    let end = DateTime.fromISO('2017-03-13');
    let start = DateTime.fromISO('2017-02-13');
    let diffInMonths = end.diff(start, 'months');
    return diffInMonths.toObject();
  }
  example();
}}
```


While the second example is valid:


```js
{{DateTime.fromISO('2017-03-13').diff(DateTime.fromISO('2017-02-13'), 'months').toObject()}}
```
