---
contentType: howto
nodeTitle: Get the binary data buffer
originalFilePath: code/cookbook/code-node/get-binary-data-buffer.md
originalUrl: 'https://docs.n8n.io/code/cookbook/code-node/get-binary-data-buffer'
url: >-
  https://docs.n8n.io/build/code-in-n8n/cookbook/code-node/get-the-binary-data-buffer
layout:
  description:
    visible: false
---

# Get the binary data buffer <a href="#get-the-binary-data-buffer" id="get-the-binary-data-buffer"></a>

The binary data buffer contains all the binary file data processed by a workflow. You need to access it if you want to perform operations on the binary data, such as:

* Manipulating the data: for example, adding column headers to a CSV file.
* Using the data in calculations: for example, calculating a hash value based on it.
* Complex HTTP requests: for example, combining file upload with sending other data formats.

{% hint style="info" %}
**Not available in Python**

`getBinaryDataBuffer()` isn't supported when using Python.
{% endhint %}
You can access the buffer using n8n's `getBinaryDataBuffer()` function:


```js
/* 
* itemIndex: number. The index of the item in the input data.
* binaryPropertyName: string. The name of the binary property. 
* The default in the Read/Write File From Disk node is 'data'. 
*/
let binaryDataBufferItem = await this.helpers.getBinaryDataBuffer(itemIndex, binaryPropertyName);
```

For example:

```js
let binaryDataBufferItem = await this.helpers.getBinaryDataBuffer(0, 'data');
// Returns the data in the binary buffer for the first input item
```


You should always use the `getBinaryDataBuffer()` function, and avoid using older methods of directly accessing the buffer, such as targeting it with expressions like `items[0].binary.data.data`.
