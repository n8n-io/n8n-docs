# Spotify

[Spotify](https://www.spotify.com/) is a music streaming service containing millions of music tracks and podcasts. Spotify allows users to create and manage their own playlists, explore new music through recommendation services, and listen to songs on demand.

!!! note "Credentials"
    You can find authentication information for this node [here](/integrations/builtin/credentials/spotify/).


## Basic Operations

* Album
    * Get an album by URI or ID.
    * Get a list of new album releases.
    * Get an album's tracks by URI or ID.
    * Search albums by keyword.
* Artist
    * Get an artist by URI or ID.
    * Get an artist's albums by URI or ID.
    * Get an artist's related artists by URI or ID.
    * Get an artist's top tracks by URI or ID.
    * Search artists by keyword.
* Library
    * Get the user's liked tracks.
* My Data
    * Get your followed artists.
* Player
    * Add a song to your queue.
    * Get your currently playing track.
    * Skip to your next track.
    * Pause your music.
    * Skip to your previous song.
    * Get your recently played tracks.
    * Resume playback on the current active device.
    * Set volume on the current active device.
    * Start playing a playlist, artist, or album.
* Playlist
    * Add tracks from a playlist by track and playlist URI or ID.
    * Create a new playlist.
    * Get a playlist by URI or ID.
    * Get a playlist's tracks by URI or ID.
    * Get a user's playlists.
    * Remove tracks from a playlist by track and playlist URI or ID.
    * Search playlists by keyword.
* Track
    * Get a track by its URI or ID.
    * Get audio features for a track by URI or ID.
    * Search tracks by keyword

## Example Usage

This workflow allows you to add a song to your queue in Spotify. You can also find the [workflow](https://n8n.io/workflows/440) on the website. This example usage workflow would use the following two nodes.
- [Start](/integrations/builtin/core-nodes/n8n-nodes-base.start/)
- [Spotify]()

The final workflow should look like the following image.

![A workflow with the Spotify node](/_images/integrations/builtin/app-nodes/spotify/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Spotify node

1. First of all, you'll have to enter credentials for the Spotify node. You can find out how to do that [here](/integrations/builtin/credentials/spotify/).
2. Enter the song's URI (or ID) to the *Track ID* field. The following GIF shows you how to find the Track ID on Spotify's UI.
3. Click on *Execute Node* to run the workflow.

![Spotify URI](/_images/integrations/builtin/app-nodes/spotify/spotifyuri.gif)
