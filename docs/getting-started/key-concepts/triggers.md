# Triggering Workflows

All n8n workflows come with a Start node that lets you start the workflow by clicking to execute it.
But to get the most out of automation, you want your workflows to run automatically.

Triggers let you define different conditions that start a workflow run.
They're a special type of [node](../key-components/node.md).
Unlike other nodes, they only have a single [connection](../key-components/connection.md): output but no input.
So instead of running when another node links to them, they only link to execute other nodes.

This lets you set up workflow to run when you want.
You can choose to run things at given intervals, on pushes to specific endpoints, or on events from various apps.

Triggers only execute connected nodes.
Other nodes in the workflow may be unaffected.

## Trigger types

There are two basic kinds of triggers:

* Core triggers
* App triggers

Core triggers work based on general settings,
such as specific intervals, times of day, or requests from events.
You can regularly check for updates, get a weather forecast every morning, and respond to events.
This can even include events inside n8n, such as updates to workflows or an error in a workflow.
They allow you to set up generic triggers that can work in just about any circumstances.

App triggers respond to events from a given app.
This can be a change in a task management app like Asana, an email, a form submission, or another event.
They have configuration options specific to the app and what it offers.

All triggers can be found under the **Trigger** tab when adding nodes.
Most of their names also end in "Trigger" and all are marked after their name as being a Trigger Node (⚡).

## Polling vs. listening

There are two ways an event can trigger a workflow: polling and listening.

Polling means actively sending requests for information.
You would typically set up a [Chron](../../nodes/nodes-library/core-nodes/Cron/README.md)
or [Interval](../../nodes/nodes-library/core-nodes/Interval/README.md)
node to run at specific times.
These nodes start a workflow execution on their own and send a request to a given endpoint.

Listening means a node is set up to react to incoming requests.
An example is a [Webhook node](../../nodes/nodes-library/core-nodes/Cron/README.md),
which you set up to listen at a specific URL.
Other events can then send requests to that URL to trigger specific actions.
The advantage is the webhook is always listening
and only triggers a workflow execution when an event occurs.

In the background, some app triggers work based on polling and some on listening.
But once you have an app trigger set up, you don't need to know which is which.
You don't have to execute workflows at regular intervals to get information from your app.

## Examples

### Start trigger

As noted above, every workflow has at least one trigger in it in the form of a Start node.
It's very useful for testing out workflows and making sure things run correctly.

You can use it to trigger a linear workflow or even multiple nodes at once.
In the following example, a single trigger activates multiple nodes to transform data:

![Start triggering multiple runs](../images/multiple_inputs.png)

### Webhook trigger

[Webhook nodes](../../nodes/nodes-library/core-nodes/Cron/README.md) are an example of listening triggers.
They wait for input and then run without any other action required.

The following example gets weather data from any city by defining a URL through a Webhook node.
The node listens for any requests to that URL and then triggers other nodes to get the right data to respond with.
For more details, see the [entire workflow](https://n8n.io/workflows/807).

![Get weather data based on a webhook](../../nodes/nodes-library/core-nodes/Webhook/workflow.png)

### App trigger

App triggers vary based on the specific app involved.
The type of app determines what options are available and when it triggers.

The following example has been set up with Telegram, the messaging service.
Similarly to the [webhook example](#webhook-trigger), it responds to input with the weather for a specific city.
In this case, it's not a request to a URL that triggers the workflow but a message through Telegram.
The node waits to get a message and then triggers the data being sent in another message.

![Telegram trigger](../images/telegram_trigger.png)
