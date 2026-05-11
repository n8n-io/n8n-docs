---
title: SSO environment variables
description: Configure single sign-on for self-hosted n8n using environment variables.
contentType: reference
tags:
  - environment variables
hide:
  - toc
  - tags
---

# SSO environment variables

--8<-- "_snippets/self-hosting/file-based-configuration.md"

/// info | Feature availability
Single sign-on is available on Business and Enterprise plans.
///

Refer to [Set up SSO](/hosting/securing/set-up-sso.md) for in-app setup steps and identity provider guides. See [Manage instance settings using environment variables](/hosting/configuration/settings-env-vars.md) for how the activation pattern works.

## Activation and shared settings

--8<-- "_snippets/self-hosting/configuration/environment-variables/settings-env-vars/sso-activation.md"

## OIDC

--8<-- "_snippets/self-hosting/configuration/environment-variables/settings-env-vars/sso-oidc.md"

## SAML

--8<-- "_snippets/self-hosting/configuration/environment-variables/settings-env-vars/sso-saml.md"
