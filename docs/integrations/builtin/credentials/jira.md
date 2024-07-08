---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Jira credentials
description: Documentation for Jira credentials. Use these credentials to authenticate Jira in n8n, a workflow automation platform.
contentType: integration
---

# Jira credentials

You can use these credentials to authenticate the following nodes:

- [Jira](/integrations/builtin/app-nodes/n8n-nodes-base.jira/)
- [Jira Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.jiratrigger/)

## Prerequisites

Create a [Jira](https://www.atlassian.com/software/jira){:target=_blank .external-link} Software Cloud or Server account.

## Supported authentication methods

- SW Cloud API token: For use with Jira Software Cloud
- SW Server account: For use with Jira Software Server

## Related resources

Refer to [Jira's API documentation](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#about){:target=_blank .external-link} for more information about the service.

## Using SW Cloud API token

To configure this credential, you'll need:

- The **Email** address associated with your Jira account
- An **API Token**: Refer to [Manage API tokens for your Atlassian account](https://support.atlassian.com/atlassian-account/docs/manage-api-tokens-for-your-atlassian-account/){:target=_blank .external-link} for instructions to create an API token.
- The **Domain** you access Jira on

## Using SW Server account

To configure this credential, you'll need:

- The **Email** address associated with your Jira account
- A **Password** for that account
- The **Domain** you access Jira on

