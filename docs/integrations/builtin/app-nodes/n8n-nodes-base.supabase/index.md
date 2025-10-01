---
title: Supabase node documentation
description: Learn how to use the Supabase node in n8n. Follow technical documentation to integrate Supabase node into your workflows.
contentType: [integration, reference]
priority: high
---

# Supabase node

Use the Supabase node to automate work in Supabase, and integrate Supabase with other applications. n8n has built-in support for a wide range of Supabase features, including creating, deleting, and getting rows. 

On this page, you'll find a list of operations the Supabase node supports and links to more resources.

/// note | Credentials
Refer to [Supabase credentials](/integrations/builtin/credentials/supabase.md) for guidance on setting up authentication. 
///

--8<-- "_snippets/integrations/builtin/app-nodes/ai-tools.md"

## Operations

* Row
    * Create a new row
    * Delete a row
    * Get a row
    * Get all rows
    * Update a row

## Using custom schemas

By default, the Supabase node only fetches the `public` schema. To fetch [custom schemas](https://supabase.com/docs/guides/api/using-custom-schemas), enable **Use Custom Schema**.

In the new **Schema** field, provide the custom schema the Supabase node should use.

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'supabase') ]]

--8<-- "_snippets/integrations/builtin/app-nodes/operation-not-supported.md"

## Common issues

For common errors or issues and suggested resolution steps, refer to [Common issues](/integrations/builtin/app-nodes/n8n-nodes-base.supabase/common-issues.md).
