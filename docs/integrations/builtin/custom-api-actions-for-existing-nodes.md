---
contentType: explanation
nodeTitle: Custom API actions for existing nodes
originalFilePath: integrations/custom-operations.md
originalUrl: 'https://docs.n8n.io/integrations/custom-operations'
url: 'https://docs.n8n.io/integrations/builtin/custom-api-actions-for-existing-nodes'
layout:
  description:
    visible: false
---

# Custom API operations <a href="#custom-api-operations" id="custom-api-operations"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/k23mQunNshTkLRuOqark/" %}

## Predefined credential types <a href="#predefined-credential-types" id="predefined-credential-types"></a>

A predefined credential type is a credential that already exists in n8n. You can use predefined credential types instead of generic credentials in the HTTP Request node.

For example: you create an Asana credential, for use with the Asana node. Later, you want to perform an operation that isn't supported by the Asana node, using Asana's API. You can use your existing Asana credential in the HTTP Request node to perform the operation, without additional authentication setup.

### Using predefined credential types <a href="#using-predefined-credential-types" id="using-predefined-credential-types"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/ZmZC9v8B1NG5lgRY44yF/" %}


### Credential scopes <a href="#credential-scopes" id="credential-scopes"></a>

Some existing credential types have specific scopes: endpoints that they work with. n8n warns you about this when you select the credential type.

For example, follow the steps in [Using predefined credential types](#using-predefined-credential-types), and select **Google Calendar OAuth2 API** as your **Credential Type**. n8n displays a box listing the two endpoints you can use this credential type with:

![The scopes box](../.gitbook/assets/scopes.png)

