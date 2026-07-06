---
title: Workflow tags
description: 'Use tags to label workflows, making it easier to browse your workflows.'
contentType: howto
nodeTitle: Tag workflows
originalFilePath: workflows/tags.md
originalUrl: 'https://docs.n8n.io/workflows/tags'
url: 'https://docs.n8n.io/build/manage-workflows/tag-workflows'
layout:
  description:
    visible: false
---

# Tags <a href="#tags" id="tags"></a>

Workflow tags allow you to label your workflows. You can then filter workflows by tag.

Tags are global. This means when you create a tag, it's available to all users on your n8n instance.

## Add a tag to a workflow <a href="#add-a-tag-to-a-workflow" id="add-a-tag-to-a-workflow"></a>

To add a tag to your workflow:

1. In your workflow, select **+ Add tag**.
2. Select an existing tag, or enter a new tag name.
3. Once you select a tag and click away from the tag modal, n8n displays the tag next to the workflow name.

You can add more than one tag.

## Filter by tag <a href="#filter-by-tag" id="filter-by-tag"></a>

When browsing the workflows on your instance, you can filter by tag.

1. On the **Workflows** page, select **Filters**.
2. Select **Tags**.
3. Select the tag or tags you want to filter by. n8n lists the workflows with that tag.

## Manage tags <a href="#manage-tags" id="manage-tags"></a>

You can edit existing tags. Instance owners can delete tags.

1. Select **Manage tags**. This is available from **Filters** > **Tags** on the **Workflows** page, or in the **+ Add tag** modal in your workflow.
2. Hover over the tag you want to change.
3. Select **Edit** <img src="../.gitbook/assets/edit.png" alt="Add node icon" data-size="line"> to rename it, or **Delete** <img src="../.gitbook/assets/delete.png" alt="Add node icon" data-size="line"> to delete it.

{% hint style="warning" %}
**Global tags**

Tags are global. If you edit or delete a tag, this affects all users of your n8n instance.
{% endhint %}
