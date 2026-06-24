---
title: v2.0 Migration Tool
description: Tool to help you migrate to v2.0
contentType: reference
nodeTitle: v2.0 Migration tool
originalFilePath: migration-tool-v2.md
originalUrl: 'https://docs.n8n.io/migration-tool-v2'
url: 'https://docs.n8n.io/release-notes/v20-migration-tool'
layout:
  description:
    visible: false
---

# n8n v2.0 migration tool <a href="#n8n-v20-migration-tool" id="n8n-v20-migration-tool"></a>

The migration tool helps you prepare your n8n instance for upgrading to version 2.0 by identifying workflows and configurations that need attention before the upgrade.

![Migration tool](.gitbook/assets/migration-tool.png)

You can see all breaking changes for v2 [on this page](v20-breaking-changes.md).

## Accessing the Tool <a href="#accessing-the-tool" id="accessing-the-tool"></a>
Navigate to **Settings > Migration Report** to view your compatibility status.

{% hint style="info" %}
**User role access**

The migration tool is available for global admins only.
{% endhint %}

## Understanding Your Migration Status <a href="#understanding-your-migration-status" id="understanding-your-migration-status"></a>

At the top of the page, you'll see:

"X out of Y workflows are compatible with n8n 2.0"

This tells you how many workflows will continue working without changes after upgrading. Your goal is to address the issues preventing the remaining workflows from being compatible, as well as global instance issues.

## Viewing Issues <a href="#viewing-issues" id="viewing-issues"></a>
The tool organizes potential problems into two categories:

### Workflow Issues Tab <a href="#workflow-issues-tab" id="workflow-issues-tab"></a>

Shows breaking changes that affect specific workflows in your instance.
What you'll see for each issue:

* **Issue title:** A clear name for the problem
* **Severity badge (Critical/Medium/Low):** How urgent this is to fix
    * **Critical:** Fix before upgrading or workflows will fail
    * **Medium:** May cause unexpected behavior or require attention soon
    * **Low:** Minor changes or deprecations that won't break functionality
* **Description:** Explanation of what's changing and why it matters
* **Documentation link:** Click to read detailed migration explanations
* **Affected workflow count:** How many of your workflows have this issue

#### Workflow Issue Detail Page <a href="#workflow-issue-detail-page" id="workflow-issue-detail-page"></a>

Click **X workflows affected** to see all affected workflows.
What you'll see for each workflow:

* **Name:** The workflow name. Click on the name to open the workflow editor.
* **State:** Whether workflow is published or not
* **Node affected:** The list of all the workflow nodes affected by the issue. You can click on each to open the workflow editor with the specific node view opened.
* **Number of executions:** The total number of executions of the workflow
* **Last executed:** The date the workflow was last executed
* **Last updated:** The date the workflow was last updated

### Instance Issues Tab <a href="#instance-issues-tab" id="instance-issues-tab"></a>

Shows configuration changes that affect your entire n8n instance, not specific workflows.
What you'll see for each issue:

* Same information as workflow issues (title, severity, description, docs)
* **No workflow count:** These are global settings that apply instance-wide

The v2.0 migration tool scans your n8n instance to identify potential compatibility issues and configuration changes required for upgrading to v2.0. This reference details each check the tool performs, explains the impact of detected issues, and provides recommendations to prepare your instance for migration.

## Understanding Empty States <a href="#understanding-empty-states" id="understanding-empty-states"></a>

### No Workflow Issues Found <a href="#no-workflow-issues-found" id="no-workflow-issues-found"></a>
All your workflows are compatible with v2.0. Check the **Instance Issues** tab to ensure your server configuration is also ready.

### No Instance Issues Found <a href="#no-instance-issues-found" id="no-instance-issues-found"></a>

Your instance configuration is compatible with v2.0. Check the **Workflow Issues** tab to ensure all workflows are also ready.

### Both Tabs Empty <a href="#both-tabs-empty" id="both-tabs-empty"></a>
Your n8n instance is fully ready to upgrade to version 2.0.

## Recommended Workflow <a href="#recommended-workflow" id="recommended-workflow"></a>

### Initial Assessment <a href="#initial-assessment" id="initial-assessment"></a>
* Review the compatibility summary
* Browse all issues in both tabs to understand the scope

### Sort by Severity <a href="#sort-by-severity" id="sort-by-severity"></a>
* Start with Critical issues (they'll break workflows)
* Move to Medium issues (may cause problems)
* Address Low issues last (deprecation warnings)

### Fix Workflow Issues <a href="#fix-workflow-issues" id="fix-workflow-issues"></a>
* Click into each issue to see affected workflows
* Read the documentation for fix instructions
* Update each workflow as needed
* Test workflows in a development environment

### Address Instance Issues <a href="#address-instance-issues" id="address-instance-issues"></a>
* Update environment variables or server configuration
* Follow documentation for each instance-level change

### Verify Your Work <a href="#verify-your-work" id="verify-your-work"></a>
* Click **Refresh** to re-scan. If you don't see any **Refresh** button, just reload the page to re-scan.
* Confirm that unresolved issues don't remain
* Verify compatibility count matches total workflows

### Proceed with Upgrade <a href="#proceed-with-upgrade" id="proceed-with-upgrade"></a>
After addressing all issues, you're ready to upgrade to n8n 2.0
