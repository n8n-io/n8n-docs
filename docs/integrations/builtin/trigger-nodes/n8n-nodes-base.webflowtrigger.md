---
title: Webflow trigger
description: Documentation for the Webflow trigger node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
contentType: integration
---

# Webflow trigger

[Webflow](https://webflow.com) is an application that allows you to build responsive websites with browser-based visual editing software.

/// note | Credentials
You can find authentication information for this node [here](/integrations/builtin/credentials/webflow/).
///

///  note  | Examples and templates
For usage examples and templates to help you get started, refer to n8n's [Webflow Trigger integrations](https://n8n.io/integrations/webflow-trigger/){:target=_blank .external-link} page.
///

## Example Usage

This workflow allows you to receive updates when a form submission occurs in your Webflow website. You can also find the [workflow](https://n8n.io/workflows/651) on n8n.io. This example usage workflow would use the following node.

- [Webflow Trigger]()

The final workflow should look like the following image.

![A workflow with the Webflow Trigger node](/_images/integrations/builtin/trigger-nodes/webflowtrigger/workflow.png)

### 1. Webflow Trigger node

1. First of all, you'll have to enter credentials for the Webflow Trigger node. You can find out how to do that [here](/integrations/builtin/credentials/webflow/).
2. Select your website from the ***Site*** dropdown list.
3. Click on ***Test step*** to run the node.

/// note | Activate workflow for production
You'll need to save the workflow and then click on the Activate toggle on the top right of the screen to activate the workflow. Your workflow will then be triggered as specified by the settings in the Webflow Trigger node.
///

