---
title: Execution data redaction
description: Control the visibility of execution data in workflows to protect sensitive information and meet compliance requirements.
contentType: howto
---

# Execution data redaction

Execution data redaction lets you hide the input and output data of workflow executions. This helps protect sensitive information like personal data, authentication tokens, and financial records from being visible to users who can view the workflow but don't need to see the underlying data.

When redaction is enabled, execution metadata (status, timing, node names) remains visible, but the actual data payload processed by each node is replaced with a redacted indicator.

## Why use execution data redaction

Workflows often process data that the workflow builder or viewers should not have access to outside of n8n. Common scenarios include:

- **Dynamic credentials**: End users authenticate through workflows, and their data flows through execution logs that the builder can freely view.
- **PII and compliance**: Workflows handling customer personal data (emails, addresses, financial records) need to comply with GDPR, SOC 2, or internal security standards.
- **Cross-department workflows**: A workflow built by one team processes sensitive data from another team that the builder would not normally have access to.
- **Least privilege principle**: Limiting data visibility to only those who need it, rather than everyone with workflow view access.

Previously, the only option was to disable execution history entirely at the workflow level, which removed all visibility into workflow success or failure status. Execution data redaction preserves execution monitoring while hiding the sensitive data payload.

## Configure redaction settings

Redaction is configured per workflow in the workflow settings. You need the **Manage data redaction** (`workflow:updateRedactionSetting`) scope to change these settings.

To configure redaction:

1. Open your workflow.
2. Select the **three dots icon** <span class="n8n-inline-image">![three dots icon](/_images/common-icons/three-dots-horizontal.png){.off-glb}</span> in the upper-right corner.
3. Select **Settings**.
4. Find the **Redact production execution data** and **Redact manual execution data** settings.
5. For each setting, choose either **Default - Do not redact** or **Redact**.
6. Select **Save**.

### Redaction settings explained

There are two independent toggles that control redaction:

| Setting | What it controls |
| ------- | ---------------- |
| **Redact production execution data** | Controls whether data from production (non-manually triggered) executions is redacted. Production executions are those triggered by webhooks, schedules, or other triggers when the workflow is active. |
| **Redact manual execution data** | Controls whether data from manually triggered executions is redacted. Manual executions are those started by selecting **Execute Workflow** in the editor. |

These two toggles combine into a single `redactionPolicy` stored on the workflow:

| Production | Manual | Resulting policy |
| ---------- | ------ | ---------------- |
| Do not redact | Do not redact | `none` - No redaction applied to any executions |
| Redact | Do not redact | `non-manual` - Only production executions are redacted |
| Do not redact | Redact | `manual-only` - Only manual executions are redacted |
| Redact | Redact | `all` - All executions are redacted |

### Dynamic credentials

Workflows that use dynamic credentials always have their production execution data redacted, regardless of the redaction setting. This is because dynamic credential executions process data on behalf of end users, and the workflow builder should not be able to view that data.

When a workflow uses dynamic credentials, the **Redact production execution data** setting is locked to **Redact** and cannot be changed.

## What redacted data looks like

When an execution is redacted:

- All input and output data for each node is replaced with an empty object.
- Binary data (files, images) is removed.
- Error messages are redacted, preserving only the error type and HTTP status code (for API errors) to aid in troubleshooting.
- The execution viewer displays a **"Data redacted"** indicator with a shredder icon instead of the usual data tables.
- Execution metadata remains visible: node names, execution status (success/failure), timing information, and the workflow structure.

/// note | Error information
When execution data is redacted, error details are also redacted to prevent sensitive information from leaking through error messages. Only the error type (for example, `NodeApiError`) and HTTP status code are preserved. This provides enough information to identify the category of failure without exposing data.
///

## Reveal redacted data

Users with the **Reveal execution data** (`execution:reveal`) scope can temporarily view redacted execution data for a specific execution. Instance owners and admins have this scope by default.

To reveal data:

1. Open the execution in the execution viewer.
2. Select the **Reveal data** button displayed in the redacted data area.
3. Review the confirmation dialog. It explains that:
	- The action will be logged in the audit trail.
	- You should only reveal data if you have a legitimate reason.
	- Unnecessary access may violate your organization's policy.
4. Select **Reveal data** to confirm.

The execution data becomes visible for that execution in the current session.

/// warning | Dynamic credential executions can't be revealed
Executions that used dynamic credentials can't be revealed, even by users with the `execution:reveal` scope. This is a security measure to protect end-user data that flows through workflows using dynamic credential resolution.
///

### Audit logging

All reveal actions are tracked through [log streaming](/log-streaming.md). Two audit events are available:

| Event | Description |
| ----- | ----------- |
| `execution.data.revealed` | Emitted when a user successfully reveals redacted execution data. Includes the user, execution ID, workflow ID, timestamp, IP address, and the redaction policy in effect. |
| `execution.data.revealed_failure` | Emitted when a reveal attempt is denied (for example, due to insufficient permissions). Includes the same fields plus the rejection reason. |

These events integrate with your existing log streaming destinations (syslog, webhooks, Sentry) and can be used for compliance reporting and access auditing.

/// note | Fail-closed behavior
If the audit system is unavailable when a reveal is attempted, the reveal is denied and a `503 Service Unavailable` error is returned. This fail-closed behavior ensures that all data access is auditable.
///

## Permission scopes

Execution data redaction introduces two permission scopes that can be assigned through [custom project roles](/user-management/rbac/custom-roles.md):

| Scope | Purpose |
| ----- | ------- |
| `workflow:updateRedactionSetting` | Allows modifying the redaction policy in workflow settings. Displayed as **Manage data redaction** in the role configuration UI. |
| `execution:reveal` | Allows revealing redacted execution data. Instance owners and admins have this scope by default. |

Apply the principle of least privilege when assigning these scopes:

- Grant `workflow:updateRedactionSetting` to project admins or security leads who define data access policies.
- Grant `execution:reveal` sparingly, typically to a small set of trusted users who may need to troubleshoot production issues involving sensitive data.

## Best practices

### Choosing the right redaction policy

| Scenario | Recommended setting |
| -------- | ------------------- |
| Workflows processing PII, financial data, or authentication tokens in production | Redact production execution data |
| Workflows where even test data is sensitive (for example, using copies of production data) | Redact both production and manual execution data |
| Workflows processing non-sensitive data, or during initial development | No redaction |
| Workflows using dynamic credentials | Production data is always redacted automatically |

### General recommendations

- **Start with production redaction**: For most workflows handling sensitive data, redacting production executions while keeping manual executions visible provides a good balance between security and debuggability.
- **Redact manual data when needed**: If your test environment uses real or production-like data, enable manual execution redaction as well.
- **Use log streaming**: Enable [log streaming](/log-streaming.md) to capture reveal audit events. This provides an audit trail for compliance and allows you to monitor who is accessing sensitive execution data.
- **Limit reveal access**: Only grant the `execution:reveal` scope to users who have a legitimate need to view sensitive data in production executions.
- **Review redaction settings during workflow reviews**: Include redaction policy as part of your workflow review or approval process, especially for workflows that handle cross-department or customer-facing data.

## Security considerations

- Redaction is applied at the API level. Redacted data is not sent to the browser.
- Nodes can declare specific output fields as sensitive (using `sensitiveOutputFields` in the node type definition). These fields are always redacted and cannot be revealed, even by users with the `execution:reveal` scope.
- The fail-closed audit design ensures that if logging infrastructure is down, data cannot be silently revealed without a record.
- Redaction settings are stored as part of the workflow configuration and can be managed through [source control](/source-control-environments/index.md).
