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

Low-code development in n8n is similar. n8n is where you build and run your workflows. Your instance may have particular configurations: on Cloud, n8n determines the configuration. On self-hosted instances, there are extensive [configuration options](/hosting/configuration/configuration-methods/). You may also have made changes to the settings of your instance. This combination of n8n and your instance's specific configuration and settings is the environment your workflows run in.

There are advantages to having more than one environment. A common pattern is to have different environments for development and production:

* Development: do work and make changes.
* Production: the live environment.

A setup like this helps you make changes to workflows without breaking workflows that are in use.

## Environments in n8n

In n8n, an environment comprises two parts, an n8n instance and a Git branch:

* The n8n instance is where you build and run workflows.
* The Git branch stores copies of the workflows, as well as tags, and variable and credential stubs.

n8n doesn't sync credentials and variable values with Git. You must set up the credentials and variable values manually when setting up a new instance. For more information, refer to [Push and pull | What gets committed](/source-control-environments/using/push-pull/#what-gets-committed) and [Manage variables](/source-control-environments/using/manage-variables/).

How you copy work between environments depends on your branch and n8n instance configuration:

* Multiple instances, one branch: you can push from one instance to the Git branch, then pull the work to another instance.
* Multiple instances, multiple branches: you need to create a pull request and merge in your Git provider. For example, if you have development, test, and production branches, each linked to their own instance, you need to merge the development branch into test to make the work from the development instance available on the test instance. Refer to [Copy work between environments](/source-control-environments/using/copy-work/) for more information, including steps to partially automate the process.

For detailed guidance on pushing and pulling work, refer to [Push and pull](/source-control-environments/using/push-pull/).

Refer to [Set up source control](/source-control-environments/setup/) to learn more about linking your n8n instance to Git, or follow the [Tutorial: Create environments with source control](/source-control-environments/create-environments/) to set up your environments using one of n8n's recommended configurations.
