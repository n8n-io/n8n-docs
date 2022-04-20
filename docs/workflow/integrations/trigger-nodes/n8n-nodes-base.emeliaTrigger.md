# Emelia Trigger

[Emelia](https://emelia.io) is a cold-mailing tool.

!!! note "🔑 Credentials"
    You can find authentication information for this node [here](/workflow/integrations/credentials/emelia/).


## Events

- Email Bounced
- Email Opened
- Email Replied
- Email Sent
- Link Clicked
- Unsubscribed Contact

## Example Usage

This workflow allows you to send a message on Mattermost when a lead replies to your email. You can also find the [workflow](https://n8n.io/workflows/1039) on n8n.io. This example usage workflow would use the following node.
- [Emelia Trigger]()
- [Mattermost](/workflow/integrations/nodes/n8n-nodes-base.mattermost/)

The final workflow should look like the following image.

![A workflow with the Emelia Trigger node](/_images/integrations/trigger-nodes/emeliatrigger/workflow.png)

### 1. Emelia Trigger

The Emelia Trigger node will trigger the workflow when a lead sends a reply to the campaign `n8n`. If you have a different campaign, use that instead.

1. First of all, you'll have to enter credentials for the Emelia Trigger node. You can find out how to do that [here](/workflow/integrations/credentials/emelia/).
2. Select a campaign from the ***Campaign*** dropdown list.
3. Select 'Email Replied' from the ***Events*** dropdown list.
4. Click on ***Execute Node*** to run the node.

In the screenshot below, you will notice that the node triggers the workflow when a lead sends a reply. This output is passed on to the next node in the workflow.

![Using the Emelia Trigger node to trigger the workflow](/_images/integrations/trigger-nodes/emeliatrigger/emeliatrigger_node.png)

## 2. Mattermost node (post: message)

This node will send a message to the `Leads` channel in Mattermost. If you have a different channel, use that instead.

1. First of all, you'll have to enter credentials for the Mattermost node. You can find out how to enter credentials for this node [here](/workflow/integrations/credentials/mattermost/).
2. Select a channel from the ***Channel ID*** dropdown list.
3. Click on the gears icon next to the ***Message*** field click on ***Add Expression***.

4. Enter the following message in the ***Expression*** field. `{{$json["contact"]["firstName"]}} from {{$json["contact"]["company"]}} has replied back to your campaign.`
5. Click on ***Execute Node*** to run the workflow.

In the screenshot below, you will notice that the node sends a message with a reply to the `Leads` channel in Mattermost.

![Using the Mattermost node to send a message](/_images/integrations/trigger-nodes/emeliatrigger/mattermost_node.png)

!!! note " Activate workflow for production"
    You'll need to save the workflow and then click on the Activate toggle on the top right of the screen to activate the workflow. Your workflow will then be triggered as specified by the settings in the Emelia Trigger node.

