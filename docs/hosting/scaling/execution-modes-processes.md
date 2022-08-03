# Execution modes and processes

There are several different modes in which you can configure n8n to operate when executing workflows. These settings become more important as you increase the number, and complexity, of your automation workflows. Ensuring you set n8n to run in the most beneficial mode is also crucial when you begin to [scale n8n](/hosting/scaling/) to handle very large workloads.

The mode in which you n8n instance will operate is set via the following two [environment variables](/hosting/environment-variables/#executions):

| Variable | Options | Description |
| -------- | ------- | ----------- |
| *EXECUTIONS_PROCESS* | `own` (default), `main`  | Determines whether each execution runs in its own process, or all run in the  main process. |
| *EXECUTIONS_MODE* | `regular` (default), `queue` | Determines whether executions are processed by a single instance or are distributed across worker instances. |

## Executions process

There are two options available when selecting how execution processes are handled in n8n: `own` and `main`.

### Own

This is the default setting in n8n. In `own` mode, each execution runs in its own, newly instantiated process (i.e. 1 execution = 1 running process). Running in this mode has the following benefits and disadvantages to consider:

| Pros | Cons |
| :--- | :--- |
| **Stability**: one crashed execution does not impact others. | Latency, approximately 1sec as each process spins up. |
| **Efficiency**: all CPUs are utilized. | Resources (CPU/RAM) needed for the additional processes. |

This mode is recommended for running CPU intensive tasks to ensure processes do not block each other.

As `own` also reloads nodes on each execution, it is also the best mode for developing custom nodes.

### Main

When using `main` mode, all executions will run in the main n8n process. This mode has the following benefits and disadvantages to consider:

| Pros | Cons |
| :--- | :--- |
| **Minimal latency** | Cannot take advantage of multiple CPUs. Single process can result in a bottleneck. |
| **Resource efficiency**: only one CPU required. | Reduced stability, one crashed executions causes all others to fail. |

## Executions mode

There are two options available when setting the executions mode: `regular` and `queue`.

### Regular

This is the default setting for n8n. When running n8n in the `regular` mode, everything is processed on a single instance. Executions are handled according to the `EXECUTIONS_PROCESS` setting and available resources.

### Queue

`Queue` mode is designed for handling very high workloads. In this mode you run multiple instances of n8n: one ‘main' instance coordinates, and other ‘worker' instances actually process the executions. You can also add dedicated instances to handle incoming webhooks.

`Queue` mode requires more setup than `regular` mode, but provides great scalability and stability with minimal latency.

To learn more see the [Scaling n8n](/hosting/scaling/) documentation.
