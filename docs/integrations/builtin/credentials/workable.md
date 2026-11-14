---
title: Workable credentials
description: >-
  Documentation for Workable credentials. Use these credentials to authenticate
  Workable in n8n, a workflow automation platform.
contentType:
  - integration
  - reference
nodeTitle: Workable credentials
originalFilePath: integrations/builtin/credentials/workable.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/credentials/workable'
url: 'https://docs.n8n.io/integrations/builtin/credentials/workable'
layout:
  description:
    visible: false
---

# Workable credentials <a href="#workable-credentials" id="workable-credentials"></a>

You can use these credentials to authenticate the following nodes:

- [Workable Trigger](../trigger-nodes/n8n-nodes-base.workabletrigger.md)

## Prerequisites <a href="#prerequisites" id="prerequisites"></a>

Create a [Workable](https://www.workable.com/) account.

## Supported authentication methods <a href="#supported-authentication-methods" id="supported-authentication-methods"></a>

- API key

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [Workable's API documentation](https://workable.readme.io/reference/generate-an-access-token) for more information about the service.

## Using API key <a href="#using-api-key" id="using-api-key"></a>

To configure this credential, you'll need:

- A **Subdomain**: Your Workable subdomain is the part of your Workable domain between `https://` and `.workable.com`. So if the full domain is `https://n8n.workable.com`, the subdomain is `n8n`. The subdomain is also displayed on your Workable **Company Profile** page.
- An **Access Token**: Go to your **profile >** [**Integrations**](https://workable.com/backend/settings/integrations) **> Apps** and select **Generate API token**. Refer to [Generate a new token](https://help.workable.com/hc/en-us/articles/115015785428-Generating-revoking-access-tokens-for-Workable-s-API#Generateanewtoken) for more information.<br>

    
    <div data-gb-custom-block data-tag="hint" data-style="info" class="hint hint-info"><p><strong>Token scopes</strong></p><p>If you're using this credential with the <a href="../trigger-nodes/n8n-nodes-base.workabletrigger.md">Workable Trigger</a> node, select the <code>r_candidates</code> and <code>r_jobs</code> scopes when you generate your token. If you're using this credential in other ways, select scopes that are relevant for your use case.</p><p>Refer to <a href="https://help.workable.com/hc/en-us/articles/115015785428-Generating-revoking-access-tokens-for-Workable-s-API#SupportedAPIscopes">Supported API scopes</a> for more information on scopes.</p></div>
    
