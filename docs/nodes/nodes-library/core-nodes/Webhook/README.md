---
permalink: /nodes/n8n-nodes-base.webhook
description: Learn how to use the Webhook node in n8n
---

# Webhook

The Webhook node is one of the most powerful nodes in n8n. It allows you to create [webhooks](https://en.wikipedia.org/wiki/Webhook) which can be used to receive data from apps and services when an event occurs.

While building or testing a workflow, we recommend that you use a test webhook URL. Using a test webhook ensures that you can view the incoming data in the Editor UI, which is useful for debugging. Make sure that you click on the *Execute Node* button to register the webhook before sending the data to the test webhook. The test webhook stays active for 120 seconds.

::: tip 💡 Keep in mind
1. When using the Webhook node on the localhost, ensure that n8n is running with the [tunnel](../../../../getting-started/quickstart.md#start-with-tunnel) mode.
2. When working with a Production webhook, please ensure that you have saved and activated the workflow. Don’t forget that the data flowing through the webhook won’t be visible in the Editor UI with the Production webhook.
:::


## Node Reference

First of all, in the parameters section, we have the Webhook URLs. Clicking on that will reveal the URLs for the webhook. Here you have two options, let’s understand the difference between them.

1. **Webhook URLs**
    - **Production**: A Production webhook is only registered when a workflow has been activated (via the switch on the top right of the page). You will never see its data in the Editor UI. To save the executions, you can either set that as a global default or you can specify that on a per-workflow basis in the workflow settings. You will then see the data from the workflow under ‘Past Executions’.

    - **Test**: A Test webhook is only registered in the time between executing a workflow via the UI and until the first call gets made (when it displays “waiting for Webhook call”). After the Test webhook gets called for the first time, it displays the data in the Editor UI, and then gets deactivated.

2. **Authentication:** Here we have the option to add authentication. You can set the authentication to None, Basic Auth (username and password) or Header Auth (name and value).

3. **HTTP Method:** You can define whether the request will use the GET or the POST HTTP method.

4. **Path:** You can enter a custom path for your webhook. This is the path that the webhook will listen to. Please make sure that this is a unique path per method (GET, POST) across your workflows. You don't need to change this if you are unsure about it.

5. **Response Code:** Here you can specify the HTTP response code to return. You’ll probably want to keep it set at 200.

6. **Response Mode:** This defines when and how to respond to the webhook. Here we have two options:
    
    - **On Received:** This option sends the defined response code back as soon as it receives data from the webhook.

    - **Last Node:** This option returns the data of the last node executed. If the Webhook node is the only node (or the first node) in the workflow, this option would just return its own data as it itself would be the node that was last executed.

7. **Response Data:** This option becomes visible if you selected the Last Node for the Response Mode. Here you have three configuration options:

    - **All Entries:** This returns all the entries of the last executed node and always returns an array.

    - **First Entry JSON:** This returns the JSON data of the first entry of the last executed node. This option always returns a JSON object.

    - **First Entry Binary:** This returns the Binary data of the first entry of the last executed node. This option always returns a binary file.


## Further Reading

- [Creating Custom Incident Response Workflows with n8n 🚨](https://medium.com/n8n-io/creating-custom-incident-response-workflows-with-n8n-9baef0bbedb9)
- [Cross-posting content automatically with n8n ✍️](https://medium.com/n8n-io/automating-cross-posting-blog-posts-using-n8n-%EF%B8%8F-af2a89601810)
- [Effortless video collaboration with Whereby, Mattermost, and n8n 📹](https://medium.com/n8n-io/effortless-video-collaboration-with-whereby-mattermost-and-n8n-8fc397feb9cb)
- [Webhooks Fun with n8n and Mattermost 🍸](https://medium.com/n8n-io/webhooks-fun-with-n8n-and-mattermost-4ebf7e2b4d2a)
