# Transforming data

n8n uses a predefined [data structure](/data/data-structure/) that allows all nodes to process incoming data correctly.

Your incoming data may have a different data structure, in which case you will need to transform it to allow each item to be processed individually.

For example, the image below shows the output of an [HTTP Request](/integrations/core-nodes/n8n-nodes-base.httpRequest/) node that returns data incompatible with n8n’s data structure. The node returns the data and displays that only one item was returned.

![HTTP Request node output](/_images/data/transforming-data/HTTPRequest_output.png)

To transform this kind of structure into the n8n data structure you will have to use the Item Lists node.

!!! note
        If you’re using the HTTP Request node, you should use the Split Into items option to transform the data. You don’t have to use a Function node in that case.


    
