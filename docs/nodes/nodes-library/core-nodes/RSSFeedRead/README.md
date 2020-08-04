---
permalink: /nodes/n8n-nodes-base.rssFeedRead
---

# RSS Feed Read

The RSS Feed Read node is used to read data from RSS feeds published on the internet.

## Node Reference

The RSS Feed Read node has one property:

1. *URL* field: This is a text field used to specify the web address of the RSS publication you would like to read in n8n.

## Example Usage

This workflow allows you to read an RSS Feed using the RSS Feed Read node. You can also find the [workflow](https://n8n.io/workflows/583) on the website. This example usage workflow would use the following two nodes.
- [Start](../../core-nodes/Start/README.md)
- [RSS Feed Read]()


The final workflow should look like the following image.

![A workflow with the RSS Feed Read node](./workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. RSS Feed Read node

1. Enter the publication URL of the RSS feed that you want to read in the *URL* field.
2. Click on *Execute Node* to run the workflow.
