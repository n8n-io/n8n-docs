# Webex by Cisco

You can use these credentials to authenticate the following nodes:

- [Webex by Cisco](/integrations/nodes/n8n-nodes-base.ciscoWebex/)
- [Webex by Cisco Trigger](/integrations/trigger-nodes/n8n-nodes-base.ciscoWebexTrigger/)

## Prerequisites

Create a [Webex by Cisco](https://www.webex.com/) account.

## Using OAuth

1. Navigate to [Webex for Developers](https://developer.webex.com/) and sign in using your Webex by Cisco account.
2. From the user menu select **My Webex Apps**, then **Create a New App**.
3. From the ***Create a New App*** page select **Create an Integration**.
4. Complete the following required fields for your new integration:
    * ***Integration Name***: Provide a name for your Webex app.
    * ***Contact Email***: Enter your email address.
    * ***Icon***: Provide an icon for your app or select one of the available defaults.
    * ***Description***: Enter a brief description of your app.
    * ***Redirect URIs***: Enter the **OAuth Callback URL** from the Doc² credentials modal.
    * ***Scopes***: Enable the following scopes:
        * `spark:rooms_read`
        * `spark:messages_write`
        * `spark:messages_read`
        * `spark:membership_read`
        * `spark_membership_write`
        * `meeting:recordings_write`
        * `meeting:recordings_read`
        * `meeting:preferences_read`
        * `meeting:schedules_write`
        * `meeting:schedules_read`
5. Click **Add Integration** to create your app.
6. Copy the ***Client ID*** and ***Client Secret*** for this new app.

From n8n:

7. Enter a descriptive ***Credentials Name***.
8. Under ***Credential Data***, enter the ***Client ID*** and ***Client Secret*** obtained above.
9. Under ***OAuth***, click the circle button to initiate authentication. A popup may appear prompting you to login to your Webex by Cisco account.
10. After authentication is complete, click **Create** to save your new credentials.
