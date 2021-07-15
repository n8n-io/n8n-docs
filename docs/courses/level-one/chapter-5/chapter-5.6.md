# 6. Notifying the Team

In this step of the workflow you will learn how to send messages to a Discord channel using the *Discord* node.

Now that you have a calculated summary of the booked orders you need to notify Nathan’s team in their Discord channel. n8n has a **Discord node** that allows you to send messages.

::: tip 💡 Communication nodes
You can replace the *Discord* node with another communication app. n8n also has nodes for [*Slack*](https://docs.n8n.io/nodes/n8n-nodes-base.slack/) and [*Mattermost*](https://docs.n8n.io/nodes/n8n-nodes-base.mattermost/).
:::

In your workflow, add a *Discord* node connected to the *Function* node. In the *Discord* node window, configure the parameters:
::: v-pre
- *Webhook URL:* [https://discord.com/api/webhooks/862290560479526932/qmSLXOr0RWmP9i7OSPJ-p08mFZbe4CBkxxg8IjUS0Mixxi-VjeLXONY8ZorIqjgILT0F](https://discord.com/api/webhooks/862290560479526932/qmSLXOr0RWmP9i7OSPJ-p08mFZbe4CBkxxg8IjUS0Mixxi-VjeLXONY8ZorIqjgILT0F)
- *Text (Expression):* `This week we have {{$json["totalBooked"]}} booked orders with a total value of {{$json["bookedSum"]}}. My Unique ID: {{$node["HTTP Request"].parameter["headerParametersUi"]["parameter"][0]["value"]}}`
:::

<figure><img src="../images/chapter-two/Discord-node.png" alt="Discord node expression" style="width:100%"><figcaption align = "center"><i>Discord node expression</i></figcaption></figure>

Now execute the *Discord* node and if all works well, you should get a message in Discord:

<figure><img src="../images/chapter-two/Discord-output.png" alt="Discord message" style="width:100%"><figcaption align = "center"><i>Discord message</i></figcaption></figure>

## What's next?

**Nathan 🙋**: Incredible, you've saved me so many hours of tedious work already! Now I can simply execute this workflow when I need it. I just need to remember to run it every Monday morning at 9 am...

**You 👩‍🔧**: Don't worry about that, you can actually schedule the workflow to run on a specific day, time, or interval. I'll set this up in the next step.
