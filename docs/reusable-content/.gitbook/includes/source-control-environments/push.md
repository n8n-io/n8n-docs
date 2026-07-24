---
title: push
---

To push work to Git:

1. Select **Push** <img src="../../assets/push-icon.png" alt="Push icon" data-size="line"> in the main menu.
2.  In the **Commit and push changes** modal, select which workflows and data tables you want to push. You can filter by status (new, modified, deleted) and search for items. n8n automatically pushes tags, and variable and credential stubs.

    n8n pushes the current saved version, not the published version, of the workflow. You need to then separately publish versions on the remote server.
3. Enter a commit message. This should be a one sentence description of the changes you're making.
4. Select **Commit and Push**. n8n sends the work to Git, and displays a success message on completion.
