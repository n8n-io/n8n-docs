

# source-control-environments/create-environments.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Tutorial - Create environments with source control
description: How to use n8n's source control feature to create environments.
contentType: tutorial
---

# Tutorial: Create environments with source control

--8<-- "_snippets/source-control-environments/feature-availability.md"

This tutorial walks through the process of setting up environments end-to-end. You'll create two environments: development and production. It uses GitHub as the Git provider. The process is similar for other providers. 

n8n has built its environments feature on top of Git, a version control software. You link an n8n instance to a Git branch, and use a push-pull pattern to move work between environments. You should have some understanding of environments and Git. If you need more information on these topics, refer to:

* [Environments in n8n](/source-control-environments/understand/environments.md): the purpose of environments, and how they work in n8n. 
* [Git and n8n](/source-control-environments/understand/git.md): Git concepts and source control in n8n.

## Choose your source control pattern

Before setting up source control and environments, you need to plan your environments, and how they relate to Git branches. n8n supports different [Branch patterns](/source-control-environments/understand/patterns.md). For environments, you need to choose between two patterns: multi-instance, multi-branch, or multi-instance, single-branch. This tutorial covers both patterns.

--8<-- "_snippets/source-control-environments/one-direction.md"

### Multiple instances, multiple branches

![Diagram](/_images/source-control-environments/vc-multi-multi.png)

--8<-- "_snippets/source-control-environments/multi-instance-multi-branch-pros-cons.md"


### Multiple instances, one branch

![Diagram](/_images/source-control-environments/vc-multi-one.png)

--8<-- "_snippets/source-control-environments/multi-instance-one-branch-pros-cons.md"

## Set up your repository

Once you've chosen your pattern, you need to set up your GitHub repository.

=== "Multi-branch"

    1. [Create a new repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-new-repository){:target=_blank .external-link}. 
	    * Make sure the repository is private, unless you want your workflows, tags, and variable and credential stubs exposed to the internet.
	    * Create the new repository with a README so you can immediately create branches. 
    1. Create one branch named `production` and another named `development`. Refer to [Creating and deleting branches within your repository](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-and-deleting-branches-within-your-repository){:target=_blank .external-link} for guidance.
			

=== "Single-branch"

    [Create a new repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-new-repository){:target=_blank .external-link}. 

      * Make sure the repository is private, unless you want your workflows, tags, and variable and credential stubs exposed to the internet.  
      * Create the new repository with a README. This creates the `main` branch, which you'll connect to. 		
		

## Connect your n8n instances to your repository

Create two n8n instances, one for development, one for production. 

### Configure Git in n8n

--8<-- "_snippets/source-control-environments/configure-git-in-n8n.md"

### Set up a deploy key

Set up SSH access by creating a deploy key for the repository using the SSH key from n8n. The key must have write access. Refer to [GitHub | Managing deploy keys](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/managing-deploy-keys){:target=_blank .external-link} for guidance.

### Connect n8n and configure your instance

=== "Multi-branch"

    1. In **Settings** > **Environments** in n8n, select **Connect**. n8n connects to your Git repository.
    1. Under **Instance settings**, choose which branch you want to use for the current n8n instance. Connect the production branch to the production instance, and the development branch to the development instance.
    1. Production instance only: select **Protected instance** to prevent users editing workflows in this instance.
    1. Select **Save settings**.

=== "Single-branch"

    1. In **Settings** > **Environments** in n8n, select **Connect**. 
	  1. Under **Instance settings**, select the main branch.
    1. Production instance only: select **Protected instance** to prevent users editing workflows in this instance.
    1. Select **Save settings**.

## Push work from development

In your development instance, create a few workflows, tags, variables, and credentials.

--8<-- "_snippets/source-control-environments/push.md"

## Pull work to production

Your work is now in GitHub. If you're using a multi-branch setup, it's on the development branch. If you chose the single-branch setup, it's on main.

=== "Multi-branch"

    1. In GitHub, create a pull request to merge development into production.
    1. Merge the pull request.
    1. In your production instance, select **Pull** <span class="inline-image">![Pull icon](/_images/source-control-environments/pull-icon.png){.off-glb}</span> in the main menu.

=== "Single-branch"

    In your production instance, select **Pull** <span class="inline-image">![Pull icon](/_images/source-control-environments/pull-icon.png){.off-glb}</span> in the main menu.

--8<-- "_snippets/source-control-environments/push-pull-menu-state.md"

### Optional: Use a GitHub Action to automate pulls

If you want to avoid logging in to your production instance to pull, you can use a [GitHub Action](https://docs.github.com/en/actions/creating-actions/about-custom-actions){:target=_blank .external-link} and the [n8n API](/api/index.md) to automatically pull every time you push new work to your production or main branch.

--8<-- "_snippets/source-control-environments/github-action.md"


## Next steps

Learn more about:

* [Environments in n8n](/source-control-environments/understand/environments.md) and [Git and n8n](/source-control-environments/understand/git.md)
* [Source control patterns](/source-control-environments/understand/patterns.md)


# source-control-environments/index.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Source control and environments
description: Overview of source control and environments in n8n
contentType: overview
hide:
  - toc
---

# Source control and environments

--8<-- "_snippets/source-control-environments/feature-availability.md"

n8n uses Git-based source control to support environments. Linking your n8n instances to a Git repository lets you create multiple n8n environments, backed by Git branches.

In this section:

* [Understand](/source-control-environments/understand/index.md):
	* [Environments in n8n](/source-control-environments/understand/environments.md): The purpose of environments, and how they work in n8n.
	* [Git and n8n](/source-control-environments/understand/git.md): How n8n uses Git. 
	* [Branch patterns](/source-control-environments/understand/patterns.md): The possible relationships between n8n instances and Git branches.
* [Set up source control for environments](/source-control-environments/setup.md): How to connect your n8n instance to Git.
* [Using](/source-control-environments/using/index.md):
	* [Push and pull](/source-control-environments/using/push-pull.md): Send work to Git, and fetch work from Git to your instance.
	* [Copy work between environments](/source-control-environments/using/copy-work.md): How to copy work between different n8n instances.
* [Tutorial: Create environments with source control](/source-control-environments/create-environments.md): An end-to-end tutorial, setting up environments using n8n's recommended configurations.

Related sections:

* [Variables](/code/variables.md): reusable values.
* [External secrets](/external-secrets.md): manage [credentials](/glossary.md#credential-n8n) with an external secrets vault.


# source-control-environments/setup.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Set up source control
description: Link n8n to your Git provider.
contentType: howto
---

# Set up source control for environments

Link a Git repository to an n8n instance and configure your source control.

n8n uses source control to provide environments. Refer to [Environments in n8n](/source-control-environments/understand/environments.md) for more information.

## Prerequisites

To use source control with n8n, you need a Git repository that allows SSH access. 

This document assumes you are familiar with Git and your Git provider.

## Step 1: Set up your repository and branches

For a new setup:

1. Create a new repository for use with n8n. 
1. Create the branches you need. For example, if you plan to have different environments for test and production, set up a branch for each.

To help decide what branches you need for your use case, refer to [Branch patterns](/source-control-environments/understand/patterns.md).

## Step 2: Configure Git in n8n

--8<-- "_snippets/source-control-environments/configure-git-in-n8n.md"

## Step 3: Set up a deploy key

Set up SSH access by creating a deploy key for the repository using the SSH key from n8n. The key must have write access. 

The steps depend on your Git provider. Help links for common providers:

* [GitHub | Managing deploy keys](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/managing-deploy-keys){:target=_blank .external-link}
* [GitLab | Deploy keys](https://docs.gitlab.com/ee/user/project/deploy_keys/){:target=_blank .external-link}

## Step 4: Connect n8n and configure your instance

1. In **Settings** > **Environments** in n8n, select **Connect**. n8n connects to your Git repository.
1. Under **Instance settings**, choose which branch you want to use for the current n8n instance.
1. **Optional**: select **Protected instance** to prevent users editing workflows in this instance. This is useful for protecting production instances.
1. **Optional**: choose a custom color for the instance. This will appear in the menu next to the source control push and pull buttons. It helps users know which instance they're in.
1. Select **Save settings**.



# source-control-environments/understand/environments.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Environments in n8n
description: Understand the concepts behind environments in n8n.
contentType: explanation
---

# Environments in n8n

n8n has built its environments feature on top of Git, a version control software. This document helps you understand:

* The purpose of environments.
* How environments work in n8n.

## Environments: What and why

In software development, the environment is all the infrastructure and tooling around the code, including the tools that run the software, and the specific configuration of those tools. For a more detailed introduction to environments in software development, refer to [Codecademy | Environments](https://www.codecademy.com/article/environments){:target=_blank .external-link}.

Low-code development in n8n is similar. n8n is where you build and run your workflows. Your instance may have particular configurations: on Cloud, n8n determines the configuration. On self-hosted instances, there are extensive [configuration options](/hosting/configuration/configuration-methods.md). You may also have made changes to the settings of your instance. This combination of n8n and your instance's specific configuration and settings is the environment your workflows run in.

There are advantages to having more than one environment. A common pattern is to have different environments for development and production:

* Development: do work and make changes.
* Production: the live environment.

A setup like this helps you make changes to workflows without breaking workflows that are in use.

## Environments in n8n

In n8n, an environment comprises two parts, an n8n instance and a Git branch:

* The n8n instance is where you build and run workflows.
* The Git branch stores copies of the workflows, as well as tags, and variable and credential stubs.

n8n doesn't sync credentials and variable values with Git. You must set up the credentials and variable values manually when setting up a new instance. For more information, refer to [Push and pull | What gets committed](/source-control-environments/using/push-pull.md#what-gets-committed).

How you copy work between environments depends on your branch and n8n instance configuration:

* Multiple instances, one branch: you can push from one instance to the Git branch, then pull the work to another instance.
* Multiple instances, multiple branches: you need to create a pull request and merge in your Git provider. For example, if you have development, test, and production branches, each linked to their own instance, you need to merge the development branch into test to make the work from the development instance available on the test instance. Refer to [Copy work between environments](/source-control-environments/using/copy-work.md) for more information, including steps to partially automate the process.

For detailed guidance on pushing and pulling work, refer to [Push and pull](/source-control-environments/using/push-pull.md).

Refer to [Set up source control](/source-control-environments/setup.md) to learn more about linking your n8n instance to Git, or follow the [Tutorial: Create environments with source control](/source-control-environments/create-environments.md) to set up your environments using one of n8n's recommended configurations.


# source-control-environments/understand/git.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Git and n8n
description: Git concepts and limitations in n8n.
contentType: explanation
---

# Git and n8n

n8n uses Git to provide source control. To use this feature, it helps to have some knowledge of basic Git concepts. n8n doesn't implement all Git functionality: you shouldn't view n8n's source control as full version control.


/// note | New to Git and source control?
If you're new to Git, don't panic. You don't need to learn Git to use n8n. This document explains the concepts you need. You do need some Git knowledge to set up the source control, as this involves work in your Git provider.
///
/// note | Familiar with Git and source control?
If you're familiar with Git, don't rely on behaviors matching exactly. In particular, be aware that source control in n8n doesn't support a pull request-style review and merge process, unless you do this outside n8n in your Git provider.
///

This page introduces the Git concepts and terminology used in n8n. It doesn't cover everything you need to set up and manage a repository. The person doing the [Setup](/source-control-environments/setup.md) should have some familiarity with Git and with their Git hosting provider.

/// note | This is a brief introduction
Git is a complex topic. This section provides a brief introduction to the key terms you need when using environments in n8n. If you want to learn about Git in depth, refer to [GitHub | Git and GitHub learning resources](https://docs.github.com/en/get-started/quickstart/git-and-github-learning-resources){:target=_blank .external-link}.
///
## Git overview

[Git](https://git-scm.com/){:target=_blank .external-link} is a tool for managing, tracking, and collaborating on multiple versions of documents. It's the basis for widely used platforms such as [GitHub](https://github.com/){:target=_blank .external-link} and [GitLab](https://about.gitlab.com/){:target=_blank .external-link}.

## Branches: Multiple copies of a project

Git uses branches to maintain multiple copies of a document alongside each other. Every branch has its own version. A common pattern is to have a main branch, and then everyone who wants to contribute to the project works on their own branch (copy). When they finish their work, their branch is merged back into the main branch.

![Diagram](/_images/source-control-environments/simple-git-branch.png)

## Local and remote: Moving work between your machine and a Git provider

A common pattern when using Git is to install Git on your own computer, and use a Git provider such as GitHub to work with Git in the cloud. In effect, you have a Git repository (project) on GitHub, and work with copies of it on your local machine.

n8n uses this pattern for source control: you'll work with your workflows on your n8n instance, but send them to your Git provider to store them.

## Push, pull, and commit

n8n uses three key Git processes:

* **Push**: send work from your instance to Git. This saves a copy of your workflows and tags, as well as credential and variable stubs, to Git. You can choose which workflows you want to save.
* **Pull**: get the workflows, tags, and variables from Git and load it into n8n. You will need to populate any credentials or variable stubs included in the refreshed items.

    /// warning | Pulling overwrites your work
    If you have made changes to a workflow in n8n, you must push the changes to Git before pulling. When you pull, it overwrites any changes you've made if they aren't stored in Git.
    ///
		
* **Commit**: a commit in n8n is a single occurrence of pushing work to Git. In n8n, commit and push happen at the same time.

Refer to [Push and pull](/source-control-environments/using/push-pull.md) for detailed information about how n8n interacts with Git.


# source-control-environments/understand/index.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Understand source control and environments
description: Understand how source control and environments work in n8n.
contentType: overview
hide:
  - toc
---

# Understand source control and environments

--8<-- "_snippets/source-control-environments/feature-availability.md"

* [Environments in n8n](/source-control-environments/understand/environments.md): The purpose of environments, and how they work in n8n.
* [Git in n8n](/source-control-environments/understand/git.md): How n8n uses Git. 
* [Branch patterns](/source-control-environments/understand/patterns.md): The possible relationships between n8n instances and Git branches.


# source-control-environments/understand/patterns.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Branch patterns
description: Understand the different relationships between n8n instances and Git branches that are possible with source control.
contentType: explanation
---

# Branch patterns

The relationship between n8n instances and Git branches is flexible. You can create different setups depending on your needs. 

--8<-- "_snippets/source-control-environments/one-direction.md"

## Multiple instances, multiple branches

This pattern involves having multiple n8n instances, each one linked to its own branch. 

You can use this pattern for environments. For example, create two n8n instances, development and production. Link them to their own branches. Push work from your development instance to its branch, do a pull request to move work to the production branch, then pull to the production instance.

--8<-- "_snippets/source-control-environments/multi-instance-multi-branch-pros-cons.md"

![Diagram](/_images/source-control-environments/vc-multi-multi.png)

## Multiple instances, one branch

Use this pattern if you want the same workflows, tags, and variables everywhere, but want to use them in different n8n instances. 

You can use this pattern for environments. For example, create two n8n instances, development and production. Link them both to the same branch. Push work from development, and pull it into production.

This pattern is also useful when testing a new version of n8n: you can create a new n8n instance with the new version, connect it to the Git branch and test it, while your production instance remains on the older version until you're confident it's safe to upgrade.

--8<-- "_snippets/source-control-environments/multi-instance-one-branch-pros-cons.md"

![Diagram](/_images/source-control-environments/vc-multi-one.png)

## One instance, multiple branches

The instance owner can change which Git branch connects to the instance. The full setup in this case is likely to be a [Multiple instances, multiple branches](#multiple-instances-multiple-branches) pattern, but with one instance switching between branches.

This is useful to review work. For example, different users could work on their own instance and push to their own branch. The reviewer could work in a review instance, and switch between branches to load work from different users.

/// note | No cleanup
n8n doesn't clean up the existing contents of an instance when changing branches. Switching branches in this pattern results in all the workflows from each branch being in your instance.
///
![Diagram](/_images/source-control-environments/vc-one-multi.png)

## One instance, one branch

This is the simplest pattern.

![Diagram](/_images/source-control-environments/vc-one-one.png)


# source-control-environments/using/copy-work.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Copy work between environments
description: How to get changes from one environment into another.
contentType: howto
---

# Copy work between environments

The steps to send work from one n8n instance to another are different depending on whether you use a single Git branch or multiple branches.

## Single branch

If you have a single Git branch the steps to copy work are:

1. Push work from one instance to the Git branch.
1. Log in to the other instance to pull the work from Git. You can [automate pulls](#automatically-send-changes-to-n8n).

## Multiple branches

If you have more than one Git branch, you need to merge the branches in your Git provider to copy work between environments. You can't copy work directly between environments in n8n. 

A common pattern is:

1. Do work in your developments instance.
1. Push the work to the development branch in Git.
1. Merge your development branch into your production branch.	Refer to the documentation for your Git provider for guidance on doing this:  
	* [GitHub: Creating a pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request){:target=_blank .external-link}
	* [GitLab: Creating merge requests](https://docs.gitlab.com/ee/user/project/merge_requests/creating_merge_requests.html){:target=_blank .external-link}
	* [Git: Basic branching and merging](https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging){:target=_blank .external-link}
1. In your production n8n instance, pull the changes. You can [automate pulls](#automatically-send-changes-to-n8n).

## Automatically send changes to n8n

You can automate parts of the process of copying work, using the `/source-control/pull` API endpoint. Call the API after merging the changes:

```curl
curl --request POST \
	--location '<YOUR-INSTANCE-URL>/api/v1/source-control/pull' \
	--header 'Content-Type: application/json' \
	--header 'X-N8N-API-KEY: <YOUR-API-KEY>' \
	--data '{"force": true}'
```

This means you can use a GitHub Action or GitLab CI/CD to automatically pull changes to the production instance on merge.

--8<-- "_snippets/source-control-environments/github-action.md"



# source-control-environments/using/index.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Using source control and environments
description: How to use source control and environments in n8n.
contentType: overview
hide:
  - toc
---

# Using source control and environments

--8<-- "_snippets/source-control-environments/feature-availability.md"

* [Push and pull](/source-control-environments/using/push-pull.md): Send work to Git, and fetch work from Git to your instance. Understand what gets committed, and how n8n handles merge conflicts.
* [Copy work between environments](/source-control-environments/using/copy-work.md): How to copy work between different n8n instances.


# source-control-environments/using/push-pull.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Push and pull
description: Send work to Git, and fetch work from Git to your instance.
contentType: howto
---

# Push and pull

If your n8n instance connects to a Git repository, you need to keep your work in sync with Git.

This document assumes some familiarity with Git concepts and terminology. Refer to [Git and n8n](/source-control-environments/understand/git.md) for an introduction to how n8n works with Git.

--8<-- "_snippets/source-control-environments/one-direction.md"

## Fetch other people's work

/// note | Restricted feature
Not all users can fetch changes from Git. You must be an n8n instance owner or admin to push or pull changes.
///
To pull work from Git, select **Pull** <span class="inline-image">![Pull icon](/_images/source-control-environments/pull-icon.png){.off-glb}</span> in the main menu.

--8<-- "_snippets/source-control-environments/push-pull-menu-state.md"

n8n may display a warning about overriding local changes. Select **Pull and override** to override your local work with the content in Git.

When the changes include new variable or credential stubs, n8n notifies you that you need to populate the values for the items before using them.

/// info | How deleted resources are handled
When workflows, credentials, variables, and tags are deleted from the repository, your local versions of these resources aren't deleted automatically. Instead, when you pull repository changes, n8n notifies you about any outdated resources and asks if you'd like to delete them.
///

### Workflow and credential owner may change on pull

When you pull from Git to an n8n instance, n8n tries to assign workflows and credentials to a matching user or project.

If the original owner is a user:

If the same owner is available on both instances (matching email), the owner remains the same. If the original owner isn't on the new instance, n8n sets the user performing the pull as the workflow owner.

If the original owner is a [project](/user-management/rbac/index.md):

n8n tries to match the original project name to a project name on the new instance. If no matching project exists, n8n creates a new project with the name, assigns the current user as project owner, and imports the workflows and credentials to the project.

### Pulling may cause brief service interruption

If you pull changes to an active workflow, n8n sets the workflow to inactive while pulling, then reactivates it. This may result in a few seconds of downtime for the workflow.

## Send your work to Git

/// note | Restricted feature
Ordinary users can't send work to Git. You must be an n8n instance owner, admin, or project owner to send work to Git.
///

--8<-- "_snippets/source-control-environments/push.md"

## What gets committed

n8n commits the following to Git:

* Workflows, including their tags and the email address of the workflow owner. You can choose which workflows to push.
* Credential stubs (ID, name, type)
* Variable stubs (ID and name)
* Projects
* Folders

## Merge behaviors and conflicts

n8n's implementation of source control is opinionated. It resolves merge conflicts for credentials and variables automatically. n8n can't detect conflicts on workflows.

### Workflows

You have to explicitly tell n8n what to do about workflows when pushing or pulling. The Git repository acts as the source of truth.

When pulling, you might get warned that your local copy of a workflow differs from Git, and if you accept, your local copy would be overridden. Be careful not to lose relevant changes when pulling.

When you push, your local workflow will override what's in Git, so make sure that you have the most up to date version or you risk overriding recent changes.

To prevent the issue described above, you should immediately push your changes to a workflow once you finish working on it. Then it's safe to pull.

To avoid losing data:

* Design your source control setup so that workflows flow in one direction. For example, make edits on a development instance, push to Git, then pull to production. Don't make edits on the production instance and push them.
* Don't push all workflows. Select the ones you need.
* Be cautious about manually editing files in the Git repository.

### Credentials, variables and workflow tags

Credentials and variables can't have merge issues, as n8n chooses the version to keep.

On pull:

* If the tag, variable or credential doesn't exist, n8n creates it.
* If the tag, variable or credential already exists, n8n doesn't update it, unless:
	* You set the value of a variable using the API or externally. The new value overwrites any existing value.
	* The credential name has changed. n8n uses the version in Git.
	* The name of a tag has changed. n8n updates the tag name. Be careful when renaming tags as tag names are unique and this could cause database issues when it comes to uniqueness during the pull process.

On push:

* n8n overwrites the entire variables and tags files.
* If a credential already exists, n8n overwrites it with the changes, but doesn't apply these changes to existing credentials on pull.

/// note | Manage credentials with an external secrets vault
If you need different credentials on different n8n environments, use [external secrets](/external-secrets.md).
///
