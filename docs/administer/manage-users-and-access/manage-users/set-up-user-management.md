---
description: Set up user management on n8n Cloud or on a self-hosted n8n instance.
contentType: howto
nodeTitle: Set up user management
originalFilePath: user-management/cloud-setup.md
originalUrl: 'https://docs.n8n.io/user-management/cloud-setup'
url: 'https://docs.n8n.io/administer/manage-users-and-access/manage-users/set-up-user-management'
layout:
  description:
    visible: false
---

# Set up user management <a href="#set-up-user-management" id="set-up-user-management"></a>

Set up user management to create accounts for the people who work in your n8n instance. The steps depend on whether you use n8n Cloud or self-host n8n.

{% hint style="info" %}
**Feature availability**

User management, including adding and removing users, is available on:

- **n8n Cloud:** Starter, Pro, Enterprise
- **Self-hosted:** Community, Registered Community, Business, Enterprise
{% endhint %}

## Set up user management on n8n Cloud <a href="#set-up-user-management-on-n8n-cloud" id="set-up-user-management-on-n8n-cloud"></a>

{% hint style="warning" %}
**Irreversible upgrade**

Once you upgrade your Cloud instance to an n8n version with user management, you can't downgrade your version.
{% endhint %}

### Step one: In-app setup <a href="#step-one-in-app-setup" id="step-one-in-app-setup"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/c0111xcskz1G8PKOQogB/" %}

You can now invite other people to your n8n instance.

### Step two: Invite users <a href="#step-two-invite-users" id="step-two-invite-users"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/8qoOEjsLz4RnydVBogNy/" %}

## Set up user management on self-hosted n8n <a href="#set-up-user-management-on-self-hosted-n8n" id="set-up-user-management-on-self-hosted-n8n"></a>

Self-hosted instances need extra configuration before you can invite users. Follow [Configure self-hosted n8n for user management](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/configure-n8n/user-management) to configure your instance and start inviting users.

## Related resources

* [Manage users](./)
* [Add and remove users](add-and-remove-users.md)
