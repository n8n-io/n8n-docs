---
contentType: explanation
---

# Execution modes and processes

There are several different modes in which you can configure n8n to operate when executing workflows. These settings become more important as you increase the number, and complexity, of your automation workflows. Ensuring you set n8n to run in the most beneficial mode is also crucial when you begin to scale n8n to handle large workloads.

Set the n8n mode using the following [environment variables](/hosting/environment-variables/environment-variables/#executions):

| Variable | Options | Default | Description |
| :------- | :------ | :------ | :--------- |
| `EXECUTIONS_PROCESS` (**deprecated**) | Enum string: `main`, `own` | `main` | **Deprecated**. Whether n8n executions run in their own process or the main process. |
| `EXECUTIONS_MODE` | Enum string: `regular`, `queue` | `regular` | Whether executions should run directly or using queue. When you set this to `queue`, n8n ignores any `EXECUTION_PROCESS` setting and uses `main`. |

## Executions process

There are two options available when selecting how n8n handles execution processes: `own` and `main`.

### Main

This is the default mode. When using `main` mode, all executions will run in the main n8n process. This mode has the following benefits and disadvantages:

| Benefits | Disadvantages |
| :------- | :------------ |
| **Minimal latency** | Can't take advantage of multiple CPUs. Single process can result in a bottleneck. |
| **Resource efficiency**: only one CPU required. | Reduced stability, one crashed execution causes all others to fail. |

### Own

/// warning | Deprecated
n8n deprecated `own` mode and the `EXECUTIONS_PROCESS` flag in version 1.0. They will be removed in a future release. Main mode is now the default, so this step isn't needed for version 1.0 and above.
///	Use [Queue mode](/hosting/scaling/queue-mode/) if you need full execution isolation.

In `own` mode, each execution runs in its own, newly instantiated process (one execution equals one running process). Running in this mode has the following benefits and disadvantages:

| Benefits | Disadvantages |
| :------- | :------------ |
| **Stability**: one crashed execution doesn't impact others. | Latency, approximately 1 second as each process spins up. |
| **Efficiency**: Uses all CPUs. | Resources (CPU/RAM) needed for the additional processes. |

n8n recommends this mode for running CPU intensive tasks to ensure processes don't block each other.

As `own` also reloads nodes on each execution, it's also the best mode for developing custom nodes.

## Executions mode

There are two options available when setting the executions mode: `regular` and `queue`.

### Regular

This is the default setting for n8n. When running n8n in the `regular` mode, everything is processed on a single instance. Executions are handled according to the `EXECUTIONS_PROCESS` setting and available resources.

### Queue

`Queue` mode is designed for handling high workloads. In this mode you run multiple instances of n8n: one main instance is required for triggering some workflows and allowing user access through the UI, while the other worker instances process the executions. You can also add dedicated instances to handle incoming webhooks.

`Queue` mode requires more setup than `regular` mode, but provides great scalability and stability with minimal latency.

/// note | Binary data storage
n8n doesn't support queue mode with binary data storage. If your workflows need to persist binary data, you can't use queue mode.
///
To learn more see the [Scaling n8n](/hosting/scaling/) documentation.
