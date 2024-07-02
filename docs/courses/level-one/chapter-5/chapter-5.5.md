---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: tutorial
---

# 5. Calculating Booked Orders

In this step of the workflow you will learn how n8n data is structured and how to add custom JavaScript code to perform calculations using the Code node.

The next step in Nathan's workflow is to calculate two values from the booked orders:

- The total number of booked orders
- The total value of all booked orders

To calculate data and add more functionality to your workflows you can use the Code node, which lets you write custom JavaScript code.

## About the Code node

/// warning | Code node modes
The Code node has two operational **Modes** that change the way it processes data. The **Run Once for All Items** mode allows you to accumulate data from all items on the input list. The **Run Once for Each Item** is used to add custom snippets of JavaScript code that should be executed once for every item that it receives as the input. Learn more about how to use the [Code node](/integrations/builtin/core-nodes/n8n-nodes-base.code/).
///
- Create your own node.
- Write custom expressions.
- Use the Code node.
- Get the most out of n8n.

In n8n, the data that's passed between nodes is an array of objects with the following structure:

```json
[
    {
   	 // Each item has to contain a "json" property. But it can be an empty object like {}.
   	 // Any kind of JSON data is allowed. So arrays and the data being deeply nested is fine.
   	 json: { // The actual data n8n operates on (required)
   		 // This data is only an example, it could be any kind of JSON data
   		 apple: 'beets',
   		 carrot: {
   			 dill: 1
   		 }
   	 },
   	 // Binary data of item. Most items in n8n do not contain any (optional)
   	 binary: {
   		 // The key-name "apple" is only an example. Any kind of key-name is possible.
   		 apple-picture: {
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
## Configure the Code node

Now let's see how to implement this.

In your workflow, add a Code node** connected to the `false` branch of the **If node. 

With the Code node window open, configure these parameters:

- **Mode**: Select **Run Once for All Items**
- **Language**: Select **JavaScript**
- Copy the Code below and paste it into the **Code** box:
```javascript
let items = $input.all();
let totalBooked = items.length;
let bookedSum = 0;

for(let i=0; i < items.length; i++) {
  bookedSum = bookedSum + items[i].json.orderPrice;
}
return [{json:{totalBooked, bookedSum}}];
```

Notice the format in which we return the results of the calculation:<br>
`return [{json:{totalBooked, bookedSum}}]`

/// warning | Data structure error
If you don't use the correct data structure, you will get an error message: `Error: Always an Array of items has to be returned!`
///

Now select **Test step** and you should see the following results:

<figure><img src="/_images/courses/level-one/chapter-five/l1-c5-5-5-code-node.png" alt="Code node output" style="width:100%"><figcaption align = "center"><i>Code node output</i></figcaption></figure>

/// note | Using Python in code nodes
You can also use Python in the Code node. To learn more about this, refer to the [Code node](/code/code-node/) documentation.
///

## What's next?

**Nathan 🙋**: Wow, the Code node is really powerful! This means that if I have some basic JavaScript skills I can power up my workflows.

**You 👩‍🔧**: Yes! You can progress from no-code to low-code!

**Nathan 🙋**: Now, how do I send the calculations for the booked orders to my team's Discord channel?

**You 👩‍🔧**: There's an n8n node for that. I'll set it up in the next step.
