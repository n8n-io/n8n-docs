---
permalink: /nodes/n8n-nodes-base.htmlExtract
---

# HTML Extract

The HTML Extract node is useful to extract the HTML content of a webpage.

## Node Reference

- **Source Data:** In this dropdown list, there are two options to use.
	- Binary
	- JSON


## Example Usage

This workflow allows you to extract titles and URLs of all the articles from [Hackernoon](https://hackernoon.com/). You can also find the [workflow](https://n8n.io/workflows/434) on n8n.io. This example usage workflow uses the following nodes.
- [Start](../../core-nodes/Start/README.md)
- [HTTP Request](../../core-nodes/HTTPRequest/README.md)
- [HTML Extract]()

The final workflow should look like the following image.

![A workflow with the HTML Extract node](./workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.


### 2. HTTP Request node (GET)

1. Enter `https://hackernoon.com` in the ***URL*** field.
2. Select 'String' from the ***Response Format*** dropdown list.
2. Click on ***Execute Node*** to run the node.

![Get the articles from Hackernoon using the HTTP Request node](./HTTPRequest_node.png)


### 3. HTML Extract node (json: data)

1. Click on the ***Add Value*** button.
2. Enter `item` in the ***Key*** field.
3. Enter `h2` in the ***CSS Selector*** field.
4. Select 'HTML' from the ***Return Value*** dropdown list.
5. Toggle ***Return All*** to true.
6. Click on ***Execute Node*** to run the node.

![Extract title of the articles using the HTML Extract node](./HTMLExtract_node.png)


### 4. HTML Extract1 node (json: item)

1. Click on the ***Add Value*** button.
2. Enter `title` in the ***Key*** field.
3. Enter `a` in the ***CSS Selector*** field.
4. Select 'Text' from the ***Return Value*** dropdown list.
5. Click on the ***Add Value*** button.
6. Enter `url` in the ***Key*** field.
7. Enter `a` in the ***CSS Selector*** field.
8. Select 'Attribute' from the ***Return Value*** dropdown list.
9. Enter `href` in the ***CSS Selector*** field.
10. Click on ***Execute Node*** to run the node.

![Extract title and link of the articles using the HTML Extract node](./HTMLExtract1_node.png)


## Further Reading

- [HTTP Request Node — The Swiss Army Knife](https://medium.com/n8n-io/http-request-node-the-swiss-army-knife-b14e22283383)
