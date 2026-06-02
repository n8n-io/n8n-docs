| Variable | Type | Default | Description |
| :------- | :--- | :------ | :---------- |
| `N8N_LOG_STREAMING_MANAGED_BY_ENV` | Boolean | `false` | Set to `true` to manage log streaming from environment variables. When `true`, n8n applies the log streaming variables on every startup and locks the matching UI controls. |
| `N8N_LOG_STREAMING_DESTINATIONS` | JSON string | - | JSON array of log streaming destinations. Each destination is an object with a `type` of `webhook`, `syslog`, or `sentry`, plus the configuration for that type. |
