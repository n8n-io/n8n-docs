---
permalink: /nodes/n8n-nodes-base.pipedrive
---

# Pipedrive

[Pipedrive](https://www.pipedrive.com/) is a cloud-based sales software company that aims to improve the productivity of businesses through the use of their software.

::: tip 🔑 Credentials
You can find authentication information for this node [here](../../../credentials/Pipedrive/README.md).
:::

## Basic Operations

- Activity
    - Create an activity
    - Delete an activity
    - Get data of an activity
    - Get data of all activities
    - Update an activity
- Deal
    - Create a deal
    - Delete a deal
    - Duplicate a deal
    - Get data of a deal
    - Get data of all deals
    - Update a deal
- File
    - Create a file
    - Delete a file
    - Download a file
    - Get data of a file
- Note
    - Create a note
    - Delete a note
    - Get data of a note
    - Get data of all notes
    - Update a note
- Organization
    - Create an organization
    - Delete an organization
    - Get data of an organization
    - Get data of all organizations
- Person
    - Create a person
    - Delete a person
    - Get data of a person
    - Get data of all persons
    - Update a person
- Product
    - Get data of all products


## Example Usage

This workflow allows you to create an deal in Pipedrive. You can also find the [workflow](https://n8n.io/workflows/489) on the website. This example usage workflow would use the following two nodes.
- [Start](../../core-nodes/Start/README.md)
- [Pipedrive]()

The final workflow should look like the following image.

![A workflow with the Pipedrive node](./workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Pipedrive node

1. First of all, you'll have to enter credentials for the Pipedrive node. You can find out how to do that [here](../../../credentials/Pipedrive/README.md).
2. Enter the title of the deal in the *Title* field.
3. Click on *Execute Node* to run the workflow.
