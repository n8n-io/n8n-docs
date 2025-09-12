---
title: Redis node documentation
description: Learn how to use the Redis node in n8n. Follow technical documentation to integrate Redis node into your workflows.
contentType: [integration, reference]
priority: medium
---

# Redis node

Use the Redis node to automate work in Redis, and integrate Redis with other applications. n8n has built-in support for a wide range of Redis features, including deleting keys, getting key values, setting key value, and publishing messages to the Redis channel.  

On this page, you'll find a list of operations the Redis node supports and links to more resources.

/// note | Credentials
Refer to [Redis credentials](/integrations/builtin/credentials/redis.md) for guidance on setting up authentication. 
///

--8<-- "_snippets/integrations/builtin/app-nodes/ai-tools.md"

## Operations

* Delete a key from Redis.
* Get the value of a key from Redis.
* Returns generic information about the Redis instance.
* Atomically increments a key by 1. Creates the key if it doesn't exist.
* Returns all the keys matching a pattern.
* Set the value of a key in Redis.
* Publish message to Redis channel.

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'redis') ]]
