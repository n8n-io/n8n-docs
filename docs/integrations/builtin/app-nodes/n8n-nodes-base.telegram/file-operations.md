---
title: Telegram node File operations documentation
description: >-
  Documentation for the File operations in the Telegram node in n8n, a workflow
  automation platform. Includes details to configure all File operations.
contentType:
  - integration
  - reference
priority: critical
nodeTitle: Telegram node File operations documentation
originalFilePath: integrations/builtin/app-nodes/n8n-nodes-base.telegram/file-operations.md
originalUrl: >-
  https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.telegram/file-operations
url: >-
  https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.telegram/file-operations
layout:
  description:
    visible: false
---

# Telegram node File operations <a href="#telegram-node-file-operations" id="telegram-node-file-operations"></a>

Use this operation to get a file from Telegram. Refer to [Telegram](README.md) for more information on the Telegram node itself.

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/hLGdVKMP8bGrbsRtVcGc/" %}

## Get File <a href="#get-file" id="get-file"></a>

Use this operation to get a file from Telegram using the Bot API [getFile](https://core.telegram.org/bots/api#getfile) method.

Enter these parameters:

* **Credential to connect with**: Create or select an existing [Telegram credential](../../credentials/telegram.md).
* **Resource**: Select **File**.
* **Operation**: Select **Get**.
* **File ID**: Enter the ID of the file you want to get.
* **Download**: Choose whether you want the node to download the file (turned on) or not (turned off).

Refer to the Telegram Bot API [getFile](https://core.telegram.org/bots/api#getfile) documentation for more information.
