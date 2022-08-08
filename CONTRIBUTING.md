# Contributing

If you want to contribute to this repository - thank you! Before you start, have a look at the existing documentation to get an idea of the structure and writing conventions n8n uses. In writing your documentation, please follow the guidelines described below, to ensure quality and consistency with n8n styles.

## Documenting nodes

* **Nodes and trigger nodes:** Create a directory with the name of the node at `docs/integrations/builtin/app-nodes/` or `docs/integrations/builtin/trigger-nodes/` containing:

  - A text file named `n8n-nodes-base.<node-name>.md` describing the functionality of the relevant node.
* **Credentials:** Create a document with the name of the node at `docs/integrations/builtin/credentials/` containing:
  - A text file with the node name describing how to obtain credentials for the relevant node.

A standard node doc includes the following parts:

* Node description
  - Describe briefly the purpose and function of the node.
* Operations
  - Enter the resources and operations exactly as they are named in the nodes.

In the credentials doc:

* If there is more than one authentication method, list OAuth first.
* If possible, avoid documenting external products. Instead, provide links to the relevant product documentation. For example, for guidance on getting credentials (such as how to get an API token for a service), provide a link to the product's API authentication docs. 


## Style

n8n uses the [Microsoft Writing Style Guide](https://docs.microsoft.com/en-us/style-guide/welcome/).

Refer to [Styles](https://github.com/n8n-io/n8n-docs/wiki/Styles/) for a quickstart, and guidance on style linting.

## General checklist

Before submitting a PR, make sure your contribution ticks all these boxes:

- [ ] All necessary files and images are included.
- [ ] All links are working and direct to the right location.
- [ ] All documentation files end with an empty newline.
- [ ] The commit message describes clearly and succintly the changes you made.
- [ ] The PR explains clearly and succintly the changes you made and why they are necessary.
- [ ] You have read and accepted the [code of conduct](https://github.com/n8n-io/n8n-docs/blob/master/CODE_OF_CONDUCT.md) and [contributor license agreement](https://github.com/n8n-io/n8n-docs/blob/master/CONTRIBUTOR_LICENSE_AGREEMENT.md).
