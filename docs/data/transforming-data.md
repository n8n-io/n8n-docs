---
contentType: explanation
---

# Transforming data

n8n uses a predefined [data structure](/data/data-structure.md) that allows all nodes to process incoming data correctly.

Your incoming data may have a different data structure, in which case you will need to transform it to allow each item to be processed individually.

For example, the image below shows the output of an [HTTP Request](/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/index.md) node that returns data incompatible with n8n's data structure. The node returns the data and displays that only one item was returned.

![HTTP Request node output](/_images/data/transforming-data/HTTPRequest_output.png)

To transform this kind of structure into the n8n data structure you can use the data transformation nodes:

* [Aggregate](/integrations/builtin/core-nodes/n8n-nodes-base.aggregate.md): take separate items, or portions of them, and group them together into individual items.
* [Limit](/integrations/builtin/core-nodes/n8n-nodes-base.limit.md): remove items beyond a defined maximum number.
* [Remove Duplicates](/integrations/builtin/core-nodes/n8n-nodes-base.removeduplicates/index.md): identify and delete items that are identical across all fields or a subset of fields.
* [Sort](/integrations/builtin/core-nodes/n8n-nodes-base.sort.md): organize lists of in a desired ordering, or generate a random selection.
* [Split Out](/integrations/builtin/core-nodes/n8n-nodes-base.splitout.md): separate a single data item containing a list into multiple items.
* [Summarize](/integrations/builtin/core-nodes/n8n-nodes-base.summarize.md): aggregate items together, in a manner similar to Excel pivot tables. 

    
