---
title: Keap trigger
description: Documentation for the Keap trigger node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
contentType: integration
---

# Keap trigger

[Keap](https://keap.com/) is an e-mail marketing and sales platform for small businesses, including products to manage and optimize the customer lifecycle, customer relationship management, marketing automation, lead capture, and e-commerce.

/// note | Credentials
You can find authentication information for this node [here](/integrations/builtin/credentials/keap/).
///

///  note  | Examples and templates
For usage examples and templates to help you get started, refer to n8n's [Keap Trigger integrations](https://n8n.io/integrations/keap-trigger/){:target=_blank .external-link} page.
///

## Example Usage

This workflow allows you to receive updates when new contacts are created in Keap. You can also find the [workflow](https://n8n.io/workflows/554) on the website. This example usage workflow would use the following node.

- [Keap Trigger]()

The final workflow should look like the following image.

![A workflow with the Keap Trigger node](/_images/integrations/builtin/trigger-nodes/keaptrigger/workflow.png)


### 1. Keap Trigger node

1. First of all, you'll have to enter credentials for the Keap Trigger node. You can find out how to do that [here](/integrations/builtin/credentials/keap/).
2. Select the 'Contact Add' option from the *Event* dropdown list to receive updates when a new contact is created.
3. Click on *Execute Node* to run the workflow.

/// note | Activate workflow for production
You'll need to save the workflow and then click on the Activate toggle on the top right of the screen to activate the workflow. Your workflow will then be triggered as specified by the settings in the Keap Trigger node.
///

