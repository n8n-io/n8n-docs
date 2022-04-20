# Quick Base

You can use these credentials to authenticate the following nodes with Quick Base.
- [Quick Base](/workflow/integrations/nodes/n8n-nodes-base.quickbase/)

## Prerequisites

Create a [Quick Base](https://www.quickbase.com/) account.

## Using API

1. Access your Quick Base dashboard.
2. Click on your name on the top right and select 'My preferences' from the dropdown list.
3. Click on ***Manage my user tokens*** under the ***My User Information*** section.
4. Click on the ***+ New user token*** button.
5. Enter a name in the ***Name*** field.
6. Select an app from the ***Assign token to apps*** dropdown list.
7. Click on the ***Save*** button.
8. Copy the string of characters located between `https://` and `/db` in your Quick Base URL. This string is the hostname.
9. Use this ***Hostname*** and ***User Token*** with your Quick Base node credentials in n8n.

![Getting Quick Base credentials](/_images/integrations/credentials/quickbase/using-api.gif)

## Further Reference

- [Quick Base API Portal](https://developer.quickbase.com/auth)
