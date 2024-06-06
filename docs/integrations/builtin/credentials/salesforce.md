---
title: Salesforce credentials
description: Documentation for Salesforce credentials. Use these credentials to authenticate Salesforce in n8n, a workflow automation platform.
contentType: integration
---

# Salesforce credentials

You can use these credentials to authenticate the following nodes:

- [Salesforce](/integrations/builtin/app-nodes/n8n-nodes-base.salesforce/)
- [Salesforce trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.salesforcetrigger/)

## Prerequisites

- Create a [Salesforce](https://www.salesforce.com/){:target=_blank .external-link} account.
- Create a [connected app](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_auth_connected_app.htm){:target=_blank .external-link} in Salesforce. Refer to the authentication method sections below for the app configuration each method requires.

## Supported authentication methods

- JWT
- OAuth2

## Related resources

Refer to [Salesforce's developer documentation](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_intro.htm){:target=_blank .external-link} for more information about the service.

## Using JWT

To configure this credential, you'll need:

- An **Environment Type**: Choose the option that best describes your environment. Options are **Production** and **Sandbox**.
- A **Client ID**: The **Consumer Key** generated when you create a connected app.
- A **Username**: Your Salesforce username.
- A **Private Key**: Refer to the Salesforce [Create a Private Key and Self-Signed Digital Certificate documentation](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_auth_key_and_cert.htm){:target=_blank .external-link} for instructions. Create this private key before you create the connected app.

You'll need to create a connected app in Salesforce for this credential. Follow the instructions in [Create a Connected App in Your Org](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_auth_connected_app.htm){:target=_blank .external-link}.

Use these settings for your app:

- Check the box to **Use digital signatures**.
- Select **Choose File** and upload the private key file you created.
- Add the **Perform requests on your behalf at any time (refresh_token, offline_access)** scope in the **Selected OAuth Scopes** section, along with any other scopes you plan to use.
- Copy the **Consumer Key** and add it to n8n as the **Client ID**.
- Enter the contents of the private key file in n8n as **Private Key**.
    - Use the multi-line editor in n8n.
    - Enter the private key in standard PEM key format:
        ```
        -----BEGIN PRIVATE KEY-----
        KEY DATA GOES HERE
        -----END PRIVATE KEY-----
        ```

## Using OAuth2

--8<-- "_snippets/integrations/builtin/credentials/cloud-oauth-button.md"

Cloud and hosted users will need to select your **Environment Type**. Choose between **Production** and **Sandbox**.

If you need to configure OAuth2 from scratch, follow the instructions in [Create a Connected App in Your Org](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_auth_connected_app.htm){:target=_blank .external-link}.

Use these settings for your app:

- Add the **Perform requests on your behalf at any time (refresh_token, offline_access)** scope in the **Selected OAuth Scopes** section, along with any other scopes you plan to use.
- In the **API (Enable OAuth Settings)** section, select **Click to reveal** to reveal the consumer secret.
- Copy the **Consumer Key** and **Consumer Secret** and add these to the appropriate fields in n8n.

