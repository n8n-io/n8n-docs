

# credentials/add-edit-credentials.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
description: Creating and editing credentials.
contentType: howto
---

# Create and edit credentials

Credentials are securely stored authentication information used to connect n8n workflows to external services such as APIs, or databases.

## Create a credential

1. Select the <span class="inline-image">![universal create resource icon](/_images/common-icons/universal-resource-button.png){.off-glb}</span> **button** in the upper-left corner of the side menu. Select credential. 
2. If your n8n instance supports [projects](/glossary.md#project-n8n), you'll also need to choose whether to create the credential inside your personal space or a specific project you have access to. If you're using the community version, you'll create the credential inside your personal space.
3. Select the app or service you wish to connect to.

Or:

1. Using the <span class="inline-image">![universal create resource icon](/_images/common-icons/universal-resource-button.png){.off-glb}</span> **Create** button in the upper-right corner from either the **Overview** page or a specific project. Select Credential.
2.  If you're doing this from the **Overview** page, you'll create the credential inside your personal space. If you're doing this from inside a project, you'll create the credential inside that specific project.
3. Select the app or service you wish to connect to.

You can also create new credential in the credential drop down when editing a node on the workflow editor.

Once in the credential modal, enter the details required by your service. Refer to your service's page in the [credentials library](/integrations/builtin/credentials/index.md) for guidance.

When you save a credential, n8n tests it to confirm it works.

/// note | Credentials naming
n8n names new credentials "*node name* account" by default. You can rename the credentials by clicking on the name, similarly to renaming nodes. It's good practice to give them names that identify the app or service, type, and purpose of the credential. A naming convention makes it easier to keep track of and identify your credentials.
///

## Expressions in credentials

You can use [expressions](/glossary.md#expression-n8n) to set credentials dynamically as your workflow runs:

1. In your workflow, find the data path containing the credential. This varies depending on the exact parameter names in your data. Make sure that the data containing the credential is available in the workflow when you get to the node that needs it.
1. When creating your credential, hover over the field where you want to use an expression.
1. Toggle **Expression** on.
1. Enter your expression.

### Example workflow

[[ workflowDemo("file:///credentials/dynamic_credentials_using_expressions.json") ]]

#### Using the example

--8<-- "_snippets/examples-color-key.md"


# credentials/credential-sharing.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Credential sharing
description: Share credentials within an organization.
contentType: howto
---

# Credential sharing


/// info | Feature availability
Available on all Cloud plans, and Enterprise self-hosted plans.
///

You can share a credential directly with other users to use in their own workflows. Or share a credential in a [project](/glossary.md#project-n8n) for all members of that project to use. Any users using a shared credential won't be able to view or edit the credential details.

Users can share credentials they created and own. Only project admins can share credentials created in and owned by a project. Instance owners and instance admins can view and share all credentials on an instance.

Refer to [Account types](/user-management/account-types.md) for more information about owners and admins.

In [projects](/user-management/rbac/index.md), a user's role controls how they can interact with the workflows and credentials associated to the projects they're a member of.

## Share a credential

To share a credential: 

1. From the left menu, select either **Overview** or a project.
2. Select **Credentials** to see a list of your credentials.
3. Select the credential you want to share.
4. Select **Sharing**.
5. In the **Share with projects or users** dropdown, browse or search for the user or project with which you want to share your credentials.
6. Select a user or project. 
7. Select **Save** to apply the changes.

## Remove access to a credential

To unshare a credential:

1. From the left menu, select either **Overview** or a project.
2. Select **Credentials** to see a list of your credentials.
3. Select the credential you want to unshare.
4. Select **Sharing**.
5. Select **trash icon**<span class="inline-image">![Trash icon](/_images/common-icons/delete-node.png){.off-glb}</span> on the user or project you want to remove from the list of shared users and projects.
6. Select **Save** to apply the changes.


# credentials/index.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
description: Authenticating with the services you're connecting to.
contentType: overview
---

# Credentials

[Credentials](/glossary.md#credential-n8n) are private pieces of information issued by apps and services to authenticate you as a user and allow you to connect and share information between the app or service and the n8n node.

Access the credentials UI by opening the left menu and selecting **Credentials**. n8n lists credentials you created on the **My credentials** tab. The **All credentials** tab shows all credentials you can use, included credentials shared with you by other users.

* [Create and edit credentials](/credentials/add-edit-credentials.md).
* Learn about [credential sharing](/credentials/credential-sharing.md).
* Find information on setting up credentials for your services in the [credentials library](/integrations/builtin/credentials/index.md).


