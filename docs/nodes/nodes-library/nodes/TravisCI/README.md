---
description: Learn how to use the Travis CI node in n8n
---

# Travis CI

[Travis CI](https://travis-ci.com) is a hosted continuous integration service used to build and test software projects hosted at GitHub and Bitbucket.

::: tip 🔑 Credentials
You can find authentication information for this node [here](../../../credentials/TravisCI/README.md).
:::

## Basic Operations

::: details Build
- Cancel a build
- Get a build
- Get all builds
- Restart a build
- Trigger a build
:::

## Example Usage

This workflow allows you to trigger a build using the Travis CI node. You can also find the [workflow](https://n8n.io/workflows/658) on n8n.io. This example usage workflow would use the following nodes.
- [Start](../../core-nodes/Start/README.md)
- [Travis CI]()

The final workflow should look like the following image.

![A workflow with the Travis CI node](./workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.


### 2. Travis CI node (trigger: build)

1. First of all, you'll have to enter credentials for the Travis CI node. You can find out how to do that [here](../../../credentials/TravisCI/README.md).
2. Select 'Trigger' from the ***Operation*** dropdown list.
3. Enter the repository name in the ***Slug*** field in the `ownerName/repositoryName` format.
4. Enter the branch name in the ***Branch*** field.
5. Click on ***Execute Node*** to run the node.

![Using the Travis CI node to trigger a build](./TravisCI_node.png)
