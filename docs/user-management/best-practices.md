---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
description: User management best practices.
contentType: explanation
---

# Best practices for user management

This page contains advice on best practices relating to user management in n8n.

## All platforms

* n8n recommends that owners create a member-level account for themselves. Owners can see all workflows, but there is no way to see who created a particular workflow, so there is a risk of overriding other people's work if you build and edit workflows as an owner.
* Users must be careful not to edit the same workflow simultaneously. It's possible to do it, but the users will overwrite each other's changes.
* To move workflows between accounts, export the workflow as JSON, then import it to the new account. Note that this action loses the workflow history.
* Webhook paths must be unique across the entire instance. This means each webhook path must be unique for all workflows and all users. By default, n8n generates a long random value for the webhook path, but users can edit this to their own custom path. If two users set the same path value:
    * The path works for the first workflow that's run or activated.
    * Other workflows will error if they try to run with the same path.

## Self-hosted

If you run n8n behind a reverse proxy, set the following environment variables so that n8n generates emails with the correct URL:

* `N8N_HOST`
* `N8N_PORT`
* `N8N_PROTOCOL`
* `N8N_EDITOR_BASE_URL`  

More information on these variables is available in [Environment variables](/hosting/configuration/environment-variables/index.md).

