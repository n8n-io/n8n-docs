---
title: Redis node - n8n Documentation
description: Documentation for the Redis node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
---

# Redis

The Redis node allows you to automate work in Redis, and integrate Redis with other applications. n8n has built-in support for a wide range of Redis features, including deleting keys, getting key values, setting key value, and publishing messages to the redis channel.  

On this page, you'll find a list of operations the Redis node supports and links to more resources.

!!! note "Credentials"
    Refer to [Redis credentials](/integrations/builtin/credentials/redis/) for guidance on setting up authentication. 

!!! note "Examples and templates"
    For usage examples and templates to help you get started, take a look at n8n's [Redis integrations](https://n8n.io/integrations/redis/){:target="_blank" .external-link} list.


## Basic Operations

* Delete a key from Redis.
* Get the value of a key from Redis.
* Returns generic information about the Redis instance.
* Atomically increments a key by 1. Creates the key if it does not exist.
* Returns all the keys matching a pattern.
* Set the value of a key in redis.
* Publish message to redis channel.


## Example Usage

This workflow allows you to get the value of a key in Redis. You can also find the [workflow](https://n8n.io/workflows/557) on the website. This example usage workflow would use the following two nodes.
- [Start](/integrations/builtin/core-nodes/n8n-nodes-base.start/)
- [Redis]()

The final workflow should look like the following image.

![A workflow with the Redis node](/_images/integrations/builtin/app-nodes/redis/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Redis node

1. First of all, you'll have to enter credentials for the Redis node. You can find out how to do that [here](/integrations/builtin/credentials/redis/).
2. Select the 'Get' option from the *Operation* dropdown list.
3. Enter the key for which you want to retrieve the value in the *Key* field.
4. Click on *Execute Node* to run the workflow.





