# Custom API operations

n8n supplies hundreds of nodes, allowing you to create workflows that link multiple products. However, some nodes don't include all the possible operations supported by a product's API. You can work around this by making a custom API call.

One of the most complex parts of setting up API calls is credentials. To simplify this, n8n provides a way to use the [HTTP Request](/integrations/core-nodes/n8n-nodes-base.httpRequest/) node with either an existing credential, or using n8n's credential creation process. This avoids complex credentials setups. Creating an HTTP request can require knowledge of different authentication types, and work to set up the appropriate option (such as basic auth, header, or OAuth2.). n8n avoids this complexity using app-specific HTTP credentials.

## App-specific HTTP credentials

An app-specific HTTP credential is a credential associated with a particular platform. You can use app-specific HTTP credentials instead of generic credentials in the HTTP Request node.

For example: you create an Asana credential, for use with the Asana node. Later, you want to perfom an operation that isn't supported by the Asana node, using Asana's API. You can use your existing Asana credential in the HTTP Request node to perform the operation.

### Using app-specific HTTP credentials

--8<-- "_snippets/integrations/app-specific-http-how-to.md"


### Credential scopes

Some existing credential types have specfic scopes: endpoints that they work with. n8n warns you about this when you select the credential type.

For example, follow the steps in (Using app-specific HTTP credentials)[Using app-specific HTTP credentials], and select **Google Calendar OAuth2 API** as your **Credential Type**. n8n displays a box listing the two endpoints you can use this credential type with:

![The scopes box](/_images/integrations/custom-operations/scopes.png)

