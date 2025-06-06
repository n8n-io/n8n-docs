---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: tutorial
---

# Hosting n8n on Sealos

This hosting guide shows you how to self-host n8n on Sealos. It uses:

- [Kubernetes](https://kubernetes.io/){:target="_blank" .external-link} to create and define the application components and how they work together.
- [Sealos's PostgreSQL service](https://sealos.io/docs/guides/databases/postgresql){:target="_blank" .external-link} to host n8n's data storage.
- A **Deploy on Sealos** button offering a one click, with minor configuration, deployment.

--8<-- "_snippets/self-hosting/warning.md"

--8<-- "_snippets/self-hosting/installation/latest-next-version.md"


## Use the Sealos App Store to deploy n8n

The quickest way to get started with deploying n8n to Sealos is using the **Deploy on Sealos** button:

[![Deploy](https://sealos.io/Deploy-on-Sealos.svg)](https://template.sealos.io/deploy?templateName=n8n)

Then, click "Deploy on Sealos" in the top right corner. 

> If this is your first time using [Sealos](https://sealos.io/), you'll need to register and log in to your Sealos public cloud account. After logging in, you'll be immediately redirected to the template deployment page.

### Configure environment variables

Sealos pre-fills the configuration options with environment variables, You can change any of these values or add any new values to suit your needs. 

Refer to [Environment variables](/hosting/configuration/environment-variables/index.md) for n8n environment variables details.

### Deploy n8n

Follow the instructions below.

1. Click "Deploy App" in the top right to start the deployment.
2. Wait for the deployment to complete.
3. Once completed, click the application's "Details" to enter the application management page.
4. Access your n8n instance using the provided public URL.

## Custom Domain Setup

Sealos supports custom domains for your n8n instance:

1. Click "Update" top-right on the app details page.
2. click "Custom Domain".
3. Enter your domain name and configure DNS settings.
4. Update your `WEBHOOK_URL` environment variable to match the new domain.

## Next steps

--8<-- "_snippets/self-hosting/installation/server-setups-next-steps.md"
