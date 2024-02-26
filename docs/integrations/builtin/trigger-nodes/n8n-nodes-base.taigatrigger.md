---
title: Taiga trigger
description: Documentation for the Taiga trigger node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
contentType: integration
---

# Taiga trigger

[Taiga](https://www.taiga.io/) is a free and open-source project management platform for startups, agile developers, and designers.

/// note | Credentials
You can find authentication information for this node [here](/integrations/builtin/credentials/taiga/).
///

///  note  | Examples and templates
For usage examples and templates to help you get started, refer to n8n's [Taiga Trigger integrations](https://n8n.io/integrations/taiga-trigger/){:target=_blank .external-link} page.
///

## Example Usage

This workflow allows you to receive updates when an event occurs in Taiga. You can also find the [workflow](https://n8n.io/workflows/686) on n8n.io. This example usage workflow would use the following node.

- [Taiga Trigger]()

The final workflow should look like the following image.

![A workflow with the Taiga Trigger node](/_images/integrations/builtin/trigger-nodes/taigatrigger/workflow.png)

### 1. Taiga Trigger node

1. First of all, you'll have to enter credentials for the Taiga Trigger node. You can find out how to do that [here](/integrations/builtin/credentials/taiga/).
2. Select the project ID from the ***Project ID*** dropdown list.
2. Click on ***Test step*** to run the node.

/// note | Activate workflow for production
You'll need to save the workflow and then click on the Activate toggle on the top right of the screen to activate the workflow. Your workflow will then be triggered as specified by the settings in the Taiga Trigger node.
///

