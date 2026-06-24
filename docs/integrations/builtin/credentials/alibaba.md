---
title: Alibaba Cloud credentials
description: >-
  Documentation for Alibaba Cloud credentials. Use these credentials to
  authenticate Alibaba Cloud in n8n, a workflow automation platform.
contentType:
  - integration
  - reference
priority: medium
nodeTitle: Alibaba Cloud credentials
originalFilePath: integrations/builtin/credentials/alibaba.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/credentials/alibaba'
url: 'https://docs.n8n.io/integrations/builtin/credentials/alibaba'
layout:
  description:
    visible: false
---

# Alibaba Cloud credentials <a href="#alibaba-cloud-credentials" id="alibaba-cloud-credentials"></a>

You can use these credentials to authenticate the following nodes:

- [Alibaba Cloud Model Studio](../app-nodes/n8n-nodes-langchain.alibabacloud.md)
- [Alibaba Cloud Chat Model](../cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatalibabacloud.md)

## Prerequisites <a href="#prerequisites" id="prerequisites"></a>

Create an [Alibaba Cloud](https://www.alibabacloud.com/) account and activate [Model Studio](https://www.alibabacloud.com/en/product/modelstudio).

## Supported authentication methods <a href="#supported-authentication-methods" id="supported-authentication-methods"></a>

- API key

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [Alibaba Cloud Model Studio's documentation](https://www.alibabacloud.com/help/en/model-studio/) for more information about the service.

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/TbnZmZEDZnkAWTXWp8th/" %}

## Using API key <a href="#using-api-key" id="using-api-key"></a>

To configure this credential, you'll need:

- An **API Key**

1. Sign in to the [Alibaba Cloud Model Studio console](https://modelstudio.console.alibabacloud.com/).
2. In the top right of the screen, select your target region.
3. In the top menu, select **Dashboard**, then in the side menu, **API Key**.
4. Select **Create API Key**.
5. In the dialog box, select a workspace and key description, then select **OK**.
6. Copy the API key (it displays only once), and enter it in your n8n credential.
7. Ensure the region of your n8n credential matches the region you selected in the Alibaba Cloud Model Studio console.

Refer to [Alibaba Cloud's API key documentation](https://www.alibabacloud.com/help/en/model-studio/developer-reference/get-api-key) for more information.
