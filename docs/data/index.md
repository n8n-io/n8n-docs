---
contentType: overview
---

# Data

Data is the information that n8n nodes receive and process. For basic usage of n8n you don't need to understand data structures and manipulation. However, it becomes important if you want to:

 - Create your own node
 - Write custom expressions
 - Use the Function or Function Item node

This section covers: 

* [Data structure](/data/data-structure/)
* [Data flow within nodes](/data/data-flow-nodes/)
* [Transforming data](/data/transforming-data/)
* [Process data using code](/data/code/)
* [Pinning](/data/data-pinning/) and [editing](/data/data-editing/) data during workflow development.
* [Data mapping](/data/data-mapping/data-mapping-ui/) and [Item linking](/data/data-mapping/data-item-linking/): how data items link to each other.

## Related resources

### Data transformation nodes

n8n provides a collection of nodes to transform data:

* [Aggregate](/integrations/builtin/core-nodes/n8n-nodes-base.aggregate/): take separate items, or portions of them, and group them together into individual items.
* [Limit](/integrations/builtin/core-nodes/n8n-nodes-base.aggregate/): remove items beyond a defined maximum number.
* [Remove Duplicates](/integrations/builtin/core-nodes/n8n-nodes-base.removeduplicates/): identify and delete items that are identical across all fields or a subset of fields.
* [Sort](/integrations/builtin/core-nodes/n8n-nodes-base.sort/): organize lists of in a desired ordering, or generate a random selection.
* [Split Out](/integrations/builtin/core-nodes/n8n-nodes-base.splitout/): separate a single data item containing a list into multiple items.
* [Summarize](/integrations/builtin/core-nodes/n8n-nodes-base.summarize/): aggregate items together, in a manner similar to Excel pivot tables. 
