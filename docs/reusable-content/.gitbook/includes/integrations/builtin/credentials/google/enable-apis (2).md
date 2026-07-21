---
title: enable-apis
---
1. Access your [Google Cloud Console - Library](https://console.cloud.google.com/apis/library). Make sure you're in the correct project.
	<figure>
	<img src="../../../../../assets/google-cloud-project-dropdown.png" alt="">
	<figcaption>Check the project dropdown in the Google Cloud top navigation</figcaption>
	</figure>
1. Go to **APIs & Services > Library**.
1. Search for and select the API(s) you want to enable. For example, for the Gmail node, search for and enable the Gmail API.
1. Some integrations require other APIs or require you to request access:<br>
	* Google Perspective: [Request API Access](https://developers.perspectiveapi.com/s/docs-get-started).
	* Google Ads: Get a [Developer Token](https://developers.google.com/google-ads/api/docs/first-call/dev-token).

    <div data-gb-custom-block data-tag="hint" data-style="info" class="hint hint-info"><p><strong>Google Drive API required</strong></p><p>The following integrations require the Google Drive API, as well as their own API:</p><ul><li>Google Docs</li><li>Google Sheets</li><li>Google Slides</li></ul></div>

    <div data-gb-custom-block data-tag="hint" data-style="info" class="hint hint-info"><p><strong>Google Vertex AI API</strong></p><p>In addition to the Vertex AI API you will also need to enable the <a href="https://console.cloud.google.com/apis/api/cloudresourcemanager.googleapis.com/">Cloud Resource Manager API</a>.</p></div>

1. Select **ENABLE**.
