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

- [Custom Variables](/code/variables/)
- [Environments](/source-control-environments/)
- [External secrets](/external-secrets/)
- [External storage for binary data](/hosting/scaling/external-storage/)
- [Log streaming](/log-streaming/) ([Logging](/hosting/logging-monitoring/logging/) _is_ included) 
- [Multi-main mode](/hosting/scaling/queue-mode/#multi-main-setup) ([Queue mode](/hosting/scaling/queue-mode/) _is_ included)
- [Projects](/user-management/rbac/projects/)
- SSO ([SAML](/hosting/securing/set-up-sso/), [LDAP](/user-management/ldap/))
- Sharing ([workflows](/workflows/sharing/), [credentials](/credentials/credential-sharing/)) (Only the instance owner and the user who creates them can access workflows and credentials)
- [Version control using Git](/source-control-environments/)
- [Workflow history](/workflows/history/)

All of these features are available on the Enterprise Cloud plan, including the self-hosted Enterprise edition. Some of these features are available on the Starter and Pro Cloud plan. 

See [pricing](https://n8n.io/pricing/){:target=_blank .external-link} for reference.
