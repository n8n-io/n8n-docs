---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Community edition features
description: Differences in available features between the Community edition and other paid plans.
contentType: explanation
tags:
  - Community edition
  - Enterprise edition
hide:
  - tags
---

# Community Edition Features

The community edition includes almost the complete feature set of n8n, except for the features listed here.

The community edition doesn't include these features:

- [Custom Variables](/code/variables.md)
- [Environments](/source-control-environments/index.md)
- [External secrets](/external-secrets.md)
- [External storage for binary data](/hosting/scaling/external-storage.md)
- [Log streaming](/log-streaming.md) ([Logging](/hosting/logging-monitoring/logging.md) _is_ included) 
- [Multi-main mode](/hosting/scaling/queue-mode.md#multi-main-setup) ([Queue mode](/hosting/scaling/queue-mode.md) _is_ included)
- [Projects](/user-management/rbac/projects.md)
- SSO ([SAML](/hosting/securing/set-up-sso.md), [LDAP](/user-management/ldap.md))
- Sharing ([workflows](/workflows/sharing.md), [credentials](/credentials/credential-sharing.md)) (Only the instance owner and the user who creates them can access workflows and credentials)
- [Version control using Git](/source-control-environments/index.md)
- [Workflow history](/workflows/history.md) (You can get one day of workflow history with the community edition by [registering](#registered-community-edition))

These features are available on the Enterprise Cloud plan, including the self-hosted Enterprise edition. Some of these features are available on the Starter and Pro Cloud plan. 

See [pricing](https://n8n.io/pricing/){:target=_blank .external-link} for reference.

## Registered Community Edition

You can unlock extra features by registering your n8n community edition. You register with your email and receive a license key.

Registering unlocks these features for the community edition:

* [Folders](/release-notes.md#folders): Organize your workflows into tidy folders
* [Debug in editor](/workflows/executions/debug.md): Copy and [pin](/glossary.md#data-pinning-n8n) execution data when working on a workflow
* One day of [workflow history](/workflows/history.md): 24 hours of workflow history so you can revert back to previous workflow versions
* [Custom execution data](/workflows/executions/custom-executions-data.md): Save, find, and annotate execution metadata

To register a new community edition instance, select the option during your initial account creation.

To register an existing community edition instance:

1. Select the **three dots icon** <span class="inline-image">![three dots icon](/_images/common-icons/three-dots-horizontal.png){.off-glb}</span> in the lower-left corner.
1. Select **Settings** and then **Usage and plan**.
1. Select **Unlock** to enter your email and then select **Send me a free license key**.
1. Check your email for the account you entered.

Once you have a license key, activate it by clicking the button in the license email or by visiting **Options > Settings > Usage and plan** and selecting **Enter activation key**.

Once activated, your license will not expire. We may change the unlocked features in the future. This will not impact previously unlocked features.
