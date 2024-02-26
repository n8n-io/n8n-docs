---
title: Copper trigger
description: Documentation for the Copper trigger node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
contentType: integration
---

# Copper trigger

[Copper](https://www.copper.com/) is a CRM that focuses on strong integration with Google's G Suite. It's mainly targeted towards small and medium-sized businesses.

/// note | Credentials
You can find authentication information for this node [here](/integrations/builtin/credentials/copper/).
///

///  note  | Examples and templates
For usage examples and templates to help you get started, refer to n8n's [Copper Trigger integrations](https://n8n.io/integrations/copper-trigger/){:target=_blank .external-link} page.
///

## Example Usage

This workflow allows you to receive an update when a new project is created in Copper. You can also find the [workflow](https://n8n.io/workflows/537) on the website. This example usage workflow would use the following node.

- [Copper Trigger]()

The final workflow should look like the following image.

![A workflow with the Copper Trigger node](/_images/integrations/builtin/trigger-nodes/coppertrigger/workflow.png)


### 1. Copper Trigger node

1. First of all, you'll have to enter credentials for the Copper Trigger node. You can find out how to do that [here](/integrations/builtin/credentials/copper/).
2. Select 'Project' from the *Resource* dropdown list.
3. Select 'New' from the *Event* dropdown list.
4. Click on *Execute Node* to run the workflow.

/// note | Activate workflow for production
You'll need to save the workflow and then click on the Activate toggle on the top right of the screen to activate the workflow. Your workflow will then be triggered as specified by the settings in the Copper Trigger node.
///

