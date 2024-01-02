---
title: Venafi TLS Protect Datacenter credentials
description: Documentation for Venafi TLS Protect Datacenter credentials. Use these credentials to authenticate Venafi TLS Protect Datacenter in n8n, a workflow automation platform.
contentType: integration
---

# Venafi TLS Protect Datacenter credentials

You can use these credentials to authenticate the following nodes with Venafi TLS Protect Datacenter:

* [Venafi TLS Protect Datacenter node](/integrations/builtin/app-nodes/n8n-nodes-base.venafitlsprotectdatacenter/)


Venafi provide a [PDF guide](/_downloads/venafi-tpp.pdf) to getting credentials. Follow the steps in the guide, making a note of the name and client ID you choose. When choosing scopes, make sure you choose the scopes needed for the operations you want to perform within n8n. For example, if you plan to work with certificates, including deleting them, include the **Certificate** scope in your Venafi credentials setup, with the **delete** option enabled.

Enter the client ID, your username and password, and your Venafi domain, in the n8n **Venafi TLS Protect Datacenter account** modal. Refer to [Add and edit credentials](/credentials/add-edit-credentials/) for more information on working with credentials in n8n.

