# Shopify

You can use these credentials to authenticate the following nodes with Shopify.

- [Shopify](/integrations/nodes/n8n-nodes-base.shopify/)
- [Shopify Trigger](/integrations/trigger-nodes/n8n-nodes-base.shopifyTrigger/)

## Prerequisites

Create a [Shopify](https://shopify.com/) account.

## Using API Key

1. Access the [Apps](https://www.shopify.com/admin/apps) section of your Shopify Store's admin console.
2. Click on 'Manage private apps' near the bottom of the page.
3. Click on the 'Create new private app' button and create a new app by entering any necessary information. Make sure that you set appropriate for the methods you plan to use under the 'Admin API' section.
4. Upon app creation, scroll down, and you will see your API key, Password, and Shared Secret.
5. Use your password, API key, secret, and shop subdomain with your Shopify node credentials in n8n.

**Note:** Use the subdomain without `.myshopify.com` in n8n.

![Getting Shopify credentials](/_images/integrations/credentials/shopify/using-oauth.gif)
