---
title: Understand environments in n8n
description: Understand the concepts behind environments in n8n.
---

# Understand environments

n8n has built its environments feature on top of Git, a version control software. This document helps you understand:

* The purpose of environments.
* How environments work in n8n.

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

To copy work between environments, you need to create a pull request and merge in your Git provider. For example, if you have development, test, and production branches, each linked to their own instance, you need to merge the development branch into test to make the work from the development instance available on the test instance. Refer to [Using | Copy work between environments](/environments/source-control/using#copy-work-between-environments) for more information, including steps to partially automate the process.

n8n doesn't sync credentials and variable values with Git. You must set up the credentials and variable values manually when setting up a new instance. Refer to [Using | Credentials and variable values](/environments/source-control/using#credentials-and-variable-values) for more information.
