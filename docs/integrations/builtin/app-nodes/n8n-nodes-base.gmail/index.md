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
	* **Create** a draft
	* **Delete** a draft
	* **Get** a draft
	* **Get Many** drafts
* **Label**
	* **Create** a label
	* **Delete** a label
	* **Get** a label
	* **Get Many** labels
* **Message**
	* **Add Label** to a message
	* **Delete** a message
	* **Get** a message
	* **Get Many** messages
	* **Mark as Read**
	* **Mark as Unread**
	* **Remove Label** from a message
	* **Reply** to a message
	* **Send** a message
* **Thread**
	* **Add Label** to a thread
	* **Delete** a thread
	* **Get** a thread
	* **Get Many** threads
	* **Remove Label** from thread
	* **Reply** to a message
	* **Trash** a thread
	* **Untrash** a thread

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(title, 'gmail') ]]

## Related resources

Refer to Google's [Gmail API documentation](https://developers.google.com/gmail/api) for detailed information about the API that this node integrates with.

n8n provides a trigger node for Gmail. You can find the trigger node docs [here](/integrations/builtin/trigger-nodes/n8n-nodes-base.gmailtrigger/).

--8<-- "_snippets/integrations/builtin/app-nodes/operation-not-supported.md"