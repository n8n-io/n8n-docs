---
title: Community edition features
contentType: explanation
hide:
  - tags
nodeTitle: Community edition features
originalFilePath: hosting/community-edition-features.md
originalUrl: https://docs.n8n.io/hosting/community-edition-features
url: https://docs.n8n.io/deploy/host-n8n/community-edition-features
description: >-
  Differences in available features between the Community edition and other paid
  plans.
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

# Community edition features

The community edition includes almost the complete feature set of n8n, except for the features listed here.

The community edition doesn't include these features:

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

These features are available on: the Enterprise Cloud plan, including the self-hosted Enterprise edition. Some of these features are available on the Starter and Pro Cloud plans, and the Business self-hosted plan.

See [pricing](https://n8n.io/pricing/) for reference.

## Registered Community Edition <a href="#registered-community-edition" id="registered-community-edition"></a>

You can unlock extra features by registering your n8n community edition. You register with your email and receive a license key.

Registering unlocks these features for the community edition:

* Folders: Organize your workflows into tidy folders
* [Debug in editor](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/understand-workflows/understand-executions/debug-executions): Copy and [pin](https://app.gitbook.com/s/CxSeOtVxqqhfxMSac0AV/key-concept-glossary#data-pinning-n8n) execution data when working on a workflow
* [Custom execution data](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/understand-workflows/understand-executions/customize-executions-data): Save, find, and annotate execution metadata

To register a new community edition instance, select the option during your initial account creation.

To register an existing community edition instance:

1. Select the **three dots icon** <img src="../.gitbook/assets/three-dots-horizontal (1).png" alt="three dots icon" data-size="line"> in the lower-left corner.
2. Select **Settings** and then **Usage and plan**.
3. Select **Unlock** to enter your email and then select **Send me a free license key**.
4. Check your email for the account you entered.

Once you have a license key, activate it by clicking the button in the license email or by visiting **Options > Settings > Usage and plan** and selecting **Enter activation key**.

Once activated, your license will not expire. We may change the unlocked features in the future. This will not impact previously unlocked features.
