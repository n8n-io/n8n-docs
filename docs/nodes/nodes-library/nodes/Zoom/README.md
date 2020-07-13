---
permalink: /nodes/n8n-nodes-base.zoom
---

# Zoom

[Zoom](https://zoom.us/) is a communications technology company that provides videotelephony and online chat services through a cloud-based peer-to-peer software platform and is used for teleconferencing, telecommuting, distance education, and social relations.

::: tip 🔑 Credentials
You can find authentication information for this node [here](../../../credentials/Zoom/README.md).
:::

## Basic Operations

- Meeting
    - Create a meeting
    - Delete a meeting
    - Retrieve a meeting
    - Retrieve all meetings
    - Update a meeting

## Example Usage

This workflow allows you to create a meeting in Zoom. You can also find the [workflow](https://n8n.io/workflows/453) on the website. This example usage workflow would use the following two nodes.
- [Start](../../core-nodes/Start/README.md)
- [Zoom]()

The final workflow should look like the following image.

![A workflow with the Zoom node](./workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Zoom node

1. First of all, you'll have to enter credentials for the Zoom node. You can find out how to do that [here](../../../credentials/Zoom/README.md).
2. Enter the topic of the meeting in the *Topic* field.
3. Click on *Execute Node* to run the workflow.
