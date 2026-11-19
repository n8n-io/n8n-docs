---
description: Move workflows and credentials between projects or users in n8n, which changes their ownership.
layout:
  description:
    visible: false
---

# Move workflows and credentials

Move a workflow or credential to another project or user to change its owner.

Workflow and credential owners can move them to other users or projects they have access to.

{% hint style="warning" %}
**Moving revokes sharing**

Moving workflows or credentials removes all existing sharing, which can affect other workflows that share these resources.
{% endhint %}

## Move a workflow or credential <a href="#move-workflows-and-credentials-between-projects-or-users" id="move-workflows-and-credentials-between-projects-or-users"></a>

1.  Select **Workflow menu** <img src="../../.gitbook/assets/three-dot-options-menu (1).png" alt="Workflow menu icon" data-size="line"> or **Credential menu** <img src="../../.gitbook/assets/three-dot-options-menu (1).png" alt="Workflow menu icon" data-size="line"> > **Move**.<br>

    <div data-gb-custom-block data-tag="hint" data-style="info" class="hint hint-info"><p><strong>Moving workflows with credentials</strong></p><p>When moving a workflow with credentials you have permission to share, you can choose to share the credentials as well. This ensures that the workflow continues to have access to the credentials it needs to execute. n8n notes any credentials that can't be moved (credentials you don't have permission to share).</p></div>
2. Select the project or user you want to move to.
3. Select **Next**.
4. Confirm you understand the impact of the move: workflows may stop working if the credentials they need aren't available in the target project, and n8n removes any current individual sharing.
5. Select **Confirm move to new project**.

## Related resources

* [Organize work in projects](./)
* [Create and manage projects](create-and-manage-projects.md)
* [Use personal credentials in projects](../../manage-credentials/use-personal-credentials-in-projects.md)
