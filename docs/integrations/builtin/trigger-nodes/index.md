---
title: Trigger nodes
description: Learn what trigger nodes are, how they work in n8n workflows, and how to choose the right trigger for your automation.
contentType: overview
---


# Trigger nodes


A [trigger node](/glossary.md#trigger-node-n8n) is the starting point of every workflow. It listens for a condition and, when that condition is met, starts a workflow execution and passes data to the next node.


Every production workflow needs at least one trigger. You can combine multiple triggers in a single workflow — for example, to start the same automation from either a webhook or a schedule.


## How triggers work


When a trigger node fires, n8n:


1. Receives or detects the triggering event.
2. Creates a new workflow execution.
3. Passes the trigger data as items to the rest of the workflow.


Triggers only run when the workflow is active. To test a trigger without activating the workflow, most trigger nodes include a **Listen for test event** or **Fetch test event** button in the node editor.


## Types of trigger nodes


n8n trigger nodes fall into three categories based on how they detect events.


### Webhook triggers


Webhook triggers wait for an external service to send data to a unique URL that n8n generates. When the service sends a request, the trigger fires immediately.


Use a webhook trigger when:


* The external service supports webhooks or callbacks.
* You need the workflow to run immediately when an event occurs.


Examples: [GitHub Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.githubtrigger.md), [Stripe Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.stripetrigger.md), [Typeform Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.typeformtrigger.md).


For a generic webhook trigger you can use with any service, refer to the [Webhook core node](/integrations/builtin/core-nodes/n8n-nodes-base.webhook/index.md).


### Polling triggers


Polling triggers check an external service for new data at a regular interval. If new data exists since the last check, the trigger fires and passes that data into the workflow.


Use a polling trigger when:


* The external service doesn't support webhooks.
* Near-real-time execution is acceptable.


Examples: [Google Sheets Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.googlesheetstrigger/index.md), [Gmail Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.gmailtrigger/index.md), [Airtable Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.airtabletrigger.md).


### Schedule triggers


Schedule triggers fire at a time or interval you define. They don't respond to external events.


Use a schedule trigger when:


* You want to run a workflow at a fixed time or on a recurring basis.
* No external event should control when the workflow runs.


Refer to the [Schedule Trigger core node](/integrations/builtin/core-nodes/n8n-nodes-base.scheduletrigger/index.md) for this functionality.


## Core triggers vs. app triggers


n8n provides two groups of trigger nodes:


| Group | Where to find them | Description |
|---|---|---|
| **Core triggers** | [Core nodes](/integrations/builtin/core-nodes/index.md) | General-purpose triggers: Manual Trigger, Schedule Trigger, Webhook, Error Trigger, and others. |
| **App triggers** | This section | Service-specific triggers that connect to third-party apps and listen for events from those services. |


## Credentials


App trigger nodes connect to external services, so they require credentials. Each trigger node's documentation includes a link to the relevant credentials setup page.


## Related resources


- [Workflow components: nodes](/workflows/components/nodes.md) — how nodes fit into a workflow.
- [Core nodes](/integrations/builtin/core-nodes/index.md) — general-purpose trigger nodes.
- [Workflow executions](/workflows/executions/index.md) — how to monitor and debug workflow runs.