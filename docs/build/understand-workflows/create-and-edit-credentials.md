---
description: Creating and editing credentials.
contentType: howto
nodeTitle: Create and edit credentials
originalFilePath: credentials/add-edit-credentials.md
originalUrl: 'https://docs.n8n.io/credentials/add-edit-credentials'
url: 'https://docs.n8n.io/build/understand-workflows/create-and-edit-credentials'
layout:
  description:
    visible: false
---

# Create and edit credentials <a href="#create-and-edit-credentials" id="create-and-edit-credentials"></a>

Credentials are securely stored authentication information used to connect n8n workflows to external services such as APIs, or databases.

## Create a credential <a href="#create-a-credential" id="create-a-credential"></a>

1. Select the <img src="../.gitbook/assets/universal-resource-button.png" alt="universal create resource icon" data-size="line"> **Create** button in the upper-left corner of the side menu. Select credential. 
2. If your n8n instance supports [projects](https://app.gitbook.com/s/CxSeOtVxqqhfxMSac0AV/key-concept-glossary#project-n8n), you'll also need to choose whether to create the credential inside your personal space or a specific project you have access to. If you're using the community version, you'll create the credential inside your personal space.
3. Select the app or service you wish to connect to.

Or:

1. Using the <img src="../.gitbook/assets/universal-resource-button.png" alt="universal create resource icon" data-size="line"> **Create** button in the upper-right corner from either the **Overview** page or a specific project. Select Credential.
2.  If you're doing this from the **Overview** page, you'll create the credential inside your personal space. If you're doing this from inside a project, you'll create the credential inside that specific project.
3. Select the app or service you wish to connect to.

You can also create new credential in the credential drop down when editing a node on the workflow editor.

Once in the credential modal, enter the details required by your service. Refer to your service's page in the [credentials library](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/credentials) for guidance.

When you save a credential, n8n tests it to confirm it works.

{% hint style="info" %}
**Credentials naming**

n8n names new credentials "*node name* account" by default. You can rename the credentials by clicking on the name, similarly to renaming nodes. It's good practice to give them names that identify the app or service, type, and purpose of the credential. A naming convention makes it easier to keep track of and identify your credentials.
{% endhint %}

## Allowed HTTP request domains <a href="#allowed-http-request-domains" id="allowed-http-request-domains"></a>

The **Allowed HTTP Request Domains** field appears on many n8n credentials for web-based APIs and services. It controls which domains the credential is permitted to be used against when the credential is selected in an **HTTP Request** node. It has no effect when the credential is used in its own dedicated node.

The field has three options: 

- **All**: The credential can be used against any URL.
- **Specific Domains**: Restrict to specific domains (provide a comma-separated list like `httpbin.org, api.github.com`)
- **None**: The credential is blocked entirely from use in the **HTTP Request** node.

This field prevents credential misuse, for example sending the credential to URLs outside the intended domain.

## Expressions in credentials <a href="#expressions-in-credentials" id="expressions-in-credentials"></a>

You can use [expressions](https://app.gitbook.com/s/CxSeOtVxqqhfxMSac0AV/key-concept-glossary#expression-n8n) to set credentials dynamically as your workflow runs:

1. In your workflow, find the data path containing the credential. This varies depending on the exact parameter names in your data. Make sure that the data containing the credential is available in the workflow when you get to the node that needs it.
1. When creating your credential, hover over the field where you want to use an expression.
1. Toggle **Expression** on.
1. Enter your expression.

### Example workflow <a href="#example-workflow" id="example-workflow"></a>

{% @n8n-blocks/n8n-workflow-demo content="%7B%0A%20%20%22name%22%3A%20%22Dynamic%20credentials%20using%20expressions%22%2C%0A%20%20%22nodes%22%3A%20%5B%0A%20%20%20%20%7B%0A%20%20%20%20%20%20%22parameters%22%3A%20%7B%0A%20%20%20%20%20%20%20%20%22path%22%3A%20%22da4071f2-7550-4dae-aa48-8bced4291643%22%2C%0A%20%20%20%20%20%20%20%20%22formTitle%22%3A%20%22Test%20dynamic%20credentials%22%2C%0A%20%20%20%20%20%20%20%20%22formDescription%22%3A%20%22This%20form%20is%20for%20testing%20an%20n8n%20workflow%20that%20demonstrates%20setting%20credentials%20with%20expressions.%22%2C%0A%20%20%20%20%20%20%20%20%22formFields%22%3A%20%7B%0A%20%20%20%20%20%20%20%20%20%20%22values%22%3A%20%5B%0A%20%20%20%20%20%20%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%22fieldLabel%22%3A%20%22Enter%20your%20NASA%20API%20key%22%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%22requiredField%22%3A%20true%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%20%20%5D%0A%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%20%20%22responseMode%22%3A%20%22responseNode%22%0A%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%22id%22%3A%20%22cc6f2b1e-0ed0-4d22-8a44-d7223ba283b4%22%2C%0A%20%20%20%20%20%20%22name%22%3A%20%22n8n%20Form%20Trigger%22%2C%0A%20%20%20%20%20%20%22type%22%3A%20%22n8n-nodes-base.formTrigger%22%2C%0A%20%20%20%20%20%20%22typeVersion%22%3A%202%2C%0A%20%20%20%20%20%20%22position%22%3A%20%5B%0A%20%20%20%20%20%20%20%20560%2C%0A%20%20%20%20%20%20%20%20520%0A%20%20%20%20%20%20%5D%2C%0A%20%20%20%20%20%20%22webhookId%22%3A%20%22da4071f2-7550-4dae-aa48-8bced4291643%22%0A%20%20%20%20%7D%2C%0A%20%20%20%20%7B%0A%20%20%20%20%20%20%22parameters%22%3A%20%7B%0A%20%20%20%20%20%20%20%20%22additionalFields%22%3A%20%7B%7D%0A%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%22id%22%3A%20%22ef336bae-3d4f-419c-ab5c-b9f0de89f170%22%2C%0A%20%20%20%20%20%20%22name%22%3A%20%22NASA%22%2C%0A%20%20%20%20%20%20%22type%22%3A%20%22n8n-nodes-base.nasa%22%2C%0A%20%20%20%20%20%20%22typeVersion%22%3A%201%2C%0A%20%20%20%20%20%20%22position%22%3A%20%5B%0A%20%20%20%20%20%20%20%20900%2C%0A%20%20%20%20%20%20%20%20520%0A%20%20%20%20%20%20%5D%2C%0A%20%20%20%20%20%20%22credentials%22%3A%20%7B%0A%20%20%20%20%20%20%20%20%22nasaApi%22%3A%20%7B%0A%20%20%20%20%20%20%20%20%20%20%22id%22%3A%20%22QDDBOZOD6k3ijL5t%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22name%22%3A%20%22NASA%20account%22%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%2C%0A%20%20%20%20%7B%0A%20%20%20%20%20%20%22parameters%22%3A%20%7B%0A%20%20%20%20%20%20%20%20%22respondWith%22%3A%20%22redirect%22%2C%0A%20%20%20%20%20%20%20%20%22redirectURL%22%3A%20%22%3D%7B%7B%20%24json.url%20%7D%7D%22%2C%0A%20%20%20%20%20%20%20%20%22options%22%3A%20%7B%7D%0A%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%22id%22%3A%20%22143bcdb6-aca0-4dd8-9204-9777271cd230%22%2C%0A%20%20%20%20%20%20%22name%22%3A%20%22Respond%20to%20Webhook%22%2C%0A%20%20%20%20%20%20%22type%22%3A%20%22n8n-nodes-base.respondToWebhook%22%2C%0A%20%20%20%20%20%20%22typeVersion%22%3A%201%2C%0A%20%20%20%20%20%20%22position%22%3A%20%5B%0A%20%20%20%20%20%20%20%201220%2C%0A%20%20%20%20%20%20%20%20520%0A%20%20%20%20%20%20%5D%0A%20%20%20%20%7D%2C%0A%20%20%20%20%7B%0A%20%20%20%20%20%20%22parameters%22%3A%20%7B%0A%20%20%20%20%20%20%20%20%22content%22%3A%20%22This%20workflow%20shows%20how%20to%20set%20credentials%20dynamically%20using%20expressions.%5Cn%5Cn%5CnFirst%2C%20set%20up%20your%20NASA%20credential%3A%20%5Cn%5Cn1.%20Create%20a%20new%20NASA%20credential.%5Cn1.%20Hover%20over%20%2A%2AAPI%20Key%2A%2A.%5Cn1.%20Toggle%20%2A%2AExpression%2A%2A%20on.%5Cn1.%20In%20the%20%2A%2AAPI%20Key%2A%2A%20field%2C%20enter%20%60%7B%7B%20%24json%5B%5C%22Enter%20your%20NASA%20API%20key%5C%22%5D%20%7D%7D%60.%5Cn%5Cn%5CnThen%2C%20test%20the%20workflow%3A%5Cn%5Cn1.%20Get%20an%20%5BAPI%20key%20from%20NASA%5D%28https%3A%2F%2Fapi.nasa.gov%2F%29%5Cn2.%20Select%20%2A%2AExecute%20workflow%2A%2A%5Cn3.%20Enter%20your%20key%20using%20the%20form.%5Cn4.%20The%20workflow%20runs%20and%20sends%20you%20to%20the%20NASA%20picture%20of%20the%20day.%5Cn%5Cn%5CnFor%20more%20information%20on%20expressions%2C%20refer%20to%20%5Bn8n%20documentation%20%7C%20Expressions%5D%28https%3A%2F%2Fdocs.n8n.io%2Fcode%2Fexpressions%2F%29.%22%2C%0A%20%20%20%20%20%20%20%20%22height%22%3A%20564%2C%0A%20%20%20%20%20%20%20%20%22width%22%3A%20322%2C%0A%20%20%20%20%20%20%20%20%22color%22%3A%204%0A%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%22id%22%3A%20%220a0dee23-fa16-4f09-b5e0-856f47fb53d0%22%2C%0A%20%20%20%20%20%20%22name%22%3A%20%22Sticky%20Note%22%2C%0A%20%20%20%20%20%20%22type%22%3A%20%22n8n-nodes-base.stickyNote%22%2C%0A%20%20%20%20%20%20%22typeVersion%22%3A%201%2C%0A%20%20%20%20%20%20%22position%22%3A%20%5B%0A%20%20%20%20%20%20%20%20120%2C%0A%20%20%20%20%20%20%20%20140%0A%20%20%20%20%20%20%5D%0A%20%20%20%20%7D%2C%0A%20%20%20%20%7B%0A%20%20%20%20%20%20%22parameters%22%3A%20%7B%0A%20%20%20%20%20%20%20%20%22content%22%3A%20%22User%20submits%20an%20API%20key%20using%20the%20form%22%2C%0A%20%20%20%20%20%20%20%20%22height%22%3A%20319%0A%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%22id%22%3A%20%22dd766e32-334d-4e46-9daa-7800b134a3a5%22%2C%0A%20%20%20%20%20%20%22name%22%3A%20%22Sticky%20Note1%22%2C%0A%20%20%20%20%20%20%22type%22%3A%20%22n8n-nodes-base.stickyNote%22%2C%0A%20%20%20%20%20%20%22typeVersion%22%3A%201%2C%0A%20%20%20%20%20%20%22position%22%3A%20%5B%0A%20%20%20%20%20%20%20%20500%2C%0A%20%20%20%20%20%20%20%20380%0A%20%20%20%20%20%20%5D%0A%20%20%20%20%7D%2C%0A%20%20%20%20%7B%0A%20%20%20%20%20%20%22parameters%22%3A%20%7B%0A%20%20%20%20%20%20%20%20%22content%22%3A%20%22The%20workflow%20passes%20the%20key%20to%20the%20NASA%20node.%20You%20can%20reference%20the%20value%20using%20the%20expression%20%60%24json%5B%5C%22Enter%20your%20NASA%20API%20key%5C%22%5D%60.%20This%20is%20also%20available%20to%20the%20node%20credential.%20%22%2C%0A%20%20%20%20%20%20%20%20%22height%22%3A%20319%2C%0A%20%20%20%20%20%20%20%20%22color%22%3A%205%0A%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%22id%22%3A%20%223d8f02e6-e029-41dc-89ad-0f5cffe09348%22%2C%0A%20%20%20%20%20%20%22name%22%3A%20%22Sticky%20Note2%22%2C%0A%20%20%20%20%20%20%22type%22%3A%20%22n8n-nodes-base.stickyNote%22%2C%0A%20%20%20%20%20%20%22typeVersion%22%3A%201%2C%0A%20%20%20%20%20%20%22position%22%3A%20%5B%0A%20%20%20%20%20%20%20%20820%2C%0A%20%20%20%20%20%20%20%20380%0A%20%20%20%20%20%20%5D%0A%20%20%20%20%7D%2C%0A%20%20%20%20%7B%0A%20%20%20%20%20%20%22parameters%22%3A%20%7B%0A%20%20%20%20%20%20%20%20%22content%22%3A%20%22The%20Respond%20to%20Webhook%20node%20controls%20the%20form%20response%20%28in%20this%20example%2C%20redirecting%20the%20user%20to%20an%20image%29%22%2C%0A%20%20%20%20%20%20%20%20%22height%22%3A%20319%0A%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%22id%22%3A%20%22096eb6ab-c276-4687-9dc0-50e16a8f709a%22%2C%0A%20%20%20%20%20%20%22name%22%3A%20%22Sticky%20Note3%22%2C%0A%20%20%20%20%20%20%22type%22%3A%20%22n8n-nodes-base.stickyNote%22%2C%0A%20%20%20%20%20%20%22typeVersion%22%3A%201%2C%0A%20%20%20%20%20%20%22position%22%3A%20%5B%0A%20%20%20%20%20%20%20%201140%2C%0A%20%20%20%20%20%20%20%20380%0A%20%20%20%20%20%20%5D%0A%20%20%20%20%7D%0A%20%20%5D%2C%0A%20%20%22pinData%22%3A%20%7B%7D%2C%0A%20%20%22connections%22%3A%20%7B%0A%20%20%20%20%22n8n%20Form%20Trigger%22%3A%20%7B%0A%20%20%20%20%20%20%22main%22%3A%20%5B%0A%20%20%20%20%20%20%20%20%5B%0A%20%20%20%20%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%22node%22%3A%20%22NASA%22%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%22type%22%3A%20%22main%22%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%22index%22%3A%200%0A%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%5D%0A%20%20%20%20%20%20%5D%0A%20%20%20%20%7D%2C%0A%20%20%20%20%22NASA%22%3A%20%7B%0A%20%20%20%20%20%20%22main%22%3A%20%5B%0A%20%20%20%20%20%20%20%20%5B%0A%20%20%20%20%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%22node%22%3A%20%22Respond%20to%20Webhook%22%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%22type%22%3A%20%22main%22%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%22index%22%3A%200%0A%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%5D%0A%20%20%20%20%20%20%5D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A" url="https://raw.githubusercontent.com/n8n-io/n8n-docs/refs/heads/main/docs/_workflows/credentials/dynamic_credentials_using_expressions.json" %}

#### Using the example <a href="#using-the-example" id="using-the-example"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/W3cf8RxX3GdmfHohJtNP/" %}
