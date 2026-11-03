---
description: Configure Microsoft Dataverse credentials in n8n for delegated user access or app-only access with Microsoft Entra ID.
layout:
  description:
    visible: false
---

# Microsoft Dataverse credentials

You can use the **Microsoft Dataverse OAuth2 API** credential to authenticate the [Microsoft Dataverse node](../app-nodes/n8n-nodes-base.microsoftdataverse.md).

## Prerequisites

* A Microsoft Dataverse environment and its environment URL.
* A Microsoft Entra ID app registration, or permission to create one.
* Permission to configure API consent for delegated access, or an administrator who can grant consent.
* A Dataverse user with suitable security roles for delegated access, or an administrator who can create an application user for app-only access.

Use a security role with only the table privileges your workflows need. Authentication doesn't grant permission to read or change every table.

## Supported authentication methods

The credential supports OAuth2 with two **Grant Type** options:

| Grant type | Access | Requirements |
| --- | --- | --- |
| **Authorization Code** (default) | Act as a signed-in user. n8n uses refresh tokens to renew access. | A web redirect URI, delegated Dataverse permission, and a user with access to the environment. |
| **Client Credentials** | Act as the application without a signed-in user. n8n acquires new access tokens when needed. | A specific tenant ID and a Dataverse application user with a security role. No interactive sign-in or redirect URI is required. |

The setup below uses **Client Secret** authentication. The credential also inherits **Certificate** authentication from the Microsoft OAuth2 credential. Refer to [Authenticate with a certificate](microsoft.md#authenticate-with-a-certificate) to configure a private key and certificate instead of a client secret.

## Configure the credential

Create a **Microsoft Dataverse OAuth2 API** credential in n8n. Register an app and configure the grant type you plan to use before connecting or saving the completed credential.

### Register an application

1. Open the [Microsoft Entra admin center](https://entra.microsoft.com/) and go to **App registrations** > **New registration**.
2. Enter a name, such as `n8n Dataverse`.
3. Select the supported account type for your organization. For access within one tenant, select **Accounts in this organizational directory only**.
4. If you plan to use **Authorization Code**, copy the **OAuth Redirect URL** from the n8n credential editor. Under **Redirect URI**, choose **Web** and paste the URL exactly as shown. For **Client Credentials**, leave the redirect URI empty.
5. Select **Register**.
6. From the app's **Overview**, copy **Application (client) ID** into n8n's **Client ID**, and **Directory (tenant) ID** into n8n's **Tenant ID**.

For an existing app, add the n8n redirect URL under the app registration's **Authentication** settings as a **Web** redirect URI.

### Generate a client secret

1. In the app registration, open **Certificates & secrets** > **Client secrets**.
2. Select **New client secret**, enter a description, and choose an expiry that meets your organization's policy.
3. Select **Add** and copy the secret's **Value**, not its **Secret ID**. Microsoft displays the value only once.
4. In n8n, set **Authentication** to **Client Secret** and paste the value into **Client Secret**.

Store the secret in the n8n credential, not in workflow fields. When you rotate the secret, update the credential before the old secret expires.

### Set the environment and tenant

Complete these fields in the n8n credential:

| n8n field | Value |
| --- | --- |
| **Grant Type** | **Authorization Code** for user access, or **Client Credentials** for app-only access. |
| **Client ID** | **Application (client) ID** from the Entra app registration. |
| **Client Secret** | The secret's **Value**, when using **Client Secret** authentication. |
| **Tenant ID** | **Directory (tenant) ID** from the app registration. Use the tenant GUID for **Client Credentials**. |
| **Environment URL** | The environment's HTTPS base URL, such as `https://contoso.crm.dynamics.com`. Don't append `/api/data/v9.2`, a table name, or an application path. |
| **National Cloud** | The Microsoft cloud hosting your Dataverse environment. The default is **Global (Public Cloud)**. |

Find the environment URL in the [Power Platform admin center](https://admin.powerplatform.microsoft.com/) under your environment's details. The credential accepts a trailing slash and removes it when building scopes and requests.

For **Authorization Code**, **Tenant ID** also accepts a verified tenant domain. The default value, `common`, is for multi-tenant Authorization Code apps. Replace it with a specific tenant GUID or domain for a single-tenant app. Don't use `common` for **Client Credentials**.

### Configure delegated user access

To use **Authorization Code**:

1. In the Entra app registration, go to **API permissions** > **Add a permission**.
2. Select **Dynamics CRM** > **Delegated permissions** and select **user_impersonation**. This is the **Access Dynamics 365 as organization users** permission.
3. Select **Add permissions**. Ask an administrator to grant consent if your tenant requires it.
4. Make sure the user who signs in has access to the Dataverse environment and a security role with the required table privileges.
5. In n8n, set **Grant Type** to **Authorization Code** and confirm that the app's **Web** redirect URI matches the credential editor's **OAuth Redirect URL**.
6. Select **Connect my account**, sign in, and accept the requested access or complete your organization's approval process.
7. Save the credential.

Refer to Microsoft's [Dataverse OAuth documentation](https://learn.microsoft.com/en-us/power-apps/developer/data-platform/authenticate-oauth) for delegated permission requirements.

### Configure app-only access

To use **Client Credentials**, create an application user in the target Dataverse environment:

1. In the [Power Platform admin center](https://admin.powerplatform.microsoft.com/), go to **Manage** > **Environments** and select your environment.
2. Open **Settings** > **Users + permissions** > **Application users**.
3. Select **New app user**, then **Add an app**. Find the Entra app registration using its application ID and select **Add**.
4. Select the appropriate **Business Unit**, enter an email address if requested, and assign security roles with the privileges the workflow needs.
5. Select **Create** to create the application user.
6. In n8n, set **Grant Type** to **Client Credentials**. Enter the tenant GUID in **Tenant ID**, and confirm the app credentials, **Environment URL**, and **National Cloud**.
7. Save the credential. This flow doesn't have an interactive account connection step.

App-only Dataverse access uses the application user's security roles. It doesn't require the delegated `user_impersonation` permission or Microsoft Graph permissions. Refer to Microsoft's [application user setup](https://learn.microsoft.com/en-us/power-platform/admin/manage-application-users#create-an-application-user) for details.

{% hint style="info" %}
**Credential test**

When you save the credential, n8n tests it with `GET /api/data/v9.2/WhoAmI` against the configured environment. Getting an access token alone doesn't prove that an application user exists or has access to Dataverse. A successful credential test also doesn't guarantee permission for every table operation.
{% endhint %}

## National clouds and scopes

**National Cloud** controls the Microsoft Entra login host. Select the cloud that matches your environment:

| National cloud | Login host |
| --- | --- |
| **Global (Public Cloud)** | `https://login.microsoftonline.com` |
| **US Government (GCC High)** | `https://login.microsoftonline.us` |
| **US Government (DoD)** | `https://login.microsoftonline.us` |
| **China (21Vianet)** | `https://login.partner.microsoftonline.cn` |

The credential builds the authorization and token URLs from **National Cloud** and **Tenant ID**. It builds the scope from **Environment URL**:

* **Authorization Code**: `<environment-url>/.default offline_access`
* **Client Credentials**: `<environment-url>/.default`

For example, the Authorization Code scope for `https://contoso.crm.dynamics.com` is `https://contoso.crm.dynamics.com/.default offline_access`.

You don't need to enter these URLs or scopes manually. The node calls the Dataverse environment, not Microsoft Graph, so the credential hides the Microsoft Graph base URL field.

## Common issues

### Redirect URI mismatch

Copy the **OAuth Redirect URL** from n8n and register that exact URL as a **Web** redirect URI in Entra. Check the scheme, host, port, and path. Don't substitute the Dataverse environment URL. Redirect URIs apply to **Authorization Code**, not **Client Credentials**.

### Admin approval required

Ask an Entra administrator to review and grant the requested delegated Dataverse permission. Then reconnect the credential. Entra consent and Dataverse security roles are separate requirements: consent alone doesn't give the user access to the environment's rows.

### Token request fails

Check that **Client ID** belongs to the app registration and that **Client Secret** contains the current secret value, not its ID. For **Client Credentials**, replace `common` with the tenant GUID. Make sure **National Cloud** matches the environment and **Environment URL** is its HTTPS base URL.

### Credential test or node requests return an access error

For delegated access, verify that the signed-in user can access the environment and has the required Dataverse security roles.

For app-only access, verify that an active application user exists in the same environment as **Environment URL**, uses the same application ID as **Client ID**, and has the required roles. Add only the missing privileges, rather than assigning broad administrator access.

If the credential test succeeds but a table or column picker fails, check the metadata access required by the picker. If a write fails, check privileges for the target table and any related rows.

## Related resources

* [Microsoft Dataverse node](../app-nodes/n8n-nodes-base.microsoftdataverse.md)
* [Register an app for Dataverse](https://learn.microsoft.com/en-us/power-apps/developer/data-platform/walkthrough-register-app-azure-active-directory)
* [Use OAuth with Dataverse](https://learn.microsoft.com/en-us/power-apps/developer/data-platform/authenticate-oauth)
* [Manage Dataverse application users](https://learn.microsoft.com/en-us/power-platform/admin/manage-application-users)