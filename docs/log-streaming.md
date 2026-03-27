---
description: Stream events from n8n to your logging tools.
contentType: howto
---

# Log streaming

/// info | Feature availability
Log Streaming is available on all Enterprise plans.
///

Log streaming allows you to send events from n8n to your own logging tools. This allows you to manage your n8n monitoring in your own alerting and logging processes.

## Set up log streaming

To use log streaming, you have to add a streaming destination.

1. Navigate to **Settings** > **Log Streaming**.
2. Select **Add new destination**.
3. Choose your destination type. n8n opens the **New Event Destination** modal.
4. In the **New Event Destination** modal, enter the configuration information for your event destination. These depend on the type of destination you're using.
5. Select **Events** to choose which events to stream.
6. Select **Save**.

/// note | Self-hosted users
If you self-host n8n, you can configure additional log streaming behavior using [Environment variables](/hosting/configuration/environment-variables/logs.md#log-streaming).
///
## Events

The following events are available. You can choose which events to stream in **Settings** > **Log Streaming** > **Events**.

* Workflow
	* Started
	* Success
	* Failed
	* Cancelled
* Node executions
	* Started
	* Finished
* Audit
	* User login success
	* User login failed
	* User signed up
	* User updated
	* User deleted
	* User invited
	* User invitation accepted
	* User re-invited
	* User email failed
	* User reset requested
	* User reset
	* User credentials created
	* User credentials shared
	* User credentials updated
	* User credentials deleted
	* User API created
	* User API deleted
	* User MFA enabled
	* User MFA disabled
	* User execution deleted
	* Workflow executed
	* Package installed
	* Package updated
	* Package deleted
	* Workflow created
	* Workflow deleted
	* Workflow updated
	* Workflow archived
	* Workflow unarchived
	* Workflow activated
	* Workflow deactivated
	* Workflow version updated
	* Variable created
	* Variable updated
	* Variable deleted
	* External secrets provider settings saved
	* External secrets provider reloaded
	* Personal publishing restricted enabled
	* Personal publishing restricted disabled
	* Personal sharing restricted enabled
	* Personal sharing restricted disabled
	* 2FA enforcement enabled
	* 2FA enforcement disabled
* Worker
	* Started
	* Stopped
* AI node logs
	* Memory get messages
	* Memory added message
	* Output parser parsed
	* Retriever get relevant documents
	* Embeddings embedded document
	* Embeddings embedded query
	* Document processed
	* Text splitter split
	* Tool called
	* Vector store searched
	* LLM generated
	* LLM error
	* Vector store populated
	* Vector store updated
* Runner
	* Task requested
	* Response received
* Queue
	* Job enqueued
	* Job dequeued
	* Job completed
	* Job failed
	* Job stalled

## Destinations

n8n supports three destination types:

* A syslog server
* A generic webhook
* A Sentry client
