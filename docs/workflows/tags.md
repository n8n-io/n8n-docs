---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Workflow tags
description: Use tags to label workflows, making it easier to browse your workflows.
contentType: howto
---

# Tags

Workflow tags allow you to label your workflows. You can then filter workflows by tag.

Tags are global. This means when you create a tag, it's available to all users on your n8n instance.

## Add a tag to a workflow

To add a tag to your workflow:

1. In your workflow, select **+ Add tag**.
2. Select an existing tag, or enter a new tag name.
3. Once you select a tag and click away from the tag modal, n8n displays the tag next to the workflow name.

You can add more than one tag.

## Filter by tag

When browsing the workflows on your instance, you can filter by tag.

1. On the **Workflows** page, select **Filters**.
2. Select **Tags**.
3. Select the tag or tags you want to filter by. n8n lists the workflows with that tag.

## Manage tags

You can edit existing tags. Instance owners can delete tags.

1. Select **Manage tags**. This is available from **Filters** > **Tags** on the **Workflows** page, or in the **+ Add tag** modal in your workflow.
2. Hover over the tag you want to change.
3. Select **Edit** <span class="inline-image">![Add node icon](/_images/common-icons/edit.png){.off-glb}</span> to rename it, or **Delete** <span class="inline-image">![Add node icon](/_images/common-icons/delete.png){.off-glb}</span> to delete it.

/// warning | Global tags
Tags are global. If you edit or delete a tag, this affects all users of your n8n instance.
///
