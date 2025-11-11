---
title: CSVbox credentials
description: Documentation for CSVbox credentials. Use these credentials to authenticate CSVbox in n8n, a workflow automation platform.
contentType: [integration, reference]
---

# CSVbox credentials

Use CSVbox credentials in n8n to authenticate the following nodes:

- [CSVbox Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.csvboxtrigger.md)

## Prerequisites

- A [CSVbox](https://app.csvbox.io/) account
- Access to the **API Keys** section in your CSVbox dashboard

## Supported authentication method

- API Key and Secret API Key

## Obtaining your credentials

1. Log in to your [CSVbox dashboard](https://app.csvbox.io/)
2. Click the menu icon in the top-right corner and select **API Keys**
3. You'll see your **API Key** and **Secret API Key** displayed
4. Copy both keys (you'll need them to configure n8n)

## Configuring CSVbox credentials in n8n

1. In n8n, go to **Credentials**
2. Click **+ Create New** to create new credentials
3. Select **CSVbox** from the list
4. Enter the following information:
   - **API Key**: Paste the API Key from your CSVbox dashboard
   - **Secret API Key**: Paste the Secret API Key from your CSVbox dashboard
5. Click **Create** to save your credentials

## Testing your credentials

After configuring your CSVbox credentials, n8n will automatically test the connection. If the test is successful, your credentials are ready to use.

## Additional information

- [CSVbox API documentation](https://help.csvbox.io/)
- [CSVbox official website](https://csvbox.io)