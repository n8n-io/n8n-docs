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

n8n offers two primary deployment options: **n8n Cloud** (fully-managed) and **Self-hosted** (deploy on your own infrastructure). Choosing involves two decisions:

1. **Cloud or self-hosted?** Decide whether n8n manages the infrastructure or you do.
2. **Which plan or edition?** Within each option, pick the tier that has the features and limits you need.

This page helps with both.

{% hint style="info" %}
**Want to try n8n quickly?**

**Start with n8n Cloud** for instant access with no installation required.

[Start free trial](https://n8n.io/cloud/)
{% endhint %}

{% hint style="info" %}
**The pricing page is the source of truth**

Available plans, editions, and licenses, along with the features, usage limits, and prices for each, can change. For the current details, always check the [pricing page](https://n8n.io/pricing/). This page explains the choices you're making, not the specifics of what each plan or edition includes.
{% endhint %}

## Decision 1: Cloud or self-hosted <a href="#decision-1-cloud-or-self-hosted" id="decision-1-cloud-or-self-hosted"></a>

Use this guide to choose a deployment option:

| Your situation | Recommended option | Reason |
|----------------|-------------------|---------|
| Want to start quickly | **n8n Cloud** | No installation needed |
| Don't have technical resources to host | **n8n Cloud** | Fully managed, no setup or maintenance |
| Don't want to manage infrastructure | **n8n Cloud** | n8n handles hosting, updates, and scaling |
| Need full control over deployment | **Self-hosted** | You control the environment and configuration |
| Have customized or air-gapped use cases | **Self-hosted** | Full control over deployment and data |
| Want to run n8n for free | **Self-hosted Community edition** | Free with almost the complete feature set |
| Have infrastructure and technical resources | **Self-hosted** | You can manage your own deployment |

Both options support production use. For the current feature and price breakdown, see the [pricing page](https://n8n.io/pricing/).

### Pros and cons comparison <a href="#pros-and-cons-comparison" id="pros-and-cons-comparison"></a>

| Aspect | n8n Cloud | Self-hosted |
|--------|-----------|-------------|
| **Setup & deployment** |
| Installation | ✅ No installation needed | ❌ Requires setup (npm, Docker, or server) |
| Technical expertise | ✅ None required | ❌ Required for installation and configuration |
| **Infrastructure management** |
| Hosting | ✅ Fully hosted by n8n | ❌ You provide and manage infrastructure |
| Maintenance | ✅ Handled by n8n | ❌ Your responsibility |
| **Control & customization** |
| Deployment control | ❌ Managed by n8n | ✅ Full control over deployment |
| Customization | ❌ Limited to available options | ✅ Recommended for customized use cases |
| **Cost** |
| Free option | ⚠️ Free trial only | ✅ Free Community edition with most features |
| Paid options | ✅ Range of paid plans | ✅ Paid Business and Enterprise editions |
| **Enterprise features** |
| Availability | ✅ On Pro and Enterprise plans | ✅ On Business and Enterprise editions |

**Legend**: ✅ Advantage | ❌ Disadvantage | ⚠️ Mixed/depends on needs

For specific feature availability across plans and editions, see the [pricing page](https://n8n.io/pricing/).

## Decision 2: Choose a plan or edition <a href="#decision-2-choose-a-plan-or-edition" id="decision-2-choose-a-plan-or-edition"></a>

Once you've chosen a deployment option, pick the tier within it. The [pricing page](https://n8n.io/pricing/) lists the definitive features, usage limits, and prices for every plan and edition.

### If you chose n8n Cloud: pick a plan <a href="#if-you-chose-n8n-cloud-pick-a-plan" id="if-you-chose-n8n-cloud-pick-a-plan"></a>

Every plan runs the same core product with different features, usage limits, and computing power.

| Plan | Designed for |
|------|--------------|
| **Free trial** | Trying Cloud with Pro features for 14 days |
| **Starter** | Individuals and small projects getting started |
| **Pro** | Power users and small teams that need higher limits, admin accounts, and insights |
| **Enterprise** | Organizations that need advanced security, scaling, and dedicated support |

For how to start a trial and upgrade, see [Try free then choose a plan](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/use-n8n-cloud/start-your-free-trial). For what each plan includes, see the [pricing page](https://n8n.io/pricing/).

### If you chose self-hosted: pick an edition <a href="#if-you-chose-self-hosted-pick-an-edition" id="if-you-chose-self-hosted-pick-an-edition"></a>

Every self-hosted installation runs the same core product. The edition depends on whether you subscribe to a plan, giving you the ability to add a license key for that plan.

| Edition | Cost | Designed for |
|---------|------|--------------|
| **Community** | Free | Self-hosting with almost the complete feature set |
| **Registered Community** | Free | Community plus folders, debug in editor, and custom execution data. Unlock by registering your email |
| **Business** | Paid (license key when you subsribe to Business plan) | Teams needing paid features like SSO, environments, and projects |
| **Enterprise** | Paid (license key when you subscribe to Enterprise plan) | Organizations needing the most advanced security, scaling, and governance |

For the differences between editions and how to register or license an instance, see [Compare editions](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/community-edition-features). For what each plan includes, see the [pricing page](https://n8n.io/pricing/).

To register a Community edition instance for the extra free features, go to **Settings > Usage and plan** and select **Unlock**.

## Which features need a paid plan or edition <a href="#which-features-need-a-paid-plan-or-edition" id="which-features-need-a-paid-plan-or-edition"></a>

Some features aren't in the free Community edition. They're available on the self-hosted Business and Enterprise editions, and some are on the paid Cloud plans:

- Custom variables
- Environments
- External secrets
- External storage for binary data
- Log streaming (standard logging is included)
- Multi-main mode (queue mode is included)
- Projects
- SSO (SAML, LDAP)
- Workflow and credential sharing
- Version control using Git

Feature availability changes over time and differs by plan and edition. For exactly what each plan and edition includes, the [pricing page](https://n8n.io/pricing/) is the definitive source. See also [Compare editions](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/community-edition-features) for how the self-hosted editions differ.

## Getting started <a href="#getting-started" id="getting-started"></a>

Ready to begin?

- **[Get started with n8n Cloud](https://n8n.io/cloud/)** — sign up for instant access, then [choose a plan](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/use-n8n-cloud/start-your-free-trial)
- **[Get started with self-hosted](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n)** — installation and deployment guides, then [choose an edition](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/community-edition-features)

For the current plans, editions, licenses, and prices, always check the [pricing page](https://n8n.io/pricing/).
