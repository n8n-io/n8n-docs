---
contentType: tutorial
---

<!-- vale from-microsoft.We = NO -->
<!-- vale from-microsoft.FirstPerson = NO -->
# 5. Calculating Booked Orders

In this step of the workflow you will learn how n8n structures data and how to add custom JavaScript code to perform calculations using the Code node. After this step, your workflow should look like this:

[[ workflowDemo("file:////courses/level-one/chapter-5/chapter-5.5.json") ]]

The next step in Nathan's workflow is to calculate two values from the booked orders:

- The total number of booked orders
- The total value of all booked orders

To calculate data and add more functionality to your workflows you can use the Code node, which lets you write custom JavaScript code.

## About the Code node

/// warning | Code node modes
The Code node has two operational **modes**, depending on how you want to process items:

* **Run Once for All Items** allows you to write code to process all input items at once, as a group.
* **Run Once for Each Item** executes your code once for each input item.

Learn more about how to use the [Code node](/integrations/builtin/core-nodes/n8n-nodes-base.code/index.md).
///

In n8n, the data that's passed between nodes is an array of objects with the following JSON structure:

```json
[
    {
   	 "json": { // (1)!
   		 "apple": "beets",
   		 "carrot": {
   			 "dill": 1
   		 }
   	 },
   	 "binary": { // (2)!
   		 "apple-picture": { // (3)!
   			 "data": "....", // (4)!
   			 "mimeType": "image/png", // (5)!
   			 "fileExtension": "png", // (6)!
   			 "fileName": "example.png", // (7)!
   		 }
   	 }
    },
    ...
]
```

1. (required) n8n stores the actual data within a nested `json` key. This property is required, but can be set to anything from an empty object (like `{}`) to arrays and deeply nested data. The code node automatically wraps the data in a `json` object and parent array (`[]`) if it's missing.
2. (optional) Binary data of item. Most items in n8n don't contain binary data.
3. (required) Arbitrary key name for the binary data.
4. (required) Base64-encoded binary data.
5. (optional) Should set if possible.
6. (optional) Should set if possible.
7. (optional) Should set if possible.

You can learn more about the expected format on the [n8n data structure](/data/data-structure.md) page.

## Configure the Code node

Now let's see how to accomplish Nathan's task using the Code node.

In your workflow, add a **Code node** connected to the `false` branch of the **If node**. 

With the Code node window open, configure these parameters:

- **Mode**: Select **Run Once for All Items**.
- **Language**: Select **JavaScript**.

	/// note | Using Python in code nodes
	While we use JavaScript below, you can also use Python in the Code node. To learn more, refer to the [Code node](/code/code-node.md) documentation.
	///
	
- Copy the Code below and paste it into the **Code** box to replace the existing code:

	```javascript
	let items = $input.all();
	let totalBooked = items.length;
	let bookedSum = 0;

	for (let i=0; i < items.length; i++) {
	  bookedSum = bookedSum + items[i].json.orderPrice;
	}

	return [{ json: {totalBooked, bookedSum} }];
	```

Notice the format in which we return the results of the calculation:

```javascript
return [{ json: {totalBooked, bookedSum} }]
```

/// warning | Data structure error
If you don't use the correct data structure, you will get an error message: `Error: Always an Array of items has to be returned!`
///

Now select **Execute step** and you should see the following results:

<figure><img src="/_images/courses/level-one/chapter-five/l1-c5-5-5-code-node.png" alt="Code node output" style="width:100%"><figcaption align = "center"><i>Code node output</i></figcaption></figure>

## What's next?

**Nathan 🙋**: Wow, the Code node is powerful! This means that if I have some basic JavaScript skills I can power up my workflows.

**You 👩‍🔧**: Yes! You can progress from no-code to low-code!

**Nathan 🙋**: Now, how do I send the calculations for the booked orders to my team's Discord channel?

**You 👩‍🔧**: There's an n8n node for that. I'll set it up in the next step.
