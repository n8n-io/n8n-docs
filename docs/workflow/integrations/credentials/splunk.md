# Splunk

You can use these credentials to authenticate the following nodes:

- [Splunk](/workflow/integrations/nodes/n8n-nodes-base.splunk/)

## Prerequisites

- [Download and install](https://www.splunk.com/en_us/download/splunk-enterprise.html) Splunk Enterprise

## Using API Key

From your Splunk UI:

1. Navigate to the **Settings** > **Tokens** menu.
2. Select **Enable Token Authentication** and create a **New Token**.
3. Copy the API Key provided there.

From n8n:

4. Enter your API key and application Base URL (e.g. `https://localhost:8089`).
5. Use the toggle to select if you want to **Allow Unauthorized Certificates**.
6. Click **Save** to create your credentials.
