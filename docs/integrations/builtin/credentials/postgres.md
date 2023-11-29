---
title: Postgres credentials
description: Documentation for Postgres credentials. Use these credentials to authenticate Postgres in n8n, a workflow automation platform.
contentType: integration
---

# Postgres credentials

You can use these credentials to authenticate the following nodes with Postgres.

- [Postgres](/integrations/builtin/app-nodes/n8n-nodes-base.postgres/)
- [Postgres Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.postgrestrigger/)
- [Agent](/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent)

/// note | Agent node users
The Agent node doesn't support tunnels
///
## Prerequisites

Create a user account on a Postgres server with the correct privileges.

## Using Database Connection

1. Retrieve your Postgres credentials and connection parameters.
2. Use the credentials and connection parameters with your Postgres node credentials in n8n.

![Getting Postgres credentials](/_images/integrations/builtin/credentials/postgres/using-database-connection.gif)
