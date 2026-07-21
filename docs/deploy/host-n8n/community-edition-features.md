---
title: Compare editions
contentType: explanation
hide:
  - tags
nodeTitle: Compare editions
originalFilePath: hosting/community-edition-features.md
originalUrl: https://docs.n8n.io/hosting/community-edition-features
url: https://docs.n8n.io/deploy/host-n8n/community-edition-features
description: >-
  Compare the self-hosted n8n editions: Community, registered Community,
  Business, and Enterprise.
layout:
  width: default
  title:
    visible: true
  description:
    visible: false
  tableOfContents:
    visible: true
  outline:
    visible: true
  pagination:
    visible: true
  metadata:
    visible: true
  tags:
    visible: true
  actions:
    visible: true
tags:
  - Community edition
  - Enterprise edition
---

# Compare editions

When you self-host n8n, every installation uses the same core product. Which **edition** you run depends on whether you add a license key:

- **Community edition**: the free edition. This is what n8n runs without a license key.
- **Registered Community edition**: the free edition with extra features unlocked by registering your email. Still free.
- **Business** and **Enterprise**: paid editions unlocked with a license key.

{% hint style="info" %}
**Plan, edition, or license?**

For self-hosted n8n you run an **edition** (the software variant), and a paid edition is unlocked by a **license** key. A **plan** is the commercial subscription tier you buy, whether for self-hosted or [n8n Cloud](../use-n8n-cloud/start-your-free-trial.md). See the [glossary](https://app.gitbook.com/s/CxSeOtVxqqhfxMSac0AV/key-concept-glossary#edition-n8n) for definitions.
{% endhint %}

{% hint style="info" %}
**The pricing page is the source of truth**

Exact features per edition can change. For the current breakdown, see the [pricing page](https://n8n.io/pricing/). This page explains what the editions are and the main differences between them, not the full feature list.
{% endhint %}

## Community edition <a href="#community-edition" id="community-edition"></a>

The Community edition includes almost the complete feature set of n8n. It doesn't include these features:

* [Custom Variables](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/code-in-n8n/define-custom-variables)
* [Environments](https://app.gitbook.com/s/wMJrGrimpx3PxCJpUswm/use-source-control-and-environments)
* [External secrets](https://app.gitbook.com/s/wMJrGrimpx3PxCJpUswm/manage-credentials/use-external-secret-stores)
* [External storage for binary data](configure-n8n/scaling/use-external-storage.md)
* [Log streaming](https://app.gitbook.com/s/wMJrGrimpx3PxCJpUswm/observe-and-log/stream-logs-to-external-systems) ([Logging](keep-n8n-running/set-up-logging.md) _is_ included)
* [Multi-main mode](configure-n8n/scaling/enable-queue-mode.md#multi-main-setup) ([Queue mode](configure-n8n/scaling/enable-queue-mode.md) _is_ included)
* [Projects](https://app.gitbook.com/s/wMJrGrimpx3PxCJpUswm/manage-users-and-access/set-permissions-and-roles-rbac/organize-work-in-projects)
* SSO ([SAML](configure-n8n/security/configure-sso.md), [LDAP](https://app.gitbook.com/s/wMJrGrimpx3PxCJpUswm/manage-users-and-access/verify-user-identity/connect-ldap))
* Sharing ([workflows](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/manage-workflows/share-with-others), [credentials](https://app.gitbook.com/s/wMJrGrimpx3PxCJpUswm/manage-credentials/share-credentials-securely)) (Only the instance owner and the user who creates them can access workflows and credentials)
* [Version control using Git](https://app.gitbook.com/s/wMJrGrimpx3PxCJpUswm/use-source-control-and-environments)

These features are available on the Business and Enterprise editions. Some are also available on the Starter, Pro, and Enterprise n8n Cloud plans. See [pricing](https://n8n.io/pricing/) for the current breakdown.

## Registered Community edition <a href="#registered-community-edition" id="registered-community-edition"></a>

You can unlock extra features by registering your Community edition. You register with your email and receive a license key. Registering is free.

Registering unlocks these features for the Community edition:

* Folders: Organize your workflows into tidy folders
* [Debug in editor](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/understand-workflows/understand-executions/debug-executions): Copy and pin[^1] execution data when working on a workflow
* [Custom execution data](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/understand-workflows/understand-executions/customize-executions-data): Save, find, and annotate execution metadata

To register a new Community edition instance, select the option during your initial account creation.

To register an existing Community edition instance:

1. Select the **three dots icon** <img src="../.gitbook/assets/three-dots-horizontal (1).png" alt="three dots icon" data-size="line"> in the lower-left corner.
2. Select **Settings** and then **Usage and plan**.
3. Select **Unlock** to enter your email and then select **Send me a free license key**.
4. Check your email for the account you entered.

Once you have a license key, activate it by selecting the button in the license email, or by going to **Options > Settings > Usage and plan** and selecting **Enter activation key**.

Once activated, your license won't expire. n8n may change the unlocked features in the future. This won't affect features you already unlocked.

## Business and Enterprise editions <a href="#business-and-enterprise-editions" id="business-and-enterprise-editions"></a>

The Business and Enterprise editions unlock the paid features that the Community edition doesn't include, such as SSO, environments, external secrets, and log streaming. The Enterprise edition adds the most advanced features for security, scaling, and governance.

To run a Business or Enterprise edition, you add a license key to your instance. For how to get and activate a key, see [Manage your license](configure-n8n/manage-your-license.md). For the features included in each edition, see the [pricing page](https://n8n.io/pricing/).

## Which edition is right for you <a href="#which-edition-is-right-for-you" id="which-edition-is-right-for-you"></a>

- Use the **Community edition** to self-host n8n for free with almost the complete feature set.
- **Register** your Community edition (free) to also get folders, debug in editor, and custom execution data.
- Choose a **Business** or **Enterprise** edition when you need paid features like SSO, environments, projects, or external secrets. If you'd rather not manage infrastructure at all, consider [n8n Cloud](../use-n8n-cloud/start-your-free-trial.md) instead.

[^1]: Data pinning allows you to temporarily freeze the output data of a node during workflow development. This allows you to develop workflows with predictable data without making repeated requests to external services. Production workflows ignore pinned data and request new data on each execution.
