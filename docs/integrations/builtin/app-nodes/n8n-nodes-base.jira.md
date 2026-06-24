---
title: Jira Software node documentation
description: >-
  Learn how to use the Jira Software node in n8n. Follow technical documentation
  to integrate Jira Software node into your workflows.
contentType:
  - integration
  - reference
priority: medium
nodeTitle: Jira Software node documentation
originalFilePath: integrations/builtin/app-nodes/n8n-nodes-base.jira.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.jira'
url: 'https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.jira'
layout:
  description:
    visible: false
---

# Jira Software node <a href="#jira-software-node" id="jira-software-node"></a>

Use the Jira Software node to automate work in Jira, and integrate Jira with other applications. n8n has built-in support for a wide range of Jira features, including creating, updating, deleting, and getting issues, and users. 

On this page, you'll find a list of operations the Jira Software node supports and links to more resources.

{% hint style="info" %}
**Credentials**

Refer to [Jira credentials](../credentials/jira.md) for guidance on setting up authentication.
{% endhint %}

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/hLGdVKMP8bGrbsRtVcGc/" %}

## Operations <a href="#operations" id="operations"></a>

* Issue
    * Get issue changelog
    * Create a new issue
    * Delete an issue
    * Get an issue
    * Get all issues
    * Create an email notification for an issue and add it to the mail queue
    * Return either all transitions or a transition that can be performed by the user on an issue, based on the issue's status
    * Update an issue
* Issue Attachment
    * Add attachment to issue
    * Get an attachment
    * Get all attachments
    * Remove an attachment
* Issue Comment
    * Add comment to issue
    * Get a comment
    * Get all comments
    * Remove a comment
    * Update a comment
* User
    * Create a new user.
    * Delete a user.
    * Retrieve a user.

## Templates and examples <a href="#templates-and-examples" id="templates-and-examples"></a>


[Browse Jira Software node documentation integration templates](https://n8n.io/integrations/jira-software) or [search all templates](https://n8n.io/workflows/)

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/lMIxsgtfHVazfAS7oe1v/" %}

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to the [official JQL documentation](https://www.atlassian.com/software/jira/guides/expand-jira/jql) about Jira Query Language (JQL) to learn more about it.

## Fetch issues for a specific project <a href="#fetch-issues-for-a-specific-project" id="fetch-issues-for-a-specific-project"></a>

The **Get All** operation returns all the issues from Jira. To fetch issues for a particular project, you need to use Jira Query Language (JQL).

For example, if you want to receive all the issues of a project named `n8n`, you'd do something like this:

- Select **Get All** from the **Operation** dropdown list.
- Toggle **Return All** to true.
- Select **Add Option** and select **JQL**.
- Enter `project=n8n` in the **JQL** field.

This query will fetch all the issues in the project named `n8n`. Enter the name of your project instead of `n8n` to fetch all the issues for your project.
