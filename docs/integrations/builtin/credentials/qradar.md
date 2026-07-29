---
title: QRadar credentials
description: >-
  Documentation for the QRadar credentials. Use these credentials to
  authenticate QRadar in n8n, a workflow automation platform.
contentType:
  - integration
  - reference
nodeTitle: QRadar credentials
originalFilePath: integrations/builtin/credentials/qradar.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/credentials/qradar'
url: 'https://docs.n8n.io/integrations/builtin/credentials/qradar'
layout:
  description:
    visible: false
---

# QRadar credentials <a href="#qradar-credentials" id="qradar-credentials"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/7QbEnpnpOks3Rq0SiMFb/" %}

## Prerequisites <a href="#prerequisites" id="prerequisites"></a>

Create a [Qradar](https://www.ibm.com/qradar) account.

## Supported authentication methods <a href="#supported-authentication-methods" id="supported-authentication-methods"></a>

- API key

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [QRadar's documentation](https://ibmsecuritydocs.github.io/qradar_api_overview/) for more information about the service.

This is a credential-only node. Refer to [Custom API operations](../custom-api-actions-for-existing-nodes.md) to learn more. View [example workflows and related content](https://n8n.io/integrations/qradar/) on n8n's website.

## Using API key <a href="#using-api-key" id="using-api-key"></a>

To configure this credential, you'll need:

- An **API Key**: Also known as an authorized service token. Use the **Manage Authorized Services** window on the **Admin** tab to create an authentication token. Refer to [Creating an authentication token](https://www.ibm.com/docs/en/qradar-common?topic=forwarding-creating-authentication-token) for more information.
