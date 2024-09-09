---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Bitbucket credentials
description: Documentation for Bitbucket credentials. Use these credentials to authenticate Bitbucket in n8n, a workflow automation platform.
contentType: integration
---

# Bitbucket credentials

You can use these credentials to authenticate the following nodes:

- [Bitbucket Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.bitbuckettrigger/)

## Prerequisites

Create a [Bitbucket](https://www.bitbucket.com/){:target=_blank .external-link} account.

## Supported authentication methods

- API username and app password

## Related resources

Refer to [Bitbucket's API documentation](https://developer.atlassian.com/cloud/bitbucket/rest/intro/#authentication){:target=_blank .external-link} for more information about the service.

## Using API username/app password

To configure this credential, you'll need:

- A **Username**: Visible in your Bitbucket profile settings **Personal settings > Account settings**.
- An **App Password**: Refer to the Bitbucket instructions to [Create an app password](https://support.atlassian.com/bitbucket-cloud/docs/create-an-app-password/){:target=_blank .external-link}.

## App password permissions

Bitbucket API credentials will only work if the user account you generated the app password for has the appropriate privilege scopes for the selected app password permissions. The n8n credentials dialog will throw an error if the user account lacks the appropriate permissions for the selected scope, like `Your credentials lack one or more required privilege scopes`.

See the [Bitbucket App password permissions documentation](https://support.atlassian.com/bitbucket-cloud/docs/app-password-permissions/){:target=_blank .external-link} for more information on working with these permissions.

