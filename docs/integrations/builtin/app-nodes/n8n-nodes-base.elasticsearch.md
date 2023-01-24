# Elasticsearch

[Elasticsearch](https://elastic.co){:target="_blank" .external-link} node allows you to automate work in the Elasticsearch platform and integrate Elasticsearch with other applications. n8n has built-in support for a wide range of Elasticsearch features, which includes basic operations like creating, updating, deleting, and getting documents and indexes. 

On this page, you'll find a list of operations the Elasticsearch node supports and links to more resources.

!!! note "Credentials"
    Refer to the [Elasticsearch credentials](https://docs.n8n.io/integrations/builtin/credentials/elasticsearch/){:target="_blank" .external-link} for guidance on setting up authentication. 

!!! note "Examples and templates"
    For example, usage and templates to help you get started, take a look at n8n's [Elasticsearch integrations](https://n8n.io/integrations/elasticsearch/){:target="_blank" .external-link} list.


## Basic operations

* Document
    * Create a document
    * Delete a document
    * Get a document
    * Get all documents
    * Update a document
* Index
    * Create
    * Delete
    * Get
    * Get All

## Example usage

This workflow allows you to get all documents for a selected index. This example usage workflow uses the following nodes.
- [Start](/integrations/builtin/core-nodes/n8n-nodes-base.start/)
- [Elasticsearch]()

The final workflow should look like the following image.

![A workflow with the Elasticsearch node](/_images/integrations/builtin/app-nodes/elasticsearch/workflow.png)

### 1. Start node

The Start node exists by default when you create a new workflow.

### 2. Elasticsearch node

1. First enter credentials for the Elasticsearch node. You can find out how to do that [here](/integrations/builtin/credentials/elasticsearch/).
2. Select **Document** from the ***Resource*** dropdown.
3. Select **Get All** from the ***Operation*** dropdown.
3. Enter the ID of your desired index in the ***Index ID*** field.
4. Click on ***Execute Node*** to run the node.

![Using the Elasticsearch node ](/_images/integrations/builtin/app-nodes/elasticsearch/elasticsearch_node.png)
