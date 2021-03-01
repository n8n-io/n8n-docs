# Scaling n8n

With [n8n@0.108.0](./changelog.md#n8n-0-108-0) we have released a few important updates to make n8n more scalable and reliable.

[[toc]]

## Configuring Workers

New configurations and settings have been added to n8n to run it using queues. To run n8n with queues, you will need to have a [Redis](https://redis.io/) service available. Redis is mandatory as it acts as the message broker.

### Set Executions Mode

Set the [environment variable](./glossary.md#environment-variables) `EXECUTIONS_MODE` to `queue` using the following command.

```bash
export EXECUTIONS_MODE=queue
```

Alternatively, you can set `executions.mode` to `queue` in the [configuration file](./configuration.md#configuration-via-file).

### Start Redis

You can run Redis in a Docker container following the instructions mentioned below.

1. Run the following command to start a Redis instance.

```bash
docker run --name some-redis -p 6379:6379  -d redis
```

2. By default, Redis runs on `localhost` on port `6379` with no password. Based on your configuration, set the following variables in the configuration file.
	- `queue.bull.redis.host`
	- `queue.bull.redis.port`: The default port is `6379`. If Redis is running on a different port, configure the value.
	- Optional configurations
		- `queue.bull.redis.password`: By default, Redis doesn’t require a password. However, if you’re using a password to access Redis, configure the variable.
		- `queue.bull.redis.db`: The default value is `0`.
		- `queue.bull.redis.timeoutThreshold`: Tells n8n how long it should wait if Redis is unavailable before exiting. The default value is `10000ms`.
		- `queue.bull.queueRecoveryInterval`: Adds an active watchdog to n8n that checks Redis for finished executions. This is used to recover when n8n’s main process loses connection temporarily to Redis and is unable to get notified about finished jobs. The default value is `60` seconds.


Alternatively, you can set the following environment variables to configure Redis.

- `QUEUE_BULL_REDIS_HOST`
- `QUEUE_BULL_REDIS_PORT`
- `QUEUE_BULL_REDIS_PASSWORD`
- `QUEUE_BULL_REDIS_DB`
- `QUEUE_BULL_REDIS_TIMEOUT_THRESHOLD`
- `QUEUE_RECOVERY_INTERVAL`

3. The following command will run n8n and automatically connect to your Redis instance.

```bash
npm run start
```

### Start workers

You will need to start worker processes to allow n8n to execute workflows. To start worker processes, run the following command from the root directory.

```bash
./packages/cli/bin/n8n worker
```

You can start multiple worker processes. They can run anywhere (in a different container or a different machine) as long as they have access to the Redis instance and the main database.

## Considerations for running n8n with queues

When running n8n with queues, all the production workflow executions get processed by worker processes. This means that even the webhook calls will be proxied to worker processes. This might add some overhead and extra latency. However, the manual workflow executions still use the main process.

Redis is used as the queue broker, and the database is used to persist data. Hence, access to both is required. Running a distributed system like this over SQLite is not recommended.

::: tip Migrate data
If you want to migrate data from one database to another, you can use the Export and Import commands. Refer to the [CLI commands for n8n](./start-workflows-via-cli.md#export-workflows-and-credentials) documentation to learn how to use these commands.
:::

## Webhook processors

Webhook processors are another layer of scaling in n8n. This is an optional configuration.

Webhook processes also rely on Redis. Follow the steps mentioned above to [configure the workers](#configuring-workers).

The worker process will listen to requests on the same port (default: `5678`). Run these worker processes in containers or separate machines, and have a load balancing system to route requests accordingly.

This method allows n8n to process a huge number of parallel requests. All you have to do is add more webhook processes and workers accordingly, as long as the database and Redis are provisioned correctly for the load.

We do not recommend adding the main process to the load balancer pool. If the main process gets added to the pool, it will receive requests and possibly heavy load. This will result in degraded performance for editing, viewing, and interacting with n8n UI.

### Configure webhook URL

You can set up the webhook URL using the `WEBHOOK_URL` environment variable.

```bash
export WEBHOOK_URL=https://your-webhook-url.com
```

### Configure load balancer

When using multiple webhook processes, you will need a load balancer to route requests. If you are using the same domain name for your n8n instance and the webhooks, you can set up your load balancer to route requests as follow:
- Redirect any requests that matches `/webhook/*` to webhook servers pool
- All the other paths (the n8n internal API, the static files for the editor, etc.) should be routed to the main process

**Note:** Manual workflow executions still occur on the main process and the default URL for these is `/webhook-test/*`. Make sure that these URLs route to your main process.

These paths can be changed in the settings via `endpoints.webhook` or via the `N8N_ENDPOINT_WEBHOOK` environment variable. If you change these, update your load balancer accordingly.

### Disable webhook processing in the main process (optional)

Set `endpoints.disableProductionWebhooksOnMainProcess` to `true` so that n8n does not process webhook requests on the main process.

Alternatively, you can use the following command.

```bash
export N8N_DISABLE_PRODUCTION_MAIN_PROCESS=true
```

When disabling the webhook process in the main process, make sure that the main process is running and is not added to the load balancer's webhook pool.

## Avoiding downtime

When it comes to startup and shutdown, n8n will stop all currently executing workflows, disconnect from sources, and deregister webhooks that might have got registered with third-party services. All this happens inside the main process.

A new configuration got added to n8n that allows it to skip deregistering of webhooks during the shutdown. Whenever n8n starts back, this configuration will check for existing webhooks. If a webhook exists, it will not get registered again.

Trigger nodes that do not use HTTP requests will still suffer marginal downtime during the update process.

The setting that controls this behavior is `endpoint.skipWebhoooksDeregistrationOnShutdown`. It defaults to `false` and can be set to `true`.

```bash
export N8N_SKIP_WEBHOOK_DEREGISTRATION_SHUTDOWN=true
```

::: warning 💡 Keep in mind
Do not use this procedure for blue/green deployments, where you have two n8n instances running simultaneously but only one is receiving active traffic. If you run two or more main processes simultaneously, the currently active instance gets notified of activation and deactivation of workflows. This can potentially cause duplication of work or even skipping workflows entirely.
:::


