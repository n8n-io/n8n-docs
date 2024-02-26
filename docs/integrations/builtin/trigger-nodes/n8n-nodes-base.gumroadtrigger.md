---
title: Gumroad trigger
description: Documentation for the Gumroad trigger node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
contentType: integration
---

# Gumroad trigger

[Gumroad](https://gumroad.com) is an online platform that enables creators to sell products directly to consumers.

/// note | Credentials
You can find authentication information for this node [here](/integrations/builtin/credentials/gumroad/).
///

///  note  | Examples and templates
For usage examples and templates to help you get started, refer to n8n's [Gumroad Trigger integrations](https://n8n.io/integrations/gumroad-trigger/){:target=_blank .external-link} page.
///

## Example Usage

This workflow allows you to receive updates when a sale is made in Gumroad. You can also find the [workflow](https://n8n.io/workflows/650) on n8n.io. This example usage workflow would use the following node.

- [Gumroad Trigger]()

The final workflow should look like the following image.

![A workflow with the Gumroad Trigger node](/_images/integrations/builtin/trigger-nodes/gumroadtrigger/workflow.png)

### 1. Gumroad Trigger node

1. First of all, you'll have to enter credentials for the Gumroad Trigger node. You can find out how to do that [here](/integrations/builtin/credentials/gumroad/).
2. Select 'Sale' from the ***Resource*** dropdown list.
3. Click on ***Test step*** to run the node.

/// note | Activate workflow for production
You'll need to save the workflow and then click on the Activate toggle on the top right of the screen to activate the workflow. Your workflow will then be triggered as specified by the settings in the Gumroad Trigger node.
///

