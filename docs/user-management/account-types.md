---
description: n8n account types
contentType: reference
---

# Account types

There are two account types, owner and member. The account type affects the user permissions and access.

* Owner: this is the account that set up user management. There's one owner account for each n8n instance. You can't transfer ownership.
  The owner can:
    * Add and remove users
    * See all workflows
    * Delete tags
	* See all credentials (but not the sensitive information)
* Members: these are normal n8n users.
  Members can:
    * See all workflow tags, create new tags, and assign tags to their workflows. Members can't delete tags.
    * Change their own password.
    * See their own workflows.

!!! note "Create a member-level account for the owner"
    We recommend that owners create a member-level account for themselves. Owners can see all workflows, but there is no way to see who created a particular workflow, so there is a risk of overriding other people's work if you build and edit workflows as an owner.
