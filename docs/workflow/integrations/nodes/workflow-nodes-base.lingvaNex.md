# LingvaNex

[LingvaNex](https://lingvanex.com) is a service that translates text, web pages, text on images, documents between English and over 112 other languages.

!!! note "🔑 Credentials"
    You can find authentication information for this node [here](/workflow/integrations/credentials/lingvaNex/).


## Basic Operations

- Translate data

## Example Usage

This workflow allows you to translate cocktail instructions to Italian. You can also find the [workflow](https://n8n.io/workflows/797) on Workflow².io. This example usage workflow uses the following nodes.
- [Start](/workflow/integrations/core-nodes/n8n-nodes-base.start/)
- [HTTP Request](/workflow/integrations/core-nodes/n8n-nodes-base.httpRequest/)
- [LingvaNex]()

The final workflow should look like the following image.

![A workflow with the LingvaNex node](/_images/integrations/nodes/lingvanex/workflow.png)

### 1. Start node

The Start node exists by default when you create a new workflow.

### 2. HTTP Request node (GET)

This node will make a GET request to the API `https://www.thecocktaildb.com/api/json/v1/1/random.php` to fetch a random cocktail. This information gets passed on to the next node in the workflow.

1. Enter `https://www.thecocktaildb.com/api/json/v1/1/random.php` in the ***URL*** field.
2. Click on ***Execute Node*** to run the node.

In the screenshot below, you will notice that the node makes a GET request to the API and returns information about a random cocktail.

![Using the HTTP Request node to get the information about a random cocktail](/_images/integrations/nodes/lingvanex/httprequest_node.png)

### 3. LingvaNex node

This node will translate the cocktail instructions that we got from the previous node to Italian. To translate the instructions in your language, select your language instead.

1. First of all, you'll have to enter credentials for the LingvaNex node. You can find out how to do that [here](/workflow/integrations/credentials/lingvaNex/).

2. Click on the gears icon next to the ***Text*** field and click on ***Add Expression***.
3. Select the following in the ***Variable Selector*** section: Nodes > HTTP Request > Output Data > JSON > drinks > [item: 0] > strInstructions. You can also add the following expression: `{{$node["HTTP Request"].json["drinks"][0]["strInstructions"]}}`.
4. Select 'Italian' from the ***Translate To*** dropdown list.
5. Click on ***Execute Node*** to run the node.

In the screenshot below, you will notice that the node translates the instructions of the cocktail to Italian.

![Using the LingvaNex node to translate the instructions to Italian](/_images/integrations/nodes/lingvanex/lingvanex_node.png)




