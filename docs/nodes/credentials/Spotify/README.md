# Spotify

You can find information about the operations supported by the Spotify node on the [integrations](https://n8n.io/integrations/n8n-nodes-base.spotify) page. You can also browse the source code of the node on [Spotify](https://github.com/n8n-io/n8n/blob/master/packages/nodes-base/nodes/Spotify).


## Pre-requisites

Create a [Spotify Developer](https://developer.spotify.com/dashboard/login) account.

## Using OAuth

1. Access your [Spotify for Developers](https://developer.spotify.com/dashboard/login) dashboard.
2. Click the *Create an App* button at the top of your dashboard. Enter in the app's name and description and click *Create*.
3. Use provided Client Secret and Client ID with your Spotify node credentials in n8n.
4. Open the app settings and add the n8n provided redirect URL to the app's redirect URI list. [Redirect URL Explanation here](../README.md).

![The Spotify App Dashboard](./dashboard.gif)
