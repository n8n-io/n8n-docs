---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Release notes
description: Release notes detailing new features and bug fixes for n8n.
tags:
  - release
  - release notes
  - changelog
hide:
  - tags
contentType: reference
---
<!-- vale off -->
# Release notes

New features and bug fixes for n8n.

You can also view the [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} in the GitHub repository.

--8<-- "_snippets/self-hosting/installation/latest-next-version.md"

--8<-- "_snippets/update-n8n.md"

## Semantic versioning in n8n

n8n uses [semantic versioning](https://semver.org/){:target=_blank .external-link}. All version numbers are in the format `MAJOR.MINOR.PATCH`. Version numbers increment as follows:

* MAJOR version when making incompatible changes which can require user action.
* MINOR version when adding functionality in a backward-compatible manner.
* PATCH version when making backward-compatible bug fixes.

/// note | Older versions
You can find the release notes for older versions of n8n [here](/release-notes/0-x)
///



## n8n@1.75.2

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.75.1...n8n@1.75.2){:target=_blank .external-link} for this version.<br />
**Release date:** 2025-01-17

/// note | Next version
This is the `next` version. n8n recommends using the `latest` version. The `next` version may be unstable. To report issues, use the [forum](https://community.n8n.io/c/questions/12){:target=_blank .external-link}.
///

This release contains a bug fix.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.74.3

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.74.2...n8n@1.74.3){:target=_blank .external-link} for this version.<br />
**Release date:** 2025-01-17

/// note | Latest version
This is the `latest` version. n8n recommends using the `latest` version. The `next` version may be unstable. To report issues, use the [forum](https://community.n8n.io/c/questions/12){:target=_blank .external-link}.
///

This release contains a bug fix.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.



## n8n@1.75.1

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.75.0...n8n@1.75.1){:target=_blank .external-link} for this version.<br />
**Release date:** 2025-01-17



This release contains bug fixes.

## n8n@1.74.2

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.74.1...n8n@1.74.2){:target=_blank .external-link} for this version.<br />
**Release date:** 2025-01-17



This release contains bug fixes.

## n8n@1.75.0

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.74.0...n8n@1.75.0){:target=_blank .external-link} for this version.<br />
**Release date:** 2025-01-15

This release contains bug fixes and editor updates.


For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.74.1

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.74.0...n8n@1.74.1){:target=_blank .external-link} for this version.<br />
**Release date:** 2025-01-09



This release contains a bug fix.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.


## n8n@1.74.0

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.73.0...n8n@1.74.0){:target=_blank .external-link} for this version.<br />
**Release date:** 2025-01-08

This release contains new features, a new node, node updates, performance improvements and bug fixes.

<div class="n8n-new-features" markdown>

### Overhauled Code node editing experience
We added a ton of new helpers to the Code node, making edits of your code much faster and more comfortable. You get:

- TypeScript autocomplete  
- TypeScript linting  
- TypeScript hover tips  
- Search and replace  
- New keyboard shortcuts based on the VSCode keymap  
- Auto-formatting using prettier (Alt+Shift+F)  
- Remember folded regions and history after refresh  
- Multi cursor  
- Type function in the Code node using JSDoc types  
- Drag and drop for all Code node modes  
- Indentation markers  

We build this on a web worker architecture so you won't have to suffer from performance degradation while typing. <br>
<br>
To get the full picture, check out our Studio update with Max and Elias, where they discuss and demo the new editing experience. 👇 <br>

[![Studio](/_images/release-notes/The_Studio_thumbnail_Code_node.jpg)](https://youtu.be/De1E58MPaMQ?t=645)
<figure markdown="span">
    <figcaption>[Studio Update #04](https://youtu.be/De1E58MPaMQ?t=645)</figcaption>
</figure>

</div>

### New node: Microsoft Entra ID
Microsoft Entra ID (formerly known as Microsoft Azure Active Directory or Azure AD) is used for cloud-based identity and access management. [The new node](/integrations/builtin/app-nodes/n8n-nodes-base.microsoftentra/) supports a wide range of Microsoft Entra ID features, which includes creating, getting, updating, and deleting users and groups, as well as adding users to and removing them from groups. 

### Node updates

- [AI Agent](/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/): Vector stores can now be directly used as tools for the agent
- [Code](/code/builtin/overview/): Tons of new speed and convenience features, see above for details  
- [Google Vertex Chat](/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatgooglevertex/): Added option to specify the GCP region for the Google API credentials  
- [HighLevel](/builtin/app-nodes/n8n-nodes-base.highlevel/): Added support for calendar items  


We also added a custom [projects](/user-management/rbac/projects/) icon selector on top of the available emojis. Pretty!

### Contributors

[igatanasov](https://github.com/igatanasov){:target=_blank .external-link}  
[Stamsy](https://github.com/Stamsy){:target=_blank .external-link}  
[feelgood-interface](https://github.com/feelgood-interface){:target=_blank .external-link}  

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.73.1

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.73.0...n8n@1.73.1){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-12-19





This release contains a bug fix.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.


## n8n@1.73.0

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.72.0...n8n@1.73.0){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-12-19

This release contains node updates, performance improvements, and bug fixes.

### Node updates

- [AI Agent](/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/): Updated descriptions for Chat Trigger options
- [Facebook Graph API](/integrations/builtin/app-nodes/n8n-nodes-base.facebookgraphapi/): Updated for API v21.0
- [Gmail](/integrations/builtin/app-nodes/n8n-nodes-base.gmail/): Added two new options for the `Send and wait` operation, free text and custom form  
- [Linear Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.lineartrigger/): Added support for admin scope  
- [MailerLite](/integrations/builtin/app-nodes/n8n-nodes-base.mailerlite/): Now supports the new API  
- [Slack](/integrations/builtin/app-nodes/n8n-nodes-base.slack/):  Added two new options for the `Send and wait` operation, free text and custom form  

We also added credential support for [SolarWinds IPAM](/integrations/builtin/credentials/solarwindsipam/) and [SolarWinds Observability](/integrations/builtin/credentials/solarwindsobservability/). 

Last, but not least, we [improved the schema view performance in the node details view by 90%](https://github.com/n8n-io/n8n/pull/12180) and added drag and drop re-ordering to parameters. This comes in very handy in the [If](/integrations/builtin/core-nodes/n8n-nodes-base.if/) or [Edit Fields](/integrations/builtin/core-nodes/n8n-nodes-base.set/) nodes. 

### Contributors

[CodeShakingSheep](https://github.com/CodeShakingSheep){:target=_blank .external-link}  
[mickaelandrieu](https://github.com/mickaelandrieu){:target=_blank .external-link}  
[Stamsy](https://github.com/Stamsy){:target=_blank .external-link}  
[pbdco](https://github.com/pbdco){:target=_blank .external-link}  

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.


## n8n@1.72.1

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.72.0...n8n@1.72.1){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-12-12





This release contains bug fixes.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.71.3

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.71.2...n8n@1.71.3){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-12-12



This release contains bug fixes.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.72.0

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.71.0...n8n@1.72.0){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-12-11

This release contains node updates, usability improvements, and bug fixes.

### Node updates

- [AI Transform](/integrations/builtin/core-nodes/n8n-nodes-base.aitransform/): The `maximum context length` error now retries with reduced payload size
- [Redis](/integrations/builtin/app-nodes/n8n-nodes-base.redis/): Added support for `continue on fail`

### Improved commit modal 

We added filters and text search to the commit modal when working with [Environments](/source-control-environments/). This will make committing easier as we provide more information and better visibility. Environments are available on the Enterprise plan. 

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.71.2

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.71.1...n8n@1.71.2){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-12-10





This release contains bug fixes.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.70.4

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.70.3...n8n@1.70.4){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-12-10



This release contains bug fixes.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.71.1

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.71.0...n8n@1.71.1){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-12-06

This release contains bug fixes.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.70.3

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.70.2...n8n@1.70.3){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-12-05

This release contains bug fixes.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.71.0

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.70.2...n8n@1.71.0){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-12-04

This release contains node updates, performance improvements, and bug fixes.

<div class="n8n-new-features" markdown>

### Task runners for the Code node in public beta
We're introducing a significant performance upgrade to the Code node with our new Task runner system. This enhancement moves JavaScript code execution to a separate process, improving your workflow execution speed while adding better isolation.

<figure markdown="span">
    ![Task runners overview](/_images/hosting/configuration/task-runner-concept.png)
    <figcaption>Task runners overview</figcaption>
</figure>

Our benchmarks show up to 6x improvement in workflow executions using Code nodes - from approximately 6 to 35 executions per second. All these improvements happen under the hood, keeping your Code node experience exactly the same.

The Task runner comes in two modes:

- Internal mode (default): Perfect for getting started, automatically managing task runners as child processes  
- External mode: For advanced hosting scenarios requiring maximum isolation and security

Currently, this feature is opt-in and can be enabled using [environment variables](/hosting/configuration/environment-variables/task-runners/). Once stable, it will become the default execution method for Code nodes.

To start using Task runners today, [check out the docs](/hosting/configuration/task-runners/).

</div>

### Node updates

- [AI Transform node](/integrations/builtin/core-nodes/n8n-nodes-base.aitransform/): We improved the prompt for code generation to transform data
- [Code node](/integrations/builtin/core-nodes/n8n-nodes-base.code/): We added a warning if `pairedItem` is absent or could not be auto mapped  

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.


## n8n@1.70.2

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.70.1...n8n@1.70.2){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-12-04

This release contains bug fixes.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.


## n8n@1.70.1

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.70.0...n8n@1.70.1){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-11-29

This release contains bug fixes.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.70.0

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.69.0...n8n@1.70.0){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-11-27

This release contains node updates, performance improvements and bug fixes.

### New canvas in beta
The new canvas is now the default setting for all users. It should bring significant performance improvements and adds a handy minimap. As it is still a beta version you can still revert to the previous version with the three dot menu.  

We're looking forward to your feedback. Should you encounter a bug, you will find a handy button to create an issue at the bottom of the new canvas as well. 

### Node updates
- We added credential support for [Zabbix](/integrations/builtin/credentials/zabbix/) to the HTTP request node  
- We added new OAuth2 credentials for [Microsoft SharePoint](/integrations/builtin/credentials/microsoft/)
- The [Slack node](/integrations/builtin/app-nodes/n8n-nodes-base.slack/#operations) now uses markdown for the approval message when using the `Send and Wait for Approval` operation

### Contributors

[feelgood-interface](https://github.com/feelgood-interface){:target=_blank .external-link}  
[adina-hub](https://github.com/adina-hub){:target=_blank .external-link}  

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.



## n8n@1.68.1

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.68.0...n8n@1.68.1){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-11-26

This release contains bug fixes.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.69.2

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.69.1...n8n@1.69.2){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-11-26




This release contains a bug fix.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.



## n8n@1.69.1

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.69.0...n8n@1.69.1){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-11-25



This release contains bug fixes.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.



## n8n@1.69.0

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.68.0...n8n@1.69.0){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-11-20



This release contains a new feature, node improvements and bug fixes.

### Sub-workflow debugging
We made it much easier to debug sub-workflows by improving their accessibility from the parent workflow. 

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.68.0

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.67.1...n8n@1.68.0){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-11-13


This release contains node updates, performance improvements and many bug fixes.

<div class="n8n-new-features" markdown>

#### New AI agent canvas chat

We revamped the chat experience for AI agents on the canvas. A neatly organized view instead of a modal hiding the nodes. You can now see the canvas, chat and logs at the same time when testing your workflow. 
<br /><br />

<video src="/_video/release-notes/AI-chat-on-canvas.mp4" controls width="100%"></video>
<br /><br />

</div>

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.67.1
View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.67.0...n8n@1.67.1){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-11-07

This release contains a bug fix.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.67.0

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.66.0...n8n@1.67.0){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-11-06

This release contains node updates and bug fixes.

### Node updates

- [AI Transform](/integrations/builtin/core-nodes/n8n-nodes-base.aitransform/): Improved usability  
- [Anthropic Chat Model Node](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatanthropic/): Added Haiku 3.5 support  
- [Convert to File](/integrations/builtin/core-nodes/n8n-nodes-base.converttofile/): Added delimiter option for writing to CSV  
- [Gmail Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.gmailtrigger/): Added option to filter for draft messages  
- [Intercom](/integrations/builtin/app-nodes/n8n-nodes-base.intercom/): Credential can now be used in the HTTP Request node  
- [Rapid7 InsightVM](/integrations/builtin/credentials/rapid7insightvm/): Added credential support  

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.66.0

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.65.2...n8n@1.66.0){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-10-31

This release contains performance improvements, a node update and bug fixes.

### Node update

- [Anthropic Chat Model](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatanthropic/): Added support for claude-3-5-sonnet-20241022  

We made updates to how projects and workflow ownership are displayed making them easier to understand and navigate. 

We further improved the performance logic of partial executions, leading to a smoother and more enjoyable building experience. 

### New n8n canvas alpha
We have enabled the alpha version of our new canvas. The canvas is the ‘drawing board’ of the n8n editor, and we’re working on a full rewrite. Your feedback and testing will help us improve it. 
[Read all about it on our community forum](https://community.n8n.io/t/help-us-test-the-new-n8n-canvas-alpha/60070). 


For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.65.2

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.65.1...n8n@1.65.2){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-10-28

This release contains bug fixes.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.64.3

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.64.2...n8n@1.64.3){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-10-25

This release contains bug fixes.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.65.1

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.65.0...n8n@1.65.1){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-10-25

This release contains bug fixes.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.65.0

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.64.1...n8n@1.65.0){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-10-24

/// warning | [Breaking change](https://github.com/n8n-io/n8n/blob/master/packages/cli/BREAKING-CHANGES.md){:target=_blank .external-link}
What changed?
Queue polling via the environment variable `QUEUE_RECOVERY_INTERVAL` has been removed.

When is action necessary?
If you have set `QUEUE_RECOVERY_INTERVAL`, you can remove it as it no longer has any effect.
///

This release contains a new features, new nodes, node enhancements, and bug fixes.

<div class="n8n-new-features" markdown>

### New node: n8n Form
Use the [n8n Form node](/integrations/builtin/core-nodes/n8n-nodes-base.form/) to create user-facing forms with multiple pages. You can add other nodes with custom logic between to process user input. Start the workflow with a [n8n Form Trigger](/integrations/builtin/core-nodes/n8n-nodes-base.formtrigger/). 

<figure markdown="span">
    ![A multi-page form with branching](/_images/integrations/builtin/core-nodes/n8n-nodes-base.form/example_image.png)
    <figcaption>A multi-page form with branching</figcaption>
</figure>

Additionally you can: 

- Set default selections with query parameters  
- Define the form with a JSON array of objects
- Show a completion screen and redirect to another URL

</div>

### Node updates
New nodes: 

- [Google Business Profile](/integrations/builtin/app-nodes/n8n-nodes-base.googlebusinessprofile/) and [Google Business Profile Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.googlebusinessprofiletrigger/): Use these to integrate Google Business Profile reviews and posts with your workflows  

Enhanced nodes:

- [AI Agent](/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/): Removed the requirement to add at least one tool  
- [GitHub](/integrations/builtin/app-nodes/n8n-nodes-base.github/): Added workflows as a resource operation  
- [Structured Output Parser](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.outputparserstructured/): Added more user-friendly error messages

For additional security, we improved how we handle multi-factor authentication, hardened config file permissions and introduced JWT for the public API. 

For better performance, we improved how partial executions are handled in loops. 

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

### Contributors

- [Idan Fishman](https://github.com/idanfishman){:target=_blank .external-link}  

## n8n@1.64.2

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.64.1...n8n@1.64.2){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-10-24

This release contains a bug fix.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.64.1

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.64.0...n8n@1.64.1){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-10-21

This release contains a bug fix.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.64.0

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.63.4...n8n@1.64.0){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-10-16

This release contains a new node, node enhancements, performance improvements and bug fixes.

<div class="n8n-new-features" markdown>

### Enhanced node: Remove Duplicates
The [Remove Duplicates node](/integrations/builtin/core-nodes/n8n-nodes-base.removeduplicates/) got a major makeover with the addition of two new operations: 

- Remove Items Processed in Previous Executions: Compare items in the current input to items from previous executions and remove duplicates  
- Clear Deduplication History: Wipe the memory of items from previous executions.

This makes it easier to only process new items from any data source. For example, you can now more easily poll a Google sheet for new entries by `id` or remove duplicate orders from the same customer by comparing their `order date`. The great thing is, you can now do this within **and across** workflow runs. 

</div>

### New node: Gong
  
The new node for [Gong](/integrations/builtin/app-nodes/n8n-nodes-base.gong/) allows you to get users and calls to process them further in n8n. Very useful for sales related workflows. 

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

### Contributors

- [Sören Uhrbach](https://github.com/soerenuhrbach){:target=_blank .external-link}  

## n8n@1.63.4

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.63.3...n8n@1.63.4){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-10-15

This release contains a bug fix.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.62.6

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.62.5...n8n@1.62.6){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-10-15

This release contains a bug fix.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.63.3

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.63.2...n8n@1.63.3){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-10-15

This release contains a bug fix.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.63.2

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.63.1...n8n@1.63.2){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-10-11

This release contains a bug fix.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.62.5

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.62.4...n8n@1.62.5){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-10-11

This release contains a bug fix.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.63.1

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.63.0...n8n@1.63.1){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-10-11

This release contains a bug fix.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.62.4

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.62.3...n8n@1.62.4){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-10-11

This release contains a bug fix.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.63.0

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.62.3...n8n@1.63.0){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-10-09

/// warning | [Breaking change](https://github.com/n8n-io/n8n/blob/master/packages/cli/BREAKING-CHANGES.md){:target=_blank .external-link}
What changed?

- The worker server used to bind to IPv6 by default. It now binds to IPv4 by default.  
- The worker server's `/healthz` used to report healthy status based on database and Redis checks. It now reports healthy status regardless of database and Redis status, and the database and Redis checks are part of `/healthz/readiness`.  

When is action necessary?

- If you experience a port conflict error when starting a worker server using its default port, set a different port for the worker server with `QUEUE_HEALTH_CHECK_PORT`.  
- If you are relying on database and Redis checks for worker health status, switch to checking `/healthz/readiness` instead of `/healthz`.  
///

This release contains new features, node enhancements and bug fixes.

### Node updates

- [OpenAI](/integrations/builtin/app-nodes/n8n-nodes-langchain.openai/): Added the option to choose between the default memory connector to provide memory to the assistant or to specify a thread ID    
- [Gmail](/integrations/builtin/app-nodes/n8n-nodes-base.gmail/) and [Slack](/integrations/builtin/app-nodes/n8n-nodes-base.slack/): Added custom approval operations to have a human in the loop of a workflow  

We have also optimized the [worker health checks](/hosting/logging-monitoring/monitoring/) (see breaking change above). 

Each credential now has a seperate url you can link to. This makes sharing much easier. 


For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

### Contributors

[Pemontto](https://github.com/pemontto){:target=_blank .external-link}  

## n8n@1.62.3

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.62.2...n8n@1.62.3){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-10-08

This release contains bug fixes.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.62.2

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.62.1...n8n@1.62.2){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-10-07

This release contains bug fixes.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.62.1

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.61.0...n8n@1.62.1){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-10-02

This release contains new features, node enhancements and bug fixes.

/// note | Skipped 1.62.0
We skipped 1.62.0 and went straight to 1.62.1 with an additional fix. 
///

<div class="n8n-new-features" markdown>

#### Additional nodes as tools

We have made additional nodes usable with the [Tools AI Agent node](/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/tools-agent/). 
<br /><br />

<video src="/_video/release-notes/nodes-as-tools.mp4" controls width="100%"></video>
<br /><br />
Additionally, we have added a `$fromAI()` placeholder function to use with tools, allowing you to dynamically pass information from the models to the connected tools. This function works similarly to placeholders used elsewhere in n8n. 
<br /><br />
Both of these new features enable you to build even more powerful AI agents by drawing directly from the apps your business uses. This makes integrating LLMs into your business processes even easier than before. 

</div>

### Node updates

- [Google BigQuery](/integrations/builtin/app-nodes/n8n-nodes-base.googlebigquery/): Added option to return numeric values as integers and not strings 
- [HTTP Request](/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/): Added credential support for Sysdig 
- [Invoice Ninja](/integrations/builtin/app-nodes/n8n-nodes-base.invoiceninja/): Additional query params for getAll requests 
- [Question and Answer Chain](/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.chainretrievalqa/): Added the option to use a custom prompt 


Drag and drop insertion on cursor position from schema view is now also enabled for code, SQL and Html fields in nodes. 

Customers with an enterprise license can now rate, tag and highlight execution data in the executions view. To use highlighting, add an [Execution Data Node](/integrations/builtin/core-nodes/n8n-nodes-base.executiondata/) (or Code node) to the workflow to set [custom executions data](/workflows/executions/custom-executions-data/). 

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

### Contributors

[Benjamin Roedell](https://github.com/benrobot){:target=_blank .external-link}  
[CodeShakingSheep](https://github.com/CodeShakingSheep){:target=_blank .external-link}  
[manuelbcd](https://github.com/manuelbcd){:target=_blank .external-link}  
[Miguel Prytoluk](https://github.com/mprytoluk){:target=_blank .external-link}  

## n8n@1.61.0

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.60.1...n8n@1.61.0){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-09-25

This release contains new features, node enhancements and bug fixes.

### Node updates

- [Brandfetch](/integrations/builtin/app-nodes/n8n-nodes-base.brandfetch/): Updated to use the new API
- [Slack](/integrations/builtin/app-nodes/n8n-nodes-base.slack/): Made adding or removing the workflow link to a message easier

Big datasets now render faster thanks to virtual scrolling and execution annotations are harder to delete.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.59.4

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.59.3...n8n@1.59.4){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-09-20

This release contains bug fixes.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.60.1

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.60.0...n8n@1.60.1){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-09-20

This release contains bug fixes.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.60.0

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.59.3...n8n@1.60.0){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-09-18

This release contains new features, node enhancements and bug fixes.

<div class="n8n-new-features" markdown>

#### Queue metrics for workers

You can now [expose and consume metrics from your workers](https://docs.n8n.io/hosting/configuration/configuration-examples/prometheus/). The worker instances have the same metrics available as the main instance(s) and can be configured with [environment variables](/hosting/configuration/environment-variables/endpoints/).

</div>

You can now customize the maximum file size when uploading files within forms to webhooks. The [environment variable to set](/hosting/configuration/environment-variables/endpoints/) for this is `N8N_FORMDATA_FILE_SIZE_MAX`. The default setting is 200MiB.

### Node updates
Enhanced nodes:

- [Invoice Ninja](/integrations/builtin/app-nodes/n8n-nodes-base.invoiceninja/): Added actions for bank transactions
- [OpenAI](/integrations/builtin/app-nodes/n8n-nodes-langchain.openai/): Added O1 models to the model select

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

### Contributors

[CodeShakingSheep](https://github.com/CodeShakingSheep){:target=_blank .external-link}

## n8n@1.59.3

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.59.2...n8n@1.59.3){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-09-18

This release contains a bug fix.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.59.2

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.59.1...n8n@1.59.2){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-09-17

This release contains a bug fix.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.59.1

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.59.0...n8n@1.59.1){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-09-16

This release contains bug fixes.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.58.2

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.58.1...n8n@1.58.2){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-09-12

This release contains bug fixes.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.59.0

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.58.1...n8n@1.59.0){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-09-11

/// warning | Chat Trigger
If you are using the Chat Trigger in "Embedded Chat" mode, with authentication turned on, you could see errors connecting to n8n if the authentication on the sending/embedded side is mis-configured.
///

This release contains bug fixes and feature enhancements.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

### Contributors

[oscarpedrero](https://github.com/oscarpedrero){:target=_blank .external-link}

## n8n@1.58.1

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.58.0...n8n@1.58.1){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-09-06

This release contains bug fixes.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.58.0

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.57.0...n8n@1.58.0){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-09-05

This release contains new features, bug fixes and feature enhancements.

<div class="n8n-new-features" markdown>

#### New node: PGVector Vector Store

This release adds the PGVector Vector Store node. Use this node to interact with the PGVector tables in your PostgreSQL database. You can insert, get, and retrieve documents from a vector table to provide them to a retriever connected to a chain.

</div>

<div class="n8n-new-features" markdown>

#### See active collaborators on workflows

We added collaborator avatars back to the workflow canvas. You will see other users who are active on the workflow, preventing you from overriding each other's work.

<figure markdown="span">
    ![Collaboration avatars](/_images/release-notes/Collaboration-avatar.png)
    <figcaption>Collaboration avatars</figcaption>
</figure>

</div>

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.57.0

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.56.2...n8n@1.57.0){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-08-28

This release contains new features and bug fixes.

<div class="n8n-new-features" markdown>

#### Improved execution queue handling

We are [exposing new execution queue metrics](/hosting/configuration/configuration-examples/prometheus/) to give users more visibility of the queue length. This helps to inform decisions on horizontal scaling, based on queue status. We have also made querying executions faster.

</div>

<div class="n8n-new-features" markdown>

#### New credentials for the HTTP Request node

We added credential support for Datadog, Dynatrace, Elastic Security, Filescan, Iris, and Malcore to the HTTP Request node making it easier to use existing credentials.

</div>


We also made it easier to select workflows as tools when working with AI agents by implementing a new `workflow selector` parameter type.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

### Contributors

[Bram Kn](https://github.com/bramkn){:target=_blank .external-link}

## n8n@1.56.2

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.56.1...n8n@1.56.2){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-08-26

This release contains a bug fix.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.56.1

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.56.0...n8n@1.56.1){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-08-23

This release contains bug fixes.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.56.0

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.55.3...n8n@1.56.0){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-08-21

This release contains node updates, security and bug fixes.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.


### Contributors

[CodeShakingSheep](https://github.com/CodeShakingSheep){:target=_blank .external-link}  
[Oz Weiss](https://github.com/thewizarodofoz){:target=_blank .external-link}

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.55.3

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.55.2...n8n@1.55.3){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-08-16

This release contains bug fixes.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.55.2

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.55.1...n8n@1.55.2){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-08-16

This release contains bug fixes.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.55.1

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.55.0...n8n@1.55.1){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-08-15

This release contains bug fixes.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.54.4

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.54.3...n8n@1.54.4){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-08-15

This release contains bug fixes.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.54.3

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.54.2...n8n@1.54.3){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-08-15

This release contains bug fixes.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.54.2

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.54.1...n8n@1.54.2){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-08-14

This release contains bug fixes.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.55.0

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.54.1...n8n@1.55.0){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-08-14

/// warning | [Breaking change](https://github.com/n8n-io/n8n/blob/master/packages/cli/BREAKING-CHANGES.md){:target=_blank .external-link}
The N8N_BLOCK_FILE_ACCESS_TO_N8N_FILES environment variable now also blocks access to n8n's static cache directory at ~/.cache/n8n/public.

If you are writing to or reading from a file at n8n's static cache directory via a node, e.g. Read/Write Files from Disk, please update your node to use a different path.
///

This release contains a new feature, a new node, a node update and bug fixes.

<div class="n8n-new-features" markdown>

#### Override the npm registry

This release adds the option to override the npm registry for installing community packages. This is a paid feature.

We now also prevent npm downloading community packages from a compromised npm registry by explicitly using --registry in all npm install commands.

</div>

<div class="n8n-new-features" markdown>

#### New node: AI Transform

This release adds the [AI Transform node](/integrations/builtin/core-nodes/n8n-nodes-base.aitransform/). Use the AI Transform node to generate code snippets based on your prompt. The AI is context-aware, understanding the workflow’s nodes and their data types. The node is only available on [Cloud plans](/manage-cloud/overview/).

</div>

<div class="n8n-new-features" markdown>

#### New node: Okta

This release adds the [Okta node](/integrations/builtin/app-nodes/n8n-nodes-base.okta/). Use the Okta node to automate work in Okta and integrate Okta with other applications. n8n has built-in support for a wide range of Okta features, which includes creating, updating, and deleting users.

</div>

### Node updates
Enhanced node:

- [MySQL](/integrations/builtin/app-nodes/n8n-nodes-base.mysql/)


This release also adds the new schema view for the expression editor modal.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.54.1

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.54.0...n8n@1.54.1){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-08-13

This release contains a bug fix.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.53.2

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.53.1...n8n@1.53.2){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-08-08

This release contains a bug fix.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.54.0

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.53.1...n8n@1.54.0){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-08-07

This release contains new features, node enhancements, bug fixes and updates to our API.

### API update
Our [public REST API](/api/) now supports additional operations:

- Create, delete, and edit roles for users
- Create, read, update and delete projects

Find the details in the [API reference](/api/api-reference/).

### Contributors

[CodeShakingSheep](https://github.com/CodeShakingSheep){:target=_blank .external-link}  
[Javier Ferrer González](https://github.com/JavierCane){:target=_blank .external-link}  
[Mickaël Andrieu](https://github.com/mickaelandrieu){:target=_blank .external-link}  
[Oz Weiss](https://github.com/thewizarodofoz){:target=_blank .external-link}  
[Pemontto](https://github.com/pemontto){:target=_blank .external-link}

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.45.2

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.45.1...n8n@1.45.2){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-08-06

This release contains a bug fix.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.53.1

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.53.0...n8n@1.53.1){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-08-02

This release contains bug fixes.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.53.0

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.52.2...n8n@1.53.0){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-07-31

This release contains new features, new nodes, node enhancements, bug fixes and updates to our API.

<div class="n8n-new-features" markdown>

#### Added Google Cloud Platform Secrets Manager support

This release adds [Google Cloud Platform Secrets Manager](/external-secrets/) to the list of external secret stores. We already support AWS secrets, Azure Key Vault, Infisical and HashiCorp Vault. External secret stores are available under an enterprise license.

</div>

<div class="n8n-new-features" markdown>

#### New node: Information Extractor

This release adds the [Information Extractor node](/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.information-extractor/). The node is specifically tailored for information extraction tasks. It uses Structured Output Parser under the hood, but provides a simpler way to extract information from text in a structured JSON form.

</div>

<div class="n8n-new-features" markdown>

#### New node: Sentiment Analysis

This release adds the [Sentiment Analysis node](/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.sentimentanalysis/). The node leverages LLMs to analyze and categorize the sentiment of input text. Users can easily integrate this node into their workflows to perform sentiment analysis on text data. The node is flexible enough to handle various use cases, from basic positive/negative classification to more nuanced sentiment categories.

</div>

### Node updates
Enhanced nodes:

- [Calendly Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.calendlytrigger/)
- [HTTP Request](/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/)
- [n8n Form Trigger](/integrations/builtin/core-nodes/n8n-nodes-base.formtrigger/)
- [Shopify](/integrations/builtin/app-nodes/n8n-nodes-base.shopify/)

### API update
Our [public REST API](/api/) now supports additional operations:

- Create, read, and delete for variables
- Filtering workflows by project
- Transferring workflows

Find the details in the [API reference](/api/api-reference/).

### Contributors

[feelgood-interface](https://github.com/feelgood-interface){:target=_blank .external-link}  
[Oz Weiss](https://github.com/thewizarodofoz){:target=_blank .external-link}

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.52.2

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.52.1...n8n@1.52.2){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-07-31

This release contains bug fixes.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.52.1

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.52.0...n8n@1.52.1){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-07-26

This release contains bug fixes.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.51.2

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.51.1...n8n@1.51.2){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-07-26

This release contains bug fixes.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.52.0

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.51.1...n8n@1.52.0){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-07-25


/// warning | [Breaking change](https://github.com/n8n-io/n8n/blob/master/packages/cli/BREAKING-CHANGES.md){:target=_blank .external-link}
Prometheus metrics enabled via N8N_METRICS_INCLUDE_DEFAULT_METRICS and N8N_METRICS_INCLUDE_API_ENDPOINTS were fixed to include the default n8n_ prefix.

If you are using Prometheus metrics from these categories and are using a non-empty prefix, please update those metrics to match their new prefixed names.
///


This release contains new features, node enhancements and bug fixes.

<div class="n8n-new-features" markdown>

#### Added Azure Key Vault support

This release adds [Azure Key Vault](/external-secrets/) to the list of external secret stores. We already support AWS secrets, Infisical and HashiCorp Vault and are working on Google Secrets Manager. External secret stores are available under an enterprise license.

</div>

### Node updates
Enhanced nodes:

- [Pinecone Vector Store](/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstorepinecone/)
- [Supabase Vector Store](/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoresupabase/)
- [Send Email](/integrations/builtin/core-nodes/n8n-nodes-base.sendemail/)

Deprecated nodes:

- OpenAI Model: You can use the OpenAI Chat Model instead
- Google Palm Chat Model: You can use Google Vertex or Gemini instead
- Google Palm Model: You can use Google Vertex or Gemini instead


## n8n@1.51.1

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.51.0...n8n@1.51.1){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-07-23

This release contains bug fixes.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.50.2

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.50.1...n8n@1.50.2){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-07-23

This release contains bug fixes.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.51.0

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.50.1...n8n@1.51.0){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-07-18

This release contains new nodes, node enhancements and bug fixes.

<div class="n8n-new-features" markdown>

#### New node: Text Classifier

This release adds the [Text Classifier node](/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.text-classifier).

</div>

<div class="n8n-new-features" markdown>

#### New node: Postgres Chat Memory

This release adds the [Postgres Chat Memory node](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.memorypostgreschat/).

</div>

<div class="n8n-new-features" markdown>

#### New node: Google Vertex Chat Model

This release adds the [Google Vertex Chat Model node](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatgooglevertex/).

</div>

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

### Node updates
- Enhanced nodes: Asana

## n8n@1.50.1

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.50.0...n8n@1.50.1){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-07-16

This release contains bug fixes.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.50.0

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.49.0...n8n@1.50.0){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-07-10

This release contains node enhancements and bug fixes.

### Node updates
- Enhanced nodes: Chat Trigger, Google Cloud Firestore, Qdrant Vector Store, Splunk, Telegram
- Deprecated node: Orbit (product shut down)

### Beta Feature Removal
The Ask AI beta feature for the HTTP Request node has been removed from this version

### Contributors
[Stanley Yoshinori Takamatsu](https://github.com/stanleytakamatsu){:target=_blank .external-link}  
[CodeShakingSheep](https://github.com/CodeShakingSheep){:target=_blank .external-link}  
[jeanpaul](https://github.com/jeanpaul){:target=_blank .external-link}  
[adrian-martinez-onestic](https://github.com/adrian-martinez-onestic){:target=_blank .external-link}  
[Malki Davis](https://github.com/mxdavis){:target=_blank .external-link}


## n8n@1.49.0

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.48.3...n8n@1.49.0){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-07-03



This release contains a new node, node enhancements, and bug fixes.

### Node updates
- New node added: [Vector Store Tool](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolvectorstore/) for the AI Agent
- Enhanced nodes: Zep Cloud Memory, Copper, Embeddings Cohere, GitHub, Merge, Zammad

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

### Contributors
[Jochem](https://github.com/jvdweerthof){:target=_blank .external-link}  
[KhDu](https://github.com/KhDu){:target=_blank .external-link}  
[Nico Weichbrodt](https://github.com/envy){:target=_blank .external-link}  
[Pavlo Paliychuk](https://github.com/paul-paliychuk){:target=_blank .external-link}


## n8n@1.48.3

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.48.2...n8n@1.48.3){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-07-03



This release contains bug fixes.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.47.3

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.47.2...n8n@1.47.3){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-07-03

This release contains bug fixes.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.48.2

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.48.1...n8n@1.48.2){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-07-01

This release contains bug fixes.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.47.2

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.47.1...n8n@1.47.2){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-07-01

This release contains bug fixes.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.48.1

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.48.0...n8n@1.48.1){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-06-27

This release contains bug fixes.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.48.0

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.47.1...n8n@1.48.0){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-06-27



This release contains bug fixes and feature enhancements.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

### Contributors

[KubeAl](https://github.com/KubeAl){:target=_blank .external-link}


## n8n@1.47.1

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.47.0...n8n@1.47.1){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-06-26

This is a bug fix release.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.47.0

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.46.0...n8n@1.47.0){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-06-20

/// warning | Breaking change
Calling `$(...).last()` (or `(...).first()` or `$(...).all()`) without arguments now returns the last item (or first or all items) of the output that connects two nodes. Previously, it returned the item/items of the first output of that node. Refer to the [breaking changes log](https://github.com/n8n-io/n8n/blob/master/packages/cli/BREAKING-CHANGES.md#1470){:target=_blank .external-link} for details.
///

This release contains bug fixes, feature enhancements, a new node, node enhancements and performance improvements.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

<div class="n8n-new-features" markdown>

#### New node: HTTP request tool

This release adds the HTTP request tool. You can use it with an AI agent as a tool to collect information from a website or API. Refer to the [HTTP request tool](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolhttprequest/) for details.

</div>

### Contributors

[Daniel](https://github.com/daniel-alba17){:target=_blank .external-link}  
[ekadin-mtc](https://github.com/ekadin-mtc){:target=_blank .external-link}  
[Eric Francis](https://github.com/EricFrancis12){:target=_blank .external-link}  
[Josh Sorenson](https://github.com/joshsorenson){:target=_blank .external-link}  
[Mohammad Alsmadi](https://github.com/smadixd){:target=_blank .external-link}  
[Nikolai T. Jensen](https://github.com/ch0wm3in){:target=_blank .external-link}  
[n8n-ninja](https://github.com/n8n-ninja){:target=_blank .external-link}  
[pebosi](https://github.com/pebosi){:target=_blank .external-link}  
[Taylor Hoffmann](https://github.com/TaylorHo){:target=_blank .external-link}

## n8n@1.45.1

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.45.0...n8n@1.45.1){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-06-12


This is a bug fix release.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.46.0

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.45.0...n8n@1.46.0){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-06-12




This release contains feature enhancements, node enhancements, and bug fixes.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

### Contributors

[Jean Khawand](https://github.com/jeankhawand){:target=_blank .external-link}  
[pemontto](https://github.com/pemontto){:target=_blank .external-link}  
[Valentin Coppin](https://github.com/valimero){:target=_blank .external-link}

## n8n@1.44.2

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.44.1...n8n@1.44.2){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-06-12



This is a bug fix release.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.42.2

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.42.1...n8n@1.42.2){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-06-10

This is a bug fix release.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.45.0

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.44.1...n8n@1.45.0){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-06-06


This release contains new features, node enhancements, and bug fixes.


For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.44.1

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.44.0...n8n@1.44.1){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-06-03

This is a bug fix release.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.44.0

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.43.1...n8n@1.44.0){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-05-30



This release contains new features, node enhancements, and bug fixes.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.43.1

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.43.0...n8n@1.43.1){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-05-28

This is a bug fix release.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.43.0

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.42.1...n8n@1.43.0){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-05-22


This release contains new features, node enhancements, and bug fixes.

/// note | Backup recommended
Although this release doesn't include a breaking change, it is a significant update including database migrations. n8n recommends backing up your data before updating to this version.
///

/// Note | Credential sharing required for manual executions
Instance owners and admins: you will see changes if you try to manually execute a workflow where the credentials aren't shared with you. Manual workflow executions now use the same permissions checks as production executions, meaning you can't do a manual execution of a workflow if you don't have access to the credentials. Previously, owners and admins could do manual executions without credentials being shared with them. To resolve this, the credential creator needs to [share the credential](/credentials/credential-sharing/) with you.
///

<div class="n8n-new-features" markdown>

#### New feature: Projects

With projects and roles, you can give your team access to collections of workflows and credentials, rather than having to share each workflow and credential individually. Simultaneously, you tighten security by limiting access to people on the relevant team.
<br /><br />
Refer to the [RBAC](/user-management/rbac/) documentation for information on creating projects and using roles.
<br /><br />
The number of projects and role types vary depending on your plan. Refer to [Pricing](https://n8n.io/pricing/){:target=_blank .external-link} for details.

<video src="/_video/release-notes/rbac-glimpse.mp4" controls width="100%"></video>

</div>

<div class="n8n-new-features" markdown>

#### New node: Slack Trigger

This release adds a trigger node for Slack. Refer to the [Slack Trigger documentation](/integrations/builtin/trigger-nodes/n8n-nodes-base.slacktrigger/) for details.

</div>

### Other highlights

* Improved [memory support for OpenAI assistants](/integrations/builtin/app-nodes/n8n-nodes-langchain.openai/#using-memory-with-openai-assistants).

### Rolling back to a previous version

If you update to this version, then decide you need to role back:

Self-hosted n8n:

1. Delete any RBAC projects you created.
2. Revert the database migrations using `n8n db:revert`.

Cloud: contact [help@n8n.io](mailto:help@n8n.io).

### Contributors

[Ayato Hayashi](https://github.com/hayashi-ay){:target=_blank .external-link}  
[Daniil Zobov](https://github.com/ddzobov){:target=_blank .external-link}  
[Guilherme Barile](https://github.com/GuilhermeBarile){:target=_blank .external-link}  
[Romain MARTINEAU](https://github.com/RJiraya){:target=_blank .external-link}



## n8n@1.42.1

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.42.0...n8n@1.42.1){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-05-20


This is a bug fix release.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.41.1

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.41.0...n8n@1.41.1){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-05-16



This is a bug fix release.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.42.0

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.41.0...n8n@1.42.0){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-05-15



This release contains new features, node enhancements, and bug fixes.

Note that this release removes the AI error debugger. We're working on a new and improved version.

<div class="n8n-new-features" markdown>

#### New feature: Tools Agent

This release adds a new option to the Agent node: the [Tools Agent](/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/tools-agent).

This agent has an enhanced ability to work with tools, and can ensure a standard output format. This is now the recommended default agent.

</div>

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

### Contributors

[Mike Quinlan](https://github.com/mjquinlan2000){:target=_blank .external-link}  
[guangwu](https://github.com/testwill){:target=_blank .external-link}

## n8n@1.41.0

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.40.0...n8n@1.41.0){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-05-08


This release contains new features, node enhancements, and bug fixes.

Note that this release temporarily disables the AI error helper.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

### Contributors

[Florin Lungu](https://github.com/floryn90){:target=_blank .external-link}

## n8n@1.40.0

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.39.1...n8n@1.40.0){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-05-02

/// warning | Breaking change
Please note that this version contains a breaking change for instances using a Postgres database. The default value for the DB_POSTGRESDB_USER environment variable was switched from `root` to `postgres`. Refer to the [breaking changes log](https://github.com/n8n-io/n8n/blob/master/packages/cli/BREAKING-CHANGES.md#1400){:target=_blank .external-link} for details.
///

This release contains new features, new nodes, node enhancements, and bug fixes.

<div class="n8n-new-features" markdown>

#### New feature: Ask AI in the HTTP node

You can now ask AI to help create API requests in the HTTP Request node:

1. In the HTTP Request node, select **Ask AI**.
1. Enter the **Service** and **Request** you want to use. For example, to use the NASA API to get their picture of the day, enter `NASA` in **Service** and `get picture of the day` in **Request**.
1. Check the parameters: the AI tries to fill them out, but you may still need to adjust or correct the configuration.

Self-hosted users need to [enable AI features and provide their own API keys](/hosting/configuration/environment-variables/ai/)

</div>

<div class="n8n-new-features" markdown>

#### New node: Groq Chat Model

This release adds the [Groq Chat Model node](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatgroq/).

</div>

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

### Contributors

[Alberto Pasqualetto](https://github.com/albertopasqualetto){:target=_blank .external-link}  
[Bram Kn](https://github.com/bramkn){:target=_blank .external-link}  
[CodeShakingSheep](https://github.com/CodeShakingSheep){:target=_blank .external-link}  
[Nicolas-nwb](https://github.com/Nicolas-nwb){:target=_blank .external-link}  
[pemontto](https://github.com/pemontto){:target=_blank .external-link}  
[pengqiseven](https://github.com/pengqiseven){:target=_blank .external-link}  
[webk](https://github.com/webkp){:target=_blank .external-link}  
[Yoshino-s](https://github.com/Yoshino-s){:target=_blank .external-link}


## n8n@1.39.1

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.39.0...n8n@1.39.1){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-04-25



This release contains bug fixes.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.38.2

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.38.1...n8n@1.38.2){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-04-25



This release contains bug fixes.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.37.4

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.37.3...n8n@1.37.4){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-04-25

This release contains bug fixes.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.39.0


View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.38.1...n8n@1.39.0){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-04-24

This release contains new nodes, node enhancements, and bug fixes.

<div class="n8n-new-features" markdown>

#### New node: WhatsApp Trigger

This release adds the [WhatsApp Trigger node](/integrations/builtin/trigger-nodes/n8n-nodes-base.whatsapptrigger/).

</div>

<div class="n8n-new-features" markdown>

#### Node enhancement: Multiple methods, one Webhook node

The Webhook Trigger node can now handle calls to multiple HTTP methods. Refer to the [Webhook node documentation](/integrations/builtin/core-nodes/n8n-nodes-base.webhook/#listen-for-multiple-http-methods) for information on enabling this.

</div>

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

### Contributors

[Bram Kn](https://github.com/bramkn){:target=_blank .external-link}

## n8n@1.38.1


View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.38.0...n8n@1.38.1){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-04-18

This release contains bug fixes.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.37.3

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.37.2...n8n@1.37.3){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-04-18



This release contains bug fixes.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.38.0

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.37.2...n8n@1.38.0){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-04-17

This release contains new nodes, bug fixes, and node enhancements.

<div class="n8n-new-features" markdown>

#### New node: Google Gemini Chat Model

This release adds the [Google Gemini Chat Model sub-node](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatgooglegemini/).

</div>

<div class="n8n-new-features" markdown>

#### New node: Embeddings Google Gemini

This release adds the [Google Gemini Embeddings sub-node](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.embeddingsgooglegemini/).

</div>

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

### Contributors

[Chengyou Liu](https://github.com/cyliu0){:target=_blank .external-link}  
[Francesco Mannino](https://github.com/manninofrancesco){:target=_blank .external-link}

## n8n@1.37.2

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.37.1...n8n@1.37.2){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-04-17

This release contains bug fixes.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.36.4

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.36.3...n8n@1.36.4){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-04-15

This release contains bug fixes.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.


## n8n@1.36.3

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.36.2...n8n@1.36.3){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-04-12

This release contains bug fixes.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.37.1

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.37.0...n8n@1.37.1){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-04-11


/// warning | Breaking change
Please note that this version contains a breaking change for self-hosted n8n. It removes the `--file` flag for the `execute` CLI command. If you have scripts relying on the `--file` flag, update them to first import the workflow and then execute it using the `--id` flag. Refer to [CLI commands](/hosting/cli-commands/) for more information on CLI options.
///

This release contains bug fixes.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.



## n8n@1.36.2

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.36.1...n8n@1.36.2){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-04-11

This release contains bug fixes.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.37.0

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.36.1...n8n@1.37.0){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-04-10


/// warning | Breaking change
Please note that this version contains a breaking change for self-hosted n8n. It removes the `--file` flag for the `execute` CLI command. If you have scripts relying on the `--file` flag, update them to first import the workflow and then execute it using the `--id` flag. Refer to [CLI commands](/hosting/cli-commands/) for more information on CLI options.
///

This release contains a new node, improvements to error handling and messaging, node enhancements, and bug fixes.

<div class="n8n-new-features" markdown>

#### New node: JWT

This release adds the [JWT core node](/integrations/builtin/core-nodes/n8n-nodes-base.jwt/).

</div>

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

### Contributors

[Miguel Prytoluk](https://github.com/mprytoluk){:target=_blank .external-link}

## n8n@1.36.1

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.36.0...n8n@1.36.1){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-04-04


This release contains bug fixes.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.36.0

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.35.0...n8n@1.36.0){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-04-03

This release contains new nodes, enhancements and bug fixes.

<div class="n8n-new-features" markdown>

#### New node: Salesforce Trigger node

This release adds the [Salesforce Trigger node](/integrations/builtin/trigger-nodes/n8n-nodes-base.salesforcetrigger/).

</div>

<div class="n8n-new-features" markdown>

#### New node: Twilio Trigger node

This release adds the [Twilio Trigger node](/integrations/builtin/trigger-nodes/n8n-nodes-base.twiliotrigger/).

</div>

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.35.0

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.34.2...n8n@1.35.0){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-03-28



This release contains enhancements and bug fixes.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.34.2

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.34.1...n8n@1.34.2){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-03-26



This release contains bug fixes.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.34.1

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.34.0...n8n@1.34.1){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-03-25



This release contains bug fixes.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.34.0

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.33.1...n8n@1.34.0){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-03-20

This release contains new features, new nodes, and bug fixes.

<div class="n8n-new-features" markdown>

#### New node: Microsoft OneDrive Trigger node

This release adds the [Microsoft OneDrive Trigger node](/integrations/builtin/trigger-nodes/n8n-nodes-base.microsoftonedrivetrigger/). You can now trigger workflows on file and folder creation and update events.

</div>

<div class="n8n-new-features" markdown>

#### New data transformation functions

This release introduces new [data transformation functions](/code/builtin/data-transformation-functions/):

**String**

```js
toDateTime() //replaces toDate(). toDate() is retained for backwards compatability.
parseJson()
extractUrlPath()
toBoolean()
base64Encode()
base64Decode()
```

**Number**

```js
toDateTime()
toBoolean()
```

**Object**

```js
toJsonString()
```

**Array**

```js
toJsonString()
```

**Date & DateTime**

```js
toDateTime()
toInt()
```

**Boolean**

```js
toInt()
```

</div>

### Contributors

[Bram Kn](https://github.com/bramkn){:target=_blank .external-link}  
[pemontto](https://github.com/pemontto){:target=_blank .external-link}

## n8n@1.33.1

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.33.0...n8n@1.33.1){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-03-15



This release contains bug fixes.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.32.2

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.32.1...n8n@1.32.2){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-03-15





This release contains bug fixes.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.33.0

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.32.1...n8n@1.33.0){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-03-13

This release contains new features, node enhancements, and bug fixes.

<div class="n8n-new-features" markdown>

#### Support for Claude 3

This release adds support for Claude 3 to the [Anthropic Chat Model](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatanthropic/) node.

</div>

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

### Contributors

[gumida](https://github.com/gumida){:target=_blank .external-link}  
[Ayato Hayashi](https://github.com/hayashi-ay){:target=_blank .external-link}  
[Jordan](https://github.com/jordanburke){:target=_blank .external-link}  
[MC Naveen](https://github.com/mcnaveen){:target=_blank .external-link}

## n8n@1.32.1

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.32.0...n8n@1.32.1){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-03-07



This is a bug fix release.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.31.2

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.31.1...n8n@1.31.2){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-03-07


This is a bug fix release.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.32.0

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.31.1...n8n@1.32.0){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-03-06

This release contains new features, node enhancements, performance improvements, and bug fixes.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.31.1

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.31.0...n8n@1.31.1){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-03-06

/// warning | Breaking changes
Please note that this version contains a breaking change. HTTP connections to the editor will fail on domains other than localhost. You can read more about it [here](https://github.com/n8n-io/n8n/blob/master/packages/cli/BREAKING-CHANGES.md#1320){:target=_blank .external-link}.
///

This is a bug fix release and it contains a breaking change.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.31.0

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.30.0...n8n@1.31.0){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-02-28

This release contains new features, new nodes, node enhancements and bug fixes.

<div class="n8n-new-features" markdown>

#### New nodes: Microsoft Outlook trigger and Ollama embeddings

This release adds two new nodes.

* [Microsoft Outlook Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.microsoftoutlooktrigger/)
* [Ollama Embeddings](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.embeddingsollama/)

</div>

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.


## n8n@1.30.1

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.30.0...n8n@1.30.1){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-02-23



This release contains bug fixes.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.30.0

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.29.1...n8n@1.30.0){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-02-21





This release contains new features, node enhancements, and bug fixes.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.29.1

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.29.0...n8n@1.29.1){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-02-16











This release contains bug fixes.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.29.0

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.28.0...n8n@1.29.0){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-02-15

This release contains new features, node enhancements, and bug fixes.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

### New features

<div class="n8n-new-features" markdown>

#### OpenAI node overhaul

This release includes a new version of the [OpenAI node](/integrations/builtin/app-nodes/n8n-nodes-langchain.openai/), adding more operations, including support for working with assistants.

</div>

Other highlights:

* Support for AI events in [log streaming](/log-streaming/).
* Added support for workflow tags in the [public API](/api/).

### Contributors

[Bruno Inec](https://github.com/sweenu){:target=_blank .external-link}  
[Jesús Burgers](https://github.com/jburgers-chakray){:target=_blank .external-link}

## n8n@1.27.3

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.27.2...n8n@1.27.3){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-02-15







This release contains bug fixes.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.28.0

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.27.2...n8n@1.28.0){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-02-07



This release contains new features, new nodes, node enhancements and bug fixes.

<div class="n8n-new-features" markdown>

#### New nodes: Azure OpenAI chat model and embeddings

This release adds two new nodes to work with [Azure OpenAI](https://azure.microsoft.com/en-gb/products/ai-services/openai-service/){:target=_blank .external-link} in your advanced AI workflows:

* [Embeddings Azure OpenAI](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.embeddingsazureopenai/)
* [Azure OpenAI Chat Model](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatazureopenai/)

</div>

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

### Contributors

[Andrea Ascari](https://github.com/ascariandrea){:target=_blank .external-link}

## n8n@1.27.2

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.27.1...n8n@1.27.2){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-02-02

This release contains bug fixes.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.27.1

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.26.0...n8n@1.27.1){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-01-31

This release contains new features, node enhancements, and bug fixes.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.27.0

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.26.0...n8n@1.27.0){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-01-31

/// warning | Breaking change
This release removes `own` mode for self-hosted n8n. You must now use `EXECUTIONS_MODE` and set to either `regular` or `queue`. Refer to [Queue mode](/hosting/scaling/queue-mode/) for information on configuring queue mode.
///

/// note | Skip this release
Please upgrade directly to 1.27.1.
///

This release contains node enhancements and bug fixes.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.26.0

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.25.1...n8n@1.26.0){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-01-24

This release contains new features, node enhancements, and bug fixes.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

### Contributors

[Daniel Schröder](https://github.com/schroedan){:target=_blank .external-link}  
[Nihaal Sangha](https://github.com/nihaals){:target=_blank .external-link}

## n8n@1.25.1

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.25.0...n8n@1.25.1){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-01-22

This is a bug fix release.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

### Contributors

[Nihaal Sangha](https://github.com/nihaals){:target=_blank .external-link}

## n8n@1.25.0

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.24.1...n8n@1.25.0){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-01-17

This release contains a new node, feature improvements, and bug fixes.

<div class="n8n-new-features" markdown>

#### New node: Chat Memory Manager

The [Chat Memory Manager](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.memorymanager/) node replaces the Chat Messages Retriever node. It manages chat message memories within your AI workflows.

</div>

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.24.1

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.24.0...n8n@1.24.1){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-01-16

This is a bug fix release.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.22.6

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.22.5...n8n@1.22.6){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-01-10

This is a bug fix release. It includes important fixes for the HTTP Request and monday.com nodes.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.24.0

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.23.0...n8n@1.24.0){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-01-10


This release contains new nodes for advanced AI, node enhancements, new features, performance enhancements, and bug fixes.

<div class="n8n-new-features" markdown>

#### Chat trigger

n8n has created a new [Chat Trigger node](/integrations/builtin/core-nodes/n8n-nodes-langchain.chattrigger/). The new node provides a chat interface that you can make publicly available, with customization and authentication options.

</div>

<div class="n8n-new-features" markdown>

#### Mistral Cloud Chat and Embeddings

This release introduces two new nodes to support [Mistral AI](https://mistral.ai/){:target=_blank .external-link}:

* [Mistral Cloud Chat Model](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatmistralcloud/)
* [Embeddings Mistral Cloud](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.embeddingsmistralcloud/)

</div>

### Contributors

[Anush](https://github.com/Anush008){:target=_blank .external-link}  
[Eric Koleda](https://github.com/ekoleda-codaio){:target=_blank .external-link}  
[Mason Geloso](https://github.com/MasonGeloso){:target=_blank .external-link}  
[vacitbaydarman](https://github.com/vacitbaydarman){:target=_blank .external-link}

## n8n@1.22.5

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.22.4...n8n@1.22.5){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-01-09

This is a bug fix release.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.



## n8n@1.23.0

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.22.4...n8n@1.23.0){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-01-03

This release contains new nodes, node enhancements, new features, and bug fixes.

<div class="n8n-new-features" markdown>

#### New nodes and improved experience for working with files

This release includes a major overhaul of nodes relating to files (binary data).

There are now three key nodes dedicated to handling binary data files:

- [Read/Write Files from Disk](/integrations/builtin/core-nodes/n8n-nodes-base.readwritefile/) to read and write files from/to the machine where n8n is running.
- [Convert to File](/integrations/builtin/core-nodes/n8n-nodes-base.converttofile/) to take input data and output it as a file.
- [Extract From File](/integrations/builtin/core-nodes/n8n-nodes-base.extractfromfile/) to get data from a binary format and convert it to JSON.

n8n has moved support for iCalendar, PDF, and spreadsheet formats into these nodes, and removed the iCalendar, Read PDF, and Spreadsheet File nodes. There are still standalone nodes for [HTML](/integrations/builtin/core-nodes/n8n-nodes-base.html/) and [XML](/integrations/builtin/core-nodes/n8n-nodes-base.xml/).

</div>

<div class="n8n-new-features" markdown>

#### New node: Qdrant vector store

This release adds support for [Qdrant](https://qdrant.tech/){:target=_blank .external-link} with the Qdrant vector store node.

Read n8n's [Qdrant vector store node documentation](/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoreqdrant/)

</div>

### Contributors



[Aaron Gutierrez](https://github.com/aarongut){:target=_blank .external-link}  
[Advaith Gundu](https://github.com/geodic){:target=_blank .external-link}  
[Anush](https://github.com/Anush008){:target=_blank .external-link}  
[Bin](https://github.com/soulhat){:target=_blank .external-link}  
[Nihaal Sangha](https://github.com/nihaals){:target=_blank .external-link}



## n8n@1.22.4

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.22.3...n8n@1.22.4){:target=_blank .external-link} for this version.<br />
**Release date:** 2024-01-03



This is a bug fix release.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.22.3

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.22.2...n8n@1.22.3){:target=_blank .external-link} for this version.<br />
**Release date:** 2023-12-27

/// note | Upgrade directly to 1.22.4
Due to issues with this release, upgrade directly to 1.22.4.
///

This is a bug fix release.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.22.2

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.22.1...n8n@1.22.2){:target=_blank .external-link} for this version.<br />
**Release date:** 2023-12-27

/// note | Upgrade directly to 1.22.4
Due to issues with this release, upgrade directly to 1.22.4.
///

This is a bug fix release.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.22.1

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.22.0...n8n@1.22.1){:target=_blank .external-link} for this version.<br />
**Release date:** 2023-12-21

This is a bug fix release.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.22.0

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.21.1...n8n@1.22.0){:target=_blank .external-link} for this version.<br />
**Release date:** 2023-12-21

This release contains node enhancements, new features, performance improvements, and bug fixes.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.18.4

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.18.3...n8n@1.18.4){:target=_blank .external-link} for this version.<br />
**Release date:** 2023-12-19

This is a bug fix release.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.21.1

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.20.0...n8n@1.21.1){:target=_blank .external-link} for this version.<br />
**Release date:** 2023-12-15



This is a bug fix release.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.


## n8n@1.18.3

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.18.2...n8n@1.18.3){:target=_blank .external-link} for this version.<br />
**Release date:** 2023-12-15

This is a bug fix release.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.21.0

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.20.0...n8n@1.21.0){:target=_blank .external-link} for this version.<br />
**Release date:** 2023-12-13

This release contains new features and nodes, node enhancements, and bug fixes.

<div class="n8n-new-features" markdown>

#### New user role: Admin

This release introduces a third account type: admin. This role is available on pro and enterprise plans. Admins have similar permissions to instance owners.

[Read more about user roles](/user-management/account-types/)

</div>

<div class="n8n-new-features" markdown>

#### New data transformation nodes

This release replaces the Item Lists node with a collection of nodes for data transformation tasks:

* [Aggregate](/integrations/builtin/core-nodes/n8n-nodes-base.aggregate/): take separate items, or portions of them, and group them together into individual items.
* [Limit](/integrations/builtin/core-nodes/n8n-nodes-base.aggregate/): remove items beyond a defined maximum number.
* [Remove Duplicates](/integrations/builtin/core-nodes/n8n-nodes-base.removeduplicates/): identify and delete items that are identical across all fields or a subset of fields.
* [Sort](/integrations/builtin/core-nodes/n8n-nodes-base.sort/): organize lists of in a desired ordering, or generate a random selection.
* [Split Out](/integrations/builtin/core-nodes/n8n-nodes-base.splitout/): separate a single data item containing a list into multiple items.
* [Summarize](/integrations/builtin/core-nodes/n8n-nodes-base.summarize/): aggregate items together, in a manner similar to Excel pivot tables.

</div>

<div class="n8n-new-features" markdown>

#### Increased sharing permissions for owners and admins

Instance owners and users with the admin role can now see and share all workflows and credentials. They can't view sensitive credential information.

</div>

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.20.0

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.19.5...n8n@1.20.0){:target=_blank .external-link} for this version.<br />
**Release date:** 2023-12-06

This release contains bug fixes, node enhancements, and ongoing new feature work.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

### Contributors


[Andrey Starostin](https://github.com/mayorandrew){:target=_blank .external-link}



## n8n@1.19.5

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.19.4...n8n@1.19.5){:target=_blank .external-link} for this version.<br />
**Release date:** 2023-12-05

This is a bug fix release.

/// warning | Breaking change
This release removes the TensorFlow Embeddings node.
///

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.18.2

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.18.1...n8n@1.18.2){:target=_blank .external-link} for this version.<br />
**Release date:** 2023-12-05

This is a bug fix release.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.19.4

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.19.0...n8n@1.19.4){:target=_blank .external-link} for this version.<br />
**Release date:** 2023-12-01

/// warning | Missing ARM v7 support
This version doesn't support ARM v7. n8n is working on fixing this in future releases.
///

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.19.0

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.18.0...n8n@1.19.0){:target=_blank .external-link} for this version.<br />
**Release date:** 2023-11-29

/// note | Upgrade directly to 1.19.4
Due to issues with this release, upgrade directly to 1.19.4.
///

This release contains new features, node enhancements, and bug fixes.

<div class="n8n-new-features" markdown>

#### LangChain general availability

This release adds LangChain support to the main n8n version. Refer to [LangChain](/langchain/) for more information on how to build AI tools in n8n, the new nodes n8n has introduced, and related learning resources.

</div>

<div class="n8n-new-features" markdown>

#### Show avatars of users working on the same workflow

This release improves the experience of users collaborating on workflows. You can now see who else is editing at the same time as you.

</div>

## n8n@1.18.1

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.18.0...n8n@1.18.1){:target=_blank .external-link} for this version.<br />
**Release date:** 2023-11-30

This is a bug fix release.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.18.0

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.17.1...n8n@1.18.0){:target=_blank .external-link} for this version.<br />
**Release date:** 2023-11-22

This release contains new features and bug fixes.

<div class="n8n-new-features" markdown>

#### Template creator hub

Built a template you want to share? This release introduces the n8n Creator hub. Refer to the [creator hub Notion doc](https://www.notion.so/n8n-Creator-hub-7bd2cbe0fce0449198ecb23ff4a2f76f){:target=_blank .external-link} for more information on this project.

</div>

<div class="n8n-new-features" markdown>

#### Node input and output search filter

Cloud Pro and Enterprise users can now search and filter the input and output data in nodes. Refer to [Data filtering](/data/data-filtering/) for more information.

</div>

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.17.1

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.17.0...n8n@1.17.1){:target=_blank .external-link} for this version.<br />
**Release date:** 2023-11-17

This release contains bug fixes.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.17.0

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.16.0...n8n@1.17.0){:target=_blank .external-link} for this version.<br />
**Release date:** 2023-11-15



This release contains node enhancements and bug fixes.

<div class="n8n-new-features" markdown>

#### Sticky Note Colors

You can now select background colors for sticky notes.

</div>

<div class="n8n-new-features" markdown>

#### Discord Node Overhaul

An overhaul of the Discord node, improving the UI making it easier to configure, improving error handling, and fixing issues.

</div>

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

### Contributors


[antondollmaier](https://github.com/antondollmaier){:target=_blank .external-link}  
[teomane](https://github.com/teomane){:target=_blank .external-link}

## n8n@1.16.0

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.15.2...n8n@1.16.0){:target=_blank .external-link} for this version.<br />
**Release date:** 2023-11-08

This release contains node enhancements and bug fixes.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.15.2

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.15.1...n8n@1.15.2){:target=_blank .external-link} for this version.<br />
**Release date:** 2023-11-07

This release contains bug fixes.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.15.1

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.14.2...n8n@1.15.1){:target=_blank .external-link} for this version.<br />
**Release date:** 2023-11-02


This release contains new features, node enhancements, and bug fixes.

<div class="n8n-new-features" markdown>

#### Workflow history

This release introduces workflow history: view and load previous versions of your workflows.

Workflow history is available in Enterprise n8n, and with limited history for Cloud Pro.

Learn more in the [Workflow history](/workflows/history/) documentation.

</div>

<div class="n8n-new-features" markdown>

#### Dark mode

_Almost_ in time for Halloween: this release introduces dark mode.

To enable dark mode:

1. Select **Settings** > **Personal**.
1. Under **Personalisation**, change **Theme** to **Dark theme**.

</div>

<div class="n8n-new-features" markdown>

#### Optional error output for nodes

All nodes apart from sub-nodes and trigger nodes have a new optional output: **Error**. Use this to add steps to handle node errors.

</div>

<div class="n8n-new-features" markdown>

#### Pagination support added to HTTP Request node

The HTTP Request node now supports an pagination. Read the [node docs](/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/) for information and examples.

</div>

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

### Contributors

[Yoshino-s](https://github.com/Yoshino-s){:target=_blank .external-link}

## n8n@1.14.2

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.14.1...n8n@1.14.2){:target=_blank .external-link} for this version.<br />
**Release date:** 2023-10-26

This release contains bug fixes.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.14.1

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.14.0...n8n@1.14.1){:target=_blank .external-link} for this version.<br />
**Release date:** 2023-10-26

This release contains bug fixes.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.14.0

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.13.0...n8n@1.14.0){:target=_blank .external-link} for this version.<br />
**Release date:** 2023-10-25

This release contains node enhancements and bug fixes.

<div class="n8n-new-features" markdown>

#### Switch node supports more outputs

The [Switch node](/integrations/builtin/core-nodes/n8n-nodes-base.switch/) now supports an unlimited number of outputs.

</div>

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.13.0

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.12.2...n8n@1.13.0){:target=_blank .external-link} for this version.<br />
**Release date:** 2023-10-25

This release contains new features, feature enhancements, and bug fixes.

/// note | Upgrade directly to 1.14.0
This release failed to publish to npm. Upgrade directly to 1.14.0.
///
<div class="n8n-new-features" markdown>

#### RSS Feed Trigger node

This releases introduces a new node, the [RSS Feed Trigger](/integrations/builtin/core-nodes/n8n-nodes-base.rssfeedreadtrigger/). Use this node to start a workflow when a new RSS feed item is published.

</div>

<div class="n8n-new-features" markdown>

#### Facebook Lead Ads Trigger node

This releases add another new node, the [Facebook Lead Ads Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.facebookleadadstrigger/). Use this node to trigger a workflow when you get a new lead.

</div>

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.12.2

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.12.1...n8n@1.12.2){:target=_blank .external-link} for this version.<br />
**Release date:** 2023-10-24


This release contains bug fixes.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

### Contributors

[Burak Akgün](https://github.com/mbakgun){:target=_blank .external-link}

## n8n@1.12.1

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.12.0...n8n@1.12.1){:target=_blank .external-link} for this version.<br />
**Release date:** 2023-10-23


This release contains bug fixes.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

### Contributors

[Léo Martinez](https://github.com/martinezleoml){:target=_blank .external-link}

## n8n@1.11.2

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.11.1...n8n@1.11.2){:target=_blank .external-link} for this version.<br />
**Release date:** 2023-10-23

This release contains bug fixes.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

### Contributors

[Inga](https://github.com/inga-lovinde){:target=_blank .external-link}  
[pemontto](https://github.com/pemontto){:target=_blank .external-link}

## n8n@1.12.0

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.11.1...n8n@1.12.0){:target=_blank .external-link} for this version.<br />
**Release date:** 2023-10-18

This release contains new features, node enhancements, and bug fixes.

<div class="n8n-new-features" markdown>

#### Form Trigger node

This releases introduces a new node, the [n8n Form Trigger](/integrations/builtin/core-nodes/n8n-nodes-base.formtrigger/). Use this node to start a workflow based on a user submitting a form. It provides a configurable form interface.

</div>

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

### Contributors

[Damian Karzon](https://github.com/dkarzon){:target=_blank .external-link}  
[Inga](https://github.com/inga-lovinde){:target=_blank .external-link}  
[pemontto](https://github.com/pemontto){:target=_blank .external-link}


## n8n@1.11.1

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.11.0...n8n@1.11.1){:target=_blank .external-link} for this version.<br />
**Release date:** 2023-10-13

This release contains bug fixes.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.11.0

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.10.1...n8n@1.11.0){:target=_blank .external-link} for this version.<br />
**Release date:** 2023-10-11


This release contains new features and bug fixes.

<div class="n8n-new-features" markdown>

#### External storage for binary files

Self-hosted users can now use an external service to store binary data. Learn more in [External storage](/hosting/scaling/external-storage/).

If you're using n8n Cloud and are interested in this feature, please [contact n8n](https://n8n-community.typeform.com/to/y9X2YuGa){:target=_blank .external-link}.

</div>

<div class="n8n-new-features" markdown>

#### Item Lists node supports binary data

The Item Lists node now supports splitting and concatenating binary data inputs. This means you no longer need to use code to split a collection of files into multiple items.

</div>

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.10.1

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.10.0...n8n@1.10.1){:target=_blank .external-link} for this version.<br />
**Release date:** 2023-10-11

This release contains bug fixes.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.9.3

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.9.2...n8n@1.9.3){:target=_blank .external-link} for this version.<br />
**Release date:** 2023-10-10

This release contains bug fixes.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.9.2

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.9.1...n8n@1.9.2){:target=_blank .external-link} for this version.<br />
**Release date:** 2023-10-09

This release contains bug fixes.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.10.0

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.9.1...n8n@1.10.0){:target=_blank .external-link} for this version.<br />
**Release date:** 2023-10-05



This release contains bug fixes and preparatory work for new features.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.


## n8n@1.9.1

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.9.0...n8n@1.9.1){:target=_blank .external-link} for this version.<br />
**Release date:** 2023-10-04

This release contains bug fixes.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## LangChain in n8n (beta)

**Release date:** 2023-10-04

This release introduces support for building with LangChain in n8n.

With n8n's LangChain nodes you can build AI-powered functionality within your workflows. The LangChain nodes are configurable, meaning you can choose your preferred agent, LLM, memory, and other components. Alongside the LangChain nodes, you can connect any n8n node as normal: this means you can integrate your LangChain logic with other data sources and services.

Read more:

* This is a beta release, and not yet available in the main product. Follow the instructions in [Access LangChain in n8n](/langchain/access-langchain/) to try it out. Self-hosted and Cloud options are available.
* Learn how LangChain concepts map to n8n nodes in [LangChain concepts in n8n](/langchain/langchain-n8n/).
* Browse n8n's new [Cluster nodes](/integrations/builtin/cluster-nodes/). This is a new set of node types that allows for multiple nodes to work together to configure each other.
* If you want to take a look at the code, it's available on the [ai-beta](https://github.com/n8n-io/n8n/tree/ai-beta){:target=_blank .external-link} in the n8n repository. Note that it may move in the future.


## n8n@1.9.0

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.8.2...n8n@1.9.0){:target=_blank .external-link} for this version.<br />
**Release date:** 2023-09-28


This release contains new features, performance improvements, and bug fixes.

--8<-- "_snippets/code/tournament-notes.md"

<div class="n8n-new-features" markdown>

#### Tournament

This releases replaces RiotTmpl, the templating language used in expressions, with n8n's own templating language, [Tournament](https://github.com/n8n-io/tournament){:target=_blank .external-linmk}. You can now use arrow functions in expressions.<br />

</div>

<div class="n8n-new-features" markdown>

#### `N8N_BINARY_DATA_TTL` and `EXECUTIONS_DATA_PRUNE_TIMEOUT` removed

The environment variables `N8N_BINARY_DATA_TTL` and `EXECUTIONS_DATA_PRUNE_TIMEOUT` no longer have any effect and can be removed. Instead of relying on a TTL system for binary data, n8n cleans up binary data together with executions during pruning.

</div>

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.8.2

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.8.1...n8n@1.8.2){:target=_blank .external-link} for this version.<br />
**Release date:** 2023-09-25




This release contains bug fixes.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.8.1

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.8.0...n8n@1.8.1){:target=_blank .external-link} for this version.<br />
**Release date:** 2023-09-21


This release contains bug fixes.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.8.0

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.7.1...n8n@1.8.0){:target=_blank .external-link} for this version.<br />
**Release date:** 2023-09-20

This release contains node enhancements and bug fixes.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.7.1

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.7.0...n8n@1.7.1){:target=_blank .external-link} for this version.<br />
**Release date:** 2023-09-14


This release contains bug fixes.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.7.0

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.6.1...n8n@1.7.0){:target=_blank .external-link} for this version.<br />
**Release date:** 2023-09-13

This release contains node enhancements and bug fixes.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

### Contributors

[Quang-Linh LE](https://github.com/linktohack){:target=_blank .external-link}  
[MC Naveen](https://github.com/mcnaveen){:target=_blank .external-link}

## n8n@1.6.1

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.6.0...n8n@1.6.1){:target=_blank .external-link} for this version.<br />
**Release date:** 2023-09-06


This is a bug fix release.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.6.0

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.5.1...n8n@1.6.0){:target=_blank .external-link} for this version.<br />
**Release date:** 2023-09-06

This release contains bug fixes, new features, and node enhancements.

/// note | Upgrade directly to 1.6.1
Skip this version and upgrade directly to 1.6.1, which contains essential bug fixes.
///
<div class="n8n-new-features" markdown>

#### TheHive 5

This release introduces support for TheHive API version 5. This uses a new node and credentials:

* [TheHive 5 node](/integrations/builtin/app-nodes/n8n-nodes-base.thehive5/)
* [TheHive 5 Trigger node](/integrations/builtin/trigger-nodes/n8n-nodes-base.thehive5trigger/)
* [TheHive 5 credentials](/integrations/builtin/credentials/thehive5/)

#### `N8N_PERSISTED_BINARY_DATA_TTL` removed

The environment variables `N8N_PERSISTED_BINARY_DATA_TTL` no longer has any effect and can be removed. This legacy flag was originally introduced to support ephemeral executions (see [details](https://github.com/n8n-io/n8n/pull/7046)), which are no longer supported.

</div>

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.5.1

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.5.0...n8n@1.5.1){:target=_blank .external-link} for this version.<br />
**Release date:** 2023-08-31


This is a bug fix release.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.5.0

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.4.1...n8n@1.5.0){:target=_blank .external-link} for this version.<br />
**Release date:** 2023-08-31

This release contains new features, node enhancements, and bug fixes.

/// note | Upgrade directly to 1.5.1
Skip this version and upgrade directly to 1.5.1, which contains essential bug fixes.
///
### Highlights

<div class="n8n-new-features" markdown>

#### External secrets storage for credentials

Enterprise-tier accounts can now use external secrets vaults to manage credentials in n8n. This allows you to store credential information securely outside your n8n instance. n8n supports Infisical and HashiCorp Vault.

Refer to [External secrets](/external-secrets/) for guidance on enabling and using this feature.

</div>

<div class="n8n-new-features" markdown>

#### Two-factor authentication

n8n now supports two-factor authentication (2FA) for self-hosted instances. n8n is working on bringing support to Cloud. Refer to [Two-factor authentication](/user-management/two-factor-auth/) for guidance on enabling and using it.

</div>

<div class="n8n-new-features" markdown>

#### Debug executions

Users on a paid n8n plan can now load data from previous executions into their current workflow. This is useful when debugging a failed execution.

Refer to [Debug executions](/workflows/executions/debug/) for guidance on using this feature.

</div>

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.4.1

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.4.0...n8n@1.4.1){:target=_blank .external-link} for this version.<br />
**Release date:** 2023-08-29



This is a bug fix release.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.4.0

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.3.1...n8n@1.4.0){:target=_blank .external-link} for this version.<br />
**Release date:** 2023-08-23

This release contains new features, node enhancements, and bug fixes.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

### Contributors

[pemontto](https://github.com/pemontto){:target=_blank .external-link}

## n8n@1.3.1

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.3.0...n8n@1.3.1){:target=_blank .external-link} for this version.<br />
**Release date:** 2023-08-18

This is a bug fix release.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.


## n8n@1.3.0

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.2.2...n8n@1.3.0){:target=_blank .external-link} for this version.<br />
**Release date:** 2023-08-16

This release contains new features and bug fixes.

### Highlights

<div class="n8n-new-features" markdown>

#### Trial feature: AI support in the Code node

This release introduces limited support for using AI to generate code in the Code node. Initially this feature is only available on Cloud, and will gradually be rolled out, starting with about 20% of users.

Learn how to use the feature, including guidance on writing prompts, in [Generate code with ChatGPT](/code/ai-code/).

</div>

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

### Contributors

[Ian Gallagher](https://github.com/craSH){:target=_blank .external-link}  
[Xavier Calland](https://github.com/xavier-calland){:target=_blank .external-link}

## n8n@1.2.2

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.2.1...n8n@1.2.2){:target=_blank .external-link} for this version.<br />
**Release date:** 2023-08-14

This is a bug fix release.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.2.1

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.2.0...n8n@1.2.1){:target=_blank .external-link} for this version.<br />
**Release date:** 2023-08-09


This is a bug fix release.

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.2.0

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.1.1...n8n@1.2.0){:target=_blank .external-link} for this version.<br />
**Release date:** 2023-08-09

This release contains new features, node enhancements, bug fixes, and performance improvements.

/// note | Upgrade directly to 1.2.1
When upgrading, skip this release and go directly to 1.2.1.
///
### Highlights

<div class="n8n-new-features" markdown>

#### Credential support for SecOps services

This release introduces support for setting up credentials in n8n for the following services:

* [AlienVault](/integrations/builtin/credentials/alienvault/)
* [Auth0 Management](/integrations/builtin/credentials/auth0management/)
* [Carbon Black API](/integrations/builtin/credentials/carbonblack/)
* [Cisco Meraki API](/integrations/builtin/credentials/ciscomeraki/)
* [Cisco Secure Endpoint](/integrations/builtin/credentials/ciscosecureendpoint/)
* [Cisco Umbrella API](/integrations/builtin/credentials/ciscoumbrella/)
* [CrowdStrike](/integrations/builtin/credentials/crowdstrike/)
* [F5 Big-IP](/integrations/builtin/credentials/f5bigip/)
* [Fortinet FortiGate](/integrations/builtin/credentials/fortigate/)
* [Hybrid Analysis](/integrations/builtin/credentials/hybridanalysis/)
* [Imperva WAF](/integrations/builtin/credentials/impervawaf/)
* [Kibana](/integrations/builtin/credentials/kibana/)
* [Microsoft Entra ID](/integrations/builtin/credentials/microsoftentra/)
* [Mist](/integrations/builtin/credentials/mist/)
* [Okta](/integrations/builtin/credentials/okta/)
* [OpenCTI](/integrations/builtin/credentials/opencti/)
* [QRadar](/integrations/builtin/credentials/qradar/)
* [Qualys](/integrations/builtin/credentials/qualys/)
* [Recorded Future](/integrations/builtin/credentials/recordedfuture/)
* [Sekoia](/integrations/builtin/credentials/sekoia/)
* [Shuffler](/integrations/builtin/credentials/shuffler/)
* [Trellix ePO](/integrations/builtin/credentials/trellixepo/)
* [VirusTotal](/integrations/builtin/credentials/virustotal/)
* [Zscaler ZIA](/integrations/builtin/credentials/zscalerzia/)

This makes it easier to do [Custom operations](/integrations/custom-operations/) with these services, using the [HTTP Request](/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/) node.

</div>

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.1.1

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.1.0...n8n@1.1.1){:target=_blank .external-link} for this version.<br />
**Release date:** 2023-07-27


This is a bug fix release.

/// warning | Breaking changes
Please note that this version contains breaking changes if upgrading from a `0.x.x` version. For full details, refer to the [n8n v1.0 migration guide](/1-0-migration-checklist/).
///
For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.1.0

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.0.5...n8n@1.1.0){:target=_blank .external-link} for this version.<br />
**Release date:** 2023-07-26

This release contains new features, bug fixes, and node enhancements.

/// warning | Breaking changes
Please note that this version contains breaking changes if upgrading from a `0.x.x` version. For full details, refer to the [n8n v1.0 migration guide](/1-0-migration-checklist/).
///
### Highlights

<div class="n8n-new-features" markdown>

#### Source control and environments

This release introduces source control and environments for enterprise users.

n8n uses Git-based source control to support environments. Linking your n8n instances to a Git repository lets you create multiple n8n environments, backed by Git branches.

Refer to [Source control and environments](/source-control-environments/) to learn more about the features and set up your environments.

</div>

For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

### Contributors

[Adrián Martínez](https://github.com/adrian-martinez-vdshop){:target=_blank .external-link}  
[Alberto Pasqualetto](https://github.com/albertopasqualetto){:target=_blank .external-link}  
[Marten Steketee](https://github.com/Marten-S){:target=_blank .external-link}  
[perseus-algol](https://github.com/perseus-algol){:target=_blank .external-link}  
[Sandra Ashipala](https://github.com/sandramsc){:target=_blank .external-link}  
[ZergRael](https://github.com/ZergRael){:target=_blank .external-link}

## n8n@1.0.5

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.0.4...n8n@1.0.5){:target=_blank .external-link} for this version.<br />
**Release date:** 2023-07-24



This is a bug fix release.

/// warning | Breaking changes
Please note that this version contains breaking changes if upgrading from a `0.x.x` version. For full details, refer to the [n8n v1.0 migration guide](/1-0-migration-checklist/).
///
For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

## n8n@1.0.4

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.0.3...n8n@1.0.4){:target=_blank .external-link} for this version.<br />
**Release date:** 2023-07-19


This is a bug fix release.

/// warning | Breaking changes
Please note that this version contains breaking changes if upgrading from a `0.x.x` version. For full details, refer to the [n8n v1.0 migration guide](/1-0-migration-checklist/).
///
For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

### Contributors

[Romain Dunand](https://github.com/airmoi){:target=_blank .external-link}  
[noctarius aka Christoph Engelbert](https://github.com/noctarius){:target=_blank .external-link}


## n8n@1.0.3

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.0.2...n8n@1.0.3){:target=_blank .external-link} for this version.<br />
**Release date:** 2023-07-13

This release contains API enhancements and adds support for sending messages to forum threads in the Telegram node.

/// warning | Breaking changes
Please note that this version contains breaking changes if upgrading from a `0.x.x` version. For full details, refer to the [n8n v1.0 migration guide](/1-0-migration-checklist/).
///
For full release details, refer to [Releases](https://github.com/n8n-io/n8n/releases){:target=_blank .external-link} on GitHub.

### Contributors

[Kirill](https://github.com/chrtkv){:target=_blank .external-link}

## n8n@1.0.2

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.0.1...n8n@1.0.2){:target=_blank .external-link} for this version.<br />
**Release date:** 2023-07-05

This is a bug fix release.

/// warning | Breaking changes
Please note that this version contains breaking changes if upgrading from a `0.x.x` version. For full details, refer to the [n8n v1.0 migration guide](/1-0-migration-checklist/).
///
### Contributors

[Romain Dunand](https://github.com/airmoi){:target=_blank .external-link}

## n8n@1.0.1

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@1.0.0...n8n@1.0.1){:target=_blank .external-link} for this version.<br />
**Release date:** 2023-07-05

/// warning | Breaking changes
Please note that this version contains breaking changes. For full details, refer to the [n8n v1.0 migration guide](/1-0-migration-checklist/).
///
This is n8n's version one release.

For full details, refer to the [n8n v1.0 migration guide](/1-0-migration-checklist/).

### Highlights

<div class="n8n-new-features" markdown>

#### Python support

Although JavaScript remains the default language, you can now also select Python as an option in the [Code node](/code/code-node/) and even make use of [many Python modules](https://pyodide.org/en/stable/usage/packages-in-pyodide.html#packages-in-pyodide){:target=_blank .external link}. Note that Python is unavailable in Code nodes added to a workflow before v1.0.

</div>

### Contributors

[Marten Steketee](https://github.com/Marten-S){:target=_blank .external-link}

<!-- vale on -->
