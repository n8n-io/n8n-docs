1. Access your [Google Cloud Console - Library](https://console.cloud.google.com/apis/library). Make sure you're in the correct project.
	<figure markdown="span">
	![The project dropdown in the Google Cloud top navigation](/_images/integrations/builtin/credentials/google/google-cloud-project-dropdown.png)
	<figcaption>Check the project dropdown in the Google Cloud top navigation</figcaption>
	</figure>
1. Go to **APIs & Services > Library**.
1. Search for and select the API(s) you want to enable. For example, for the Gmail node, search for and enable the Gmail API.
1. Some integrations require other APIs or require you to request access:
	* Google Perspective: [Request API Access](https://developers.perspectiveapi.com/s/docs-get-started).
	* Google Ads: Get a [Developer Token](https://developers.google.com/google-ads/api/docs/first-call/dev-token).

    /// note | Google Drive API required
	The following integrations require the Google Drive API, as well as their own API:
	
	* Google Docs
	* Google Sheets
	* Google Slides 
	///

    /// note | Google Vertex AI API
	In addition to the Vertex AI API you will also need to enable the [Cloud Resource Manager API](https://console.cloud.google.com/apis/api/cloudresourcemanager.googleapis.com/).

	///

1. Select **ENABLE**.
