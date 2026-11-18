---
title: Git and n8n
description: How Environments (Classic) use Git to push, pull, and commit, and how n8n's behavior differs from Git.
contentType: explanation
nodeTitle: Use Git in n8n
originalFilePath: source-control-environments/understand/git.md
originalUrl: 'https://docs.n8n.io/source-control-environments/understand/git'
url: >-
  https://docs.n8n.io/administer/use-source-control-and-environments/use-git-in-n8n
layout:
  description:
    visible: false
---

# Git and n8n <a href="#git-and-n8n" id="git-and-n8n"></a>

Environments (Classic) use Git to provide source control. To use this feature, it helps to have some knowledge of basic Git concepts. For an introduction to Git, branches, and remotes, see [Git concepts for environments](../git-concepts.md). This page covers how Environments (Classic) use Git.

{% hint style="info" %}
**Feature availability**

Environments (Classic) are available on:

- **n8n Cloud:** Enterprise
- **Self-hosted:** Business, Enterprise
{% endhint %}

{% hint style="info" %}
**Environments (Preview) are also available**

This page is about Environments (Classic). A newer version of Environments is also available in Preview for Enterprise plans. It adds protection for production instances and, with GitLab, promotion reviews with a visual diff of changes. See [Environments (Preview)](../preview/README.md).
{% endhint %}

n8n doesn't implement all Git functionality: you shouldn't view n8n's source control as full version control.

{% hint style="info" %}
**Familiar with Git and source control?**

If you're familiar with Git, don't rely on behaviors matching exactly. In particular, be aware that Environments (Classic) doesn't support a pull request-style review and merge process, unless you do this outside n8n in your Git provider. Environments (Preview) adds [promotion reviews](../preview/promotion-reviews.md) with GitLab.
{% endhint %}

You should have some familiarity with Git and with your Git hosting provider before you [set up source control](set-up-source-control.md).

## Push, pull, and commit <a href="#push-pull-and-commit" id="push-pull-and-commit"></a>

In Environments (Classic), you work with your workflows on your n8n instance, and send them to your Git provider to store them. n8n uses three key Git processes:

* **Push**: send work from your instance to Git. This saves a copy of your workflows and tags, as well as credential and variable stubs, to Git. You can choose which workflows you want to save.
* **Pull**: get the workflows, tags, and variables from Git and load it into n8n. You will need to populate any credentials or variable stubs included in the refreshed items.<br>

    <div data-gb-custom-block data-tag="hint" data-style="warning" class="hint hint-warning"><p><strong>Pulling overwrites your work</strong></p><p>If you have made changes to a workflow in n8n, you must push the changes to Git before pulling. When you pull, it overwrites any changes you've made if they aren't stored in Git.</p></div>
		
* **Commit**: a commit in n8n is a single occurrence of pushing work to Git. In n8n, commit and push happen at the same time.

Refer to [Push and pull](push-and-pull-changes.md) for detailed information about how n8n interacts with Git.

## Related resources

* [Environments (Classic)](./)
* [Git concepts for environments](../git-concepts.md)
* [Classic environments in n8n](work-with-environments.md)
* [Choose branching patterns](choose-branching-patterns.md)
* [Set up source control](set-up-source-control.md)
* [Push and pull changes](push-and-pull-changes.md)
* [Compare versions](compare-versions.md)
* [Move work between environments](move-work-between-environments.md)
* [Use environments programmatically with the public API](use-environments-via-api.md)
* [Tutorial: Create environments with source control](tutorial-create-environments-with-source-control.md)
