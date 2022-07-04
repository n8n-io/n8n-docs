# Google Cloud Natural Language

[Google Cloud Natural Language](https://cloud.google.com/natural-language/) uses machine learning to reveal the structure and meaning of text. You can extract information about people, places, and events, and better understand social media sentiment and customer conversations.

!!! note "🔑 Credentials"
    You can find authentication information for this node [here](/workflow/integrations/credentials/google/).


## Basic Operations

* Document
    * Analyze Sentiment

## Example Usage

This workflow allows you to analyze the sentiment of feedback received via a Typeform submission and send a message on Mattermost if that feedback is negative. You can also find the [workflow](https://n8n.io/workflows/786) on Workflow².io. This example usage workflow uses the following nodes.
- [Typeform Trigger](/workflow/integrations/trigger-nodes/workflow-nodes-base.typeformtrigger/)
- [Google Cloud Natural Language]()
- [IF](/workflow/integrations/core-nodes/workflow-nodes-base.if/)
- [Mattermost](/workflow/integrations/nodes/workflow-nodes-base.mattermost/)
- [No Operation, do nothing](/workflow/integrations/core-nodes/workflow-nodes-base.noOp/)

The final workflow should look like the following image.

![A workflow with the Google Cloud Natural Language node](/_images/integrations/nodes/googlecloudnaturallanguage/workflow.png)

### 1. Typeform Trigger node

This node will trigger the workflow when a feedback form is submitted. Make sure to create a feedback form for your event.

1. Select 'Access Token' from the ***Authentication*** dropdown list.
2. Enter the credentials for the Typeform Trigger node. You can find out how to do that [here](/workflow/integrations/credentials/typeform/).
3. Select the event feedback form from the ***Form*** dropdown list.
4. Click on ***Execute Node*** to run the node.

In the screenshot below, you will notice that the node triggers the workflow when feedback is submitted. We will pass this feedback to the next nodes in the workflow.
![Using the Typeform Trigger node to trigger the workflow when a feedback form is submitted](/_images/integrations/nodes/googlecloudnaturallanguage/typeformtrigger_node.png)

### 2. Google Cloud Natural Language node (analyzeSentiment: document)

This node will analyze the sentiment of the feedback that we got from the previous node. We will pass the analysis score to the next node in the workflow.

1. First of all, you'll have to enter credentials for the Google Cloud Natural Language node. You can find out how to enter credentials for this node [here](/workflow/integrations/credentials/google/).
2. Click on the gears icon next to the ***Content*** field and click on ***Add Expression***.

3. Select the following in the ***Variable Selector*** section: Nodes > Typeform Trigger > Output Data > JSON > What did you think about the event? You can also add the following expression: `{{$node["Typeform Trigger"].json["What did you think about the event?"]}}`. If you want to analyze the sentiment for a different question, select that question instead.
4. Click on ***Execute Node*** to run the node.

In the screenshot below, you will notice that the node analyzes the sentiment of the feedback and gives a score based on that.

![Using the Google Cloud Natural Language node to analyze the sentiment](/_images/integrations/nodes/googlecloudnaturallanguage/googlecloudnaturallanguage_node.png)


### 3. IF node

This node will check if the score we got from the previous node is smaller than `0`. If the score is smaller than `0`, it will return true otherwise false.

1. Click on ***Add Condition*** and select 'Number'.
2. Click on the gears icon next to the ***Value 1*** field and click on ***Add Expression***.
3. Select the following in the ***Variable Selector*** section: Nodes > Google Cloud Natural Language > Output Data > JSON > documentSentiment > score. You can also add the following expression: `{{$node["Google Cloud Natural Language"].json["documentSentiment"]["score"]}}`.
4. Select 'Smaller' from the ***Operation*** dropdown list.
5. Click on ***Execute Node*** to run the node.

In the screenshot below, you will notice that the node checks if the score that we received from the previous node is smaller than `0`.

![Using the IF node to check if the score is smaller than `0` or not](/_images/integrations/nodes/googlecloudnaturallanguage/if_node.png)

### 4. Mattermost node (post: message)

This node will send the feedback and the analysis score to the `Feedback` channel in Mattermost. If you have a different channel, use that instead.

1. Create a Mattermost node connected to the 'true' output of the IF node.
2. You'll have to enter credentials for the Mattermost node. You can find out how to enter credentials for this node [here](/workflow/integrations/credentials/mattermost/).
3. Select a channel from the ***Channel ID*** dropdown list.
4. Click on the gears icon next to the ***Message*** field click on ***Add Expression***.

5. Enter the following message in the ***Expression*** field: `You got a new feedback with a score of {{$node["Google Cloud Natural Language"].json["documentSentiment"]["score"]}}. Here is what it says:{{$node["Typeform Trigger"].json["What did you think about the event?"]}}`.
6. Click on ***Execute Node*** to run the workflow.

In the screenshot below, you will notice that the node sends the feedback and the analysis score to the `Feedback` channel in Mattermost.

![Using the Mattermost node to send the feedback and the analysis score](/_images/integrations/nodes/googlecloudnaturallanguage/mattermost_node.png)

### 5. NoOp node

Adding this node here is optional, as the absence of this node won't make a difference to the functioning of the workflow.

1. Create a ***NoOp*** node connected to the 'false' output of the IF node.
2. Click on ***Execute Node*** to run the node.

![Using the NoOp node](/_images/integrations/nodes/googlecloudnaturallanguage/noop_node.png)

!!! note " Activate workflow for production"
    This example workflow uses the Typeform Trigger node. You'll need to save the workflow and then click on the Activate toggle on the top right of the screen to activate the workflow. Your workflow will then be triggered when a new form is submitted.

