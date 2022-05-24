# Custom API operations

n8n supplies hundreds of nodes, allowing you to create workflows that link multiple products. However, some nodes don't include all the possible operations supported by a product's API. You can work around this by making a custom API call using the [HTTP Request](/integrations/core-nodes/n8n-nodes-base.httpRequest/) node.

One of the most complex parts of setting up API calls is managing authentication. To simplify this, n8n provides a way to use existential credential types (credentials associated with n8n nodes).

## Predefined credential types

A predefined credential type is a credential associated with a particular platform. You can use predefined credential types instead of generic credentials in the HTTP Request node.

For example: you create an Asana credential, for use with the Asana node. Later, you want to perfom an operation that isn't supported by the Asana node, using Asana's API. You can use your existing Asana credential in the HTTP Request node to perform the operation.

### Using predefined credential types

--8<-- "_snippets/integrations/predefined-credential-type-how-to.md"


### Credential scopes

Some existing credential types have specfic scopes: endpoints that they work with. n8n warns you about this when you select the credential type.

For example, follow the steps in [Using predefined credential types](#using-predefined-credential-types), and select **Google Calendar OAuth2 API** as your **Credential Type**. n8n displays a box listing the two endpoints you can use this credential type with:

![The scopes box](/_images/integrations/custom-operations/scopes.png)

