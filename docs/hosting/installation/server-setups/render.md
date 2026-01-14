---
contentType: tutorial
---

# Hosting n8n on Render

This hosting guide shows you how to self-host n8n on [Render](https://render.com). Render is a cloud platform that provides:

* Automatic SSL/TLS certificates
* Docker-based deployments
* PostgreSQL database hosting
* Automatic deployments from Git repositories
* Free tier available for testing

--8<-- "_snippets/self-hosting/warning.md"

--8<-- "_snippets/self-hosting/installation/latest-next-version.md"

## Use the deployment template to create a Render project

The quickest way to get started with deploying n8n to Render is using the **Deploy to Render** button:

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/n8n-io/n8n-render/tree/main)

This opens the Render dashboard where you can configure and deploy your n8n instance. The deployment template includes:

* A pre-configured Dockerfile for n8n
* A `render.yaml` blueprint that sets up the web service and PostgreSQL database
* Default environment variable configuration

/// note | Repository availability
The deployment template requires a repository with a `render.yaml` blueprint file. If the repository is not yet available, you can follow the manual setup steps below.
///

### Configure environment variables

After clicking the deploy button, Render will prompt you to configure environment variables. You must set the following:

* **N8N_ENCRYPTION_KEY**, which n8n uses to [encrypt user account details](/hosting/configuration/environment-variables/deployment.md) before saving to the database. Generate one using:
  ```shell
  openssl rand -base64 32
  ```

* **WEBHOOK_URL** should match your Render service URL to ensure that webhooks have the correct URL.

### Deploy n8n

After configuring the environment variables, click **Apply** to start the deployment.

Render will automatically:
* Create a PostgreSQL database
* Build and deploy the n8n web service
* Provision SSL certificates
* Set up the service URL

Once deployed, you can access n8n at your Render service URL.

/// note | Custom domain
Refer to the [Custom domain setup](#set-up-a-custom-domain-optional) section below to connect your own domain to the Render service.
///

## Manual setup

If you prefer to set up n8n on Render manually, or if the deployment template is not available, follow these steps:

### Prerequisites

Before you begin, ensure you have:

* A [Render account](https://dashboard.render.com/register)
* A GitHub, GitLab, or Bitbucket account (for connecting your repository)
* A Git repository with your n8n configuration (or create one during setup)

### Create a PostgreSQL database

n8n requires a PostgreSQL database to store workflow data and user information.

1. Log in to your [Render Dashboard](https://dashboard.render.com/).
2. Click **New +** and select **PostgreSQL**.
3. Configure your database:
   - **Name**: Choose a name for your database (e.g., `n8n-db`)
   - **Database**: Leave as default or specify a custom database name
   - **User**: Leave as default or specify a custom username
   - **Region**: Select the region closest to your users
   - **PostgreSQL Version**: Use the latest stable version
   - **Plan**: Choose a plan that fits your needs (Free tier available for testing)
4. Click **Create Database**.

/// note | Database credentials
Render automatically generates database credentials. Save the **Internal Database URL** and **External Database URL** from the database dashboard. You'll need these when configuring your n8n service.
///

### Create a Web Service

1. In your Render Dashboard, click **New +** and select **Web Service**.
2. Connect your repository:
   - If you have a repository with n8n configuration, connect it
   - If you don't have a repository yet, you can create a new one or use Render's blueprint feature
3. Configure your service:
   - **Name**: Choose a name for your service (e.g., `n8n`)
   - **Region**: Select the same region as your database for best performance
   - **Branch**: Select the branch to deploy from (usually `main` or `master`)
   - **Root Directory**: Leave empty unless your Dockerfile is in a subdirectory
   - **Runtime**: Select **Docker**
   - **Dockerfile Path**: Specify the path to your Dockerfile (default: `./Dockerfile`)
   - **Docker Context**: Leave as default unless your Dockerfile is in a subdirectory

### Create a Dockerfile

If you don't have a Dockerfile in your repository, create one. Here's a basic example:

```dockerfile title="Dockerfile"
FROM docker.n8n.io/n8nio/n8n:latest

# Expose the port n8n runs on
EXPOSE 5678

# Set the command to run n8n
CMD ["n8n", "start"]
```

/// note | Using a specific n8n version
To use a specific version of n8n, replace `latest` with the version tag (e.g., `docker.n8n.io/n8nio/n8n:1.0.0`).
///

### Configure environment variables

In your Render service settings, navigate to **Environment** and add the following environment variables:

### Required variables

* **N8N_ENCRYPTION_KEY**: A random string used to encrypt sensitive data. Generate one using:
  ```shell
  openssl rand -base64 32
  ```
  Or use an online generator. **Keep this secure and don't share it.**

* **DB_TYPE**: Set to `postgresdb`

* **DB_POSTGRESDB_HOST**: Use the **Internal Database URL** hostname from your PostgreSQL service (for same-region services) or the **External Database URL** hostname (for cross-region access)

* **DB_POSTGRESDB_PORT**: Usually `5432` for PostgreSQL

* **DB_POSTGRESDB_DATABASE**: The database name from your PostgreSQL service

* **DB_POSTGRESDB_USER**: The username from your PostgreSQL service

* **DB_POSTGRESDB_PASSWORD**: The password from your PostgreSQL service

* **N8N_HOST**: Your Render service URL (e.g., `n8n.onrender.com` or your custom domain)

* **N8N_PORT**: Set to `5678`

* **N8N_PROTOCOL**: Set to `https`

* **WEBHOOK_URL**: Your full webhook URL (e.g., `https://n8n.onrender.com/` or `https://your-custom-domain.com/`)

### Optional but recommended variables

* **NODE_ENV**: Set to `production`

* **GENERIC_TIMEZONE**: Your timezone (e.g., `America/New_York`, `Europe/Berlin`)

* **TZ**: Same as `GENERIC_TIMEZONE`

* **N8N_BASIC_AUTH_ACTIVE**: Set to `true` to enable basic authentication

* **N8N_BASIC_AUTH_USER**: Your username for basic authentication

* **N8N_BASIC_AUTH_PASSWORD**: Your password for basic authentication

/// note | Using Internal Database URL
For best performance and security, use the **Internal Database URL** when your database and web service are in the same region. Render services in the same region can communicate over a private network.
///

/// warning | Security
Always enable basic authentication or set up proper user management in production. Never expose n8n without authentication.
///

### Configure the service

1. In your service settings, go to **Settings**.
2. Set the **Health Check Path** to `/healthz` (n8n's health check endpoint).
3. Configure **Auto-Deploy**: Enable if you want automatic deployments on git push.
4. Set **Pull Request Previews**: Configure if you want to preview deployments from pull requests.

### Deploy

1. After configuring all settings, Render will automatically start building and deploying your service.
2. Monitor the build logs in the **Logs** tab to ensure the deployment succeeds.
3. Once deployed, your service will be available at `https://<your-service-name>.onrender.com`.

### Set up a custom domain (optional)

1. In your service settings, go to **Settings** > **Custom Domains**.
2. Click **Add Custom Domain**.
3. Enter your domain name (e.g., `n8n.example.com`).
4. Follow Render's instructions to add the required DNS records:
   - Add a CNAME record pointing to your Render service URL
   - Or add an A record if using a root domain
5. Render will automatically provision an SSL certificate for your custom domain.

After setting up a custom domain, update your environment variables:
- **N8N_HOST**: Update to your custom domain
- **WEBHOOK_URL**: Update to your custom domain URL

### Updating n8n

To update n8n to a newer version:

1. Update the Docker image tag in your Dockerfile (if using a specific version).
2. Commit and push the changes to your repository.
3. Render will automatically detect the changes and redeploy (if auto-deploy is enabled).
4. Or manually trigger a deploy from the Render dashboard.

/// note | Using latest tag
If you're using the `latest` tag in your Dockerfile, Render will pull the latest image on each deployment. To pin to a specific version, use a version tag instead.
///

### Troubleshooting

### Service won't start

* Check the **Logs** tab in your Render dashboard for error messages.
* Verify all required environment variables are set correctly.
* Ensure your database credentials are correct and the database is accessible.

### Database connection issues

* Verify you're using the correct database URL (Internal vs External).
* Check that your database and web service are in the same region for best performance.
* Ensure your database is running and not paused (free tier databases pause after inactivity).

### Webhooks not working

* Verify your `WEBHOOK_URL` environment variable is set correctly.
* Ensure the URL uses `https://` protocol.
* Check that your service is publicly accessible (not in a private network).

## Next steps

--8<-- "_snippets/self-hosting/installation/server-setups-next-steps.md"
