<!--
# How to use this template

1. Make a new branch. If working on an internal ticket, include it at the start of the name. For example, DOC-123-feature-summary.
2. Create a new file, or find the file you want to edit, in integrations/builtin/app-nodes/. If creating a new file, pay attention to the naming conventions: it should match the node name in the codex file. For example, in the Active Campaign node, the codex file (https://github.com/n8n-io/n8n/blob/master/packages/nodes-base/nodes/ActiveCampaign/ActiveCampaign.node.json) reads: `"node": "n8n-nodes-base.activeCampaign"`. So the app node file name is n8n-nodes-base.activeCampaign.
3. Copy the template into the file (don't copy this comment).
4. Placeholder text is in _italic_ or between <>. Make sure to replace it! 
5. Before publishing, delete any comments.

Use the style guide: https://github.com/n8n-io/n8n-docs/wiki
You can find more info on working with the docs project in the README: https://github.com/n8n-io/n8n-docs/blob/main/README.md

-->

<!--
Set the meta title and meta description in the frontmatter
-->

---
title: _Name_ node documentation
description: Learn how to use the _Name_ node in n8n. Follow technical documentation to integrate _Name_ node into your workflows.
contentType: [integration, reference]
---

<!-- 
The title should be the name of the integration 
Match the brand name exactly. For example, GitHub NOT Github
When you add this node to nav.yml in the navigation, prepend it with the `_Name_:` only, for example ActiveCampaign: _relativepath_
-->
# _Name_ node

<!-- Briefly summarize the node. For example:

Use the _Name_ node to automate work in _Name_ and integrate _Name_ with other applications. n8n has built-in support for a wide range of _Name_ features, which includes creating, updating, and deleting events, people, tags, and signatures. -->

On this page, you'll find a list of operations the _Name_ node supports, and links to more resources.

///  note  | Credentials
You can find authentication information for this node [here](/integrations/builtin/credentials/_Name_.md).
///


## Operations

* _Bullet list_
* _Of available operations_.

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, page) ]]

## Related resources

<!-- provide a link to the trigger node docs, if there is a trigger node for this service -->
n8n provides a trigger node for _Name_. You can find the trigger node docs [here](/integrations/builtin/trigger-nodes/n8n-nodes-base._Name_trigger.md).


<!-- add a link to the service's documentation. This should usually go direct to the API docs -->
Refer to [_Name_'s documentation]() for more information about the service.

<!-- IF THE NODE SUPPORTS PREDEFINED CREDS
let users know they can use the HTTP node if their operation isn't supported 
--8<-- "_snippets/integrations/builtin/app-nodes/operation-not-supported.md"
-->

## Common issues

<!-- 
if the node is small enough for a single page, add the sentence below. Create a subheading below this for each error, quirk, pain point, or other complex topic that might trip people up
-->
Here are some common errors and issues with the _Name_ node and steps to resolve or troubleshoot them.
<!-- 
If the node is large enough to warrant subpages, create a separate Common issues page using the common-issues.md template and link to it here using this text:

For common questions or issues and suggested solutions, refer to [Common issues](/integrations/builtin/_filepath_.md).

-->
