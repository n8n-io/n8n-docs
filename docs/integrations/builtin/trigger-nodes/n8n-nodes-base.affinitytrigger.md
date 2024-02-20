---
title: Affinity trigger
description: Documentation for the Affinity trigger node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
contentType: integration
---

# Affinity trigger

[Affinity](https://www.affinity.co/) is a powerful relationship intelligence platform enabling teams to leverage their network to close the next big deal.

/// note | Credentials
You can find authentication information for this node [here](/integrations/builtin/credentials/affinity/).
///

///  note  | Examples and templates
For usage examples and templates to help you get started, refer to n8n's [Affinity Trigger integrations](https://n8n.io/integrations/affinity-trigger/){:target=_blank .external-link} page.
///

## Example Usage

This workflow allows you to receive updates when a new list is created in Affinity. You can also find the [workflow](https://n8n.io/workflows/672) on n8n.io. This example usage workflow would use the following node.

- [Affinity Trigger]()

The final workflow should look like the following image.

![A workflow with the Affinity Trigger node](/_images/integrations/builtin/trigger-nodes/affinitytrigger/workflow.png)

### 1. Affinity Trigger node

1. First of all, you'll have to enter credentials for the Affinity Trigger node. You can find out how to do that [here](/integrations/builtin/credentials/affinity/).
2. Select 'list.created' from the ***Events*** dropdown list.
3. Click on ***Test step*** to run the node.

/// note | Activate workflow for production
You'll need to save the workflow and then click on the Activate toggle on the top right of the screen to activate the workflow. Your workflow will then be triggered as specified by the settings in the Affinity Trigger node.
///

