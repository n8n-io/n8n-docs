---
title: Acuity Scheduling credentials
description: >-
  Documentation for Acuity Scheduling credentials. Use these credentials to
  authenticate Acuity Scheduling in n8n, a workflow automation platform.
contentType:
  - integration
  - reference
priority: medium
nodeTitle: Acuity Scheduling credentials
originalFilePath: integrations/builtin/credentials/acuityscheduling.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/credentials/acuityscheduling'
url: 'https://docs.n8n.io/integrations/builtin/credentials/acuityscheduling'
layout:
  description:
    visible: false
---

# Acuity Scheduling credentials <a href="#acuity-scheduling-credentials" id="acuity-scheduling-credentials"></a>

You can use these credentials to authenticate the following nodes:

- [Acuity Scheduling Trigger](../trigger-nodes/n8n-nodes-base.acuityschedulingtrigger.md)

## Prerequisites <a href="#prerequisites" id="prerequisites"></a>

Create an [Acuity Scheduling](https://acuityscheduling.com/) account.

## Supported authentication methods <a href="#supported-authentication-methods" id="supported-authentication-methods"></a>

- API key
- OAuth2

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [Acuity's API documentation](https://developers.acuityscheduling.com/reference/quick-start) for more information about working with the service.

## Using API key <a href="#using-api-key" id="using-api-key"></a>

To configure this credential, you'll need:

- A numeric **User ID**
- An **API Key**

Refer to the [Acuity API Quick Start authentication instructions](https://developers.acuityscheduling.com/reference/quick-start#authentication) to generate an API key and view your User ID.

## Using OAuth2 <a href="#using-oauth2" id="using-oauth2"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/HoGXnGIfupVt81dGox48/" %}

If you need to set this up from scratch, complete the [Acuity OAuth2 Account Registration page](https://acuityscheduling.com/oauth2/register). Use the **Client ID** and **Client Secret** provided from that registration.
