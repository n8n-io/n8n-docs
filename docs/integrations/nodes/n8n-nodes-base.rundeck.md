# Rundeck

[Rundeck](https://www.rundeck.com/) is an open-source runbook automation for incident management, business continuity, and self-service operations.

!!! note "Credentials"
    You can find authentication information for this node [here](/integrations/credentials/rundeck/).


## Basic Operations

**Job**
- Execute a job
- Get metadata of a job


## Example Usage

This workflow allows you to execute a job on Rundeck. You can also find the [workflow](https://n8n.io/workflows/539) on this website. This example usage workflow uses the following two nodes.

- [Start](/integrations/core-nodes/n8n-nodes-base.start/)
- [Rundeck]()

The final workflow should look like the following image.

![A workflow with the Rundeck node](/_images/integrations/nodes/rundeck/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Rundeck node

1. First of all, you'll have to enter credentials for the Rundeck node. You can find out how to do that [here](/integrations/credentials/rundeck/).
2. Enter your Rundeck job ID in the *Job Id* field. You can find instructions on how to obtain the job ID in the FAQs below.
3. Click on *Execute Node* to run the workflow.

## FAQs

### How do I find the Job ID?

1. Access your Rundeck dashboard.
2. Open the project that contains the job you want to use with n8n.
3. In the sidebar, click on 'JOBS'.
4. Under 'All Jobs', click on the name of the job you want to use with n8n.
5. In the top left corner, under the name of the job, copy the string that is displayed in smaller font below the job name. This is your job ID.
6. Paste this job ID in the `Job Id` field in n8n.
