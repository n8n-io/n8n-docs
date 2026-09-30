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

* [Supabase](../app-nodes/n8n-nodes-base.supabase/README.md): Use a secret key or OAuth2.
* [Supabase Vector Store](../cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoresupabase.md): Use a secret key.

You can also use the OAuth2 credential to connect the Supabase MCP server from the [MCP servers](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/integrate-ai/mcp-servers) registry.

## Prerequisites <a href="#prerequisites" id="prerequisites"></a>

Create a [Supabase](https://supabase.com/dashboard/sign-up) account.

## Supported authentication methods <a href="#supported-authentication-methods" id="supported-authentication-methods"></a>

* API key
* OAuth2

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

## Using OAuth2

To configure OAuth2, create a Supabase OAuth app and enter its client credentials in n8n.

### OAuth2 prerequisites

Before you begin, make sure:

* The Supabase [Data API](https://supabase.com/docs/guides/api) is enabled for the projects you use with the Supabase node.
* Your Supabase account has the **Owner** or **Administrator** role for the organization. Supabase requires one of these roles to publish an OAuth app.
* Your Supabase account has the **Owner** or **Administrator** role for each project you connect. n8n needs this access to create the managed secret key.

Refer to Supabase's [access control documentation](https://supabase.com/docs/guides/platform/access-control) for more information about organization and project roles.

Configure the application permissions based on how you'll use the OAuth credential:

| Scope | Supabase node only | Supabase node and MCP server |
| --- | --- | --- |
| Analytics | No access | Read-only |
| Database | No access | Read and write |
| Edge Functions | No access | Read and write |
| Environment | No access | Read and write |
| Organizations | No access | Read-only |
| Projects | Read-only | Read and write |
| Secrets | Read and write | Read and write |
| Storage | No access | Read and write |

Leave all scopes not listed in the table set to **No access**. The additional permissions in the **Supabase node and MCP server** column are required by Supabase MCP tools, not by the Supabase node.

To create and connect the OAuth app:

1. In n8n, create a **Supabase OAuth2 API** credential and copy the **OAuth Redirect URL**.
2. In the [Supabase dashboard](https://supabase.com/dashboard), select your organization and go to **Organization Settings > OAuth Apps**.
3. Select **Publish OAuth app**.
4. Enter an **Application name** and **Website URL**.
5. Under **Authorization callback URLs**, enter the **OAuth Redirect URL** from n8n.
6. Set the application permissions using the column that matches how you'll use the credential.
7. Select **Confirm**.
8. Copy the **Client ID** and **Client Secret**. Supabase displays the client secret only once.
9. Enter the **Client ID** and **Client Secret** in the n8n credential.
10. Select **Connect my account**, then select and authorize your Supabase organization.

n8n creates or reuses a dedicated Supabase secret key named `n8n_managed_data_api` to access the Data API. Don't delete this key if you want the Supabase node to keep working.

If you change the OAuth app permissions, reconnect the n8n credential to apply the new permissions.

Refer to Supabase's [OAuth app guide](https://supabase.com/docs/guides/integrations/build-a-supabase-oauth-integration) and [OAuth scopes documentation](https://supabase.com/docs/guides/integrations/build-a-supabase-oauth-integration/oauth-scopes) for more information.
