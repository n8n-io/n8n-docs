---
permalink: /nodes/n8n-nodes-base.bannerbear
---

# Bannerbear

[Bannerbear](https://www.bannerbear.com/) is an API-based image generation service that automatically generates variations of graphic templates.

::: tip 🔑 Credentials
You can find authentication information for this node [here](../../../credentials/Bannerbear/README.md).
:::

## Basic Operations

- Image
    - Create an image
    - Get an image
- User
    - Get a template
    - Get all templates


## Example Usage

This workflow allows you to create an image using the Bannerbear welcome template. You can also find the [workflow](https://n8n.io/workflows/544) on the website. This example usage workflow would use the following two nodes.
- [Start](../../core-nodes/Start/README.md)
- [Bannerbear]()

The final workflow should look like the following image.

![A workflow with the Bannerbear node](./workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Bannerbear node

1. First of all, you'll have to enter credentials for the Bannerbear node. You can find out how to do that [here](../../../credentials/Bannerbear/README.md).
2. Select 'Welcome Template' from the *Template ID* dropdown list.
3. Click on the *Add Field* dropdown and select 'Wait for Image' and make sure the slider is set to 'on'.
4. Click on the *Add Modification* button and select 'message' from the *Name* dropdown list.
5. Enter some text in the *Text* field.
6. Click on *Execute Node* to run the workflow.


## Further Reading

- [Automate Designs with Bannerbear and n8n](https://medium.com/n8n-io/automate-designs-with-bannerbear-and-n8n-2b64c94b54db)
- [Automating Conference Organization Processes with n8n](https://medium.com/n8n-io/automating-conference-organization-processes-with-n8n-ab8f64a7a520)
