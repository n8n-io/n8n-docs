---
contentType: howto
nodeTitle: Troubleshooting
originalFilePath: integrations/community-nodes/troubleshooting.md
originalUrl: 'https://docs.n8n.io/integrations/community-nodes/troubleshooting'
url: 'https://docs.n8n.io/integrations/community-nodes/troubleshooting'
layout:
  description:
    visible: false
---

# Troubleshooting and errors <a href="#troubleshooting-and-errors" id="troubleshooting-and-errors"></a>

## Error: Missing packages <a href="#error-missing-packages" id="error-missing-packages"></a>

n8n installs community nodes directly onto the hard disk. The files must be available at startup for n8n to load them. If the packages aren't available at startup, you get an error warning of missing packages.

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/KbKP88R2IFii1k97togq/" %}

If running n8n using Docker: depending on your Docker setup, you may lose the packages when you recreate your container or upgrade your n8n version. You must either:

* Persist the contents of the `~/.n8n/nodes` directory. This is the best option. If you follow the [Docker installation](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/install-options/install-with-docker) guide, the setup steps include persisting this directory.
* Set the `N8N_REINSTALL_MISSING_PACKAGES` environment variable to `true`.

The second option might increase startup time and may cause health checks to fail.

## Prevent loading community nodes on n8n cloud <a href="#prevent-loading-community-nodes-on-n8n-cloud" id="prevent-loading-community-nodes-on-n8n-cloud"></a>

If your n8n cloud instance crashes and fails to start, you can prevent installed community nodes from loading on instance startup. In the [n8n Cloud console](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/use-n8n-cloud/use-the-cloud-console), go to **Instance settings**, turn on **Disable all community nodes**, then select **Save and restart**. This setting is only visible when **Verified community nodes** is on. If your instance is offline, you can still [sign in to the Cloud console with a magic link](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/use-n8n-cloud/use-the-cloud-console#open-the-cloud-console-with-a-magic-link).
