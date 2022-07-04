# Facebook Trigger

[Facebook](https://www.facebook.com/) is a social networking site that makes it easy to connect and share with family and friends online.

!!! note "🔑 Credentials"
    You can find authentication information for this node [here](/workflow/integrations/credentials/facebookApp/).


## Object

- Get updates about an Ad Account
- Get updates about the app
- Get updates about Certificate Transparency
- Get updates about activity in groups and events in groups of Workplace
- Get updates about the comments on your media
- Get updates about the links for rich previews by an external provider
- Page updates
- Updates regarding granting or revoking permissions
- User profile updates
- Get updates about Whatsapp business account
- Get updates about Workplace security

## Example Usage

This workflow allows you to receive a Mattermost message when a user updates their profile on Facebook. You can also find the [workflow](https://n8n.io/workflows/785) on Workflow².io. This example usage workflow would use the following nodes.
- [Facebook Trigger]()
- [Mattermost](/workflow/integrations/nodes/workflow-nodes-base.mattermost/)

The final workflow should look like the following image.

![A workflow with the Facebook Trigger node](/_images/integrations/trigger-nodes/facebooktrigger/workflow.png)

### 1. Facebook Trigger node

The Facebook Trigger node will trigger the workflow when a user updates their profile on Facebook.

1. First of all, you'll have to enter credentials for the Facebook Trigger node. You can find out how to do that [here](/workflow/integrations/credentials/facebookApp/).
2. Select 'User' from the ***Object*** dropdown list.
3. Enter your app ID in the ***App ID*** field.
3. Click on ***Execute Node*** to run the node.

In the screenshot below, you will notice that the node returns the updated information of the user from Facebook. This output is passed on to the next node in the workflow.

![Using the Facebook Trigger node to trigger the workflow](/_images/integrations/trigger-nodes/facebooktrigger/facebooktrigger_node.png)

### 2. Mattermost node (post: message)

This node will send a message of the updated information in the channel `Information Updated` in Mattermost. If you have a different channel, use that instead.

1. First of all, you'll have to enter credentials for the Mattermost node. You can find out how to do that [here](/workflow/integrations/credentials/mattermost/).

2. Select a channel from the ***Channel ID*** dropdown list.
3. Click on the gears icon next to the ***Message*** field and click on ***Add Expression***.
4. Enter the following message in the ***Expression*** field: `The user with uid {{$node["Facebook Trigger"].json["uid"]}} changed their {{$node["Facebook Trigger"].json["changes"][0]["field"]}} to {{$node["Facebook Trigger"].json["changes"][0]["value"]["page"]}}.`.
5. Click on ***Execute Node*** to run the node.

In the screenshot below, you will notice that the node sends a message about the updated information to the `Information Updated` channel in Mattermost.

![Using the Mattermost node to send a message of the updated information](/_images/integrations/trigger-nodes/facebooktrigger/mattermost_node.png)

!!! note " Activate workflow for production"
    You'll need to save the workflow and then click on the Activate toggle on the top right of the screen to activate the workflow. Your workflow will then be triggered as specified by the settings in the Facebook Trigger node.
