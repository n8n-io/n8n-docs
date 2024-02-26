---
title: Jira trigger
description: Documentation for the Jira trigger node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
contentType: integration
---

# Jira trigger

[Jira](https://www.atlassian.com/software/jira) is a proprietary issue tracking product developed by Atlassian that allows bug tracking and agile project management.

/// note | Credentials
You can find authentication information for this node [here](/integrations/builtin/credentials/jira/).
///

///  note  | Examples and templates
For usage examples and templates to help you get started, refer to n8n's [Jira trigger integrations](https://n8n.io/integrations/jira-trigger/){:target=_blank .external-link} page.
///

## Example Usage

This workflow allows you to receive updates for Jira events. You can also find the [workflow](https://n8n.io/workflows/569) on the website. This example usage workflow would use the following node.

- [Jira Trigger]()

The final workflow should look like the following image.

![A workflow with the Jira Trigger node](/_images/integrations/builtin/trigger-nodes/jiratrigger/workflow.png)


### 1. Jira Trigger node

1. First of all, you'll have to enter credentials for the Jira Trigger node. You can find out how to do that [here](/integrations/builtin/credentials/jira/).
2. Select the `*` option in the *Events* field to receive updates when any event is triggered.
3. Click on *Execute Node* to run the workflow.

/// note | Activate workflow for production
You'll need to save the workflow and then click on the Activate toggle on the top right of the screen to activate the workflow. Your workflow will then be triggered as specified by the settings in the Jira Trigger node.
///

