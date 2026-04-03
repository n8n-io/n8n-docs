---
contentType: overview
title: Trigger nodes
description: Learn about trigger nodes in n8n and browse the trigger nodes library.
---

# Trigger nodes

A [trigger node](/glossary.md#trigger-node-n8n) is the starting point of every production workflow. It listens for a specific event or condition and, when that condition is met, starts the workflow execution and passes data to the next node.

All active workflows require at least one trigger node. Without a trigger, a workflow can only run manually.

## How trigger nodes work

Trigger nodes use one of two mechanisms to detect events:

**Webhook-based triggers** receive data pushed from an external service in real time. When an event occurs (for example, a new message in Slack or a payment in Stripe), the service sends an HTTP request directly to n8n, which immediately starts the workflow. These triggers react instantly, with no delay.

**Polling-based triggers** check an external service for new data on a schedule. n8n queries the service's API at regular intervals (such as every minute or every hour) and starts the workflow if it finds new or changed data since the last check. Use these when the service doesn't support webhooks.

## Types of trigger nodes

### Service triggers

Service trigger nodes connect to external applications and start workflows in response to events in those services. Examples include:

- **[Gmail Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.gmailtrigger/index.md)** — triggers when new emails arrive or match a filter
- **[Slack Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.slacktrigger.md)** — triggers on messages, reactions, and other Slack events
- **[GitHub Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.githubtrigger.md)** — triggers on repository events such as pushes, pull requests, and issues
- **[Stripe Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.stripetrigger.md)** — triggers on payment events

Browse all available service triggers in the [Triggers library](#triggers-library) below.

### Core triggers

Core trigger nodes handle common scheduling and workflow control needs without connecting to a specific external service. You can find these in the [core nodes library](/integrations/builtin/core-nodes/index.md):

- **[Schedule Trigger](/integrations/builtin/core-nodes/n8n-nodes-base.scheduletrigger/index.md)** — runs a workflow on a time-based schedule (cron or interval)
- **[Webhook](/integrations/builtin/core-nodes/n8n-nodes-base.webhook/index.md)** — starts a workflow when it receives an HTTP request
- **[Manual Trigger](/integrations/builtin/core-nodes/n8n-nodes-base.manualworkflowtrigger.md)** — starts a workflow when you click **Test workflow** in the editor
- **[Form Trigger](/integrations/builtin/core-nodes/n8n-nodes-base.formtrigger/index.md)** — starts a workflow when a user submits an n8n-hosted form
- **[Chat Trigger](/integrations/builtin/core-nodes/n8n-nodes-langchain.chattrigger/index.md)** — starts an AI workflow from a chat interface
- **[Error Trigger](/integrations/builtin/core-nodes/n8n-nodes-base.errortrigger.md)** — starts a workflow when another workflow fails

## Using trigger nodes

To add a trigger node to a workflow:

1. Open your workflow in the editor.
2. Select **Add first step** (for a new workflow) or select the **+** button on the canvas.
3. Choose a trigger from the panel, or search for a specific service.
4. Configure the trigger's [credentials](/integrations/builtin/credentials/index.md) to authenticate with the external service.
5. Select the events or conditions you want the trigger to respond to.
6. Activate the workflow to enable it in production.

/// note | Testing triggers
When testing in the editor, select **Test workflow** to run a manual execution. For webhook-based triggers, n8n provides a separate test webhook URL so you can send test events without affecting your live production workflow.
///

/// note | Credentials
Each service trigger requires credentials for the relevant service. Refer to the individual trigger node's documentation for authentication instructions.
///
