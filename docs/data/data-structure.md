---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: explanation
---

# Data structure

In n8n, all data passed between nodes is an array of objects. It has the following structure:

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

/// note | Skipping the `json` key and array syntax
From 0.166.0 on, when using the Code node, n8n automatically adds the `json` key if it's missing. It also automatically wraps your items in an array (`[]`) if needed. This is only the case when using the Code node. When building your own nodes, you must still make sure the node returns data with the `json` key.
///

## Data item processing

--8<-- "_snippets/flow-logic/data-flow-nodes.md"


