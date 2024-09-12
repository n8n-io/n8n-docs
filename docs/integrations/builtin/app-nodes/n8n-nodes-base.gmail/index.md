---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Gmail node documentation
description: Learn how to use the Gmail node in n8n. Follow technical documentation to integrate Gmail node into your workflows.
contentType: integration
priority: high
---

# Gmail node

Use the Gmail node to automate work in Gmail, and integrate Gmail with other applications. n8n has built-in support for a wide range of Gmail features, including creating, updating, deleting, and getting drafts, messages, labels, thread.  

On this page, you'll find a list of operations the Gmail node supports and links to more resources.

/// note | Credentials
Refer to [Google credentials](/integrations/builtin/credentials/google/) for guidance on setting up authentication. 
///

## Operations

* **Draft**
	* [**Create**](/integrations/builtin/app-nodes/n8n-nodes-base.gmail/draft-operations/#create-a-draft) a draft
	* [**Delete**](/integrations/builtin/app-nodes/n8n-nodes-base.gmail/draft-operations/#delete-a-draft) a draft
	* [**Get**](/integrations/builtin/app-nodes/n8n-nodes-base.gmail/draft-operations/#get-a-draft) a draft
	* [**Get Many**](/integrations/builtin/app-nodes/n8n-nodes-base.gmail/draft-operations/#get-many-drafts) drafts
* **Label**
	* [**Create**](/integrations/builtin/app-nodes/n8n-nodes-base.gmail/label-operations/#create-a-label) a label
	* [**Delete**](/integrations/builtin/app-nodes/n8n-nodes-base.gmail/label-operations/#delete-a-label) a label
	* [**Get**](/integrations/builtin/app-nodes/n8n-nodes-base.gmail/label-operations/#get-a-label) a label
	* [**Get Many**](/integrations/builtin/app-nodes/n8n-nodes-base.gmail/label-operations/#get-many-labels) labels
* **Message**
	* [**Add Label**](/integrations/builtin/app-nodes/n8n-nodes-base.gmail/message-operations/#add-label-to-a-message) to a message
	* [**Delete**](/integrations/builtin/app-nodes/n8n-nodes-base.gmail/message-operations/#delete-a-message) a message
	* [**Get**](/integrations/builtin/app-nodes/n8n-nodes-base.gmail/message-operations/#get-a-message) a message
	* [**Get Many**](/integrations/builtin/app-nodes/n8n-nodes-base.gmail/message-operations/#get-many-messages) messages
	* [**Mark as Read**](/integrations/builtin/app-nodes/n8n-nodes-base.gmail/message-operations/#mark-as-read)
	* [**Mark as Unread**](/integrations/builtin/app-nodes/n8n-nodes-base.gmail/message-operations/#mark-as-unread)
	* [**Remove Label**](/integrations/builtin/app-nodes/n8n-nodes-base.gmail/message-operations/#remove-label-from-a-message) from a message
	* [**Reply**](/integrations/builtin/app-nodes/n8n-nodes-base.gmail/message-operations/#reply-to-a-message) to a message
	* [**Send**](/integrations/builtin/app-nodes/n8n-nodes-base.gmail/message-operations/#send-a-message) a message
* **Thread**
	* [**Add Label**](/integrations/builtin/app-nodes/n8n-nodes-base.gmail/thread-operations/#add-label-to-a-thread) to a thread
	* [**Delete**](/integrations/builtin/app-nodes/n8n-nodes-base.gmail/thread-operations/#delete-a-thread) a thread
	* [**Get**](/integrations/builtin/app-nodes/n8n-nodes-base.gmail/thread-operations/#get-a-thread) a thread
	* [**Get Many**](/integrations/builtin/app-nodes/n8n-nodes-base.gmail/thread-operations/#get-many-threads) threads
	* [**Remove Label**](/integrations/builtin/app-nodes/n8n-nodes-base.gmail/thread-operations/#remove-label-from-a-thread) from thread
	* [**Reply**](/integrations/builtin/app-nodes/n8n-nodes-base.gmail/thread-operations/#reply-to-a-message) to a message
	* [**Trash**](/integrations/builtin/app-nodes/n8n-nodes-base.gmail/thread-operations/#trash-a-thread) a thread
	* [**Untrash**](/integrations/builtin/app-nodes/n8n-nodes-base.gmail/thread-operations/#untrash-a-thread) a thread

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(title, 'gmail') ]]

## Related resources

Refer to Google's [Gmail API documentation](https://developers.google.com/gmail/api) for detailed information about the API that this node integrates with.

n8n provides a trigger node for Gmail. You can find the trigger node docs [here](/integrations/builtin/trigger-nodes/n8n-nodes-base.gmailtrigger/).

--8<-- "_snippets/integrations/builtin/app-nodes/operation-not-supported.md"

## Remove the n8n attribution from sent messages

If you're using the node to [send a message](/integrations/builtin/app-nodes/n8n-nodes-base.gmail/message-operations/#send-a-message) or [reply to a message](/integrations/builtin/app-nodes/n8n-nodes-base.gmail/message-operations/#reply-to-a-message), the node appends this statement to the end of the email:

> This email was sent automatically with n8n

To remove this attribution:

1. In the node's **Options** section, select **Add option**.
2. Select **Append n8n attribution**.
3. Turn the toggle off.

Refer to [Send options](/integrations/builtin/app-nodes/n8n-nodes-base.gmail/message-operations/#send-options) and [Reply options](/integrations/builtin/app-nodes/n8n-nodes-base.gmail/message-operations/#reply-options) for more information.
