---
title: Alibaba Cloud credentials
description: Documentation for Alibaba Cloud credentials. Use these credentials to authenticate Alibaba Cloud in n8n, a workflow automation platform.
contentType: [integration, reference]
priority: medium
---

# Alibaba Cloud credentials

You can use these credentials to authenticate the following nodes:

- [Alibaba Cloud Model Studio](/integrations/builtin/app-nodes/n8n-nodes-langchain.n8n-nodes-langchain.alibabacloud.md)
- [Alibaba Cloud Chat Model](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatalibabacloud.md)

## Prerequisites

Create an [Alibaba Cloud](https://www.alibabacloud.com/){:target="_blank" .external-link} account and activate [Model Studio](https://www.alibabacloud.com/en/product/modelstudio){:target="_blank" .external-link}.

## Supported authentication methods

- API key

## Related resources

Refer to [Alibaba Cloud Model Studio's documentation](https://www.alibabacloud.com/help/en/model-studio/){:target="_blank" .external-link} for more information about the service.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"

## Using API key

To configure this credential, you'll need:

- An **API Key**

1. Sign in to the [Alibaba Cloud Model Studio console](https://modelstudio.console.alibabacloud.com/){:target="_blank" .external-link}.
2. In the top right of the screen, select your target region.
3. In the top menu, select **Dashboard**, then in the side menu, **API Key**.
4. Select **Create API Key**.
5. In the dialog box, select a workspace and key description, then select **OK**.
6. Copy the API key (it displays only once), and enter it in your n8n credential.
7. Ensure the region of your n8n credential matches the region you selected in the Alibaba Cloud Model Studio console.

Refer to [Alibaba Cloud's API key documentation](https://www.alibabacloud.com/help/en/model-studio/developer-reference/get-api-key){:target="_blank" .external-link} for more information.
