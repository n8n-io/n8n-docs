# Split binary file data into individual items

If you receive more than one binary file from a node, you can split the binary data into individual items using the following code snippet.

```js
let results = [];

for (item of items) {
    for (key of Object.keys(item.binary)) {
        results.push({
            json: {
                fileName: item.binary[key].fileName
            },
            binary: {
                data: item.binary[key],
            }
        });
    }
}

return results;
```