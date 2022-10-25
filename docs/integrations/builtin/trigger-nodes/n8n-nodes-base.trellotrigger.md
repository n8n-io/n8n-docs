# Trello Trigger

[Trello](https://trello.com/) is a web-based Kanban-style list-making application which is a subsidiary of Atlassian. Users can create their task boards with different columns and move the tasks between them.

!!! note "Credentials"
    You can find authentication information for this node [here](/integrations/builtin/credentials/trello/).



## Example Usage

This workflow allows you to receive updates for changes in the specified list in Trello. You can also find the [workflow](https://n8n.io/workflows/491) on the website. This example usage workflow would use the following node.

- [Trello Trigger]()

The final workflow should look like the following image.

![A workflow with the Trello Trigger node](/_images/integrations/builtin/trigger-nodes/trellotrigger/workflow.png)


### 1. Trello Trigger node

1. First of all, you'll have to enter credentials for the Trello Trigger node. You can find out how to do that [here](/integrations/builtin/credentials/trello/).
2. Enter the ID of the list in the *Model ID* field. You can find instructions on how to do that in the FAQs below.
3. Click on *Execute Node* to run the workflow.

!!! note "Activate workflow for production"
    You'll need to save the workflow and then click on the Activate toggle on the top right of the screen to activate the workflow. Your workflow will then be triggered as specified by the settings in the Trello Trigger node.



## FAQs

### How do I find the Model ID?

For this specific example, the List ID would be the Model ID.

1. Open the Trello board that contains the list.
2. If the list doesn't have any cards, add a card to the list.
3. Open the card, add '.json' at the end of the URL, and press enter.
4. In the JSON file, you will see a field called `idList`.
5. Copy `idList`and paste it in the *Model ID* field in n8n.


### What is the Model ID?

It is the ID of any model in Trello. Depending on the use-case, it could be the User ID, List ID, and so on.
