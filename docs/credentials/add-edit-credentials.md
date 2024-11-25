---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
description: Creating and editing credentials.
contentType: howto
---

# Create and edit credentials

Credentials are securely stored authentication information used to connect n8n workflows to external services such as APIs, or databases.

## Create a credential

1. Select the <span class="inline-image">![universal create resource icon](/_images/common-icons/universal-resource-button.png){.off-glb}</span> **button** in the upper-left corner of the side menu. Select credential. 
2. If your n8n instance supports projects, you'll also need to choose whether to create the credential inside your personal space or a specific project you have access to. If you're using the community version, you'll create the credential inside your personal space.
3. Select the app or service you wish to connect to.

Or:

1. Using the <span class="inline-image">![universal create resource icon](/_images/common-icons/universal-resource-button.png){.off-glb}</span> **Create** button in the upper-right corner from either the **Overview** page or a specific project. Select Credential.
2.  If you're doing this from the **Overview** page, you'll create the credential inside your personal space. If you're doing this from inside a project, you'll create the credential inside that specific project.
3. Select the app or service you wish to connect to.

You can also create new credential in the credential drop down when editing a node on the workflow editor.

Once in the credential modal, enter the details required by your service. Refer to your service's page in the [credentials library](/integrations/builtin/credentials/) for guidance.

When you save a credential, n8n tests it to confirm it works.

/// note | Credentials naming
n8n names new credentials "*node name* account" by default. You can rename the credentials by clicking on the name, similarly to renaming nodes. It's good practice to give them names that identify the app or service, type, and purpose of the credential. A naming convention makes it easier to keep track of and identify your credentials.
///

## Expressions in credentials

You can use expressions to set credentials dynamically as your workflow runs:

1. In your workflow, find the data path containing the credential. This varies depending on the exact parameter names in your data. Make sure that the data containing the credential is available in the workflow when you get to the node that needs it.
1. When creating your credential, hover over the field where you want to use an expression.
1. Toggle **Expression** on.
1. Enter your expression.

### Example workflow

[[ workflowDemo("file:///credentials/dynamic_credentials_using_expressions.json") ]]

#### Using the example

--8<-- "_snippets/examples-color-key.md"
