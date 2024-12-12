---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: howto
---

# Queue mode

You can run n8n in different modes depending on your needs. The queue mode provides the best scalability.

/// note | Binary data storage
n8n doesn't support queue mode with binary data storage. If your workflows need to persist binary data, you can't use queue mode.
///

## How it works

When running in queue mode, you have multiple n8n instances set up, with one main instance receiving workflow information (such as triggers) and the worker instances performing the executions. 

Each worker is its own Node.js instance, running in `main` mode, but able to handle multiple simultaneous workflow executions due to their high IOPS (input-output operations per second). 

By using worker instances and running in queue mode, you can scale n8n up (by adding workers) and down (by removing workers) as needed to handle the workload.

This is the process flow:

1. The main n8n instance handles timers and webhook calls, generating (but not running) a workflow execution. 
1. It passes the execution ID to a message broker, [Redis](#start-redis), which maintains the queue of pending executions and allows the next available worker to pick them up.
1. A worker in the pool picks up message from Redis.
1. The worker uses the execution ID to get workflow information from the database.
1. After completing the workflow execution, the worker:
	- Writes the results to the database.
	- Posts to Redis, saying that the execution has finished.
1. Redis notifies the main instance.


!["Diagram showing the flow of data between the main n8n instance, Redis, the n8n workers, and the n8n database"](/_images/hosting/scaling/queue-mode-flow.png)

## Configuring workers

Workers are n8n instances that do the actual work. They receive information from the main n8n process about the workflows that have to get executed, execute the workflows, and update the status after each execution is complete.

### Set encryption key

n8n automatically generates an encryption key upon first startup. You can also provide your own custom key using [environment variable](/hosting/configuration/environment-variables/) if desired.

The encryption key of the main n8n instance must be shared with all worker and webhooks processor nodes to ensure these worker nodes are able to access credentials stored in the database.

Set the encryption key for each worker node in a [configuration file](/hosting/configuration/configuration-methods/) or by setting the corresponding environment variable:

```bash
export N8N_ENCRYPTION_KEY=<main_instance_encryption_key>
```

### Set executions mode

/// note | Database considerations
n8n recommends using Postgres 13+. Running n8n with execution mode set to `queue` with an SQLite database isn't recommended.
///

Set the environment variable `EXECUTIONS_MODE` to `queue` using the following command.

```bash
export EXECUTIONS_MODE=queue
```

Alternatively, you can set `executions.mode` to `queue` in the [configuration file](/hosting/configuration/environment-variables/).

### Start Redis

/// note | Running Redis on a separate machine
You can run Redis on a separate machine, just make sure that it's accessible by the n8n instance.
///

To run Redis in a Docker container, follow the instructions below:

Run the following command to start a Redis instance:

```
docker run --name some-redis -p 6379:6379  -d redis
```

By default, Redis runs on `localhost` on port `6379` with no password. Based on your Redis configuration, set the following configurations for the main n8n process. These will allow n8n to interact with Redis.

| Using configuration file | Using environment variables | Description |
| ------ | ------ | ----- |
| `queue.bull.redis.host:localhost` | `QUEUE_BULL_REDIS_HOST=localhost` | By default, Redis runs on `localhost`. |
| `queue.bull.redis.port:6379` | `QUEUE_BULL_REDIS_PORT=6379` | The default port is `6379`. If Redis is running on a different port, configure the value. |

You can also set the following optional configurations:

| Using configuration file | Using environment variables | Description |
| ------ | ------ | ----- |
| `queue.bull.redis.username:USERNAME` | `QUEUE_BULL_REDIS_USERNAME` | By default, Redis doesn't require a username. If you're using a specific user, configure it variable. |
| `queue.bull.redis.password:PASSWORD` | `QUEUE_BULL_REDIS_PASSWORD` | By default, Redis doesn't require a password. If you're using a password, configure it variable. |
| `queue.bull.redis.db:0` | `QUEUE_BULL_REDIS_DB` | The default value is `0`. If you change this value, update the configuration. |
| `queue.bull.redis.timeoutThreshold:10000ms` | `QUEUE_BULL_REDIS_TIMEOUT_THRESHOLD` | Tells n8n how long it should wait if Redis is unavailable before exiting. The default value is `10000` (ms). |
| `queue.bull.gracefulShutdownTimeout:30` | `N8N_GRACEFUL_SHUTDOWN_TIMEOUT` | A graceful shutdown timeout for workers to finish executing jobs before terminating the process. The default value is `30` seconds. |


Now you can start your n8n instance and it will connect to your Redis instance.

### Start workers

You will need to start worker processes to allow n8n to execute workflows. If you want to host workers on a separate machine, install n8n on the machine and make sure that it's connected to your Redis instance and the n8n database.

Start worker processes by running the following command from the root directory:

```
./packages/cli/bin/n8n worker
```

If you're using Docker, use the following command:

```
docker run --name n8n-queue -p 5679:5678 docker.n8n.io/n8nio/n8n worker
```

You can set up multiple worker processes. Make sure that all the worker processes have access to Redis and the n8n database.

#### Worker server

Each worker process runs a server that exposes optional endpoints:

- `/healthz`: returns whether the worker is up, if you enable the `QUEUE_HEALTH_CHECK_ACTIVE` environment variable
- `/healthz/readiness`: returns whether worker's DB and Redis connections are ready, if you enable the `QUEUE_HEALTH_CHECK_ACTIVE` environment variable
- [credentials overwrite endpoint](https://docs.n8n.io/embed/configuration/#credential-overwrites)
- [`/metrics`](https://docs.n8n.io/hosting/configuration/configuration-examples/prometheus/)

#### View running workers 

/// info | Feature availability
* Available on Self-hosted Enterprise plans.
* If you want access to this feature on Cloud Enterprise, [contact n8n](https://n8n-community.typeform.com/to/y9X2YuGa){:target=_blank .external-link}.
///

You can view running workers and their performance metrics in n8n by selecting **Settings** > **Workers**.

## Running n8n with queues

When running n8n with queues, all the production workflow executions get processed by worker processes. This means that even the webhook calls get delegated to the worker processes, which might add some overhead and extra latency.

Redis acts as the message broker, and the database persists data, so access to both is required. Running a distributed system with this setup over SQLite isn't supported.

/// note | Migrate data
If you want to migrate data from one database to another, you can use the Export and Import commands. Refer to the [CLI commands for n8n](/hosting/cli-commands/#export-workflows-and-credentials) documentation to learn how to use these commands.
///

## Webhook processors

/// note | Keep in mind
Webhook processes rely on Redis too. Follow the [configure the workers](#configuring-workers) section above to setup webhook processor nodes.
///

Webhook processors are another layer of scaling in n8n. Configuring the webhook processor is optional, and allows you to scale the incoming webhook requests.

This method allows n8n to process a huge number of parallel requests. All you have to do is add more webhook processes and workers accordingly. The webhook process will listen to requests on the same port (default: `5678`). Run these processes in containers or separate machines, and have a load balancing system to route requests accordingly.

n8n doesn't recommend adding the main process to the load balancer pool. If you add the main process to the pool, it will receive requests and possibly a heavy load. This will result in degraded performance for editing, viewing, and interacting with the n8n UI.

You can start the webhook processor by executing the following command from the root directory:

```
./packages/cli/bin/n8n webhook
```

If you're using Docker, use the following command:

```
docker run --name n8n-queue -p 5679:5678 docker.n8n.io/n8nio/n8n webhook
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

**Note:** The default URL for manual workflow executions is `/webhook-test/*`. Make sure that these URLs route to your main process.

You can change this path in the configuration file `endpoints.webhook` or using the `N8N_ENDPOINT_WEBHOOK` environment variable. If you change these, update your load balancer accordingly.

### Disable webhook processing in the main process (optional)

You have webhook processors to execute the workflows. You can disable the webhook processing in the main process. This will make sure to execute all webhook executions in the webhook processors. In the configuration file set `endpoints.disableProductionWebhooksOnMainProcess` to `true` so that n8n doesn't process webhook requests on the main process.

Alternatively, you can use the following command:

```bash
export N8N_DISABLE_PRODUCTION_MAIN_PROCESS=true
```

When disabling the webhook process in the main process, run the main process and don't add it to the load balancer's webhook pool.

## Configure worker concurrency

You can define the number of jobs a worker can run in parallel by using the `concurrency` flag. It defaults to `10`. To change it:

```bash
n8n worker --concurrency=5
```

## Multi-main setup

/// info | Feature availability
* Available on Self-hosted Enterprise plans.
* If you want access to this feature on Cloud Enterprise, [contact n8n](https://n8n-community.typeform.com/to/y9X2YuGa){:target=_blank .external-link}.
///

In queue mode you can run more than one `main` process for high availability.

In a single-mode setup, the `main` process does two sets of tasks: 

- **regular tasks**, such as running the API, serving the UI, and listening for webhooks, and 
- **at-most-once tasks**, such as running non-HTTP triggers (timers, pollers, and persistent connections like RabbitMQ and IMAP), and pruning executions and binary data.

In a multi-main setup, there are two kinds of `main` processes:

- **followers**, which run **regular tasks**, and
- the **leader**, which runs **both regular and at-most-once tasks**.

### Leader designation

In a multi-main setup, all main instances handle the leadership process transparently to users. In case the current leader becomes unavailable, for example because it crashed or its event loop became too busy, other followers can take over. If the previous leader becomes responsive again, it becomes a follower.

### Configuring multi-main setup

To deploy n8n in multi-main setup, ensure: 

- All `main` processes are running in queue mode and are connected to Postgres and Redis.
- All `main` and `worker` processes are running the same version of n8n.
- All `main` processes have set the environment variable `N8N_MULTI_MAIN_SETUP_ENABLED` to `true`.
- All `main` processes are running behind a load balancer with session persistence (sticky sessions) enabled.

If needed, you can adjust the leader key options:

| Using configuration file | Using environment variables | Description |
| ------ | ------ | ----- |
| `multiMainSetup.ttl:10` | `N8N_MULTI_MAIN_SETUP_KEY_TTL=10` | Time to live (in seconds) for leader key in multi-main setup. |
| `multiMainSetup.interval:3` | `N8N_MULTI_MAIN_SETUP_CHECK_INTERVAL=3` | Interval (in seconds) for leader check in multi-main setup. |

/// note | Keep in mind
In multi-main setup, all `main` processes listen for webhooks, so they fulfill the same purpose as `webhook` processes. Running `webhook` processes is neither needed nor allowed in multi-main setup.
///
