---
description: Triggers are nodes that start a workflow.
contentType: howto
---

# Triggers

Triggers are nodes that start a workflow. A trigger knows to start a workflow when a defined event happens. Events can be anything from user inputs to calls from other applications.

Different triggers can wait for different kinds of events. When you choose a trigger, n8n adds a trigger node to your workflow. When searching through the nodes, all trigger nodes are marked with a lightning bolt icon.

Triggers have a lot in common with other nodes. However, there are some key differences. Unlike other nodes, triggers have a rounded left side when in the workflow. This means that triggers can't accept input from any other nodes. This makes sense, since they can only attach to the start of a workflow. 

For more information, check out the [Nodes](/workflows/components/nodes/) page.

## Add a trigger to your workflow

When you create a new workflow, n8n will automatically add a trigger node. This default node is a manual trigger. Just like in the node panel, you can easily see if a node in your workflow is a trigger. Just check to see if there is a lightning bolt icon next to the node. 

You can add as many triggers as you want. When you activate your workflow, all added triggers will listen for their defined events to know when to start running.

## Test a trigger

Once you've added a trigger node, you can test it. Like with other nodes, select the **Test step** button near the trigger node to run it. 

Next, your should see whether or not the trigger ran successfully. Double-click the trigger node to open its panel. Under **OUTPUT** is a table listing the result of its last successful execution. There, if the trigger ran successfully, should be a timestamped record of it running.   

## Execute your workflow after adding triggers
To execute your workflow means to run it. You can only execute a workflow that has a trigger. This can be done either in manual or production mode.

### Manual mode
In manual mode you need to trigger your workflow yourself. In this mode, none of the triggers are listening for events. That means they won't run on their own. When a trigger is in a workflow, the **Test workflow** button at the bottom of the editor is available to select. This button will start any triggers in the workflow, which will run the nodes they are connected to. This makes testing the workflow simple, easy, and immediate. Some triggers, like the manual trigger, will work instantly this way. Most will wait on an event before activating the next node in the flow.

You may want to see a history of all your workflow executions. This helps if you are testing different triggers or have been testing for a long time. Select the **Executions** tab at the top of the editor. Now you can see a timestamped history of every workflow execution.  

For more information, check out the [Executions](/workflows/executions/) page.

### Production mode

In production mode, triggers actively listen for events to know when to run. Activate your workflow to switch to production mode. This is only possible when there is at least one trigger in your workflow. Once you have a trigger, set the toggle in top navigation bar to **Active**. Triggers will then start listening for events. This is great when you want to see how actual events affect and interact with your workflow.

<!-- This is still awkward. -->
Let's say you have a schedule trigger in the workflow. It is set to run every minute. The trigger will only start automatically running at this interval when the workflow is active.

To return to manual mode, set the activated toggle to **Inactive**.

## Types of triggers

There are many types of triggers. All triggers wait on different kinds of events. Events themselves can come from any number of different sources. Below are some of the most common and powerful triggers offered in n8n.

### Manual trigger

This is the default node when starting a new workflow. The manual trigger lets you easily start a workflow with the **Test workflow** button. It runs one time immediately after starting the workflow. This is a great option since you are fully in control of the trigger and when it runs. 

Unlike the other triggers, a workflow can only have one manual trigger.

For more information, check out the [Manual trigger](/integrations/builtin/core-nodes/n8n-nodes-base.manualworkflowtrigger/) page.

### Schedule trigger

The schedule trigger lets you start workflows at fixed intervals of time. This only works automatically if the workflow is active.

For more information, check out the [Schedule trigger](/integrations/builtin/core-nodes/n8n-nodes-base.manualworkflowtrigger/) page.

### Webhook trigger

The webhook trigger node receives data from applications and services when an event occurs. It is perfect when you want to use received data and run a workflow based on that data.

For more information, check out the [Webhook](/integrations/builtin/core-nodes/n8n-nodes-base.webhook/) page.

### Additional triggers
There are many more trigger nodes available for your workflows. By exploring the node panel while using n8n and checking out our documentation, you can find the right trigger for your situation.

For more great triggers, check out the [Triggers library](integrations/builtin/trigger-nodes/).

### Custom triggers

n8n provides a huge library of nodes, including triggers. But just like it is possible to build your own custom nodes, you can build your own custom triggers as well. You are free to jump in and give it a try using the resources below. In the future we will also offer targeted resources on how to develop your own trigger nodes.

* See [Community nodes](/integrations/community-nodes/installation/) for help on finding and installing community-created nodes.
* See [Creating nodes](/integrations/creating-nodes/overview/) to start building your own nodes.
