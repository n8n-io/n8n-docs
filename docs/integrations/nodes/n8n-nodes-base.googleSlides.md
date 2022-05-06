# Google Slides

[Google Slides](https://www.google.com/slides) is a web-based presentation program that is part of Google's office software suite within its Google Drive service. It allows you to create, edit, and collaborate.

!!! note "Credentials"
    You can find authentication information for this node [here](/integrations/credentials/google/).


## Basic Operations

* Page
    * Get a page
    * Get a thumbnail
* Presentation
    * Create a presentation
    * Get a presentation
    * Get presentation slides
    * Replace text in a presentation

## Example Usage

This workflow allows you to get all the slides from a presentation and get the thumbnails for the pages. You can also find the [workflow](https://n8n.io/workflows/1035) on n8n.io. This example usage workflow uses the following nodes.
- [Start](/integrations/core-nodes/n8n-nodes-base.start/)
- [Google Slides]()

The final workflow should look like the following image.

![A workflow with the Google Slides node](/_images/integrations/nodes/googleslides/workflow.png)

### 1. Start node

The Start node exists by default when you create a new workflow.

### 2. Google Slides node (getSlides: presentation)

#### Get Presentation ID

1. Open a Google Slides presentation.
2. Copy the string of characters located between `/d/` and `/edit` in your presentation URL. This string is the Presentation ID, which we will use in the Google Slides node.

#### Configure the Google Slides node

This Google Slides node will get all the slides from a presentation.

1. Select 'OAuth2' from the ***Authentication*** dropdown list.
2.  First of all, you'll have to enter credentials for the Google Slides node. You can find out how to enter credentials for this node [here](/integrations/credentials/google/).
3. Select 'Get Slides' from the ***Operation*** dropdown list.
4. Paste the Presentation ID you copied in the previous step, in the ***Presentation ID*** field.
5. Toggle ***Return All*** to `true`.
6. Click on ***Execute Node*** to run the workflow.

In the screenshot below, you will notice that the node returns all the slides from the presentation.

![Using the Google Slides node to get slides from a presentation](/_images/integrations/nodes/googleslides/googleslides_node.png)

### 3. Google Slides1 node (getThumbnail: page)

This node will return thumbnails of the pages that were returned by the previous node.

1. Select 'OAuth2' from the ***Authentication*** dropdown list.
2. Select the credentials that you entered in the previous Google Slides node.
3. Select 'Page' from the ***Resource*** dropdown list.
4. Select 'Get Thumbnail' from the ***Operation*** dropdown list.
5. Click on the gears icon next to the ***Presentation ID*** field and click on ***Add Expression***.
6. Select the following in the ***Variable Selector*** section: Nodes > Google Slides > Parameters > presentationId. You can also add the following expression: `{{$node["Google Slides"].parameter["presentationId"]}}`.
7. Click on the gears icon next to the ***Page Object ID*** field and click on ***Add Expression***.
8. Select the following in the ***Variable Selector*** section: Nodes > Google Slides > Output Data > JSON > objectId. You can also add the following expression: `{{$json["objectId"]}}`.
9. Toggle ***Download*** to `true`.
10. Click on ***Execute Node*** to run the workflow.

In the screenshot below, you will notice that the node returns thumbnails of the pages that were returned by the previous node.

![Using the Google Slides node to get thumbnails of the slides](/_images/integrations/nodes/googleslides/googleslides1_node.png)
