---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: overview
---

# Data item linking

An item is a single piece of data. Nodes receive one or more items, operate on them, and output new items. Each item links back to previous items. 

You need to understand this behavior if you're:

* Building a programmatic-style node that implements complex behaviors with its input and output data.
* Using the Code node or expressions editor to access data from earlier items in the workflow. 
* Using the Code node for complex behaviors with input and output data.

This section provides:

* A conceptual overview of [Item linking concepts](/data/data-mapping/data-item-linking/item-linking-concepts.md). 
* Information on [Item linking for node creators](/data/data-mapping/data-item-linking/item-linking-node-building.md).
* Support for end users who need to [Work with the data path](/data/data-mapping/data-item-linking/item-linking-code-node.md) to retrieve item data from previous nodes, and link items when using the Code node.
* Guidance on troubleshooting [Errors](/data/data-mapping/data-item-linking/item-linking-errors.md).


