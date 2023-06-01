---
description: Understand the concepts behind version control and environments in n8n.
---

# Understand environments and version control in n8n

n8n has built its environments feature on top of Git, a version control software. This document helps you understand:

* The purpose of environments.
* A brief introduction to Git.
* How environments work in n8n.


!!! note "New to Git and version control?"
	If you're new to Git, don't panic. You don't need to learn Git to use n8n. This document explains the concepts you need

!!! note "Familiar with Git and version control?"
	If you're familiar with Git, don't rely on behaviors matching exactly. In particular, be aware that version control in n8n doesn't provide a way to work with multiple versions of workflows, or to go through a pull request-style review and merge process (unless you do this outside n8n in your Git provider). Read the [Environments in n8n](#environments-in-n8n) section to understand how n8n uses Git to support environments.

## Environments: What and why?

In software development, the environment is all the infrastructure and tooling around the code, including the tools that run the software, and the specific configuration of those tools. For a more detailed introduction to environments in software development, refer to [Codecademy | Environments](https://www.codecademy.com/article/environments){:target=_blank .external-link}.

Low-code development in n8n is similar. n8n is where you build and run your workflows. Your instance may have particular configurations: on Cloud, the configuration is determined by n8n. On self-hosted instances, there are extensive [configuration options](/hosting/environment-variables/). You may also have made changes to the settings of your instance. This combination of n8n and your instance's specific configuration and settings is the environment your workflows run in.

There are advantages to having more than one environment. A common pattern is to have different environments for development, testing, and production:

* Development: do work and make changes.
* Testing: test work before making it live.
* Production: the live environment.

A setup like this helps you make changes to workflows without breaking workflows that are in use.

## Git: a brief introduction

This section provides the concepts and terminology needed to save work to Git from n8n, and fetch changes from Git into n8n. It doesn't cover everything you need to set up and manage a repository. The person doing the [Setup](/environments/version-control/setup/) should have some familiarity with Git and with their Git hosting provider.

!!! note "This is a very brief introduction"
	Git is a complex topic. This section provides a very brief introduction to the key terms you need when using environments in n8n. If you want to learn about Git in depth, refer to [GitHub | Git and GitHub learning resources](https://docs.github.com/en/get-started/quickstart/git-and-github-learning-resources){:target=_blank .external-link}.

[Git](https://git-scm.com/){:target=_blank .external-link} is a tool for managing, tracking, and collaborating on multiple versions of documents. It's the basis for widely used platforms such as [GitHub](https://github.com/){:target=_blank .external-link} and [GitLab](https://about.gitlab.com/){:target=_blank .external-link}.

n8n uses a two key Git processes:

* **Push**: send work from your instance to Git. This saves a copy of your workflows, tags, and variables, to Git. You can choose which of these you want to save.
* **Pull**: get the workflows, tags, and variables from Git and load it into n8n. 
	!!! warning "Pulling overwrites your work"
		If you have made changes to a workflow in n8n, you must push the changes to Git before pulling. When you pull, it overwrites any changes you've made if they aren't stored in Git.


* **Commit**: a commit in n8n is a single occurrence of pushing work to Git. [TODO: hopefully we can remove commit language but add this to above list if needed]


## Environments in n8n

In n8n, an environment comprises two parts, an n8n instance and a Git branch:

* The n8n instance is where you build and run workflows.
* The Git branch stores copies of the workflows, as well as [tags](/workflows/tags/) and [variables](/environments/variables/).

You connect your n8n instance to a Git repository. You can save workflows, tags, and variables to a branch, and load workflows, tags, and variables from it.

### Environment patterns

The relationship between n8n instances and Git branches is flexible. You can create different setups depending on your needs. 


#### Multiple instances, multiple branches

![Diagram](/_images/environments/vc-multi-multi.png)

#### One instance, one branch

#### Multiple instances, one branch

#### One instance, multiple branches

