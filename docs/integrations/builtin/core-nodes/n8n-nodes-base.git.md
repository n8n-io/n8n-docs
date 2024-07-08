---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Git
description: Documentation for the Git node in n8n, a workflow automation platform. Includes guidance on usage, and links to examples.
contentType: integration
---

# Git

[Git](https://git-scm.com/) is a free and open-source distributed version control system designed to handle everything from small to large projects with speed and efficiency.

/// note | Credentials
You can find authentication information for this node [here](/integrations/builtin/credentials/git/).
///

/// note | Examples and templates
For usage examples and templates to help you get started, refer to n8n's [Git integrations](https://n8n.io/integrations/git/){:target=_blank .external-link} page.
///


## Operations

* **Add** a file or folder to commit. Performs a [git add](https://git-scm.com/docs/git-add){:target=_blank .external-link}.
* **Add Config**: Add configuration property. Performs a [git config](https://git-scm.com/docs/git-config){:target=_blank .external-link} set or add.
* **Clone** a repository: Performs a [git clone](https://git-scm.com/docs/git-clone){:target=_blank .external-link}.
* **Commit** files or folders to git. Performs a [git commit](https://git-scm.com/docs/git-commit){:target=_blank .external-link}.
* **Fetch** from remote repository. Performs a [git fetch](https://git-scm.com/docs/git-fetch){:target=_blank .external-link}.
* **List Config**: Return current configuration. Performs a [git config](https://git-scm.com/docs/git-config){:target=_blank .external-link} query.
* **Log**: Return git commit history. Performs a [git log](https://git-scm.com/docs/git-log){:target=_blank .external-link}.
* **Pull** from remote repository: Performs a [git pull](https://git-scm.com/docs/git-pull){:target=_blank .external-link}.
* **Push** to remote repository: Performs a [git push](https://git-scm.com/docs/git-push){:target=_blank .external-link}.
* **Push Tags** to remote repository: Performs a [git push --tags](https://git-scm.com/docs/git-push#Documentation/git-push.txt---tags){:target=_blank .external-link}.
* Return **Status** of current repository: Performs a [git status](https://git-scm.com/docs/git-status){:target=_blank .external-link}.
* Create a new **Tag**: Performs a [git tag](https://git-scm.com/docs/git-tag){:target=_blank .external-link}.
* **User Setup**: Set the user.

## Node parameters

All operations include the same parameter, the **Repository Path**. Enter the local path of the git repository for the operation in this field.

The [**Add**](#add-parameters), [**Add Config**](#add-config-parameters), [**Clone**](#clone-parameters), [**Commit**](#commit-parameters), [**Log**](#log-parameters), [**Push**](#push-parameters), and [**Tag**](#tag-parameters) operations have more parameters. Refer to the subsection for each operation.

### Add parameters

The add operation adds one parameter, the **Paths to Add**. Enter a comma-separated list of paths of files or folders to add in this field.

You can use absolute paths or relative paths from the **Repository Path**.

### Add Config parameters

The config operation adds two parameters:

* **Key**: Enter the name of the key to set.
* **Value**: Enter the value of the key to set.

### Clone parameters

The clone operation adds three parameters:

* **Authentication**: Select **Authenticate** to pass credentials in. Select **None** to not use authentication.
    * **Credential for Git**: If you select **Authenticate**, you must select or create credentials for the node to use. Refer to [Git credential](/integrations/builtin/credentials/git/) for more information.
* **New Repository Path**: Enter the local path where you'd like to locate the cloned repository.
* **Source Repository**: Enter the URL or path of the repository you want to clone.

### Commit parameters

The commit operation adds one parameter, the **Message**. Enter the commit message to use in this field.

### Log parameters

The log operation adds two parameters:

* **Return All**: When turned on, the node will return all results. When turned off, the node will return results up to the set **Limit**.
* **Limit**: Only available when you turn off **Return All**. Enter the maximum number of results to return.

### Push parameters

The push operation adds the **Authentication** parameter. Select **Authenticate** to pass credentials in or **None** to not use authentication.

If you select **Authenticate**, you must select or create **Credential for Git** for the node to use. Refer to [Git credential](/integrations/builtin/credentials/git/) for more information.

### Tag parameters

The tag operation adds the **Name** parameter. Enter the name of the tag to create in this field.

## Node options

The node options depend on the operation you select.

### Add Config options

The add config operation adds the **Mode** option. Choose whether to **Set** or **Append** the setting in the local config.

### Commit options

The commit operation adds the **Paths to Add** option. To commit all "added" files and folders, leave this field blank. To commit specific "added" files and folders, enter a comma-separated list of paths of files or folders in this field.

You can use absolute paths or relative paths from the **Repository Path**.

### Log options

The log operation adds the **File** option. Enter the path of a file or folder to get the history of in this field.

You can use absolute paths or relative paths from the **Repository Path**.

### Push options

The push operation adds the **Target Repository** option. Enter the URL or path of the repository to push to in this field.
