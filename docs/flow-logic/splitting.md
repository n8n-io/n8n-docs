---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
description: Split workflows into multiple paths using If and Switch
contentType: howto
---

# Splitting workflows with conditional nodes

Splitting uses the [IF](/integrations/builtin/core-nodes/n8n-nodes-base.if/) or [Switch](/integrations/builtin/core-nodes/n8n-nodes-base.switch/) nodes. It turns a single-branch workflow into a multi-branch workflow. This is a key piece of representing complex logic in n8n.

Compare these workflows:

!["Diagram representing two workflows. One has three steps and follows a linear process, with a user submitting a bug, and the workflow emailing a support team. The second workflow starts the same way, but then splits depending on whether the user marked the issue as urgent. It then splits again depending on the user's support plan"](/_images/flow-logic/splitting/single-multi-branch-workflow.png)

This is the power of splitting and conditional nodes in n8n.

Refer to the [IF](/integrations/builtin/core-nodes/n8n-nodes-base.if/) or [Switch](/integrations/builtin/core-nodes/n8n-nodes-base.switch/) documentation for usage details.
