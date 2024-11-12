---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Jira credentials
description: Documentation for Jira credentials. Use these credentials to authenticate Jira in n8n, a workflow automation platform.
contentType: integration
priority: medium
---

# Jira credentials

You can use these credentials to authenticate the following nodes:

- [Jira](/integrations/builtin/app-nodes/n8n-nodes-base.jira/)
- [Jira Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.jiratrigger/)

## Prerequisites

Create a [Jira](https://www.atlassian.com/software/jira){:target=_blank .external-link} Software Cloud or Server account.

## Supported authentication methods

- [SW Cloud API token](#using-sw-cloud-api-token): Use this method with [Jira Software Cloud](https://www.atlassian.com/software/jira){:target=_blank .external-link}.
- [SW Server account](#using-sw-server-account): Use this method with [Jira Software Server](https://www.atlassian.com/software/jira/download.){:target=_blank .external-link}.

## Related resources

Refer to [Jira's API documentation](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#about){:target=_blank .external-link} for more information about the service.

## Using SW Cloud API token

To configure this credential, you'll need an account on [Jira Software Cloud](https://www.atlassian.com/software/jira){:target=_blank .external-link}.

Then:

1. Log in to your Atlassian profile > **Security > API tokens** page, or jump straight there using this [link](https://id.atlassian.com/manage-profile/security/api-tokens){:target=_blank .external-link}.
2. Select **Create API Token**.
3. Enter a good **Label** for your token, like `n8n integration`.
4. Select **Create**.
5. Copy the API token.
6. In n8n, enter the **Email** address associated with your Jira account.
7. Paste the API token you copied as your **API Token**.
8. Enter the **Domain** you access Jira on, for example `https://example.atlassian.net`.

Refer to [Manage API tokens for your Atlassian account](https://support.atlassian.com/atlassian-account/docs/manage-api-tokens-for-your-atlassian-account/){:target=_blank .external-link} for more information.

/// note | New tokens
New tokens may take up to a minute before they work. If your credential verification fails the first time, wait a minute before retrying.
///

## Using SW Server account

To configure this credential, you'll need an account on [Jira Software Server](https://www.atlassian.com/software/jira/download.){:target=_blank .external-link}.

Then:

1. Enter the **Email** address associated with your Jira account.
2. Enter your Jira account **Password**.
3. Enter the **Domain** you access Jira on.

