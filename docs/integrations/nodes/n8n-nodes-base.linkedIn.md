# LinkedIn

[LinkedIn](https://www.linkedin.com/) is an employment-oriented online service. It is mainly used for professional networking, including employers posting jobs and job seekers posting their CVs.

!!! note "Credentials"
    You can find authentication information for this node [here](/integrations/credentials/linkedIn/).


## Basic Operations

* Post
    * Create a new post

!!! note "Keep in mind"
    If posting as an Organization enter only the organization number in the URN field. For example, `03262013` not `urn:li:company:03262013`.


## Example Usage

This workflow allows you to get an image from a URL and post it on LinkedIn. You can also find the [workflow](https://n8n.io/workflows/681) on n8n.io. This example usage workflow would use the following nodes.
- [Start](/integrations/core-nodes/n8n-nodes-base.start/)
- [HTTP Request](/integrations/core-nodes/n8n-nodes-base.httpRequest/)
- [LinkedIn]()

The final workflow should look like the following image.

![A workflow with the LinkedIn node](/_images/integrations/nodes/linkedin/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. HTTP Request node

1. Enter the URL of the image you want to download in the ***URL*** field.
2. Select ***File*** from the ***Response Format*** dropdown list.
3. Click on ***Execute Node*** to run the node.

![Downloading an image with the HTTP Request node](/_images/integrations/nodes/linkedin/httprequest_node.png)

### 3. LinkedIn node

1. First of all, you'll have to enter credentials for the LinkedIn node. You can find out how to do that [here](/integrations/credentials/linkedIn/).
2. Select 'Person' from the ***Post As*** dropdown list.
3. Select the person you want to post as from the ***Person*** dropdown list.
4. Enter a message in the ***Text*** field.
5. Select 'Image' from the ***Media Category*** dropdown list.
6. Click on ***Execute Node*** to run the node.

![Posting with the LinkedIn node](/_images/integrations/nodes/linkedin/linkedin_node.png)




