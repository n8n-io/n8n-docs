---
title: Telegram node File operations documentation
description: Documentation for the File operations in the Telegram node in n8n, a workflow automation platform. Includes details to configure all File operations.
contentType: [integration, reference]
priority: critical
---

# Telegram node File operations

Use this operation to get a file from Telegram. Refer to [Telegram](/integrations/builtin/app-nodes/n8n-nodes-base.telegram/index.md) for more information on the Telegram node itself.

--8<-- "_snippets/integrations/builtin/app-nodes/ai-tools.md"

## Get File

Use this operation to get a file from Telegram using the Bot API [getFile](https://core.telegram.org/bots/api#getfile) method.

Enter these parameters:

* **Credential to connect with**: Create or select an existing [Telegram credential](/integrations/builtin/credentials/telegram.md).
* **Resource**: Select **File**.
* **Operation**: Select **Get**.
* **File ID**: Enter the ID of the file you want to get.
* **Download**: Choose whether you want the node to download the file (turned on) or not (turned off).

Refer to the Telegram Bot API [getFile](https://core.telegram.org/bots/api#getfile) documentation for more information.
