---
title: Flow credentials
description: >-
  Documentation for Flow credentials. Use these credentials to authenticate Flow
  in n8n, a workflow automation platform.
contentType:
  - integration
  - reference
nodeTitle: Flow credentials
originalFilePath: integrations/builtin/credentials/flow.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/credentials/flow'
url: 'https://docs.n8n.io/integrations/builtin/credentials/flow'
layout:
  description:
    visible: false
---

# Flow credentials <a href="#flow-credentials" id="flow-credentials"></a>


{% hint style="warning" %}
**Feature availability**

The Flow service has shut down and its API no longer responds, so the Flow and Flow Trigger nodes can't connect to it. Workflows using these nodes will fail. Remove them or switch to another service.
{% endhint %}

You can use these credentials to authenticate the following nodes:

- [Flow](../app-nodes/n8n-nodes-base.flow.md)
- [Flow Trigger](../trigger-nodes/n8n-nodes-base.flowtrigger.md)

## Prerequisites <a href="#prerequisites" id="prerequisites"></a>

Create a Flow account.

## Supported authentication methods <a href="#supported-authentication-methods" id="supported-authentication-methods"></a>

- API key

## Using API key <a href="#using-api-key" id="using-api-key"></a>

To configure this credential, you'll need:

- Your numeric **Organization ID**
- An **Access Token**
