---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Mist credentials
description: Documentation for the Mist credentials. Use these credentials to authenticate Mist in n8n, a workflow automation platform.
---

# Mist credentials

--8<-- "_snippets/integrations/builtin/credentials/cred-only-statement.md"

## Prerequisites

Create a [Mist](https://www.mist.com/){:target=_blank .external-link} account and organization. Refer to [Create a Mist account and Organization](https://www.mist.com/documentation/create-mist-org/){:target=_blank .external-link} for detailed instructions.

## Supported authentication methods

- API token

## Related resources

Refer to [Mist's documentation](https://www.mist.com/documentation/mist-api-introduction/){:target=_blank .external-link} for more information about the service. If you're logged in to your Mist account, go to [https://api.mist.com/api/v1/docs/Home](https://api.mist.com/api/v1/docs/Home){:target=_blank .external-link} to view the full API documentation.

This is a credential-only node. Refer to [Custom API operations](/integrations/custom-operations/) to learn more. View [example workflows and related content](https://n8n.io/integrations/mist/){:target=_blank .external-link} on n8n's website.

## Using API token

To configure this credential, you'll need:

- An **API Token**: You can use either a User API token or an Org API token. Refer to [How to generate a user API token](https://www.mist.com/documentation/using-postman/){:target=_blank .external-link} for instructions on generating a User API token. Refer to [Org API token](https://www.mist.com/documentation/org-api-token/){:target=_blank .external-link} for instructions on generating an Org API token.
- Select the **Region** you're in. Options include:
    - **Europe**: Select this option if your cloud environment is in any of the EMEA regions.
    - **Global**: Select this option if your cloud environment is in any of the global regions.
