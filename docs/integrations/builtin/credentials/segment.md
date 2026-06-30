---
title: Segment credentials
description: >-
  Documentation for Segment credentials. Use these credentials to authenticate
  Segment in n8n, a workflow automation platform.
contentType:
  - integration
  - reference
nodeTitle: Segment credentials
originalFilePath: integrations/builtin/credentials/segment.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/credentials/segment'
url: 'https://docs.n8n.io/integrations/builtin/credentials/segment'
layout:
  description:
    visible: false
---

# Segment credentials <a href="#segment-credentials" id="segment-credentials"></a>

You can use these credentials to authenticate the following nodes:

- [Segment](../app-nodes/n8n-nodes-base.segment.md)

## Prerequisites <a href="#prerequisites" id="prerequisites"></a>

Create a [Segment](https://segment.com/) account.

## Supported authentication methods <a href="#supported-authentication-methods" id="supported-authentication-methods"></a>

- API key

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [Segment's Sources documentation](https://segment.com/docs/connections/sources/) for more information about the service.

## Using API key <a href="#using-api-key" id="using-api-key"></a>

To configure this credential, you'll need:

- A **Write Key**: To get a Write Key, go to **Sources > Add Source**. Add a **Node.js** source and copy that write key to add to your n8n credential.

Refer to [Locate your Write Key](https://segment.com/docs/connections/find-writekey/) for more information.

