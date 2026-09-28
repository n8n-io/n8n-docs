---
contentType: overview
nodeTitle: Link data items
originalFilePath: data/data-mapping/data-item-linking/index.md
originalUrl: 'https://docs.n8n.io/data/data-mapping/data-item-linking'
url: 'https://docs.n8n.io/build/work-with-data/reference-data/link-data-items'
layout:
  description:
    visible: false
---

# Linking data items <a href="#linking-data-items" id="linking-data-items"></a>

An item is a single piece of data. Nodes receive one or more items, operate on them, and output new items. Each item links back to the items in the previous nodes that generated it.

Usually this just works. You need to understand this behavior in detail if you're:

* Using the Code node for complex behaviors with input and output data.
* Building a programmatic-style node.

This section provides:

* A conceptual overview of [Item linking concepts](how-items-link-through-workflows.md).
* Information on [Item linking for node creators](item-linking-for-node-creators.md).
* Support for end users who need to [work with the data path](preserving-linking-in-the-code-node.md) to retrieve item data from previous nodes and link items when using the Code node.
* Guidance on troubleshooting [errors](item-linking-errors.md).

## In this section

* [How items link through workflows](how-items-link-through-workflows.md): a conceptual overview of item linking.
* [Accessing linked items in the Code node](accessing-linked-items-in-the-code-node.md): use `itemMatching()` to retrieve linked item data.
* [Preserving linking in the Code node](preserving-linking-in-the-code-node.md): keep item links intact when you write custom code.
* [Item linking errors](item-linking-errors.md): troubleshoot common item linking errors.
* [Item linking for node creators](item-linking-for-node-creators.md): what node creators need to know about item linking.

## Related resources

* [Reference data](../)
* [Use the UI mapper](../use-the-ui-mapper.md)
* [Reference previous nodes](../reference-previous-nodes.md)


