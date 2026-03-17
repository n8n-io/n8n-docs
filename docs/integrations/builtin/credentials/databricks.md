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

## Related resources

Refer to [Databricks' authentication documentation](https://docs.databricks.com/api/authentication) for more information about the service.

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
