---
title: Tutorial - Create environments with source control
description: How to use n8n's source control feature to create environments.
contentType: tutorial
nodeTitle: 'Tutorial: Create environments with source control'
originalFilePath: source-control-environments/create-environments.md
originalUrl: 'https://docs.n8n.io/source-control-environments/create-environments'
url: >-
  https://docs.n8n.io/administer/use-source-control-and-environments/tutorial-create-environments-with-source-control
layout:
  description:
    visible: false
---

# Tutorial: Create environments with source control <a href="#tutorial-create-environments-with-source-control" id="tutorial-create-environments-with-source-control"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/2T2SmMUgiLyck7FDDwRD/" %}

This tutorial walks through the process of setting up environments end-to-end. You'll create two environments: development and production. It uses GitHub as the Git provider. The process is similar for other providers. 

n8n has built its environments feature on top of Git, a version control software. You link an n8n instance to a Git branch, and use a push-pull pattern to move work between environments. You should have some understanding of environments and Git. If you need more information on these topics, refer to:

* [Environments in n8n](work-with-environments.md): the purpose of environments, and how they work in n8n. 
* [Git and n8n](use-git-in-n8n.md): Git concepts and source control in n8n.

## Choose your source control pattern <a href="#choose-your-source-control-pattern" id="choose-your-source-control-pattern"></a>

Before setting up source control and environments, you need to plan your environments, and how they relate to Git branches. n8n supports different [Branch patterns](choose-branching-patterns.md). For environments, you need to choose between two patterns: multi-instance, multi-branch, or multi-instance, single-branch. This tutorial covers both patterns.

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/sVOSvjfqJPLqOGb1x77B/" %}

### Multiple instances, multiple branches <a href="#multiple-instances-multiple-branches" id="multiple-instances-multiple-branches"></a>

![Diagram](../.gitbook/assets/vc-multi-multi.png)

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/O5AqRfApNuiINXZOe5j1/" %}


### Multiple instances, one branch <a href="#multiple-instances-one-branch" id="multiple-instances-one-branch"></a>

![Diagram](../.gitbook/assets/vc-multi-one.png)

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/Vo4DpZeEyTa0iuufMDB8/" %}

## Set up your repository <a href="#set-up-your-repository" id="set-up-your-repository"></a>

Once you've chosen your pattern, you need to set up your GitHub repository.

{% tabs %}
{% tab title="Multi-branch" %}
1. [Create a new repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-new-repository). 
    * Make sure the repository is private, unless you want your workflows, tags, and variable and credential stubs exposed to the internet.
    * Create the new repository with a README so you can immediately create branches. 
1. Create one branch named `production` and another named `development`. Refer to [Creating and deleting branches within your repository](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-and-deleting-branches-within-your-repository) for guidance.
{% endtab %}

{% tab title="Single-branch" %}
[Create a new repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-new-repository). 

  * Make sure the repository is private, unless you want your workflows, tags, and variable and credential stubs exposed to the internet.  
  * Create the new repository with a README. This creates the `main` branch, which you'll connect to. 		
{% endtab %}
{% endtabs %}

## Connect your n8n instances to your repository <a href="#connect-your-n8n-instances-to-your-repository" id="connect-your-n8n-instances-to-your-repository"></a>

Create two n8n instances, one for development, one for production. 

### Configure Git in n8n <a href="#configure-git-in-n8n" id="configure-git-in-n8n"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/UqTgO2VbAzax4T8z4Fyh/" %}

### Set up a deploy key <a href="#set-up-a-deploy-key" id="set-up-a-deploy-key"></a>

Set up SSH access by creating a deploy key for the repository using the SSH key from n8n. The key must have write access. Refer to [GitHub | Managing deploy keys](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/managing-deploy-keys) for guidance.

### Connect n8n and configure your instance <a href="#connect-n8n-and-configure-your-instance" id="connect-n8n-and-configure-your-instance"></a>

{% tabs %}
{% tab title="Multi-branch" %}
1. In **Settings** > **Environments** in n8n, select **Connect**. n8n connects to your Git repository.
1. Under **Instance settings**, choose which branch you want to use for the current n8n instance. Connect the production branch to the production instance, and the development branch to the development instance.
1. Production instance only: select **Protected instance** to prevent users editing workflows in this instance.
1. Select **Save settings**.
{% endtab %}

{% tab title="Single-branch" %}
1. In **Settings** > **Environments** in n8n, select **Connect**. 
  1. Under **Instance settings**, select the main branch.
1. Production instance only: select **Protected instance** to prevent users editing workflows in this instance.
1. Select **Save settings**.
{% endtab %}
{% endtabs %}

## Push work from development <a href="#push-work-from-development" id="push-work-from-development"></a>

In your development instance, create a few workflows, tags, variables, and credentials.

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/jlwygEO1bOtH6HDbN3We/" %}

## Pull work to production <a href="#pull-work-to-production" id="pull-work-to-production"></a>

Your work is now in GitHub. If you're using a multi-branch setup, it's on the development branch. If you chose the single-branch setup, it's on main.

{% tabs %}
{% tab title="Multi-branch" %}
1. In GitHub, create a pull request to merge development into production.
1. Merge the pull request.
1. In your production instance, select **Pull** <img src="../.gitbook/assets/pull-icon.png" alt="Pull icon" data-size="line"> in the main menu.
{% endtab %}

{% tab title="Single-branch" %}
In your production instance, select **Pull** <img src="../.gitbook/assets/pull-icon.png" alt="Pull icon" data-size="line"> in the main menu.
{% endtab %}
{% endtabs %}

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/z7oYIete6nifvfi0QZKs/" %}

### Optional: Use a GitHub Action to automate pulls <a href="#optional-use-a-github-action-to-automate-pulls" id="optional-use-a-github-action-to-automate-pulls"></a>

If you want to avoid logging in to your production instance to pull, you can use a [GitHub Action](https://docs.github.com/en/actions/creating-actions/about-custom-actions) and the [n8n API](https://app.gitbook.com/s/r7wKI4I1BgdBCuq5Cvcx/n8n-api) to automatically pull every time you push new work to your production or main branch.

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/niFQjDjbGJDJTKB57Z1s/" %}


## Next steps <a href="#next-steps" id="next-steps"></a>

Learn more about:

* [Environments in n8n](work-with-environments.md) and [Git and n8n](use-git-in-n8n.md)
* [Source control patterns](choose-branching-patterns.md)
