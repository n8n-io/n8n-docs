---
permalink: /nodes/n8n-nodes-base.travisCi
---

# TravisCI

[Travis CI](https://travis-ci.com) is a hosted continuous integration service used to build and test software projects hosted at GitHub and Bitbucket.

::: tip 🔑 Credentials
You can find authentication information for this node [here](../../../credentials/TravisCI/README.md).
:::

## Basic Operations

- Build
    - Cancel a build
    - Get a build
    - Get all builds
    - Restart a build
    - Trigger a build

## Example Usage

This workflow allows you to trigger a build using the TravisCI node. You can also find the [workflow](https://n8n.io/workflows/658) on n8n.io. This example usage workflow would use the following nodes.
- [Start](../../core-nodes/Start/README.md)
- [TravisCI]()

The final workflow should look like the following image.

![A workflow with the TravisCI node](./workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.


### 2. TravisCI node (trigger: build)

1. First of all, you'll have to enter credentials for the TravisCI node. You can find out how to do that [here](../../../credentials/TravisCI/README.md).
2. Select 'Trigger' from the ***Operation*** dropdown list.
3. Enter the repository name in the ***Slug*** field.
4. Enter the branch name in the ***Branch*** field.
5. Click on ***Execute Node*** to run the node.

![Using the TravisCI node to trigger a build](./TravisCI_node.png)
