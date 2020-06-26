# Google

You can find information about the operations supported by the Google node on the [integrations](https://n8n.io/integrations) page. You can also browse the source code of the node on [Google](https://github.com/n8n-io/n8n/tree/master/packages/nodes-base/nodes/Google).


## Pre-requisites

Create a [Google Cloud](https://cloud.google.com/) account and access the console.

## Google Calendar

<!-- ### API Key

1. Access your Google dashboard.
2. Click on your user icon on the top left.
3. Click on API & Services.
4. Click on Credentials.
5. Click on Create Credentials.
6. Click on API Key.
7. Use provided API Key with your Google node credentials in n8n.
![Getting Google credentials](https://i.imgur.com/r9KX5Gh.gif)  -->

## Using OAuth

1. Access your Google dashboard.
2. Click on your user icon on the top left.
3. Click on API & Services.
4. Click on Credentials.
5. Click on Create Credentials.
6. Click on OAuth Client.
7. Choose your preferences.
8. Fill out information for your application credentials.
9. Use provided Client Secret and Client ID with your Google node credentials in n8n.

![Getting Google credentials](./using-oauth-calendar.gif)


## Google Drive / Sheets API

## Using Service Account

1. Access your Google dashboard.
2. Click on your user icon on the top left.
3. Click on API & Services.
4. Click on Credentials.
5. Click on Create Credentials.
6. Click on Service Account.
7. Choose your preferences.
8. Fill out information for your service account.
9. You will receive a .json file with your credentials.

It will appear something like this in a text editor:

![Getting Google credentials](https://i.imgur.com/zYNRAyd.png)

10. Use the values of client_email and private_key for your Google Credentials in the n8n node.

![Getting Google credentials](https://i.imgur.com/Q9eFy7B.gif)
