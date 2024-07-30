---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Supabase credentials
description: Documentation for Supabase credentials. Use these credentials to authenticate Supabase in n8n, a workflow automation platform.
contentType: integration
priority: high
---

# Supabase credentials

You can use these credentials to authenticate the following nodes:

- [Supabase](/integrations/builtin/app-nodes/n8n-nodes-base.supabase/)
- [Supabase Vector Store](/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoresupabase/)

## Prerequisites

Create a [Supabase](https://supabase.com/){:target=_blank .external-link} account.

## Supported authentication methods

- API key

## Related resources

Refer to [Supabase's API documentation](https://supabase.com/docs/guides/api){:target=_blank .external-link} for more information about the service.

## Using Access Token

To configure this credential, you'll need:

- A **Host**: Go to [**Project Settings > API**](https://supabase.com/dashboard/project/_/settings/api){:target=_blank .external-link}. Copy the **URL** from the **Config** section and enter it as your n8n **Host**.
- A **Service Role Secret**: Go to [**Project Settings > API**](https://supabase.com/dashboard/project/_/settings/api){:target=_blank .external-link}. Reveal the secret for the `service_role` API key. Copy that **secret** and enter it as your n8n **Service Role Secret**.

Refer to [API URL and keys](https://supabase.com/docs/guides/api#api-url-and-keys){:target=_blank .external-link} for more detailed instructions.

Refer to [Understanding API Keys](https://supabase.com/docs/guides/api/api-keys){:target=_blank .external-link} for more information on the `service_role` privileges.
