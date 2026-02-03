---
title: Chroma credentials
description: Documentation for the Chroma credentials. Use these credentials to authenticate Chroma in n8n, a workflow automation platform.
contentType: [integration, reference]
priority: medium
---

# Chroma credentials

You can use these credentials to authenticate the following nodes:

- Chroma Vector Store 

## Prerequisites 
Create and run [Chroma](https://www.trychroma.com/home) instance. Refer to the [Running Chroma in Client-Server Mode](https://docs.trychroma.com/docs/run-chroma/client-server) for more information

## Supported authentication methods
- API key
- Instance URL

## Related resources

Refer to [Chroma's documentation](https://docs.trychroma.com/docs/overview/getting-started) for more information about the service. Also refer to [Chroma Cloud](https://docs.trychroma.com/cloud/getting-started) for using cloud instance.

View n8n's [Advanced AI](/advanced-ai/) documentation.

## Using API key

To configure this credential, you'll need a  [Chroma](https://www.trychroma.com/) account. You'll also need the following:

- An **API Key**
- Your **Tenant ID**
- Your **Database Name**

To set it up:

1. Go to the **Cloud Dashboard**.
2. Create a **Database**
3. Click **Settings** for the database you want the access to.
4. Click **Create API key and copy code**
5. Enter your **API Key**, **Tenant ID** and **Database Name** to n8n credential
## Using Instance URL

To configure this credential, you'll need:

- **Base URL:** The base URL of your Chroma instance. The default value is `http://localhost:8000`