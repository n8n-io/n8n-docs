# Git

[Git](https://git-scm.com/) is a free and open-source distributed version control system designed to handle everything from small to large projects with speed and efficiency.

!!! note "🔑 Credentials"
    You can find authentication information for this node [here](/workflow/integrations/credentials/git/).



## Basic Operations

* Add a file or folder to commit
* Add configuration property
* Clone a repository
* Commit files or folders to git
* Fetch from remote repository
* Return current configuration
* Return git commit history
* Pull from remote repository
* Push to remote repository
* Push Tags to remote repository
* Return status of current repository
* Create a new tag
* Set the user

## Example Usage

This workflow allows you to add, commit, and push changes to a git repository. You can also find the [workflow](https://n8n.io/workflows/1115) on Workflow².io. This example usage workflow would use the following nodes.
- [Start](/workflow/integrations/core-nodes/n8n-nodes-base.start/)
- [Git]()

The final workflow should look like the following image.

![A workflow with the Git node](/_images/integrations/core-nodes/git/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Git node (Add)

This node will add the `README.md` file to the staging area. If you want to add a different file, enter the path of that file instead.

1. Select 'Add' from the ***Operation*** dropdown list.
2. Enter the repository path in the ***Repository Path*** field.
3. Enter the file path in the ***Paths to Add*** field.
4. Click on ***Execute Node*** to run the node.

In the screenshot below, you will notice that the node adds the `README.md` file to the staging area.

![Using the Git node to add a file to the staging area](/_images/integrations/core-nodes/git/git_node.png)

### 3. Git1 node (Commit)

This node will commit all the changes that were added to the staging area by the previous node.

1. Select 'Commit' from the ***Operation*** dropdown list.
2. Click on the gears icon next to the ***Repository Path*** field and click on ***Add Expression***.
3. Select the following in the ***Variable Selector*** section: Nodes > Git > Parameters > repositoryPath. You can also add the following expression: `{{$node["Git"].parameter["repositoryPath"]}}`.
4. Enter a commit message in the ***Message*** field.
5. Click on ***Execute Node*** to run the node.

In the screenshot below, you will notice that the node creates a new commit.

![Using the Git node to commit changes](/_images/integrations/core-nodes/git/git1_node.png)

### 4. Git2 node (Log)

This node will return the commit logs of your repository.

1. Click on the gears icon next to the ***Repository Path*** field and click on ***Add Expression***.
2. Select the following in the ***Variable Selector*** section: Nodes > Git > Parameters > repositoryPath. You can also add the following expression: `{{$node["Git"].parameter["repositoryPath"]}}`.
3. Toggle ***Return All*** to `true`. This option will return all the logs.
4. Click on ***Execute Node*** to run the node.

In the screenshot below, you will notice that the node creates a new commit.

![Using the Git node to log the commits](/_images/integrations/core-nodes/git/git2_node.png)

### 5. Git3 node (Push)

This node will push the changes to a cloud repository.

1. Select 'Push' from the ***Operation*** dropdown list.
2. Click on the gears icon next to the ***Repository Path*** field and click on ***Add Expression***.
3. Select the following in the ***Variable Selector*** section: Nodes > Git > Parameters > repositoryPath. You can also add the following expression: `{{$node["Git"].parameter["repositoryPath"]}}`.
4. Click on ***Execute Node*** to run the node.

**Note:** If you're not using SSH, you will have to create credentials to authenticate yourself. You also need to set an upstream branch to push the changes. This is required only once. You can set up an upstream branch by executing the command `git push -u origin master` from a terminal.

In the screenshot below, you will notice that the node pushes the local changes to a cloud repository.

![Using the Git node to push the changes](/_images/integrations/core-nodes/git/git3_node.png)
