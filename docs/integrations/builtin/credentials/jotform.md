---
title: Jotform credentials
description: >-
  Documentation for Jotform credentials. Use these credentials to authenticate
  Jotform in n8n, a workflow automation platform.
contentType:
  - integration
  - reference
priority: medium
nodeTitle: Jotform credentials
originalFilePath: integrations/builtin/credentials/jotform.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/credentials/jotform'
url: 'https://docs.n8n.io/integrations/builtin/credentials/jotform'
layout:
  description:
    visible: false
---

# Jotform credentials <a href="#jotform-credentials" id="jotform-credentials"></a>

You can use these credentials to authenticate the following nodes:

- [Jotform Trigger](../trigger-nodes/n8n-nodes-base.jotformtrigger.md)

## Supported authentication methods <a href="#supported-authentication-methods" id="supported-authentication-methods"></a>

- API key

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [Jotform's API documentation](https://api.jotform.com/docs/) for more information about the service.

## Using API key <a href="#using-api-key" id="using-api-key"></a>

To configure this credential, you'll need a [Jotform](https://www.jotform.com/) account and:

- An **API Key**
- The **API Domain**

To set it up:

1. Go to **Settings >** [**API**](https://www.jotform.com/myaccount/api).
2. Select **Create New Key**.
3. Select the **Name** in Jotform to update the API key name to something meaningful, like `n8n integration`.
4. Copy the **API Key** and enter it in your n8n credential.
5. In n8n, select the **API Domain** that applies to you based on the forms you're using:
    - **api.jotform.com**: Use this unless the other form types apply to you.
    - **eu-api.jotform.com**: Select this if you're using Jotform [EU Safe Forms](https://www.jotform.com/eu-safe-forms/).
    - **hipaa-api.jotform.com**: Select this if you're using Jotform [HIPAA forms](https://www.jotform.com/hipaa/).

Refer to the [Jotform API documentation](https://api.jotform.com/docs/) for more information on creating keys and API domains.
