# CircleCI

The CircleCI node allows you to automate work in the CircleCI platform and integrate CircleCI with other applications. n8n has built-in support for a wide range of CircleCI features, including getting and triggering pipelines.

On this page, you'll find a list of operations the CircleCI node supports and links to more resources.

!!! note "Credentials"
  Refer to the [CircleCI credentials](https://docs.n8n.io/integrations/builtin/credentials/circleci/) for guidance on setting up authentication. 

!!! note "Examples and Templates"
  For usage examples and templates to help you get started, take a look at n8n's [CircleCI integrations](https://n8n.io/integrations/circleci/){:target=_blank .external-link} list.


## Basic Operations

* Pipeline
    * Get a pipeline
    * Get all pipelines
    * Trigger a pipeline

## Example Usage

This workflow allows you to get a pipeline in CircleCI. You can also find the [workflow](https://n8n.io/workflows/454) on the website. This example usage workflow would use the following two nodes.
- [Start](/integrations/builtin/core-nodes/n8n-nodes-base.start/)
- [CircleCI]()

The final workflow should look like the following image.

![A workflow with the CircleCI node](/_images/integrations/builtin/app-nodes/circleci/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. CircleCI node

1. First of all, you'll have to enter credentials for the CircleCI node. You can find out how to do that [here](/integrations/builtin/credentials/circleci/).
2. Select the VCS provider from the dropdown in the *Provider* field.
3. Enter the project slug in the *Project Slug* field.
4. Enter the number of the pipeline in CircleCI that you want to get in the *Pipeline Number* field.
5. Click on *Execute Node* to run the workflow.
