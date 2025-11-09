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

- An [Azure subscription](https://azure.microsoft.com)
- An Azure AI Search service created in the [Azure Portal](https://portal.azure.com/)
- Appropriate authentication configured (API key or managed identity)

## Supported authentication methods

- API key
- Managed identity (system-assigned)
- Managed identity (user-assigned)

## Related resources

Refer to [Azure AI Search documentation](https://learn.microsoft.com/azure/search/) for more information about the service.

## Using API key

To configure this credential, you'll need:

- **Endpoint**: Your Azure AI Search service URL (format: `https://your-service.search.windows.net`)
- **API Key**: Admin key (read-write) or query key (read-only)

To get these values:

1. Navigate to your Azure AI Search service in the [Azure Portal](https://portal.azure.com/)
2. Copy the **URL** from the **Overview** section
3. Go to **Settings** > **Keys** and copy:
   - **Admin key** for full read-write access, or
   - **Query key** for read-only querying
4. Enter these values in n8n

/// note | API key permissions
Admin keys provide full access including index creation and deletion. Query keys provide read-only access. Choose based on your workflow requirements.
///

## Using Managed Identity (System-Assigned)

System-assigned managed identity (SAMI) is automatically created with your Azure resource and follows its lifecycle. Use this for single-resource scenarios.

To configure:

1. Enable system-assigned managed identity on your Azure resource (VM, App Service, Container Instance, etc.)
2. In your Azure AI Search service:
   1. Go to **Settings** > **Keys**
   2. Enable **Role-based access control**
   3. Go to **Access control (IAM)** > **Add role assignment**
   4. Assign one of these roles to your system-assigned managed identity:
      - **Search Index Data Contributor** (read-write)
      - **Search Index Data Reader** (read-only)
3. In n8n:
   1. Enter the **Endpoint** URL
   2. Select **Managed Identity (System-Assigned)**

/// note | Credential test behavior
The managed identity credential test will fail in n8n's credential interface, but this is expected. The test uses HTTP requests that cannot authenticate with Azure's SDK-based token credential. The credentials will work correctly when the node executes.
///

/// note | When to use SAMI
Use SAMI when n8n runs on a single Azure resource and you want automatic identity lifecycle management. The identity is deleted when the resource is deleted.
///

## Using Managed Identity (User-Assigned)

User-assigned managed identity (UAMI) is created independently and can be shared across multiple resources. Use this for multi-resource deployments or when you need identity persistence beyond resource lifecycles.

To configure:

1. Create a user-assigned managed identity:
   1. In [Azure Portal](https://portal.azure.com/), search for "Managed Identities"
   2. Click **Create**
   3. Provide name, subscription, and resource group
   4. After creation, copy the **Client ID**
2. Assign the identity to your Azure resource
3. In your Azure AI Search service:
   1. Go to **Settings** > **Keys**
   2. Enable **Role-based access control**
   3. Go to **Access control (IAM)** > **Add role assignment**
   4. Assign one of these roles to your user-assigned managed identity:
      - **Search Index Data Contributor** (read-write)
      - **Search Index Data Reader** (read-only)
4. In n8n:
   1. Enter the **Endpoint** URL
   2. Select **Managed Identity (User-Assigned)**
   3. Enter the **Client ID**

/// note | Credential test behavior
Like system-assigned, the credential test will fail for user-assigned managed identity. This is expected—the credentials work correctly at runtime when the node executes.
///

/// note | When to use UAMI
Use UAMI for multi-instance deployments, when identity should persist independently of resources, or when you need centralized identity management across multiple Azure resources.
///

/// note | Managed identity availability
Managed identity authentication requires n8n to run on Azure infrastructure (VM, App Service, Container Instances, Functions, etc.). It won't work for local development or non-Azure environments.

For local testing, use `az login` to authenticate via Azure CLI—the Azure SDK will use CLI credentials as a fallback.
///

## Understanding Microsoft Entra ID Integration

Managed identity authentication uses Microsoft Entra ID (formerly Azure Active Directory) for identity and access management:

- Identities are registered in your Entra ID tenant
- Role assignments use Entra ID Role-Based Access Control (RBAC)
- Authentication tokens are issued by the Entra ID token service
- Centralized identity governance with enterprise security policies

This provides the same identity and access management for n8n workflows as your other Azure resources.

## Troubleshooting

### Credential test failures

**Managed identity credential tests fail**: This is expected behavior. The test uses HTTP requests that cannot authenticate with Azure SDK token credentials. The credentials work correctly when nodes execute.

### Authentication errors

- **API key**: Verify the key is correct and hasn't been regenerated
- **System-Assigned Managed Identity**:
  - Confirm identity is enabled on your Azure resource
  - Verify correct role assignments in Azure AI Search IAM
  - Check that the Azure resource has network access to the search service
- **User-Assigned Managed Identity**:
  - Verify the Client ID is correct
  - Confirm identity is assigned to your Azure resource
  - Check role assignments in both Azure AI Search and Entra ID
  - Ensure the identity exists in your Entra ID tenant

### Connection issues

- Verify endpoint URL format: `https://your-service.search.windows.net`
- Confirm Azure AI Search service is running
- Check network security rules and firewall settings allow access from your n8n instance
- For managed identity, verify the Azure resource can reach Azure services
