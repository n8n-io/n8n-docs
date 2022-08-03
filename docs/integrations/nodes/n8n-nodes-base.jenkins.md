# Jenkins

[Jenkins](https://www.jenkins.io/) is an open source automation server that provides hundreds of plugins to support building, deploying and automating any project.

!!! note "Credentials"
    You can find authentication information for this node [here](/integrations/credentials/jenkins/).


## Basic Operations

* Build
    * List Builds
* Instance
    * Cancel quiet down state
    * Put Jenkins in quiet mode, no builds can be started, Jenkins is ready for shutdown
    * Restart Jenkins immediately on environments where it is possible
    * Restart Jenkins once no jobs are running on environments where it is possible
    * Shutdown once no jobs are running
    * Shutdown Jenkins immediately
* Job
    * Copy a specific job
    * Create a new job
    * Trigger a specific job
    * Trigger a specific job

## Example Usage

This workflow allows you to get list of builds in Jenkins. You can also find the [workflow](https://n8n.io/workflows/454) on the website. This example usage workflow would use the following two nodes.
- [Start](/integrations/core-nodes/n8n-nodes-base.start/)
- [Jenkins]()

The final workflow should look like the following image.

![A workflow with the CircleCI node](/_images/integrations/nodes/jenkins/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. CircleCI node

1. First of all, you'll have to enter credentials for the Jenkins node. You can find out how to do that [here](/integrations/credentials/jenkins/).
2. Select the *Build*  from the dropdown in the *Resources* field.
3. *Get All Builds* is not selected in *Operations* dropdown.
4. Adjust the *depth* or add optional parameter by clickin *Add Field* button
5. Click on *Execute Node* to run the workflow.
