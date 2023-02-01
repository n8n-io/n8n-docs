# Isolating n8n

By default even a self-hosted n8n instance would send certain data to n8n.io/n8n.cloud servers. This allows n8n to provide users with notifcations on available updates or to allow access to workflow templates for example. However, in some enviroments it might be necessary to prevent n8n from communicating with these servers.

Such a behaviour can be achieved by setting the below [environment variables](/hosting/environment-variables/):

```
- N8N_DIAGNOSTICS_ENABLED=false
- N8N_VERSION_NOTIFICATIONS_ENABLED=false
- N8N_TEMPLATES_ENABLED=false
- EXTERNAL_FRONTEND_HOOKS_URLS=
- N8N_DIAGNOSTICS_CONFIG_FRONTEND=
- N8N_DIAGNOSTICS_CONFIG_BACKEND=
```
