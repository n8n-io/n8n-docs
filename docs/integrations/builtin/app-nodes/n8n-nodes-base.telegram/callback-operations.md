---
title: Telegram node Callback operations documentation
contentType:
  - integration
  - reference
priority: critical
nodeTitle: Telegram node Callback operations documentation
originalFilePath: integrations/builtin/app-nodes/n8n-nodes-base.telegram/callback-operations.md
originalUrl: >-
  https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.telegram/callback-operations
url: >-
  https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.telegram/callback-operations
description: >-
  Documentation for the Callback operations in the Telegram node in n8n, a
  workflow automation platform. Includes details to configure all Callback
  operations.
layout:
  width: default
  title:
    visible: true
  description:
    visible: false
  tableOfContents:
    visible: true
  outline:
    visible: true
  pagination:
    visible: true
  metadata:
    visible: true
  tags:
    visible: true
  actions:
    visible: true
---

# Callback operations

Use these operations to respond to callback queries sent from the in-line keyboard or in-line queries. Refer to [Telegram](./) for more information on the Telegram node itself.

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/hLGdVKMP8bGrbsRtVcGc/" %}

## Answer Query <a href="#answer-query" id="answer-query"></a>

Use this operation to send answers to callback queries sent from [inline keyboards](https://core.telegram.org/bots/features#inline-keyboards) using the Bot API [answerCallbackQuery](https://core.telegram.org/bots/api#answercallbackquery) method.

Enter these parameters:

* **Credential to connect with**: Create or select an existing [Telegram credential](../../credentials/telegram.md).
* **Resource**: Select **Callback**.
* **Operation**: Select **Answer Query**.
* **Query ID**: Enter the unique identifier of the query you want to answer.
  * To feed a Query ID directly into this node, use the [Telegram Trigger](../../trigger-nodes/n8n-nodes-base.telegramtrigger/) node triggered on the **Callback Query**.
* **Results**: Enter a JSON-serialized array of results you want to use as answers to the query. Refer to the Telegram [InlineQueryResults](https://core.telegram.org/bots/api#inlinequeryresult) documentation for more information on formatting your array.

Refer to the Telegram Bot API [answerCallbackQuery](https://core.telegram.org/bots/api#answercallbackquery) documentation for more information.

### Answer Query additional fields <a href="#answer-query-additional-fields" id="answer-query-additional-fields"></a>

Use the **Additional Fields** to further refine the behavior of the node. Select **Add Field** to add any of the following:

* **Cache Time**: Enter the maximum amount of time in seconds that the client may cache the result of the callback query. Telegram defaults to `0` seconds for this method.
* **Show Alert**: Telegram can display the answer as a notification at the top of the chat screen or as an alert. Choose whether you want to keep the default notification display (turned off) or display the answer as an alert (turned on).
* **Text**: If you want the answer to show text, enter up to 200 characters of text here.
* **URL**: Enter a URL that will be opened by the user's client. Refer to the **url** parameter instructions at the Telegram Bot API [answerCallbackQuery](https://core.telegram.org/bots/api#answercallbackquery) documentation for more information.

## Answer Inline Query <a href="#answer-inline-query" id="answer-inline-query"></a>

Use this operation to send answers to callback queries sent from inline queries using the Bot API [answerInlineQuery](https://core.telegram.org/bots/api#answerinlinequery) method.

Enter these parameters:

* **Credential to connect with**: Create or select an existing [Telegram credential](../../credentials/telegram.md).
* **Resource**: Select **Callback**.
* **Operation**: Select **Answer Inline Query**.
* **Query ID**: Enter the unique identifier of the query you want to answer.
  * To feed a Query ID directly into this node, use the [Telegram Trigger](../../trigger-nodes/n8n-nodes-base.telegramtrigger/) node triggered on the **Inline Query**.
* **Results**: Enter a JSON-serialized array of results you want to use as answers to the query. Refer to the Telegram [InlineQueryResults](https://core.telegram.org/bots/api#inlinequeryresult) documentation for more information on formatting your array.

Telegram allows a maximum of 50 results per query.

Refer to the Telegram Bot API [answerInlineQuery](https://core.telegram.org/bots/api#answerinlinequery) documentation for more information.

### Answer Inline Query additional fields <a href="#answer-inline-query-additional-fields" id="answer-inline-query-additional-fields"></a>

Use the **Additional Fields** to further refine the behavior of the node. Select **Add Field** to add any of the following:

* **Cache Time**: The maximum amount of time in seconds that the client may cache the result of the callback query. Telegram defaults to `300` seconds for this method.
* **Show Alert**: Telegram can display the answer as a notification at the top of the chat screen or as an alert. Choose whether you want to keep the default notification display (turned off) or display the answer as an alert (turned on).
* **Text**: If you want the answer to show text, enter up to 200 characters of text here.
* **URL**: Enter a URL that the user's client will open.
