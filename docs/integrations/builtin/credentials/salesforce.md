---
title: Salesforce credentials
description: >-
  Documentation for Salesforce credentials. Use these credentials to
  authenticate Salesforce in n8n, a workflow automation platform.
contentType:
  - integration
  - reference
priority: medium
nodeTitle: Salesforce credentials
originalFilePath: integrations/builtin/credentials/salesforce.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/credentials/salesforce'
url: 'https://docs.n8n.io/integrations/builtin/credentials/salesforce'
layout:
  description:
    visible: false
---

# Salesforce credentials <a href="#salesforce-credentials" id="salesforce-credentials"></a>

You can use these credentials to authenticate the following nodes:

- [Salesforce](../app-nodes/n8n-nodes-base.salesforce.md)
- [Salesforce trigger](../trigger-nodes/n8n-nodes-base.salesforcetrigger.md)

## Supported authentication methods <a href="#supported-authentication-methods" id="supported-authentication-methods"></a>

- JWT
- OAuth2

{% hint style="info" %}
**Use JWT for unattended integrations**

Use JWT for workflows that run without a person watching or that run only now and then. JWT doesn't use a refresh token, so Salesforce's 30-day idle limit for refresh tokens doesn't apply to it. The Salesforce node and the Salesforce Trigger node support JWT. The [**HTTP Request**](../core-nodes/n8n-nodes-base.httprequest/README.md) node can also use the **Salesforce JWT API** credential as a predefined credential type.
{% endhint %}

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [Salesforce's developer documentation](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_intro.htm) for more information about the service.

{% hint style="warning" %}
**Feature availability**

Salesforce is deprecating Connected Apps in favor of External Client Apps. Check Salesforce's own documentation for the retirement timeline. Both methods work with n8n. If you're creating a new integration, use External Client Apps. Existing Connected Apps will continue to work.
{% endhint %}

## Using JWT <a href="#using-jwt" id="using-jwt"></a>

To configure this credential, you'll need a [Salesforce](https://www.salesforce.com/) account and:

- Your **Environment Type** (Production or Sandbox)
- A **Client ID**: Generated when you create an external client app or connected app.
- Your Salesforce **Username**
- A **Private Key** for a self-signed digital certificate

### Create an External Client App (recommended) <a href="#create-an-external-client-app-recommended" id="create-an-external-client-app-recommended"></a>

To set things up, first you'll create a private key and certificate, then an external client app:

1. In n8n, select the **Environment Type** for your connection. Choose the option that best describes your environment from **Production** or **Sandbox**.
2. Enter your Salesforce **Username**.
3. Log in to your org in Salesforce.
4. You'll need a private key and certificate issued by a certification authority. Use your own key/cert or use OpenSSL to create a key and a self-signed digital certificate. Refer to the Salesforce [Create a Private Key and Self-Signed Digital Certificate documentation](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_auth_key_and_cert.htm) for instructions on creating your own key and certificate.
5. From **Setup** in Salesforce, enter `App Manager` in the Quick Find box, then select **App Manager**.
6. On the App Manager page, select **New External Client App**.
7. Enter the required **Basic Info** for your external client app, including a **Name** and **Contact Email address**.
8. Under **API (Enable OAuth Settings)**, select **Enable OAuth**.
9. In the **Callback URL** box, add the callback URL: `http://localhost:1717/OauthRedirect` (or your n8n instance URL if self-hosting).
10. In the **OAuth Scopes** section, select these scopes:
    - **Full access (full)**
    - **Perform requests at any time (refresh_token, offline_access)**
11. In the **Flow Enablement** section, select **Enable JWT Bearer Flow**.
12. Select **Upload Files** and upload the file that contains your digital certificate, such as `server.crt`.
13. Under **OAuth Policies**, make sure the following settings are **unchecked**:
    - **Require Secret for Web Server Flow**
    - **Require Secret for Refresh Token Flow**
    - **Require Proof Key for Code Exchange (PKCE) Extension for Supported Authorization Flows**
14. Select **Save**, then **Continue**.
15. Copy the **Consumer Key** and add it to your n8n credential as the **Client ID**.
16. Enter the contents of the private key file in n8n as **Private Key**.
    - Use the multi-line editor in n8n.
    - Enter the private key in standard PEM key format:
        ```
        -----BEGIN PRIVATE KEY-----
        KEY DATA GOES HERE
        -----END PRIVATE KEY-----
        ```

Refer to Salesforce's [External Client App Basics](https://help.salesforce.com/s/articleView?id=sf.external_client_app_about.htm&type=5) documentation for more information.

### Create a Connected App (legacy) <a href="#create-a-connected-app-legacy" id="create-a-connected-app-legacy"></a>

{% hint style="warning" %}
**Feature availability**

Salesforce is deprecating Connected Apps in favor of External Client Apps. Check Salesforce's own documentation for the retirement timeline. Use External Client Apps instead for new integrations.
{% endhint %}

To set things up, first you'll create a private key and certificate, then a connected app:

1. In n8n, select the **Environment Type** for your connection. Choose the option that best describes your environment from **Production** or **Sandbox**.
2. Enter your Salesforce **Username**.
3. Log in to your org in Salesforce.
4. You'll need a private key and certificate issued by a certification authority. Use your own key/cert or use OpenSSL to create a key and a self-signed digital certificate. Refer to the Salesforce [Create a Private Key and Self-Signed Digital Certificate documentation](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_auth_key_and_cert.htm) for instructions on creating your own key and certificate.
5. From **Setup** in Salesforce, enter `App Manager` in the Quick Find box, then select **App Manager**.
6. On the App Manager page, select **New Connected App**.
7. Enter the required **Basic Info** for your connected app, including a **Name** and **Contact Email address**. Refer to Salesforce's [Configure Basic Connected App Settings](https://help.salesforce.com/s/articleView?id=sf.connected_app_create_basics.htm&type=5) documentation for more information.
8. Check the box to **Enable OAuth Settings**.
9. For the **Callback URL**, enter `http://localhost:1717/OauthRedirect`.
10. Check the box to **Use digital signatures**.
11. Select **Choose File** and upload the file that contains your digital certificate, such as `server.crt`.
12. Add these **OAuth scopes**:
    - **Full access (full)**
    - **Perform requests at any time (refresh_token, offline_access)**
13. Select **Save**, then **Continue**. The **Manage Connected Apps** page should open to the app you just created.
14. In the **API (Enable OAuth Settings)** section, select **Manage Consumer Details**.
15. Copy the **Consumer Key** and add it to your n8n credential as the **Client ID**.
16. Enter the contents of the private key file in n8n as **Private Key**.
    - Use the multi-line editor in n8n.
    - Enter the private key in standard PEM key format:
        ```
        -----BEGIN PRIVATE KEY-----
        KEY DATA GOES HERE
        -----END PRIVATE KEY-----
        ```

These steps are what's required on the n8n side. Salesforce recommends setting session policies and OAuth policies too:

17. In Salesforce, select **Back to Manage Connected Apps**.
18. Select **Manage**.
19. Select **Edit Policies**.
20. In the **Session Policies** section, Salesforce recommends setting **Timeout Value** to 15 minutes.
21. In the **OAuth Policies** section, select **Admin approved users are pre-authorized for permitted users** for **Permitted Users**, and select **OK**.
22. Select **Save**.
23. Select **Manage Profiles**, select the profiles that are pre-authorized to use this connected app, and select **Save**.
24. Select **Manage Permission Sets** to select the permission sets. Create permission sets if necessary.

Refer to Salesforce's [Create a Connected App in Your Org](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_auth_connected_app.htm) documentation for more information.


## Using OAuth2 <a href="#using-oauth2" id="using-oauth2"></a>

To configure this credential, you'll need a [Salesforce](https://www.salesforce.com/) account.

You will need to select your **Environment Type**. Choose between **Production** and **Sandbox**.

### Create an External Client App (recommended) <a href="#create-an-external-client-app-recommended" id="create-an-external-client-app-recommended"></a>

If you're [self-hosting](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n) n8n, you'll need to configure OAuth2 from scratch by creating an external client app:

1. In n8n, select the **Environment Type** for your connection. Choose the option that best describes your environment from **Production** or **Sandbox**.
2. Enter your Salesforce **Username**.
3. Log in to your org in Salesforce.
4. From **Setup** in Salesforce, enter `App Manager` in the Quick Find box, then select **App Manager**.
5. On the App Manager page, select **New External Client App**.
6. Enter the required **Basic Info** for your external client app, including a **Name** and **Contact Email address**.
7. Under **API (Enable OAuth Settings)**, select **Enable OAuth**.
8. In the **Callback URL** box, add your n8n OAuth callback URL (for example, `https://your-n8n-instance.com/rest/oauth2-credential/callback`. For n8n Cloud, this will be `https://oauth.n8n.cloud/oauth2/callback`).
9. In the **OAuth Scopes** section, select these scopes:
    - **Full access (full)**
    - **Perform requests at any time (refresh_token, offline_access)**
10. In the **Flow Enablement** section, select **Enable Authorization Code and Credentials Flow**.
11. Under **OAuth Policies**, make sure the following settings are **checked**:
    - **Require Secret for Web Server Flow**
    - **Require Secret for Refresh Token Flow**
    - **Require Proof Key for Code Exchange (PKCE) Extension for Supported Authorization Flows**
12. Select **Save**, then **Continue**.
13. Copy the **Consumer Key** and add it to your n8n credential as the **Client ID**.
14. Copy the **Consumer Secret** and add it to your n8n credential as the **Client Secret**.

Refer to Salesforce's [External Client App Basics](https://help.salesforce.com/s/articleView?id=sf.external_client_app_about.htm&type=5) documentation for more information.

### Create a Connected App (legacy) <a href="#create-a-connected-app-legacy" id="create-a-connected-app-legacy"></a>

{% hint style="warning" %}
**Feature availability**

Salesforce is deprecating Connected Apps in favor of External Client Apps. Check Salesforce's own documentation for the retirement timeline. Use External Client Apps instead for new integrations.
{% endhint %}

If you're [self-hosting](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n) n8n, you can also configure OAuth2 by creating a connected app:

1. In n8n, select the **Environment Type** for your connection. Choose the option that best describes your environment from **Production** or **Sandbox**.
2. Enter your Salesforce **Username**.
3. Log in to your org in Salesforce.
4. From **Setup** in Salesforce, enter `App Manager` in the Quick Find box, then select **App Manager**.
5. On the App Manager page, select **New Connected App**.
6. Enter the required **Basic Info** for your connected app, including a **Name** and **Contact Email address**. Refer to Salesforce's [Configure Basic Connected App Settings](https://help.salesforce.com/s/articleView?id=sf.connected_app_create_basics.htm&type=5) documentation for more information.
7. Check the box to **Enable OAuth Settings**.
8. For the **Callback URL**, enter `http://localhost:1717/OauthRedirect`.
9. Add these **OAuth scopes**:
    - **Full access (full)**
    - **Perform requests at any time (refresh_token, offline_access)**
10. Make sure the following settings are unchecked:
    - **Require Proof Key for Code Exchange (PKCE) Extension for Supported Authorization Flows**
    - **Require Secret for Web Server Flow**
    - **Require Secret for Refresh Token Flow**
11. Select **Save**, then **Continue**. The **Manage Connected Apps** page should open to the app you just created.
12. In the **API (Enable OAuth Settings)** section, select **Manage Consumer Details**.
13. Copy the **Consumer Key** and add it to your n8n credential as the **Client ID**.
14. Copy the **Consumer Secret** and add it to your n8n credential as the **Client Secret**.

These steps are what's required on the n8n side. Salesforce recommends setting refresh token policies and session policies, too:

15. In Salesforce, select **Back to Manage Connected Apps**.
16. Select **Manage**.
17. Select **Edit Policies**.
18. Review the **Refresh Token Policy** field. Salesforce also invalidates any refresh token that isn't used for 30 days. Refer to [Refresh token idle limit](#refresh-token-idle-limit) for what this means in n8n.
19. In the **Session Policies** section, Salesforce recommends setting **Timeout Value** to 15 minutes.

Refer to Salesforce's [Create a Connected App in Your Org](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_auth_connected_app.htm) documentation for more information.

### Refresh token idle limit

Salesforce invalidates an OAuth2 refresh token that isn't used for 30 days, and the credential then stops working. Salesforce enforces this limit from October 21, 2026 in sandboxes and from November 4, 2026 in production. Refer to Salesforce's [security updates](https://help.salesforce.com/s/articleView?id=005461287&language=en_US&type=1) and the [FAQ](https://help.salesforce.com/s/articleView?id=005387798&language=en_US&type=1) for details.

n8n uses the refresh token only when Salesforce rejects a request with a `401` error. It doesn't refresh the token on a schedule. A request that succeeds uses the access token, not the refresh token, so regular API calls don't reset the 30-day window.

If the refresh token has expired, Salesforce rejects the refresh with an `invalid_grant` error. The node then fails with the error `The credential "<credential-name>" needs to be reconnected.` To fix it, open the credential in n8n and reconnect it. Set up an [error workflow](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/flow-logic/handle-errors-gracefully) so you know as soon as a workflow fails for this reason.

To avoid this, use [JWT](#using-jwt) for workflows that run unattended or only now and then.

## Common issues <a href="#common-issues" id="common-issues"></a>

### Connection issues when authenticating with Salesforce from n8n Cloud <a href="#connection-issues-when-authenticating-with-salesforce-from-n8n-cloud" id="connection-issues-when-authenticating-with-salesforce-from-n8n-cloud"></a>

If you encounter connection issues when authenticating with Salesforce from n8n Cloud, you might need to enable a specific system permission in your Salesforce user profiles:

1. In Salesforce, go to **Setup**.
2. In the **Quick Find** box, search for `Profiles`.
3. Select the profile used by the user connecting to n8n (for example, System Administrator or the relevant profile).
4. Click **Edit** or use the new **Profile** interface if it's available.
5. Locate the **Administrative Permissions** section.
6. Enable the checkbox for **Approve Connected Apps for Non-Admins**. This checkbox might also appear as **Approve apps connected not installed** depending on your Salesforce language or translation.
7. Click **Save**.

This permission isn't enabled by default, even for administrator profiles, and must be manually activated. Without this permission, you might experience authentication failures when trying to connect n8n to Salesforce.

### Credential needs to be reconnected after a period of inactivity

An OAuth2 credential stops working when n8n hasn't used its refresh token for 30 days, because Salesforce then invalidates the refresh token. The node fails with the error `The credential "<credential-name>" needs to be reconnected.`

To fix it, open the credential in n8n and reconnect it. Regular successful API calls don't keep the refresh token alive, because n8n uses the refresh token only after Salesforce rejects a request with a `401` error. Refer to [Refresh token idle limit](#refresh-token-idle-limit) for details.

To stop it from happening again, switch to [JWT](#using-jwt). JWT doesn't use a refresh token, so the 30-day idle limit doesn't apply.
