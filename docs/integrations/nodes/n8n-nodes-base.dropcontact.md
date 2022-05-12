# Dropcontact

[Dropcontact](https://www.dropcpontact.com) is an email finder platform that allows you to automatically find, verify and validate nominative emails and enrich your contacts with all efficient information to contact him.



!!! note "Credentials"
    You can find authentication information for this node [here](/integrations/credentials/dropcontact/).


## Basic Operations

**Contact**
- Enrich
- Fetch Request



## Example Usage

This workflow allows you to find email and enrich your contact from a Google Sheet and add them to Lemlist. You can also find the [workflow](https://n8n.io/workflows/1304) on n8n.io. 

This example usage workflow would use the following nodes.
- [Start](/integrations/core-nodes/n8n-nodes-base.start/)
- [Google Sheets node](/integrations/nodes/n8n-nodes-base.googleSheets/)
- [Dropcontact node]()
- [Lemlist node](/integrations/nodes/n8n-nodes-base.lemlist/)

![A workflow with the GetResponse node](/_images/integrations/nodes/dropcontact/workflow.png)

### 1. Start Node
The start node exists by default when you create a new workflow.

### 2. Google Sheet node

This node will list all the records from Google Sheet. Create a sheet like [this](https://docs.google.com/spreadsheets/d/1jCyGrz01b7wdoujEHHZvw-JD5zszTMFqn8cvvSnLPrE/edit#gid=0) in your Google Drive.

1. First of all, you'll have to enter credentials for the Google Sheet node. You can find out how to do that [here](/integrations/credentials/google/).

2. Select the 'Sheet' option from the ***Ressource*** dropdown list.
3. Select the 'Read' option from the ***Operation*** dropdown list.
4. Enter the Sheet ID in the ***Sheet ID*** field. Your Google Sheet ID is available in the URL `https://docs.google.com/spreadsheets/d/{spreadsheetId}/edit`
5. In the ***Range*** field, enter `A:K`.
6. Click on ***Execute Node*** to run the node.


In the screenshot below, you will notice that the node returns the information of the leads.

![Using the Google Sheet](/_images/integrations/nodes/dropcontact/googlesheet_node.png)

### 3. Dropontact node

This node will find the verified email address and enrich the contact.

1. First of all, you'll have to enter credentials for the Dropcontact node. You can find out how to do that [here](/integrations/credentials/dropcontact/).

2. Select 'Contact' from the ***Resource*** dropdown list.
3. Select 'Enrich' from the ***Operation*** dropdown list.
4. Click on ***Add Field*** and select 'Company Name'.
5. Click on the gears icon next to the ***Company Name*** field and click on ***Add Expression***.
6. Select the following in the ***Variable Selector*** section: Node > Input Data > JSON > fields > companyName . You can also add the following expression: `{{$json["fields"]["companyName"]}}`.
7. Click on ***Add Field*** and select 'First Name'.
8. Click on the gears icon next to the ***First Name*** field and click on ***Add Expression***.
9. Select the following in the ***Variable Selector*** section: Node > Input Data > JSON > fields > firstName . You can also add the following expression: `{{$json["fields"]["firstName"]}}`.
10. Click on ***Add Field*** and select 'Full Name'.
11. Click on the gears icon next to the ***Full Name*** field and click on ***Add Expression***.
12. Select the following in the ***Variable Selector*** section: Node > Input Data > JSON > fields > fullName . You can also add the following expression: `{{$json["fields"]["fullName"]}}`.
13. Click on ***Add Field*** and select 'Last Name'.
14. Click on the gears icon next to the ***Last Name*** field and click on ***Add Expression***.
15. Select the following in the ***Variable Selector*** section: Node > Input Data > JSON > fields > lastName . You can also add the following expression: `{{$json["fields"]["lastName"]}}`.
16. Click on ***Execute Node*** to run the node.

In the screenshot below, you will notice that the Dropcontact node has enriched your data.

![Using the Dropcontact node](/_images/integrations/nodes/dropcontact/dropcontact_node.png)

### 4. Lemlist node

This node will create new leads for a campaign in Lemlist.

1. First of all, you'll have to enter credentials for the Lemlist node. You can find out how to do that [here](/integrations/credentials/lemlist/).
2. Select 'Lead' from the ***Resource*** dropdown list.
3. Select a campaign from the ***Campaign ID*** dropdown list.
4. Click on the gears icon next to the ***Email*** field and click on 'Add Expression'.

5. Select the following in the ***Variable Selector*** section: Dropcontact > Input Data > JSON > fields > email > [Item: 0] > email. You can also add the following expression: `{{$json["email"][0]["email"]}}`
6. Click on the ***Add Field*** button and select 'First Name'.
7. Click on the gears icon next to the ***First Name*** field and click on ***Add Expression***.
8. Select the following in the ***Variable Selector*** section: Node > Input Data > JSON > fields > first_name . You can also add the following expression: `{{$json["fields"]["first_name"]}}`.
9. Click on the ***Add Field*** button and select 'Last Name'.
10. Click on the gears icon next to the ***Last Name*** field and click on ***Add Expression***.
11. Select the following in the ***Variable Selector*** section: Node > Input Data > JSON > fields > last_name . You can also add the following expression: `{{$json["fields"]["last_name"]}}`.
12. Click on the ***Add Field*** button and select 'Company Name'.
13. Click on the gears icon next to the ***Company Name*** field and click on ***Add Expression***.
14. Select the following in the ***Variable Selector*** section: Node > Input Data > JSON > fields > company_name . You can also add the following expression: `{{$json["fields"]["company_name"]}}`.
15. Click on the ***Add Field*** button and select 'Deduplicate'.
16. Toggle ***Deduplicate*** to `true`.
17. Click on ***Execute Node*** to run the node.

In the screenshot below, you will notice that the node creates new enriched leads in Lemlist.

![Using the Lemlist node](/_images/integrations/nodes/dropcontact/lemlist_node.png)
