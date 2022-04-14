# Zammad

You can use these credentials to authenticate the following nodes with Zammad.
- [Zammad](/integrations/nodes/n8n-nodes-base.zammad/)

## Prerequisites

1. Create a hosted [Zammad](https://zammad.com/) account or set up your own Zammad instance.
2. For the token-based authentication make sure `Token Access` is enabled in the API section of your Zammad instance's System settings.

## Basic Auth

1. Enter the URL of your Zammad instance in the **Base URL** field of the Doc² credentials screen.
2. Enter your Zammad email om the **Email** field and your password in the **Password** field.

## Token Auth

1. Log in to your Zammad instance
2. Click your avatar in the lower left corner, then click on **Profile**
3. Select **Token Access** and click **Create**
4. Enter a name for your new token and pick all required permissions. Click **Create** once done.
5. Copy the token shown into the **Access Token** field in n8n. Enter the URL of your Zammad instance in the **Base URL** field.
