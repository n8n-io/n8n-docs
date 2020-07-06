---
permalink: /nodes/n8n-nodes-base.spotify
---

# Spotify

[Spotify](https://www.spotify.com/) is a music streaming service containing millions of music tracks and podcasts. Spotify allows users to create and manage their own playlists, explore new music through recommendation services, and listen to songs on demand.

::: tip 🔑 Credentials
You can find authentication information for this node [here](../../../credentials/Spotify/README.md).
:::

## Basic Operations

- Album
    - Get an album
    - Get an album's tracks
- Artist
    - Get an artist
    - Get an artist's albums
    - Get an artist's related artists
    - Get an artists's top tracks
- Player
    - Add song to queue
    - Get the currently playing song
    - Go to the next song
    - Pause your music
    - Go to the previous song
    - Get the recently played song
    - Start your music
- Playlist
    - Add an item to a playlist
    - Get a playlist
    - Get a playlist's tracks
    - Get a user's playlists
    - Remove an item from a playlist
- Track
    - Get a track
    - Get a track's audio features

## Example Usage

This workflow allows you to add a song to your queue in Spotify. You can also find the [workflow](https://n8n.io/workflows/440) on the website. This example usage workflow would use the following two nodes.
- [Start](../../core-nodes/Start/README.md)
- [Spotify]()

The final workflow should look like the following image.

![A workflow with the Spotify node](./workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Spotify node

1. First of all, you'll have to enter credentials for the Spotify node. You can find out how to do that [here](../../../credentials/Spotify/README.md).
2. Select the *Player* Resource.
3. Select the *Add Song to Queue* Operation.
4. Enter the song's URI (or ID) to the *Track ID* field. The following GIF shows you how to find the Track ID on Spotify's UI.
5. Click on *Execute Node* to run the workflow.

![Spotify URI](./spotifyURI.gif)


## Further Reading

- [Creating Error Workflows in n8n 🌪](https://medium.com/n8n-io/creating-error-workflows-in-n8n-6e03c9ecbc0f)
- [Database Monitoring and Alerting with n8n 📡](https://medium.com/n8n-io/database-monitoring-and-alerting-with-n8n-f5082df7bdb2)
