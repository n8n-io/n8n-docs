---
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
	* [GitHub: Creating a pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request)
	* [GitLab: Creating merge requests](https://docs.gitlab.com/ee/user/project/merge_requests/creating_merge_requests.html)
	* [Git: Basic branching and merging](https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging)
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

