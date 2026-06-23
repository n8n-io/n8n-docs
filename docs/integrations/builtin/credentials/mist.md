---
title: Mist credentials
description: >-
  Documentation for the Mist credentials. Use these credentials to authenticate
  Mist in n8n, a workflow automation platform.
contentType:
  - integration
  - reference
priority: medium
nodeTitle: Mist credentials
originalFilePath: integrations/builtin/credentials/mist.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/credentials/mist'
url: 'https://docs.n8n.io/integrations/builtin/credentials/mist'
layout:
  description:
    visible: false
---

# Mist credentials <a href="#mist-credentials" id="mist-credentials"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/tpXm8e1W7wVyh16Nhf6p/" %}

## Prerequisites <a href="#prerequisites" id="prerequisites"></a>

Create a [Mist](https://www.mist.com/) account and organization. Refer to [Create a Mist account and Organization](https://www.mist.com/documentation/create-mist-org/) for detailed instructions.

## Supported authentication methods <a href="#supported-authentication-methods" id="supported-authentication-methods"></a>

- API token

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [Mist's documentation](https://www.mist.com/documentation/mist-api-introduction/) for more information about the service. If you're logged in to your Mist account, go to [https://api.mist.com/api/v1/docs/Home](https://api.mist.com/api/v1/docs/Home) to view the full API documentation.

This is a credential-only node. Refer to [Custom API operations](../custom-api-actions-for-existing-nodes.md) to learn more. View [example workflows and related content](https://n8n.io/integrations/mist/) on n8n's website.

## Using API token <a href="#using-api-token" id="using-api-token"></a>

To configure this credential, you'll need:

- An **API Token**: You can use either a User API token or an Org API token. Refer to [How to generate a user API token](https://www.mist.com/documentation/using-postman/) for instructions on generating a User API token. Refer to [Org API token](https://www.mist.com/documentation/org-api-token/) for instructions on generating an Org API token.
- Select the **Region** you're in. Options include:
    - **Europe**: Select this option if your cloud environment is in any of the EMEA regions.
    - **Global**: Select this option if your cloud environment is in any of the global regions.
