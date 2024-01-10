---
title: OpenThesaurus
description: Documentation for the OpenThesaurus node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
contentType: integration
---

# OpenThesaurus

Use the OpenThesaurus node to automate work in OpenThesaurus, and integrate OpenThesaurus with other applications. n8n supports synonym look-up for German words. 

On this page, you'll find a list of operations the OpenThesaurus node supports and links to more resources.

/// note | Credentials
OpenThesaurus node does not require authentication. 
///
/// note | Examples and templates
For usage examples and templates to help you get started, take a look at n8n's [OpenThesaurus integrations](https://n8n.io/integrations/openthesaurus/){:target="_blank" .external-link} list.
///

## Basic Operations

* Get synonyms for a German word in German

## Example Usage

This workflow allows you to get synonyms of a German word in German. You can also find the [workflow](https://n8n.io/workflows/806) on the website. This example usage workflow would use the following nodes.
- [Start](/integrations/builtin/core-nodes/n8n-nodes-base.start/)
- [OpenThesaurus]()

The final workflow should look like the following image.

![A workflow with the OpenThesaurus node](/_images/integrations/builtin/app-nodes/openthesaurus/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. OpenThesaurus node

This node will return synonyms of the word `Hallo` in German. If you want to get synonyms of another German word, use that word instead.

1. Enter `Hallo` in the ***Text*** field.
2. Click on ***Test step*** to run the workflow.

In the screenshot below, you will notice that the node returns the synonyms of the word `Hallo`.

![Using the OpenThesaurus node to get the synonyms of the word Hallo](/_images/integrations/builtin/app-nodes/openthesaurus/openthesaurus_node.png)

