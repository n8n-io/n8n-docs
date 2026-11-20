---
description: >-
  Look up the attributes on each OpenTelemetry span that n8n exports, and learn
  how to read the span of a crashed execution.
layout:
  description:
    visible: false
status: preview
---

# Span reference

Look up the attributes on each span that n8n exports, and how to read the span of a crashed execution.

{% hint style="info" %}
**Preview status**

OpenTelemetry tracing is in Preview and may change in future releases. Avoid relying on it in production workflows. Refer to [Understand feature availability](https://app.gitbook.com/s/wMJrGrimpx3PxCJpUswm/understand-feature-availability#feature-maturity-preview-ga-deprecated-and-removed) for what Preview means.
{% endhint %}

## Resource attributes

Each span includes resource attributes that identify the n8n instance:

- `service.name` (default `n8n`)
- `service.version` (the n8n version)
- `n8n.instance.id`
- `n8n.instance.role` (for example, `main`, `worker`, or `webhook`)

## Workflow span (`workflow.execute`) <a href="#workflow-span-workflowexecute" id="workflow-span-workflowexecute"></a>

| Attribute | Description |
| :-------- | :---------- |
| `n8n.workflow.id` | Workflow ID. |
| `n8n.workflow.name` | Workflow name. |
| `n8n.workflow.version_id` | Workflow version ID. |
| `n8n.workflow.node_count` | Number of nodes in the workflow. Absent on a [rebuilt span](#tracked-and-rebuilt-spans) for a crashed execution. |
| `n8n.project.id` | Project ID. Available from n8n 2.23.0. |
| `n8n.project.name` | Project name. Team projects only: a personal project's name contains its owner's name and email, so n8n leaves it out. Available from n8n 2.44.0. |
| `n8n.execution.id` | Execution ID. |
| `n8n.execution.mode` | Execution mode (for example, `manual`, `webhook`, `trigger`, `retry`). |
| `n8n.execution.status` | Final execution status, including `crashed` for a [crashed execution](#crashed-executions). |
| `n8n.execution.is_retry` | `true` if the execution is a retry. |
| `n8n.execution.retry_of` | The original execution ID, when the execution is a retry. |
| `n8n.execution.error_type` | Error class name, set when the execution fails. `WorkflowCrashedError` on a crash. |
| `n8n.execution.crash.detector` | Which check found the crash: `stall`, `queue-recovery`, `startup-recovery`, `start-failure`, or `workflow-deactivation`. See [How n8n detects a crash](#how-n8n-detects-a-crash). Available from n8n 2.42.0. |
| `n8n.execution.reconstructed` | `true` when n8n rebuilt the span after a crash, `false` when it ended the original span. See [Tracked and rebuilt spans](#tracked-and-rebuilt-spans). Available from n8n 2.42.0. |
| `n8n.continuation.reason` | Set on a span link when the workflow resumes after a wait. |
| `n8n.project.custom.<key>` | Custom attributes set through [project-level custom span attributes](add-custom-span-attributes.md). |
| `n8n.workflow.custom.<key>` | Custom attributes set through [workflow-level custom span attributes](add-custom-span-attributes.md). |

## Node span (`node.execute`) <a href="#node-span-nodeexecute" id="node-span-nodeexecute"></a>

| Attribute | Description |
| :-------- | :---------- |
| `n8n.node.id` | Node ID. |
| `n8n.node.name` | Node name. |
| `n8n.node.type` | Node type (for example, `n8n-nodes-base.httpRequest`). |
| `n8n.node.type_version` | Node type version. |
| `n8n.node.items.input` | Number of input items the node received. |
| `n8n.node.items.output` | Number of output items the node produced. |
| `n8n.node.termination_reason` | Why a node span ended without a normal completion (for example, `workflow_cancelled` or `workflow_crashed`). |
| `n8n.node.custom.<key>` | Custom attributes set through [node-level custom span attributes](add-custom-span-attributes.md) in the node settings or `metadata.tracing` in custom node code. |

Node spans also carry `n8n.project.id` from n8n 2.42.0, and `n8n.execution.id`, `n8n.workflow.id`, `n8n.workflow.name`, and `n8n.project.name` from n8n 2.44.0, with the same values as their workflow span. To find every span of one execution in Jaeger, search for the tag `n8n.execution.id=<execution-id>`.

When a node fails, n8n records an `exception` event on the span with the standard OpenTelemetry exception attributes (`exception.type`, `exception.message`, `exception.stacktrace`).

## Agent run span (`<agent name>.generate` or `<agent name>.stream`) <a href="#agent-run-span" id="agent-run-span"></a>

| Attribute | Description |
| :-------- | :---------- |
| `gen_ai.operation.name` | Always `invoke_agent`. |
| `gen_ai.agent.name` | Agent name. |
| `gen_ai.request.model` | Model ID, as `<provider>/<model name>`, when known. |
| `gen_ai.conversation.id` | Thread ID. |
| `gen_ai.prompt` | Serialized prompt, tool count, and tool catalog. Omitted when `N8N_AGENTS_TRACING_RECORD_INPUTS` is `false`. |
| `agent_id` | Agent ID. |
| `project_id` | Project ID. |
| `thread_id` | Thread ID. |
| `source` | Where the run started (for example, `workflow`, or a chat integration name). |
| `user_id` | User ID, when known. |
| `model_id` | Model ID, as `<provider>/<model name>`, when known. |
| `execution_id` | Execution ID, for workflow-triggered runs. |
| `workflow_id` | Workflow ID, for workflow-triggered runs. |
| `node_id` | Node ID, for workflow-triggered runs. |

## Tool call span (`execute_tool <tool name>`) <a href="#tool-call-span" id="tool-call-span"></a>

| Attribute | Description |
| :-------- | :---------- |
| `gen_ai.operation.name` | Always `execute_tool`. |
| `gen_ai.tool.name` | Tool name. |
| `gen_ai.tool.call.id` | Tool call ID. |
| `gen_ai.agent.name` | Agent name. |
| `gen_ai.tool.call.arguments` | Tool call arguments. Omitted when `N8N_AGENTS_TRACING_RECORD_INPUTS` is `false`. |
| `gen_ai.tool.call.result` | Tool call result. Omitted when `N8N_AGENTS_TRACING_RECORD_OUTPUTS` is `false`. |

## Expression span

Each `expression.evaluate` span carries these attributes:

| Attribute | Description |
| :-------- | :---------- |
| `expression.engine` | The backend expression engine, `vm` or `quickjs`. |
| `expression.duration_seconds` | How long the evaluation took. |
| `expression.outcome` | `healthy`, `slow`, or `error`. |
| `expression.error.type` | The error type, when the evaluation failed. |

To turn on expression spans, refer to [Trace expression evaluations](choose-which-spans-n8n-exports.md#trace-expression-evaluations).

## Crashed executions

{% hint style="info" %}
**Feature availability**

Spans for crashed executions are available from n8n 2.42.0.
{% endhint %}

An execution is `crashed` when the n8n instance running it stopped without recording a result, for example after an out-of-memory kill or a container eviction. n8n marks the execution `crashed` later, once it notices the execution can't finish. Before n8n 2.42.0, these executions produced no span, so the error rate in your trace backend missed every platform failure. From n8n 2.42.0, a crashed execution produces one `workflow.execute` span.

### Receive crashed spans

The instance that notices the crash emits the span, not the instance that ran the execution. In [queue mode](../../configure-n8n/scaling/enable-queue-mode.md), that's the main instance, so enable OpenTelemetry on the main instance, not only on the workers. In regular mode, the single main instance runs and checks its own executions, so the normal setup covers it.

### Read a crashed span

A crashed span carries the usual [workflow span attributes](#workflow-span-workflowexecute) plus:

| Attribute | Value |
| :-------- | :---- |
| `n8n.execution.status` | `crashed` |
| `n8n.execution.error_type` | `WorkflowCrashedError` |
| `n8n.execution.crash.detector` | Which check found the crash. See [How n8n detects a crash](#how-n8n-detects-a-crash). |
| `n8n.execution.reconstructed` | `false` when n8n ended the original span, `true` when it rebuilt one. See [Tracked and rebuilt spans](#tracked-and-rebuilt-spans). |

The span has status error and an `exception` event.

### How n8n detects a crash

| Detector | Meaning |
| :------- | :------ |
| `stall` | Queue mode. The worker stopped renewing its job lock. |
| `queue-recovery` | Queue mode. A periodic check found a running execution with no job in the queue. |
| `startup-recovery` | n8n restarted and found an execution still marked as running. |
| `start-failure` | The execution couldn't start. |
| `workflow-deactivation` | Someone unpublished the workflow while it had executions in progress. |

### Tracked and rebuilt spans

The instance that starts an execution opens its `workflow.execute` span. If the same instance detects the crash, it ends that span in place with `n8n.execution.reconstructed=false`. The span keeps every attribute set at start. Node spans still open on that instance end with `n8n.node.termination_reason=workflow_crashed`.

If a different instance detects the crash, for example after the main instance restarted, no open span exists. n8n rebuilds a `workflow.execute` span in the same trace from the trace context stored on the execution, with `n8n.execution.reconstructed=true`. A rebuilt span carries the workflow ID, workflow name, workflow version ID, project ID, project and workflow [custom span attributes](add-custom-span-attributes.md), execution ID, execution mode, `n8n.execution.is_retry`, and `n8n.execution.retry_of`. It lacks:

- `n8n.workflow.node_count`.
- Node spans of its own. Node spans exported before the crash stay in the trace. The node that was running when the instance died has no span.
- A span link to the previous span, when the execution had resumed from a wait.

Its workflow custom attributes come from the workflow's current settings, not the version that ran.

### Crashed execution caveats

- **Duration is detection lag, not run time.** A crashed span ends when n8n detected the crash, not when the instance died. That's one to two minutes for `stall`, the next periodic check for `queue-recovery`, and the next restart for `startup-recovery`. Exclude spans with `n8n.execution.status=crashed` from latency metrics. Count them in error-rate metrics only.
- **Rebuilt spans show a missing parent.** The stored trace context is the original span's ID, and OpenTelemetry can't reuse a span ID. The rebuilt span is a child of the span that never ended, so Jaeger and similar backends flag a missing parent. Expect the warning.
- **Stalled queue jobs changed status.** Before n8n 2.42.0, a job whose worker died ended as `error`. From n8n 2.42.0 it ends as `crashed` with detector `stall`. Alerts that match only `n8n.execution.status=error` miss these.

## Related resources

- [Trace executions with OpenTelemetry](./)
- [Set up OpenTelemetry tracing](set-up-tracing.md)
- [Choose which spans n8n exports](choose-which-spans-n8n-exports.md)
- [Propagate trace context](propagate-trace-context.md)
- [Add custom span attributes](add-custom-span-attributes.md)
- [Troubleshoot OpenTelemetry tracing](troubleshoot-tracing.md)
