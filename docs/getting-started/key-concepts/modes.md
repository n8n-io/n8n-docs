# Execution Modes

There are several different modes in which you can configure n8n to operate when executing workflows. These settings become more important as you increase the number, and complexity, of your automation workflows. Ensuring you set n8n to run in the most beneficial mode is also crucial when you begin to [scale n8n](../installation/advanced/scaling-n8n.md).

The mode in which you n8n instance will operate is set via the following two [environment variables](../../reference/environment-variables.md#executions):

| Variable | Options | Description |
| -------- | ------- | ----------- |
| *EXECUTIONS_PROCESS* | `main`, `own` | Determines whether each executions runs in its own process, or all run in the  main process. |
| *EXECUTIONS_MODE* | `regular`, `queue` | Determines whether executions run directly in the main n8n process or are distributed across configured worker instances. |

::: tip 💡 Keep in mind
The default settings for `EXECUTIONS_PROCESS` and `EXECUTIONS_MODE` are `own` and `regular`, respectively.
:::

## Executions process

There are two options available when selecting how execution processes are handled in n8n: `own` and `main`.

### Own

This is the default setting in n8n. In `own` mode, each execution runs in its own, newly instantiated process.

This mode does result in some latency (≈1sec) and increased resource (CPU/RAM) needs for the additional processes, but its benefits include increased stability (i.e. one crashed execution does not impact others) and efficiency (i.e. utilizes all CPUs). 

This mode is recommended for running CPU intensive tasks to ensure processes do not block each other.

As `own` is the only available mode that reloads nodes on each execution, it is also the ideal mode for developing custom nodes.

### Main

When using `main` mode, all executions will run in the main n8n process. This mode has minimal latency and high resource efficiency (e.g. only one CPU is needed), so it is ideal for workflows that you want to start very quickly and which are not CPU intensive.

It is important to remember that with all executions running in a single process, a bottleneck can develop and, in the event of one execution crashing, all others would fail as well.

## Executions mode

There are two options available when setting the executions mode: `regular` and `queue`.

### Regular

This is the default setting for n8n. When running n8n in the `regular` mode, executions are handled according the configured `EXECUTIONS_PROCESS` setting and available resources.

### Queue

In `queue` mode execution processes are handled by your configured worker instances, with the main n8n process passing along information about the workflows that need to be executed.

This workflow information from the n8n main process is passed to a message broker, [Redis](https://redis.io/) in this case, which maintains the queue of pending executions as they are picked up by the next available worker.

Each worker is its own Node.js instance, running in `main` mode (above), but able to handle multiple simultaneous workflow executions due to their high IOPS (input-output operations per second).

By using worker instances, and running in `queue` mode, you can scale n8n up (by adding workers) and down (by removing workers) as needed to handle the workload at any point in time.

When properly configured and with adequate resources, `queue` mode provides the minimal latency of `main` mode, but also great scalability and stability limited only by the amount of resources you are running.

To learn more see the [Scaling n8n](../installation/advanced/scaling-n8n.md) documentation.
