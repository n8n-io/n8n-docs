---
title: Qualys credentials
description: >-
  Documentation for the Qualys credentials. Use these credentials to
  authenticate Qualys in n8n, a workflow automation platform.
contentType:
  - integration
  - reference
nodeTitle: Qualys credentials
originalFilePath: integrations/builtin/credentials/qualys.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/credentials/qualys'
url: 'https://docs.n8n.io/integrations/builtin/credentials/qualys'
layout:
  description:
    visible: false
---

# Qualys credentials <a href="#qualys-credentials" id="qualys-credentials"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/7QbEnpnpOks3Rq0SiMFb/" %}

## Prerequisites <a href="#prerequisites" id="prerequisites"></a>

Create a [Qualys](https://www.qualys.com/) user account with any user role except Contact.

## Supported authentication methods <a href="#supported-authentication-methods" id="supported-authentication-methods"></a>

- Basic auth

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [Qualys's documentation](https://qualysguard.qg2.apps.qualys.com/qwebhelp/fo_portal/api_doc/index.htm) for more information about the service.

This is a credential-only node. Refer to [Custom API operations](../custom-api-actions-for-existing-nodes.md) to learn more. View [example workflows and related content](https://n8n.io/integrations/qualys/) on n8n's website.

## Using basic auth <a href="#using-basic-auth" id="using-basic-auth"></a>

To configure this credential, you'll need:

- A **Username**
- A **Password**
- A **Requested With** string: Enter a user description, like a user agent, or keep the default `n8n application`. This sets the required `X-Requested-With` header.
