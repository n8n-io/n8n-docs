# Isolating n8n

By default, a self-hosted n8n instance sends data to n8n's servers. This allows n8n to send users notifications about available updates, allows access to workflow templates, and provides n8n with diagnostic information. 

If you need to prevent your n8n instance from connecting with n8n's servers, use environment variables to turn off the settings that cause your instance to connect with n8n's servers.

Turn off diagnostics, notifications, and workflow templates:

```
N8N_DIAGNOSTICS_ENABLED=false
N8N_VERSION_NOTIFICATIONS_ENABLED=false
N8N_TEMPLATES_ENABLED=false
```

Unset n8n's diagnostics configuration:

```
EXTERNAL_FRONTEND_HOOKS_URLS=
N8N_DIAGNOSTICS_CONFIG_FRONTEND=
N8N_DIAGNOSTICS_CONFIG_BACKEND=
```

Refer to [Environment variables reference](/hosting/environment-variables/environment-variables/) for more information on each variable.
