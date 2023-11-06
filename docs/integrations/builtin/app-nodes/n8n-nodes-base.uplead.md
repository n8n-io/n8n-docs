---
title: UpLead
description: Documentation for the UpLead node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
contentType: integration
---

# UpLead

Use the UpLead node to automate work in UpLead, and integrate UpLead with other applications. n8n supports several UpLead operations, including getting company information. 

On this page, you'll find a list of operations the UpLead node supports and links to more resources.

/// note | Credentials
Refer to [UpLead credentials](/integrations/builtin/credentials/uplead/) for guidance on setting up authentication. 
///
/// note | Examples and templates
For usage examples and templates to help you get started, take a look at n8n's [UpLead integrations](https://n8n.io/integrations/uplead/){:target="_blank" .external-link} list.
///

## Basic Operations

* Company
    * Enrich
* Person
    * Enrich

## Example Usage

This workflow allows you to get information about a company with UpLead. You can also find the [workflow](https://n8n.io/workflows/504) on the website. This example usage workflow would use the following two nodes.
- [Start](/integrations/builtin/core-nodes/n8n-nodes-base.start/)
- [UpLead]()

The final workflow should look like the following image.

![A workflow with the UpLead node](/_images/integrations/builtin/app-nodes/uplead/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. UpLead node

1. First of all, you'll have to enter credentials for the UpLead node. You can find out how to do that [here](/integrations/builtin/credentials/uplead/).
2. Enter the name of the company in the *Company* field. For example, I entered `Apple`.
3. Click on *Execute Node* to run the workflow.

