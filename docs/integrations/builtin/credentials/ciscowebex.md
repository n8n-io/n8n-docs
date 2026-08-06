---
title: Webex by Cisco credentials
description: >-
  Documentation for Webex by Cisco credentials. Use these credentials to
  authenticate Webex by Cisco in n8n, a workflow automation platform.
contentType:
  - integration
  - reference
nodeTitle: Webex by Cisco credentials
originalFilePath: integrations/builtin/credentials/ciscowebex.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/credentials/ciscowebex'
url: 'https://docs.n8n.io/integrations/builtin/credentials/ciscowebex'
layout:
  description:
    visible: false
---

# Webex by Cisco credentials <a href="#webex-by-cisco-credentials" id="webex-by-cisco-credentials"></a>

You can use these credentials to authenticate the following nodes:

- [Webex by Cisco](../app-nodes/n8n-nodes-base.ciscowebex.md)
- [Webex by Cisco Trigger](../trigger-nodes/n8n-nodes-base.ciscowebextrigger.md)

## Prerequisites <a href="#prerequisites" id="prerequisites"></a>

Create a [Webex by Cisco](https://www.webex.com/) account (this should automatically get you [developer account access](https://developer.webex.com)).

## Supported authentication methods <a href="#supported-authentication-methods" id="supported-authentication-methods"></a>

- OAuth2

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [Webex's API documentation](https://developer.webex.com/docs/getting-started) for more information about the service.

## Using OAuth2 <a href="#using-oauth2" id="using-oauth2"></a>

{% hint style="info" %}
**Note for n8n Cloud users**

You'll only need to enter the Credentials Name and select the **Connect my account** button in the OAuth credential to connect your Webex by Cisco account to n8n.
{% endhint %}

Should you need to configure OAuth2 from scratch, you'll need to create an integration to use this credential. Refer to the instructions in the [Webex Registering your Integration documentation](https://developer.webex.com/docs/integrations#registering-your-integration) to begin.

n8n recommends using the following **Scopes** for your integration:

* `spark:rooms_read`
* `spark:messages_write`
* `spark:messages_read`
* `spark:memberships_read`
* `spark:memberships_write`
* `meeting:recordings_write`
* `meeting:recordings_read`
* `meeting:preferences_read`
* `meeting:schedules_write`
* `meeting:schedules_read`
