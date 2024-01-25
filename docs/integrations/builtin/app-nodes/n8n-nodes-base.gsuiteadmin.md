---
title: G Suite Admin
description: Documentation for the G Suite Admin node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
contentType: integration
---

# G Suite Admin

Use the G Suite Admin node to automate work in G Suite Admin, and integrate G Suite Admin with other applications. n8n has built-in support for a wide range of G Suite Admin features, including creating, updating, deleting, and getting users, and groups. 

On this page, you'll find a list of operations the G Suite Admin node supports and links to more resources.

/// note | Credentials
Refer to [G Suite Admin credentials](/integrations/builtin/credentials/google/) for guidance on setting up authentication. 
///
/// note | Examples and templates
For usage examples and templates to help you get started, take a look at n8n's [G Suite Admin integrations](https://n8n.io/integrations/google-workspace-admin/){:target="_blank" .external-link} list.
///


## Basic Operations

* Group
    * Create a group
    * Delete a group
    * Get a group
    * Get all groups
    * Update a group
* User
    * Create a user
    * Delete a user
    * Get a user
    * Get all users
    * Update a user



## FAQs

### What are the different ways to project a user's information?

There are three different ways to project a user's information:

- ***Basic:*** Doesn't include any custom fields.
- ***Custom:*** Includes the custom fields from schemas in `customField`.
- ***Full:*** Include all the fields associated with the user.

You can include custom fields by following the steps mentioned below.
1. Select 'Custom' from the ***Projection*** dropdown list.
2. Click on the ***Add Options*** button and select 'Custom Schemas' from the dropdown list.
3. Select the schema names you want to include from the ***Custom Schemas*** dropdown list.

