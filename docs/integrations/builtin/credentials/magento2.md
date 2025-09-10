---
title: Magento 2 credentials
description: Documentation for Magento 2 credentials. Use these credentials to authenticate Magento 2 in n8n, a workflow automation platform.
contentType: [integration, reference]
---

# Magento 2 credentials

You can use these credentials to authenticate the following node:

- [Magento 2](/integrations/builtin/app-nodes/n8n-nodes-base.magento2.md)

## Prerequisites

- Create a [Magento (Adobe Commerce)](https://business.adobe.com/products/commerce.html) account.
- Set your store to **Allow OAuth Access Tokens to be used as standalone Bearer tokens**.
    - Go to **Admin > Stores > Configuration > Services > OAuth > Consumer Settings**.
    - Set the **Allow OAuth Access Tokens to be used as standalone Bearer tokens** option to **Yes**.
    - You can also enable this setting from the CLI by running the following command:

        ```
        bin/magento config:set oauth/consumer/enable_integration_as_bearer 1
        ```

This step is necessary until n8n updates the Magento 2 credentials to use OAuth. Refer to [Integration Tokens](https://developer.adobe.com/commerce/webapi/get-started/authentication/gs-authentication-token/#integration-tokens) for more information.

## Supported authentication methods

- API access token

## Related resources

Refer to [Magento's API documentation](https://developer.adobe.com/commerce/docs/) for more information about the service.

## Using API access token

To configure this credential, you'll need:

- A **Host**: Enter the address of your Magento store.
- An **Access Token**: Get an access token from the [**Admin Panel**](https://docs.magento.com/user-guide/stores/admin.html):
    1. Go to **System > Extensions > Integrations**.
    2. Add a new Integration.
    3. Go to the **API** tab and select the Magento resources you'd like the n8n integration to access.
    4. From the **Integrations** page, **Activate** the new integration.
    5. Select **Allow** to display your access token so you can copy it and enter it in n8n.
