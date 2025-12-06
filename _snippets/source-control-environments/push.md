To push work to Git:

1. Select **Push** <span class="n8n-inline-image">![Push icon](/_images/source-control-environments/push-icon.png){.off-glb}</span> in the main menu.

	--8<-- "_snippets/source-control-environments/push-pull-menu-state.md"

1. In the **Commit and push changes** modal, select which workflows you want to push. You can filter by status (new, modified, deleted) and search for workflows. n8n automatically pushes tags, and variable and credential stubs.

   n8n pushes the current saved version, not the published version, of the workflow. You need to then separately publish versions on the remote server.

1. Enter a commit message. This should be a one sentence description of the changes you're making.
1. Select **Commit and Push**. n8n sends the work to Git, and displays a success message on completion.
