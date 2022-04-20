# OpenThesaurus

[OpenThesaurus](https://www.openthesaurus.de/) is a free German dictionary for synonyms.

!!! note "🔑 Credentials"
    The OpenThesaurus node does not require authentication.


## Basic Operations

* Get synonyms for a German word in German

## Example Usage

This workflow allows you to get synonyms of a German word in German. You can also find the [workflow](https://n8n.io/workflows/806) on the website. This example usage workflow would use the following nodes.
- [Start](/workflow/integrations/core-nodes/n8n-nodes-base.start/)
- [OpenThesaurus]()

The final workflow should look like the following image.

![A workflow with the OpenThesaurus node](/_images/integrations/nodes/openthesaurus/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. OpenThesaurus node

This node will return synonyms of the word `Hallo` in German. If you want to get synonyms of another German word, use that word instead.

1. Enter `Hallo` in the ***Text*** field.
2. Click on ***Execute Node*** to run the workflow.

In the screenshot below, you will notice that the node returns the synonyms of the word `Hallo`.

![Using the OpenThesaurus node to get the synonyms of the word Hallo](/_images/integrations/nodes/openthesaurus/openthesaurus_node.png)
