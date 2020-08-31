---
permalink: /nodes/n8n-nodes-base.hubspotTrigger
---

# Hubspot Trigger

[HubSpot](https://www.hubspot.com/) provides tools for social media marketing, content management, web analytics, landing pages, customer support, and search engine optimization.

::: tip 🔑 Credentials
You can find authentication information for this node [here](../../../credentials/Hubspot/README.md).

Note that for this node, you will have to retrieve the App ID and Client Secret using the OAuth instructions in addition to the Developer API Key.
:::


## Example Usage

This workflow allows you to receive updates when a new contact is created in HubSpot. You can also find the [workflow](https://n8n.io/workflows/628) on the website. This example usage workflow would use the following node.
- [HubSpot Trigger]()

The final workflow should look like the following image.

![A workflow with the HubSpot Trigger node](./workflow.png)


### 1. HubSpot Trigger node

1. First of all, you'll have to enter credentials for the HubSpot Trigger node. You can find out how to do that [here](../../../credentials/Hubspot/README.md).
2. Enter the HubSpot App ID in the ***App ID*** field.
3. Click on ***Execute Node*** to run the workflow.
