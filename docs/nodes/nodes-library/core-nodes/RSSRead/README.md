---
permalink: /nodes/n8n-nodes-base.rssFeedRead
---

# RSS Read

The RSS Read node is used to read data from RSS feeds published on the internet.

## Node Reference

The RSS Read node has one property:

1. *URL* field: This field is used to specify the web address of the RSS publication.

## Example Usage

This workflow allows you to read an RSS Feed using the RSS Read node. You can also find the [workflow](https://n8n.io/workflows/583) on the website. This example usage workflow would use the following two nodes.
- [Start](../../core-nodes/Start/README.md)
- [RSS Read]()


The final workflow should look like the following image.

![A workflow with the RSS Read node](./workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. RSS Read node

1. Enter the URL of the RSS feed that you want to read in the *URL* field.
2. Click on *Execute Node* to run the workflow.
