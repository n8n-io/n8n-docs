---
title: Databricks credentials
description: Documentation for Databricks credentials. Use these credentials to authenticate Databricks in n8n, a workflow automation platform.
contentType: [integration, reference]
---

# Databricks credentials

You can use these credentials to authenticate the following nodes:

- [Databricks](/integrations/builtin/app-nodes/n8n-nodes-base.databricks.md)

## Prerequisites

- A [Databricks](https://www.databricks.com/) workspace on AWS, Azure, or GCP.
- A Databricks user account with sufficient permissions for the operations you want to perform.

## Supported authentication methods

- Personal access token
- OAuth2 (service principal)

## Related resources

Refer to [Databricks' authentication documentation](https://docs.databricks.com/aws/en/dev-tools/auth/) for more information about the service.

## Using a personal access token

To configure this credential, you'll need:

- A **Host**: The URL of your Databricks workspace (for example, `https://adb-1234567890123456.7.azuredatabricks.net`).
- A **Access Token**: A personal access token generated in your Databricks workspace.

To generate a personal access token:

1. In your Databricks workspace, select your username in the top right corner, then select **Settings**.
2. Select **Developer**.
3. Next to **Access tokens**, select **Manage**.
4. Select **Generate new token**.
5. Optionally enter a **Comment** to identify the token, then select **Generate**.
6. Copy the token and save it somewhere safe. You won't be able to view the token again after closing this dialog.
7. Enter the token as the **Access Token** in your n8n credential.

/// note | Token format
Personal access tokens start with `dapi`, for example `dapi1234abcd5678efgh`.
///

Refer to [Databricks personal access token authentication](https://docs.databricks.com/en/dev-tools/auth/pat.html) for more information.

## Using OAuth2 (service principal)

This method uses a Databricks service principal with the OAuth M2M (machine-to-machine) flow. It's the recommended approach for automated workflows as it doesn't require user interaction.

To configure this credential, you'll need:

- A **Host**: The URL of your Databricks workspace (for example, `https://adb-1234567890123456.7.azuredatabricks.net`).
- A **Client ID**: The application ID of your service principal.
- A **Client Secret**: An OAuth secret generated for the service principal.

There are two steps to setting up this credential:

1. [Create a service principal and OAuth secret in Databricks](#create-a-service-principal-and-oauth-secret).
2. [Set up the credential in n8n](#set-up-the-oauth2-credential).

### Create a service principal and OAuth secret

1. In the Databricks account console, select **User management**.
2. Select **Service principals**, then select **Add service principal**.
3. Enter a name for the service principal and select **Add**.
4. Open the service principal, go to the **Configuration** tab, and grant it the workspace entitlements it needs.
5. Go to the **Secrets** tab and select **Generate secret**.
6. Set the secret's lifetime in days (maximum 730 days), then select **Generate**.
7. Copy the displayed **Secret** and **Client ID** (the same as the application ID). The secret is shown only once.

/// note | Workspace assignment
The service principal must be assigned to the workspace it will access. Go to the **Permissions** tab and grant the required users or groups access to manage and use the service principal.
///

Refer to [Authorize service principal access to Databricks with OAuth](https://docs.databricks.com/en/dev-tools/auth/oauth-m2m.html) for more information.

### Set up the OAuth2 credential

In your n8n credential:

1. Set **Authentication** to **OAuth2**.
2. Enter your workspace URL as the **Host**.
3. Enter the **Client ID** you copied from the service principal.
4. Enter the **Client Secret** you generated.
