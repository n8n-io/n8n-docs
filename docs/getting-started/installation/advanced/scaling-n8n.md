# Scaling n8n

n8n can be run in different [modes](../../key-concepts/modes.md) depending on your needs. The `queue` mode provides the best scalability, and its configuration is detailed here.

[[toc]]

## How it works

When running in `queue` mode you have multiple n8n instances set up (as many as desired or necessary to handle your workload), with one main instance receiving workflow information (e.g. triggers) and the worker instances performing the executions.

The workflow information from the n8n main instance is passed to a message broker, [Redis](#start-redis), which maintains the queue of pending executions and allows them to be picked up by the next available worker.

Each worker is its own Node.js instance, running in `main` mode, but able to handle multiple simultaneous workflow executions due to their high IOPS (input-output operations per second).

By using worker instances and running in queue mode, you can scale n8n up (by adding workers) and down (by removing workers) as needed to handle the workload at any point in time.

## Configuring workers

Workers are n8n instances that do the actual work. They receive information from the main n8n process about the workflows that have to get executed, execute the workflows, and update the status after each execution is complete.

### Set encryption key

n8n will automatically generates an encryption key upon first startup. You can also provide your own custom key via [environment variable](../../../reference/environment-variables.md#deployment) if desired.

The encryption key of the main n8n instance must be shared with all worker and webhooks processor nodes to ensure these worker nodes are able to access credentials stored in the database.

Set the encryption key for each worker node in a [configuration file](./configuration.md#configuration-via-file) or by setting the corresponding environment variable:

```bash
export N8N_ENCRYPTION_KEY=<main_instance_encryption_key>
```

### Set executions mode

::: tip Database considerations
We recommend using a database like MySQL or Postgres 13+. Running n8n with execution mode set to `queue` with an SQLite database is not recommended.
:::

Set the [environment variable](../../../reference/glossary.md#environment-variables) `EXECUTIONS_MODE` to `queue` using the following command.

```bash
export EXECUTIONS_MODE=queue
```

Alternatively, you can set `executions.mode` to `queue` in the [configuration file](./configuration.md#configuration-via-file).

### Start Redis

::: tip 💡 Keep in mind
You can run Redis on a separate machine, just make sure that it is accessible by the n8n instance.
:::

To run Redis in a Docker container, follow the instructions below.

Run the following command to start a Redis instance:

```
docker run --name some-redis -p 6379:6379  -d redis
```

By default, Redis runs on `localhost` on port `6379` with no password. Based on your Redis configuration, set the following configurations for the main n8n process. These will allow n8n to interact with Redis.

| Via configuration file | Via environment variables | Description |
| ------ | ------ | ----- |
| `queue.bull.redis.host:localhost` | `QUEUE_BULL_REDIS_HOST=localhost` | By default, Redis runs on `localhost`. |
| `queue.bull.redis.port:6379` | `QUEUE_BULL_REDIS_PORT=6379` | The default port is `6379`. If Redis is running on a different port, configure the value. |

You can also set the following optional configurations:

| Via configuration file | Via environment variables | Description |
| ------ | ------ | ----- |
| `queue.bull.redis.password:PASSWORD` | `QUEUE_BULL_REDIS_PASSWORD` | By default, Redis doesn’t require a password. If you’re using a password, configure it variable. |
| `queue.bull.redis.db:0` | `QUEUE_BULL_REDIS_DB` | The default value is `0`. If you change this value, update the configuration. |
| `queue.bull.redis.timeoutThreshold:10000ms` | `QUEUE_BULL_REDIS_TIMEOUT_THRESHOLD` | Tells n8n how long it should wait if Redis is unavailable before exiting. The default value is `10000ms`. |
| `queue.bull.queueRecoveryInterval:60` | `QUEUE_RECOVERY_INTERVAL` | Adds an active watchdog to n8n that checks Redis for finished executions. This is used to recover when n8n’s main process loses connection temporarily to Redis and is not notified about finished jobs. The default value is `60` seconds. | 

Now you can start your n8n instance and it will connect to your Redis instance.

### Start workers

You will need to start worker processes to allow n8n to execute workflows. If you want to host workers on a separate machine, install n8n on the machine and make sure that it is connected to your Redis instance and the n8n database. 

Start worker processes by running the following command from the root directory:

```
./packages/cli/bin/n8n worker
```

If you're using Docker, use the following command:
```
docker run --name n8n-queue -p 5679:5678 n8nio/n8n n8n worker
```

You can set up multiple worker processes. Make sure that all the worker processes have access to Redis and the n8n database.

## Running n8n with queues

When running n8n with queues, all the production workflow executions get processed by worker processes. This means that even the webhook calls get delegated to the worker processes, which might add some overhead and extra latency. However, the manual workflow executions still use the main process.

Redis is used as the message broker, and the database is used to persist data, so access to both is required. **Running a distributed system with this setup over SQLite is not recommended.**

::: tip Migrate data
If you want to migrate data from one database to another, you can use the Export and Import commands. Refer to the [CLI commands for n8n](../../reference/start-workflows-via-cli.md#export-workflows-and-credentials) documentation to learn how to use these commands.
:::

## Webhook processors

::: tip 💡 Keep in mind
Webhook processes rely on Redis too. Follow the [configure the workers](#configuring-workers) section above to setup webhook processor nodes.
:::

Webhook processors are another layer of scaling in n8n. Configuring the webhook processor is optional, and allows you to scale the incoming webhook requests.

This method allows n8n to process a huge number of parallel requests. All you have to do is add more webhook processes and workers accordingly. The webhook process will listen to requests on the same port (default: `5678`). Run these processes in containers or separate machines, and have a load balancing system to route requests accordingly.

We do not recommend adding the main process to the load balancer pool. If the main process is added to the pool, it will receive requests and possibly a heavy load. This will result in degraded performance for editing, viewing, and interacting with the n8n UI.

You can start the webhook processor by executing the following command from the root directory:
```
./packages/cli/bin/n8n webhook
```

If you're using Docker, use the following command:
```
docker run --name n8n-queue -p 5679:5678 n8nio/n8n n8n webhook
```

### Configure webhook URL

To configure your webhook URL, execute the following command on the machine running the main n8n instance:
```bash
export WEBHOOK_URL=https://your-webhook-url.com
```

You can also set this value in the configuration file.

### Configure load balancer

When using multiple webhook processes you will need a load balancer to route requests. If you are using the same domain name for your n8n instance and the webhooks, you can set up your load balancer to route requests as follows:
- Redirect any request that matches `/webhook/*` to the webhook servers pool
- All other paths (the n8n internal API, the static files for the editor, etc.) should get routed to the main process

**Note:** Manual workflow executions still occur on the main process and the default URL for these is `/webhook-test/*`. Make sure that these URLs route to your main process.

You can change this path in the configuration file via `endpoints.webhook` or via the `N8N_ENDPOINT_WEBHOOK` environment variable. If you change these, update your load balancer accordingly.

### Disable webhook processing in the main process (optional)

You have webhook processors to execute the workflows. You can disable the webhook processing in the main process. This will make sure to execute all webhook executions in the webhook processors. In the configuration file set `endpoints.disableProductionWebhooksOnMainProcess` to `true` so that n8n does not process webhook requests on the main process.

Alternatively, you can use the following command:
```bash
export N8N_DISABLE_PRODUCTION_MAIN_PROCESS=true
```

When disabling the webhook process in the main process, run the main process and don't add it to the load balancer's webhook pool.

## Avoiding downtime

When it comes to startup and shutdown, n8n will stop all currently executing workflows, disconnect from sources, and deregister webhooks that might have been registered with third-party services. All this happens inside the main process.

A new configuration has been added to n8n that allows it to skip deregistering of webhooks during the shutdown. Whenever n8n starts back, this configuration will check for existing webhooks. If a webhook exists, it will not be registered again.

Trigger nodes that do not use HTTP requests will still suffer marginal downtime during the update process.

The setting that controls this behavior is `endpoint.skipWebhoooksDeregistrationOnShutdown`. It defaults to `false` but can be changed:

```bash
export N8N_SKIP_WEBHOOK_DEREGISTRATION_SHUTDOWN=true
```

::: warning 💡 Keep in mind
Do not use this procedure for blue/green installations, where you have two n8n instances running simultaneously, but only one is receiving active traffic. If you run two or more main processes simultaneously, the currently active instance gets notified of activation and deactivation of workflows. This can potentially cause duplication of work or even skipping workflows entirely.
:::

## FAQ

### How to configure worker concurrency?

You can define the number of jobs a worker can run in parallel by using the `concurrency` falg. It defaults to `10` but can be changed:

```bash
n8n worker --concurrency=5
```