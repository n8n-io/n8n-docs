---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Redis credentials
description: Documentation for Redis credentials. Use these credentials to authenticate Redis in n8n, a workflow automation platform.
contentType: integration
---

# Redis credentials

You can use these credentials to authenticate the following nodes:

- [Redis](/integrations/builtin/app-nodes/n8n-nodes-base.redis/)
- [Redis Chat Memory](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.memoryredischat/)

## Prerequisites

Create a user account on a [Redis](https://redis.io/){:target=_blank .external-link} server.

## Supported authentication methods

- Database connection

## Related resources

Refer to [Redis's developer documentation](https://redis.readthedocs.io/en/stable/index.html){:target=_blank .external-link} for more information about the service.

## Using database connection

To configure this credential, you'll need:

- A **Password**: Enter a password for the account.
- The **Host**: Enter the host name of the Redis server. Default is `localhost`.
- The **Port**: Enter the port number the connection should use to connect. Default is `6379`.
- A **Database Number**: Enter the database number. Default is `0`.
- **SSL**: When turned on, the credential connects over SSL.

Refer to [Connecting to Redis | Generic client](https://redis.readthedocs.io/en/stable/connections.html){:target=_blank .external-link} for more information.


