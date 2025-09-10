---
title: Azure OpenAI credentials
description: Documentation for Azure OpenAI credentials. Use these credentials to authenticate OpenAI in n8n, a workflow automation platform.
contentType: [integration, reference]
priority: medium
---

# Azure OpenAI credentials

You can use these credentials to authenticate the following nodes:

- [Chat Azure OpenAI](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatazureopenai.md)
- [Embeddings Azure OpenAI](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.embeddingsazureopenai.md)

## Prerequisites

- Create an [Azure](https://azure.microsoft.com) subscription.
- Access to Azure OpenAI within that subscription. You may need to [request access](https://aka.ms/oai/access) if your organization doesn't yet have it.

## Supported authentication methods

- API key
- Azure Entra ID (OAuth2)

## Related resources

Refer to [Azure OpenAI's API documentation](https://learn.microsoft.com/en-us/azure/ai-services/openai/reference) for more information about the service.

## Using API key

To configure this credential, you'll need:

- A **Resource Name**: the **Name** you give the resource
- An **API key**: **Key 1** works well. This can be accessed before deployment in **Keys and Endpoint**.
- The **API Version** the credentials should use. See the [Azure OpenAI API preview lifecycle documentation](https://learn.microsoft.com/en-us/azure/ai-services/openai/api-version-deprecation) for more information about API versioning in Azure OpenAI.

To get the information above, [create and deploy an Azure OpenAI Service resource](https://learn.microsoft.com/en-us/azure/ai-services/openai/how-to/create-resource).

/// note | Model name for Azure OpenAI nodes
Once you deploy the resource, use the **Deployment name** as the model name for the Azure OpenAI nodes where you're using this credential.
///

## Using Azure Entra ID (OAuth2)

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

## Setting custom scopes

Azure Entra ID credentials use the following scopes by default:

* [`openid`](https://learn.microsoft.com/en-us/entra/identity-platform/scopes-oidc#the-openid-scope)
* [`offline_access`](https://learn.microsoft.com/en-us/entra/identity-platform/scopes-oidc#the-offline_access-scope)
* [`AccessReview.ReadWrite.All`](https://learn.microsoft.com/en-us/graph/permissions-reference#accessreviewreadwriteall)
* [`Directory.ReadWrite.All`](https://learn.microsoft.com/en-us/graph/permissions-reference#directoryreadwriteall)
* [`NetworkAccessPolicy.ReadWrite.All`](https://learn.microsoft.com/en-us/graph/permissions-reference#networkaccesspolicyreadwriteall)
* [`DelegatedAdminRelationship.ReadWrite.All`](https://learn.microsoft.com/en-us/graph/permissions-reference#delegatedadminrelationshipreadwriteall)
* [`EntitlementManagement.ReadWrite.All`](https://learn.microsoft.com/en-us/graph/permissions-reference#entitlementmanagementreadwriteall)
* [`User.ReadWrite.All`](https://learn.microsoft.com/en-us/graph/permissions-reference#userreadwriteall)
* [`Directory.AccessAsUser.All`](https://learn.microsoft.com/en-us/graph/permissions-reference#directoryaccessasuserall)
* [`Sites.FullControl.All`](https://learn.microsoft.com/en-us/graph/permissions-reference#sitesfullcontrolall)
* [`GroupMember.ReadWrite.All`](https://learn.microsoft.com/en-us/graph/permissions-reference#groupmemberreadwriteall)

To select different scopes for your credentials, enable the **Custom Scopes** slider and edit the **Enabled Scopes** list. Keep in mind that some features may not work as expected with more restrictive scopes.
