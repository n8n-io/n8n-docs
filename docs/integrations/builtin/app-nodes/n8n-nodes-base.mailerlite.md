# MailerLite

The MailerLite node allows you to automate work in MailerLite, and integrate MailerLite with other applications. n8n has built-in support for a wide range of MailerLite features, including creating, updating, deleting, and getting subscribers 

On this page, you'll find a list of operations the MailerLite node supports and links to more resources.

!!! note "Credentials"
    Refer to [MailerLite credentials](https://docs.n8n.io/integrations/builtin/credentials/mailerLite/) for guidance on setting up authentication. 

!!! note "Examples and templates"
    For usage examples and templates to help you get started, take a look at n8n's [MailerLite integrations](https://n8n.io/integrations/mailerLite/){:target="_blank" .external-link} list.


## Basic Operations

* Subscriber
    * Create a new subscriber
    * Get an subscriber
    * Get all subscribers
    * Update an subscriber

## Example Usage

This workflow allows you to create, update, and get a subscriber using the MailerLite node. You can also find the [workflow](https://n8n.io/workflows/751) on n8n.io. This example usage workflow uses the following nodes.
- [Start](/integrations/builtin/core-nodes/n8n-nodes-base.start/)
- [MailerLite]()

The final workflow should look like the following image.

![A workflow with the MailerLite node](/_images/integrations/builtin/app-nodes/mailerlite/workflow.png)

### 1. Start node

The Start node exists by default when you create a new workflow.

### 2. MailerLite node (create: subscriber)

This node will create a new subscriber in MailerLite. We will add the name of the subscriber along with their email.

1. First of all, you'll have to enter credentials for the MailerLite node. You can find out how to do that [here](/integrations/builtin/credentials/mailerlite/).

2. Enter the email address in the ***Email*** field.
3. Click on the ***Add Field*** button and select 'Name' from the dropdown list.
4. Enter the name of the subscriber in the ***Name*** field.
5. Click on ***Execute Node*** to run the node.

In the screenshot below, you will notice that the node creates a new subscriber with their name and email.

![Using the MailerLite node to create a room](/_images/integrations/builtin/app-nodes/mailerlite/mailerlite_node.png)

### 3. MailerLite1 node (update: subscriber)

This node will update the information of the subscriber that we created in the previous node. We will add the information about the city of the subscriber using this node.


1. Select the credentials that you entered in the previous node.
2. Select 'Update' from the ***Operation*** dropdown list.
3. Click on the gears icon next to the ***Subscriber Email*** field and click on ***Add Expression***.
4. Select the following in the ***Variable Selector*** section: Nodes > MailerLite > Output Data > JSON > email. You can also add the following expression: `{{$node["MailerLite"].json["email"]}}`.
5. Click on the ***Add Field*** button and select 'Custom Fields' from the dropdown list.
6. Click on the ***Add Custom Field*** button.
7. Select 'city' from the ***Field ID*** dropdown list.
8. Enter the name of the city in the ***Value*** field.
9. Click on ***Execute Node*** to run the node.


In the screenshot below, you will notice that the node updates the information of the subscriber that we created in the previous node. Here, the node has added information about the city of the subscriber.

![Using the MailerLite node to update the subscriber](/_images/integrations/builtin/app-nodes/mailerlite/mailerlite1_node.png)

### 3. MailerLite2 node (get: subscriber)

This node will return the information of the subscriber that we created using the MailerLite node.


1. Select the credentials that you entered in the previous node.
2. Select 'Get' from the ***Operation*** dropdown list.
3. Click on the gears icon next to the ***Subscriber Email*** field and click on ***Add Expression***.
4. Select the following in the ***Variable Selector*** section: Nodes > MailerLite > Output Data > JSON > email. You can also add the following expression: `{{$node["MailerLite"].json["email"]}}`.
5. Click on ***Execute Node*** to run the node.


In the screenshot below, you will notice that the node returns the information of the subscriber that we created using the MailerLite node.

![Using the MailerLite node to get the information of the subscriber](/_images/integrations/builtin/app-nodes/mailerlite/mailerlite2_node.png)
