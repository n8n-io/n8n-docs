# 6. Notifying the Team

In this step of the workflow you will learn how to send messages to a Discord channel using the [Discord node](/integrations/builtin/app-nodes/n8n-nodes-base.discord/){:target="_blank" .external}.

Now that you have a calculated summary of the booked orders, you need to notify Nathan's team in their Discord channel. For this workflow, you will send messages to the [n8n server](https://discord.gg/G98WXzsjky){:target="_blank" .external} on Discord.

!!! note "Communication nodes"
    You can replace the Discord node with another communication app. For example, n8n also has nodes for [Slack](/integrations/builtin/app-nodes/n8n-nodes-base.slack/){:target="_blank" .external} and [Mattermost](/integrations/builtin/app-nodes/n8n-nodes-base.mattermost/){:target="_blank" .external}.


In your workflow, add a Discord node connected to the Function node. In the Discord node window, configure the parameters:

- *Webhook URL:* Enter the URL that you received in the email from n8n when you signed up for this course.
- *Text (Expression):* This week we have `{{$json["totalBooked"]}}` booked orders with a total value of `{{$json["bookedSum"]}}`. My Unique ID: `{{$node["HTTP Request"].parameter["headerParametersUi"]["parameter"][0]["value"]}}`


<figure><img src="/_images/courses/level-one/chapter-two/Discord-node.png" alt="Discord node expression" style="width:100%"><figcaption align = "center"><i>Discord node expression</i></figcaption></figure>

Now execute the Discord node. If all works well, your message should appear in the Discord channel #course-level-1.

<figure><img src="/_images/courses/level-one/chapter-two/Discord-output.png" alt="Discord message" style="width:100%"><figcaption align = "center"><i>Discord message</i></figcaption></figure>

## What's next?

**Nathan 🙋**: Incredible, you've saved me so many hours of tedious work already! Now I can simply execute this workflow when I need it. I just need to remember to run it every Monday morning at 9 am...

**You 👩‍🔧**: Don't worry about that, you can actually schedule the workflow to run on a specific day, time, or interval. I'll set this up in the next step.
