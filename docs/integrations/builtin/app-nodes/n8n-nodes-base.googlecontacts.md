# Google Contacts

Google Contacts node allows you to automate work in the Google Contacts platform and integrate Google Contacts with other applications. n8n has built-in support for a wide range of Google Contacts features, which includes basic operations like creating, updating, retrieving, deleting, and getting contacts. 

On this page, you'll find a list of operations the Google Contacts node supports and links to more resources.

!!! note "Credentials"
    Refer to the [Google Contacts credentials](https://docs.n8n.io/integrations/builtin/credentials/google/) for guidance on setting up authentication. 

!!! note "Examples and templates"
    For example, usage and templates to help you get started, take a look at n8n's [Google Contacts integrations](https://n8n.io/integrations/google-contacts/){:target="_blank" .external-link} list.



## Basic Operations

* Contact
    * Create a contact
    * Delete a contact
    * Get a contact
    * Retrieve all contacts
    * Update a contact

## Example Usage

This workflow allows you to create, update, and get a contact from Google Contacts. You can also find the [workflow](https://n8n.io/workflows/637) on n8n.io. This example usage workflow would use the following nodes.
- [Start](/integrations/builtin/core-nodes/n8n-nodes-base.start/)
- [Google Contacts]()

The final workflow should look like the following image.

![A workflow with the Google Contacts node](/_images/integrations/builtin/app-nodes/googlecontacts/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.


### 2. Google Contacts node (create: contact)

1. First of all, you'll have to enter credentials for the Google Contacts node. You can find out how to do that [here](/integrations/builtin/credentials/google/).
2. Enter the family name in the ***Family Name*** field.
3. Enter the given name in the ***Given Name*** field.
4. Click on ***Execute Node*** to run the node.

![Using the Google Contacts node to create a contact](/_images/integrations/builtin/app-nodes/googlecontacts/googlecontacts_node.png)



### 3. Google Contacts1 node (update: contact)

1. Select the credentials that you entered in the previous node.
2. Select 'Update' from the ***Operation*** dropdown list.
3. Click on the gears icon next to the ***Contact ID*** field and click on ***Add Expression***.
4. Select the following in the ***Variable Selector*** section: Nodes > Google Contacts > Output Data > JSON > contactId. You can also add the following expression: `{{$node["Google Contacts"].json["contactId"]}}`.
5. Select `*` from the ***Fields*** dropdown list.
6. Click on the ***Add Field*** button and select ***Company***.
7. Click on the ***Add Company*** button.
8. Toggle the value to true for the ***Current*** field.
9. Enter the company's domain in the ***Domain*** field.
10. Enter the company's name in the ***Name*** field.
11. Enter the title in the ***Title*** field.
12. Click on ***Execute Node*** to run the node.


![Using the Google Contact node to update the contact](/_images/integrations/builtin/app-nodes/googlecontacts/googlecontacts1_node.png)



### 4. Google Contacts2 node (get: contact)

1. Select the credentials that you entered in the previous node.
2. Select 'Get' from the ***Operation*** dropdown list.
3. Click on the gears icon next to the ***Contact ID*** field and click on ***Add Expression***.
4. Select the following in the ***Variable Selector*** section: Nodes > Google Contacts > Output Data > JSON > contactId. You can also add the following expression: `{{$node["Google Contacts"].json["contactId"]}}`.
5. Select 'Organizations' from the ***Fields*** dropdown list.
6. Click on ***Execute Node*** to run the node.


![Using the Google Contacts node to get the contact](/_images/integrations/builtin/app-nodes/googlecontacts/googlecontacts2_node.png)
