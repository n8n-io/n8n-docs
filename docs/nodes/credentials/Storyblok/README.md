---
permalink: /credentials/storyblok
description: Learn to configure credentials for the Storyblok node in n8n
---

# Storyblok

You can use these credentials to authenticate the following nodes with Storyblok.
- [Storyblok](../../nodes-library/nodes/Storyblok/README.md)

## Prerequisites

Create a [Storyblok](https://www.storyblok.com/) account.

## Using API Key to access the Content API

1. Access the [spaces](https://app.storyblok.com/#!/me/spaces) page.
2. Select a space you want to use from the left sidebar.
3. Click on ***Settings*** in the left sidebar.
4. Select the ***API-Keys*** tab.
5. Select an access level from the ***Access Level*** dropdown list.
6. Click on the ***Create Token*** button.
7. Use this ***API Key*** with your Storyblok Content API credentials in n8n.

![Getting Storyblok credentials for the Content API](./using-content-api.gif)

## Using API Key to access the Management API

1. Access the [My Account](https://app.storyblok.com/#!/me/account) page.
2. Scroll down to the ***Personal access tokens*** section.
3. Click on the ***Generate new Token*** button.
4. Use this ***API Key*** with your Storyblok Management API credentials in n8n.

![Getting Storyblok credentials for the Management API](./using-management-api.gif)


## Further Reference

- [Content API Documentation](https://www.storyblok.com/docs/api/content-delivery#topics/authentication)
- [Management API Documentation](https://www.storyblok.com/docs/api/management#topics/authentication)