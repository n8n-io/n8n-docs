# Processing data with code

## Function

A function is a block of code designed to perform a certain task. In n8n, you can write custom JavaScript code snippets to add, remove, and update the data you receive from a node.

The [Function](/integrations/builtin/core-nodes/n8n-nodes-base.function/) and [Function Item](/integrations/builtin/core-nodes/n8n-nodes-base.functionItem/) nodes are the most powerful in n8n. Both nodes work very similarly, they give you access to the incoming data and you can manipulate it. With these nodes you can implement any function you want using JavaScript code.

The code of the **Function node** gets executed only once. The node receives the full items (JSON and binary data) as an array and expects an array of items as a return value. The items returned can be totally different from the incoming ones. So it is not only possible to remove and edit existing items, but also to add or return totally new ones.

The code of the **Function Item node** gets executed once for every item. The node receives one item (just the JSON data) at a time as input. As a return value, it expects the JSON data of one single item. That makes it possible to add, remove, and edit JSON properties of items, but it is not possible to add new or remove existing items. Accessing and changing binary data is only possible via the methods `getBinaryData` and `setBinaryData`.

Both the Function node and Function Item node support promises. So instead of returning the item or items directly, it is also possible to return a promise which resolves accordingly.

Here is a comparative overview of the Function and Function Item nodes:

| Data to access          | Function               | FunctionItem     |
| :-------------------------- | :--------------------- | :--------------- |
| JSON data                   | items\[_index_\].json    | item             |
| Binary data                 | items\[_index_\].binary  | getBinaryData()  |
