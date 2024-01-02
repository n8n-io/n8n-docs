---
title: Webflow credentials
description: Documentation for Webflow credentials. Use these credentials to authenticate Webflow in n8n, a workflow automation platform.
contentType: integration
---

# Webflow credentials

You can use these credentials to authenticate the following nodes with Webflow:

- [Webflow](/integrations/builtin/app-nodes/n8n-nodes-base.webflow/)
- [Webflow Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.webflowtrigger/)

## Prerequisites

Create a [Webflow](https://webflow.com/){:target=_blank .external-link} account.

## Using OAuth

/// note | Note for n8n Cloud users
Enter the credential name, then select **Connect my account** circle button in the OAuth section to connect your Webflow account to n8n automatically.
///

1. In your Webflow dashboard, select **Account**.
1. Select **Workspaces** from the dropdown list.
1. Select the **Integrations** tab.
1. In the **Workspace apps** section, select **+ Refister New App**.
1. Enter the name of your application in the **Application Name** field.
1. Enter the description of your application in the **Application Description** field.
1. Copy the **OAuth callback URL** from the **Webflow OAuth2 API** credentials in n8n and paste it in the **Redirect URI** field in the Webflow integrations page.
1. Enter the homepage URL of your application in the **Application Homepage** field.
1. Select **Create**
1. Select **View Details** to get the **Client Id** and **Client Secret***.
1. Use these credentials with your Webflow OAuth2 API credentials in n8n.
1. Select **Connect my account** to test your connection.
1. Select **Save** to save your credentials.

![Getting Webflow OAuth credentials](/_images/integrations/builtin/credentials/webflow/using-oauth.gif)

## Using Access Token

1. Access your Webflow dashboard.
2. Select your desired project.
3. Select the W icon in the top left.
4. Select **Project Settings**.
5. Select the **Integrations** tab.
6. Scroll down and select **Generate API token**.
7. Use the API token with your Webflow node credentials in n8n.

![Getting Webflow credentials](/_images/integrations/builtin/credentials/webflow/using-access-token.gif)

