---
title: Bitbucket credentials
description: Documentation for Bitbucket credentials. Use these credentials to authenticate Bitbucket in n8n, a workflow automation platform.
contentType: [integration, reference]
---

# Bitbucket credentials

You can use these credentials to authenticate the following nodes:

- [Bitbucket Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.bitbuckettrigger.md)

## Prerequisites

Create a [Bitbucket](https://www.bitbucket.com/) account.

## Supported authentication methods

- Atlassian email and a scoped API token

## Related resources

Refer to [Bitbucket's API documentation](https://developer.atlassian.com/cloud/bitbucket/rest/intro/#authentication) for more information about the service.

## Using Atlassian email/scoped API token

To configure this credential, you'll need:

- An Atlassian **email**: Visible in your **Atlassian account settings**.
- A **Scoped API Token**: Refer to the Bitbucket instructions to [Create an API token](https://support.atlassian.com/bitbucket-cloud/docs/create-an-api-token/).

## API token permissions

Bitbucket API credentials will only work if the API token has the appropriate scopes. The n8n credentials dialog will throw an error if the API token lacks the appropriate permissions for the selected scope.

See the [Bitbucket Api token permissions documentation](https://support.atlassian.com/bitbucket-cloud/docs/api-token-permissions/) for more information on working with these permissions.

Important scopes:

- `read:webhook:bitbucket`
- `write:webhook:bitbucket`
- `delete:webhook:bitbucket`
- `read:repository:bitbucket`
- `read:workspace:bitbucket`

