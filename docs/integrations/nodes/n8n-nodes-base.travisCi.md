# Travis CI

[Travis CI](https://travis-ci.com) is a hosted continuous integration service used to build and test software projects hosted at GitHub and Bitbucket.

!!! note "🔑 Credentials"
    You can find authentication information for this node [here](/integrations/credentials/travisCi/).


## Basic Operations

* Build
    * Cancel a build
    * Get a build
    * Get all builds
    * Restart a build
    * Trigger a build

## Example Usage

This workflow allows you to trigger a build using the Travis CI node. You can also find the [workflow](https://n8n.io/workflows/658) on n8n.io. This example usage workflow would use the following nodes.
- [Start](/integrations/core-nodes/n8n-nodes-base.start/)
- [Travis CI]()

The final workflow should look like the following image.

![A workflow with the Travis CI node](/_images/integrations/nodes/travisci/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.


### 2. Travis CI node (trigger: build)

1. First of all, you'll have to enter credentials for the Travis CI node. You can find out how to do that [here](/integrations/credentials/travisCi/).
2. Select 'Trigger' from the ***Operation*** dropdown list.
3. Enter the repository name in the ***Slug*** field in the `ownerName/repositoryName` format.
4. Enter the branch name in the ***Branch*** field.
5. Click on ***Execute Node*** to run the node.

![Using the Travis CI node to trigger a build](/_images/integrations/nodes/travisci/travisci_node.png)
