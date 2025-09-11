---
title: QRadar credentials
description: Documentation for the QRadar credentials. Use these credentials to authenticate QRadar in n8n, a workflow automation platform.
contentType: [integration, reference]
---

# QRadar credentials

--8<-- "_snippets/integrations/builtin/credentials/cred-only-statement.md"

## Prerequisites

Create a [Qradar](https://www.ibm.com/qradar) account.

## Supported authentication methods

- API key

## Related resources

Refer to [QRadar's documentation](https://ibmsecuritydocs.github.io/qradar_api_overview/) for more information about the service.

This is a credential-only node. Refer to [Custom API operations](/integrations/custom-operations.md) to learn more. View [example workflows and related content](https://n8n.io/integrations/qradar/) on n8n's website.

## Using API key

To configure this credential, you'll need:

- An **API Key**: Also known as an authorized service token. Use the **Manage Authorized Services** window on the **Admin** tab to create an authentication token. Refer to [Creating an authentication token](https://www.ibm.com/docs/en/qradar-common?topic=forwarding-creating-authentication-token) for more information.
