---
permalink: /nodes/n8n-nodes-base.securityScorecard
description: Learn how to use the SecurityScorecard node in n8n
---

# SecurityScorecard

[SecurityScorecard](https://securityscorecard.com) enables organizations to prove and maintain compliance with leading regulations and standards mandates that include PCI, NIST, SOX, GDPR, and many others.

::: tip 🔑 Credentials
You can find authentication information for this node [here](../../../credentials/SecurityScorecard/README.md).
:::

## Basic Operations

::: details Company
- Get company factor scores and issue counts
- Get a company's historical factor scores
- Get a company's historical scores
- Get company information and a summary of their scorecard
- Get a company's score improvement plan
:::

::: details Industry
- Get factor scores
- Get historical factor scores
- Get score
:::

::: details Invite
- Crean an invite for a company/user
:::

::: details Portfolio
- Create a portfolio
- Delete a portfolio
- Get all portfolios
- Update a portfolio
:::

::: details Portfolio Company
- Add a company to a portfolio
- Get all companies in a portfolio
- Remove a company from a portfolio
:::

::: details Report
- Download a generated report
- Generate a report
- Get a list of the recently generated report
:::

## Example Usage

This workflow allows you to generate, retrieve, and download a report using the SecurityScorecard node. You can also find the [workflow](https://n8n.io/workflows/920) on n8n.io. This example usage workflow uses the following nodes.
- [Start](../../core-nodes/Start/README.md)
- [SecurityScorecard]()

The final workflow should look like the following image.

![A workflow with the SecurityScorecard node](./workflow.png)

### 1. Start node

The Start node exists by default when you create a new workflow.

### 2. SecurityScorecard node (generate: report)

This node will generate a full scorecard report for a company that we specify.

1. First of all, you'll have to enter credentials for the SecurityScorecard node. You can find out how to do that [here](../../../credentials/SecurityScorecard/README.md).
2. Select 'Report' from the ***Resource*** dropdown list.
3. Select 'Generate' from the ***Operation*** dropdown list.
4. Select 'Full Scorecard' from the ***Report*** dropdown list.
5. Enter the domain of the company in the ***Scorecard Identifier*** field.
6. Click on ***Execute Node*** to run the node.

In the screenshot below, you will notice that the node generates a full scorecard report of `n8n.io`.

![Using the SecurityScorecard node to create full scorecard report](./SecurityScorecard_node.png)

### 3. SecurityScorecard1 node (getAll: report)

This node will return a report from SecurityScorecard.

1. Select the credentials that you entered in the previous node.
2. Select 'Report' from the ***Resource*** dropdown list.
3. Select 'Get All' from the ***Operation*** dropdown list.
4. Enter `1` in the ***Limit*** field. By setting it to one, the node will return a single report.
5. Click on ***Execute Node*** to run the node.

In the screenshot below, you will notice that the node returns a report from SecurityScroecard.

![Using the SecurityScorecard node to get a report](./SecurityScorecard1_node.png)

### 4. SecurityScorecard2 node (download: report)

This node will download the report that got returned by the previous node.
::: v-pre
1. Select the credentials that you entered in the previous node.
2. Select 'Report' from the ***Resource*** dropdown list.
3. Select 'Download' from the ***Operation*** dropdown list.
4. Click on the gears icon next to the ***Report URL*** field and click on ***Add Expression***.
5. Select the following in the ***Variable Selector*** section: Current Node > Input Data > JSON > download_url. You can also add the following expression: `{{$json["download_url"]}}`.
6. Click on ***Execute Node*** to run the node.
:::

In the screenshot below, you will notice that the node downloads the report that was returned by the previous node.

![Using the SecurityScorecard node to download a report](./SecurityScorecard2_node.png)
