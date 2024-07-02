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

* [Environments in n8n](/source-control-environments/understand/environments/): the purpose of environments, and how they work in n8n. 
* [Git and n8n](/source-control-environments/understand/git/): Git concepts and source control in n8n.

## Choose your source control pattern

Before setting up source control and environments, you need to plan your environments, and how they relate to Git branches. n8n supports different [Branch patterns](/source-control-environments/understand/patterns/). For environments, you need to choose between two patterns: multi-instance, multi-branch, or multi-instance, single-branch. This tutorial covers both patterns.

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

If you want to avoid logging in to your production instance to pull, you can use a [GitHub Action](https://docs.github.com/en/actions/creating-actions/about-custom-actions){:target=_blank .external-link} and the [n8n API](/api/) to automatically pull every time you push new work to your production or main branch.

--8<-- "_snippets/source-control-environments/github-action.md"


## Next steps

Learn more about:

* [Environments in n8n](/source-control-environments/understand/environments/) and [Git and n8n](/source-control-environments/understand/git/)
* [Source control patterns](/source-control-environments/understand/patterns/)
* Reusable [Variables](/code/variables/) and [Managing variables using the API](/source-control-environments/using/manage-variables/) when using source control.
