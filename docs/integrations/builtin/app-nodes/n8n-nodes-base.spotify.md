---
title: Spotify node documentation
description: Learn how to use the Spotify node in n8n. Follow technical documentation to integrate Spotify node into your workflows.
contentType: [integration, reference]
priority: medium
---

# Spotify node

Use the Spotify node to automate work in Spotify, and integrate Spotify with other applications. n8n has built-in support for a wide range of Spotify features, including getting album and artist information. 

On this page, you'll find a list of operations the Spotify node supports and links to more resources.

/// note | Credentials
Refer to [Spotify credentials](/integrations/builtin/credentials/spotify.md) for guidance on setting up authentication. 
///

## Operations

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

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'spotify') ]]

--8<-- "_snippets/integrations/builtin/app-nodes/operation-not-supported.md"
