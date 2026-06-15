---
title: TrueFoundry AI Gateway credentials
description: Documentation for the TrueFoundry AI Gateway credentials. Use these credentials to authenticate the TrueFoundry AI Gateway in n8n, a workflow automation platform.
contentType: [integration, reference]
priority: critical
---


# TrueFoundry AI Gateway credentials

You can use these credentials to authenticate the following nodes:

- [Chat TrueFoundry AI Gateway](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchattruefoundry.md)

## Prerequisites

Create a [TrueFoundry](https://truefoundry.com/) account.

## Supported authentication methods

- API key

## Related resources

Click [here](https://www.truefoundry.com/ai-gateway) to learn more about the TrueFoundry AI Gateway. Refer to the [TrueFoundry AI Gateway documentation](https://docs.truefoundry.com/ai-gateway/intro-to-llm-gateway) for more information about the service. 

## Using API key

To configure this credential, you'll need:

- An **API Key**

### Virtual Access Token:

1. [Login to TrueFoundry](https://truefoundry.com/login) or, [create an account](https://truefoundry.com/register) and click on the **Setup AI Gateway** card.
2. Go to the left sidebar and select the **Access** tab.
3. Visit **Virtual Accounts** in the **Access** tab.
4. Click on the **Add Permission** button.
5. Search for a pre-existing Model Provider Account.
6. Choose the Role for this Provider Account.
7. Add more Provider Accounts, if needed, and then click on the **Generate Virtual Account** button to create the Virtual Account.
8. Copy your key and add it as the **API Key** in n8n.

### Personal Access Token:

1. [Login to TrueFoundry](https://truefoundry.com/login) or, [create an account](https://truefoundry.com/register) and click on the **Setup AI Gateway** card.
2. Go to the left sidebar and select the **Access** tab.
3. Visit **Personal Access Tokens** in the **Access** tab.
4. Click on the **New Personal Access Token** button.
5. Specify the **Name** and optionally, an **Expiration Date**.
6. Copy your key and add it as the **API Key** in n8n.

For more information on Access Control in the Gateway, click [here](https://docs.truefoundry.com/ai-gateway/gateway-access-control).
