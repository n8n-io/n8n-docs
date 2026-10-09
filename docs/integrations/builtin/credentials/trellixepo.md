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

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/KbKP88R2IFii1k97togq/" %}

## Prerequisites <a href="#prerequisites" id="prerequisites"></a>

Create a [Trellix ePolicy Orchestrator](https://www.trellix.com/products/epo/) account.

## Supported authentication methods <a href="#supported-authentication-methods" id="supported-authentication-methods"></a>

- Basic auth

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [Trellix ePO's documentation](https://docs.trellix.com/docs/trellix-epolicy-orchestrator-on-prem-web-api-scripting-reference-guide) for more information about the service.

This is a credential-only node. Refer to [Custom API operations](../custom-api-actions-for-existing-nodes.md) to learn more. View [example workflows and related content](https://n8n.io/integrations/trellix-epo/) on n8n's website.

## Using basic auth <a href="#using-basic-auth" id="using-basic-auth"></a>

To configure this credential, you'll need:

- A **Username** to connect as.
- A **Password** for that user account.

n8n uses these fields to build the `-u` parameter in the format of `-u username:pw`. Refer to [Web API basics](https://docs.trellix.com/docs/web-api-basics) for more information.
