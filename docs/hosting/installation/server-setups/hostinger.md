---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: tutorial
---

# Hosting n8n on Hostinger VPS

This hosting guide shows you how to self-host n8n on a Hostinger VPS. It uses:

* [Traefik](https://traefik.io/traefik){:target="_blank" .external-link} (a reverse proxy) to allow access to the Server from the internet.
* [Docker Compose](https://docs.docker.com/compose/){:target="_blank" .external-link} to create and define the application components and how they work together.

--8<-- "_snippets/self-hosting/warning.md"

--8<-- "_snippets/self-hosting/installation/latest-next-version.md"

## Create a server

1. [Log in](https://hpanel.hostinger.com/){:target=_blank .external-link} to the Hostinger client area.
2. Select **VPS** from a sidemenu, and start creating new VPS by pressing **+ Get new VPS plan**.

You can change most of the settings to suit your needs, but as this guide uses Docker to run the application, under the **Select Operating System** section, select one of the "n8n" templates from the **Application** tab.

/// note | Plan
When creating the server, Hostinger asks you to choose a plan. For most usage levels, the **KVM 2** plan is enough.
///
/// note | SSH keys
Hostinger lets you choose between SSH key and password-based authentication. SSH key is more secure.
///
## Log in to your n8n server

After your server is provisioned you can access your n8n instance by pressing **Manage App** in the VPS dashboard.

## Updating

--8<-- "_snippets/self-hosting/installation/docker-compose-updating.md"

## Next steps

--8<-- "_snippets/self-hosting/installation/server-setups-next-steps.md"