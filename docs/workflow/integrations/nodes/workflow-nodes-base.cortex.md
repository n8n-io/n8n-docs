# Cortex

[Cortex](https://github.com/TheHive-Project/CortexDocs) offers a powerful observable (URL, file, IP, etc) analysis mechanism. It allows you to analyze collected observables using a single tool, respond to threats, and interact with the constituency and other teams.

!!! note "🔑 Credentials"
    You can find authentication information for this node [here](/workflow/integrations/credentials/cortex/).


## Basic Operations

* Analyzer
    * Execute Analyzer
* Job
    * Get job details
    * Get job report
* Responder
    * Execute Responder

## Example Usage

This workflow allows you to analyze a URL and get the job details using the Cortex node. You can also find the [workflow](https://n8n.io/workflows/809) on Workflow².io. This example usage workflow would use the following nodes.
- [Start](/workflow/integrations/core-nodes/n8n-nodes-base.start/)
- [Cortex]()

The final workflow should look like the following image.

![A workflow with the Cortex node](/_images/integrations/nodes/cortex/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Cortex node (analyzer: execute)

This node will analyze a URL. If you want to analyze a different observable type, select that instead.

1. First of all, you'll have to enter credentials for the Cortex node. You can find out how to do that [here](/workflow/integrations/credentials/cortex/).
2. Select 'Abuse_Finder_3_0' from the ***Analyzer Type*** dropdown list.
3. Select 'URL' from the ***Observable Type*** dropdown list.
4. Enter the URL you want to analyze in the ***Observable Value*** field.
5. Click on ***Execute Node*** to run the node.

In the screenshot below, you will notice that the node starts the analysis of the URL.

![Using the Cortex node to analyze a URL](/_images/integrations/nodes/cortex/cortex_node.png)

### 3. Cortex1 node (job: get)

This node will return the job details for the analysis that we executed in the previous node.

1. Select the credentials that you entered in the previous node.
2. Select 'Job' from the ***Resource*** dropdown list.
3. Click on the gears icon next to the ***Job ID*** field and click on ***Add Expression***.
4. Select the following in the ***Variable Selector*** section: Nodes > Cortex > Output Data > JSON > _id. You can also add the following expression: `{{$node["Cortex"].json["_id"]}}`.
5. Click on ***Execute Node*** to run the node.

In the screenshot below, you will notice that the node starts the analysis of the URL.

![Using the Cortex node to get job details](/_images/integrations/nodes/cortex/cortex1_node.png)
