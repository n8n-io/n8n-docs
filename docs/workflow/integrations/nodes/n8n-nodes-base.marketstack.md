# Marketstack

[Marketstack](https://marketstack.com/) is a REST API that provides stock market data in JSON format. 

!!! note "🔑 Credentials"
    You can find authentication information for this node [here](/workflow/integrations/credentials/marketstack/).


## Basic operations

* End-of-Day Data
    * Get All
* Exchange
    * Get
* Ticker
    * Get

## Example usage

This workflow allows you to get the past week's end of day data for a desired stock symbol. This example usage workflow uses the following two nodes.

- [Start](/workflow/integrations/core-nodes/n8n-nodes-base.start/)
- [Marketstack]()

The final workflow should look like the following image.

![A workflow with the Marketstack node](/_images/integrations/nodes/marketstack/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Marketstack node

1. First enter your credentials for the Marketstack node. You can find out how to do that [here](/workflow/integrations/credentials/marketstack/).
2. Select **End-of-Day Data** from the *Resource* dropdown.
3. The **Get All** *Operation* is selected by default.
4. Enter your desired ticker symbol, `AI` in our example.
5. Click the **Add Filter** button and select **Timeframe Start Date > A Week Ago**.
6. Click the **Add Filter** button and select **Timeframe End Date > Today**.
3. Click on **Execute Node** to run the workflow.

![The Marketstack node](/_images/integrations/nodes/marketstack/marketstack_node.png)
