---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Salesforce credentials
description: Documentation for Salesforce credentials. Use these credentials to authenticate Salesforce in n8n, a workflow automation platform.
contentType: integration
priority: medium
---

# Salesforce credentials

You can use these credentials to authenticate the following nodes:

- [Salesforce](/integrations/builtin/app-nodes/n8n-nodes-base.salesforce/)
- [Salesforce trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.salesforcetrigger/)

## Supported authentication methods

- JWT
- OAuth2

## Related resources

Refer to [Salesforce's developer documentation](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_intro.htm){:target=_blank .external-link} for more information about the service.

## Using JWT

To configure this credential, you'll need a [Salesforce](https://www.salesforce.com/){:target=_blank .external-link} account and:

- Your **Environment Type** (Production or Sandbox)
- A **Client ID**: Generated when you create a connected app.
- Your Salesforce **Username**
- A **Private Key** for a self-signed digital certificate

To set things up, first you'll create a private key and certificate, then a connected app:

1. In n8n, select the **Environment Type** for your connection. Choose the option that best describes your environment from **Production** or **Sandbox**.
2. Enter your Salesforce **Username**.
1. Log in to your org in Salesforce.
2. You'll need a private key and certificate issued by a certification authority. Use your own key/cert or use OpenSSL to create a key and a self-signed digital certificate. Refer to the Salesforce [Create a Private Key and Self-Signed Digital Certificate documentation](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_auth_key_and_cert.htm){:target=_blank .external-link} for instructions on creating your own key and certificate.
3. From **Setup** in Salesforce, enter `App Manager` in the Quick Find box, then select **App Manager**.
3. On the App Manager page, select **New Connected App**.
4. Enter the required **Basic Info** for your connected app, including a **Name** and **Contact Email address**. Refer to Salesforce's [Configure Basic Connected App Settings](https://help.salesforce.com/s/articleView?id=sf.connected_app_create_basics.htm&type=5){:target=_blank .external-link} documentation for more information.
5. Check the box to **Enable OAuth Settings**.
6. For the **Callback URL**, enter `http://localhost:1717/OauthRedirect`.
7. Check the box to **Use digital signatures**.
8. Select **Choose File** and upload the file that contains your digital certificate, such as `server.crt`.
9. Add these **OAuth scopes**:
	- **Full access (full)**
	- **Perform requests at any time (refresh_token, offline_access)**
10. Select **Save**, then **Continue**. The **Manage Connected Apps** page should open to the app you just created.
11. In the **API (Enable OAuth Settings)** section, select **Manage Consumer Details**.
12. Copy the **Consumer Key** and add it to your n8n credential as the **Client ID**.
13. Enter the contents of the private key file in n8n as **Private Key**.
	- Use the multi-line editor in n8n.
	- Enter the private key in standard PEM key format:
        ```
        -----BEGIN PRIVATE KEY-----
        KEY DATA GOES HERE
        -----END PRIVATE KEY-----
        ```

These steps are what's required on the n8n side. Salesforce recommends setting refresh token policies, session policies, and OAuth policies too:

14. In Salesforce, select **Back to Manage Connected Apps**.
15. Select **Manage**.
16. Select **Edit Policies**.
17. Review the **Refresh Token Policy** field. Salesforce recommends using expire refresh token after 90 days.
18. In the **Session Policies** section, Salesforce recommends setting **Timeout Value** to 15 minutes.
19. In the **OAuth Policies** section, select **Admin approved users are pre-authorized for permitted users** for **Permitted Users**, and select **OK**.
20. Select **Save**.
21. Select **Manage Profiles**, select the profiles that are pre-authorized to use this connected app, and select **Save**.
22. Select **Manage Permission Sets** to select the permission sets. Create permission sets if necessary.

Refer to Salesforce's [Create a Connected App in Your Org](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_auth_connected_app.htm){:target=_blank .external-link} documentation for more information.


## Using OAuth2

To configure this credential, you'll need a [Salesforce](https://www.salesforce.com/){:target=_blank .external-link} account.

--8<-- "_snippets/integrations/builtin/credentials/cloud-oauth-button.md"

Cloud and hosted users will need to select your **Environment Type**. Choose between **Production** and **Sandbox**.

If you're [self-hosting](/hosting) n8n, you'll need to configure OAuth2 from scratch by creating a connected app:

1. In n8n, select the **Environment Type** for your connection. Choose the option that best describes your environment from **Production** or **Sandbox**.
2. Enter your Salesforce **Username**.
1. Log in to your org in Salesforce.
3. From **Setup** in Salesforce, enter `App Manager` in the Quick Find box, then select **App Manager**.
3. On the App Manager page, select **New Connected App**.
4. Enter the required **Basic Info** for your connected app, including a **Name** and **Contact Email address**. Refer to Salesforce's [Configure Basic Connected App Settings](https://help.salesforce.com/s/articleView?id=sf.connected_app_create_basics.htm&type=5){:target=_blank .external-link} documentation for more information.
5. Check the box to **Enable OAuth Settings**.
6. For the **Callback URL**, enter `http://localhost:1717/OauthRedirect`.
9. Add these **OAuth scopes**:
	- **Full access (full)**
	- **Perform requests at any time (refresh_token, offline_access)**
10. Make sure the following settings are unchecked:
	- **Require Proof Key for Code Exchange (PKCE) Extension for Supported Authorization Flows**
	- **Require Secret for Web Server Flow**
	- **Require Secret for Refresh Token Flow**
10. Select **Save**, then **Continue**. The **Manage Connected Apps** page should open to the app you just created.
11. In the **API (Enable OAuth Settings)** section, select **Manage Consumer Details**.
12. Copy the **Consumer Key** and add it to your n8n credential as the **Client ID**.
13. Copy the **Consumer Secret** and add it to your n8n credential as the **Client Secret**.

These steps are what's required on the n8n side. Salesforce recommends setting refresh token policies and session policies, too:

14. In Salesforce, select **Back to Manage Connected Apps**.
15. Select **Manage**.
16. Select **Edit Policies**.
17. Review the **Refresh Token Policy** field. Salesforce recommends using expire refresh token after 90 days.
18. In the **Session Policies** section, Salesforce recommends setting **Timeout Value** to 15 minutes.

Refer to Salesforce's [Create a Connected App in Your Org](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_auth_connected_app.htm){:target=_blank .external-link} documentation for more information.
