---
title: Execution data redaction
description: Control the visibility of execution data in workflows to protect sensitive information and meet compliance requirements.
contentType: howto
---

# Execution data redaction

/// info | Feature availability
**Available from:** n8n version 2.16.0
///

Execution data redaction lets you hide the input and output data of workflow executions. This helps protect sensitive information like personal data, authentication tokens, and financial records from users who can view the workflow but don't need to see the underlying data.

When you enable redaction, execution metadata (status, timing, node names) remains visible, but n8n replaces the actual data payload processed by each node with a redacted indicator.

## Why use execution data redaction

Workflows often process data that the workflow builder or viewers shouldn't have access to outside of n8n. Common scenarios include:

- **Dynamic credentials**: End users authenticate through workflows, and their data flows through execution logs that the builder can view.
- **PII and compliance**: Workflows handling customer personal data (emails, addresses, financial records) need to meet GDPR, SOC 2, or internal security standards.
- **Cross-department workflows**: A workflow built by one team processes sensitive data from another team that the builder wouldn't have access to otherwise.
- **Least privilege principle**: Limiting data visibility to only those who need it, rather than everyone with workflow view access.

Before execution data redaction, the only option was to disable execution history entirely at the workflow level, which removed all visibility into workflow success or failure status. Execution data redaction preserves execution monitoring while hiding the sensitive data payload.

## Configure redaction settings

You configure redaction per workflow in the workflow settings. You need the **Manage data redaction** (`workflow:updateRedactionSetting`) scope to change these settings.

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
| **Redact production execution data** | Controls whether n8n redacts data from production (non-manually triggered) executions. Production executions include those triggered by webhooks, schedules, or other triggers when the workflow stays active. |
| **Redact manual execution data** | Controls whether n8n redacts data from manually triggered executions. Manual executions include those you start by selecting **Execute Workflow** in the editor. |

These two toggles combine into a single `redactionPolicy` stored on the workflow:

| Production | Manual | Resulting policy |
| ---------- | ------ | ---------------- |
| Don't redact | Don't redact | `none` - n8n applies no redaction to any executions |
| Redact | Don't redact | `non-manual` - n8n redacts only production executions |
| Don't redact | Redact | `manual-only` - n8n redacts only manual executions |
| Redact | Redact | `all` - n8n redacts all executions |

### Dynamic credentials

n8n always fully redacts executions that use dynamic credentials, regardless of the workflow's redaction setting. Dynamic credential executions process data on behalf of end users, and the workflow builder shouldn't have access to that data.

n8n detects dynamic credential usage per execution at runtime. The same workflow may have some executions that used dynamic credentials and others that didn't. When n8n detects dynamic credentials, it enforces redaction and prevents the data from being revealed, even by users with the `execution:reveal` scope.

## What redacted data looks like

When n8n redacts an execution:

- n8n replaces all input and output data for each node with an empty object.
- n8n removes binary data (files, images).
- n8n redacts error messages, preserving only the error type and HTTP status code (for API errors) to aid in troubleshooting.
- The execution viewer displays a **"Data redacted"** indicator with a shredder icon instead of the usual data tables.
- Execution metadata remains visible: node names, execution status (success/failure), timing information, and the workflow structure.

/// note | Error information
When n8n redacts execution data, it also redacts error details to prevent sensitive information from leaking through error messages. Only the error type (for example, `NodeApiError`) and HTTP status code remain. This provides enough information to identify the category of failure without exposing data.
///

## Reveal redacted data

Users with the **Reveal execution data** (`execution:reveal`) scope can temporarily view redacted execution data for a specific execution. Instance owners and admins have this scope by default.

To reveal data:

1. Open the execution in the execution viewer.
2. Select the **Reveal data** button displayed in the redacted data area.
3. Review the confirmation dialog. It explains that:
	- The system logs the action in the audit trail.
	- You should only reveal data if you have a legitimate reason.
	- Unnecessary access may violate your organization's policy.
4. Select **Reveal data** to confirm.

The execution data becomes visible for that execution in the current session.

/// warning | You can't reveal dynamic credential executions
Users can't reveal executions that used dynamic credentials, even with the `execution:reveal` scope. This security measure protects end-user data that flows through workflows using dynamic credential resolution.
///

### Audit logging

[Log streaming](/log-streaming.md) tracks all reveal actions. Two audit events are available:

| Event | Description |
| ----- | ----------- |
| `n8n.audit.execution.data.revealed` | n8n emits this event when a user reveals redacted execution data. Includes the user, execution ID, workflow ID, timestamp, IP address, and the redaction policy in effect. |
| `n8n.audit.execution.data.reveal_failure` | n8n emits this event when it denies a reveal attempt (for example, due to insufficient permissions). Includes the same fields plus the rejection reason. |

These events integrate with your existing log streaming destinations (syslog, webhooks, Sentry) and support compliance reporting and access auditing.

## Permission scopes

Execution data redaction introduces two permission scopes that you can assign through [custom project roles](/user-management/rbac/custom-roles.md):

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
| Workflows where dynamic credentials may appear | n8n always fully redacts executions using dynamic credentials |

### General recommendations

- **Start with production redaction**: For most workflows handling sensitive data, redacting production executions while keeping manual executions visible provides a good balance between security and ease of debugging.
- **Redact manual data when needed**: If your test environment uses real or production-like data, enable manual execution redaction as well.
- **Use log streaming**: Enable [log streaming](/log-streaming.md) to capture reveal audit events. This provides an audit trail for compliance and allows you to monitor who accesses sensitive execution data.
- **Limit reveal access**: Only grant the `execution:reveal` scope to users who have a legitimate need to view sensitive data in production executions.
- **Review redaction settings during workflow reviews**: Include redaction policy as part of your workflow review or approval process, particularly for workflows that handle cross-department or customer-facing data.

## Security considerations

- n8n applies redaction at the API level and never sends redacted data to the browser.
- Nodes can declare specific output fields as sensitive (using `sensitiveOutputFields` in the node type definition). n8n always redacts these fields and prevents revealing them, even for users with the `execution:reveal` scope.
- If the redaction service can't resolve a node's type definition (for example, after uninstalling a community node), n8n fully redacts all output data for that node. This fail-closed approach prevents unknown nodes from leaking sensitive fields.
- n8n stores redaction settings as part of the workflow configuration. You can manage them through [source control](/source-control-environments/index.md).
