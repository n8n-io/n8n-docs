---
title: Travis CI
description: Documentation for the Travis CI node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
---

# Travis CI

The Travis CI node allows you to automate work in Travis CI, and integrate Travis CI with other applications. n8n has built-in support for a wide range of Travis CI features, including cancelling and getting builds. 

On this page, you'll find a list of operations the Travis CI node supports and links to more resources.

!!! note "Credentials"
    Refer to [Travis CI credentials](/integrations/builtin/credentials/travisci/) for guidance on setting up authentication. 

!!! note "Examples and templates"
    For usage examples and templates to help you get started, take a look at n8n's [Travis CI integrations](https://n8n.io/integrations/travisci/){:target="_blank" .external-link} list.


## Basic Operations

* Build
    * Cancel a build
    * Get a build
    * Get all builds
    * Restart a build
    * Trigger a build

## Example Usage

This workflow allows you to trigger a build using the Travis CI node. You can also find the [workflow](https://n8n.io/workflows/658) on n8n.io. This example usage workflow would use the following nodes.
- [Start](/integrations/builtin/core-nodes/n8n-nodes-base.start/)
- [Travis CI]()

The final workflow should look like the following image.

![A workflow with the Travis CI node](/_images/integrations/builtin/app-nodes/travisci/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.


### 2. Travis CI node (trigger: build)

1. First of all, you'll have to enter credentials for the Travis CI node. You can find out how to do that [here](/integrations/builtin/credentials/travisci/).
2. Select 'Trigger' from the ***Operation*** dropdown list.
3. Enter the repository name in the ***Slug*** field in the `ownerName/repositoryName` format.
4. Enter the branch name in the ***Branch*** field.
5. Click on ***Execute Node*** to run the node.

![Using the Travis CI node to trigger a build](/_images/integrations/builtin/app-nodes/travisci/travisci_node.png)

