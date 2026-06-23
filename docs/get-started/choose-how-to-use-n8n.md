---
description: >-
  Choose between our Cloud service, or self-hosting options. Learn more about
  licenses and n8n payment plans.
contentType: overview
nodeTitle: Choose how to use n8n
originalFilePath: choose-n8n.md
originalUrl: 'https://docs.n8n.io/choose-n8n'
url: 'https://docs.n8n.io/get-started/choose-how-to-use-n8n'
layout:
  description:
    visible: false
---

# Choose your n8n <a href="#choose-your-n8n" id="choose-your-n8n"></a>

n8n offers two primary deployment options: **n8n Cloud** (fully-managed) and **Self-hosted** (deploy on your own infrastructure).

{% hint style="info" %}
**Want to try n8n quickly?**

**Start with n8n Cloud** for instant access with no installation required.

[Start free trial](https://n8n.io/cloud/){ .md-button .md-button--primary }
{% endhint %}

## Decision guide <a href="#decision-guide" id="decision-guide"></a>

Use this guide to choose the best option for your needs:

| Your situation | Recommended option | Reason |
|----------------|-------------------|---------|
| Want to start quickly | **n8n Cloud** | No installation needed |
| Don't have technical expertise | **n8n Cloud** | Hosted solution, no setup required |
| Need production-ready deployment | **Both options work** | Both Cloud and self-hosted support production use |
| Have customized use cases | **Self-hosted** | Full control over deployment and configuration |
| Want most features for free | **Self-hosted Community Edition** | Free with almost complete feature set |
| Need folders and debugging features for free | **Registered Community Edition** | Free registration unlocks these features |
| Need enterprise features (SSO, environments, projects, etc.) | **Cloud (paid) or Self-hosted Enterprise** | These features require paid plans |
| Have infrastructure and technical resources | **Self-hosted** | Can manage your own deployment |

For specific feature availability across different plans, see the [pricing page](https://n8n.io/pricing/).

## Pros and cons comparison <a href="#pros-and-cons-comparison" id="pros-and-cons-comparison"></a>

| Aspect | n8n Cloud | Self-hosted |
|--------|-----------|-------------|
| **Setup & Deployment** |
| Installation | ✅ No installation needed | ❌ Requires setup (npm, Docker, or server) |
| Technical expertise | ✅ None required | ❌ Required for installation and configuration |
| **Infrastructure Management** |
| Hosting | ✅ Fully hosted by n8n | ❌ You must provide and manage infrastructure |
| Maintenance | ✅ Handled by n8n | ❌ Your responsibility |
| **Control & Customization** |
| Deployment control | ❌ Managed by n8n | ✅ Full control over deployment |
| Customization | ❌ Limited to available options | ✅ Recommended for customized use cases |
| **Cost** |
| Free option | ⚠️ Free trial available | ✅ Free Community Edition with most features |
| Paid options | ✅ Range of paid plans | ✅ Paid Enterprise option available |
| **Features** |
| Core features | ✅ Included | ✅ Included in free Community Edition |
| Enterprise features | ❌ Requires paid plans | ❌ Requires Enterprise license (free Community limited) |
| **Use Cases** |
| Quick start | ✅ Ideal for getting started | ⚠️ Takes longer to set up |
| Production use | ✅ Supported | ✅ Recommended for production |
| Custom requirements | ⚠️ Limited customization | ✅ Recommended for customized use cases |

**Legend**: ✅ Advantage | ❌ Disadvantage | ⚠️ Mixed/depends on needs

For specific feature availability across different plans, see the [pricing page](https://n8n.io/pricing/).

## Getting started <a href="#getting-started" id="getting-started"></a>

Ready to begin? Choose your deployment option:

- **[Get started with n8n Cloud](https://n8n.io/cloud/)** - Sign up for instant access
- **[Get started with self-hosted](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n)** - Installation and deployment guides

To register a Community Edition instance for additional features, go to **Settings > Usage and plan** and select **Unlock**.

## Feature comparison <a href="#feature-comparison" id="feature-comparison"></a>

### Self-hosted Community Edition <a href="#self-hosted-community-edition" id="self-hosted-community-edition"></a>

n8n's Community Edition is the free, self-hosted version of n8n that you can run on your own infrastructure. 

| Feature | Not available in Community Edition | Available in |
|-----------------|-----------------------------------|--------------|
| **Variables & Configuration** | Custom variables | Enterprise editions, some Cloud paid plans |
| **Environments** | Environments | Enterprise editions, some Cloud paid plans |
| **Secrets Management** | External secrets | Enterprise editions, some Cloud paid plans |
| **Storage** | External storage for binary data | Enterprise editions |
| **Logging** | Log streaming (standard logging IS included) | Enterprise editions |
| **Scaling** | Multi-main mode (queue mode IS included) | Enterprise editions |
| **Organization** | Projects | Enterprise editions, some Cloud paid plans |
| **Authentication** | SSO (SAML, LDAP) | Enterprise editions |
| **Collaboration** | Workflow and credential sharing** | Enterprise editions, some Cloud paid plans |
| **Version Control** | Version control using Git | Enterprise editions, some Cloud paid plans |

In Community Edition, only the instance owner and the user who creates workflows or credentials can access them.

### Self-hosted registered Community Edition (Free) <a href="#self-hosted-registered-community-edition-free" id="self-hosted-registered-community-edition-free"></a>

By registering your Community Edition with your email, you unlock these additional features:

| Feature | Description |
|---------|-------------|
| Folders | Organize your workflows into folders |
| Debug in editor | Copy and pin execution data when working on a workflow |
| Custom execution data | Save, find, and annotate execution metadata |

### n8n Cloud vs Self-hosted Enterprise <a href="#n8n-cloud-vs-self-hosted-enterprise" id="n8n-cloud-vs-self-hosted-enterprise"></a>

Both n8n Cloud (Enterprise plan) and Self-hosted Enterprise editions include all the features listed above that are missing from the Community Edition.

For specific details on which features are available on Cloud Starter, Pro, and Business self-hosted plans, see the [pricing page](https://n8n.io/pricing/).
