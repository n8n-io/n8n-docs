# Get number of items returned by the last node

Depending on your use-case, you might want to get the number of items returned by the last node. Use the following snippet in the Function node.

```js
if (Object.keys(items[0].json).length === 0) {
  return [
     {
       json: {
         results: 0,
       }
      }
  ]
}
return [
  {
    json: {
      results: items.length,
    }
  }
];
```

The output will then be similar to the following.

```js
[
  {
    "results": 8
  }
]
```
