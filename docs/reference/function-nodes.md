# Function and Function Item Nodes

These are the most powerful nodes in n8n. With these, almost everything can be done if you know how to
write JavaScript code. Both nodes work very similarly. They give you access to the incoming data
and you can manipulate it.
- [Function](../nodes/nodes-library/core-nodes/Function/README.md)
- [Function Item](../nodes/nodes-library/core-nodes/FunctionItem/README.md)


### Difference between both nodes

The difference is that the code of the Function node gets executed only once. It receives the
full items (JSON and binary data) as an array and expects an array of items as a return value. The items
returned can be totally different from the incoming ones. So it is not only possible to remove and edit
existing items, but also to add or return totally new ones.

The code of the Function Item node on the other hand gets executed once for every item. It receives
one item at a time as input and also just the JSON data. As a return value, it expects the JSON data
of one single item. That makes it possible to add, remove and edit JSON properties of items
but it is not possible to add new or remove existing items. Accessing and changing binary data is only
possible via the methods `getBinaryData` and `setBinaryData`.

Both nodes support promises. So instead of returning the item or items directly, it is also possible to
return a promise which resolves accordingly.

__Comparison__
| Data to access ...          | Function               | FunctionItem     |
| :-------------------------- | :--------------------- | :--------------- |
| JSON-Data                   | items\[_index_\].json    | item             |
| Binary-Data                 | items\[_index_\].binary  | getBinaryData()  |
