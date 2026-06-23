---
title: Gmail node documentation
description: >-
  Learn how to use the Gmail node in n8n. Follow technical documentation to
  integrate Gmail node into your workflows.
contentType:
  - integration
  - reference
priority: high
nodeTitle: n8n-nodes-base.gmail
originalFilePath: integrations/builtin/app-nodes/n8n-nodes-base.gmail/index.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.gmail'
url: 'https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.gmail'
layout:
  description:
    visible: false
---

# Gmail node <a href="#gmail-node" id="gmail-node"></a>

Use the Gmail node to automate work in Gmail, and integrate Gmail with other applications. n8n has built-in support for a wide range of Gmail features, including creating, updating, deleting, and getting drafts, messages, labels, thread.  

On this page, you'll find a list of operations the Gmail node supports and links to more resources.

{% hint style="info" %}
**Credentials**

Refer to [Google credentials](../../credentials/google/README.md) for guidance on setting up authentication.
{% endhint %}

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/hLGdVKMP8bGrbsRtVcGc/" %}

## Operations <a href="#operations" id="operations"></a>

* **Draft**
	* [**Create**](draft-operations.md#create-a-draft) a draft
	* [**Delete**](draft-operations.md#delete-a-draft) a draft
	* [**Get**](draft-operations.md#get-a-draft) a draft
	* [**Get Many**](draft-operations.md#get-many-drafts) drafts
* **Label**
	* [**Create**](label-operations.md#create-a-label) a label
	* [**Delete**](label-operations.md#delete-a-label) a label
	* [**Get**](label-operations.md#get-a-label) a label
	* [**Get Many**](label-operations.md#get-many-labels) labels
* **Message**
	* [**Add Label**](message-operations.md#add-label-to-a-message) to a message
	* [**Delete**](message-operations.md#delete-a-message) a message
	* [**Get**](message-operations.md#get-a-message) a message
	* [**Get Many**](message-operations.md#get-many-messages) messages
	* [**Mark as Read**](message-operations.md#mark-as-read)
	* [**Mark as Unread**](message-operations.md#mark-as-unread)
	* [**Remove Label**](message-operations.md#remove-label-from-a-message) from a message
	* [**Reply**](message-operations.md#reply-to-a-message) to a message
	* [**Send**](message-operations.md#send-a-message) a message
* **Thread**
	* [**Add Label**](thread-operations.md#add-label-to-a-thread) to a thread
	* [**Delete**](thread-operations.md#delete-a-thread) a thread
	* [**Get**](thread-operations.md#get-a-thread) a thread
	* [**Get Many**](thread-operations.md#get-many-threads) threads
	* [**Remove Label**](thread-operations.md#remove-label-from-a-thread) from thread
	* [**Reply**](thread-operations.md#reply-to-a-message) to a message
	* [**Trash**](thread-operations.md#trash-a-thread) a thread
	* [**Untrash**](thread-operations.md#untrash-a-thread) a thread

## Templates and examples <a href="#templates-and-examples" id="templates-and-examples"></a>


[Browse n8n-nodes-base.gmail integration templates](https://n8n.io/integrations/gmail) or [search all templates](https://n8n.io/workflows/)

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to Google's [Gmail API documentation](https://developers.google.com/gmail/api) for detailed information about the API that this node integrates with.

n8n provides a trigger node for Gmail. You can find the trigger node docs [here](../../trigger-nodes/n8n-nodes-base.gmailtrigger/README.md).

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/lMIxsgtfHVazfAS7oe1v/" %}

## Common issues <a href="#common-issues" id="common-issues"></a>

For common errors or issues and suggested resolution steps, refer to [Common Issues](common-issues.md).
