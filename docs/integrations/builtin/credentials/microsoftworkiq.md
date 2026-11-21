---
title: Microsoft Work IQ credentials
description: >-
  Documentation for Microsoft Work IQ credentials. Use these credentials to
  connect an n8n agent to the Work IQ MCP server.
layout:
  description:
    visible: false
---

# Microsoft Work IQ credentials

You can use these credentials to connect an AI agent to the **Work IQ MCP** server in n8n's [MCP servers](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/integrate-ai/mcp-servers) registry. [Work IQ MCP](https://learn.microsoft.com/en-us/microsoft-365/copilot/extensibility/work-iq/mcp/overview) gives agents access to Microsoft 365 mail, calendar, Teams, files, and Copilot through one MCP endpoint.

## Prerequisites

* A Microsoft 365 work or school account. Personal Microsoft accounts can't use Work IQ.
* A Microsoft administrator has [enabled Work IQ in your organization](https://learn.microsoft.com/en-us/microsoft-365/copilot/extensibility/work-iq/enable-work-iq).
* A Microsoft Entra app registration with the Work IQ permissions you need, and admin consent for each of them. Refer to [Set up the app registration](#set-up-the-app-registration).

## Supported authentication methods

* OAuth2

## Related resources

Refer to Microsoft's [Work IQ MCP overview](https://learn.microsoft.com/en-us/microsoft-365/copilot/extensibility/work-iq/mcp/overview) and [Work IQ API permissions reference](https://learn.microsoft.com/en-us/microsoft-365/copilot/extensibility/work-iq/permissions) for more information about the service.

## Using OAuth2

To configure this credential, you'll need:

* A **Tenant ID**
* A **Client ID**
* A **Client Secret**, or a certificate
* An **Access Level**

### Set up the app registration

1. Open the [Microsoft Application Registration Portal](https://aka.ms/appregistrations) and select **New registration**.
2. Enter a **Name** for your app.
3. In **Supported account types**, select **Accounts in any organizational directory** for a multi-tenant app, or **Accounts in this organizational directory only** for a single-tenant app. Don't include personal Microsoft accounts: they can't use Work IQ.
4. In **Redirect URI**, select **Web** and paste the **OAuth Redirect URL** from your n8n credential.
5. Select **Register**.
6. Copy the **Application (client) ID** and enter it in n8n as the **Client ID**.
7. Go to **API permissions** > **Add a permission** > **APIs my organization uses**, search for **Work IQ**, and select **Delegated permissions**.
8. Select the permissions for the access level you want. Refer to [Access level](#access-level).
9. Select **Add permissions**.
10. Select **Grant admin consent** for your tenant. Each Work IQ permission needs admin consent.
11. Create a client secret and enter it in n8n as the **Client Secret**. Refer to [Generate a client secret](microsoft.md#generate-a-client-secret). To use a certificate instead, refer to [Authenticate with a certificate](microsoft.md#authenticate-with-a-certificate).

If **Work IQ** doesn't appear in **APIs my organization uses**, the Work IQ service principal may not exist in your tenant yet. Refer to [Enable Work IQ](https://learn.microsoft.com/en-us/microsoft-365/copilot/extensibility/work-iq/enable-work-iq).

### Tenant ID

Enter your Microsoft Entra tenant ID (a GUID) or a verified domain, such as `contoso.onmicrosoft.com`. Find it in the [Microsoft Entra admin center](https://entra.microsoft.com/) under **Overview**.

Keep the default, `organizations`, for a multi-tenant app registration. Use your tenant ID or domain for a single-tenant app registration.

### Access level

The **Access Level** decides which Work IQ permissions n8n requests when you sign in:

| Access Level | Permissions requested | What the agent can do |
| --- | --- | --- |
| **Agent Only** (default) | `WorkIQAgent.Ask` | Ask Work IQ agents questions. |
| **Agent Plus Direct Read** | `WorkIQAgent.Ask` and `WorkIQ.Read` | Also read Microsoft 365 data directly. |
| **Agent Plus Direct Changes** | `WorkIQAgent.Ask` and `WorkIQ.Act` | Also read and change Microsoft 365 data directly. |

n8n also requests `offline_access`, so the credential can refresh its token.

The app registration needs admin consent for every permission the access level requests. If one is missing, sign-in fails with the error `AADSTS65001`. To fix it, add the missing permission to the app registration and grant admin consent, or choose a lower access level.

{% hint style="warning" %}
**Asking a Work IQ agent isn't read-only**

Microsoft documents `WorkIQAgent.Ask`, which every access level requests, as including read and write access to the Microsoft 365 resources a Work IQ agent can reach.
{% endhint %}
