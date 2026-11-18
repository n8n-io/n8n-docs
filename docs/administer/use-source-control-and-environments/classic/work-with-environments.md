---
title: Classic environments in n8n
description: Understand how Environments (Classic) work, including how an environment relates to an n8n instance and a Git branch.
contentType: explanation
nodeTitle: Classic environments in n8n
originalFilePath: source-control-environments/understand/environments.md
originalUrl: 'https://docs.n8n.io/source-control-environments/understand/environments'
url: >-
  https://docs.n8n.io/administer/use-source-control-and-environments/work-with-environments
layout:
  description:
    visible: false
---

# Classic environments in n8n <a href="#environments-in-n8n" id="environments-in-n8n"></a>

{% hint style="info" %}
**Feature availability**

Environments (Classic) are available on:

- **n8n Cloud:** Enterprise
- **Self-hosted:** Business, Enterprise
{% endhint %}

{% hint style="info" %}
**Environments (Preview) are also available**

This page is about Environments (Classic). A newer version of Environments is also available in Preview for Enterprise plans. It adds promotion reviews, a visual diff of each change, protection for production instances, and more. See [Environments (Preview)](../preview/README.md).
{% endhint %}

n8n built Environments (Classic) on top of Git, a version control software. This page explains how Environments (Classic) work. To learn what environments are and why to use them, see [Use source control and environments](../README.md#concepts-for-both-versions).

## How classic environments work in n8n<a href="#environments-in-n8n" id="environments-in-n8n"></a>

A classic environment comprises two parts, an n8n instance and a Git branch:

* The n8n instance is where you build and run workflows.
* The Git branch stores copies of the workflows, as well as tags, and variable and credential stubs.

Environments (Classic) doesn't sync credentials and variable values with Git. You must set up the credentials and variable values manually when setting up a new instance. For more information, refer to [Push and pull | What gets committed](push-and-pull-changes.md#what-gets-committed).

How you copy work between classic environments depends on your branch and n8n instance configuration:

* Multiple instances, one branch: you can push from one instance to the Git branch, then pull the work to another instance.
* Multiple instances, multiple branches: you need to create a pull request and merge in your Git provider. For example, if you have development, test, and production branches, each linked to their own instance, you need to merge the development branch into test to make the work from the development instance available on the test instance. Refer to [Copy work between environments](move-work-between-environments.md) for more information, including steps to partially automate the process.

For detailed guidance on pushing and pulling work, refer to [Push and pull](push-and-pull-changes.md).

Refer to [Set up source control](set-up-source-control.md) to learn more about linking your n8n instance to Git, or follow the [Tutorial: Create environments with source control](tutorial-create-environments-with-source-control.md) to set up classic environments using one of n8n's recommended configurations.

## Related resources

* [Environments (Classic)](./)
* [Use Git in n8n](use-git-in-n8n.md)
* [Choose branching patterns](choose-branching-patterns.md)
* [Set up source control](set-up-source-control.md)
* [Push and pull changes](push-and-pull-changes.md)
* [Compare versions](compare-versions.md)
* [Move work between environments](move-work-between-environments.md)
* [Use environments programmatically with the public API](use-environments-via-api.md)
* [Tutorial: Create environments with source control](tutorial-create-environments-with-source-control.md)
