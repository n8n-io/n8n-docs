---
title: YouTube
description: Documentation for the YouTube node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
---

# YouTube

The YouTube node allows you to automate work in YouTube, and integrate YouTube with other applications. n8n has built-in support for a wide range of YouTube features, including retrieving and updating channels, as well as creating and deleting playlists. 

On this page, you'll find a list of operations the YouTube node supports and links to more resources.

!!! note "Credentials"
    Refer to [YouTube credentials](/integrations/builtin/credentials/google/) for guidance on setting up authentication. 

!!! note "Examples and templates"
    For usage examples and templates to help you get started, take a look at n8n's [YouTube integrations](https://n8n.io/integrations/youtube/){:target="_blank" .external-link} list.


## Basic Operations

* Channel
    * Retrieve a channel
    * Retrieve all channels
    * Update a channel
    * Upload a channel banner
* Playlist
    * Create a playlist
    * Delete a playlist
    * Get a playlist
    * Retrieve all playlists
    * Update a playlist
* Playlist Item
    * Add an item to a playlist
    * Delete a item from a playlist
    * Get a playlist's item
    * Retrieve all playlist items
* Video
    * Delete a video
    * Get a video
    * Retrieve all videos
    * Rate a video
    * Update a video
    * Upload a video
* Video Category
    * Retrieve all video categories

## Example Usage

This workflow allows you to upload a video, create a playlist, and add the video to the playlist in YouTube. You can also find the [workflow](https://n8n.io/workflows/638) on n8n.io. This example usage workflow would use the following nodes.
- [Start](/integrations/builtin/core-nodes/n8n-nodes-base.start/)
- [Read Binary File](/integrations/builtin/core-nodes/n8n-nodes-base.readbinaryfile/)
- [YouTube]()

The final workflow should look like the following image.

![A workflow with the Gmail node](/_images/integrations/builtin/app-nodes/youtube/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Read Binary File node

1. Enter the path to the video file you want to upload in the ***File Path*** field.
2. Click on ***Execute Node*** to run the node.

![Using the Read Binary File node to get the video](/_images/integrations/builtin/app-nodes/youtube/readbinaryfile_node.png)



### 3. YouTube node (upload: video)

1. First of all, you'll have to enter credentials for the YouTube node. You can find out how to do that [here](/integrations/builtin/credentials/google/).
2. Select 'Video' from the ***Resource*** dropdown list.
3. Select 'Upload' from the ***Operation*** dropdown list.
4. Enter the title of the video in the ***Title*** field.
5. Select the region code from ***Region Code*** dropdown list.
6. Select the video category from the ***Category ID*** dropdown list.
7. Click on ***Execute Node*** to run the node.


![Using the YouTube node to upload a video](/_images/integrations/builtin/app-nodes/youtube/youtube_node.png)



### 4. YouTube1 node (create: playlist)

1. Select the credentials that you entered in the previous YouTube node.
2. Select 'Playlist' from the ***Resource*** dropdown list.
3. Select 'Create' from the ***Operation*** dropdown list.
4. Enter the title of the playlist in the ***Title*** field.
5. Click on ***Execute Node*** to run the node.


![Using the YouTube node to create a playlist](/_images/integrations/builtin/app-nodes/youtube/youtube1_node.png)



### 5. YouTube2 node (add: playlistItem)

1. Select the credentials that you entered in the previous YouTube node.
2. Select 'Playlist Item' from the ***Resource*** dropdown list.
3. Select the playlist from the ***Playlist ID*** dropdown list.
4. Click on the gears icon next to the ***Video ID*** field and click on ***Add Expression***.
5. Select the following in the ***Variable Selector*** section: Nodes > YouTube > Output Data > JSON > id. You can also add the following expression: `{{$node["YouTube"].json["id"]}}`.
6. Click on ***Execute Node*** to run the node.


![Using the YouTube node to add the video to the playlist](/_images/integrations/builtin/app-nodes/youtube/youtube2_node.png)





