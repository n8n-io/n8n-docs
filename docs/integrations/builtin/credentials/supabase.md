---
title: Supabase credentials
description: Documentation for Supabase credentials. Use these credentials to authenticate Supabase in n8n, a workflow automation platform.
contentType: integration
---

# Supabase credentials

You can use these credentials to authenticate the following nodes with Supabase.

- [Supabase](/integrations/builtin/app-nodes/n8n-nodes-base.supabase/)
- [Supabase: Insert](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.vectorstoresupabaseinsert/)
- [Supabase: Load](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.vectorstoresupabaseload/)

## Prerequisites

Create a [Supabase](https://supabase.com/) account.

## Using Access Token

1. In the [Supabase UI](https://app.supabase.io/), navigate to the project you would like to connect to.
2. Navigate to Settings page (through the gears button in the left sidebar).
3. Under *Project settings*, click on **API**.
4. Copy the value from the Supabase `URL` field into the `Host` field of your Supabase credentials in n8n.
5. Copy the value from the Supabase `service_role secret` field into the `Service Role Secret` field of your Supabase credentials in n8n.
6. Click `Save` on the n8n credentials screen.

