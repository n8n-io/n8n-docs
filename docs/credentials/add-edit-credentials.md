---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
description: Creating and editing credentials.
contentType: howto
workflowFile: credentials/dynamic_credentials_using_expressions.json
---

# Create and edit credentials

You can get to the credential modal by either: 

* Opening the left menu, then selecting either <span class="inline-image">![Home icon](/_images/common-icons/home.png){.off-glb}</span> **Home** or a project, then **Credentials** > **Add Credential** and browsing for the service you want to connect to.
* Selecting **Create New** in the **Credential** dropdown in a node.

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

<figure markdown>
!["Screenshot of the two workflows in this example"](/_images/credentials/dynamic-creds-example-workflow.png)
<figcaption markdown>[Download the example workflow](/_workflows/[[ page.meta.workflowFile ]])</figcaption>
</figure>

#### Using the example

[[% include "_includes/examples-color-key.html" %]]
