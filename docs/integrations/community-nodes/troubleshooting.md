# Troubleshooting and errors

## Error: Missing packages

n8n installs community nodes directly onto the hard disk. The files must be available at startup for n8n to load them. If the packages aren't available at startup, you get an error warning of missing packages.

If running n8n using Docker: depending on your Docker setup, you may lose the packages when you recreate your container or upgrade your n8n version. You must either:

* Persist the contents of the `~/.n8n/nodes` directory. This is the best option. If you follow the [Docker installation](/hosting/installation/docker/) guide, the setup steps include persisting this directory.
* Start n8n with the `--reinstallMissingPackages` flag.
* Set the `N8N_REINSTALL_MISSING_PACKAGES` environment variable to `true`.

The last two options will increase startup time and may cause health checks to fail.