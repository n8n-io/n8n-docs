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

- Access token

## Related resources

Refer to [Bitbucket's API documentation](https://developer.atlassian.com/cloud/bitbucket/rest/intro/#authentication) for more information about the service.

## Configuring Bitbucket access token

1. Log in to Bitbucket and open your account or personal settings.
2. Find the section for API tokens or security settings.
3. Create a new API token, giving it a name and expiry date that matches your use case.
4. Select Bitbucket as the app, then choose the required scopes (permissions):

    ```bash
    read:user:bitbucket
    read:workspace:bitbucket
    read:repository:bitbucket
    read:webhook:bitbucket
    write:webhook:bitbucket
    delete:webhook:bitbucket
    ```

5. Review and create the token. Copy the generated token and add it to n8n. Bitbucket only shows the token once.

For detailed instructions, see [Create an API token](https://support.atlassian.com/bitbucket-cloud/docs/create-an-api-token/).

