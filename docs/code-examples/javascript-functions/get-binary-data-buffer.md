# Get the binary data buffer

The binary data buffer contains all the binary file data processed by a workflow. You need to access it if you want to perform operations on the binary data, such as:

* Manipulating the data: for example, adding column headers to a CSV file.
* Using the data in calculations: for example, calculating a hash value based on it.
* Complex HTTP requests: for example, combining file upload with sending other data formats.

You can access the buffer using n8n's `getBinaryDataBuffer()` function:

```js
let binaryDataBufferItem = await this.helpers.getBinaryDataBuffer(itemIndex, binaryPropertyName);
```

You should always use the `getBinaryDataBuffer()` function, and avoid using older methods of directly accessing the buffer, such as targeting it with expressions like `items[0].binary.data.data`.