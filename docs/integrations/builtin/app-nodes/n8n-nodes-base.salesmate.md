---
title: Salesmate
description: Documentation for the Salesmate node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
contentType: integration
---

# Salesmate

Use the Salesmate node to automate work in Salesmate, and integrate Salesmate with other applications. n8n has built-in support for a wide range of Salesmate features, including creating, updating, deleting, and getting activities, companies, and deals. 

On this page, you'll find a list of operations the Salesmate node supports and links to more resources.

/// note | Credentials
Refer to [Salesmate credentials](/integrations/builtin/credentials/salesmate/) for guidance on setting up authentication. 
///
/// note | Examples and templates
For usage examples and templates to help you get started, take a look at n8n's [Salesmate integrations](https://n8n.io/integrations/salesmate/){:target="_blank" .external-link} list.
///

## Basic Operations

* Activity
    * Create an activity
    * Delete an activity
    * Get an activity
    * Get all companies
    * Update an activity
* Company
    * Create a company
    * Delete a company
    * Get a company
    * Get all companies
    * Update a company
* Deal
    * Create a deal
    * Delete a deal
    * Get a deal
    * Get all deals
    * Update a deal

## Example Usage

This workflow allows you to create a company in Salesmate. You can also find the [workflow](https://n8n.io/workflows/500) on the website. This example usage workflow would use the following two nodes.
- [Start](/integrations/builtin/core-nodes/n8n-nodes-base.start/)
- [Salesmate]()

The final workflow should look like the following image.

![A workflow with the Salesmate node](/_images/integrations/builtin/app-nodes/salesmate/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Salesmate node

1. First of all, you'll have to enter credentials for the Salesmate node. You can find out how to do that [here](/integrations/builtin/credentials/salesmate/).
2. Select the 'Company' option from the *Resource* dropdown list.
3. Enter the name of the company in the *Name* field.
4. Select the owner from the *Owner* dropdown list.
5. Click on *Execute Node* to run the workflow.

