---
title: Supabase credentials
description: >-
  Documentation for Supabase credentials. Use these credentials to authenticate
  Supabase in n8n, a workflow automation platform.
contentType:
  - integration
  - reference
priority: high
nodeTitle: Supabase credentials
originalFilePath: integrations/builtin/credentials/supabase.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/credentials/supabase'
url: 'https://docs.n8n.io/integrations/builtin/credentials/supabase'
layout:
  description:
    visible: false
---

# Supabase credentials <a href="#supabase-credentials" id="supabase-credentials"></a>

You can use these credentials to authenticate the following nodes:

- [Supabase](../app-nodes/n8n-nodes-base.supabase/README.md)
- [Supabase Vector Store](../cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoresupabase.md)

## Prerequisites <a href="#prerequisites" id="prerequisites"></a>

Create a [Supabase](https://supabase.com/dashboard/sign-up) account.

## Supported authentication methods <a href="#supported-authentication-methods" id="supported-authentication-methods"></a>

- API key

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [Supabase's API documentation](https://supabase.com/docs/guides/api) for more information about the service.

## Using access token <a href="#using-access-token" id="using-access-token"></a>

To configure this credential, you'll need:

- A **Host**
- A **Service Role Secret**

To generate your API Key:



1. In your Supabase account, go to the **Dashboard** and create or select a project for which you want to create an API key.
2. Go to [**Project Settings > API**](https://supabase.com/dashboard/project/_/settings/api) to see the API Settings for your project.
3. Copy the **URL** from the **Project URL** section and enter it as your n8n **Host**. Refer to [API URL and keys](https://supabase.com/docs/guides/api#api-url-and-keys) for more detailed instruction.
4. Reveal and copy the **Project API key** for the `service_role`. Copy that key and enter it as your n8n **Service Role Secret**. Refer to [Understanding API Keys](https://supabase.com/docs/guides/api/api-keys) for more information on the `service_role` privileges.


