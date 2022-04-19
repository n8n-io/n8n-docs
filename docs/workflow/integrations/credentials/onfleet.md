# Onfleet credentials

You can use these credentials to authenticate the following nodes with Onfleet:

- [Onfleet](/workflow/integrations/nodes/n8n-nodes-base.onfleet/)
- [Onfleet Trigger](/workflow/integrations/trigger-nodes/n8n-nodes-base.onfleetTrigger/)

1. Sign up for Onfleet and create an API key. Refer to Onfleet's documentation for more information:
    * [Creating an API key](https://support.onfleet.com/hc/en-us/articles/360045763292-API)
    * [Getting started with the Onfleet API](https://docs.onfleet.com/reference#setup-tutorial)
2. In Doc², create a new credential. You can either:
    * Click **Credentials** > **New**, then search for **Onfleet API**. After selecting **Onfleet API**, click **Continue**.
    * In an Onfleet node, click the **Credential for Onfleet API** dropdown, then click **Create new**.
3. In the **Onfleet account** modal, paste your Onfleet API key into **API key**. 
4. By default, this credential is available to both the Onfleet and Onfleet Trigger nodes. You can change this using the settings on the **Details** tab.
5. After entering the key and editing the credential details, click **Save**. Doc² tests the key to check it can connect to Onfleet.
