# Redis

[Redis](https://redis.io/) is an open-source, in-memory data structure store, used as a database, cache and message broker.

!!! note "Credentials"
    You can find authentication information for this node [here](/integrations/builtin/credentials/redis/).


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




