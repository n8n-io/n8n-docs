---
title: Clearbit node - n8n Documentation
description: Documentation for the Clearbit node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
---

# Clearbit

The Clearbit node allows you to automate work in Clearbit, and integrate Clearbit with other applications. n8n has built-in support for a wide range of Clearbit features, including auto-completing and looking up companies and persons.

On this page, you'll find a list of operations the Clearbit node supports and links to more resources.

!!! note "Credentials"
    Refer to [Clearbit credentials](/integrations/builtin/credentials/clearbit/) for guidance on setting up authentication. 

!!! note "Examples and templates"
    For usage examples and templates to help you get started, take a look at n8n's [Clearbit integrations](https://n8n.io/integrations/clearbit/){:target="_blank" .external-link} list.


## Basic Operations

* Company
    * Auto-complete company names and retrieve logo and domain
    * Look up person and company data based on an email or domain
* Person
    * Look up a person and company data based on an email or domain

## Example Usage

This workflow allows you to look up a person using their email in Clearbit. You can also find the [workflow](https://n8n.io/workflows/484) on the website. This example usage workflow would use the following two nodes.
- [Start](/integrations/builtin/core-nodes/n8n-nodes-base.start/)
- [Clearbit]()

The final workflow should look like the following image.

![A workflow with the Clearbit node](/_images/integrations/builtin/app-nodes/clearbit/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Clearbit node

1. First of all, you'll have to enter credentials for the Clearbit node. You can find out how to do that [here](/integrations/builtin/credentials/clearbit/).
2. Select the 'Person' option from the *Resource* dropdown list.
3. Enter the email of the person you want to look up in the *Email* field.
4. Click on *Execute Node* to run the workflow.

