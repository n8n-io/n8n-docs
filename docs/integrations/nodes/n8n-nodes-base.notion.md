# Notion

[Notion](https://notion.so) is an all-in-one workspace for your notes, tasks, wikis, and databases.

!!! note "Credentials"
    You can find authentication information for this node [here](/integrations/credentials/notion/).


## Basic Operations

**Block**
- Append a block
- Get all children block


**Database**
- Get a database
- Get all database
- Query a database


**Database Record**
- Create a record in a database
- Update a record in a database


**Page**
- Create a page
- Get a page
- Text search for pages


**User**
- Get a user
- Get all users


## Example Usage

This workflow allows you to add a new user to your Notion database when an invite gets created via Calendly. You can also find the [workflow](https://n8n.io/workflows/1088) on n8n.io. This example usage workflow uses the following nodes.

- [Calendly Trigger](/integrations/trigger-nodes/n8n-nodes-base.calendlytrigger/)
- [Notion]()

The final workflow should look like the following image.

![A workflow with the Notion node](/_images/integrations/nodes/notion/workflow.png)

### 1. Calendly Trigger node

The Calendly node will trigger the workflow when an invite gets created.

1. First of all, you'll have to enter credentials for the Notion node. You can find out how to do that [here](/integrations/credentials/calendly/).
2. Select 'invitee.created' from the ***Events*** dropdown list.
3. Save your workflow so that the webhook gets registered.
4. Click on ***Execute Node*** to run the node.

**Note:** Since you'll be using the test webhook while building the workflow, the node only stays active for 120 seconds. After you click on the ***Execute Node*** button, create an invite via Calendly.

In the screenshot below, you will notice that the Calendly Trigger node triggers the workflow when an invite is created.

![Using the Calendly Trigger node to trigger the workflow](/_images/integrations/nodes/notion/calendlytrigger_node.png)


### 2. Notion node (create: databaseRecord)

This node will create a new record using the information received from the previous node.

1. First of all, you'll have to enter credentials for the Notion node. You can find out how to do that [here](/integrations/credentials/notion/).

2. Select 'Database Record' from the ***Resource*** dropdown list.
3. Select the database from the ***Database ID*** dropdown list.
4. Click on the ***Add Property*** button.
5. Select 'Name' from the ***Key*** dropdown list.
6. Click on the gears icon next to the ***Title*** field and click on ***Add Expression***.
7. Select the following in the ***Variable Selector*** section: Current Node > Input Data > JSON > payload > invitee > name. You can also add the following expression: `{{$json["payload"]["invitee"]["name"]}}`.
8. Click on the ***Add Property*** button.
9. Select 'Email' from the ***Key*** dropdown list.
10. Click on the gears icon next to the ***Email*** field and click on ***Add Expression***.
11. Select the following in the ***Variable Selector*** section: Current Node > Input Data > JSON > payload > invitee > email. You can also add the following expression: `{{$json["payload"]["invitee"]["email"]}}`.
11. Click on the ***Add Property*** button.
12. Select 'Status' from the ***Key*** dropdown list.
13. Select 'Scheduled' from the ***Option*** dropdown list.
14. Click on ***Execute Node*** to run the node.

In the screenshot below, you will notice that the node creates a new record from the information that gets received from the previous node.

![Using the Notion node to add a new record in Notion](/_images/integrations/nodes/notion/notion_node.png)

!!! note "Activate workflow for production"
    You'll need to save the workflow and then click on the Activate toggle on the top right of the screen to activate the workflow. Your workflow will then be triggered as specified by the settings in the Calendly Trigger node.

