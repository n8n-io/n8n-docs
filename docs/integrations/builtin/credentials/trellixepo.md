---
title: Trellix ePO credentials
description: >-
  Documentation for the Trellix ePO credentials. Use these credentials to
  authenticate Trellix ePO in n8n, a workflow automation platform.
contentType:
  - integration
  - reference
priority: medium
nodeTitle: Trellix ePO credentials
originalFilePath: integrations/builtin/credentials/trellixepo.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/credentials/trellixepo'
url: 'https://docs.n8n.io/integrations/builtin/credentials/trellixepo'
layout:
  description:
    visible: false
---

# Trellix ePO credentials <a href="#trellix-epo-credentials" id="trellix-epo-credentials"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/7QbEnpnpOks3Rq0SiMFb/" %}

## Prerequisites <a href="#prerequisites" id="prerequisites"></a>

Create a [Trellix ePolicy Orchestrator](https://www.trellix.com/products/epo/) account.

## Supported authentication methods <a href="#supported-authentication-methods" id="supported-authentication-methods"></a>

- Basic auth

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [Trellix ePO's documentation](https://docs.trellix.com/bundle/epolicy-orchestrator-web-api-reference-guide/page/GUID-D87A6839-AED2-47B0-BE93-5BF83F710278.html) for more information about the service.

This is a credential-only node. Refer to [Custom API operations](../custom-api-actions-for-existing-nodes.md) to learn more. View [example workflows and related content](https://n8n.io/integrations/trellix-epo/) on n8n's website.

## Using basic auth <a href="#using-basic-auth" id="using-basic-auth"></a>

To configure this credential, you'll need:

- A **Username** to connect as.
- A **Password** for that user account.

n8n uses These fields to build the `-u` parameter in the format of `-u username:pw`. Refer to [Web API basics](https://docs.trellix.com/bundle/epolicy-orchestrator-web-api-reference-guide/page/GUID-2503B69D-2BCE-4491-9969-041838B39C1F.html) for more information.
