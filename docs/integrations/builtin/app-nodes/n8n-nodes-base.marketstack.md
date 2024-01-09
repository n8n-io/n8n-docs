---
title: marketstack
description: Documentation for the marketstack node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
contentType: integration
---
<!-- marketstack is not a typo. The brand name is all lowercase, so we match it -->
# marketstack

Use the marketstack node to automate work in marketstack, and integrate marketstack with other applications. n8n has built-in support for a wide range of marketstack features, including getting exchanges, end-of-day data, and tickers. 

On this page, you'll find a list of operations the marketstack node supports and links to more resources.

/// note | Credentials
Refer to [marketstack credentials](/integrations/builtin/credentials/marketstack/) for guidance on setting up authentication. 
///
/// note | Examples and templates
For usage examples and templates to help you get started, take a look at n8n's [marketstack integrations](https://n8n.io/integrations/marketstack/){:target="_blank" .external-link} list.
///

## Basic operations

* End-of-Day Data
    * Get All
* Exchange
    * Get
* Ticker
    * Get

## Example usage

This workflow allows you to get the past week's end of day data for a desired stock symbol. This example usage workflow uses the following two nodes.

- [Start](/integrations/builtin/core-nodes/n8n-nodes-base.start/)
- [marketstack]()

The final workflow should look like the following image.

![A workflow with the marketstack node](/_images/integrations/builtin/app-nodes/marketstack/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. marketstack node

1. First enter your credentials for the marketstack node. You can find out how to do that [here](/integrations/builtin/credentials/marketstack/).
2. Select **End-of-Day Data** from the *Resource* dropdown.
3. The **Get All** *Operation* is selected by default.
4. Enter your desired ticker symbol, `AI` in our example.
5. Click the **Add Filter** button and select **Timeframe Start Date > A Week Ago**.
6. Click the **Add Filter** button and select **Timeframe End Date > Today**.
3. Click on **Execute Node** to run the workflow.

![The marketstack node](/_images/integrations/builtin/app-nodes/marketstack/marketstack_node.png)

