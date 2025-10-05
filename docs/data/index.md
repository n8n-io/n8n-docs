---
contentType: overview
---

# Data

Data is the information that n8n nodes receive and process. For basic usage of n8n you don't need to understand data structures and manipulation. However, it becomes important if you want to:

 - Create your own node
 - Write custom [expressions](/glossary.md#expression-n8n)
 - Use the Function or Function Item node

This section covers: 

* [Data structure](/data/data-structure.md)
* [Data flow within nodes](/data/data-flow-nodes.md)
* [Transforming data](/data/transforming-data.md)
* [Process data using code](/data/code.md)
* [Pinning](/data/data-pinning.md) and [editing](/data/data-editing.md) data during workflow development.
* [Data mapping](/data/data-mapping/index.md) and [Item linking](/data/data-mapping/data-item-linking/index.md): how data items link to each other.

## Related resources

### Data transformation nodes

n8n provides a collection of nodes to transform data:

* [Aggregate](/integrations/builtin/core-nodes/n8n-nodes-base.aggregate.md): take separate items, or portions of them, and group them together into individual items.
* [Limit](/integrations/builtin/core-nodes/n8n-nodes-base.aggregate.md): remove items beyond a defined maximum number.
* [Remove Duplicates](/integrations/builtin/core-nodes/n8n-nodes-base.removeduplicates/index.md): identify and delete items that are identical across all fields or a subset of fields.
* [Sort](/integrations/builtin/core-nodes/n8n-nodes-base.sort.md): organize lists of in a desired ordering, or generate a random selection.
* [Split Out](/integrations/builtin/core-nodes/n8n-nodes-base.splitout.md): separate a single data item containing a list into multiple items.
* [Summarize](/integrations/builtin/core-nodes/n8n-nodes-base.summarize.md): aggregate items together, in a manner similar to Excel pivot tables. 
