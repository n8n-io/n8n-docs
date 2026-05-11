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
If you self-host n8n, you can configure additional log streaming behavior using [Environment variables](/hosting/configuration/environment-variables/logs.md#log-streaming). You can also manage destinations from environment variables, see [Configure log streaming destinations using environment variables](#configure-using-environment-variables).
///

## Per-process event log files

n8n persists each emitted event to a local log file before forwarding it to streaming destinations. The file survives restarts and lets n8n re-emit events that weren't yet delivered.

By default, n8n writes the event log to `<n8n-user-folder>/n8nEventLog.log`, with a `-worker` or `-webhook-processor` suffix on those processes. When a single n8n process owns the file, this default works as expected.

/// warning | Shared writable filesystems
If multiple n8n processes share one writable volume, for example [queue mode](/hosting/scaling/queue-mode.md) workers backed by a shared persistent volume on NFS or EFS, they must not write to the same event log file. Concurrent appends from multiple processes can interleave or corrupt the file, leading to recovery failures and lost events.
///

To avoid this, set [`N8N_EVENTBUS_LOGWRITER_LOGFULLPATH`](/hosting/configuration/environment-variables/logs.md#log-streaming) on each process to a unique absolute path that ends in `.log`. n8n uses the configured path verbatim and doesn't append a process-type suffix, so your orchestrator owns uniqueness across processes.

The companion variable [`N8N_EVENTBUS_LOGWRITER_MAXTOTALMESSAGESPERFILE`](/hosting/configuration/environment-variables/logs.md#log-streaming) bounds how many lines n8n parses from a single event log file during recovery, so a corrupted file can't exhaust process memory.

Notes:

* Default behavior is unchanged when `N8N_EVENTBUS_LOGWRITER_LOGFULLPATH` isn't set.
* When the variable is set, n8n doesn't auto-suffix the path. Each process must receive its own value.
* If a shared `n8nEventLog-worker.log` file already exists from a previous deployment, quarantine it manually before opting in. n8n doesn't auto-delete legacy files.

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
	* Execution data revealed
	* Execution data reveal failed
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
    * Workflow executed
	* Workflow waiting
	* Workflow resumed
	* Variable created
	* Variable updated
	* Variable deleted
	* External secrets provider settings saved
	* External secrets provider reloaded
	* External secrets connection created
	* External secrets connection updated
	* External secrets connection deleted
	* External secrets connection tested
	* External secrets connection reloaded
	* Personal publishing restricted enabled
	* Personal publishing restricted disabled
	* Personal sharing restricted enabled
	* Personal sharing restricted disabled
	* 2FA enforcement enabled
	* 2FA enforcement disabled
	* Token exchange succeeded
	* Token exchange failed
	* Token exchange embed login
	* Token exchange embed login failed
	* Token exchange identity linked
	* Token exchange user provisioned
	* Token exchange role updated
	* Role mapping roles resolved
	* Role mapping rule created
	* Role mapping rule updated
	* Role mapping rule deleted
	* Role mapping rules bulk deleted
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

## Configure using environment variables

If you self-host n8n, you can manage log streaming destinations from environment variables instead of the UI. Available from n8n v2.19.0. Set `N8N_LOG_STREAMING_MANAGED_BY_ENV` to `true` and provide your destinations as a JSON array in `N8N_LOG_STREAMING_DESTINATIONS`. n8n reapplies these on every startup and locks the **Log Streaming** UI as read-only. See [Manage instance settings using environment variables](/hosting/configuration/settings-env-vars.md) for the full pattern.

--8<-- "_snippets/self-hosting/configuration/environment-variables/settings-env-vars/log-streaming.md"

### Common fields

Every destination accepts these fields, regardless of `type`.

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `type` | `"webhook"` \| `"syslog"` \| `"sentry"` | Yes | Destination type. Determines which type-specific fields apply. |
| `label` | string | No | Display name shown in the UI. |
| `enabled` | boolean | No | Whether the destination forwards events. |
| `subscribedEvents` | string[] | No | Event names or group prefixes to forward (for example `n8n.audit`, `n8n.workflow`). |
| `anonymizeAuditMessages` | boolean | No | Strip sensitive payload data from `n8n.audit.*` events. |
| `circuitBreaker` | object | No | Failure-protection settings. See [Circuit breaker](#circuit-breaker). |

### Webhook

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `url` | string (URL) | Yes | - | Endpoint that receives the event payload. |
| `method` | `"GET"` \| `"POST"` \| `"PUT"` | No | `"POST"` | HTTP method used for delivery. |
| `sendQuery` | boolean | No | `false` | Whether to send query parameters. |
| `specifyQuery` | `"keypair"` \| `"json"` | No | `"keypair"` | Format for query parameters when `sendQuery` is `true`. |
| `queryParameters` | `{ parameters: [{ name, value }] }` | No | - | Query parameters as key/value pairs. Used when `specifyQuery` is `"keypair"`. |
| `jsonQuery` | string | No | `""` | Query parameters as a JSON string. Used when `specifyQuery` is `"json"`. |
| `sendHeaders` | boolean | No | `false` | Whether to send headers. |
| `specifyHeaders` | `"keypair"` \| `"json"` | No | `"keypair"` | Format for headers when `sendHeaders` is `true`. |
| `headerParameters` | `{ parameters: [{ name, value }] }` | No | - | Headers as key/value pairs. Used when `specifyHeaders` is `"keypair"`. |
| `jsonHeaders` | string | No | `""` | Headers as a JSON string. Used when `specifyHeaders` is `"json"`. |
| `options` | object | No | `{}` | Connection-level options. See [Webhook options](#webhook-options). |

#### Webhook options

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `allowUnauthorizedCerts` | boolean | No | `false` | Ignore SSL certificate validation. |
| `queryParameterArrays` | `"repeat"` \| `"brackets"` \| `"indices"` | No | `"brackets"` | Array format used in query parameters. Used when `sendQuery` is `true`. |
| `redirect` | `{ redirect: { followRedirects, maxRedirects } }` | No | `{ redirect: {} }` | Follow HTTP redirects. `followRedirects` defaults to `false`; `maxRedirects` defaults to `21`. |
| `proxy` | `{ proxy: { protocol, host, port } }` | No | `{ proxy: {} }` | HTTP/HTTPS proxy. `protocol` is `"https"` or `"http"`; `host` defaults to `"127.0.0.1"`; `port` defaults to `9000`. |
| `timeout` | integer ≥ 1 (ms) | No | `5000` | Time to wait for the server to start the response before aborting. |
| `socket` | `{ keepAlive, maxSockets, maxFreeSockets }` | No | `{ keepAlive: true, maxSockets: 50, maxFreeSockets: 5 }` | Socket pool configuration. `maxSockets` and `maxFreeSockets` are integers ≥ 1. |

```json
[
  {
    "type": "webhook",
    "label": "Audit",
    "subscribedEvents": ["n8n.audit", "n8n.workflow"],
    "anonymizeAuditMessages": true,
    "url": "https://hooks.example.com/n8n",
    "method": "POST",
    "sendHeaders": true,
    "specifyHeaders": "keypair",
    "headerParameters": {
      "parameters": [
        { "name": "Authorization", "value": "Bearer s3cret" }
      ]
    },
    "options": {
      "timeout": 5000,
      "redirect": { "redirect": { "followRedirects": true, "maxRedirects": 5 } }
    }
  }
]
```

### Syslog

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `host` | string | Yes | - | Syslog server hostname or IP. |
| `port` | number | No | `514` | Syslog server port. |
| `protocol` | `"udp"` \| `"tcp"` \| `"tls"` | No | `"udp"` | Transport protocol. |
| `tlsCa` | string | When `protocol` is `"tls"` | `""` | PEM-formatted CA certificate used for the TLS connection. |
| `facility` | number | No | `16` | Syslog facility code. Allowed values: `0` (Kernel), `1` (User), `3` (System), `13` (Audit), `14` (Alert), `16` to `23` (Local0 to Local7). |
| `app_name` | string | No | `"n8n"` | Value used as the syslog `APP-NAME`. |

```json
[
  {
    "type": "syslog",
    "label": "SIEM",
    "subscribedEvents": ["n8n.audit", "n8n.workflow"],
    "host": "syslog.example.com",
    "port": 514,
    "protocol": "tls",
    "tlsCa": "-----BEGIN CERTIFICATE-----\n…\n-----END CERTIFICATE-----",
    "facility": 16,
    "app_name": "n8n"
  }
]
```

### Sentry

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `dsn` | string (URL) | Yes | - | Sentry DSN client key. |

```json
[
  {
    "type": "sentry",
    "label": "Sentry prod",
    "subscribedEvents": ["n8n.workflow"],
    "dsn": "https://public@sentry.example.com/1"
  }
]
```

### Circuit breaker

A circuit breaker temporarily stops delivery to a destination after repeated failures, preventing load on a struggling downstream service. Available on every destination type.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `maxFailures` | integer ≥ 1 | No | `5` | n8n stops sending requests to the destination once failures within `failureWindow` reach this number. |
| `failureWindow` | integer ≥ 100 (ms) | No | `60000` | Sliding window for counting failures. Older failures expire. |

```json
{ "circuitBreaker": { "maxFailures": 3, "failureWindow": 30000 } }
```

### Complete example

```bash
N8N_LOG_STREAMING_MANAGED_BY_ENV=true
N8N_LOG_STREAMING_DESTINATIONS='[
  {
    "type": "webhook",
    "label": "Ops webhook",
    "enabled": true,
    "subscribedEvents": ["n8n.workflow", "n8n.audit"],
    "anonymizeAuditMessages": true,
    "url": "https://hooks.example.com/n8n",
    "method": "POST",
    "sendHeaders": true,
    "specifyHeaders": "keypair",
    "headerParameters": {
      "parameters": [
        { "name": "Authorization", "value": "Bearer s3cret" }
      ]
    },
    "circuitBreaker": { "maxFailures": 5, "failureWindow": 60000 }
  },
  {
    "type": "sentry",
    "label": "Sentry prod",
    "subscribedEvents": ["n8n.workflow"],
    "dsn": "https://public@sentry.example.com/1"
  }
]'
```
