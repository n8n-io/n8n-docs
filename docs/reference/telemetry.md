# Telemetry

n8n collects selected usage and performance data to help us diagnose problems and improve the platform. We take care to keep this data anonymous and to avoid collecting sensitive data. Read about how this information is stored and processed in our [privacy policy](https://n8n.io/legal/privacy).

## What we collect

- Error codes and messages of failed executions (excluding any payload data, and not for custom nodes)
- The graph of a workflow (types of nodes used and how they are connected)
- From node parameters, only:
    - The 'resource' and 'operation' that a node is set to (if applicable)
    - The domain for HTTP nodes (but no path, query parameters or other information)
- The number of workflow executions and their status
- Details on how the UI is used (e.g. navigation, nodes panel searches)
- Diagnostic information
    - n8n version
    - Selected settings:
        - DB_TYPE
        - N8N_VERSION_NOTIFICATIONS_ENABLED
        - N8N_DISABLE_PRODUCTION_MAIN_PROCESS
        - [Execution variables](../reference/environment-variables.html#executions)
        - N8N_BASIC_AUTH_ACTIVE
    - OS, RAM, and CPUs
    - Anonymous instance ID

## What we don’t collect

We do not collect private or sensitive information, such as:

- Personally identifiable information
- Credential information
- Node parameters (except 'resource' and 'operation')
- Execution data
- Sensitive settings (e.g. endpoints, ports, DB connections, username/password)
- Error payloads

## How collection works

Telemetry is collected anonymously, with most data sent to n8n as events that generate it occur. Workflow execution counts and an instance pulse are sent periodically (every 6 hours).

## Opting out of telemetry

Telemetry collection is enabled by default. To disable it you can configure the following environment variables.

To opt out of telemetry events:

```bash
export N8N_DIAGNOSTICS_ENABLED=false
```

To opt out of checking for new versions of n8n:

```bash
export N8N_VERSION_NOTIFICATIONS_ENABLED=false
```

See [configuration](../getting-started/installation/advanced/configuration.html#how-to-set) for more info on how to set environment variables.

