---
title: Databricks credentials
description: >-
  Documentation for Databricks credentials. Use these credentials to
  authenticate Databricks in n8n, a workflow automation platform.
contentType:
  - integration
  - reference
nodeTitle: Databricks credentials
originalFilePath: integrations/builtin/credentials/databricks.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/credentials/databricks'
url: 'https://docs.n8n.io/integrations/builtin/credentials/databricks'
layout:
  description:
    visible: false
---

# Databricks credentials <a href="#databricks-credentials" id="databricks-credentials"></a>

You can use these credentials to authenticate the following nodes:

- [Databricks](../app-nodes/n8n-nodes-base.databricks.md)

## Prerequisites <a href="#prerequisites" id="prerequisites"></a>

- A [Databricks](https://www.databricks.com/) workspace on AWS, Azure, or GCP.
- For OAuth2 with user login: a Databricks account admin who can create a custom OAuth app connection in the account console.
- For OAuth2 with a service principal: a Databricks admin who can create a service principal and generate an OAuth secret for it.
- The [privileges](#required-databricks-privileges) the authenticating identity needs for the operations you want to run.

## Supported authentication methods <a href="#supported-authentication-methods" id="supported-authentication-methods"></a>

- [Personal access token](#using-a-personal-access-token): a token tied to one Databricks user.
- [OAuth2 with user login](#using-oauth2-with-user-login): the credential is connected by signing in to a Databricks account in the browser. Operations run with that user's permissions and appear in Databricks audit logs under their identity. Each user can create their own credential to run workflows under their own account. Databricks recommends this for attended, interactive use.
- [OAuth2 with a service principal](#using-oauth2-service-principal): n8n authenticates as a service principal with a client ID and secret, without user interaction. Databricks recommends this for unattended scenarios, such as fully automated production workflows.

## Required Databricks privileges

The identity the credential authenticates as (the signed-in user or the service principal) needs these privileges in Databricks, depending on the operations you run:

| Operations | Required privileges |
|------------|--------------------|
| All | The **Workspace access** entitlement |
| Databricks SQL (Execute Query) | The **Databricks SQL access** entitlement and **CAN USE** on the SQL warehouse |
| Reading or writing Unity Catalog data | **USE CATALOG** on the catalog, **USE SCHEMA** on the schema, and **SELECT** on the tables or views you query. Functions and models also need **EXECUTE** |
| Genie | **CAN RUN** on the Genie space and **CAN USE** on its SQL warehouse |
| Model Serving (Query Endpoint) | **CAN QUERY** on the serving endpoint |

{% hint style="info" %}
**New service principals start with no privileges**

A freshly created service principal has no grants, so its first operations fail with permission errors that name the missing grant. Assign the privileges above before running workflows.
{% endhint %}

Refer to [Databricks entitlements](https://docs.databricks.com/aws/en/security/auth/entitlements), [Access control lists](https://docs.databricks.com/aws/en/security/auth/access-control/), and [Unity Catalog privileges](https://docs.databricks.com/aws/en/data-governance/unity-catalog/manage-privileges/privileges) for more information.

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [Databricks' authentication documentation](https://docs.databricks.com/aws/en/dev-tools/auth/) for more information about the service.

## Using a personal access token <a href="#using-a-personal-access-token" id="using-a-personal-access-token"></a>

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

{% hint style="info" %}
**Token format**

Personal access tokens start with `dapi`, for example `dapi1234abcd5678efgh`.
{% endhint %}

Refer to [Databricks personal access token authentication](https://docs.databricks.com/en/dev-tools/auth/pat.html) for more information.

## Using OAuth2 with user login

This method uses the Databricks OAuth user-to-machine (U2M) flow. You connect the credential by signing in to Databricks in your browser, and operations run with your permissions. A shared credential runs as the user who connected it, so create separate credentials for separate identities.

To configure this credential, you'll need:

- A **Host**: The URL of your Databricks workspace (for example, `https://adb-1234567890123456.7.azuredatabricks.net`).
- A **Client ID** and **Client Secret**: From a custom OAuth app connection a Databricks account admin creates in the account console.

There are three steps to setting up this credential:

1. [Create a custom OAuth app connection in Databricks](#create-a-custom-oauth-app-connection).
2. Optionally [configure token lifetimes](#configure-token-lifetimes).
3. [Set up the credential in n8n](#set-up-the-credential-in-n8n).

{% hint style="info" %}
**Account console access required**

Creating a custom OAuth app connection requires the Databricks account console. Databricks Free Edition doesn't include account console access, so on Free Edition workspaces use a [service principal](#using-oauth2-service-principal) or a [personal access token](#using-a-personal-access-token) instead.
{% endhint %}

### Create a custom OAuth app connection

A Databricks account admin needs to complete these steps:

1. In n8n, open the Databricks credential and copy the **OAuth Redirect URL** (it has the form `https://<your-n8n-instance>/rest/oauth2-credential/callback`).
2. Log in to the Databricks account console for your cloud ([AWS](https://accounts.cloud.databricks.com/), [Azure](https://accounts.azuredatabricks.net/), or [GCP](https://accounts.gcp.databricks.com/)) and select the **Settings** icon in the sidebar.
3. On the **App connections** tab, select **Add connection**.
4. Enter a name for the connection, for example `n8n`.
5. Add the **OAuth Redirect URL** you copied from n8n as a redirect URL.
6. For the access scopes, select **All APIs**. Databricks automatically allows the `offline_access` scope that n8n needs to stay connected.
7. Enable client secret generation. n8n is a confidential client, so it needs a secret.
8. Save the connection, then copy the **Client ID** and **Client Secret**. Databricks shows the secret only once.

Share the client ID and secret with the n8n users who'll create credentials. All users reuse the same OAuth app connection, but each user creates and connects their own n8n credential to run with their own identity.

Refer to [Enable or disable partner OAuth applications](https://docs.databricks.com/aws/en/integrations/enable-disable-oauth) for more information.

### Configure token lifetimes

The app connection's token access policy controls how long a user's connection to n8n stays valid:

- **Access token TTL**: How long each access token lasts. Defaults to 60 minutes. n8n renews expired access tokens automatically using the refresh token, so you can keep the default.
- **Refresh token TTL**: How long the refresh token lasts. Defaults to 10080 minutes (7 days), with a maximum of 129600 minutes (90 days). When the refresh token expires, the credential stops working until the user opens it in n8n and signs in again.

Databricks account admins can also set an absolute session lifetime and single-use refresh tokens through the [account API or CLI](https://docs.databricks.com/aws/en/integrations/manage-oauth). An absolute session lifetime ends the session when it's reached, even if the refresh token is still valid.

{% hint style="warning" %}
**Short lifetimes force users to reconnect**

A short refresh token TTL or absolute session lifetime means users must periodically re-open the credential in n8n and sign in again, and workflows using the credential fail in the meantime. For credentials that run scheduled workflows, set generous lifetimes or use a [service principal](#using-oauth2-service-principal) instead.
{% endhint %}

### Set up the credential in n8n

1. Enter your workspace URL as the **Host**.
2. Set **Grant Type** to **Authorization Code (User)**.
3. Enter the **Client ID** and **Client Secret** from the custom OAuth app connection.
4. Select **Connect my account** and sign in with your Databricks account.

By default the credential requests the `all-apis` and `offline_access` scopes. The `offline_access` scope keeps the connection alive past one hour, so it's always included: if you enable **Custom Scopes** and remove it from the list, n8n adds it back automatically.

## Using OAuth2 (service principal) <a href="#using-oauth2-service-principal" id="using-oauth2-service-principal"></a>

This method uses a Databricks service principal with the OAuth M2M (machine-to-machine) flow. It's the recommended approach for automated workflows as it doesn't require user interaction.

To configure this credential, you'll need:

- A **Host**: The URL of your Databricks workspace (for example, `https://adb-1234567890123456.7.azuredatabricks.net`).
- A **Client ID**: The application ID of your service principal.
- A **Client Secret**: An OAuth secret generated for the service principal.

There are two steps to setting up this credential:

1. [Create a service principal and OAuth secret in Databricks](#create-a-service-principal-and-oauth-secret).
2. [Set up the credential in n8n](#set-up-the-oauth2-credential).

### Create a service principal and OAuth secret <a href="#create-a-service-principal-and-oauth-secret" id="create-a-service-principal-and-oauth-secret"></a>

1. In the Databricks account console, select **User management**.
2. Select **Service principals**, then select **Add service principal**.
3. Enter a name for the service principal and select **Add**.
4. Open the service principal, go to the **Configuration** tab, and grant it the workspace entitlements it needs.
5. Go to the **Secrets** tab and select **Generate secret**.
6. Set the secret's lifetime in days (maximum 730 days), then select **Generate**.
7. Copy the displayed **Secret** and **Client ID** (the same as the application ID). The secret is shown only once.

{% hint style="info" %}
**Workspace assignment**

The service principal must be assigned to the workspace it will access. Go to the **Permissions** tab and grant the required users or groups access to manage and use the service principal.
{% endhint %}

{% hint style="warning" %}
**OAuth secrets expire**

Service principal secrets have a maximum lifetime of 730 days. When the secret expires, the credential stops working and workflows using it fail. Track the expiry date, generate a new secret before it's reached, and update the **Client Secret** in your n8n credential.
{% endhint %}

Refer to [Authorize service principal access to Databricks with OAuth](https://docs.databricks.com/en/dev-tools/auth/oauth-m2m.html) for more information.

### Set up the OAuth2 credential <a href="#set-up-the-oauth2-credential" id="set-up-the-oauth2-credential"></a>

In your n8n credential:

1. Set **Authentication** to **OAuth2**.
2. Enter your workspace URL as the **Host**.
3. Set **Grant Type** to **Client Credentials (Service Principal)**. This is the default.
4. Enter the **Client ID** you copied from the service principal.
5. Enter the **Client Secret** you generated.
