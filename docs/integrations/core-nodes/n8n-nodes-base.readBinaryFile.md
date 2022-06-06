# Read Binary File

The Read Binary File node is used to read a file from the host machine that runs n8n.

!!! note "Keep in mind"
    1. If you are running n8n in Docker, your command will run on the n8n container and not the Docker host.

    2. This node will look for files relative to the n8n install path. It is recommended to use absolute file paths to prevent any errors.


## Node Reference

1. **File Path** field: This field specifies the path to the file.
2. **Property Name** field: Name of the binary property to which to write the data of the read file.

## Example Usage

This workflow allows you to read a file from the host machine using the Read Binary File node. You can also find the [workflow](https://n8n.io/workflows/577) on the website. This example usage workflow would use the following two nodes.

- [Start](/integrations/core-nodes/n8n-nodes-base.start/)
- [Read Binary File]()


The final workflow should look like the following image.

![A workflow with the Read Binary File node](/_images/integrations/core-nodes/readbinaryfile/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Read Binary File node

1. Enter the path to the file you want to read in the **File Path** field.
2. Click on **Execute Node** to run the workflow.
