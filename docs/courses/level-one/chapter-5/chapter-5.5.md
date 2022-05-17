# 5. Calculating Booked Orders

In this step of the workflow you will learn how n8n data is structured and how to add custom JavaScript code to perform calculations using the *Function* node.

The next step in Nathan's workflow is to calculate two values from the booked orders:

- The total number of booked orders
- The total value of all booked orders

To calculate data and add more functionality to your workflows you can use the **Function node**, which lets you write custom JavaScript code.

!!! warning "Function vs Function Item"
    n8n also provides a **Function Item node**, which should not be confused with the Function node. The Function Item node is used to add custom snippets of JavaScript code that should be executed once for every item that it receives as the input. Learn more about the difference between the Function and Function Item nodes [here](/data/code/){:target="_blank"}.


Before going into the setup of the Function node, you should first learn the [data structure](/data/data-structure/){:target="_blank"} of n8n. This is important if you want to:

- Create your own node.
- Write custom expressions.
- Use the Function or Function Item node.
- Get the most out of n8n.

In n8n, the data that is passed between nodes is an array of objects with the following structure:

```json
[
    {
   	 // Each item has to contain a "json" property. But it can be an empty object like {}.
   	 // Any kind of JSON data is allowed. So arrays and the data being deeply nested is fine.
   	 json: { // The actual data n8n operates on (required)
   		 // This data is only an example it could be any kind of JSON data
   		 jsonKeyName: 'keyValue',
   		 anotherJsonKey: {
   			 lowerLevelJsonKey: 1
   		 }
   	 },
   	 // Binary data of item. The most items in n8n do not contain any (optional)
   	 binary: {
   		 // The key-name "binaryKeyName" is only an example. Any kind of key-name is possible.
   		 binaryKeyName: {
   			 data: '....', // Base64 encoded binary data (required)
   			 mimeType: 'image/png', // Optional but should be set if possible (optional)
   			 fileExtension: 'png', // Optional but should be set if possible (optional)
   			 fileName: 'example.png', // Optional but should be set if possible (optional)
   		 }
   	 }
    },
    ...
]
```

Now let's see how to implement this.

In your workflow, add a *Function* node connected to the false branch of the *IF* node. In the *Function* node window paste the following code in the JavaScript Code box:

```javascript
let totalBooked = items.length;
let bookedSum = 0;

for(let i=0; i < items.length; i++) {
  bookedSum = bookedSum + items[i].json.orderPrice;
}
return [{json:{totalBooked, bookedSum}}];
```

Notice the format in which we return the results of the calculation:
`return [{json:{totalBooked, bookedSum}}]`

!!! warning "Data structure error"
    If you don't use the correct data structure, you will get an error message: `Error: Always an Array of items has to be returned!`


Now execute the node and you should see the following results:

<figure><img src="/_images/courses/level-one/chapter-two/Function-node.png" alt="Function node" style="width:100%"><figcaption align = "center"><i>Function node</i></figcaption></figure>

## What's next?

**Nathan 🙋**: Wow, the Function node is really powerful! So if I have some basic JavaScript skills I can power up my workflows.

**You 👩‍🔧**: Exactly – you can progress from no-code to low-code!

**Nathan 🙋**: Now, how do I send the calculations for the booked orders to my team's Discord channel?

**You 👩‍🔧**: There's an n8n node for that – I'll set it up in the next step.
