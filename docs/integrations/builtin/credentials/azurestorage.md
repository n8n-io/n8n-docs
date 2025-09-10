---
title: Azure Storage credentials
description: Documentation for the Azure Storage credentials. Use these credentials to authenticate Azure Storage in n8n, a workflow automation platform.
contentType: [integration, reference]
---

# Azure Storage credentials

You can use these credentials to authenticate the following nodes:

* [Azure Storage](/integrations/builtin/app-nodes/n8n-nodes-base.azurestorage.md)

## Prerequisites

* Create an [Azure](https://azure.microsoft.com) subscription.
* Create an [Azure storage account](https://learn.microsoft.com/en-us/azure/storage/common/storage-account-create).

## Supported authentication methods

* OAuth2
* Shared Key

## Related resources

Refer to [Azure Storage's API documentation](https://learn.microsoft.com/en-us/rest/api/storageservices/) for more information about the service.

## Using OAuth2

--8<-- "_snippets/integrations/builtin/credentials/cloud-oauth-button.md"

For self-hosted users, there are two main steps to configure OAuth2 from scratch:

1. [Register an application](#register-an-application) with the Microsoft Identity Platform.
2. [Generate a client secret](#generate-a-client-secret) for that application.

Follow the detailed instructions for each step below. For more detail on the Microsoft OAuth2 web flow, refer to [Microsoft authentication and authorization basics](https://learn.microsoft.com/en-us/graph/auth/auth-concepts). 

### Register an application

Register an application with the Microsoft Identity Platform:

1. Open the [Microsoft Application Registration Portal](https://aka.ms/appregistrations).
2. Select **Register an application**.
3. Enter a **Name** for your app.
4. In **Supported account types**, select **Accounts in any organizational directory (Any Azure AD directory - Multi-tenant) and personal Microsoft accounts (for example, Skype, Xbox)**.
5. In **Register an application**:
    1. Copy the **OAuth Callback URL** from your n8n credential.
    2. Paste it into the **Redirect URI (optional)** field.
    3. Select **Select a platform** > **Web**.
6. Select **Register** to finish creating your application.
7. Copy the **Application (client) ID** and paste it into n8n as the **Client ID**.

Refer to [Register an application with the Microsoft Identity Platform](https://learn.microsoft.com/en-us/graph/auth-register-app-v2) for more information.

### Generate a client secret

With your application created, generate a client secret for it:

1. On your Microsoft application page, select **Certificates & secrets** in the left navigation.
1. In **Client secrets**, select **+ New client secret**.
1. Enter a **Description** for your client secret, such as `n8n credential`.
1. Select **Add**.
1. Copy the **Secret** in the **Value** column.
1. Paste it into n8n as the **Client Secret**.
1. Select **Connect my account** in n8n to finish setting up the connection.
1. Log in to your Microsoft account and allow the app to access your info.

Refer to Microsoft's [Add credentials](https://learn.microsoft.com/en-us/graph/auth-register-app-v2#add-credentials) for more information on adding a client secret.

## Using Shared Key

To configure this credential, you'll need:

* An **Account**: The name of your Azure Storage account.
* A **Key**: A shared key for your Azure Storage account. Select **Security + networking** and then **Access keys**. You can use either of the two account keys for this purpose.

Refer to [Manage storage account access keys | Microsoft](https://learn.microsoft.com/en-us/azure/storage/common/storage-account-keys-manage) for more detailed steps.

## Common issues

Here are the known common errors and issues with Azure Storage credentials.

--8<-- "_snippets/integrations/builtin/credentials/microsoft-need-admin-approval.md"
