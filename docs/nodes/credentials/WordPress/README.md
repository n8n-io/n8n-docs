---
permalink: /credentials/wordpress
description: Learn to configure credentials for the WordPress node in n8n
---

# WordPress

You can use these credentials to authenticate the following nodes with WordPress.
- [WordPress](../../nodes-library/nodes/WordPress/README.md)

## Prerequisites

- Create a [WordPress](https://wordpress.com/) account.
- After creating the user go back and edit the user.  Scroll down until you see 'Application Passwords'.  In the box 'New Application Password Name' 
name it whatever you like ie 'n8n'.  Click button 'Add New Application Password'.  It will give you a password in this format'NXlU oZC9 Cljv 777G EV4s icsJ'.  This is better because as wordpress states: ''Application passwords allow authentication via non-interactive systems, such as XML-RPC or the REST API, without providing your actual password. Application passwords can be easily revoked. They cannot be used for traditional logins to your website.''
## Using Username and Password

Use your username, and "application password" from previous step and WordPress URL with your WordPress node credentials in n8n.  If you are connecting ssl Wordpress URL needs to start with https://
