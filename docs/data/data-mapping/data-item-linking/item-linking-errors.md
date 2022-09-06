# Item linking errors

n8n displays errors related to data mapping when there are problems tracing an item's linked parent items back through the workflow.

## Errors when pinning data

If you see this error message:

> ERROR: '<node-name>' must be unpinned to execute

Unpin the data in the named node, and execute the node to get fresh data.

This error has two possible causes:

* The number of inputs into the pinned node has changed since you pinned it.
* You've edited the pinned data and changed the number of items.


## Errors when using the Function node

If you see this error message:

> ERROR: Can't get data for expression under '<field-name>' field

You need to supply item linking information yourself, because you have an item linking scenario that n8n can't automatically handle. Refer to [Item linking concepts](/data/data-mapping/data-item-linking/item-linking-concepts/) for a conceptual understanding of item linking, and [Manage item linking in the Function node](/data/data-mapping/data-item-linking/item-linking-function-node/) for detailed guidance on handling item linking.

