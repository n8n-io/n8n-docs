---
permalink: /credentials/grist
description: Learn to configure credentials for the Grist node in n8n
---

# Grist

You can use these credentials to authenticate the [Grist node](../../nodes-library/nodes/Grist/README.md).

## Prerequisites

Create a [Grist](https://getgrist.com/) account.

## API Key

1. Enter a name for your credentials in the ***Credentials Name*** field in the 'Grist API' credentials in n8n.
2. [Copy the API key from your profile settings](https://support.getgrist.com/rest-api/).
3. Paste the API key in the ***API Key*** field in the 'Grist API' credentials in n8n.
4. Click on the ***Create*** button to create the credentials.

## Custom Subdomain

Your personal site is accessible at `docs.getgrist.com` and requires no extra configuration. If you have a paid plan you will also have a team site accessible at `<TEAM>.getgrist.com`, where `<TEAM>` is the ***Custom Subdomain***. To use documents in this site, you will need to configure your credentials:

1. Click the ***Plan Type*** dropdown and select 'Paid'.
2. Fill in the ***Custom Subdomain*** field. For example, if the address of a document in the browser looks like `https://myteam.getgrist.com/...` then the subdomain is `myteam`.
