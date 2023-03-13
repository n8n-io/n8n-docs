# ConvertKit

The ConvertKit node allows you to automate work in ConvertKit, and integrate ConvertKit with other applications. n8n has built-in support for a wide range of ConvertKit features, including creating and deleting custom fields, adding subscribers, and getting tags.

On this page, you'll find a list of operations the ConvertKit node supports and links to more resources.

!!! note "Credentials"
    Refer to [ConvertKit credentials](/integrations/builtin/credentials/convertkit/) for guidance on setting up authentication. 

!!! note "Examples and templates"
    For usage examples and templates to help you get started, take a look at n8n's [ConvertKit integrations](https://n8n.io/integrations/convertkit/){:target="_blank" .external-link} list.


## Basic Operations

* Custom Field
    * Create a field
    * Delete a field
    * Get all fields
    * Update a field
* Form
    * Add a subscriber
    * Get all forms
    * List subscriptions to a form including subscriber data
* Sequence
    * Add a subscriber
    * Get all sequences
    * Get all subscriptions to a sequence including subscriber data
* Tag
    * Create a tag
    * Get all tags
* Tag Subscriber
    * Add a tag to a subscriber
    * List subscriptions to a tag including subscriber data
    * Delete a tag from a subscriber

## Example Usage

This workflow allows you to add a subscriber to a form, create a tag and add the subscriber to the tag using the ConvertKit node. You can also find the [workflow](https://n8n.io/workflows/642) on n8n.io. This example usage workflow would use the following nodes.
- [Start](/integrations/builtin/core-nodes/n8n-nodes-base.start/)
- [ConvertKit]()

The final workflow should look like the following image.

![A workflow with the ConvertKit node](/_images/integrations/builtin/app-nodes/convertkit/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. ConvertKit node (addSubscriber: form)

1. First of all, you'll have to enter credentials for the ConvertKit node. You can find out how to do that [here](/integrations/builtin/credentials/convertkit/).
2. Select the form from the ***Form ID*** dropdown list.
3. Enter the email address in the ***Email*** field.
4. Click on ***Execute Node*** to run the node.

![Using the ConvertKit node to add a subscriber to a form](/_images/integrations/builtin/app-nodes/convertkit/convertkit_node.png)



### 3. ConvertKit1 node (create: tag)

1. Select the credentials that you entered in the previous ConvertKit node.
2. Select 'Tag' from the ***Resource*** dropdown list.
3. Enter the tag name in the ***Name*** field.
4. Click on ***Execute Node*** to run the node.


![Using the ConvertKit node to create a tag](/_images/integrations/builtin/app-nodes/convertkit/convertkit1_node.png)



### 4. ConvertKit2 node (add: tagSubscriber)

1. Select the credentials that you entered in the previous ConvertKit node.
2. Select 'Tag Subscriber' from the ***Resource*** dropdown list.
3. Select 'Add' from the ***Operation*** dropdown list.
4. Select the tag from the ***Tag ID*** dropdown list.
5. Click on the gears icon next to the ***Email*** field and click on ***Add Expression***.
6. Select the following in the ***Variable Selector*** section: Nodes > ConvertKit > Output Data > JSON > subscriber > email_address. You can also add the following expression: `{{$node["ConvertKit"].json["subscriber"]["email_address"]}}`.
7. Click on ***Execute Node*** to run the node.


![Using the ConvertKit node to add the subscriber to the tag](/_images/integrations/builtin/app-nodes/convertkit/convertkit2_node.png)
