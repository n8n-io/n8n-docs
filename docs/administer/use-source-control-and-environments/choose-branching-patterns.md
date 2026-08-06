---
title: Branch patterns
description: >-
  Understand the different relationships between n8n instances and Git branches
  that are possible with source control.
contentType: explanation
nodeTitle: Choose branching patterns
originalFilePath: source-control-environments/understand/patterns.md
originalUrl: 'https://docs.n8n.io/source-control-environments/understand/patterns'
url: >-
  https://docs.n8n.io/administer/use-source-control-and-environments/choose-branching-patterns
layout:
  description:
    visible: false
---

# Branch patterns <a href="#branch-patterns" id="branch-patterns"></a>

The relationship between n8n instances and Git branches is flexible. You can create different setups depending on your needs. 

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/sVOSvjfqJPLqOGb1x77B/" %}

## Multiple instances, multiple branches <a href="#multiple-instances-multiple-branches" id="multiple-instances-multiple-branches"></a>

This pattern involves having multiple n8n instances, each one linked to its own branch. 

You can use this pattern for environments. For example, create two n8n instances, development and production. Link them to their own branches. Push work from your development instance to its branch, do a pull request to move work to the production branch, then pull to the production instance.

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/O5AqRfApNuiINXZOe5j1/" %}

![Diagram](../.gitbook/assets/vc-multi-multi.png)

## Multiple instances, one branch <a href="#multiple-instances-one-branch" id="multiple-instances-one-branch"></a>

Use this pattern if you want the same workflows, tags, and variables everywhere, but want to use them in different n8n instances. 

You can use this pattern for environments. For example, create two n8n instances, development and production. Link them both to the same branch. Push work from development, and pull it into production.

This pattern is also useful when testing a new version of n8n: you can create a new n8n instance with the new version, connect it to the Git branch and test it, while your production instance remains on the older version until you're confident it's safe to upgrade.

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/Vo4DpZeEyTa0iuufMDB8/" %}

![Diagram](../.gitbook/assets/vc-multi-one.png)

## One instance, multiple branches <a href="#one-instance-multiple-branches" id="one-instance-multiple-branches"></a>

The instance owner can change which Git branch connects to the instance. The full setup in this case is likely to be a [Multiple instances, multiple branches](#multiple-instances-multiple-branches) pattern, but with one instance switching between branches.

This is useful to review work. For example, different users could work on their own instance and push to their own branch. The reviewer could work in a review instance, and switch between branches to load work from different users.

{% hint style="info" %}
**No cleanup**

n8n doesn't clean up the existing contents of an instance when changing branches. Switching branches in this pattern results in all the workflows from each branch being in your instance.
{% endhint %}
![Diagram](../.gitbook/assets/vc-one-multi.png)

## One instance, one branch <a href="#one-instance-one-branch" id="one-instance-one-branch"></a>

This is the simplest pattern.

![Diagram](../.gitbook/assets/vc-one-one.png)
