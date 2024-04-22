---
title: Bitbucket credentials
description: Documentation for Bitbucket credentials. Use these credentials to authenticate Bitbucket in n8n, a workflow automation platform.
contentType: integration
---

# Bitbucket credentials

You can use these credentials to authenticate the following nodes with Bitbucket.

- [Bitbucket Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.bitbuckettrigger/)

## Prerequisites

Create a [Bitbucket](https://www.bitbucket.com/){:target=_blank .external-link} account.

## Supported authentication methods

- API Username and App Password

## Using API Username/App Password

Follow the Bitbucket instructions to [Create an app password](https://support.atlassian.com/bitbucket-cloud/docs/create-an-app-password/){:target=_blank .external-link}.

The **username** is visible in your Bitbucket profile settings in **Personal settings > Account settings**.

## App password permissions

Bitbucket API credentials will only work if the user account you generated the app password for has the appropriate privilege scopes for the selected app password permissions. The n8n credentials dialog will throw an error if the user account lacks the appropriate permissions for the selected scope, like `Your credentials lack one or more required privilege scopes`.

See the [Bitbucket App password permissions documentation](https://support.atlassian.com/bitbucket-cloud/docs/app-password-permissions/){:target=_blank .external-link} for more information on working with these permissions.

