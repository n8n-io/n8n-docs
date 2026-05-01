---
title: Brandfetch node documentation
description: Learn how to use the Brandfetch node in n8n. Follow technical documentation to integrate Brandfetch node into your workflows.
contentType: [integration, reference]
---

# Brandfetch node

Use the Brandfetch node to automate work in Brandfetch, and integrate Brandfetch with other applications. n8n has built-in support for a wide range of Brandfetch features, including retrieving logos, and colors and brand data.

On this page, you'll find a list of operations the Brandfetch node supports and links to more resources.

/// note | Credentials
Refer to [Brandfetch credentials](/integrations/builtin/credentials/brandfetch.md) for guidance on setting up authentication. 
///

## Operations

* **Return Logos, Symbols and Icon**: Get all logo variants for a brand, including symbols and icons.
* **Return Accent and Brand Colors**: Get the accent and brand color palette for a brand.
* **Return All of a Brand's Data**: Get all available Brandfetch attributes, including name, description, logos, colors, company data and more.

## Identifier types

Both operations require you to identify the brand using a **Type** and an **Identifier**.

Select a **Type** from the following options:

* **Domain**: A company's website domain, for example `n8n.io`.
* **Stock/ETF Ticker**: A stock or ETF ticker symbol, for example `AAPL`.
* **Crypto Symbol**: A crypto symbol, for example `BTC`.
* **ISIN**: An International Securities Identification Number, for example `US0378331005`.

Enter the corresponding value in the **Identifier** field.

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'brandfetch') ]]
