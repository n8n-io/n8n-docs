---
title: Understand environments and version control in n8n
description: Understand the concepts behind version control and environments in n8n.
---

# Understand environments and version control in n8n

n8n has built its environments feature on top of Git, a version control software. This document helps you understand:

* The purpose of environments.
* How environments work in n8n.
* A brief introduction to the Git concepts and processes you need when using environments in n8n.

!!! note "New to Git and version control?"
	If you're new to Git, don't panic. You don't need to learn Git to use n8n. This document explains the concepts you need. However, you do need some Git knowledge to set up the environments, and to copy work between environments, as this happens in your Git provider.

!!! note "Familiar with Git and version control?"
	If you're familiar with Git, don't rely on behaviors matching exactly. In particular, be aware that version control in n8n doesn't support a pull request-style review and merge process (unless you do this outside n8n in your Git provider). Read the [Environments in n8n](#environments-in-n8n) section to understand how n8n uses Git to support environments.

## Environments: What and why?

In software development, the environment is all the infrastructure and tooling around the code, including the tools that run the software, and the specific configuration of those tools. For a more detailed introduction to environments in software development, refer to [Codecademy | Environments](https://www.codecademy.com/article/environments){:target=_blank .external-link}.

Low-code development in n8n is similar. n8n is where you build and run your workflows. Your instance may have particular configurations: on Cloud, the configuration is determined by n8n. On self-hosted instances, there are extensive [configuration options](/hosting/environment-variables/). You may also have made changes to the settings of your instance. This combination of n8n and your instance's specific configuration and settings is the environment your workflows run in.

There are advantages to having more than one environment. A common pattern is to have different environments for development, testing, and production:

* Development: do work and make changes.
* Testing: test work before making it live.
* Production: the live environment.

A setup like this helps you make changes to workflows without breaking workflows that are in use.

## Environments in n8n

In n8n, an environment comprises two parts, an n8n instance and a Git branch:

* The n8n instance is where you build and run workflows.
* The Git branch stores copies of the workflows, as well as [tags](/workflows/tags/) and [variable](/environments/variables/) names.

You connect your n8n instance to a Git repository. You can save workflows, tags, and variables to a branch, and load workflows, tags, and variable names from it.

To copy work between environments, you need to create a pull request and merge in your Git provider. For example, if you have development, test, and production branches, each linked to their own instance, you need to merge the development branch into test to make the work from the development instance available on the test instance. Refer to [Using | Copy work between environments](/environments/using#copy-work-between-environments) for more information, including steps to partially automate the process.

n8n doesn't sync credentials and variable values with Git. You must set up the credentials and variable values manually when setting up a new instance. Refer to [Using | Credentials and variable values](/environments/using#credentials-and-variable-values) for more information.

### Environment patterns

The relationship between n8n instances and Git branches is flexible. You can create different setups depending on your needs. 

#### Multiple instances, multiple branches

This pattern involves having multiple n8n instances, each one linked to its own branch. This is the setup to use if you want different n8n instances for testing and production.

![Diagram](/_images/environments/vc-multi-multi.png)

#### One instance, one branch

This is the simplest pattern. It allows you to use your Git provider as a backup.

![Diagram](/_images/environments/vc-one-one.png)


#### Multiple instances, one branch

Use this pattern if you want the same workflows, tags, and variables everywhere, but want to use them in different n8n instances. This is useful when testing a new version of n8n: you can create a new n8n instance with the new version, connect it to the Git branch and test it, while your production instance remains on the older version until you're confident it's safe to upgrade.

![Diagram](/_images/environments/vc-multi-one.png)

#### One instance, multiple branches

The instance owner can change which Git branch connects to the instance.

![Diagram](/_images/environments/vc-one-multi.png)

## Git: Key terms and concepts

This section provides the concepts and terminology needed to save work to Git from n8n, and fetch changes from Git into n8n. It doesn't cover everything you need to set up and manage a repository. The person doing the [Setup](/environments/version-control/setup/) should have some familiarity with Git and with their Git hosting provider.

!!! note "This is a very brief introduction"
	Git is a complex topic. This section provides a very brief introduction to the key terms you need when using environments in n8n. If you want to learn about Git in depth, refer to [GitHub | Git and GitHub learning resources](https://docs.github.com/en/get-started/quickstart/git-and-github-learning-resources){:target=_blank .external-link}.

### What is Git?

[Git](https://git-scm.com/){:target=_blank .external-link} is a tool for managing, tracking, and collaborating on multiple versions of documents. It's the basis for widely used platforms such as [GitHub](https://github.com/){:target=_blank .external-link} and [GitLab](https://about.gitlab.com/){:target=_blank .external-link}.

### Branches: multiple copies of a project

Git uses branches to maintain multiple copies of a document alongside each other. Every branch has its own version. A common pattern is to have a main branch, and then everyone who wants to contribute to the project works on their own branch (copy). When their work is finished, their branch is merged back into the main branch.

![Diagram](/_images/environments/simple-git-branch.png)

### Local and remote: Moving work between your machine and a Git provider

A common pattern when using Git is to install Git on your own computer, and use a Git provider such as GitHub to work with Git in the cloud. In effect, you have a Git repository (project) on GitHub, and work with copies of it on your local machine.

n8n uses this pattern for version control and environments: you'll work with your workflows on your n8n instance, but send them to your Git provider to store them, and copy them between environments.

n8n uses a two [TODO: or three?] key Git processes:

* **Push**: send work from your instance to Git. This saves a copy of your workflows, tags, and variables, to Git. You can choose which of these you want to save.
* **Pull**: get the workflows, tags, and variables from Git and load it into n8n. 
	!!! warning "Pulling overwrites your work"
		If you have made changes to a workflow in n8n, you must push the changes to Git before pulling. When you pull, it overwrites any changes you've made if they aren't stored in Git.
* **Commit**: a commit in n8n is a single occurrence of pushing work to Git. [TODO: hopefully we can remove commit language but add this to above list if needed]




