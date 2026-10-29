---
title: Redis credentials
description: >-
  Documentation for Redis credentials. Use these credentials to authenticate
  Redis in n8n, a workflow automation platform.
contentType:
  - integration
  - reference
priority: medium
nodeTitle: Redis credentials
originalFilePath: integrations/builtin/credentials/redis.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/credentials/redis'
url: 'https://docs.n8n.io/integrations/builtin/credentials/redis'
layout:
  description:
    visible: false
---

# Redis credentials <a href="#redis-credentials" id="redis-credentials"></a>

You can use these credentials to authenticate the following nodes:

- [Redis](../app-nodes/n8n-nodes-base.redis.md)
- [Redis Chat Memory](../cluster-nodes/sub-nodes/n8n-nodes-langchain.memoryredischat.md)
- [Redis Vector Store](../cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoreredis.md)

## Supported authentication methods <a href="#supported-authentication-methods" id="supported-authentication-methods"></a>

- Database connection

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [Redis's developer documentation](https://redis.readthedocs.io/en/stable/index.html) for more information about the service.

## Using database connection <a href="#using-database-connection" id="using-database-connection"></a>

You'll need a user account on a [Redis](https://redis.io/) server and:

- A **Password**
- The **Host** name
- The **Port** number
- A **Database Number**
- **SSL**

To configure this credential:

1. Enter your user account **Password**.
2. Enter the **Host** name of the Redis server. The default is `localhost`.
3. Enter the **Port** number the connection should use. The default is `6379`.
    - This number should match the `tcp_port` listed when you run the `INFO` command.
4. Enter the **Database Number**. The default is `0`.
5. If the connection should use SSL, turn on the **SSL** toggle. If this toggle is off, the connection uses TCP only.
6. If you enable **SSL**, you have the option to **disable TLS verification**. Toggle to use self-signed certificates. WARNING: This makes the connection less secure.

Refer to [Connecting to Redis | Generic client](https://redis.readthedocs.io/en/stable/connections.html) for more information.
