---
title: push
---

To push work to Git:

1. Select **Push** <img src="../../assets/push-icon.png" alt="Push icon" data-size="line"> in the main menu.
2.  In the **Commit and push changes** modal, select which workflows and data tables you want to push. You can filter by status (new, modified, deleted) and search for items. n8n automatically pushes tags, and variable and credential stubs.

    n8n pushes the current saved version, not the published version, of the workflow. You need to then separately publish versions on the remote server.
3. If per-commit branch selection is enabled on your instance (`N8N_SOURCECONTROL_BRANCH_SELECTION_ENABLED`), choose the branch for this push. Select an existing branch from the **Branch** dropdown, or select **New branch** to create a branch off the configured branch and push to it. If the feature isn't enabled, n8n pushes to the branch configured for the instance.
4. Enter a commit message. This should be a one sentence description of the changes you're making.
5. Select **Commit and Push**. n8n sends the work to Git, and displays a success message on completion.
