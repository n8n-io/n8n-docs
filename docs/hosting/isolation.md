# Isolating n8n

By default, even a self-hosted n8n instance would send certain data to the n8n.io/n8n.cloud servers. This allows n8n to notify users of available updates or provide access to workflow templates, for example. However, in some environments it may be necessary to prevent n8n from communicating with these servers.

This can be achieved by setting the following [environment variables](/hosting/environment-variables/):

```
- N8N_DIAGNOSTICS_ENABLED=false
- N8N_VERSION_NOTIFICATIONS_ENABLED=false
- N8N_TEMPLATES_ENABLED=false
- EXTERNAL_FRONTEND_HOOKS_URLS=
- N8N_DIAGNOSTICS_CONFIG_FRONTEND=
- N8N_DIAGNOSTICS_CONFIG_BACKEND=
```
