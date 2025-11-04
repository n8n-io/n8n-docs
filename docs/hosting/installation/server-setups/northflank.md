---
contentType: tutorial
---

# Hosting n8n on Northflank

## Requirements

- A [Northflank account](https://app.northflank.com/signup)

This guide shows you how to self-host n8n on [Northflank](https://northflank.com/). Your deployment will include:


- A Deployment Service running the official n8n Docker image.
- A managed PostgreSQL database for storing n8n data.
- Environment variables to configure n8n for production use.

--8<-- "_snippets/self-hosting/warning.md"

--8<-- "_snippets/self-hosting/installation/latest-next-version.md"

## Deploy n8n using the Northflank one-click template

The quickest way to deploy n8n on Northflank is by using the **one-click template**:

[![Deploy on Northflank](https://assets.northflank.com/deploy_to_northflank_smm_36700fb050.svg)](https://northflank.com/stacks/deploy-n8n)

Clicking the button opens the n8n template on Northflank. The template automatically creates a project, provisions required resources including PostgreSQL, and deploys n8n.

### Optional: Configure environment variables

Northflank automatically sets default environment variables. Key variables you may need to configure:

- **N8N_ENCRYPTION_KEY** — which n8n uses to [encrypt user account details](/hosting/configuration/environment-variables/deployment.md). By default, Northflank generates it automatically using randomSecret(32).

Other defaults include:

- `DB_TYPE=postgresdb`  
- `N8N_RUNNERS_ENABLED=true`   

You can modify or add environment variables via the Northflank dashboard under **Secrets**.

### Wait for deployment to complete

Northflank automatically builds, deploys, and starts n8n. Once the service status shows **Running**, your instance is live.

### Access your n8n instance

Your deployment will have a public URL provided by Northflank, e.g.: `https://p01--n8n-service--xyz123.code.run`

## Optional: Customize your deployment

You can further customize your deployment by:

- Adding additional environment variables or secrets.  
- Changing resource allocation (CPU, memory) from the Northflank dashboard.  
- Selecting a specific n8n version.

## Next steps

--8<-- "_snippets/self-hosting/installation/server-setups-next-steps.md"
