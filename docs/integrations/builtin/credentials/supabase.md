---
title: Supabase credentials
contentType:
  - integration
  - reference
priority: high
nodeTitle: Supabase credentials
originalFilePath: integrations/builtin/credentials/supabase.md
originalUrl: https://docs.n8n.io/integrations/builtin/credentials/supabase
url: https://docs.n8n.io/integrations/builtin/credentials/supabase
description: >-
  Documentation for Supabase credentials. Use these credentials to authenticate
  Supabase in n8n, a workflow automation platform.
layout:
  width: default
  title:
    visible: true
  description:
    visible: false
  tableOfContents:
    visible: true
  outline:
    visible: true
  pagination:
    visible: true
  metadata:
    visible: true
  tags:
    visible: true
  actions:
    visible: true
---

# Supabase credentials

You can use these credentials to authenticate the following nodes:

* [Supabase](../app-nodes/n8n-nodes-base.supabase/README.md)
* [Supabase Vector Store](../cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoresupabase.md)

## Prerequisites <a href="#prerequisites" id="prerequisites"></a>

Create a [Supabase](https://supabase.com/dashboard/sign-up) account.

## Supported authentication methods <a href="#supported-authentication-methods" id="supported-authentication-methods"></a>

* API key

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [Supabase's API documentation](https://supabase.com/docs/guides/api) for more information about the service.

## Using secret key <a href="#using-secret-key" id="using-secret-key"></a>

To configure this credential, you'll need:

* A **Host**
* A **Secret Key**

The credential connects to your project using the Supabase [Data API](https://supabase.com/docs/guides/api), which must be enabled. You can check and enable it in your project's [Data API settings](https://supabase.com/dashboard/project/_/integrations/data_api/overview).

To generate your secret key:

1. In your Supabase account, go to the **Dashboard** and create or select a project for which you want to create an API key.
2. Go to [**Integrations > Data API**](https://supabase.com/dashboard/project/_/integrations/data_api/overview) and copy the **Project URL**. Enter it as your n8n **Host**, omitting the `/rest/v1` path at the end (use `https://your_project.supabase.co`, not `https://your_project.supabase.co/rest/v1`).
3. Go to [**Project Settings > API Keys**](https://supabase.com/dashboard/project/_/settings/api-keys) to see the API keys for your project.
4. Create or reveal a **secret key** and enter it as your n8n **Secret Key**. Refer to [Understanding API keys](https://supabase.com/docs/guides/getting-started/api-keys) for more information.

{% hint style="info" %}
Existing credentials that use a legacy `service_role` secret keep working, but Supabase is [phasing out legacy API keys](https://supabase.com/docs/guides/getting-started/migrating-to-new-api-keys). Replace the legacy secret with a new secret key before legacy keys are disabled at the end of 2026.
{% endhint %}
