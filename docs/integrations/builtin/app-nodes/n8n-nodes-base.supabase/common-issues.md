---
title: Supabase node common issues
description: >-
  Documentation for common issues and questions in the Supabase node in n8n, a
  workflow automation platform. Includes details of the issue and suggested
  solutions.
contentType:
  - integration
  - reference
priority: high
nodeTitle: Supabase node common issues
originalFilePath: integrations/builtin/app-nodes/n8n-nodes-base.supabase/common-issues.md
originalUrl: >-
  https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.supabase/common-issues
url: >-
  https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.supabase/common-issues
layout:
  description:
    visible: false
---

# Supabase node common issues <a href="#supabase-node-common-issues" id="supabase-node-common-issues"></a>

Here are some common errors and issues with the [Supabase node](README.md) and steps to resolve or troubleshoot them.

## Filtering rows by metadata <a href="#filtering-rows-by-metadata" id="filtering-rows-by-metadata"></a>

To filter rows by [Supabase metadata](https://supabase.com/docs/guides/ai/python/metadata), set the **Select Type** to **String**.

From there, you can construct a query in the **Filters (String)** parameter to filter the metadata using the [Supabase metadata query language](https://supabase.com/docs/guides/ai/python/metadata#metadata-query-language), inspired by the [MongoDB selectors](https://www.mongodb.com/docs/manual/reference/operator/query/) format. Access the metadata properties using the [Postgres `->>` arrow JSON operator](https://www.postgresql.org/docs/current/functions-json.html#FUNCTIONS-JSON-PROCESSING) like this (curly brackets denote components to fill in):

```
metadata->>{your-property}={comparison-operator}.{comparison-value}
```

For example to access an `age` property in the metadata and return results greater than or equal to 21, you could enter the following in the **Filters (String)** field:

```
metadata->>age=gte.21
```

You can combine these operators to construct more complex queries.

## Can't connect to a local Supabase database when using Docker <a href="#cant-connect-to-a-local-supabase-database-when-using-docker" id="cant-connect-to-a-local-supabase-database-when-using-docker"></a>

When you run Supabase in Docker, you need to configure the network so that n8n can connect to Supabase.

The solution depends on how you're hosting the two components.

### If only Supabase is in Docker <a href="#if-only-supabase-is-in-docker" id="if-only-supabase-is-in-docker"></a>

If only Supabase is running in Docker, the Docker Compose file used by the [self-hosting guide](https://supabase.com/docs/guides/self-hosting/docker) already runs Supabase bound to the correct interfaces.

When configuring [Supabase credentials](../../credentials/supabase.md), the `localhost` address should work without a problem (set the **Host** to `localhost`).

### If Supabase and n8n are running in separate Docker containers <a href="#if-supabase-and-n8n-are-running-in-separate-docker-containers" id="if-supabase-and-n8n-are-running-in-separate-docker-containers"></a>

If both n8n and Supabase are running in Docker in separate containers, you can use Docker networking to connect them.

Configure Supabase to listen on all interfaces by binding to `0.0.0.0` inside of the container (the official [Docker compose configuration](https://supabase.com/docs/guides/self-hosting/docker) already does this this). Add both the Supabase and n8n components to the same [user-defined bridge network](https://docs.docker.com/engine/network/drivers/bridge/) if you aren't already managing them together in the same Docker Compose file.

When configuring [Supabase credentials](../../credentials/supabase.md), use the Supabase API gateway container's name (`supabase-kong` by default) as the host address instead of `localhost`. For example, if you use the default configuration, you would set the **Host** to `http://supabase-kong:8000`.

## Records are accessible through Postgres but not Supabase <a href="#records-are-accessible-through-postgres-but-not-supabase" id="records-are-accessible-through-postgres-but-not-supabase"></a>

If queries for records return empty using the Supabase node, but are available through the [Postgres](../n8n-nodes-base.postgres/README.md) node or with a Postgres client, there may be a conflict with Supabase's [Row Level Security (RLS)](https://supabase.com/docs/guides/database/postgres/row-level-security) policy.

Supabase always enables RLS when you create a table in a public schema with the Table Editor. When RLS is active, the API doesn't return any data with the public `anon` key until you create policies. This is a security measure to ensure that you only expose data you intend to.

To access data from a table with RLS enabled as the `anon` role, [create a policy](https://supabase.com/docs/guides/database/postgres/row-level-security#creating-policies) to enable the access patterns you intend to use.
