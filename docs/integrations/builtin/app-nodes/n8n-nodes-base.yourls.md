---
title: Yourls
description: Documentation for the Yourls node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
contentType: integration
---

# Yourls

Use the Yourls node to automate work in Yourls, and integrate Yourls with other applications. n8n has built-in support for a wide range of Yourls features, including expanding and shortening URLs. 

On this page, you'll find a list of operations the Yourls node supports and links to more resources.

/// note | Credentials
Refer to [Yourls credentials](/integrations/builtin/credentials/yourls/) for guidance on setting up authentication. 
///
/// note | Examples and templates
For usage examples and templates to help you get started, take a look at n8n's [Yourls integrations](https://n8n.io/integrations/yourls/){:target="_blank" .external-link} list.
///

## Basic Operations

* URL
    * Expand a URL
    * Shorten a URL
    * Get stats about one short URL

## Example Usage

This workflow allows you to create a short URL and get the statistics of the URL. You can also find the [workflow](https://n8n.io/workflows/815) on n8n.io. This example usage workflow uses the following nodes.
- [Start](/integrations/builtin/core-nodes/n8n-nodes-base.start/)
- [Yourls]()

The final workflow should look like the following image.

![A workflow with the Yourls node](/_images/integrations/builtin/app-nodes/yourls/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Yourls node (shorten: url)

This node will create  a short URL for the link we specify.

1. First of all, you'll have to enter credentials for the Yourls node. You can find out how to do that [here](/integrations/builtin/credentials/yourls/).
2. Enter the URL that you want to shorten in the ***URL*** field.
3. Click on ***Add Field*** and select 'Title'.
4. Enter a title in the ***Title*** field.
5. Click on ***Test step*** to run the node.

In the screenshot below, you will notice that the node creates a short URL for the URL you specified.

![Using the Yourls node to create short URL](/_images/integrations/builtin/app-nodes/yourls/yourls_node.png)

### 3. Yourls1 node (stats: url)

This node will give us the statistics of the short URL that we specify. We will get the statistics for the URL that we created in the previous step.

1. Select the credentials that you entered in the previous node.
2. Select 'Stats' from the ***Operation*** dropdown list.
3. Click on the gears icon next to the ***Short URL*** field and click on ***Add Expression***.
4. Select the following in the ***Variable Selector*** section: Nodes > Yourls > Output Data > JSON > shorturl. You can also add the following expression: `{{$node["Yourls"].json["shorturl"]}}`.
5. Click on ***Test step*** to run the node.

In the screenshot below, you will notice that the node gives us the statistics of the short URL that we created in the previous node.

![Using the Yourls node to get the statistics of a short URL](/_images/integrations/builtin/app-nodes/yourls/yourls1_node.png)

