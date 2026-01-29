---
title: Microsoft Agent 365 credentials
description: Documentation for Microsoft Agent 365 credentials. Use these credentials to authenticate Microsoft Agent 365 in n8n, a workflow automation platform.
contentType: [integration, reference]
priority: medium
---

# Microsoft Agent 365 credentials

You can use these credentials to authenticate the following nodes:

- [Microsoft Agent 365 Trigger](/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.microsoftagent365trigger/)

/// warning | Early preview
Microsoft Agent 365 is an early preview feature. You need to be part of the [Frontier preview program](https://adoption.microsoft.com/copilot/frontier-program/) to get early access.
///

## Prerequisites

- Enrollment in the [Microsoft Frontier preview program](https://adoption.microsoft.com/copilot/frontier-program/)
- A [Microsoft Azure](https://azure.microsoft.com/) account
- An Agent 365 blueprint created using the Agent 365 CLI

## Supported authentication methods

- OAuth2 (App Registration)

## Related resources

Refer to [Microsoft Agent 365 developer documentation](https://learn.microsoft.com/en-us/microsoft-agent-365/developer/) for more information about the service.

## Using OAuth2

To configure this credential, you'll need:

- **Tenant ID**: Your Microsoft Entra tenant ID
- **Client ID**: The Application (client) ID from your Azure app registration
- **Client Secret**: The secret generated for your app registration

To set up the credential:

1. Find your Tenant ID in [Microsoft Entra ID](https://entra.microsoft.com/#home) and copy it into n8n as the **Tenant ID**.
2. Open the [Microsoft Application Registration Portal](https://aka.ms/appregistrations) and follow the [custom client app registration guide](https://learn.microsoft.com/en-us/microsoft-agent-365/developer/custom-client-app-registration) for Microsoft Agent 365. Once your custom client app is created, copy the Application (client) ID into n8n as the **Client ID**.
3. Follow the [credentials guide](https://learn.microsoft.com/en-us/entra/identity-platform/how-to-add-credentials?tabs=client-secret) to generate a client secret and copy the **Secret** in the **Value** column and paste it into n8n as the **Client Secret**.

We recommend using [Agent 365 CLI](https://learn.microsoft.com/en-us/microsoft-agent-365/developer/agent-365-cli) to create your agent blueprint and manifest. You can find more details in the [n8n Sample Agent repository](https://github.com/microsoft/Agent365-Samples/tree/main/nodejs/n8n/sample-agent) for Microsoft Agent 365.
