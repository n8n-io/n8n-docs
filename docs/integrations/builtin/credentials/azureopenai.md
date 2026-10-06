---
title: Microsoft Foundry credentials
description: >-
  Documentation for Microsoft Foundry credentials. Use these credentials to
  authenticate Microsoft Foundry in n8n, a workflow automation platform.
contentType:
  - integration
  - reference
priority: medium
nodeTitle: Microsoft Foundry credentials
originalFilePath: integrations/builtin/credentials/azureopenai.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/credentials/azureopenai'
url: 'https://docs.n8n.io/integrations/builtin/credentials/azureopenai'
layout:
  description:
    visible: false
---

# Microsoft Foundry credentials <a href="#azure-openai-credentials" id="azure-openai-credentials"></a>

You can use these credentials to authenticate the following nodes:

- [Microsoft Foundry Chat Model](../cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatazureopenai.md)
- [Microsoft Foundry Embeddings](../cluster-nodes/sub-nodes/n8n-nodes-langchain.embeddingsazureopenai.md)

## Prerequisites <a href="#prerequisites" id="prerequisites"></a>

- Create an [Azure](https://azure.microsoft.com) subscription.
- Access to Azure OpenAI or Microsoft Foundry within that subscription. You may need to [request access](https://aka.ms/oai/access) if your organization doesn't yet have it.

## Supported authentication methods <a href="#supported-authentication-methods" id="supported-authentication-methods"></a>

- API key
- Microsoft Foundry (Entra ID): the app signs in with a client ID and secret. No user sign-in is needed.

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [Azure OpenAI's API documentation](https://learn.microsoft.com/en-us/azure/ai-services/openai/reference) for more information about the service.

## Endpoint type <a href="#endpoint-type" id="endpoint-type"></a>

Both credential types have an **Endpoint Type** setting. It sets which Azure endpoint the nodes call.

* **Classic**: Use this for an Azure OpenAI resource at `*.openai.azure.com`. The credential needs a **Resource Name** and an **API Version**. You can also enter an optional **Endpoint**.
* **Microsoft Foundry**: Use this for a Microsoft Foundry resource at `*.services.ai.azure.com`. The credential needs the full **Endpoint** URL, for example `https://<resource>.services.ai.azure.com/openai/v1`.

Some Chat Model node features need the **Microsoft Foundry** endpoint type: the deployment list, Claude models, and the Responses API. Refer to [Microsoft Foundry Chat Model](../cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatazureopenai.md) for details.

## Using API key <a href="#using-api-key" id="using-api-key"></a>

To configure this credential, you'll need:

- An **Endpoint Type**: **Classic** or **Microsoft Foundry**.
- An **API key**: **Key 1** works well. This can be accessed before deployment in **Keys and Endpoint**.
- For the **Classic** endpoint type:
    - A **Resource Name**: the **Name** you give the resource.
    - The **API Version** the credentials should use. See the [Azure OpenAI API preview lifecycle documentation](https://learn.microsoft.com/en-us/azure/ai-services/openai/api-version-deprecation) for more information about API versioning in Azure OpenAI.
- For the **Microsoft Foundry** endpoint type: the full **Endpoint** URL of your resource.

To get the information above, create and deploy a resource:

- **Classic**: [create and deploy an Azure OpenAI Service resource](https://learn.microsoft.com/en-us/azure/ai-services/openai/how-to/create-resource).
- **Microsoft Foundry**: [create a Microsoft Foundry resource](https://learn.microsoft.com/en-us/azure/foundry/tutorials/quickstart-create-foundry-resources) and deploy a model to it.

{% hint style="info" %}
**Model name for Microsoft Foundry nodes**

Once you deploy the resource, use the **Deployment name** as the model name for the Microsoft Foundry nodes where you're using this credential.
{% endhint %}

## Using Microsoft Foundry (Entra ID) <a href="#using-azure-entra-id-oauth2" id="using-azure-entra-id-oauth2"></a>

The Microsoft Foundry (Entra ID) credential signs in as your Entra application. It uses the client credentials grant. You don't sign in with a browser, and there is no **Connect** button or redirect URI.

To configure this credential, you'll need:

- An **Endpoint Type** and the matching endpoint fields. Refer to [Endpoint type](#endpoint-type).
- A **Tenant ID**: the **Directory (tenant) ID** of your app registration. It has no default value.
- A **Client ID** and a **Client Secret** for the app registration.

Follow these steps:

1. [Register an application](#register-an-application) with the Microsoft Identity Platform.
2. [Generate a client secret](#generate-a-client-secret) for that application.
3. [Give the application access](#give-the-application-access) to your resource.

Existing credentials keep working. The **Connect** button and the scope settings no longer show. The stored sign-in token is no longer used.

### Register an application <a href="#register-an-application" id="register-an-application"></a>

Register an application with the Microsoft Identity Platform:

1. Open the [Microsoft Application Registration Portal](https://aka.ms/appregistrations).
2. Select **Register an application**.
3. Enter a **Name** for your app.
4. In **Supported account types**, select an option that includes your tenant.
5. Select **Register** to finish creating your application. You don't need a **Redirect URI**.
6. Copy the **Application (client) ID** and paste it into n8n as the **Client ID**.
7. Copy the **Directory (tenant) ID** and paste it into n8n as the **Tenant ID**.

Refer to [Register an application with the Microsoft Identity Platform](https://learn.microsoft.com/en-us/graph/auth-register-app-v2) for more information.

### Generate a client secret <a href="#generate-a-client-secret" id="generate-a-client-secret"></a>

With your application created, generate a client secret for it:

1. On your Microsoft application page, select **Certificates & secrets** in the left navigation.
1. In **Client secrets**, select **+ New client secret**.
1. Enter a **Description** for your client secret, such as `n8n credential`.
1. Select **Add**.
1. Copy the **Secret** in the **Value** column.
1. Paste it into n8n as the **Client Secret**.

Refer to Microsoft's [Add credentials](https://learn.microsoft.com/en-us/graph/auth-register-app-v2#add-credentials) for more information on adding a client secret.

### Give the application access <a href="#give-the-application-access" id="give-the-application-access"></a>

The application needs a role on your Azure resource. Without the role, model calls fail with a `403` error. Role assignments can take up to five minutes to start.

In the Azure portal, open your resource and go to **Access control (IAM)**. Assign the role to your application. Select **User, group, or service principal** as the member type.

* **Classic** endpoint type: Assign the **Cognitive Services OpenAI User** role.
* **Microsoft Foundry** endpoint type: Assign the **Foundry User** role on the Foundry resource. Microsoft previously named this role **Azure AI User**, and you may still see that name in the portal.

Refer to Microsoft's documentation on [Entra ID authentication for Azure OpenAI](https://learn.microsoft.com/en-us/azure/ai-foundry/openai/how-to/managed-identity) and [role-based access control for Microsoft Foundry](https://learn.microsoft.com/en-us/azure/foundry/concepts/rbac-foundry) for more information.
