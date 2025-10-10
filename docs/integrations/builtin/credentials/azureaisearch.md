---
title: Azure AI Search credentials
description: Documentation for Azure AI Search credentials. Use these credentials to authenticate Azure AI Search in n8n, a workflow automation platform.
contentType: [integration, reference]
priority: medium
---

# Azure AI Search credentials

You can use these credentials to authenticate the following nodes:

- [Azure AI Search Vector Store](/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoreazureaisearch.md)

## Prerequisites

- Create an [Azure](https://azure.microsoft.com) subscription.
- Create an Azure AI Search service in the [Azure Portal](https://portal.azure.com/).
- Configure appropriate access to your search service (API key or managed identity).

## Supported authentication methods

- API key
- Managed identity (system-assigned)
- Managed identity (user-assigned)

## Related resources

Refer to [Azure AI Search documentation](https://learn.microsoft.com/azure/search/) for more information about the service.

## Using API key

To configure this credential, you'll need:

- An **Endpoint**: The URL of your Azure AI Search service (e.g., `https://your-service.search.windows.net`)
- An **API Key**: The admin or query key for your service

To get the information above:

1. Navigate to your Azure AI Search service in the [Azure Portal](https://portal.azure.com/).
2. In the **Overview** section, copy the **URL** for your endpoint.
3. In the **Settings** > **Keys** section, copy either:
   - **Admin key** (for read-write access)
   - **Query key** (for read-only access)
4. Enter these values into the corresponding fields in n8n.

/// note | API key permissions
Admin keys provide full access to the search service, including the ability to create and delete indexes. Query keys provide read-only access for querying data. Choose the appropriate key based on your workflow requirements.
///

## Using Managed Identity (System-Assigned)

System-assigned managed identity (SAMI) is automatically created and managed by Azure for your specific resource. This identity is tied directly to the Azure resource lifecycle and is recommended for single-resource scenarios. To configure:

1. Enable system-assigned managed identity on your Azure resource (e.g., Azure VM, App Service, Function App).
2. In your Azure AI Search service:
   1. Navigate to **Settings** > **Keys**.
   2. Select **Role-based access control** as the authentication method.
   3. Go to **Access control (IAM)** > **Add role assignment**.
   4. Assign the appropriate role to your system-assigned managed identity:
      - **Search Index Data Contributor** for read-write access
      - **Search Index Data Reader** for read-only access
3. In n8n, enter only the **Endpoint** URL.
4. Select **Managed Identity (System-Assigned)** as the authentication method.

/// note | When to use System-Assigned Managed Identity
Use SAMI when your n8n instance runs on a single Azure resource and you want the identity to be automatically managed with the resource lifecycle. The identity is automatically deleted when the resource is deleted.
///

## Using Managed Identity (User-Assigned)

User-assigned managed identity (UAMI) allows you to create and manage the identity separately from Azure resources. This identity can be shared across multiple resources and persists independently of resource lifecycles. To configure:

1. Create a user-assigned managed identity in the [Azure Portal](https://portal.azure.com/):
   1. Search for "Managed Identities" and select **Create**.
   2. Provide a name and select your subscription and resource group.
   3. After creation, copy the **Client ID** from the identity's overview page.
2. Assign the identity to your Azure resource (e.g., Azure VM, App Service, Function App).
3. In your Azure AI Search service:
   1. Navigate to **Settings** > **Keys**.
   2. Select **Role-based access control** as the authentication method.
   3. Go to **Access control (IAM)** > **Add role assignment**.
   4. Assign the appropriate role to your user-assigned managed identity:
      - **Search Index Data Contributor** for read-write access
      - **Search Index Data Reader** for read-only access
4. In n8n:
   1. Enter the **Endpoint** URL.
   2. Select **Managed Identity (User-Assigned)** as the authentication method.
   3. Enter the **Client ID** of your user-assigned managed identity.

/// note | When to use User-Assigned Managed Identity
Use UAMI when you need to share the same identity across multiple Azure resources, when you want the identity to persist beyond the lifecycle of individual resources, or when you need more granular control over identity management. This is ideal for enterprise scenarios with multiple n8n instances or complex multi-resource deployments.
///

/// note | Managed Identity availability
Managed identity authentication is only available when n8n is running on Azure infrastructure (Azure VM, App Service, Container Instances, etc.). It won't work for local development or non-Azure deployments.
///

## Understanding Microsoft Entra ID Integration

Managed identity authentication uses Microsoft Entra ID (formerly Azure Active Directory) as the underlying identity platform. When you configure managed identity for Azure AI Search:

- The identity is registered in your Microsoft Entra ID tenant
- Role assignments are managed through Entra ID's Role-Based Access Control (RBAC)
- Authentication tokens are issued by the Microsoft Entra ID token service
- This provides enterprise-grade security with centralized identity management

This integration ensures that your n8n workflows benefit from the same identity and access management policies that govern your organization's other Azure resources.

## Troubleshooting

### Authentication errors

If you encounter authentication errors:

- **API key**: Verify the key is correct and hasn't been regenerated in Azure Portal.
- **System-Assigned Managed Identity**: Ensure the identity is enabled on your Azure resource and has the correct role assignments in both Azure AI Search and Microsoft Entra ID.
- **User-Assigned Managed Identity**: Verify the Client ID is correct, the identity is assigned to your Azure resource, and has proper role assignments. Check that the identity exists in your Microsoft Entra ID tenant.

### Connection issues

- Verify the endpoint URL is correct and includes the protocol (https://).
- Check that your Azure AI Search service is running and accessible.
- Ensure network security rules allow access from your n8n instance.