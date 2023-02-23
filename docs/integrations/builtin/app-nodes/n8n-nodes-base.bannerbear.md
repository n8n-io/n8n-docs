# Bannerbear

The Bannerbear node allows you to automate work in Bannerbear, and integrate Bannerbear with other applications. n8n has built-in support for a wide range of Bannerbear features, including creating and getting images and templates.

On this page, you'll find a list of operations the Bannerbear node supports and links to more resources.

!!! note "Credentials"
    Refer to [Bannerbear credentials](https://docs.n8n.io/integrations/builtin/credentials/bannerbear/) for guidance on setting up authentication. 

!!! note "Examples and Templates"
    For usage examples and templates to help you get started, take a look at n8n's [Bannerbear integrations](https://n8n.io/integrations/bannerbear/){:target=_blank .external-link} list.




## Basic Operations

* Image
    * Create an image
    * Get an image
* Template
    * Get a template
    * Get all templates

## Example Usage

This workflow allows you to create an image using the Bannerbear welcome template. You can also find the [workflow](https://n8n.io/workflows/544) on the website. This example usage workflow would use the following two nodes.
- [Start](/integrations/builtin/core-nodes/n8n-nodes-base.start/)
- [Bannerbear]()

The final workflow should look like the following image.

![A workflow with the Bannerbear node](/_images/integrations/builtin/app-nodes/bannerbear/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Bannerbear node

1. First of all, you'll have to enter credentials for the Bannerbear node. You can find out how to do that [here](/integrations/builtin/credentials/bannerbear/).
2. Select 'Welcome Template' from the *Template ID* dropdown list.
3. Click on the *Add Field* dropdown, select 'Wait for Image', and set the slider is set to 'on'.
4. Click on the *Add Modification* button and select 'message' from the *Name* dropdown list.
5. Enter the text in the *Text* field.
6. Click on *Execute Node* to run the workflow.




