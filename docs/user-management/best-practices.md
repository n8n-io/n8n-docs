---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
description: User management best practices.
contentType: explanation
---

# Best practices for user management

This page contains advice on best practices relating to user management in n8n.

## Do everyday work with a non-owner account

n8n recommends that owners create a member-level account for themselves.

Owners can see all workflows, but there is no way to see who created a particular workflow, so there is a risk of overriding other people's work if you build and edit workflows as an owner.

## Use care when editing shared workflows

It's important to be careful when working with shared workflows.

Users should try not to edit the same workflow simultaneously. While it's possible, users can accidentally overwrite each other's changes.

## Export workflows to move them

To move workflows between accounts, export the workflow as JSON. Afterwards, import it into the new account.

This action doesn't transfer workflow history.

## Use unique webhook paths

Webhook paths must be unique across the entire instance. This means each webhook path must be unique for all workflows and all users.

By default, n8n generates a long random value for the webhook path, but users can edit this to their own custom path. If two users set the same path value:

* The path works for the first workflow that's run or activated.
* Other workflows will error if they try to run with the same path.
