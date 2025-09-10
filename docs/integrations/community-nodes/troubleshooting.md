---
contentType: howto
---

# Troubleshooting and errors

## Error: Missing packages

n8n installs community nodes directly onto the hard disk. The files must be available at startup for n8n to load them. If the packages aren't available at startup, you get an error warning of missing packages.

If running n8n using Docker: depending on your Docker setup, you may lose the packages when you recreate your container or upgrade your n8n version. You must either:

* Persist the contents of the `~/.n8n/nodes` directory. This is the best option. If you follow the [Docker installation](/hosting/installation/docker.md) guide, the setup steps include persisting this directory.
* Set the `N8N_REINSTALL_MISSING_PACKAGES` environment variable to `true`.

The second option might increase startup time and may cause health checks to fail.

## Prevent loading community nodes on n8n cloud

If your n8n cloud instance crashes and fails to start, you can prevent installed community nodes from loading on instance startup. Visit the [Cloud Admin Panel](/manage-cloud/cloud-admin-dashboard.md) > **Manage** and toggle **Disable all community nodes** to **`true`**. This toggle is only visible when you allow community node installation.
