---
title: SurveyMonkey trigger
description: Documentation for the SurveyMonkey trigger node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
contentType: integration
---

# SurveyMonkey trigger

[SurveyMonkey](https://www.surveymonkey.com/) is an online cloud-based SaaS survey platform that also provides a suite of paid back-end programs.

/// note | Credentials
You can find authentication information for this node [here](/integrations/builtin/credentials/surveymonkey/).
///

///  note  | Examples and templates
For usage examples and templates to help you get started, refer to n8n's [SurveyMonkey Trigger integrations](https://n8n.io/integrations/surveymonkey-trigger/){:target=_blank .external-link} page.
///

## Example Usage

This workflow allows you to receive updates when responses are created for SurveyMonkey surveys. You can also find the [workflow](https://n8n.io/workflows/551) on the website. This example usage workflow would use the following node.

- [SurveyMonkey Trigger]()

The final workflow should look like the following image.

![A workflow with the SurveyMonkey Trigger node](/_images/integrations/builtin/trigger-nodes/surveymonkeytrigger/workflow.png)


### 1. SurveyMonkey Trigger node

1. First of all, you'll have to enter credentials for the SurveyMonkey Trigger node. You can find out how to do that [here](/integrations/builtin/credentials/surveymonkey/).
2. Select the 'Survey' option from the *Type* dropdown list.
3. Select 'Response Created' from the *Event* dropdown list.
4. Select the surveys you want to receive updates for from the *Survey IDs* dropdown list.
5. Click on *Execute Node* to run the workflow.

/// note | Activate workflow for production
You'll need to save the workflow and then click on the Activate toggle on the top right of the screen to activate the workflow. Your workflow will then be triggered as specified by the settings in the SurveyMonkey Trigger node.
///

