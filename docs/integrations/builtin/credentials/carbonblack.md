---
title: Carbon Black credentials
description: >-
  Documentation for the Carbon Black credentials. Use these credentials to
  authenticate Carbon Black in n8n, a workflow automation platform.
contentType:
  - integration
  - reference
priority: medium
nodeTitle: Carbon Black credentials
originalFilePath: integrations/builtin/credentials/carbonblack.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/credentials/carbonblack'
url: 'https://docs.n8n.io/integrations/builtin/credentials/carbonblack'
layout:
  description:
    visible: false
---

# Carbon Black credentials <a href="#carbon-black-credentials" id="carbon-black-credentials"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/7QbEnpnpOks3Rq0SiMFb/" %}

## Prerequisites <a href="#prerequisites" id="prerequisites"></a>

- Create a [Carbon Black subscription](https://www.broadcom.com/products/carbon-black/threat-prevention/carbon-black-cloud).
- Create a [Carbon Black developer account](https://developer.carbonblack.com/).

## Authentication methods <a href="#authentication-methods" id="authentication-methods"></a>

- API key

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [Carbon Black's documentation](https://developer.carbonblack.com/reference/carbon-black-cloud/cb-defense/latest/rest-api/) for more information about the service.

This is a credential-only node. Refer to [Custom API operations](../custom-api-actions-for-existing-nodes.md) to learn more. View [example workflows and related content](https://n8n.io/integrations/carbon-black/) on n8n's website.

## Using API key <a href="#using-api-key" id="using-api-key"></a>

To configure this credential, you'll need:

- A **URL**: This URL is determined by the environment/product URL you use. You can find it by looking at the web address of your Carbon Black Cloud console. Refer to [Carbon Black's URL Parts documentation](https://developer.carbonblack.com/reference/carbon-black-cloud/authentication#the-url-parts) for more information.
- An **Access Token**: Refer to the [Carbon Black Create an API key documentation](https://developer.carbonblack.com/reference/carbon-black-cloud/authentication#carbon-black-cloud-manages-identities-and-roles) to create an API key. Add the **API Secret Key** as the **Access Token** in n8n.
