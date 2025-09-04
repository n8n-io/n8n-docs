---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Mindee credentials (Legacy)
description: Documentation for Mindee credentials. Use these credentials to authenticate Mindee in n8n, a workflow automation platform.
contentType: [integration, reference]
---

# Mindee credentials

/// warning | Deprecated
This page documents the usage for the **Mindee V1 credentials**, which are now considered **deprecated**.
To use V2 credentials, please use the **[MindeeV2 credentials](/integrations/builtin/credentials/mindeeV2.md)** instead.
///

You can use these credentials to authenticate the following nodes:

- [MindeeV2](/integrations/builtin/app-nodes/n8n-nodes-base.mindeeV2.md)

## Prerequisites

Have a [Mindee](https://platform.mindee.com) account.
/// Note | Legacy accounts
Creation of new legacy accounts is no longer possible.
To create a new Mindee V2 account, head to the [new Mindee interface](https://app.mindee.com).
///

## Supported authentication methods

- Invoice API key: For use with the [Invoice OCR API](https://www.mindee.com/product/invoice-ocr-api)
- Receipt API key: For use with the [Receipt OCR API](https://www.mindee.com/product/receipt-ocr-api-copy)

## Related resources

Refer to [Mindee's Invoice OCR API documentation](https://developers.mindee.com/docs/invoice-ocr) and [Mindee's Receipt OCR API documentation](https://developers.mindee.com/docs/receipt-ocr) for more information about each service.

## Using invoice API key

To configure this credential, you'll need:

- An **API Key**: Refer to the Mindee [Create & Manage API Keys documentation](https://developers.mindee.com/docs/create-api-key) for instructions on creating API keys.

## Using receipt API key

To configure this credential, you'll need:

- An **API Key**: Refer to the Mindee [Create & Manage API Keys documentation](https://developers.mindee.com/docs/create-api-key) for instructions on creating API keys.

