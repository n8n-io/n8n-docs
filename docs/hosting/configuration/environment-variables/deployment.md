---
title: Deployment environment variables
description: Configure deployment options and application accessibility with environment variables for your self-hosted n8n intance. 
contentType: reference
tags:
  - environment variables
hide:
  - toc
  - tags
---

# Deployment environment variables

This page lists the deployment configuration options for your self-hosted n8n instance, including setting up access URLs, enabling templates, customizing encryption, and configuring server details. 

| Variable | Type  | Default  | Description |
| :------- | :---- | :------- | :---------- |
| `N8N_EDITOR_BASE_URL` | String | - | Public URL where users can access the editor. Also used for emails sent from n8n. |
| `N8N_CONFIG_FILES` | String | - | Use to provide the path to any JSON [configuration file](/hosting/configuration/configuration-methods/). |
| `N8N_DISABLE_UI` | Boolean | `false` | Disable the UI (true) or not (false). |
| `N8N_TEMPLATES_ENABLED` | Boolean | `true` | Enable workflow templates (true) or disable (false). |
| `N8N_TEMPLATES_HOST` | String | `https://api.n8n.io` | Change this if creating your own workflow template library. Note that to use your own workflow templates library, your API must provide the same endpoints and response structure as n8n's. Refer to [Workflow templates](/workflows/templates/) for more information. |
| `N8N_ENCRYPTION_KEY` | String | Random key generated by n8n | Provide a custom key used to encrypt credentials in the n8n database. By default n8n generates a random key on first launch. |
| `N8N_USER_FOLDER` | String | `user-folder` | Provide the path where n8n will create the `.n8n` folder. This directory stores user-specific data, such as database file and encryption key. |
| `N8N_PATH` | String | `/` | The path n8n deploys to. |
| `N8N_HOST` | String | `localhost` | Host name n8n runs on. |
| `N8N_PORT` | Number | `5678` | The HTTP port n8n runs on. |
| `N8N_LISTEN_ADDRESS` | String | `0.0.0.0` | The IP address n8n should listen on. |
| `N8N_PROTOCOL` | Enum string: `http`, `https` | `http` | The protocol used to reach n8n. |
| `N8N_SSL_KEY` | String | - | The SSL key for HTTPS protocol. |
| `N8N_SSL_CERT` | String | - | The SSL certificate for HTTPS protocol. |
| `N8N_PERSONALIZATION_ENABLED` | Boolean | `true` | Whether to ask users personalisation questions and then customise n8n accordingly. |
| `N8N_VERSION_NOTIFICATIONS_ENABLED` | Boolean | `true` | When enabled, n8n sends notifications of new versions and security updates. |
| `N8N_VERSION_NOTIFICATIONS_ENDPOINT` | String | `https://api.n8n.io/versions/` | The endpoint to retrieve where version information. |
| `N8N_VERSION_NOTIFICATIONS_INFO_URL` | String | `https://docs.n8n.io/getting-started/installation/updating.html` | The URL displayed in the New Versions panel for additional information. |
| `N8N_DIAGNOSTICS_ENABLED` | Boolean | `true` | Whether to share selected, anonymous [telemetry](/privacy-security/privacy/) with n8n |
| `N8N_DIAGNOSTICS_CONFIG_FRONTEND` | String | `1zPn9bgWPzlQc0p8Gj1uiK6DOTn;https://telemetry.n8n.io` | Telemetry configuration for the frontend. |
| `N8N_DIAGNOSTICS_CONFIG_BACKEND` | String | `1zPn7YoGC3ZXE9zLeTKLuQCB4F6;https://telemetry.n8n.io/v1/batch` | Telemetry configuration for the backend. |
| `N8N_PUSH_BACKEND` | String | `websocket` | Choose whether the n8n backend uses server-sent events (`sse`) or WebSockets (`websocket`) to send changes to the UI. |
| `VUE_APP_URL_BASE_API` | String | `http://localhost:5678/` | Used when building the `n8n-editor-ui` package manually to set how the frontend can reach the backend API. |
| `N8N_HIRING_BANNER_ENABLED` | Boolean | `true` | Whether to show the n8n hiring banner in the console (true) or not (false). |
| `N8N_PUBLIC_API_SWAGGERUI_DISABLED` | Boolean | `false` | Whether the Swagger UI (API playground) is disabled (true) or not (false). |
| `N8N_PUBLIC_API_DISABLED` | Boolean | `false` | Whether to disable the public API (true) or not (false). |
| `N8N_PUBLIC_API_ENDPOINT` | String | `api` | Path for the public API endpoints. |
| `N8N_GRACEFUL_SHUTDOWN_TIMEOUT` | Number | `30` | How long should the n8n process wait (in seconds) for components to shut down before exiting the process. |