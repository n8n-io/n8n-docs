# Google Translate

[Google Translate](https://translate.google.com/) is a free multilingual translation service developed by Google to translate text and websites from one language into another.

!!! note "Credentials"
    You can find authentication information for this node [here](/integrations/credentials/google/).


## Basic Operations

* Language
    * Translate data

## Example Usage

This workflow allows you to translate text from English to German using the Google Translate node. You can also find the [workflow](https://n8n.io/workflows/743) on the website. This example usage workflow uses the following nodes.
- [Start](/integrations/core-nodes/n8n-nodes-base.start/)
- [Google Translate]()

The final workflow should look like the following image.

![A workflow with the Google Translate node](/_images/integrations/nodes/googletranslate/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Google Translate node (translate:language)

This node will translate the text `Hello from n8n!` to German. You can enter a different text as well as select another language to translate the text to.

1. Select 'OAuth2' from the ***Authentication*** dropdown list.
2. Next, you'll have to enter credentials for the Google Translate node. You can find out how to enter credentials for this node [here](/integrations/credentials/google/).
3. Enter the text `Hello from n8n!` in the ***Text*** field.
4. Select 'DE' from the ***Translate To*** dropdown list. DE is the language code for German. You can refer to [Language Support](https://cloud.google.com/translate/docs/languages) to view the list of all supported languages and their corresponding language codes.
5. Click on ***Execute Node*** to run the node.

In the screenshot below, you will notice that the node translates the text `Hello from n8n!` to German.

![Using the Google Translate node to translate text in German](/_images/integrations/nodes/googletranslate/googletranslate_node.png)
