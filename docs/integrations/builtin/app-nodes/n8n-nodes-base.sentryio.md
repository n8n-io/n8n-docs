---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Sentry.io node documentation
description: Learn how to use the Sentry.io node in n8n. Follow technical documentation to integrate Sentry.io node into your workflows.
contentType: integration
---

# Sentry.io node

Use the Sentry.io node to automate work in Sentry.io, and integrate Sentry.io with other applications. n8n has built-in support for a wide range of Sentry.io features, including creating, updating, deleting, and getting, issues, projects, and releases, as well as getting all events.

On this page, you'll find a list of operations the Sentry.io node supports and links to more resources.

/// note | Credentials
Refer to [Sentry.io credentials](/integrations/builtin/credentials/sentryio/) for guidance on setting up authentication. 
///

## Operations

* Event
    * Get event by ID
    * Get all events
* Issue
    * Delete an issue
    * Get issue by ID
    * Get all issues
    * Update an issue
* Project
    * Create a new project
    * Delete a project
    * Get project by ID
    * Get all projects
    * Update a project
* Release
    * Create a release
    * Delete a release
    * Get release by version identifier
    * Get all releases
    * Update a release
* Organization
    * Create an organization
    * Get organization by slug
    * Get all organizations
    * Update an organization
* Team
    * Create a new team
    * Delete a team
    * Get team by slug
    * Get all teams
    * Update a team

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'sentryio') ]]

## Related resources

Refer to [Sentry.io's documentation](https://docs.sentry.io/api/){:target=_blank .external-link} for more information about the service.

--8<-- "_snippets/integrations/builtin/app-nodes/operation-not-supported.md"
