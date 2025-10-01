---
contentType: tutorial
---

<!-- vale from-microsoft.We = NO -->
<!-- vale from-microsoft.FirstPerson = NO -->
# 6. Notifying the Team

In this step of the workflow, you will learn how to send messages to a Discord channel using the [Discord node](/integrations/builtin/app-nodes/n8n-nodes-base.discord/index.md). After this step, your workflow should look like this:

[[ workflowDemo("file:////courses/level-one/chapter-5/chapter-5.6.json") ]]

Now that you have a calculated summary of the booked orders, you need to notify Nathan's team in their Discord channel. For this workflow, you will send messages to the [n8n server](https://discord.gg/G98WXzsjky) on Discord.

Before you begin the steps below, use the link above to connect to the n8n server on Discord. Be sure you can access the `#course-level-1` channel.

/// note | Communication app nodes
You can replace the Discord node with another communication app. For example, n8n also has nodes for [Slack](/integrations/builtin/app-nodes/n8n-nodes-base.slack.md) and [Mattermost](/integrations/builtin/app-nodes/n8n-nodes-base.mattermost.md).
///

In your workflow, add a Discord node connected to the Code node.

When you search for the Discord node, look for **Message Actions** and select **Send a message** to add the node.

In the Discord node window, configure these parameters:

- **Connection Type**: Select **Webhook**.
- **Credential for Discord Webhook**: Select **- Create New Credential -**.
    - Copy the **Webhook URL** from the email you received when you signed up for this course and paste it into the **Webhook URL** field of the credentials.
    - Select **Save** and then close the credentials dialog.
- **Operation**: Select **Send a Message**.
- **Message**:
    - Select the **Expression** tab on the right side of the Message field.
    - Copy the text below and paste it into the **Expression** window, or construct it manually using the **Expression Editor**.
		```
		This week we've {{$json["totalBooked"]}} booked orders with a total value of {{$json["bookedSum"]}}. My Unique ID: {{ $('HTTP Request').params["headerParameters"]["parameters"][0]["value"] }}
		```

Now select **Execute step** in the Discord node. If all works well, you should see this output in n8n:

<figure><img src="/_images/courses/level-one/chapter-five/l1-c5-5-6-discord-output.png" alt="Discord node output" style="width:100%"><figcaption align = "center"><i>Discord node output</i></figcaption></figure>

And your message should appear in the Discord channel #course-level-1:

<figure><img src="/_images/courses/level-one/chapter-two/discord-output.png" alt="Discord message" style="width:100%"><figcaption align = "center"><i>Discord message</i></figcaption></figure>

## What's next?

**Nathan 🙋**: Incredible, you've saved me hours of tedious work already! Now I can execute this workflow when I need it. I just need to remember to run it every Monday morning at 9 AM.

**You 👩‍🔧**: Don't worry about that, you can actually schedule the workflow to run on a specific day, time, or interval. I'll set this up in the next step.
