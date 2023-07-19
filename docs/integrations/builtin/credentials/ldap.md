---
title: LDAP credentials - n8n Documentation
description: Documentation for the LDAP credentials. Use these credentials to authenticate LDAP in n8n, a workflow automation platform.
contentType: integration
---

# LDAP credentials

You can use these credentials to authenticate the following nodes:

* [LDAP](/integrations/builtin/core-nodes/n8n-nodes-base.ldap/)
## Prerequisites

You will need your LDAP server address, Bind DN for the user to authenticate with, and the password for the user.

## Using LDAP credentials

1. Enter your LDAP server address
2. Enter your port
3. Enter your binding dn, If you are using Active Directory this may look something like `cn=administrator, cn=Users, dc=n8n, dc=io`
4. Enter the password for the binding user

You can find more information below for specific LDAP providers

* [Jumpcloud](https://jumpcloud.com/blog/how-to-connect-your-application-to-ldap){:target=_blank .external-link}
* [Azure ADDS](https://learn.microsoft.com/en-us/azure/active-directory-domain-services/tutorial-configure-ldaps){:target=_blank .external-link}
* [Okta](https://help.okta.com/en-us/Content/Topics/Directory/LDAP-interface-connection-settings.htm){:target=_blank .external-link}
