# Scaling n8n

To handle the workloads, n8n can be horizontally scaled. You can connect multiple entities, such as servers so that they work as a single logical unit. Workflow executions can scale via workers. The trigger nodes that use webhooks can scale through webhook processors.

[[toc]]

## Prerequisites

You have knowledge of:

- Redis
- Deploying databases
- Networking

## Configuring Workers

Workers are n8n instances that do the actual work. The main n8n process passes information to the workers about the workflows that have to get executed. The workers execute the workflow and update the status after the execution is complete.

To allow workers to interact with the main process, we need a message broker. We will use Redis for that. Redis allows n8n to run with queues and acts as the message broker.

### Set Executions Mode

By default, n8n runs with the execution mode set to `regular`. To configure workers, set the `EXECUTIONS_MODE` [environment variable](./glossary.md#environment-variables) to `queue` using the following command:

```bash
export EXECUTIONS_MODE=queue
```

Alternatively, you can set `executions.mode` to `queue` in the [configuration file](./configuration.md#configuration-via-file).

By default, all workflows get executed in their separate process. Refer to the [Execute In Same Process](./configuration.md#execute-in-same-process) to learn how to execute the workflows in the main process.

**Note:** We recommend using a database like MySQL or Postgres 13 (or newer). Running n8n with execution mode set to queue with an SQLite database is not recommended.

### Start Redis

To run Redis in a Docker container, follow the instructions mentioned below.

1. Run the following command to start a Redis instance.

```
docker run --name some-redis -p 6379:6379  -d redis
```

2. By default, Redis runs on `localhost` on port `6379` with no password. Based on your Redis configuration, set the following configurations for the main n8n process. These will allow n8n to interact with Redis.


| Setting in the configuration file | Using environment variables | Description |
| ------ | ------ | ----- |
| queue.bull.redis.host:localhost | QUEUE_BULL_REDIS_HOST=localhost | By default, Redis runs on `localhost`. |
| queue.bull.redis.port:6379 | QUEUE_BULL_REDIS_PORT=6379 | The default port is `6379`. If Redis is running on a different port, configure the value. |



You can also set the following optional configurations.

- **Redis Password:** By default, Redis doesn’t require a password. However, if you’re using a password to access Redis, configure the variable.
    - ***setting in the configuration file:*** `queue.bull.redis.password:PASSWORD`
    - ***using environment variables:*** `QUEUE_BULL_REDIS_PASSWORD`

- **Redis Database:** The default value is `0`. If you change this value, update the configuration.
    - ***setting in the configuration file:*** `queue.bull.redis.db:0`
    - ***using environment variables:*** `QUEUE_BULL_REDIS_DB`

- **Redis Timeout Threshold:** Tells n8n how long it should wait if Redis is unavailable before exiting. The default value is `10000ms`.
    - ***setting in the configuration file:*** `queue.bull.redis.timeoutThreshold:10000ms`
    - ***using environment variables:*** `QUEUE_BULL_REDIS_TIMEOUT_THRESHOLD`

- **Queue Recovery Interval:** Adds an active watchdog to n8n that checks Redis for finished executions. This is used to recover when n8n’s main process loses connection temporarily to Redis and is unable to get notified about finished jobs. The default value is `60` seconds.
    - ***setting in the configuration file:*** `queue.bull.queueRecoveryInterval:60`
    - ***using environment variables:*** `QUEUE_RECOVERY_INTERVAL`

3. Start your n8n instance, and it will now connect to your Redis instance.


**Note:** You can run Redis on a separate machine. Make sure that it is accessible by the n8n instance.

### Start workers

You will need to start worker processes to allow n8n to execute workflows. If you want to host workers on a separate machine, install n8n on the machine, and make sure that it is connected to your Redis instance and the n8n database. Start worker processes by running the following command from the root directory.

```
./packages/cli/bin/n8n worker
```

If you're using Docker, use the following command.

```
docker run --name n8n-queue -p 5679:5678 n8nio/n8n n8n worker
```

You can also set up multiple worker processes. Make sure that all the worker processes have access to Redis and the n8n database.

## Considerations for running n8n with queues

When running n8n with queues, all the production workflow executions get processed by worker processes. This means that even the webhook calls get delegated to the worker processes, which might add some overhead and extra latency. However, the manual workflow executions still use the main process.

Redis is used as the queue broker, and the database is used to persist data. Hence, access to both is required. Running a distributed system with this setup over SQLite is not recommended.

::: tip Migrate data
If you want to migrate data from one database to another, you can use the Export and Import commands. Refer to the [CLI commands for n8n](./start-workflows-via-cli.md#export-workflows-and-credentials) documentation to learn how to use these commands.
:::

## Webhook processors

Webhook processors are another layer of scaling in n8n. Configuring the webhook processor is optional. Webhook processors allow you to scale the incoming webhook requests.

Webhook processes rely on Redis too. Follow the steps mentioned above to [configure the workers](#configuring-workers).
Finally start the processors with: 

```
./packages/cli/bin/n8n webhook
```

This method allows n8n to process a huge number of parallel requests. All you have to do is add more webhook processes and workers accordingly, as long as the database and Redis are provisioned correctly.

The webhook process will listen to requests on the same port (default: `5678`). Run these processes in containers or separate machines, and have a load balancing system to route requests accordingly.

We do not recommend adding the main process to the load balancer pool. If the main process is added to the pool, it will receive requests and possibly a heavy load. This will result in degraded performance for editing, viewing, and interacting with the n8n UI.

You can start the webhook processor by executing the following command from the root directory.

```
./packages/cli/bin/n8n webhook
```

If you're using Docker, use the following command.

```
docker run --name n8n-queue -p 5679:5678 n8nio/n8n n8n webhook
```

### Configure webhook URL

To configure your webhook URL, execute the following command on the machine running the main n8n instance.

```bash
export WEBHOOK_URL=https://your-webhook-url.com
```

You can also set this value in the configuration file.

### Configure load balancer

When using multiple webhook processes, you will need a load balancer to route requests. If you are using the same domain name for your n8n instance and the webhooks, you can set up your load balancer to route requests as follow:
- Redirect any request that matches `/webhook/*` to the webhook servers pool
- All the other paths (the n8n internal API, the static files for the editor, etc.) should get routed to the main process

**Note:** Manual workflow executions still occur on the main process and the default URL for these is `/webhook-test/*`. Make sure that these URLs route to your main process.

You can change this path in the configuration file via `endpoints.webhook` or via the `N8N_ENDPOINT_WEBHOOK` environment variable. If you change these, update your load balancer accordingly.

### Disable webhook processing in the main process (optional)

You have webhook processors to execute the workflows. You can disable the webhook processing in the main process. This will make sure to execute all webhook executions in the webhook processors. In the configuration file set `endpoints.disableProductionWebhooksOnMainProcess` to `true` so that n8n does not process webhook requests on the main process.

Alternatively, you can use the following command.

```bash
export N8N_DISABLE_PRODUCTION_MAIN_PROCESS=true
```

When disabling the webhook process in the main process, run the main process and don't add it to the load balancer's webhook pool.

## Avoiding downtime

When it comes to startup and shutdown, n8n will stop all currently executing workflows, disconnect from sources, and deregister webhooks that might have been registered with third-party services. All this happens inside the main process.

A new configuration has been added to n8n that allows it to skip deregistering of webhooks during the shutdown. Whenever n8n starts back, this configuration will check for existing webhooks. If a webhook exists, it will not be registered again.

Trigger nodes that do not use HTTP requests will still suffer marginal downtime during the update process.

The setting that controls this behavior is `endpoint.skipWebhoooksDeregistrationOnShutdown`. It defaults to `false` and can be set to `true`.

```bash
export N8N_SKIP_WEBHOOK_DEREGISTRATION_SHUTDOWN=true
```

::: warning 💡 Keep in mind
Do not use this procedure for blue/green deployments, where you have two n8n instances running simultaneously, but only one is receiving active traffic. If you run two or more main processes simultaneously, the currently active instance gets notified of activation and deactivation of workflows. This can potentially cause duplication of work or even skipping workflows entirely.
:::
