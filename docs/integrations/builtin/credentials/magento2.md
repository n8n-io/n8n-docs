# Magento 2

You can use these credentials to authenticate the following nodes:

- [Magento 2](/integrations/builtin/app-nodes/n8n-nodes-base.magento2/)

## Prerequisites

Create a [Magento](https://magento.com/) account.

## Using Access Token

From your Magento [admin](https://docs.magento.com/user-guide/stores/admin.html) panel:

1. Navigate to **System** > **Extensions** > **Integrations**.
2. Select **Add New Integration**.
3. Enter a name for your n8n integration and your admin password.
4. Navigate to the **API** tab and select the Magento resources this n8n integration should be able to access.
5. Select **Save** to confirm your selections.
6. From the **Integrations** page, click **Activate** for the new n8n integration.
7. Select **Allow** to display a dialog screen with the credentials.
8. Copy the **Access Token** value to use in n8n.

From n8n:

1. Enter the **Host** address of your Magento store.
2. Enter the **Access Token** obtained above.
3. Click **Save** to create the credentials.
