---
title: Salesforce credentials
description: Documentation for Salesforce credentials. Use these credentials to authenticate Salesforce in n8n, a workflow automation platform.
contentType: [integration, reference]
priority: medium
---

# Salesforce credentials

You can use these credentials to authenticate the following nodes:

- [Salesforce](/integrations/builtin/app-nodes/n8n-nodes-base.salesforce.md)
- [Salesforce trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.salesforcetrigger.md)

## Supported authentication methods

- JWT
- OAuth2
- Client credentials

## Related resources

Refer to [Salesforce's developer documentation](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_intro.htm) for more information about the service.

/// note | Salesforce External Client Apps
Salesforce is deprecating Connected Apps in favor of External Client Apps. Both methods work with n8n. If you're creating a new integration, use External Client Apps. Existing Connected Apps will continue to work.
///

## Using JWT

To configure this credential, you'll need a [Salesforce](https://www.salesforce.com/) account and:

- Your **Environment Type** (Production or Sandbox)
- A **Client ID**: Generated when you create an external client app or connected app.
- Your Salesforce **Username**
- A **Private Key** for a self-signed digital certificate

### Create an External Client App (recommended)

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

### Create a Connected App (legacy)

/// note | Legacy method
Salesforce is deprecating Connected Apps. Use External Client Apps instead for new integrations.
///

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

These steps are what's required on the n8n side. Salesforce recommends setting refresh token policies, session policies, and OAuth policies too:

17. In Salesforce, select **Back to Manage Connected Apps**.
18. Select **Manage**.
19. Select **Edit Policies**.
20. Review the **Refresh Token Policy** field. Salesforce recommends using expire refresh token after 90 days.
21. In the **Session Policies** section, Salesforce recommends setting **Timeout Value** to 15 minutes.
22. In the **OAuth Policies** section, select **Admin approved users are pre-authorized for permitted users** for **Permitted Users**, and select **OK**.
23. Select **Save**.
24. Select **Manage Profiles**, select the profiles that are pre-authorized to use this connected app, and select **Save**.
25. Select **Manage Permission Sets** to select the permission sets. Create permission sets if necessary.

Refer to Salesforce's [Create a Connected App in Your Org](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_auth_connected_app.htm) documentation for more information.


## Using OAuth2

To configure this credential, you'll need a [Salesforce](https://www.salesforce.com/) account.

--8<-- "_snippets/integrations/builtin/credentials/cloud-oauth-button.md"

Cloud and hosted users will need to select your **Environment Type**. Choose between **Production** and **Sandbox**.

### Create an External Client App (recommended)

If you're [self-hosting](/hosting/index.md) n8n, you'll need to configure OAuth2 from scratch by creating an external client app:

1. In n8n, select the **Environment Type** for your connection. Choose the option that best describes your environment from **Production** or **Sandbox**.
2. Enter your Salesforce **Username**.
3. Log in to your org in Salesforce.
4. From **Setup** in Salesforce, enter `App Manager` in the Quick Find box, then select **App Manager**.
5. On the App Manager page, select **New External Client App**.
6. Enter the required **Basic Info** for your external client app, including a **Name** and **Contact Email address**.
7. Under **API (Enable OAuth Settings)**, select **Enable OAuth**.
8. In the **Callback URL** box, add your n8n OAuth callback URL (for example, `https://your-n8n-instance.com/rest/oauth2-credential/callback`).
9. In the **OAuth Scopes** section, select these scopes:
    - **Full access (full)**
    - **Perform requests at any time (refresh_token, offline_access)**
10. In the **Flow Enablement** section, select **Enable Client Credentials Flow**.
11. Under **OAuth Policies**, make sure the following settings are **unchecked**:
    - **Require Secret for Web Server Flow**
    - **Require Secret for Refresh Token Flow**
    - **Require Proof Key for Code Exchange (PKCE) Extension for Supported Authorization Flows**
12. Select **Save**, then **Continue**.
13. Copy the **Consumer Key** and add it to your n8n credential as the **Client ID**.
14. Copy the **Consumer Secret** and add it to your n8n credential as the **Client Secret**.

Refer to Salesforce's [External Client App Basics](https://help.salesforce.com/s/articleView?id=sf.external_client_app_about.htm&type=5) documentation for more information.

### Create a Connected App (legacy)

/// note | Legacy method
Salesforce is deprecating Connected Apps. Use External Client Apps instead for new integrations.
///

If you're [self-hosting](/hosting/index.md) n8n, you can also configure OAuth2 by creating a connected app:

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
18. Review the **Refresh Token Policy** field. Salesforce recommends using expire refresh token after 90 days.
19. In the **Session Policies** section, Salesforce recommends setting **Timeout Value** to 15 minutes.

Refer to Salesforce's [Create a Connected App in Your Org](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_auth_connected_app.htm) documentation for more information.

## Using Client credentials

Use this authentication method for server-to-server integrations where no user interaction is required.

To configure this credential, you'll need a [Salesforce](https://www.salesforce.com/) account and:

- Your Salesforce **Instance URL** (for example, `https://mydomain.my.salesforce.com`)
- A **Client ID** (Consumer Key)
- A **Client Secret** (Consumer Secret)

Unlike OAuth2, Client credentials authentication doesn't use Salesforce's default Production or Sandbox login URLs. You must provide your Salesforce instance URL directly.

To set things up, first create a connected app in Salesforce and enable the Client Credentials flow:

1. Log in to your org in Salesforce.
2. From **Setup**, enter `App Manager` in the Quick Find box, then select **App Manager**.
3. On the App Manager page, select **New Connected App**.
4. Enter the required **Basic Info** for your connected app, including a **Name** and **Contact Email address**.
5. Check the box to **Enable OAuth Settings**.
6. For the **Callback URL**, enter any valid URL (for example, `http://localhost`). The Client Credentials flow doesn't use the callback URL, but Salesforce requires a value.
7. Add the required **OAuth scopes**. At minimum, add:
   - **Manage user data via APIs (api)**
8. In the **OAuth Settings** section, check the box to **Enable Client Credentials Flow**.
9. Select **Save**, then **Continue**. The **Manage Connected Apps** page should open to the app you just created.

Salesforce requires you to define which user the integration runs as:

10. Select **Manage**.
11. Select **Edit Policies**.
12. In the **OAuth Policies** section, select the user that the Client Credentials flow should run as (the "Run As" user).
13. Select **Save**.
14. Ensure the selected user has the necessary permissions and access required by your workflow.

After configuring the policies:

15. In the **API (Enable OAuth Settings)** section, select **Manage Consumer Details**.
16. Copy the **Consumer Key** and add it to your n8n credential as the **Client ID**.
17. Copy the **Consumer Secret** and add it to your n8n credential as the **Client Secret**.

In n8n, configure the credential with:

- **URL**: Your Salesforce instance URL (for example, `https://mydomain.my.salesforce.com`)
- **Client ID**
- **Client Secret**

Once configured, n8n will use the OAuth 2.0 Client Credentials grant (`grant_type=client_credentials`) to authenticate API requests.

Refer to Salesforce's [Connected App documentation](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev_auth_connected_app.htm) for more information.

## Common issues

### Connection issues when authenticating with Salesforce from n8n Cloud

If you encounter connection issues when authenticating with Salesforce from n8n Cloud, you might need to enable a specific system permission in your Salesforce user profiles:

1. In Salesforce, go to **Setup**.
2. In the **Quick Find** box, search for `Profiles`.
3. Select the profile used by the user connecting to n8n (for example, System Administrator or the relevant profile).
4. Click **Edit** or use the new **Profile** interface if it's available.
5. Locate the **Administrative Permissions** section.
6. Enable the checkbox for **Approve Connected Apps for Non-Admins**. This checkbox might also appear as **Approve apps connected not installed** depending on your Salesforce language or translation.
7. Click **Save**.

This permission isn't enabled by default, even for administrator profiles, and must be manually activated. Without this permission, you might experience authentication failures when trying to connect n8n to Salesforce.